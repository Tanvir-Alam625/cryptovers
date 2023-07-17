import Head from '@/components/Head';
import Sidebar from '@/components/partials/Sidebar';
import { SidebarProvider } from '@/contexts/sidebar-context';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <SidebarProvider>
        <Head />
        <Sidebar />
        <Outlet />
      </SidebarProvider>
    </>
  );
};

export default AppLayout;
