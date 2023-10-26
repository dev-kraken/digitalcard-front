import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const MAIN_URL = process.env.NEXTAUTH_URL;
const axiosAuthC = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});

const fetchToken = async () => {
    try {
        const response = await fetch(`/api/auth/token`);
        return response.json();
    } catch (err) {
        throw err;
    }
};

axiosAuthC.interceptors.request.use(
    async (config) => {
        const token = await fetchToken()
        console.log(token)
        config.headers["Authorization"] = `Bearer ${token.token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class BackServices {
    async addCard(data: any) {
        return await axiosAuthC.post("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
}

export default new BackServices();