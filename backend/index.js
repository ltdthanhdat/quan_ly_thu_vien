import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/readers', readerRouter)
app.use('/books', bookRouter)

app.listen(PORT)