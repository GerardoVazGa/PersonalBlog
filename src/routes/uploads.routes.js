import { Router } from "express"
import { uploadTemp } from "../configs/uploads_config.js"
import { uploadTempFile } from "../controllers/upload.controller.js"

const router = Router()

router.post('/', uploadTemp.single('image'), uploadTempFile)

export default router