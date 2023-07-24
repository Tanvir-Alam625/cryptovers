import React, { createContext, useEffect, useState } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme-mode') as Theme) || Theme.DARK);
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    });
  };

  useEffect(() => {
    if (theme === Theme.LIGHT) {
      document.body.classList.remove(Theme.DARK);
    } else {
      document.body.classList.add(Theme.DARK);
    }
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
