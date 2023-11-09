import {NextRequest, NextResponse} from 'next/server';
import { getToken } from 'next-auth/jwt';
import { fetchServerResponse } from 'next/dist/client/components/router-reducer/fetch-server-response';
import useSWR from 'swr';
import {signOut} from "next-auth/react";

export { default } from 'next-auth/middleware';
export const config = { matcher: ['/((?!sign-up|sign-in|api).*)'] };