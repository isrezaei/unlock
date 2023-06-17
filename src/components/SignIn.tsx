"use client";
import {useForm, SubmitHandler} from "react-hook-form";
import {Button, Container, Input, Spacer} from "@nextui-org/react";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {notification} from "@/utils/notification";
import {toast} from "react-toastify";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useRouter} from "next/navigation";

interface IFormsInput {
    emailOrUsername: string
    password: string
}

const signUpSchema = z.object({
    emailOrUsername: z.string().min(5, {message: "username or email is uncorrected"}),
    password: z.string().min(5, {message: "Password is short"}),
})

const SignIn = () => {

    const router: AppRouterInstance = useRouter()


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<IFormsInput>({
        resolver: zodResolver(signUpSchema)
    });

    const onsubmit: SubmitHandler<IFormsInput> = async (data: IFormsInput, event) => {
        event?.preventDefault()

        const id = toast.loading("Please wait...")

        try {
            const Response =
                await fetch("/api/auth/signIn", {
                    method: "POST",
                    body: JSON.stringify({
                        emailOrUsername: data.emailOrUsername,
                        password: data.password
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

            const info = await Response.json()

            if (Response.status === 422) {
                notification(id, "error", info.message)

            }
            if (Response.status === 200) {
                notification(id, "success", info.message)
                return router.push('/')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <Container
                display={"flex"}
                direction={"column"}
                css={{padding: "10px", width: 350}}
            >
                <Spacer y={0.5}/>
                <Input type={"email"} aria-label={"email"} clearable placeholder="username or email"
                       size="sm" {...register("emailOrUsername")} />
                {errors.emailOrUsername?.message && <p>{errors.emailOrUsername?.message}</p>}
                <Spacer y={0.5}/>
                <Input.Password aria-label={"password"} clearable initialValue="" placeholder="password"
                                size="sm" {...register("password")} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
                <Spacer y={0.5}/>
                <Button type={"submit"} size={"sm"} shadow color="gradient">Sign Up</Button>
            </Container>
        </form>
    );
};

export default SignIn;

