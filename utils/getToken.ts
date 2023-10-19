"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GetTokenAuth = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.accessToken) {
        return 'UnAuthorized';
    }

    return session.user.accessToken;
}
