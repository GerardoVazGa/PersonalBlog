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