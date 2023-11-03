"use client"
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";

export const AddHomeListing = () => {
    const {onOpen} = useModal();
    return(
        <Button onClick={() => onOpen("addHomeListing")} variant="default" className="flex items-center h-full justify-center mx-auto">
            <PlusCircle className="w-4 h-4 mr-2"/>
            Add New Listing
        </Button>
    )
}