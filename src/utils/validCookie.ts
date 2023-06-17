import {cookies} from "next/headers";
import {validationToken} from "@/utils/validationToken";
import {redirect} from "next/navigation";

export const validCookie = async () =>
{
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('MyBaby') // Find cookie

    const cookie= await validationToken(token?.value || "")

    return {cookie}
}