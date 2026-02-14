import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  wallpaper: string;
  setWallpaper: (w: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

const WALLPAPERS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

export const getWallpapers = () => WALLPAPERS;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem('ios-dark');
    return s ? JSON.parse(s) : false;
  });
  const [wallpaper, setWallpaperState] = useState(() => {
    return localStorage.getItem('ios-wallpaper') || WALLPAPERS[0];
  });

  useEffect(() => {
    localStorage.setItem('ios-dark', JSON.stringify(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const setWallpaper = (w: string) => {
    setWallpaperState(w);
    localStorage.setItem('ios-wallpaper', w);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark: () => setIsDark((p: boolean) => !p), wallpaper, setWallpaper }}>
      {children}
    </ThemeContext.Provider>
  );
};
