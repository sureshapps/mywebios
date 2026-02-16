import { StatusBar } from '@/components/ios/StatusBar';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { useTime } from '@/hooks/useTime';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreen } from '@/contexts/ScreenContext';
import { useWeather, getWeatherIcon } from '@/hooks/useWeather';
import { motion, PanInfo } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Loader2, Music, Play, SkipBack } from 'lucide-react';

const WeatherIconSmall = ({ code, className }: { code: number; className?: string }) => {
  const type = getWeatherIcon(code);
  const cn = className || 'w-4 h-4';
  switch (type) {
    case 'sun': return <Sun className={`${cn} text-yellow-300`} />;
    case 'rain': return <CloudRain className={`${cn} text-white/60`} />;
    case 'snow': return <CloudSnow className={`${cn} text-white/60`} />;
    case 'storm': return <CloudLightning className={`${cn} text-white/60`} />;
    default: return <Cloud className={`${cn} text-white/60`} />;
  }
};

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(40px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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

  const now = new Date();
  const monthName = now.toLocaleDateString('en-US', { month: 'long' });
  const dayNum = now.getDate();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });

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
          className="flex-1 overflow-y-auto px-4 pt-6 pb-24 touch-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDrag}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Weather Widget - Full Width */}
            <div className="col-span-2 h-40 rounded-3xl p-5 relative overflow-hidden" style={glassStyle}>
              {weatherLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 text-white/60 animate-spin" />
                </div>
              ) : weather ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white text-sm font-medium tracking-tight opacity-80">My Location</div>
                      <div className="text-white text-6xl font-bold tracking-tight mt-1" style={{ letterSpacing: '-0.4px' }}>
                        {weather.temperature}°
                      </div>
                      <div className="text-white text-base font-medium mt-1 tracking-tight">{weather.condition}</div>
                    </div>
                    <WeatherIconSmall code={weather.weatherCode} className="w-16 h-16" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <div className="text-white text-xs tracking-tight">H:{weather.high}° L:{weather.low}°</div>
                  </div>
                </>
              ) : (
                <p className="text-white/50 text-sm text-center py-4">Weather unavailable</p>
              )}
            </div>

            {/* Clock Widget */}
            <div className="aspect-square rounded-3xl p-4 flex flex-col justify-between" style={glassStyle}>
              <div className="flex justify-between items-start">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <div className="text-white text-xs font-medium tracking-tight">PST</div>
              </div>
              <div>
                <div className="text-white text-5xl font-semibold tracking-tight" style={{ letterSpacing: '-0.4px' }}>
                  {time12}
                </div>
                <div className="text-white text-sm font-medium tracking-tight mt-1 opacity-70">
                  {dayName}, {monthName} {dayNum}
                </div>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="aspect-square rounded-3xl p-4 flex flex-col" style={glassStyle}>
              <div className="text-white text-xs font-semibold tracking-tight uppercase mb-3">{monthName}</div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-white text-6xl font-semibold tracking-tight" style={{ letterSpacing: '-0.4px' }}>
                  {dayNum}
                </div>
                <div className="text-white text-sm font-medium tracking-tight mt-1 opacity-80">{dayName}</div>
              </div>
              <div className="flex justify-center gap-1 mt-2">
                <div className="w-1 h-1 rounded-full bg-white opacity-30" />
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white opacity-30" />
              </div>
            </div>

            {/* Activity Widget - Full Width */}
            <div className="col-span-2 h-40 rounded-3xl p-5" style={glassStyle}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-white text-sm font-semibold tracking-tight">Activity</div>
              </div>
              <div className="flex gap-4">
                {[
                  { label: 'Move', pct: 75, color: '#FF3B30' },
                  { label: 'Exercise', pct: 85, color: '#34C759' },
                  { label: 'Stand', pct: 50, color: '#007AFF' },
                ].map(ring => (
                  <div key={ring.label} className="flex-1">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                        <circle
                          cx="32" cy="32" r="28" fill="none"
                          stroke={ring.color}
                          strokeWidth="6"
                          strokeDasharray="176"
                          strokeDashoffset={176 - (176 * ring.pct / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{ring.pct}%</span>
                      </div>
                    </div>
                    <div className="text-white text-xs font-medium mt-2 tracking-tight">{ring.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battery Widget */}
            <div className="aspect-square rounded-3xl p-4 flex flex-col justify-between" style={glassStyle}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
              </svg>
              <div>
                <div className="text-white text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.4px' }}>85%</div>
                <div className="text-white text-xs font-medium tracking-tight mt-1 opacity-80 uppercase">Battery</div>
                <div className="w-full h-1.5 bg-white/20 rounded-full mt-3">
                  <div className="h-full bg-white rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            {/* Mail Widget */}
            <div className="aspect-square rounded-3xl p-4 flex flex-col justify-between" style={glassStyle}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <div>
                <div className="text-white text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.4px' }}>12</div>
                <div className="text-white text-xs font-medium tracking-tight mt-1 opacity-80 uppercase">Unread</div>
                <div className="text-white text-xs font-medium tracking-tight mt-2 opacity-60">3 new messages</div>
              </div>
            </div>

            {/* Music Widget - Full Width */}
            <div className="col-span-2 h-32 rounded-3xl p-5 flex items-center justify-between" style={glassStyle}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold tracking-tight">Now Playing</div>
                  <div className="text-white text-xs font-medium tracking-tight mt-1 opacity-80">Midnight Rain</div>
                  <div className="text-white text-xs tracking-tight mt-0.5 opacity-60">Taylor Swift</div>
                </div>
              </div>
              <div className="flex gap-2">
                <SkipBack className="w-6 h-6 text-white/80" />
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Screen Time Widget */}
            <div className="aspect-square rounded-3xl p-4 flex flex-col justify-between" style={glassStyle}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
              <div>
                <div className="text-white text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.4px' }}>8.2</div>
                <div className="text-white text-xs font-medium tracking-tight mt-1 opacity-80 uppercase">Screen Time</div>
                <div className="text-white text-xs font-medium tracking-tight mt-2 opacity-60">Daily average</div>
              </div>
            </div>

            {/* Steps Widget */}
            <div className="aspect-square rounded-3xl p-4 flex flex-col justify-between" style={glassStyle}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
              <div>
                <div className="text-white text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.4px' }}>2.4k</div>
                <div className="text-white text-xs font-medium tracking-tight mt-1 opacity-80 uppercase">Steps</div>
                <div className="flex items-center gap-1 mt-2">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                  <div className="text-white text-xs font-medium tracking-tight opacity-60">12%</div>
                </div>
              </div>
            </div>

            {/* Reminders Widget - Full Width */}
            <div className="col-span-2 h-40 rounded-3xl p-5" style={glassStyle}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-white text-sm font-semibold tracking-tight">Reminders</div>
                <div className="text-white text-xs font-medium tracking-tight opacity-70">3 tasks</div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white" />
                  <div className="text-white text-sm tracking-tight">Finish project presentation</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center bg-white">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div className="text-white text-sm tracking-tight opacity-50 line-through">Call dentist office</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white" />
                  <div className="text-white text-sm tracking-tight">Buy groceries for dinner</div>
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
