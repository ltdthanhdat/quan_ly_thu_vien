import express from 'express'
import readerCtrl from '../controllers/reader.controller.js'
const router = express.Router()

router.get('/', readerCtrl.getAllReaders)

router.get('/search', readerCtrl.searchReader)

router.post('/', readerCtrl.postReader)

router.put('/:id', readerCtrl.updateReader)

router.delete('/:id', readerCtrl.deleteReader)

export default router