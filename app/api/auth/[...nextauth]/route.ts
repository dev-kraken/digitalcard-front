import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import type {NextAuthOptions} from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any, req: any) {
                const user = {
                    id: "1",
                    name: "J Smith",
                    email: "demo@demo.com",
                    password: "12345",
                    accessToken: "CS Token"
                }

                if (user.email === credentials.username && user.password === credentials.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    }
};

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};