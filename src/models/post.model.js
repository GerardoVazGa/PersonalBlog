import pool from "../db/db.js"

export const getAllPosts = async (limit = 5, offset = 0) => {
    const query =  `
        SELECT id, title, slug, content, updated_at, image_url, preview 
        FROM posts
        LIMIT $1 OFFSET $2;
    `

    const countQuery = 'SELECT COUNT(*) FROM posts;'

    const [postsResult, countResult] = await Promise.all([
        pool.query(query, [limit, offset]),
        pool.query(countQuery)
    ])

    const result = {
        posts: postsResult.rows,
        total: parseInt(countResult.rows[0].count)
    }

    return result
}

export const getRecentPosts = async (limit= 5) => {
    const query = `
        SELECT id, title, slug, content, updated_at, image_url, preview
        FROM posts
        ORDER BY updated_at DESC, created_at DESC
        LIMIT $1;

    `

    const result = await pool.query(query, [limit])

    return result.rows
}

export const addPost = async (post, connection = pool) => {
    const query = `
        INSERT INTO posts
            (title, slug, content, image_url, status, created_at, updated_at, author_id, category_id, preview)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
    `
    const result = await connection.query(query, [
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

    return result.rows[0].id
}

export const insertPostTag = async (postId, tagId, connection = pool) => {
    const query = `INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)`
    const result = await connection.query(query, [postId, tagId])
}

export const existSlug = async (slug) => {
    const query = 'SELECT id FROM posts WHERE slug = $1 LIMIT 1;'
    const result = await pool.query(query, [slug])

    return result.rows.length > 0
}

export const getPostBySlug = async (slug) => {
    try {
        const query = `
        SELECT p.*, c.name as category_name, (
            SELECT ARRAY_REMOVE(ARRAY_AGG(t.name), NULL)
            FROM tags t 
            LEFT JOIN post_tags pt ON t.id = pt.tag_id
            WHERE pt.post_id = p.id
        ) AS tags, a.name as author_name
        FROM posts p
        INNER JOIN categories c ON p.category_id = c.id
        INNER JOIN authors a ON p.author_id = a.id
        WHERE p.slug = $1
        LIMIT 1;
    `

        const result = await pool.query(query, [slug])

        return result.rows.length > 0 ? result.rows[0] : null
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export const getPostById = async (id) => {
    const query = `
        SELECT p.*, c.name as category_name
        FROM posts p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1;
    `
    const result = await pool.query(query, [id])

    return result.rows.length > 0 ? result.rows[0] : null
}

export const getPostTags = async (id) => {
    const query = `
        SELECT t.name
        FROM tags t
        INNER JOIN post_tags pt ON t.id = pt.tag_id
        INNER JOIN posts p ON pt.post_id = p.id
        WHERE p.id = $1
    `
    
    const result = await pool.query(query, [id])
    return result.rows
}

export const getOldContent = async (id, connection = pool) =>  {
    const query = `
        SELECT title, slug, content, image_url FROM posts
        WHERE id = $1
        LIMIT 1;
    `
    const result = await connection.query(query, [id])

    return result.rows.length > 0 ? result.rows[0] : null
}

export const updatePost = async (id, newPostData, connection = pool) =>  {
    const query = `
        UPDATE posts
        SET title = $1, slug = $2, content = $3, image_url = $4, updated_at = $5, category_id = $6, preview = $7
        WHERE id = $8
    `

    const result = await connection.query(query, [
        newPostData.title,
        newPostData.slug,
        newPostData.content,
        newPostData.image_url,
        newPostData.updated_at,
        newPostData.category_id,
        newPostData.preview,
        id
    ])

    return result.rowCount > 0
}

export const deletePostById = async(id, connection = pool) => {
    const query = `
        DELETE FROM posts
        WHERE id = $1
    `
    const result = await connection.query(query, [id])

    return result.rowCount > 0
}

export const searchPosts = async (searchTerm) => {
    const query = `
        SELECT id, title, slug, preview, image_url, updated_at,
        ts_rank(
            setweight(to_tsvector('spanish', title), 'A') ||
            setweight(to_tsvector('spanish', preview), 'B'),
            plainto_tsquery('spanish', $1)
        ) AS rank
        FROM posts
        WHERE 
            setweight(to_tsvector('spanish', title), 'A') ||
            setweight(to_tsvector('spanish', preview), 'B')
            @@ plainto_tsquery('spanish', $1)
        ORDER BY rank DESC, updated_at DESC
        LIMIT 10;
    `
    const result = await pool.query(query, [searchTerm])
    return result.rows
}