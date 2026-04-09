import pool from "../db/db.js";

export const getCommentsByPostId = async (postId) => {
    try {
        const query = `
            SELECT * 
            FROM comments 
            WHERE post_id = $1 AND status = 'approved' 
            ORDER BY created_at ASC
        `

        const result = await pool.query(query, [postId]);

        return result.rows.length > 0 ? result.rows : [];
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

export const addComment = async (postId, content, authorName, parentCommentId = null, status) => {
    try {
        const query = `
            INSERT INTO comments (content, author_name, post_id, parent_comment_id, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `
        const result = await pool.query(query, [content, authorName, postId, parentCommentId, status])

        return result.rows[0]
        
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}

export const insertLikeComment = async (commentId, userId) =>{
    const query = `
        INSERT INTO comment_likes(comment_id, user_id)
        VALUES($1, $2)

    `

    const result = await pool.query(query, [commentId, userId])

    return result.rows[0]
}

export const findLikeComment = async (commentId, userId) => {
    const query = `
        SELECT * FROM comment_likes
        WHERE comment_id = $1
        AND user_identifier = $2
    `

    const result = await pool.query(query, [commentId, userId])

    return result.rows.length > 0
}

export const removeLikeComment = async (commentId, userId) => {
    const query = `
        DELETE from comment_likes
        WHERE comment_id = $1
        AND user_identifier = $2
    `

    const result = await pool.query(query, [commentId, userId])

    return result.rows[0]
}

export const deleteComment = async (commentId) => {
    const query = `
        UPDATE comments
        SET deleted_at = NOW()
        WHERE id = $1
        RETURNING *;
    `

    const result = await pool.query(query, [commentId])

    return result.rows[0]
}

export const approveComment = async (commentId) => {
    const query = `
        UPDATE comments
        SET status = 'approved'
        WHERE id = $1
        RETURNING *;
    `

    const result = await pool.query(query, [commentId])

    return result.rows[0]
}

export const rejectComment = async (commentId) => {
    const query = `
        UPDATE comments 
        SET status = 'rejected'
        WHERE id = $1
        RETURNING *;
    `
    const result = await pool.query(query, [commentId])

    return result.rows[0]
}