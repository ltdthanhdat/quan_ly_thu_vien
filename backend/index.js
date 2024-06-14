import express from 'express'
import cors from 'cors'
import readerRouter from './routes/reader.route.js'
import bookRouter from './routes/book.route.js'
import publisherRouter from './routes/publisher.route.js'
import brRouter from './routes/borrowReturn.route.js'
import statisticRouter from './routes/statistic.route.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.json('homepage')
})

app.use('/readers', readerRouter)
app.use('/books', bookRouter)
app.use('/publishers', publisherRouter)
app.use('/borrow-return', brRouter)
app.use('/statistic', statisticRouter)

app.listen(PORT)