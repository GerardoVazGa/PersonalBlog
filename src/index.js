import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import path from "path"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"
import {PORT} from "./configs/env.js"
import {uploadTemp} from './configs/uploads_config.js'
import { loggedAdmin } from "./middlewares/loggedAdmin.middleware.js"
import {useCategories} from './middlewares/useCategories.middleware.js'
import {getCategories} from './controllers/category.controller.js'
import assignAnonId from './middlewares/assignAnonId.middleware.js'

import viewsRoutes from "./routes/views.routes.js"
import postsRoutes from "./routes/posts.routes.js"
import authRoutes from "./routes/auth.routes.js"
import categoriesRoutes from "./routes/categories.routes.js"
import uploadsRoutes from "./routes/uploads.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import commentsRoutes from "./routes/comments.routes.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use(express.static('public'))

app.use(loggedAdmin)

app.use(useCategories)
app.use(assignAnonId)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', viewsRoutes)
app.use('/api/posts', postsRoutes)
app.use('/auth/', authRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/uploads', uploadsRoutes)
app.use('/api', commentsRoutes)
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})