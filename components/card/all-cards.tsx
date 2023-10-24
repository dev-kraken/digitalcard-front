import * as React from "react";
import { NavigationItem } from "@/components/card/edit-card";
import axiosAuthServer from "@/lib/axios/axios-server";
export async function AllCards() {
    const allCardRes = await axiosAuthServer.card.allCards()

    if (!allCardRes){
        return (<div>loading</div>)
    }
    return (
        <>
            {allCardRes.map((card) => (
                <div key={card.cardGuid}
                     className="w-100 h-80 border border-teal-600 p-2 rounded flex flex-col justify-center items-center">
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
