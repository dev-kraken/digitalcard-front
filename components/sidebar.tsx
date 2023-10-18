"use client"
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useParams, usePathname} from "next/navigation";
import {TrendingUpIcon, LayoutDashboard, WalletCards, Settings, QrCode} from "lucide-react";
import {useEffect, useState} from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";

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

const cardRoutes = [
    {
        label: 'All Cards',
        icon: LayoutDashboard,
        href: '/dashboard/cards',
        color: "text-violet-500",
    },

    {
        label: 'Profile',
        icon: WalletCards,
        href: '/dashboard/cards',
        color: "text-sky-500",
    },
    {
        label: 'About',
        icon: TrendingUpIcon,
        href: '/conversation',
        color: "text-violet-500",
    },
    {
        label: 'Testimonial',
        icon: QrCode,
        href: '/qrcode',
        color: "text-orange-700",
    },
    {
        label: 'Listing',
        icon: Settings,
        href: '/settings',
    },
];

type CardData = {
    cardGuid: string;
    cardImageOrg: string;
    cardImageSysName: string;
    cardName: string;
    id: number;
};

export const Sidebar = () => {
    const params = useParams();
    const axiosAuth = useAxiosAuth();
    const [cardInfo, setCardInfo] = useState<CardData | null>(null);

    useEffect(() => {
        if (params.cardID) {
            (async () => {
                try {
                    const res = await axiosAuth.get(`/api/Card/GetCardById?id=${params.cardID}`);
                    setCardInfo(res.data);
                } catch (error) {
                    // Handle error here
                }
            })();
        } else {
            setCardInfo(null);
        }
    }, [params.cardID, axiosAuth]);
    const renderRoutes = params.cardID ? cardRoutes : routes;

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray-200 text-zinc-800">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative h-8 w-8 mr-4">
                        <Image className="rounded-full" fill alt="Logo"
                               src={cardInfo ? process.env.NEXT_PUBLIC_BACKEND_URL + '/Images/CardImages/' + cardInfo?.cardImageSysName : "/logo.png"}/>
                    </div>
                    <h1 className={cn("text-2xl font-bold")}>
                        {cardInfo ? cardInfo?.cardName : 'Name'}
                    </h1>
                </Link>
                <div className="space-y-1">
                    {renderRoutes.map((route) => (
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
