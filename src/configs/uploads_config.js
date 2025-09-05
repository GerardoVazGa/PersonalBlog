import fs from "fs/promises"
import path from "path"
import multer from "multer"

const uploadsDir = path.join(process.cwd(), "public/uploads")
export const TEMP_DIR = path.join(uploadsDir, "tempFiles")
export const POSTS_DIR = path.join(uploadsDir, "postsFiles")

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