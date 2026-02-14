import React, { createContext, useContext, useState, useCallback } from 'react';
import { ScreenType } from '@/types';

interface ScreenContextType {
  currentScreen: ScreenType;
  currentApp: string | null;
  navigate: (screen: ScreenType, appId?: string) => void;
  goHome: () => void;
  openApp: (appId: string) => void;
  closeApp: () => void;
  isLocked: boolean;
  unlock: () => void;
  lock: () => void;
}

const ScreenContext = createContext<ScreenContextType | null>(null);

export const useScreen = () => {
  const ctx = useContext(ScreenContext);
  if (!ctx) throw new Error('useScreen must be used within ScreenProvider');
  return ctx;
};

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('lock');
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  const navigate = useCallback((screen: ScreenType, appId?: string) => {
    setCurrentScreen(screen);
    if (appId) setCurrentApp(appId);
  }, []);

  const goHome = useCallback(() => {
    setCurrentScreen('home');
    setCurrentApp(null);
  }, []);

  const openApp = useCallback((appId: string) => {
    setCurrentApp(appId);
    setCurrentScreen('app');
  }, []);

  const closeApp = useCallback(() => {
    setCurrentApp(null);
    setCurrentScreen('home');
  }, []);

  const unlock = useCallback(() => {
    setIsLocked(false);
    setCurrentScreen('home');
  }, []);

  const lock = useCallback(() => {
    setIsLocked(true);
    setCurrentScreen('lock');
  }, []);

  return (
    <ScreenContext.Provider value={{ currentScreen, currentApp, navigate, goHome, openApp, closeApp, isLocked, unlock, lock }}>
      {children}
    </ScreenContext.Provider>
  );
};
