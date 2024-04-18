import bcrypt from 'bcrypt'

export const hashpassword = async (password) => {
    try {

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword

    } catch (error) {
        console.log('error')
    }

}