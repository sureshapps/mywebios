import { useState, useEffect, useRef } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useTime } from '@/hooks/useTime';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Alarm } from '@/types';
import { Plus, Play, Pause, RotateCcw } from 'lucide-react';

type Tab = 'world' | 'alarm' | 'stopwatch' | 'timer';

export const ClockApp = () => {
  const [tab, setTab] = useState<Tab>('world');
  const { time24, time12, ampm } = useTime();

  // Stopwatch
  const [swRunning, setSwRunning] = useState(false);
  const [swTime, setSwTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const swRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (swRunning) {
      swRef.current = setInterval(() => setSwTime(t => t + 10), 10);
    } else {
      clearInterval(swRef.current);
    }
    return () => clearInterval(swRef.current);
  }, [swRunning]);

  const formatSw = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  // Timer
  const [timerTotal, setTimerTotal] = useState(300);
  const [timerLeft, setTimerLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (timerRunning && timerLeft > 0) {
      timerRef.current = setInterval(() => setTimerLeft(t => t - 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerLeft]);

  // Alarms
  const [alarms, setAlarms] = useLocalStorage<Alarm[]>('ios-alarms', [
    { id: '1', time: '07:00', label: 'Wake Up', enabled: true, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { id: '2', time: '09:00', label: 'Meeting', enabled: false, days: [] },
  ]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'world', label: 'World Clock' },
    { id: 'alarm', label: 'Alarm' },
    { id: 'stopwatch', label: 'Stopwatch' },
    { id: 'timer', label: 'Timer' },
  ];

  return (
    <AppLayout title="Clock">
      <div className="flex gap-1 bg-muted rounded-lg p-0.5 mb-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-all ${tab === t.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'world' && (
        <div className="text-center py-8">
          <p className="text-6xl font-thin text-foreground">{time12}</p>
          <p className="text-muted-foreground mt-2">{ampm}</p>
          <div className="mt-8 space-y-3">
            {[{ city: 'London', offset: 0 }, { city: 'Tokyo', offset: 9 }, { city: 'New York', offset: -5 }].map(c => {
              const d = new Date();
              d.setHours(d.getHours() + c.offset - (d.getTimezoneOffset() / -60));
              return (
                <div key={c.city} className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-foreground">{c.city}</span>
                  <span className="text-lg font-light text-foreground">{d.getHours().toString().padStart(2, '0')}:{d.getMinutes().toString().padStart(2, '0')}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'alarm' && (
        <div className="space-y-3">
          {alarms.map(a => (
            <div key={a.id} className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-3xl font-thin text-foreground">{a.time}</p>
                <p className="text-xs text-muted-foreground">{a.label}</p>
              </div>
              <button
                onClick={() => setAlarms(prev => prev.map(al => al.id === a.id ? { ...al, enabled: !al.enabled } : al))}
                className={`w-12 h-7 rounded-full transition-colors ${a.enabled ? 'bg-green-500' : 'bg-muted'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${a.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'stopwatch' && (
        <div className="text-center py-8">
          <p className="text-5xl font-thin text-foreground font-mono">{formatSw(swTime)}</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => { setSwTime(0); setLaps([]); setSwRunning(false); }}
              className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setSwRunning(!swRunning)}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${swRunning ? 'bg-destructive' : 'bg-green-500'}`}
            >
              {swRunning ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
            </button>
            {swRunning && (
              <button
                onClick={() => setLaps([swTime, ...laps])}
                className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
              >
                <span className="text-xs text-foreground font-medium">Lap</span>
              </button>
            )}
          </div>
          {laps.length > 0 && (
            <div className="mt-6 space-y-1">
              {laps.map((l, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-border">
                  <span className="text-muted-foreground">Lap {laps.length - i}</span>
                  <span className="text-foreground font-mono">{formatSw(l)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'timer' && (
        <div className="text-center py-8">
          <p className="text-5xl font-thin text-foreground font-mono">
            {Math.floor(timerLeft / 60).toString().padStart(2, '0')}:{(timerLeft % 60).toString().padStart(2, '0')}
          </p>
          {!timerRunning && (
            <input
              type="range"
              min="60"
              max="3600"
              step="60"
              value={timerTotal}
              onChange={e => { setTimerTotal(+e.target.value); setTimerLeft(+e.target.value); }}
              className="w-full mt-4"
            />
          )}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => { setTimerRunning(false); setTimerLeft(timerTotal); }}
              className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${timerRunning ? 'bg-destructive' : 'bg-green-500'}`}
            >
              {timerRunning ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
