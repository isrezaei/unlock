import bcrypt from 'bcryptjs';

const encryptPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch (e) {
        console.log(e + " hashed password process is failed !")
    }
}

export default encryptPassword