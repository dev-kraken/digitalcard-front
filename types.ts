type AllCard = {
    id: number;
    cardGuid: string;
    cardName: string;
    cardImageOrg: string;
    cardImageSysName: string;
};
type SocialMediaT = {
    id: number;
    label: string;
    icon: string;
    type: string;
    disable: boolean;
    socialNetworkCategory: {
        id: number;
        name: string;
        priority: number;
    }
};

type ReqResponse = {
    success: boolean;
    errorMessage: null | string;
}
export type AllCards = AllCard;
export type ReqRes = ReqResponse;
export type SocialMedia = SocialMediaT;