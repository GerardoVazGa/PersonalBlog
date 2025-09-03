import fs from "fs/promises"
import path from "path"
import multer from "multer"

const uploadsDir = path.join(process.cwd(), "public/uploads")
const TEMP_DIR = path.join(uploadsDir, "tempFiles")
const POSTS_DIR = path.join(uploadsDir, "postsFiles")

console.log(uploadsDir)

async function ensureDirsExist(pathDir){
    try {
        await fs.access(pathDir)
    } catch (error) {
        await fs.mkdir(pathDir, {recursive: true})
    }
}

await ensureDirsExist(uploadsDir)
await ensureDirsExist(TEMP_DIR)
await ensureDirsExist(POSTS_DIR)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_DIR)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploadTemp = multer({storage: storage})

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
