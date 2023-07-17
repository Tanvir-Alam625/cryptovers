import { useSidebarContext } from '@/contexts/sidebar-context';
import { useDisclosure } from '@/hooks/use-disclosure';
import { MenuType } from '@/types/menu';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import styles from './SidebarMenu.module.scss';

type Props = {
  menu: MenuType;
};

const SidebarMenu = ({ menu }: Props) => {
  const { pathname } = useLocation();
  const { isCollapsed, isHovered } = useSidebarContext();
  const isVisible = isCollapsed ? isHovered : true;
  const { open, close } = useDisclosure(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (menu.href === pathname) {
      setIsActive(true);
      open();
    } else {
      setIsActive(false);
      close();
    }

    return () => {
      setIsActive(false);
      close();
    };
  }, [pathname]);

  return (
    <li className="px-[18px]">
      <Link to={menu.href ? menu.href : '#'} className={twMerge(styles['sidebar-menu'], isActive && styles['active'])}>
        {menu.icon && (
          <span className={styles['sidebar-menu__icon']}>
            <menu.icon size={22} />
          </span>
        )}
        {isVisible && <span>{menu.name}</span>}
      </Link>
    </li>
  );
};

export default SidebarMenu;
