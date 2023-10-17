"use client"
import { useEffect } from "react";
import { InitialModal } from "@/components/modals/initial-modal";
import useAxiosAuth from "@/hooks/useAxiosAuth";

const Home = () => {
    const axiosAuth = useAxiosAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cards = await axiosAuth.get('/api/Card/GetCardByUser');
                console.log(cards);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => {
            console.log(r)
        });
    }, [axiosAuth]);

    return (
        <div>
            <InitialModal />
        </div>
    );
};

export default Home;
