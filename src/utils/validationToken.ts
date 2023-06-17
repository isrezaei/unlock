import {verify} from "jsonwebtoken";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

export const validationToken = (token: string) => {

    const SECRET_KEY: string = process.env.NEXT_PUBLIC_SECRET_KEY || ""

    try {
        return verify(token, SECRET_KEY)
    } catch (e) {
        console.log(e)
    }
}