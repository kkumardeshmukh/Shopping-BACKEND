import express from 'express'
import { loginController, registerController } from '../controller/authController.js'

const router = express.Router()


//Register || method- POST
router.post('/register', registerController)

//Login || method- POST
router.post('/login', loginController)



export default router