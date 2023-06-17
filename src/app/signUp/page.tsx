import SignUp from "@/components/SignUp";
import {redirect} from "next/navigation";
import {validCookie} from "@/utils/validCookie";
import {Header} from "@/components/Header";
import {Cookie} from "@/types/cookieType";

export default async function signUp() {

    const {cookie} : Cookie = await validCookie()

    if (cookie) redirect("/")

    return (
        <>
            <Header cookie={cookie}/>
            <SignUp/>
        </>
    )
};

