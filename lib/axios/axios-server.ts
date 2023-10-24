import axios, {AxiosResponse} from "axios";
import {AllCards} from "@/types";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/next-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const axiosAuthC = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});

axiosAuthC.interceptors.request.use(
    async (config) => {
        const session = await getServerSession(authOptions)
        if (session && !config.headers.Authorization) {
            config.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
        }
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
    cardById: (cardID: string) => clientModule.getParams<AllCards>(`/api/Card/GetCardById?id=${cardID}`)
};

const axiosAuthServer = {
    card,
};

export default axiosAuthServer;