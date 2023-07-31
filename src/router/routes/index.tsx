import { LayoutType } from '@/types';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Error404 = lazy(() => import('@/components/Error404'));

// Import Pages

const HomePage = lazy(() => import('@/pages/HomePage'));
const CurrenciesPage = lazy(() => import('@/pages/CurrenciesPage'));
const CurrencyDetailsPage = lazy(() => import('@/pages/CurrencyDetailsPage'));
const ExchangesPage = lazy(() => import('@/pages/ExchangesPage'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));

type AppRoute = RouteObject & {
  layout?: LayoutType;
};

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/currencies',
    element: <CurrenciesPage />,
  },
  {
    path: '/exchanges',
    element: <ExchangesPage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/currency/:id',
    element: <CurrencyDetailsPage />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
];
