import { LayoutType } from '@/types';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Error404 = lazy(() => import('@/components/Error404'));

// Import Pages

const HomePage = lazy(() => import('@/pages/HomePage'));
const CurrenciesPage = lazy(() => import('@/pages/CurrenciesPage'));

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
    path: '*',
    element: <Error404 />,
  },
];
