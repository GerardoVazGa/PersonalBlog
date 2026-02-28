import {Router} from 'express'
import {getPostJson, addPost, editPost, deletePost} from "../controllers/posts.controller.js"
import { isAdmin } from '../middlewares/isAdmin.middleware.js'
import {uploadTemp} from '../configs/uploads_config.js'

const router = Router()

router.get('/:id', getPostJson)
router.post('/', uploadTemp.single('image'), isAdmin, addPost)
router.put('/:id', uploadTemp.single('image'), isAdmin, editPost)
router.delete('/:id', isAdmin, deletePost)

export default router