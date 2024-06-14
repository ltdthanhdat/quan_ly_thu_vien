import express from 'express'
import pubCtrls from '../controllers/publisher.controller.js'
const router = express.Router()

router.get('/', pubCtrls.getAllPublishers)
router.post('/find', pubCtrls.findPublisher)

export default router