import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function refreshToken(refreshToken: string): Promise<string> {
    const res = await fetch(BASE_URL + "/api/Auth/RefreshToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            refresh: refreshToken,
        }),
    });
    const data = await res.json();

    return data.accessToken;
}

export async function AuthPostApi(url: string, data: any = {}): Promise<any> {
    const session = await getServerSession(authOptions);

    // Perform the initial POST request
    const res = await fetch(BASE_URL + url, {
        method: "POST",  // Change the method to "POST"
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(data),  // Pass the data in the request body
    });

    // Check for a 401 status (unauthorized)
    if (res.status === 401) {
        if (session) {
            // If unauthorized, refresh the access token
            session.user.accessToken = await refreshToken(session?.user.refreshToken ?? "");

            // Retry the POST request with the updated access token
            const retryRes = await fetch(BASE_URL + url, {
                method: "POST",  // Change the method to "POST"
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
                body: JSON.stringify(data),  // Pass the data in the request body
            });

            return await retryRes.json();
        }
    }

    return await res.json();
}
