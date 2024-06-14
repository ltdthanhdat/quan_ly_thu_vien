import express from 'express'
import bookCtrl from '../controllers/book.controller.js'
const router = express.Router()

router.get('/search', bookCtrl.searchBooks)

router.get('/', bookCtrl.getAllBooks)

router.post('/', bookCtrl.postBook)

router.get('/:id', bookCtrl.getBook)

router.put('/:id', bookCtrl.updateBook)

router.delete('/:id', bookCtrl.deleteBook)


export default router