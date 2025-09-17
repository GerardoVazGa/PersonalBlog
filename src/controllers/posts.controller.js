import * as PostService from "../services/post.service.js"

export const  getPosts = async (req, res) => {
    try {
        const posts = await PostService.allPosts() 
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
        res.render('post.ejs', {current: 'home', post: post})
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
            return res.status(200).json({success: true, message: "Post edited successfully"})
        }

        return res.status(400).json({success: false, message: "Post not edited"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({success: false, message: error.message})
    }
}