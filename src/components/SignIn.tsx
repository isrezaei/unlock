"use client";
import {useForm, SubmitHandler} from "react-hook-form";
import {Badge, Button, Container, Grid, Input, Row, Spacer, Text} from "@nextui-org/react";
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
    emailOrUsername: z.string().min(5, {message: "Username or email is required !"}),
    password: z.string().min(5, {message: "Password is required !"}),
})


const SignIn = () => {

    const router: AppRouterInstance = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        setError,
    } = useForm<IFormsInput>({
        resolver: zodResolver(signUpSchema)
    });

    console.log(errors)

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
                setError('password', {type: 'custom', message: 'Username or password is wrong !'});
                setError('emailOrUsername', {type: 'custom', message: 'Username or password is wrong !'});


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
                <Input type={"email"}
                       aria-label={"email"}
                       status={errors.emailOrUsername?.message ? "error" : "default"}
                       clearable
                       placeholder="username or email"
                       size="sm" {...register("emailOrUsername")} />
                <Spacer y={0.5}/>

                <Input.Password aria-label={"password"}
                                status={errors.password?.message ? "error" : "default"}
                                clearable
                                placeholder="password"
                                size="sm" {...register("password")} />

                <Spacer y={0.5}/>
                <Button type={"submit"} size={"sm"} shadow color="gradient">Sign Up</Button>
                <Spacer y={0.5}/>

                {
                   (errors.emailOrUsername?.message && errors.emailOrUsername?.type !== "custom") &&

                    <Row align={"center"} justify={"flex-start"}>
                        <Badge color="error" variant="dot"/>
                        <Text size={"$xs"} color="error">{errors.emailOrUsername?.message}</Text>
                    </Row>
                }
                {
                    errors.password?.message &&
                    <Row align={"center"} justify={"flex-start"}>
                        <Badge color="error" variant="dot"/>
                        <Text size={"$xs"} color="error">{errors.password?.message}</Text>
                    </Row>
                }

            </Container>
        </form>
    );
};

export default SignIn;

