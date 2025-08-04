import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})