import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
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


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})