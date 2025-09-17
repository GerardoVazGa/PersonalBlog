import pool from "../db/db.js"

export const getAllPosts = async () => {
    const query = 'SELECT id, title, slug, content, updated_at, image_url, preview FROM posts'
    const [rows] = await pool.query(query)
    return rows
}

export const addPost = async (post, connection = pool) => {
    const query = `
        INSERT INTO posts
            (title, slug, content, image_url, status, created_at, updated_at, author_id, category_id, preview)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await connection.query(query, [
        post.title,
        post.slug,
        post.content,
        post.image_url,
        post.status,
        post.created_at,
        post.updated_at,
        post.author_id,
        post.category_id,
        post.preview
    ])

    return result.insertId
}

export const insertPostTag = async (postId, tagId, connection = pool) => {
    const query = `INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)`
    const [result] = await connection.query(query, [postId, tagId])
}

export const existSlug = async (slug) => {
    const query = 'SELECT id FROM posts WHERE slug = ? LIMIT 1;'
    const [result] = await pool.query(query, [slug])

    return result.length > 0
}

export const getPostBySlug = async (slug) => {
    const query = `
        SELECT p.*, c.name as category_name
        FROM posts p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
        LIMIT 1;
    `

    const [rows] = await pool.query(query, [slug])

    return rows.length > 0 ? rows[0] : null
}

export const getPostById = async (id) => {
    const query = `
        SELECT p.*, c.name as category_name
        FROM posts p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?;
    `
    const [rows] = await pool.query(query, [id])

    return rows.length > 0 ? rows[0] : null
}

export const getPostTags = async (id) => {
    const query = `
        SELECT t.name
        FROM tags t
        INNER JOIN post_tags pt ON t.id = pt.tag_id
        INNER JOIN posts p ON pt.post_id = p.id
        WHERE p.id = ?
    `
    
    const [rows] = await pool.query(query, [id])
    return rows
}

export const getOldContent = async (id, connection = pool) =>  {
    const query = `
        SELECT content FROM posts
        WHERE id = ?
        LIMIT 1;
    `
    const [result] = await connection.query(query, [id])

    return result.length > 0 ? result[0].content : null
}