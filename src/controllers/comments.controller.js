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