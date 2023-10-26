import CredentialsProvider from "next-auth/providers/credentials"
import type {NextAuthOptions} from "next-auth"
import {axiosBase} from "@/lib/axios/axios";
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "DevKraken"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any) {
                if (!credentials?.username || !credentials.password) {
                    return null;
                }
                const response = await axiosBase.post('/api/Auth/SignIn', {
                        userName: credentials.username,
                        password: credentials.password
                    }
                );
                const user = response.data;
                if (user.success && user.accessToken !== null && user.name !== null) {
                    return user
                } else {
                    return null
                }

            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session;
        },
    },
}