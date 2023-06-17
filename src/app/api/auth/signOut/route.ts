import {serialize} from "cookie";
import {NextResponse} from "next/server";

export async function GET () {

    const serialized = serialize("MyBaby" , "" , {path : "/" , maxAge : 0})

    return NextResponse.json({message : "Sign Out process successful ! See you soon"} , {status : 200 , headers : {"Set-Cookie" : serialized}})
}