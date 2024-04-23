import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"
import { comparePassword, hashpassword } from "../helper/authhelper.js"


const JWT_SECRET = 'krantikumar7171'



export const registerController = async (req, res) => {

    try {

        const { name, email, phone, address, password, answer } = req.body

        if (!name) {
            res.send({ error: "Name is required" })
        }
        if (!email) {
            res.send({ error: "Email is required" })
        }
        if (!phone) {
            res.send({ error: "Phone is required" })
        }
        if (!address) {
            res.send({ error: "Address is required" })
        }
        if (!password) {
            res.send({ error: "Password is required" })
        }
        if (!answer) {
            res.send({ error: "Answer is required" })
        }

        const existinguser = await userModel.findOne({ email })

        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'Already existing user'
            })
        }

        const hashedPasword = await hashpassword(password)

        const user = await new userModel({ name, email, phone, address, password: hashedPasword, answer }).save()

        res.send({
            success: true,
            message: 'User Registred Successfully',
            user: {
                name,
                email,
                phone,
                address,

            }

        })

    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: 'Error In Registration Of User',
            error
        })

    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.send({
                success: false,
                message: "fill all credentials"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(401).send({
                success: false,
                message: "invalid credentials(password)"
            })

        }

        const token = await JWT.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "error while user login"
        })

    }
}

export const forgotPasswordController = async (req, res) => {

    try {

        const { email, answer, newPassword } = req.body
        if (!email || !answer || !newPassword) {
            return res.status(404).send({
                success: false,
                message: "fill all the credentials"
            })

        }

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })

        }

        const hashed = await hashpassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })

        res.status(200).send({
            success: true,
            message: "Password updated successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "something went wrong "
        })

    }

}

export const testController = (req, res) => {
    try {

        return res.send("protected routes")

    } catch (error) {

        console.log(error)

    }
}