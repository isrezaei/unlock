import bcrypt from "bcryptjs";
const decryptPassword = async (clientPassword : string , hashedPassword : string) => {

    const comparePassword : boolean  = await bcrypt.compare(clientPassword , hashedPassword)
    return comparePassword

}
export default decryptPassword