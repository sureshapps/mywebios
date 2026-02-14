import { StatusBar } from '@/components/ios/StatusBar';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { useTime } from '@/hooks/useTime';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreen } from '@/contexts/ScreenContext';
import { motion, PanInfo } from 'framer-motion';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

export const WidgetScreen = () => {
  const { time12, ampm, dateStr, now } = useTime();
  const { wallpaper } = useTheme();
  const { goHome } = useScreen();

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.x > 80 && info.velocity.x > 200) {
      goHome();
    }
  };

  const events = [
    { time: '9:00 AM', title: 'Team Standup', color: 'bg-blue-500' },
    { time: '1:00 PM', title: 'Lunch Break', color: 'bg-green-500' },
    { time: '3:30 PM', title: 'Design Review', color: 'bg-purple-500' },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col select-none"
      style={{ background: wallpaper }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20" />
      <div className="relative z-10 flex flex-col h-full">
        <StatusBar light />

        <motion.div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 touch-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDrag}
        >
          <h2 className="text-white text-2xl font-bold">{dateStr}</h2>

          {/* Weather Widget */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">My Location</p>
                <p className="text-white text-4xl font-light mt-1">72°</p>
                <p className="text-white/60 text-xs mt-1">Mostly Cloudy</p>
              </div>
              <Cloud className="w-10 h-10 text-white/80" />
            </div>
            <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <span className="text-white/50 text-xs">{day}</span>
                  {i % 2 === 0 ? <Sun className="w-4 h-4 text-yellow-400" /> : <Cloud className="w-4 h-4 text-white/60" />}
                  <span className="text-white text-xs">{68 + i * 2}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clock Widget */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4">
            <p className="text-white/60 text-sm mb-2">Clock</p>
            <div className="text-white text-5xl font-thin">
              {time12} <span className="text-lg">{ampm}</span>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4">
            <p className="text-white/60 text-sm mb-3">Up Next</p>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-1 h-8 rounded-full ${ev.color}`} />
                  <div>
                    <p className="text-white text-sm font-medium">{ev.title}</p>
                    <p className="text-white/50 text-xs">{ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Widget */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4">
            <p className="text-white/60 text-sm mb-2">Fitness</p>
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,59,48,0.3)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#FF3B30" strokeWidth="3" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="10.5" fill="none" stroke="rgba(48,209,88,0.3)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="10.5" fill="none" stroke="#30D158" strokeWidth="3" strokeDasharray="66" strokeDashoffset="20" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="7" fill="none" stroke="rgba(0,199,190,0.3)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="7" fill="none" stroke="#00C7BE" strokeWidth="3" strokeDasharray="44" strokeDashoffset="15" strokeLinecap="round" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-white text-xs">Move: 420/500 cal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-white text-xs">Exercise: 25/30 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-white text-xs">Stand: 9/12 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <HomeIndicator light />
      </div>
    </motion.div>
  );
};
