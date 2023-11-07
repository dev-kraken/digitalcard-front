import NextAuth from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            name: string;
            email:string
            accessToken: string;
            refreshToken: string;
            success:boolean
        };
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
            accessToken: string;
            token: string;
            exp?: number;
            iat?: number;
            jti?: string;
    }
}