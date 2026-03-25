import { Router } from "express"
import { getComments, addComment, likeComment, deleteComment } from "../controllers/comments.controller.js"

const router = Router()

router.get('/post/:postId/comments', getComments)
router.post('/post/:postId/comments', addComment)

router.patch('/comments/:commentId/like', likeComment)
router.delete('/comments/:commentId', deleteComment)

export default router