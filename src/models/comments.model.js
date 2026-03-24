import pool from "../db/db.js";

export async function getCommentsByPostId(postId) {
    try {
        const query = `
        SELECT * 
        FROM comments 
        WHERE post_id = $1 AND status = 'approved' 
        ORDER BY created_at ASC
    `;

        const result = pool.query(query, [postId]);

        return result.length > 0 ? result.rows : [];
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

export async function addComment(postId, content, authorName, parentCommentId = null) {
    try {
        const query = `
            INSERT INTO comments (content, author_name, post_id, parent_comment_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `
        const result = await pool.query(query, [content, authorName, postId, parentCommentId])

        return result.rows[0]
        
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}