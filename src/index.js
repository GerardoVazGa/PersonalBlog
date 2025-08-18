import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import ejs from "ejs"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs', {current: 'home'})
})

app.get('/about', (req, res) => {
    res.render('about.ejs', {current: 'about'})
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})