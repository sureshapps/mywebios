import { ScreenProvider, useScreen } from '@/contexts/ScreenContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LockScreen } from '@/components/screens/LockScreen';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { WidgetScreen } from '@/components/screens/WidgetScreen';
import { getAppComponent } from '@/config/appRegistry';
import { AnimatePresence } from 'framer-motion';

const ScreenRouter = () => {
  const { currentScreen, currentApp } = useScreen();

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'lock' && <LockScreen key="lock" />}
      {currentScreen === 'home' && <HomeScreen key="home" />}
      {currentScreen === 'widgets' && <WidgetScreen key="widgets" />}
      {currentScreen === 'app' && currentApp && (() => {
        const AppComp = getAppComponent(currentApp);
        return <AppComp key={`app-${currentApp}`} />;
      })()}
    </AnimatePresence>
  );
};

const IOSSimulator = () => {
  return (
    <ThemeProvider>
      <ScreenProvider>
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
          {/* iPhone frame for desktop */}
          <div className="relative w-full max-w-[393px] h-[852px] max-h-[95vh] bg-black rounded-[50px] shadow-2xl shadow-black/50 overflow-hidden border-[3px] border-gray-800 md:w-[393px]">
            {/* Screen area */}
            <div className="absolute inset-[3px] rounded-[47px] overflow-hidden">
              <ScreenRouter />
            </div>
          </div>
        </div>
      </ScreenProvider>
    </ThemeProvider>
  );
};

export default IOSSimulator;
