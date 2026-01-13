import * as PostService from "../services/post.service.js"
import { formatDate } from "../utils/formatDate.js"

export const  getRecentPosts = async (req, res) => {
    try {
        const posts = await PostService.getRecentPosts()
        res.render('index.ejs', {current: 'home', posts: posts})
    } catch (error) {
        res.status(500).json({error: "Error fetching posts"})
    }
}

export const addPost = async (req, res) => {
    try {
        const post = await PostService.createPost({...req.body, image: req.file.filename})
        res.json({success: true, message: "Post added successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({success: false, message: error.message})
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await PostService.getPost(req.params.slug)
        res.render('post.ejs', {current: 'home', post: {...post, created_at: formatDate(post.created_at)}})
    } catch (error) {
        res.status(500).json({error: "Error fetching post"})
    }
}
export const getPostJson = async (req, res) => {
    try {
        const post = await PostService.getPostJson(req.params.id)
        res.json(post) 
    } catch (error) {
        res.status(500).json({error: "Error fetching post"})
    }
}

export const editPost = async (req, res) => {
    try {
        const postEdited = await PostService.editPost({...req.body}, req.file, req.params.id)
        if(postEdited) {
            return res.status(200).json({success: true, message: "Post edited successfully", post: postEdited})
        }

        return res.status(400).json({success: false, message: "Post not edited"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: error.message})
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params
    try {
        const postDeleted = await PostService.deletePost(id)

        if(postDeleted) {
            return res.status(200).json({success: true, message: `Post ${postDeleted} was deleted successfully`})
        }

        return res.status(400).json({success: false, message: `Post ${postDeleted} was not deleted`})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: error.message})
    }
}

export const getPostsByCategory = async (req, res) => {
    const {category} = req.params

    try {
        const posts = await PostService.getPostsByCategory(category)

        if(posts) {
            return res.status(200).render('category.ejs', {current: category, posts})
        }

        return res.status(400).json({success: false, message: "No post found for this category"})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success: false, message: error.message})
    }
}