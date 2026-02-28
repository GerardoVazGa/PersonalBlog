import { Router } from "express"
import { uploadTemp } from "../configs/uploads_config.js"


const router = Router()

router.post('/', uploadTemp.single('image'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({error: "File not uploaded"})
    }

    return res.json({url: `/uploads/tempFiles/${req.file.filename}`})
})

export default router