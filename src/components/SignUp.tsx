"use client";
import {useForm, SubmitHandler} from "react-hook-form";
import {Badge, Button, Container, Input, Row, Spacer, Text} from "@nextui-org/react";
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
    username: z.string().min(3, {message: "Username is require"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(3, {message: "Password is require"}),
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
                <Input
                    status={errors.username?.message ? "error" : "default"}
                    aria-label={"username"}
                    clearable
                    placeholder="username"
                    size="sm"
                    {...register("username", {required: true})} />
                <Spacer y={0.5}/>
                <Input type={"email"}
                       status={errors.email?.message ? "error" : "default"}
                       aria-label={"email"} clearable placeholder="email"
                       size="sm"
                       {...register("email")} />
                <Spacer y={0.5}/>
                <Input.Password
                    status={errors.password?.message ? "error" : "default"}
                    aria-label={"password"}
                    clearable
                    placeholder="password"
                    size="sm"
                    {...register("password")} />
                <Spacer y={0.5}/>
                <Button type={"submit"} shadow color="gradient">Sign Up</Button>
                <Spacer y={0.5}/>
                {
                    errors.username?.message &&
                    <Row align={"center"} justify={"flex-start"}>
                        <Badge color="error" variant="dot"/>
                        <Text size={"$xs"} color="error">{errors.username?.message}</Text>
                    </Row>
                }
                {
                    errors.email?.message &&
                    <Row align={"center"} justify={"flex-start"}>
                        <Badge color="error" variant="dot"/>
                        <Text size={"$xs"} color="error">{errors.email?.message}</Text>
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

export default SignUp;



