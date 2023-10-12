import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"
import useAxiosAuth from "@/hooks/useAxiosAuth";
export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <main>
            <p>Home D {session?.user.accessToken}</p>
        </main>
    )
}
