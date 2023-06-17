"use client"

import {NextUIProvider} from "@nextui-org/react";
import {createTheme} from "@nextui-org/react";
import {ReactNode} from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ToastContainer} from 'react-toastify';

interface RootLayout {
    children: ReactNode;
}

export function Provider({children}: RootLayout) {

    const lightTheme = createTheme({
        type: "light",
        theme: {
            colors: {}, // optional
        },
    });

    const darkTheme = createTheme({
        type: "dark",
        theme: {
            colors: {}, // optional
        },
    });

    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className,
            }}
        >
            <NextUIProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {children}
                <ToastContainer/>
            </NextUIProvider>
        </NextThemesProvider>
    );
}
