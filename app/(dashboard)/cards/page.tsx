import {PlusCircle} from "lucide-react";
import {AllCards} from "@/components/card/all-cards";

export default async function Cards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
            <AllCards />
            <div className="w-100 h-80 border border-zinc-400 border-dashed p-4 rounded">
                <div className="flex flex-col items-center h-full justify-center">
                    <PlusCircle className="w-8 h-8 text-zinc-500"/>
                    <h5 className="text-sm mt-2 font-medium text-zinc-400 italic">Add New Card</h5>
                </div>
            </div>

        </div>
    )
}
