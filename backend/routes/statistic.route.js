import express from 'express'
import statisticCtrl from '../controllers/statistic.controller.js'
const router = express.Router()

router.get('/book-borrowed', statisticCtrl.bookBorrowed)
router.get('/book-unborrowed', statisticCtrl.bookUnborrowed)
router.get('/borrower', statisticCtrl.borrower)
router.get('/overdue-books', statisticCtrl.overdueBooks)

export default router