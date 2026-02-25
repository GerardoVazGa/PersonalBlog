import pool from "../db/db.js"

export const findTag = async (tag, connection = pool) => {
    const query = `
        SELECT id FROM tags 
        WHERE name = $1 
        LIMIT 1;`
    
    const result = await connection.query(query, [tag])

    return result.rows.length > 0 ? result.rows[0].id : null
}

export const insertTag = async(tag, connection) => {
    const query = `
            INSERT INTO tags (name) 
            VALUES ($1)
            RETURNING id`
        
    const result = await connection.query(query, [tag])
        
    return result.rows[0].id 
}

export const deletePostTags = async(postId, connection) => {
    const query = `
        DELETE FROM post_tags
        WHERE post_id = $1
    `

    const result = await connection.query(query, [postId])

    return result.rowCount > 0
}