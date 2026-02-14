import { useState, useEffect } from 'react';

export function useTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const time12 = `${hours % 12 || 12}:${minutes}`;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return { now, hours, minutes, seconds, time12, ampm, dateStr, time24: `${hours.toString().padStart(2, '0')}:${minutes}` };
}
