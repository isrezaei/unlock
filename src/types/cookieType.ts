import {JwtPayload} from "jsonwebtoken";

export type Cookie = {
    cookie : string | JwtPayload | undefined
}