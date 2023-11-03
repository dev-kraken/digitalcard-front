import {ProfileSection} from "@/components/card/profile-card";

export default async function CardProfile({params}: { params: { cardID: string } }) {

    return (
        <div className="h-full flex items-center">
            <ProfileSection paramsCardId={params.cardID}/>
        </div>
    );
}
