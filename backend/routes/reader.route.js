import express from 'express'
import readerCtrl from '../controllers/reader.controller.js'
const router = express.Router()

router.get('/', readerCtrl.getAllReaders)

router.post('/', readerCtrl.postReader)

router.put('/:id', readerCtrl.updateReader)

export default router