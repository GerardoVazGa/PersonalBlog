import { Router } from "express"
import { getRecentPosts, getPost, getPostsByCategory, getAllPosts } from "../controllers/posts.controller.js"

const router = Router()

router.get('/', getRecentPosts)
router.get('/blog', getAllPosts)
router.get('/blog/page/:page', getAllPosts)
router.get('/about', (req, res) => {
    res.render('about.ejs', {current: 'about'})
})
router.get('/blog/category/:category', getPostsByCategory)
router.get('/blog/category/:category/page/:page', getPostsByCategory)
router.get('/post/:slug',  getPost)

export default router