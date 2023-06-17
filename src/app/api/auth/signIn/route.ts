import {NextResponse} from "next/server";
import connectDb from "@/utils/connectDb";
import users from "@/model/users";
import {zodEmail} from "@/utils/zodValidations";
import decryptPassword from "@/utils/decryptPassword";
import {sign} from "jsonwebtoken";
import {serialize} from "cookie"

interface ISignInFrom {
    emailOrUsername: string
    password: string
}

const SECRET_KEY : string = process.env.NEXT_PUBLIC_SECRET_KEY || ""


export async function POST(req: Request) {


    try {
        await connectDb()
    } catch (e) {
        console.log(e)
        return NextResponse.json({message: "connection to database is failed", data: null}, {status: 500})
    }


    const body: ISignInFrom = await req.json()

    console.log(body)


    const email = zodEmail.safeParse({emailOrUsername: body.emailOrUsername})

    const user = await users.findOne({[email.success ? "email" : "username"]: body.emailOrUsername})
    if (!user) return NextResponse.json({message: "user not exist!", data: null}, {status: 422})


    const password: boolean = await decryptPassword(body.password, user.password)

    if (!password) return NextResponse.json({
        message: "check your username and email or password again !",
        data: null
    }, {status: 422})


    const token = sign({email: user.email}, SECRET_KEY, {expiresIn: 60 * 60})

    const serialized = serialize("MyBaby", token, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: "/"
    })

    return NextResponse.json({message : "signIn is successful"} , {status : 200 , headers : {"Set-Cookie" : serialized}})
}