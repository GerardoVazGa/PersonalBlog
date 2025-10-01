import pool from "../db/db.js"

export const getAllCategories = async () => {
    const query = 'SELECT name FROM categories'
    const [rows] = await pool.query(query)
    return rows
}

export const getCategoryId = async (name) => {
    const query = 'SELECT id FROM categories WHERE name = ?'
    const [rows] =await pool.query(query, [name])
    return rows.length > 0 ? rows[0].id : null
}

export const getPostsByCategory = async (categoryName) => {
    const query = `
        SELECT p.*, c.name as category_name
        FROM posts p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE c.name = ?    
    `
    const [result] = await pool.query(query, [categoryName])

    return result
}