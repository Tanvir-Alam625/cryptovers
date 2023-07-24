/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import environment variables
const { VITE_RAPID_API_KEY, VITE_RAPID_API_HOST, VITE_RAPID_API_URL } = import.meta.env;

type Header = Record<string, string>;
type OptionsType = {
  headers?: Header;
  url: string;
  options?: object;
};

const APIHeader: Header = {
  'X-RapidAPI-Key': VITE_RAPID_API_KEY,
  'X-RapidAPI-Host': VITE_RAPID_API_HOST,
};

const baseURL = VITE_RAPID_API_URL;

export type CryptoDataType = any;
const createRequest = (url: string, options: object): OptionsType => ({ url, options, headers: APIHeader });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Array<any>, void>({
      query: () => createRequest(`/coins?limit=100`, {}),
    }),
    getCryptoDetails: builder.query({
      query: (id: string) => createRequest(`/coin/${id}`, {}),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }: { coinId: string; timePeriod: string }) =>
        createRequest(`/coin/${coinId}/history`, { referenceCurrencyUuid: 'yhjMzLPhuIDl', timeperiod: timePeriod }),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'fecb1ebb34msh0532c57e8a2deb3p1c8245jsne3742372431c',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//   }
// };
// url: 'https://coinranking1.p.rapidapi.com/coins',
