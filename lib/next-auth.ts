import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { axiosBase } from '@/lib/axios/axios';
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'DevKraken' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        try {
          const response = await axiosBase.post('/api/Auth/SignIn', {
            userName: credentials.username,
            password: credentials.password,
          });

          const user = response.data;
          if (user.success && user.accessToken !== null && user.name !== null) {
            return Promise.resolve(user); // Return a Promise here
          } else {
            return Promise.resolve(null); // Return a Promise here
          }
        } catch (error) {
          console.error('Error while authorizing:', error);
          return Promise.resolve(null); // Return a Promise here
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  // events: {
  //   async signOut(message) {
  //
  //   },
  // },
};
