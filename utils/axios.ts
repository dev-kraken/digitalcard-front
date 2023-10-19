import axios, {AxiosResponse} from "axios";

type Card = {
    id: number;
    cardGuid: string;
    cardName: string;
    cardImageOrg: string;
    cardImageSysName: string;
};
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

axios.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYmIyMWI3Yi04MjEyLTQ3YzktYTNkMS1kODAwMWQ5MWE5NGQiLCJhc3BpZCI6IjAxM2M0OTIyLWE2ZDAtNDE0Yi04ZjlkLTczNjYxNmM4NWUzMyIsImRpc3BsYXluYW1lIjoiQW1pciBCZXJlbmppIiwiZGF0IjoiMTAvMjAvMjAyMyAxOjA3OjQxIFBNIiwiZXhwIjoxNjk3ODMyNDYxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ._8r8TemqxV-vLBqZQNDJxXjCdyi-69WF3kEnyevYrVI`;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: async <T>(url: string) => await axios.get<T>(url).then(responseBody),
    getParams: <T>(value: string) => axios.get<T>(value).then(responseBody),
}

const card = {
    allCards: () => requests.get<Card[]>('/api/Card/GetCardByUser'),
    cardById: (cardID: string) => requests.getParams<Card>(`/api/Card/GetCardById?id=${cardID}`)
}
const axiosR = {
    requests,
    card
}
export default axiosR;