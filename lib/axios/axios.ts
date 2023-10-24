import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type TokenOrRedirect = string | {
    redirect: {
        destination: string;
        permanent: boolean;
    };
};

const axiosBase = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});

export {axiosBase};