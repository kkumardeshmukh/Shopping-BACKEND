import express from 'express'
import { forgotPasswordController, loginController, registerController, testController } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'

const router = express.Router()


//Register || method- POST
router.post('/register', registerController)

//Login || method- POST
router.post('/login', loginController)

//Forgot-password || method- POST
router.post('/forgotpassword', forgotPasswordController)


//test || method- GET
router.get('/test', requireSignIn, isAdmin, testController)

//checking of private user route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//checking of private user route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})



export default router