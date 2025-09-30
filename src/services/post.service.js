import * as PostModel from "../models/post.model.js"
import * as CategoryModel from "../models/category.model.js"
import * as TagModel from "../models/tags.model.js"
import pool from "../db/db.js"
import { slugify } from "../utils/slugify.js"
import { sanatizer } from "../utils/sanatizer.js"
import {moveTempToPosts, removeTemp, removePostImage} from "../utils/fileUtils.js"
import { generatePreview } from "../utils/generatePreview.js"
import { extractImageUrls, toDeleteOldImageCont } from "../utils/toDeleteOldImageCont.js"
import { replaceTempToPosts } from "../utils/replaceTempToPosts.js"

export const allPosts = async() => {
    try {
        return await PostModel.getAllPosts() 
    }catch(error){
        
    }
}

export const createPost = async(post) =>{
    console.log(post)
    const {title, content, image, category, tags} = post
    if(!title) {
        throw new Error("Titlte is required")
    }

    if(!content) {
        throw new Error("Content is required")
    }

    if(!image) {
        throw new Error("Image is required")
    }

    const imageUrl = await moveTempToPosts(image)

    if(!imageUrl) {
        throw new Error("Image is not valid")
    }

    const tagsArray = tags ? tags.split("|").map(tag => tag.trim()).filter(Boolean) : []

    const slug = await slugify(title)
    
    const categoryId = await CategoryModel.getCategoryId(category)
    if(!categoryId) throw new Error(`Category ${category} not found`)

    const cleanContent = await sanatizer(content)
    if(!cleanContent) throw new Error("Content is not valid")

    const imageRegex = /<img[^>]+src=["']([^"']+)["']/g
    let match
    let updatedContent = cleanContent

    while((match = imageRegex.exec(updatedContent)) !== null) {
        const src = match[1]
        if(src.includes('uploads/tempFiles/')) {
            const newUrl = await moveTempToPosts(src)
            if(newUrl) {
                updatedContent = updatedContent.replaceAll(src, newUrl)
            }else {
                await removeTemp(src)
            }
        }
    }

    const preview = await generatePreview(updatedContent, 100)

    const connection = await pool.getConnection()
    try {
        await connection.beginTransaction()

        const post = {
            title,
            slug,
            content: updatedContent,
            image_url: image,
            status: "published",
            created_at: new Date(),
            updated_at: new Date(),
            author_id: 1,
            category_id: categoryId,
            preview
        }

        const postId = await PostModel.addPost(post, connection)

        tagsArray.forEach(async tag => {
            let tagId
            const existTag = await TagModel.findTag(tag, connection)

            if(!existTag) {
                tagId = await TagModel.insertTag(tag, connection)
            }else {
                tagId =  existTag
            }

            await PostModel.insertPostTag(postId, tagId, connection)

        })

        await connection.commit()

        return postId
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }

} 

export const getPost = async(slug) => {
    return await PostModel.getPostBySlug(slug)
}
export const getPostJson = async(id) => {
    const post = await PostModel.getPostById(id)
    const tags = await PostModel.getPostTags(id)

    const tagsArray = tags.map(tag => tag.name)

    const tagsString = tagsArray.join("|")
    
    return {...post, tags: tagsString}
}

export const editPost = async(post, image, id) => {
    const {title, content, category, tags} = post

    if(!id) {
        throw new Error("Post ID is required")
    }

    if(!title) {
        throw new Error("Title is required")
    }

    if(!category) {
        throw new Error("Category is required")
    }

    if(!tags) {
        throw new Error("Tags is required")
    }

    if(!content) {
        throw new Error("Content is required")
    }

    const tagsArray = tags ? tags.split("|").map(tag => tag.trim()).filter(Boolean) : []

    const categoryId = await CategoryModel.getCategoryId(category)
    if(!categoryId) throw new Error(`Category ${category} not found`)

    const cleanContent = await sanatizer(content)
    if(!cleanContent) throw new Error("Content is not valid")
    
    const updatedContent = await replaceTempToPosts(cleanContent)
    if(!updatedContent) throw new Error("Content is not replaced correctly")

    const preview = await generatePreview(updatedContent, 100)

    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction()

        const oldContentPost = await PostModel.getOldContent(id, connection)

        let newSlug = oldContentPost.slug

        if(title !== oldContentPost.title) {
            newSlug = await slugify(title)
        }

        // Principal image handling
        let newImageUrl = oldContentPost.image_url

        if(image && image.filename !== oldContentPost.image_url) {
            const movedImage = await moveTempToPosts(image.filename)

            if(!movedImage) {
                throw new Error("Image is not valid")
            }

            newImageUrl = image.filename

            console.log(newImageUrl)

            if(oldContentPost.image_url) {
                await removePostImage(oldContentPost.image_url)
            }
        }
        
        const oldImagesToDelete = await toDeleteOldImageCont(oldContentPost.content, updatedContent)

        const newPostData = {
            title,
            slug: newSlug,
            content: updatedContent,
            image_url: newImageUrl,
            updated_at: new Date(),
            category_id: categoryId,
            preview
        }

        const updatedPost = await PostModel.updatePost(id, newPostData, connection)
        
        await TagModel.deletePostTags(id, connection)

        await Promise.all(tagsArray.map(async tag => {
            let tagId
            const existTag = await TagModel.findTag(tag, connection)
            tagId = existTag ? existTag : await TagModel.insertTag(tag, connection)
            await PostModel.insertPostTag(id, tagId, connection)
        }))

        await connection.commit()

        for(const imageDelete of oldImagesToDelete) {
            await removePostImage(imageDelete)
        }

        return PostModel.getPostById(id)
    } catch (error) {
        console.log(error.message)
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }

}

export const deletePost = async (id) => {
    const postId = parseInt(id)

    if(!postId) {
        throw new Error("Post ID is required")
    }

    const connection = await pool.getConnection()
    
    try {
        await connection.beginTransaction()
        const post = await PostModel.getPostById(postId)

        if(!post) {
            throw new Error("Post not found")
        }

        await TagModel.deletePostTags(postId, connection)

        const deleted = await PostModel.deletePostById(postId, connection)

        if(!deleted) {
            throw new Error("Post not deleted")
        }

        if(post.image_url) {
            await removePostImage(post.image_url)
        }

        const contentImages = extractImageUrls(post.content)

        for(const imageUrl of contentImages) {
            await removePostImage(imageUrl)
        }

        await connection.commit()

        return post.title
    } catch (error) {
        console.log(error.message)
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
}