import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from "url"
import {PORT, ADMIN_PASS} from "../configs/env.js"
import pool from "../db/db.js"
import session from "express-session";
import {sessionConfig} from "../configs/session_config.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const categories = ['Technology', 'Animation', 'Programming', 'Cibersegurity']

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(session(sessionConfig))
app.use(express.static('public'))

app.use((req, res, next) => {
    res.locals.isAdmin = !!req.session.admin
    next()
})

const useCategories = (req, res, next) => {
    res.locals.categories = categories
    next()
}

app.use(useCategories)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index.ejs', {current: 'home'})
})

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

function isAdmin(req, res, next) {
    if(req.session.admin){
        return next()
    }

    return res.status(403).json({error: "Unauthorized access"})
}

app.post('/posts/add', isAdmin, (req, res) => {
    
    res.send(req.body)
})

app.put('/posts/edit/:id', isAdmin, (req, res) => {

})

app.delete('/posts/delete/:id', isAdmin, (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})