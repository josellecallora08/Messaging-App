import {Router} from 'express'
import UserController from '../controller/user_controller'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get('/', authMiddleware, UserController.fetchUser)
router.post('/', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
export default router