import express from 'express'
import bookCtrl from '../controllers/book.controller.js'
const router = express.Router()

router.get('/', bookCtrl.getAllBooks)

router.post('/:id', bookCtrl.postBook)

router.put('/:id', bookCtrl.updateBook)

router.delete('/:id', bookCtrl.deleteBook)

export default router