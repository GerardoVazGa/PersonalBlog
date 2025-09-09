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