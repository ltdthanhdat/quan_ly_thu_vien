import express from 'express'
import readerRouter from './routes/reader.route.js'
import bookRouter from './routes/book.route.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json('hello world')
})

app.use('/readers', readerRouter)
app.use('/books', bookRouter)

app.listen(PORT)