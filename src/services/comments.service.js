import * as CommentsModel from "../models/comments.model.js"

export const getComments = async (postId) => {
    const comments = await CommentsModel.getCommentsByPostId(postId)
    return comments
}

export const addComment = async (postId, content, authorName, parentCommnetId = null) => {
    if(!postId || !content || !authorName){
        throw new Error("Missing required fields");
    }

    const cleanContent = content.trim()

    if(cleanContent.length === 0 || cleanContent.length > 1000) {
        throw new Error("Content must be between 1 and 1000 characters")
    }

    const cleanAuthorName = authorName.trim()

    if(cleanAuthorName.length === 0 || cleanAuthorName.length > 20) {
        throw new Error("Author name must be between 1 and 20 characters")
    }

    const comment = await CommentsModel.addComment(postId, cleanContent, cleanAuthorName, parentCommnetId)

    return comment

}

export const likeComment = async (commentId) => {
    const comment = await CommentsModel.likeComment(commentId)

    return comment
}

export const deleteComment = async (commentId) => {
    const comment = await CommentsModel.deleteComment(commentId)

    return comment
}