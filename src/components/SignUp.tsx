"use client";
import {useForm, SubmitHandler} from "react-hook-form";
import {Button, Container, Input, Spacer} from "@nextui-org/react";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {notification} from "@/utils/notification";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

interface IFormsInput {
    username: string,
    email: string,
    password: string
}

const signUpSchema = z.object({
    username: z.string().min(5, {message: "Username is short"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(5, {message: "Password is short"}),
})

const SignUp = () => {

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
            const Response = await fetch("/api/auth/signUp", {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })


            const info = await Response.json()

            console.log(info)

            if (Response.status === 422) {
                notification(id, "warning", info.message)

            }
            if (Response.status === 201) {
                notification(id, "success", info.message)
                return router.push('/signIn')
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <Container
                xs
                display={"flex"}
                direction={"column"}
                css={{padding: "10px", width: 350}}
            >
                <Input aria-label={"username"} clearable initialValue="" placeholder="username"
                       size="sm" {...register("username", {required: true})} />
                {errors.username?.message && <p>{errors.username?.message}</p>}
                <Spacer y={0.5}/>
                <Input type={"email"} aria-label={"email"} clearable initialValue="" placeholder="email"
                       size="sm" {...register("email")} />
                {errors.email?.message && <p>{errors.email?.message}</p>}
                <Spacer y={0.5}/>
                <Input.Password aria-label={"password"} clearable initialValue="" placeholder="password"
                                size="sm" {...register("password")} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
                <Spacer y={0.5}/>
                <Button type={"submit"}>Sign Up</Button>
            </Container>
        </form>
    );
};

export default SignUp;



