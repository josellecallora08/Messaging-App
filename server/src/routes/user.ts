import {Router} from 'express'
import UserController from '../controller/user_controller'

const router = Router()

router.get('/', UserController.fetchUser)
router.post('/', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)

export default router