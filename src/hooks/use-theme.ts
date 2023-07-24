import { ThemeContext } from '@/contexts/theme-context';
import { useContext } from 'react';

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeModeProvider');
  }
  return context;
};

export default useTheme;
