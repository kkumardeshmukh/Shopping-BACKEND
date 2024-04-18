import express from 'express'
import { registerController } from '../controller/authController.js'

const router = express.Router()


//Register || method- POST
router.post('/register', registerController)



export default router