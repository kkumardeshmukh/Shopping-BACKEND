import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"


const JWT_SECRET = 'krantikumar7171'

export const requireSignIn = async (req, res, next) => {

    try {
        const decode = JWT.verify(req.headers.authorization, JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.send({ message: "error in sign in middleware" })
    }

}


export const isAdmin = async (req, res, next) => {

    try {

        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.send({
                success: false,
                message: "Unauthorized user"
            })

        } else {
            next()
        }

    } catch (error) {
        console.log(error)
    }
}