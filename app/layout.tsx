import './globals.css'
import type {Metadata} from 'next'
import {Open_Sans} from 'next/font/google'
import React from "react";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {getServerSession} from "next-auth";
import SessionProvider from "@/components/session-provider";
import {ModalProvider} from "@/components/providers/modal-providers";

const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Next Level Digital Business Card",
};

export default async function RootLayout({children,}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();
    return (
        <html lang="en">
        <body className={cn(openSans.className, "bg-white dark:bg-[#313338]")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="devKraken-theme"
        >
            <SessionProvider session={session}>
                <ModalProvider/>
                {children}
            </SessionProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
