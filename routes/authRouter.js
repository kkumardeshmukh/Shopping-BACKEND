import express from 'express'
import { loginController, registerController, testController } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'

const router = express.Router()


//Register || method- POST
router.post('/register', registerController)

//Login || method- POST
router.post('/login', loginController)


//test || method- GET
router.get('/test', requireSignIn, isAdmin, testController)



export default router