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

type SocialMediaData = {
    id: number;
    label: string;
    type: string;
    value: string;
};

type CardProfileT = {
    profileName: string;
    licenseNumber: string;
    subHeader: string;
    profileImageOrginalName: string;
    profileImagesysName: string;
}

type ReqResponse = {
    success: boolean;
    errorMessage: null | string;
}

type styleResponse = {
    id: number,
    cardId: string,
    styleId: number
}

type State = {
    id: string;
    name: string;
    abbreviation: string;
    countryId: number;
}
export type AllCards = AllCard;
export type ReqRes = ReqResponse;
export type SocialMedia = SocialMediaT;
export type SocialMediaD = SocialMediaData;
export type CardProfile = CardProfileT;
export type StyleGet = styleResponse;
export type AllState = State;