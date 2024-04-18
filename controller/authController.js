import userModel from "../models/userModel.js"
import { hashpassword } from "../helper/authhelper.js"


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
                success: true,
                message: 'Already existing user'
            })
        }

        const hashedPasword = await hashpassword(password)

        const user = await new userModel({ name, email, phone, address, password: hashedPasword, answer }).save()

        res.send({
            success: true,
            message: 'User registred Successfully',
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
            message: 'error in Registration of user',
            error
        })

    }


}