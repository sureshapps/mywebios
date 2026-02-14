import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CalendarEvent } from '@/types';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const CalendarApp = () => {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('ios-calendar-events', [
    { id: '1', title: 'Team Meeting', date: new Date().toISOString().split('T')[0], time: '10:00', color: 'bg-blue-500' },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('12:00');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().split('T')[0];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const addEvent = () => {
    if (!newTitle.trim() || !selectedDate) return;
    const ev: CalendarEvent = { id: Date.now().toString(), title: newTitle, date: selectedDate, time: newTime, color: 'bg-blue-500' };
    setEvents(prev => [...prev, ev]);
    setNewTitle('');
    setAdding(false);
  };

  const dayEvents = selectedDate ? events.filter(e => e.date === selectedDate) : [];

  return (
    <AppLayout title="Calendar" headerRight={<button onClick={() => setAdding(true)}><Plus className="w-5 h-5 text-primary" /></button>}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth}><ChevronLeft className="w-5 h-5 text-foreground" /></button>
        <span className="font-semibold text-foreground">{MONTH_NAMES[month]} {year}</span>
        <button onClick={nextMonth}><ChevronRight className="w-5 h-5 text-foreground" /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map(d => <div key={d} className="text-center text-xs text-muted-foreground font-medium">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const hasEvent = events.some(e => e.date === dateStr);
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(dateStr)}
              className={`h-9 rounded-full text-sm flex flex-col items-center justify-center relative
                ${isToday ? 'bg-primary text-primary-foreground' : ''}
                ${isSelected && !isToday ? 'bg-accent text-accent-foreground' : ''}
                ${!isToday && !isSelected ? 'text-foreground' : ''}
              `}
            >
              {d}
              {hasEvent && <div className="w-1 h-1 rounded-full bg-primary absolute bottom-0.5" />}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Events</h3>
          {dayEvents.length === 0 && <p className="text-xs text-muted-foreground">No events</p>}
          {dayEvents.map(ev => (
            <div key={ev.id} className="flex items-center gap-2 py-2 border-b border-border">
              <div className={`w-1 h-6 rounded-full ${ev.color}`} />
              <div>
                <p className="text-sm text-foreground">{ev.title}</p>
                <p className="text-xs text-muted-foreground">{ev.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {adding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl p-4 w-full max-w-sm space-y-3">
            <h3 className="font-semibold text-foreground">New Event</h3>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-transparent text-foreground" />
            <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-transparent text-foreground" />
            <p className="text-xs text-muted-foreground">Date: {selectedDate || 'Select a date first'}</p>
            <div className="flex gap-2">
              <button onClick={() => setAdding(false)} className="flex-1 py-2 text-sm text-foreground border border-border rounded-lg">Cancel</button>
              <button onClick={addEvent} className="flex-1 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Add</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
