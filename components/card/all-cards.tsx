"use client"
import * as React from "react";
import { NavigationItem } from "@/components/card/edit-card";
import { useEffect, useState } from "react";
import axiosR from "@/utils/axios";
type Card = {
    id: number;
    cardGuid: string;
    cardName: string;
    cardImageOrg: string;
    cardImageSysName: string;
};
export function AllCards() {
    const [allCards, setAllCards] = useState<Card[]>([]); // Initialize with an empty array
    useEffect(() => {
        const getCards = async () => {
            try {
                const response = await axiosR.card.allCards();
                setAllCards(response); // Update allCards with the response data
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        getCards(); // Call the async function inside useEffect
    }, []);

    return (
        <>
            {allCards.map((card) => (
                <div key={card.cardGuid} className="w-100 h-80 border border-teal-600 p-2 rounded flex flex-col justify-center items-center">
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
