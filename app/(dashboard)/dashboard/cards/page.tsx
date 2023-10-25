import {AllCards} from "@/components/card/all-cards";
import {AddCard} from "@/components/card/add-card";

export default async function Cards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-3">
            <AllCards />
            <div className="w-100 h-full border-2 border-purple-400 border-dashed p-3 rounded shadow-sm">
                <AddCard />
            </div>

        </div>
    )
}
