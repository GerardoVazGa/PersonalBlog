import * as CommentsModel from "../models/comments.model.js"
import { buildCommentsTree } from "../utils/buildCommentsTree.js"

export const getComments = async (postId) => {
    const comments = await CommentsModel.getCommentsByPostId(postId)
    const commentsTree = buildCommentsTree(comments)
    return commentsTree
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

    const status = 'approved'

    const comment = await CommentsModel.addComment(postId, cleanContent, cleanAuthorName, parentCommnetId, status)

    return comment

}

export const toggleLikeComment = async (commentId, userId) => {
    const alreadyLiked = await CommentsModel.findLikeComment(commentId, userId)
    let comment = null

    if(alreadyLiked){
        comment = await CommentsModel.removeLikeComment(commentId, userId)
        return {...comment, liked: false}
    }
    
    comment = await CommentsModel.insertLikeComment(commentId, userId)

    return {...comment, liked: true}
    
}

export const deleteComment = async (commentId) => {
    const comment = await CommentsModel.deleteComment(commentId)

    return comment
}