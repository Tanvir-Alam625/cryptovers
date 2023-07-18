import React, { createContext, useContext, useEffect, useState } from 'react';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeModeContextType = {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
};

type ThemeModeProviderProps = {
  children: React.ReactNode;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({ children }) => {
  const [themeMode, setTheme] = useState<ThemeMode>(ThemeMode.LIGHT);

  const toggleThemeMode = () => {
    if (themeMode === ThemeMode.LIGHT) {
      setTheme(ThemeMode.DARK);
      document.documentElement.classList.add(ThemeMode.DARK);
      localStorage.setItem('theme-mode', ThemeMode.DARK);
    } else {
      setTheme(ThemeMode.LIGHT);
      document.documentElement.classList.remove(ThemeMode.DARK);
      localStorage.setItem('theme-mode', ThemeMode.LIGHT);
    }
  };

  useEffect(() => {
    const themeMode = localStorage.getItem('theme-mode');
    if (themeMode === ThemeMode.DARK) {
      setTheme(ThemeMode.DARK);
      document.documentElement.classList.add(ThemeMode.DARK);
    }
  }, []);

  return <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>{children}</ThemeModeContext.Provider>;
};

const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

export { ThemeModeProvider, useThemeMode };
