import {Router} from 'express'
import MessageController from '../controller/message_controller'

const router = Router()

router.post('/:senderId/chat/:receiverId', MessageController.createChat)
router.post('/:senderId/send/:receiverId/:chatId',MessageController.sendMessage)
router.get('/:chatId', MessageController.fetchMessages)

export default router



