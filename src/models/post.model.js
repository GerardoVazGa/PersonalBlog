import pool from "../db/db.js"

export const getAllPosts = async () => {
    const query = 'SELECT title, slug, content, updated_at, image_url FROM posts'
    const [rows] = await pool.query(query)
    return rows
}