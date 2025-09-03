import pool from "../db/db.js"

export const useCategories = async (req, res, next) => {
    const [rows] = await pool.query('SELECT name FROM categories')
    const categories = rows.map(row => row.name)
    res.locals.categories = categories
    next()
}