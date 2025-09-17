import fs from "fs/promises"
import path from "path"
import {TEMP_DIR, POSTS_DIR} from "../configs/uploads_config.js"
export const moveTempToPosts = async (tmpUrl) => {
    const filename = path.basename(tmpUrl)
    const oldPath = path.join(TEMP_DIR, filename)
    const newPath = path.join(POSTS_DIR, filename)
    
    try {
        await fs.rename(oldPath, newPath)
        return `/uploads/postsFiles/${filename}`
    } catch (error) {
        console.error("Error moving file from temp to posts:", error)
        return null
    }
}

export const removeTemp = async (tmpUrl) => {
    const fullTempDir = path.join(TEMP_DIR, path.basename(tmpUrl))

    try {
        await fs.unlink(fullTempDir)
    } catch (error) {
        console.error('Error removing temporary file:', error)
    }
}

export const removePostImage = async (postUrl) => {
    const fullPostDir = path.join(POSTS_DIR, path.basename(postUrl))

    try {
        await fs.unlink(fullPostDir)
    } catch (error) {
        console.error('Error removing post image:', error)
    }
}
