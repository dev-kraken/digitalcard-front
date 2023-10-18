import { InitialModal } from "@/components/modals/initial-modal";
import { AuthGetApi } from "@/lib/fetchData";
import {redirect} from "next/navigation";

type Card = {
    id: number;
    cardGuid: string;
    cardName: string;
    cardImageOrg: string;
    cardImageSysName: string;
};

export default async function Home() {
    const card: Card[] = await AuthGetApi('/api/Card/GetCardByUser');
    if (card.length > 0) {
        return redirect('/dashboard')
    }
    return <InitialModal/>;
}
