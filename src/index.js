import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from "url"
import {PORT, ADMIN_PASS} from "./configs/env.js"
import session from "express-session";
import {sessionConfig} from "./configs/session_config.js"
import {uploadTemp} from './configs/uploads_config.js'
import { loggedAdmin } from "./middlewares/loggedAdmin.middleware.js"
import {isAdmin} from './middlewares/isAdmin.middleware.js'
import {useCategories} from './middlewares/useCategories.middleware.js'
import {getPosts} from "./controllers/posts.contoller.js"
import {getCategories} from './controllers/category.controller.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(session(sessionConfig))
app.use(express.static('public'))

app.use(loggedAdmin)

app.use(useCategories)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', getPosts)

app.get('/about', (req, res) => {
    res.render('about.ejs', {current: 'about'})
})

app.get('/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase()
    res.render('category', {current: category})
})

app.post('/login', (req, res) => {
    const {password} = req.body
    if(password === ADMIN_PASS){
        req.session.admin = true
        return res.json({success: true, message: "Admin access granted"})
    }

    
    return res.json({success: false, message: "Invalid password"})
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({success: false, message: "Error al cerrar sesion"})
        }

        return res.json({success: true, message: "Se cerro la sesion correctamente"})
    })
})

app.post('/posts/add', uploadTemp.single('image'), isAdmin, async (req, res) => {
    console.log(req.file)
    console.log(req.body)

    // try {
    //     const imgRegex = /<img[^>]+src="([^">]+)"/
    //     let match
    //     let updateContent = req.body.content

    //     while(match = imgRegex.exec(updateContent) !== null){
    //         const tempUrl = match[1]
    //         if(tempUrl.includes("/uploads/tempFiles/")){
                
    //         }
    //     }

    // } catch (error) {
        
    // }

    res.json({success: true, message: "Post added successfully", file: req.file})
})

app.put('/posts/edit/:id', isAdmin, (req, res) => {

})

app.delete('/posts/delete/:id', isAdmin, (req, res) => {
    
})

app.get('/api/categories', getCategories)

app.post('/upload', uploadTemp.single('image'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({error: "File not uploaded"})
    }

    return res.json({url: `/uploads/tempFiles/${req.file.filename}`})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})