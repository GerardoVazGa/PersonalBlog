import {Router}from "express"
import {isAdmin} from "../middlewares/isAdmin.middleware.js"
import {getPostById} from "../controllers/posts.controller.js"

const router = Router()

router.get('/posts/new', isAdmin, getViewCreatePost)
router.get('/posts/:id/edit', isAdmin, getPostById)

export default router