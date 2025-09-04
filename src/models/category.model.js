import pool from "../db/db.js"

export const getAllCategories = async () => {
    const query = 'SELECT name FROM categories'
    const [rows] = await pool.query(query)
    return rows
}

export const getCategoryId = async (name) => {
    const query = 'SELECT id FROM categories WHERE name = ?'
    const [rows] =await pool.query(query, [name])
    return rows
}