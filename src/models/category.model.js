import pool from "../db/db.js"

export const getAllCategories = async () => {
    const query = 'SELECT name FROM categories'
    const result = await pool.query(query)
    return result.rows
}

export const getCategoryId = async (name) => {
    const query = 'SELECT id FROM categories WHERE name = $1'
    const result = await pool.query(query, [name])
    return result.rows.length > 0 ? result.rows[0].id : null
}

export const getPostsByCategory = async (categoryName, limit = 5, offset = 0) => {
    const query = `
        SELECT p.*, c.name as category_name, COUNT(*) OVER() AS total_count
        FROM posts p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE c.name = $1    
        LIMIT $2 OFFSET $3;

    `
    const result = await pool.query(query, [categoryName, limit, offset])

    const posts = result.rows
    const total = posts.length > 0 ? parseInt(posts[0].total_count) : 0
    return {posts, total}
}