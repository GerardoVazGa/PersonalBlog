import { Router } from "express"
import { getComments, addComment } from "../controllers/comments.controller.js"

const router = Router()

router.get('/post/:postId/comments', getComments)
router.post('/post/:postId/comments', addComment)

export default router