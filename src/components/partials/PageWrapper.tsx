import Head from '@/components/Head';
import { useSidebarContext } from '@/contexts/sidebar-context';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Footer from './Footer';
import Header from './Header';
import SimpleBar from 'simplebar-react';
type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const PageWrapper = ({ title, children, className }: Props) => {
  const { isCollapsed } = useSidebarContext();

  return (
    <>
      <Head title={title} />
      <div
        className={twMerge(
          'flex flex-1 flex-col transition-margin duration-300 ease-in-out',
          isCollapsed ? 'lg:ms-20' : 'lg:ms-72'
        )}
      >
        <Header />
        <SimpleBar
          autoHide={false}
          className="custom-scrollbar-style flex flex-col overflow-y-auto"
          style={{
            height: 'calc(100vh - 4rem)',
          }}
        >
          <main className="p-6">
            <div className={twMerge('mt-6', className)}>{children}</div>
          </main>
          <Footer />
        </SimpleBar>
      </div>
    </>
  );
};

export default PageWrapper;
