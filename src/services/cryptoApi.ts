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
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseURL = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url: string, options: object): OptionsType => ({ url, ...options, headers: APIHeader });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins?limit=100`, {}),
    }),
    getCryptoDetails: builder.query({
      query: (id: string) => createRequest(`/coin/${id}`, {}),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }: { coinId: string; timePeriod: string }) =>
        createRequest(`/coin/${coinId}/history`, {
          params: {
            timePeriod: timePeriod,
          },
        }),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/coin/Qwsogvtv82FCd/exchanges', {}),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } =
  cryptoApi;
