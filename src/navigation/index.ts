import { MenuType } from '@/types/menu';
import { FiHome } from 'react-icons/fi';
import { AiOutlineLineChart } from 'react-icons/ai';
// import { MdOutlineCurrencyExchange } from 'react-icons/md';
// import { PiNewspaperClipping } from 'react-icons/pi';

const menu: MenuType[] = [
  {
    name: 'Home',
    icon: FiHome,
    href: '/',
  },
  {
    name: 'Currencies',
    icon: AiOutlineLineChart,
    href: '/currencies',
  },
  // {
  //   name: 'Exchanges',
  //   icon: MdOutlineCurrencyExchange,
  //   href: '/exchanges',
  // },
  // {
  //   name: 'News',
  //   icon: PiNewspaperClipping,
  //   href: '/news',
  // },
];

export default menu;
