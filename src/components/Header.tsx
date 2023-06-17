'use client'

import {useTheme as useNextTheme} from "next-themes";
import {Button, Grid, Row, Switch, useTheme} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {notification} from "@/utils/notification";
import {Cookie} from "@/types/cookieType";

export const Header = ({cookie} : Cookie) => {


    const router = useRouter()
    const {setTheme} = useNextTheme();
    const {isDark , type} = useTheme();
    const path : string | null = usePathname()

    const signOut = async () => {

        const toastId = toast.loading("Pleas wait ...")

       const res = (await fetch('/api/auth/signOut')).json()

        const {message} = await res

        notification(toastId , "success" , message)
        router.push('/signIn')
    }

    return (
        <Row justify={"space-between"} align={"center"} css={{padding : 15}}>
            <Grid.Container gap={1}>
                {
                    cookie ?
                        <>
                            <Grid>
                                <Button bordered={path !== "/dashboard"}  size="sm" flat color="primary">Dashboard</Button>
                            </Grid>
                            <Grid>
                                <Button onPress={signOut} bordered size="sm" flat color="primary">Sign Out</Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid>
                                <Button onPress={()=> router.push("/signIn")} bordered={path !== "/signIn"} shadow size="sm" color="gradient">Sign In</Button>
                            </Grid>
                            <Grid>
                                <Button onPress={()=> router.push("/signUp")} bordered={path !== "/signUp"} shadow size="sm" color="gradient">Sign Up</Button>
                            </Grid>
                        </>
                }
            </Grid.Container>
                <Switch
                    shadow
                    size="sm"
                    color="primary"
                    checked={isDark}
                    onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                />
        </Row>
    );
};
