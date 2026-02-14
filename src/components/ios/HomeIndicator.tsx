import { useScreen } from '@/contexts/ScreenContext';

export const HomeIndicator = ({ light = false }: { light?: boolean }) => {
  const { goHome, currentScreen, lock } = useScreen();
  
  const handleClick = () => {
    if (currentScreen === 'lock') return;
    if (currentScreen === 'home') {
      lock();
    } else {
      goHome();
    }
  };

  return (
    <div className="flex justify-center pb-2 pt-1" onClick={handleClick}>
      <div className={`w-32 h-1 rounded-full ${light ? 'bg-white/60' : 'bg-foreground/30'} cursor-pointer`} />
    </div>
  );
};
