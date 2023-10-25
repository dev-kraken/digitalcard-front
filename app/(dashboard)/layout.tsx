import React from "react";
import {MainSideBar} from "@/components/dashboard/main-sidebar";
import Navbar from "@/components/dashboard/navbar";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

const DashboardLayout = async ({children}: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-200">
                <div className="space-y-4 py-4 flex flex-col h-full backdrop-blur-sm bg-white/30 text-zinc-800 border-r-2 border-slate-300">
                    <div className="px-3 py-2 flex-1">
                        <Link href="/dashboard" className="flex items-center">
                            <div className="relative h-14 w-14 mr-2">
                                <Image className="rounded-full" fill alt="Logo"
                                       src="/crystal.png"/>
                            </div>
                            <h1 className="text-2xl font-semibold italic">
                                Crystal
                            </h1>
                        </Link>
                        <Separator orientation="horizontal" className="my-4"/>
                        <MainSideBar/>
                    </div>
                </div>
            </div>
            <main className="md:pl-56 pb-10">
                <Navbar/>
                {children}
            </main>
        </div>
    )
}
export default DashboardLayout;