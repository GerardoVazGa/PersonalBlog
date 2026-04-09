import { Router } from "express"
import { getComments, addComment, toggleLikeComment, deleteComment } from "../controllers/comments.controller.js"

const router = Router()

router.get('/post/:postId/comments', getComments)
router.post('/post/:postId/comments', addComment)

router.post('/comments/:commentId/like', toggleLikeComment)
router.delete('/comments/:commentId', deleteComment)

export default router