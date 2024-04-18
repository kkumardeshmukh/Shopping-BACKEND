import bcrypt from 'bcrypt'

export const hashpassword = async (password) => {
    try {

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword

    } catch (error) {
        console.log(error)
    }

}

export const comparePassword = async (password, hashedPassword) => {
    try {

        return bcrypt.compare(password, hashedPassword)

    } catch (error) {
        console.log('error while comparing password' + error)
    }

}