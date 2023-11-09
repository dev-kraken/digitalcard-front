"use client"
import * as React from "react";
import {NavigationItem} from "@/components/card/edit-card";
import {useAllCards} from "@/hooks/query";
import {Skeleton} from "@/components/ui/skeleton";
import {useGetAllCardsQuery} from "@/redux/services/cardApi";
export function AllCards() {
    const {data, isLoading, isError} = useGetAllCardsQuery(null)
    if (isLoading) {
        return (
            <div className="rounded flex flex-col justify-center items-center">
                <div
                    className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-80">
                    <div className="flex flex-col items-center pb-10">
                        <Skeleton className="h-[120px] w-[120px] rounded-full mt-8"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            <Skeleton className="h-8 w-[200px] mt-4"/>
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                         <Skeleton className="h-4 w-[100px] mt-2"/>
                    </span>
                        <div className="flex mt-2 space-x-3 md:mt-6">
                            <Skeleton className="h-10 w-[100px]"/>
                            <Skeleton className="h-10 w-[100px]"/>
                        </div>
                    </div>
                </div>
            </div>
        )
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