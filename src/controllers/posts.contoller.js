import * as PostService from "../services/post.service.js"

export const  getPosts = async (req, res) => {
    try {
        const posts = await PostService.allPosts() 
        res.render('index.ejs', {current: 'home', posts: posts})
    } catch (error) {
        res.status(500).json({error: "Error fetching posts"})
    }
}