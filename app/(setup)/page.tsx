import {InitialModal} from "@/components/modals/initial-modal";
import axiosAuthServer from "@/lib/axios/axios-server";
import {redirect} from "next/navigation";

export default async function Home() {
    const allCards = await axiosAuthServer.card.allCards();
    if (allCards.length > 0 ){
        return redirect('/dashboard')
    }
    return <InitialModal/>;
}
