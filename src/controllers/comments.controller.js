import * as CommentsService from "../services/comments.service.js"

export const getComments = async (req, res) => {
    const { postId} = req.params
    try {
        const comments = await CommentsService.getComments(postId)
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
        res.status(201).json(comment)
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(400).json({ error: "Failed to add comment" });
    }
}