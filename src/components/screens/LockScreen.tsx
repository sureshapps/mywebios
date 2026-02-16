import { useTime } from '@/hooks/useTime';
import { useScreen } from '@/contexts/ScreenContext';
import { useTheme } from '@/contexts/ThemeContext';
import { StatusBar } from '@/components/ios/StatusBar';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { Flashlight, Camera } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

export const LockScreen = () => {
  const { time12, ampm, dateStr } = useTime();
  const { unlock } = useScreen();
  const { lockWallpaper } = useTheme();
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0], [0, 1]);
  const scale = useTransform(y, [-200, 0], [0.95, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -100 || info.velocity.y < -500) {
      unlock();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col select-none overflow-hidden"
      style={{ background: lockWallpaper }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
      <div className="relative z-10 flex flex-col h-full">
        <StatusBar light />
        <motion.div className="flex-1 flex flex-col items-center pt-16" style={{ opacity, scale }}>
          <div className="text-white text-7xl font-thin tracking-tight">{time12}</div>
          <div className="text-white/80 text-lg mt-1">{dateStr}</div>
        </motion.div>
        <motion.div
          className="cursor-grab active:cursor-grabbing touch-none"
          drag="y"
          dragConstraints={{ top: -300, bottom: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          style={{ y }}
        >
          <div className="flex justify-between items-end px-6 pb-4">
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
              <Flashlight className="w-6 h-6 text-white" />
            </button>
            <div className="flex flex-col items-center gap-2 mb-2">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="text-white/60 text-xs"
              >
                Swipe up to unlock
              </motion.div>
              <div className="w-10 h-1 bg-white/40 rounded-full" />
            </div>
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
        </motion.div>
        <HomeIndicator light />
      </div>
    </motion.div>
  );
};
