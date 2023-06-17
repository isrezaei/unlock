import SignIn from "@/components/SignIn";
import {redirect} from "next/navigation";
import {Header} from "@/components/Header";
import {validCookie} from "@/utils/validCookie";
import {Cookie} from "@/types/cookieType";


export default async function signIn() {

    const {cookie} : Cookie = await validCookie()
    if (cookie) redirect("/")

    return (
        <>
            <Header cookie={cookie}/>
            <SignIn/>
        </>
    )
}