import {Button} from "@/components/ui/button";
import {axiosBase} from "@/lib/axios/axios";
import {SetStyle} from "@/components/card/set-style";
export default async function CardStyle({params}:{params:{cardID:string}}) {
    const styleCardData= await axiosBase.get('/api/Style/StyleGetAll')
    const styleCard = styleCardData.data
    return (
        <div>
            <h2 className="text-2xl mb-2 font-semibold">Select Card Style </h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        <SetStyle listStyle={styleCard} cardID={params.cardID}/>
                    </ul>
                <Button variant="default" className="mt-5 float-right">
                    Save and Next
                </Button>
        </div>
    );
}
