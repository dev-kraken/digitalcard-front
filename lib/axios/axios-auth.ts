"use client"
import axios, {AxiosResponse} from "axios";
import {AllCards, ReqRes, SocialMedia} from "@/types";
import {getCookie, setCookie} from 'cookies-next';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const axiosAuthC = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});

const fetchToken = async () => {
    try {
        const CookieAuth = getCookie('next-ha-ha')
        if (!CookieAuth){
            const response = await axios.get(`/api/auth/token`);
            setCookie('next-ha-ha', response.data.token.accessToken)
            return Promise.resolve(response.data.token.accessToken);
        }
        return Promise.resolve(CookieAuth);
    } catch (err) {
        throw err;
    }
};

axiosAuthC.interceptors.request.use(
    async (config) => {
        const token = await fetchToken()
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const clientModule = {
    get: async <T>(url: string) => axiosAuthC.get<T>(url).then(responseBody),
    getParams: async <T>(value: string) => axiosAuthC.get<T>(value).then(responseBody),
    post: async <T>(url: string, body: {}) => axiosAuthC.post<T>(url, body).then(responseBody),
};

const card = {
    addCard: (card: any) => clientModule.post('/api/Card/CardAdd', card),
    allCards: async () => await clientModule.get<AllCards[]>('/api/Card/GetCardByUser'),
    cardById: (cardID: string) => clientModule.getParams<AllCards>(`/api/Card/GetCardById?id=${cardID}`),
    cardDelete:(cardID: any) => clientModule.post<ReqRes>('/api/Card/CardDelete', cardID),
};

const client = {
    setCardStyle:(dataSetCard:any) => clientModule.post<ReqRes>('/api/CardStyle/SetCardStyle', dataSetCard),
}

const socialMedia = {
    allSocialMedia: async () => await clientModule.get<SocialMedia[]>('/api/SocialNetwork/SocialNetworkGetAll'),
}
const axiosAuth = {
    card,
    client,
    socialMedia,
};

export default axiosAuth;