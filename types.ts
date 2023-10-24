type AllCard = {
    id: number;
    cardGuid: string;
    cardName: string;
    cardImageOrg: string;
    cardImageSysName: string;
};

type ReqResponse = {
    success: boolean;
    errorMessage: null | string;
}
export type AllCards = AllCard;
export type ReqRes = ReqResponse;