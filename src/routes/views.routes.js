import { Router } from "express"
import { getRecentPosts, getPost, getPostsByCategory } from "../controllers/posts.controller.js"

const router = Router()

router.get('/', getRecentPosts)
router.get('/about', (req, res) => {
    res.render('about.ejs', {current: 'about'})
})
router.get('/category/:category', getPostsByCategory)
router.get('/post/:slug',  getPost)

export default router