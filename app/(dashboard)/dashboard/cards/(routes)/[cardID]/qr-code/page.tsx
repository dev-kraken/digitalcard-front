import {QrCodeGenerator} from "@/components/card/qr-code-generator";

export default async function QrCode({params}: { params: { cardID: string } }) {

    return (
        <div className="h-full flex items-center">
            <QrCodeGenerator  paramsCardId={params.cardID}/>
        </div>
    );
}
