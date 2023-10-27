"use client"
import Link from "next/link";
import {cn} from "@/lib/utils";
import {
    TrendingUpIcon,
    LayoutDashboard,
    WalletCards,
    Settings,
    QrCode,
    ArrowLeft,
    User,
    Info,
    Command, Home, Star, LayoutPanelLeft, Contact
} from "lucide-react";
import {useParams, usePathname} from 'next/navigation'
import {motion, HTMLMotionProps} from 'framer-motion'
import {Skeleton} from "@/components/ui/skeleton";
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



export const MainSideBar = () => {
    const params = useParams()
    const pathName = usePathname()
    const routes1 = [
        {
            label: 'Go Back',
            icon: ArrowLeft,
            href: '/dashboard/cards',
            color: "text-violet-500",
        },
        {
            label: 'Card Home',
            icon: LayoutPanelLeft,
            href: `/dashboard/cards/${params?.cardID}`,
            color: "text-sky-500",
        },
        {
            label: 'Card Styles',
            icon: WalletCards,
            href: `/dashboard/cards/${params?.cardID}/card-style`,
            color: "text-sky-500",
        },
        {
            label: 'Profile',
            icon: User,
            href: `/dashboard/cards/${params?.cardID}/profile`,
            color: "text-violet-500",
        },
        {
            label: 'Social Media',
            icon: Command,
            href: `/dashboard/cards/${params?.cardID}/media`,
        },
        {
            label: 'About',
            icon: Info,
            href: `/dashboard/cards/${params?.cardID}/about`,
            color: "text-orange-700",
        },
        {
            label: 'Listings',
            icon: Home,
            href: `/dashboard/cards/${params?.cardID}/listing`,
        },
        {
            label: 'Reviews',
            icon: Star,
            href: `/dashboard/cards/${params?.cardID}/reviews`,
        },
        {
            label: 'Contact Form',
            icon: Contact,
            href: `/dashboard/cards/${params?.cardID}/contact-form`,
        },
    ];
    return (
        <>
            {!params.cardID && (
                <motion.div
                    initial={{x: -10, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: 10, opacity: 0}}
                    transition={{duration: 0.4}}
                >
                    <div className="space-y-1">
                        {routes ? (
                            routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn((route.href === pathName && 'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600'),
                                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-600 hover:bg-gradient-to-r from-purple-100 to-purple-400 rounded-lg transition"
                                    )}
                                >
                                    <div className="flex items-center flex-1">
                                        <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                        {route.label}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <Skeleton className="h-12 w-12 rounded-full"/>
                        )}
                    </div>
                </motion.div>
            )}
            {params.cardID && (
                <motion.div
                    initial={{x: 10, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: -10, opacity: 0}}
                    transition={{duration: 0.4}}
                >
                    <div className="space-y-1">
                        {routes1.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn((route.href === pathName && 'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600'),
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-600 hover:bg-gradient-to-r from-purple-100 to-purple-400 rounded-lg transition"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                    {route.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    );
};