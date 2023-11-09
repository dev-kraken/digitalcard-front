import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logout, setToken } from '@/redux/slices/authSlice';
import {getSession} from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: async (headers, { getState }: any) => {
    const token = await getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }else {
      const session = await getSession();
      if (session){
        headers.set('Authorization', `Bearer ${session?.user.accessToken}`);
      }
    }
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      '/api/Auth/RefreshToken',
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // @ts-ignore
      api.dispatch(setToken(refreshResult.data?.accessToken));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['allStyle', 'AlCards'],
  endpoints: (builder) => ({}),
});

export const apiSlice1 = createApi({
  baseQuery,
  tagTypes: ['24234'],
  endpoints: (builder) => ({}),
});
