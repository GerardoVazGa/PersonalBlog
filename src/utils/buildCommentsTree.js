export const buildCommentsTree = (comments) => {
    const commentMap = {}
    const rootComments = []

    comments.forEach(comment => {
        commentMap[comment.id] = {...comment, replies: []}
    })

    console.log("Comment Map:", commentMap)

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

    console.log("Root Comments:", rootComments)
    return rootComments
}