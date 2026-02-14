import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Reminder } from '@/types';
import { Plus, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const RemindersApp = () => {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('ios-reminders', [
    { id: '1', text: 'Buy groceries', completed: false, list: 'Personal' },
    { id: '2', text: 'Finish project report', completed: false, dueDate: 'Tomorrow', list: 'Work' },
    { id: '3', text: 'Call dentist', completed: true, list: 'Personal' },
  ]);
  const [input, setInput] = useState('');
  const [list, setList] = useState('All');

  const addReminder = () => {
    if (!input.trim()) return;
    setReminders(prev => [...prev, { id: Date.now().toString(), text: input, completed: false, list: list === 'All' ? 'Personal' : list }]);
    setInput('');
  };

  const toggle = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const del = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const lists = ['All', ...new Set(reminders.map(r => r.list))];
  const filtered = list === 'All' ? reminders : reminders.filter(r => r.list === list);

  return (
    <AppLayout title="Reminders">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {lists.map(l => (
          <button
            key={l}
            onClick={() => setList(l)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${l === list ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-0">
        {filtered.map(r => (
          <div key={r.id} className="flex items-center gap-3 py-3 border-b border-border">
            <button
              onClick={() => toggle(r.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${r.completed ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
            >
              {r.completed && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>
            <div className="flex-1">
              <p className={`text-sm ${r.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{r.text}</p>
              {r.dueDate && <p className="text-xs text-muted-foreground">{r.dueDate}</p>}
            </div>
            <button onClick={() => del(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addReminder()}
          placeholder="New reminder..."
          className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground"
        />
        <button onClick={addReminder} className="bg-primary text-primary-foreground rounded-lg px-3 py-2">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </AppLayout>
  );
};
