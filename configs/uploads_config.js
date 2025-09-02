import fs from "fs"
import path from "path"
import multer from "multer"

export const uploadsDir = path.join(path.cwd(), "uploads")
export const TEMP_DIR = path.join(uploadsDir, "tempFiles")
export const POSTS_DIR = path.join(uploadsDir, "postsFiles")

if(!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir)
}

if(!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR)
}

if(!fs.existsSync(POSTS_DIR)){
    fs.mkdirSync(POSTS_DIR)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_DIR)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploadTemp = multer({storage: storage})

export const moveTempToPosts = (tmpUrl) => {
    const filename = path.basename(tmpUrl)
    const oldPath = path.join(TEMP_DIR, filename)
    const newPath = path.join(POSTS_DIR, filename)

    if(fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath)
    }

    return `/uploads/postsFiles/${filename}`
}

export const removeTemp = (tmpUrl) => {
    const fullTempDir = path.join(TEMP_DIR, path.basename(tmpUrl))

    if(fs.existsSync(fullTempDir)) {
        fs.unlinkSync(fullTempDir)
    }
}
