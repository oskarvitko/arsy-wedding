const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 6000

const app = express()

app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.render('build/index.html')
})

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}...`)
})
