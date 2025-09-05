import * as PostModel from "../models/post.model.js"
import * as CategoryModel from "../models/category.model.js"
import * as TagModel from "../models/tags.model.js"
import pool from "../db/db.js"
import { slugify } from "../utils/slugify.js"
import { sanatizer } from "../utils/sanatizer.js"

export const allPosts = async() => {
    try {
        return await PostModel.getAllPosts() 
    }catch(error){
        
    }
}

export const createPost = async({title, content, image, category, tags}) =>{
    if(!title) {
        throw new Error("Titlte is required")
    }

    if(!content) {
        throw new Error("Content is required")
    }

    if(!image) {
        throw new Error("Image is required")
    }

    const tagsArray = tags ? tags.split("|").map(tag => tag.trim()).filter(Boolean) : []

    const slug = await slugify(title)
    
    const categoryId = await CategoryModel.getCategoryId(category)
    if(!categoryId) throw new Error(`Categoty ${category} not found`)

    const cleanContent = await sanatizer(content)
    if(!cleanContent) throw new Error("Content is not valid")

    const connection = await pool.getConnection()
    try {
        await connection.beginTransaction()

        const post = {
            title,
            slug,
            content,
            image_url: image,
            status: "published",
            created_at: new Date(),
            updated_at: new Date(),
            author_id: 1,
            categoryId,
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