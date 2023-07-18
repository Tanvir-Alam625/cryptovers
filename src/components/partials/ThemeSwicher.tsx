import { ThemeMode, useThemeMode } from '@/contexts/theme-mode-context';
import { BsMoonStars, BsSun } from 'react-icons/bs';

const ThemeSwitcher = () => {
  const { themeMode, toggleThemeMode } = useThemeMode();

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-full  text-slate-600 transition-colors duration-150 hover:text-primary-500  dark:text-slate-300 dark:hover:text-slate-300"
        onClick={() => toggleThemeMode()}
      >
        {themeMode === ThemeMode.LIGHT ? <BsSun size={20} /> : <BsMoonStars size={22} />}
      </button>
    </>
  );
};

export default ThemeSwitcher;
