import AppLogo from '@/components/AppLogo';
import { useSidebarContext } from '@/contexts/sidebar-context';
import menu from '@/navigation';
import { useMemo } from 'react';
import SimpleBar from 'simplebar-react';
import { twMerge } from 'tailwind-merge';
import styles from './Sidebar.module.scss';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  const { isCollapsed, isHovered, setIsHovered, setIsCollapsed } = useSidebarContext();
  const isVisible = useMemo(() => {
    return isCollapsed ? isHovered : true;
  }, [isCollapsed, isHovered]);

  return (
    <>
      <div
        className={twMerge(styles['sidebar__overlay'], !isCollapsed && styles['show'])}
        onClick={() => setIsCollapsed(true)}
      ></div>
      <div
        className={twMerge(styles['sidebar'], isCollapsed && !isHovered && styles['collapsed'])}
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => isCollapsed && setIsHovered(false)}
      >
        {/* App Logo */}
        <div className="flex h-16 flex-shrink-0 items-center">
          <div className={twMerge('flex items-center gap-4 px-4')}>
            <AppLogo className="text-primary-500" />
            {isVisible ? (
              <div className="flex flex-col">
                <h1 className="dtext-dark-600 text-xl font-semibold uppercase dark:text-dark-200">
                  Crypto
                  <span className="text-primary-500">verse</span>
                </h1>
              </div>
            ) : null}
          </div>
        </div>
        {/* Navigation */}
        <SimpleBar
          style={{
            height: 'calc(100vh - 4rem)',
          }}
        >
          <div className={twMerge(styles['sidebar__container'], 'mt-2')}>
            <ul className="space-y-0.5">
              {menu.map((item, index) => (
                <SidebarMenu menu={item} key={index} />
              ))}
            </ul>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default Sidebar;
