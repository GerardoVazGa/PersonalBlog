import pool from "../db/db.js"

export const getAllPosts = async () => {
    const query = 'SELECT title, slug, content, updated_at, image_url, preview FROM posts'
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
    const query = 'SELECT id FROM posts WHERE slug = ? LIMIT 1'
    const [result] = await pool.query(query, [slug])

    return result.length > 0
}