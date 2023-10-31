import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import './globals.css'
import {NextAuthSession} from "@/components/providers/session-provider";
import React from "react";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {ModalProvider} from "@/components/providers/modal-providers";
import ReactQueryClient from "@/components/providers/react-query";
import {Toaster} from "sonner";
const poppins = Poppins({
    weight: ["200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: '--font-roboto',
})

export const metadata: Metadata = {
    title: "Welcome Digital Business Card",
    description: "Next Level Digital Business Card",
};

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={poppins.className}>

        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="devKraken-theme"
        >
            <NextAuthSession>
                <ReactQueryClient>
                    <ModalProvider/>
                    <Toaster richColors={true} position="bottom-center"/>
                    {children}
                </ReactQueryClient>
            </NextAuthSession>
        </ThemeProvider>
        </body>
        </html>
    )
}
