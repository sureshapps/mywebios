import { StatusBar } from '@/components/ios/StatusBar';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { useTime } from '@/hooks/useTime';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreen } from '@/contexts/ScreenContext';
import { useWeather, getWeatherIcon } from '@/hooks/useWeather';
import { motion, PanInfo } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Loader2 } from 'lucide-react';

const WeatherIconSmall = ({ code, className }: { code: number; className?: string }) => {
  const type = getWeatherIcon(code);
  const cn = className || 'w-4 h-4';
  switch (type) {
    case 'sun': return <Sun className={`${cn} text-yellow-400`} />;
    case 'rain': return <CloudRain className={`${cn} text-white/60`} />;
    case 'snow': return <CloudSnow className={`${cn} text-white/60`} />;
    case 'storm': return <CloudLightning className={`${cn} text-white/60`} />;
    default: return <Cloud className={`${cn} text-white/60`} />;
  }
};

export const WidgetScreen = () => {
  const { time12, ampm, dateStr } = useTime();
  const { homeWallpaper } = useTheme();
  const { goHome } = useScreen();
  const { data: weather, loading: weatherLoading } = useWeather();

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
      style={{ background: homeWallpaper }}
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
            {weatherLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 text-white/60 animate-spin" />
              </div>
            ) : weather ? (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-sm">Weather</p>
                    <p className="text-white text-4xl font-light mt-1">{weather.temperature}°</p>
                    <p className="text-white/60 text-xs mt-1">{weather.condition}</p>
                  </div>
                  <WeatherIconSmall code={weather.weatherCode} className="w-10 h-10" />
                </div>
                <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
                  {weather.daily.slice(0, 5).map((d) => (
                    <div key={d.day} className="flex flex-col items-center gap-1">
                      <span className="text-white/50 text-xs">{d.day.slice(0, 3)}</span>
                      <WeatherIconSmall code={d.code} />
                      <span className="text-white text-xs">{d.high}°</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-white/50 text-sm text-center py-4">Weather unavailable</p>
            )}
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
