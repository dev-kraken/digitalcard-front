import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import Style1 from "@/components/card-style/style1";
import Style2 from "@/components/card-style/style2";

export default function CardLayout({children, params}: { children: React.ReactNode,params: { cardID: string } }) {
    let styleCard = 2
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3">
            <div className="col-span-2">
                {children}
            </div>
            <div className="h-full flex items-center">
                <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                        <ScrollArea className="h-full p-2 rounded-[1.5rem]">
                            {(() => {
                                switch (styleCard) {
                                    case 1:
                                        return <Style1/>
                                    case 2:
                                        return <Style2/>
                                    default:
                                        return null
                                }
                            })()}
                        </ScrollArea >
                    </div>
                </div>
            </div>
        </div>
    )
}