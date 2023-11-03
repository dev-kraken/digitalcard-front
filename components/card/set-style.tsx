"use client"
import Image from "next/image";
import {CheckCircle2} from "lucide-react";
import {useGetStyle, useSetCard} from "@/hooks/query";
import {useParams} from "next/navigation";
import {useState} from "react";
import {cn} from "@/lib/utils";
interface StyleCard {
    id: number;
    name: string;
    styleImageOrg: string
    styleImageSysName: string
    isFree: boolean
}

interface ListStyleProps {
    listStyle: StyleCard[]
    cardID: string
}

export function SetStyle({listStyle, cardID}: ListStyleProps) {
    const [pending, setPending] = useState(false)
    const {mutate: addMutate} = useSetCard();
    const {data: dataStyle, isLoading} = useGetStyle(cardID)
    const params = useParams()
    const onClickSetStyle = (styleID: number) => {
        setPending(true)
        const dataSetCard = {
            cardId: params.cardID,
            styleId: styleID
        }
        addMutate(
            {dataSetCard},
            {
                onSuccess: () => {
                    setPending(false)
                    console.log('Success')
                },
            }
        );
    }
    return (
        <>
            {
                listStyle.map((style) => (
                    <li key={`12${style.id}`}>
                        <div className="relative w-fit border-dashed border-2 border-purple-400 rounded-3xl">
                            <label htmlFor={`style${style.id}`}
                                   className={cn(pending && "pointer-events-none ", "cursor-pointer")}>
                                <input checked={style.id == dataStyle?.styleId} onChange={() => {}} onClick={() => {onClickSetStyle(style.id)}} type="radio" id={`style${style.id}`} name="hosting" value="hosting-big"
                                       className="hidden peer"/>

                                <Image width="300" height="50" className=""
                                       src={process.env.NEXT_PUBLIC_STYLE_IMG + style.styleImageSysName}
                                       alt={style.styleImageOrg}/>
                                <div
                                    className="w-full h-full backdrop-brightness-50 absolute top-0 rounded-2xl invisible peer-checked:visible"></div>
                                <CheckCircle2
                                    className="w-8 h-8 invisible peer-checked:visible absolute bg-white rounded-full bottom-3 left-0 right-0 flex mx-auto transition-all text-blue-500 shadow "/>
                            </label>
                        </div>
                    </li>
                ))
            }
        </>
    )
}