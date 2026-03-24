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