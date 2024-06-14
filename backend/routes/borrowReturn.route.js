import express from 'express'
import brCtrl from '../controllers/borrowReturn.controller.js'
const router = express.Router()

router.get('/search', brCtrl.searchDetail)
router.get('/detail', brCtrl.brDetail)
router.post('/borrow', brCtrl.borrowBook)
router.post('/return', brCtrl.returnBook)

export default router