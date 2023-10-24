"use client"
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {TrendingUpIcon, LayoutDashboard, WalletCards, Settings, QrCode, ArrowLeft} from "lucide-react";
import { useParams } from 'next/navigation'
const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: "text-violet-500",
    },
    {
        label: 'Cards',
        icon: WalletCards,
        href: '/dashboard/cards',
        color: "text-sky-500",
    },
    {
        label: 'Leads',
        icon: TrendingUpIcon,
        href: '/conversation',
        color: "text-violet-500",
    },
    {
        label: 'QrCode',
        icon: QrCode,
        href: '/qrcode',
        color: "text-orange-700",
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];
const routes1 = [
    {
        label: 'Go Back',
        icon: ArrowLeft,
        href: '/dashboard/cards',
        color: "text-violet-500",
    },
    {
        label: 'ad',
        icon: WalletCards,
        href: '/dashboard/cards',
        color: "text-sky-500",
    },
    {
        label: 'Leads',
        icon: TrendingUpIcon,
        href: '/conversation',
        color: "text-violet-500",
    },
    {
        label: 'QrCode',
        icon: QrCode,
        href: '/qrcode',
        color: "text-orange-700",
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];


export const MainSideBar = () => {
    const params = useParams()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray-200 text-zinc-800">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative h-8 w-8 mr-4">
                        <Image className="rounded-full" fill alt="Logo"
                               src="/logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold")}>
                        Name
                    </h1>
                </Link>
                <div className="space-y-1">
                    {!params.cardID ? routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg transition"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    )) : routes1.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg transition"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};