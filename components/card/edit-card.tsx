"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import {ActionTooltip} from "@/components/action-tooltip";
import {Button, buttonVariants} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";
import {MenuAnchor} from "@radix-ui/react-menu";
import {FaBurger} from "react-icons/fa6";

interface NavigationItemProps {
    cardId: string;
    cardName: string;
    cardImage: string;
}

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ExternalLink, LineChart, MoreVertical, Pencil, PenSquare, Trash2} from "lucide-react";
import Link from "next/link";

export const NavigationItem = (
    {
        cardId,
        cardName,
        cardImage
    }: NavigationItemProps) => {
    const router = useRouter();
    const {onOpen} = useModal();
    const onClick = () => {
        router.push(`/dashboard/cards/${cardId}`);
    }
    const passCard = {
        cardId: cardId,
        cardName: cardName
    }
    return (
        <>
            <div
                className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-80">
                <div className="flex justify-end px-4 pt-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <MoreVertical className="h-5 w-5"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-5" side={"bottom"}>
                            <DropdownMenuItem className="text-green-500">
                                <LineChart className="mr-2 h-4 w-4"/>
                                <span>Analytics</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="text-rose-500 hover:bg-red-400 hover:text-white cursor-pointer" onClick={() => onOpen("deleteCard", {passCard})}>
                                <Trash2 className="mr-2 h-4 w-4"/>
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex flex-col items-center pb-10">
                    <Image width="120" height="120" className="mb-3 rounded-full shadow-lg"
                           src={process.env.NEXT_PUBLIC_CARD_IMG + cardImage}
                           alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {cardName}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Style 4
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <Button
                            variant="default"
                            onClick={onClick}
                        >
                            <PenSquare className="mr-2 h-4 w-4"/>Edit
                        </Button>
                        <Link className={cn(buttonVariants({variant: "ghost"}), "border")} href="/">
                            <ExternalLink className="mr-2 h-4 w-4"/>
                            PreView
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}