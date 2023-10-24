import axiosAuthServer from "@/lib/axios/axios-server";

export default async function Dashboard({params}: { params: { cardID: string } }) {
    const getCard = await axiosAuthServer.card.cardById(params.cardID)
    return (
        <div>
            {
                getCard.cardName
            }
        </div>
    );
}
