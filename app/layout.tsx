import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import './globals.css'
import {NextAuthSession} from "@/components/providers/session-provider";
import React from "react";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {ModalProvider} from "@/components/providers/modal-providers";

const inter = Poppins({ weight: ["200","300","400", "500","600", "700"],
    subsets: ["latin"],
    variable: '--font-roboto',})

export const metadata: Metadata = {
    title: "Welcome Digital Business Card",
    description: "Next Level Digital Business Card",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="devKraken-theme"
        >
            <NextAuthSession>
                <ModalProvider/>
                {children}
            </NextAuthSession>
        </ThemeProvider>
        </body>
        </html>
    )
}
