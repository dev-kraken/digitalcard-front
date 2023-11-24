import { apiSlice } from '@/redux/slices/apiSlice';
import { AllCards, AllState } from '@/types';

interface StyleCard {
  id: number;
  name: string;
  styleImageOrg: string;
  styleImageSysName: string;
  isFree: boolean;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCardStyle: builder.query<StyleCard[], null>({
      query: () => ({
        url: `/api/Style/StyleGetAll`,
      }),
    }),
    setListing: builder.mutation({
      query: (data) => ({
        url: '/api/Listing/ListingAdd',
        method: 'POST',
        body: data,
      }),
    }),
    addNewCard: builder.mutation({
      query: (data) => ({
        url: '/api/Card/CardAdd',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AlCards'],
    }),
    getAllState: builder.query<AllState[], null>({
      query: () => ({
        url: `/api/State/GetAllStateByCountry?countryId=1`,
      }),
    }),
    getAllCards: builder.query<AllCards[], null>({
      query: () => ({
        url: '/api/Card/GetCardByUser',
      }),
      providesTags: ['AlCards'],
    }),
    getAllListings: builder.query({
      query: (cardID) => ({
        url: `/api/Listing/ListingGetByCard?cardGuid=${cardID}`,
      }),
    }),
  }),
});

export const {
  useGetAllStateQuery,
  useGetAllCardStyleQuery,
  useSetListingMutation,
  useAddNewCardMutation,
  useGetAllCardsQuery,
  useGetAllListingsQuery,
} = userApiSlice;
