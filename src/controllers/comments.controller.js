import * as CommentsService from "../services/comments.service.js"
import { formatDate } from "../utils/formatDate.js"

export const getComments = async (req, res) => {
    const { postId} = req.params
    const userId = req.anonId
    
    try {
        const comments = await CommentsService.getComments(postId, userId)
        res.json(comments)
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
}

export const addComment = async (req, res) => {
    const { postId } = req.params
    const { content, authorName , parentCommentId = null } = req.body 

    try {
        const comment = await CommentsService.addComment(postId, content, authorName, parentCommentId)
        res.status(201).json({...comment, created_at: formatDate(comment.created_at)})
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(400).json({ error: "Failed to add comment" });
    }
}

export const toggleLikeComment = async (req, res) => {
    const { commentId } = req.params
    const userId = req.anonId

    try {
        const comment = await CommentsService.toggleLikeComment(commentId, userId)
        res.status(200).json(comment)
    } catch (error) {
        console.error("Error liking comment:", error);
        res.status(500).json({ error: "Failed to like comment" });
    }
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params

    try {
        const comment = await CommentsService.deleteComment(commentId)
        res.status(200).json(comment)
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}