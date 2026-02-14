import { useTime } from '@/hooks/useTime';
import { Signal, Wifi, Battery } from 'lucide-react';

export const StatusBar = ({ light = false }: { light?: boolean }) => {
  const { time24 } = useTime();
  const color = light ? 'text-white' : 'text-foreground';

  return (
    <div className={`flex items-center justify-between px-6 py-2 text-xs font-semibold ${color} z-50`}>
      <span className="w-16">{time24}</span>
      <div className="w-6 h-6 bg-black rounded-full" /> {/* Dynamic Island */}
      <div className="flex items-center gap-1 w-16 justify-end">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-5 h-3.5" />
      </div>
    </div>
  );
};
