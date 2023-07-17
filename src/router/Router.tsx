import { Config } from '@/config';
import { routes } from '@/router/routes';
import { LayoutType } from '@/types';
import { Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const getRoutes = (layout: LayoutType) => {
  if (layout === 'default') {
    return routes.filter((route) => route.layout === undefined || route.layout === 'default');
  }
  return routes.filter((route) => route.layout === layout);
};

const Router = () => {
  const appRoutes: RouteObject[] = [];

  const layouts = Object.keys(Config.layouts) as LayoutType[];

  layouts.forEach((layout) => {
    const routes = getRoutes(layout);
    const Layout = Config.layouts[layout];
    appRoutes.push({
      path: '/',
      element: <Layout />,
      children: routes,
    });
  });

  const element = useRoutes(appRoutes);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <PuffLoader color="#8b5cf6" size={70} />
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

export default Router;
