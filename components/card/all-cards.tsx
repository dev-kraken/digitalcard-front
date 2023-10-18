import * as React from "react"
import {AuthGetApi} from "@/lib/fetchData";
import {NavigationItem} from "@/components/card/edit-card";

type Card = {
    id: number;
    cardGuid: string;
    cardName: string;
    cardImageOrg: string;
    cardImageSysName: string;
};
export async function AllCards() {
    const cards: Card[] = await AuthGetApi('/api/Card/GetCardByUser');
    return (
        <>
            {cards.map((card) => (
                <div key={card.cardGuid} className="w-100 h-80 border border-teal-600 p-2 rounded flex flex-col justify-center items-center">
                    <NavigationItem
                        cardId={card.cardGuid}
                        cardName={card.cardName}
                        cardImage={card.cardImageSysName}
                    />
                </div>
                ))}
        </>
    )
}
