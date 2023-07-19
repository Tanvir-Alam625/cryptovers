import { useSidebarContext } from '@/contexts/sidebar-context';
import { SearchBox } from '@/components/shared';
import { useState, ChangeEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import ThemeSwitcher from './ThemeSwicher';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '@/app/slices/searchSlice';
import { RootState } from '@/app/store';
const Header = () => {
  const { isCollapsed, setIsCollapsed } = useSidebarContext();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const { pathname } = useLocation();
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const dispatch = useDispatch();

  const handleChangeSearchBox = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(setSearchValue(value));
  };

  return (
    <header className="flex h-16 w-full items-center bg-white px-6 drop-shadow-sm dark:bg-slate-800">
      <button
        className={twMerge('text-slate-600 dark:text-slate-400', isSearchBoxOpen && 'hidden')}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <HiOutlineMenuAlt1 size={22} />
      </button>
      {/* Search box for large screens */}
      {pathname === '/currencies' ? (
        <div className={'ms-6 hidden w-72 sm:inline-block'}>
          <SearchBox
            className="border-transparent bg-slate-100 focus-within:border-primary-500 dark:border-transparent dark:bg-slate-700 dark:focus-within:border-primary-500"
            placeholder="Search Currencies"
            value={searchValue}
            onChange={handleChangeSearchBox}
          />
        </div>
      ) : null}

      {/* Search Box for small screens  */}
      {isSearchBoxOpen && (
        <>
          {pathname === '/currencies' ? (
            <div className={'w-full'}>
              <SearchBox
                className="border-transparent bg-slate-100 focus-within:border-primary-500 dark:border-transparent dark:bg-slate-700 dark:focus-within:border-primary-500"
                isFocused={true}
                value={searchValue}
                onChange={handleChangeSearchBox}
              />
            </div>
          ) : null}
          <button
            className="ms-2 text-slate-600 hover:text-primary-500 dark:text-slate-400"
            onClick={() => setIsSearchBoxOpen(false)}
          >
            <FiX size={22} />
          </button>
        </>
      )}

      {/* Left aligned items */}
      <div className={twMerge('ms-auto flex items-center gap-6', isSearchBoxOpen && 'hidden')}>
        <button
          type="button"
          className="flex items-center justify-center rounded-full text-slate-600 transition-colors duration-150  hover:text-primary-500 dark:text-slate-300 dark:hover:text-slate-300 sm:hidden"
          onClick={() => setIsSearchBoxOpen(true)}
        >
          <FiSearch size={22} />
        </button>
        <ThemeSwitcher />
        <button className="group relative flex items-center gap-1.5">
          <img
            src="/images/avatar.jpg"
            alt="avatar"
            className="h-9 w-9 rounded-full group-focus:ring group-focus:ring-primary-500"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
