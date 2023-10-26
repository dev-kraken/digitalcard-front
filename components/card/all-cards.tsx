"use client"
import * as React from "react";
import { NavigationItem } from "@/components/card/edit-card";
import {useAllCards} from "@/hooks/query";
export function AllCards() {
    const {data , isLoading, isError} = useAllCards()
    if (isLoading){
        return <div>Loading</div>
    }
    return (
        <>
            {data?.map((card) => (
                <div key={card.cardGuid}
                     className="rounded flex flex-col justify-center items-center">
                    <NavigationItem
                        cardId={card.cardGuid}
                        cardName={card.cardName}
                        cardImage={card.cardImageSysName}
                    />
                </div>
            ))}
        </>
    );
}
