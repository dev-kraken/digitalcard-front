"use client"
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";

export const AddCard = () => {
    const {onOpen} = useModal();
    return(
        <Button onClick={() => onOpen("createCard")} variant="ghost" className="flex flex-col items-center h-full justify-center mx-auto hover:bg-transparent">
            <PlusCircle className="text-green-500 w-8 h-8 "/>
            <h5 className="text-sm mt-2 font-medium text-green-400 italic">Add New Card</h5>
        </Button>
    )
}