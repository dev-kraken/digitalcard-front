import {AllCards} from "@/components/card/all-cards";
import {AddCard} from "@/components/card/add-card";

export default async function Cards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
            <AllCards />
            <div className="w-100 h-[300px] border border-zinc-400 border-dashed p-3 rounded">
                <AddCard />
            </div>

        </div>
    )
}
