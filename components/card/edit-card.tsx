"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import {ActionTooltip} from "@/components/action-tooltip";
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";

interface NavigationItemProps {
    cardId: string;
    cardName: string;
    cardImage: string;
}

export const NavigationItem = (
    {
        cardId,
        cardName,
        cardImage
    }: NavigationItemProps) => {
    const router = useRouter();
    const { onOpen } = useModal();
    const onClick = () => {
        router.push(`/dashboard/cards/${cardId}`);
    }
    const passCard = {
        cardId : cardId,
        cardName : cardName
    }
    return (
        <>
            <div className={cn(
                "relative group flex mx-3 w-full h-full rounded overflow-hidden dark:bg-white bg-[#313338]"
            )}>
                <Image
                    fill
                    src={process.env.NEXT_PUBLIC_BACKEND_URL+'/Images/CardImages/'+cardImage}
                    alt="Channel"
                />
            </div>
            <h5 className="text-xl font-semibold">{cardName}</h5>
            <div className="flex justify-between items-center w-full mt-3">
                <ActionTooltip
                    side="right"
                    align="center"
                    label={cardName}
                >
                    <Button
                        variant="primary"
                        onClick={onClick}
                    >
                        Edit
                    </Button>
                </ActionTooltip>
                <ActionTooltip
                    side="right"
                    align="center"
                    label={`Delete card ${cardName}`}
                >
                    <Button
                        variant="destructive"
                        onClick={() => onOpen("deleteCard", { passCard })}
                    >
                        Delete
                    </Button>
                </ActionTooltip>
            </div>
        </>
    )
}