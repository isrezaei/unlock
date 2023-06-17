import {z} from "zod"

export const zodEmail: z.ZodObject<any> = z.object({
    emailOrUsername : z.string().email()
})
