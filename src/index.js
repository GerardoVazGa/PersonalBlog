import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from "url"
import {PORT} from "../configs/env.js"
import pool from "../db/db.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const categories = ['Technology', 'Animation', 'Programming', 'Cibersegurity']

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

const useCategories = (req, res, next) => {
    res.locals.categories = categories
    next()
}

app.use(useCategories)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
    const [rows] = await pool.query("SELECT  * FROM posts")
    console.log(rows)
    res.render('index.ejs', {current: 'home'})
})

app.get('/about', (req, res) => {
    res.render('about.ejs', {current: 'about'})
})

app.get('/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase()
    res.render('category', {current: category})
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})