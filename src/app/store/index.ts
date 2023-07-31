import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '@/services/cryptoApi';
import searchReducer from '../slices/searchSlice';
import { cryptoNewsApi } from '@/services/newsApi';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
