import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import environment variables
const { VITE_RAPID_API_KEY } = import.meta.env;

type Header = Record<string, string>;
type OptionsType = {
  headers?: Header;
  url: string;
  options?: object;
};

const APIHeader: Header = {
  'X-RapidAPI-Key': VITE_RAPID_API_KEY,
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
};
const createRequest = (url: string, options: object): OptionsType => ({ url, ...options, headers: APIHeader });

const baseURL = 'https://crypto-news16.p.rapidapi.com';
export const cryptoNewsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getTopNews: builder.query({
      query: ({ category }: { category: string }) => createRequest(`/news/${category}`, {}),
    }),
  }),
});

export const { useGetTopNewsQuery } = cryptoNewsApi;
