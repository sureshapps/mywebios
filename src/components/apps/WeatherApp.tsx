import { AppLayout } from '@/components/ios/AppLayout';
import { useWeather, getWeatherIcon } from '@/hooks/useWeather';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, CloudSnow, CloudLightning, Loader2 } from 'lucide-react';

const WeatherIcon = ({ code, className }: { code: number; className?: string }) => {
  const type = getWeatherIcon(code);
  const cn = className || 'w-5 h-5';
  switch (type) {
    case 'sun': return <Sun className={`${cn} text-yellow-300`} />;
    case 'rain': return <CloudRain className={cn} />;
    case 'snow': return <CloudSnow className={cn} />;
    case 'storm': return <CloudLightning className={cn} />;
    default: return <Cloud className={cn} />;
  }
};

export const WeatherApp = () => {
  const { data, loading, error, location } = useWeather();

  if (loading) {
    return (
      <AppLayout title="" bgClass="bg-gradient-to-b from-blue-400 to-blue-600" noPadding>
        <div className="flex flex-col items-center justify-center h-full text-white">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p className="text-white/70 text-sm">Loading weather…</p>
        </div>
      </AppLayout>
    );
  }

  if (error || !data) {
    return (
      <AppLayout title="" bgClass="bg-gradient-to-b from-blue-400 to-blue-600" noPadding>
        <div className="flex items-center justify-center h-full text-white/70 text-sm px-4 text-center">
          Unable to load weather data. Please try again later.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="" bgClass="bg-gradient-to-b from-blue-400 to-blue-600" noPadding>
      <div className="flex flex-col items-center py-8 px-4 text-white">
        <p className="text-lg text-white/80">{location}</p>
        <p className="text-7xl font-thin mt-2">{data.temperature}°</p>
        <p className="text-white/70 mt-1">{data.condition}</p>
        <p className="text-white/60 text-sm mt-1">H:{data.high}° L:{data.low}°</p>

        {/* Hourly */}
        <div className="w-full mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4">
          <p className="text-xs text-white/60 mb-3">HOURLY FORECAST</p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {data.hourly.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[40px]">
                <span className="text-xs text-white/70">{h.time}</span>
                <WeatherIcon code={h.code} />
                <span className="text-sm">{h.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily */}
        <div className="w-full mt-3 bg-white/10 backdrop-blur-xl rounded-2xl p-4">
          <p className="text-xs text-white/60 mb-3">7-DAY FORECAST</p>
          {data.daily.map((d) => (
            <div key={d.day} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
              <span className="text-sm w-24">{d.day}</span>
              <WeatherIcon code={d.code} className="w-4 h-4" />
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm">{d.low}°</span>
                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-300 to-yellow-300 rounded-full"
                    style={{ width: `${Math.min(100, ((d.high - d.low) / 30) * 100)}%` }}
                  />
                </div>
                <span className="text-sm">{d.high}°</span>
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="w-full mt-3 grid grid-cols-2 gap-3">
          {[
            { icon: Wind, label: 'WIND', value: `${data.windSpeed} mph` },
            { icon: Droplets, label: 'HUMIDITY', value: `${data.humidity}%` },
            { icon: Eye, label: 'VISIBILITY', value: '10 mi' },
            { icon: Thermometer, label: 'FEELS LIKE', value: `${data.feelsLike}°` },
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
