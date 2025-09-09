import * as PostModel from "../models/post.model.js"
import * as CategoryModel from "../models/category.model.js"
import * as TagModel from "../models/tags.model.js"
import pool from "../db/db.js"
import { slugify } from "../utils/slugify.js"
import { sanatizer } from "../utils/sanatizer.js"
import {moveTempToPosts, removeTemp} from "../utils/fileUtils.js"
import { generatePreview } from "../utils/generatePreview.js"

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
    console.log(categoryId)
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