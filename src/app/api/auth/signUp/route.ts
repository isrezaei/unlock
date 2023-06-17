import {NextResponse} from "next/server";
import connectDb from "@/utils/connectDb";
import users from "@/model/users";
import encryptPassword from "@/utils/encryptPassword";

interface ISignUpForm {
    username: string,
    email: string,
    password: string
}

export async function POST(req: Request) {

    try {
        await connectDb()
    } catch (e) {
        console.log(e)
        return NextResponse.json({message: "connection to database is failed", data: null}, {status: 500})
    }


    const body: ISignUpForm = await req.json()


    const handelExistUser : object | null  = await users.findOne({email: body.email})

    if (handelExistUser) {
        return NextResponse.json({message: "users already exist !", data: null}, {status: 422})
    }

    const hashedPassword: string | undefined = await encryptPassword(body.password)


    if (!hashedPassword) {
        return NextResponse.json({message: "something is wrong in hashed password !", data: null}, {status: 422})
    }

    await users.create({
        username: body.username,
        email: body.email,
        password: hashedPassword
    })

    return NextResponse.json(
        {
            message: "create users successful !",
            data: {
                username: body.username,
                email: body.email,
            }},
        {status: 201})
}