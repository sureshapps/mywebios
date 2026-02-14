import { AppLayout } from '@/components/ios/AppLayout';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

export const WeatherApp = () => {
  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = new Date();
    h.setHours(h.getHours() + i);
    return {
      time: i === 0 ? 'Now' : h.toLocaleTimeString('en-US', { hour: 'numeric' }),
      temp: Math.round(68 + Math.sin(i / 3) * 8),
      icon: i % 3 === 0 ? 'sun' : i % 3 === 1 ? 'cloud' : 'rain',
    };
  });

  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <AppLayout title="" bgClass="bg-gradient-to-b from-blue-400 to-blue-600" noPadding>
      <div className="flex flex-col items-center py-8 px-4 text-white">
        <p className="text-lg text-white/80">My Location</p>
        <p className="text-7xl font-thin mt-2">72°</p>
        <p className="text-white/70 mt-1">Mostly Cloudy</p>
        <p className="text-white/60 text-sm mt-1">H:78° L:62°</p>

        {/* Hourly */}
        <div className="w-full mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4">
          <p className="text-xs text-white/60 mb-3">HOURLY FORECAST</p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {hours.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[40px]">
                <span className="text-xs text-white/70">{h.time}</span>
                {h.icon === 'sun' ? <Sun className="w-5 h-5 text-yellow-300" /> : h.icon === 'cloud' ? <Cloud className="w-5 h-5" /> : <CloudRain className="w-5 h-5" />}
                <span className="text-sm">{h.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily */}
        <div className="w-full mt-3 bg-white/10 backdrop-blur-xl rounded-2xl p-4">
          <p className="text-xs text-white/60 mb-3">7-DAY FORECAST</p>
          {days.map((d, i) => (
            <div key={d} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
              <span className="text-sm w-24">{d}</span>
              {i % 2 === 0 ? <Sun className="w-4 h-4 text-yellow-300" /> : <Cloud className="w-4 h-4" />}
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm">{60 + i}°</span>
                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-300 to-yellow-300 rounded-full" style={{ width: `${50 + i * 7}%` }} />
                </div>
                <span className="text-sm">{72 + i}°</span>
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="w-full mt-3 grid grid-cols-2 gap-3">
          {[
            { icon: Wind, label: 'WIND', value: '12 mph' },
            { icon: Droplets, label: 'HUMIDITY', value: '65%' },
            { icon: Eye, label: 'VISIBILITY', value: '10 mi' },
            { icon: Thermometer, label: 'FEELS LIKE', value: '74°' },
          ].map(d => (
            <div key={d.label} className="bg-white/10 backdrop-blur-xl rounded-2xl p-3">
              <p className="text-xs text-white/50 mb-1">{d.label}</p>
              <div className="flex items-center gap-2">
                <d.icon className="w-5 h-5 text-white/70" />
                <span className="text-xl font-light">{d.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
