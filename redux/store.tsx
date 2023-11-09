import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@/redux/services/userApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '@/redux/slices/apiSlice';
import authReducer from '@/redux/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware, apiSlice.middleware]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
