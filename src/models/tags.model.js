export const  findTag = async (tag, connection = pool) => {
    const query = `
        SELECT id FROM tags 
        WHERE name = ? 
        LIMIT 1;`
    
    const [rows] = await connection.query(query, [tag])



    return rows.length > 0 ? rows[0].id : null
}

export const insertTag = async(tag, connection) => {
    const query = `
            INSERT INTO tags (name) 
            VALUES (?)`
        
    const [result] = await connection.query(query, [tag])
        
    return result.insertId 
}

export const deletePostTags = async(postId, connection) => {
    const query = `
        DELETE FROM post_tags
        WHERE post_id = ?
    `

    const [result] = await connection.query(query, postId)

    return result.affectedRows > 0
}