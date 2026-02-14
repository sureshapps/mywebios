import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Note } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

export const NotesApp = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('ios-notes', [
    { id: '1', title: 'Shopping List', content: 'Milk, Bread, Eggs, Butter', folder: 'All', createdAt: Date.now(), updatedAt: Date.now() },
    { id: '2', title: 'Ideas', content: 'Build an iOS simulator in React', folder: 'All', createdAt: Date.now(), updatedAt: Date.now() },
  ]);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const active = notes.find(n => n.id === activeNote);

  const addNote = () => {
    const n: Note = { id: Date.now().toString(), title: 'New Note', content: '', folder: 'All', createdAt: Date.now(), updatedAt: Date.now() };
    setNotes(prev => [n, ...prev]);
    setActiveNote(n.id);
  };

  const updateNote = (field: 'title' | 'content', value: string) => {
    setNotes(prev => prev.map(n => n.id === activeNote ? { ...n, [field]: value, updatedAt: Date.now() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNote === id) setActiveNote(null);
  };

  if (active) {
    return (
      <AppLayout title="Notes">
        <div className="space-y-3">
          <input
            value={active.title}
            onChange={e => updateNote('title', e.target.value)}
            className="text-2xl font-bold w-full bg-transparent text-foreground outline-none"
          />
          <textarea
            value={active.content}
            onChange={e => updateNote('content', e.target.value)}
            className="w-full min-h-[300px] bg-transparent text-foreground text-sm outline-none resize-none"
            placeholder="Start typing..."
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Notes"
      headerRight={<button onClick={addNote}><Plus className="w-5 h-5 text-primary" /></button>}
    >
      <div className="space-y-0">
        {notes.map(n => (
          <div key={n.id} className="flex items-center justify-between py-3 border-b border-border">
            <button className="text-left flex-1" onClick={() => setActiveNote(n.id)}>
              <p className="text-sm font-medium text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground truncate">{n.content || 'No content'}</p>
            </button>
            <button onClick={() => deleteNote(n.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};
