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

export const likeComment = async (commentId) =>{
    const query = `
        UPDATE comments
        SET likes = likes + 1
        WHERE id = $1
        RETURNING *;
    `

    const result = await pool.query(query, [commentId])

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