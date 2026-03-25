import * as CommentsModel from "../models/comments.model.js"

export const getComments = async (postId) => {
    const comments = await CommentsModel.getCommentsByPostId(postId)
    return comments
}