import pool from "../db/db.js"

export const getAllCategories = async () => {
    const query = 'SELECT name FROM catergories'
    const [rows] = await pool.query(query)
    return rows
}