import { useState, useMemo } from 'react';
import { StatusBar } from '@/components/ios/StatusBar';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { AppIcon } from '@/components/ios/AppIcon';
import { HOME_APPS, DOCK_APPS } from '@/config/apps';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreen } from '@/contexts/ScreenContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Search } from 'lucide-react';

export const HomeScreen = () => {
  const [page, setPage] = useState(0);
  const { homeWallpaper } = useTheme();
  const { navigate } = useScreen();
  const [hiddenApps] = useLocalStorage<string[]>('ios-hidden-apps', []);

  const filteredPages = useMemo(() =>
    HOME_APPS.map(pageApps => pageApps.filter(app => !hiddenApps.includes(app.id))).filter(p => p.length > 0),
    [hiddenApps]
  );

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.x < -80 && info.velocity.x < -200) {
      if (page < filteredPages.length - 1) setPage(p => p + 1);
      else navigate('widgets');
    } else if (info.offset.x > 80 && info.velocity.x > 200) {
      if (page > 0) setPage(p => p - 1);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col select-none"
      style={{ background: homeWallpaper }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/5" />
      <div className="relative z-10 flex flex-col h-full">
        <StatusBar light />
        <div className="px-4 py-2">
          <div className="bg-white/15 backdrop-blur-xl rounded-xl px-3 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-white/60" />
            <span className="text-white/50 text-sm">Search</span>
          </div>
        </div>
        <motion.div
          className="flex-1 px-4 pt-2 touch-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDrag}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-4 gap-y-6 gap-x-2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {filteredPages[page]?.map((app, i) => (
                <AppIcon key={app.id} app={app} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="flex justify-center gap-1.5 py-2">
          {filteredPages.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === page ? 'bg-white w-2' : 'bg-white/40'}`}
            />
          ))}
        </div>
        <div className="mx-3 mb-1 px-4 py-3 bg-white/15 backdrop-blur-2xl rounded-[28px]">
          <div className="grid grid-cols-4 gap-2">
            {DOCK_APPS.map((app) => (
              <AppIcon key={app.id} app={app} />
            ))}
          </div>
        </div>
        <HomeIndicator light />
      </div>
    </motion.div>
  );
};
