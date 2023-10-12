"use client";
import axios from "@/lib/axios";
import {signIn, useSession} from "next-auth/react";

export const useRefreshToken = () => {
    const {data: session} = useSession();

    return async () => {
        const res = await axios.post("/auth/refresh", {
            refresh: session?.user.refreshToken,
        });

        if (session) session.user.accessToken = res.data.accessToken;
        else await signIn();
    };
};