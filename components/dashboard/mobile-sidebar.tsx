"use client";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {MainSideBar} from "@/components/dashboard/main-sidebar";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden" asChild>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <div className="h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-200">
                    <div className="space-y-4 py-1 flex flex-col h-full backdrop-blur-sm bg-white/30 text-zinc-800 border-r-2 border-slate-300">
                        <div className="px-3 py-2 flex-1">
                            <Link href="/dashboard" className="flex items-center">
                                <div className="relative h-10 w-10 mr-2">
                                    <Image className="rounded-full" fill alt="Logo"
                                           src="/crystal.png"/>
                                </div>
                                <h1 className="text-1xl font-semibold italic">
                                    Crystal
                                </h1>
                            </Link>
                            <Separator orientation="horizontal" className="my-4"/>
                            <MainSideBar/>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;
