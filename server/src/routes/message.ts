import {Router} from 'express'
import MessageController from '../controller/message_controller'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/chat/:receiverId',authMiddleware, MessageController.createChat)
router.post('/send/:receiverId/:chatId', authMiddleware, MessageController.sendMessage)
router.get('/', authMiddleware, MessageController.fetchMessages)
router.get('/:chatId', authMiddleware, MessageController.fetchMessage)
export default router



