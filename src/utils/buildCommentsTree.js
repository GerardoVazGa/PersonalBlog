import { formatDate } from "./formatDate.js"

export const buildCommentsTree = (comments) => {
    const commentMap = {}
    const rootComments = []

    comments.forEach(comment => {
        commentMap[comment.id] = {...comment, created_at: formatDate(comment.created_at), replies: []}
    })

    comments.forEach(comment => {
        const currentComment = commentMap[comment.id]

        if(comment.parent_comment_id) {
            const parent = commentMap[comment.parent_comment_id]
            if(parent) {
                parent.replies.push(currentComment)
            }
        }else {
            rootComments.push(currentComment)
        }
    })
    return rootComments
}