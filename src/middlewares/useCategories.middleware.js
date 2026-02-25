import pool from "../db/db.js"

export const useCategories = async (req, res, next) => {
    const result = await pool.query('SELECT name FROM categories')
    const categories = result.rows.map(row => row.name)
    res.locals.categories = categories
    next()
}