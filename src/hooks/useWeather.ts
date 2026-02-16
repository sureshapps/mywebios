import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  high: number;
  low: number;
  hourly: { time: string; temp: number; code: number }[];
  daily: { day: string; high: number; low: number; code: number }[];
}

const WMO_CODES: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Drizzle',
  61: 'Slight Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  71: 'Slight Snow',
  73: 'Moderate Snow',
  75: 'Heavy Snow',
  80: 'Slight Showers',
  81: 'Moderate Showers',
  82: 'Violent Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Hail',
  99: 'Thunderstorm with Heavy Hail',
};

export function getWeatherIcon(code: number): 'sun' | 'cloud' | 'rain' | 'snow' | 'storm' {
  if (code <= 1) return 'sun';
  if (code <= 3) return 'cloud';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 95) return 'storm';
  if (code >= 51) return 'rain';
  return 'cloud';
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('My Location');

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=7`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather fetch failed');
        const json = await res.json();

        const hourly = Array.from({ length: 12 }, (_, i) => {
          const nowHour = new Date().getHours();
          const idx = nowHour + i;
          return {
            time: i === 0 ? 'Now' : new Date(json.hourly.time[idx]).toLocaleTimeString('en-US', { hour: 'numeric' }),
            temp: Math.round(json.hourly.temperature_2m[idx] ?? 70),
            code: json.hourly.weather_code[idx] ?? 0,
          };
        });

        const days = json.daily.time.map((t: string, i: number) => {
          const d = new Date(t + 'T12:00:00');
          return {
            day: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'long' }),
            high: Math.round(json.daily.temperature_2m_max[i]),
            low: Math.round(json.daily.temperature_2m_min[i]),
            code: json.daily.weather_code[i],
          };
        });

        setData({
          temperature: Math.round(json.current.temperature_2m),
          feelsLike: Math.round(json.current.apparent_temperature),
          humidity: Math.round(json.current.relative_humidity_2m),
          windSpeed: Math.round(json.current.wind_speed_10m),
          weatherCode: json.current.weather_code,
          condition: WMO_CODES[json.current.weather_code] || 'Unknown',
          high: Math.round(json.daily.temperature_2m_max[0]),
          low: Math.round(json.daily.temperature_2m_min[0]),
          hourly,
          daily: days,
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    // Try geolocation, fallback to NYC
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation('My Location');
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          setLocation('New York');
          fetchWeather(40.7128, -74.006);
        },
        { timeout: 5000 }
      );
    } else {
      setLocation('New York');
      fetchWeather(40.7128, -74.006);
    }
  }, []);

  return { data, loading, error, location };
}
