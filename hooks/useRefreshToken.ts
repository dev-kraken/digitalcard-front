import { signIn, useSession } from "next-auth/react";
import axios from "@/lib/axios";

export const useRefreshToken = () => {
    const { data: session } = useSession();

    const refreshToken = async (session:any) => {
        try {
            console.log(session.user.refreshToken)
            const res = await axios.post("/api/Auth/RefreshToken", {
                accessToken: session?.user.accessToken,
            });

            // Check if the session exists
            if (session) {
                // Update the session with the new access token
                session.user.accessToken = res.data.accessToken;
            } else {
                // If there's no session, sign the user in
                await signIn(); // Replace with your auth provider name
            }
        } catch (error) {
            // Handle errors (e.g., network issues, failed refresh) here
            console.error("Token refresh failed:", error);
        }
    };

    return refreshToken;
};
