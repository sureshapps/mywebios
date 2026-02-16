import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  lockWallpaper: string;
  homeWallpaper: string;
  setLockWallpaper: (w: string) => void;
  setHomeWallpaper: (w: string) => void;
  /** @deprecated use lockWallpaper or homeWallpaper */
  wallpaper: string;
  /** @deprecated use setLockWallpaper or setHomeWallpaper */
  setWallpaper: (w: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const LOCK_WALLPAPERS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #232526 0%, #414345 100%)',
];

export const HOME_WALLPAPERS = [
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

export const getWallpapers = () => [...LOCK_WALLPAPERS, ...HOME_WALLPAPERS];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem('ios-dark');
    return s ? JSON.parse(s) : false;
  });
  const [lockWallpaper, setLockState] = useState(() =>
    localStorage.getItem('ios-lock-wallpaper') || LOCK_WALLPAPERS[0]
  );
  const [homeWallpaper, setHomeState] = useState(() =>
    localStorage.getItem('ios-home-wallpaper') || HOME_WALLPAPERS[0]
  );

  useEffect(() => {
    localStorage.setItem('ios-dark', JSON.stringify(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const setLockWallpaper = (w: string) => {
    setLockState(w);
    localStorage.setItem('ios-lock-wallpaper', w);
  };

  const setHomeWallpaper = (w: string) => {
    setHomeState(w);
    localStorage.setItem('ios-home-wallpaper', w);
  };

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleDark: () => setIsDark((p: boolean) => !p),
      lockWallpaper,
      homeWallpaper,
      setLockWallpaper,
      setHomeWallpaper,
      wallpaper: homeWallpaper,
      setWallpaper: setHomeWallpaper,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
