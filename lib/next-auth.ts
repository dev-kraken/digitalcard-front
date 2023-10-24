import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next"
import {getServerSession} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type {NextAuthOptions} from "next-auth"
import {axiosBase} from "@/lib/axios/axios";
import {cookies} from "next/headers";
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
                    cookies().set({
                        name: 'jwtToken',
                        value: user.accessToken,
                        httpOnly: false,
                        maxAge: 2 * 24 * 60 * 60,
                        path: '/',
                        secure: true,
                        sameSite: 'lax',
                    });
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
    events: {
        async signOut(message) {
            cookies().delete('jwtToken')
        },
    }
}

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}

export async function getNextAuthToken(req:any) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.accessToken) {
        return null
    }
    return session.user.accessToken
}