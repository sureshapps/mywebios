import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Note } from '@/types';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

export const NotesPanel = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('ios-notes', []);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const startNew = () => { setEditing('new'); setTitle(''); setContent(''); };
  const startEdit = (n: Note) => { setEditing(n.id); setTitle(n.title); setContent(n.content); };

  const save = () => {
    if (editing === 'new') {
      const n: Note = { id: Date.now().toString(), title, content, folder: 'All', createdAt: Date.now(), updatedAt: Date.now() };
      setNotes(prev => [n, ...prev]);
    } else {
      setNotes(prev => prev.map(n => n.id === editing ? { ...n, title, content, updatedAt: Date.now() } : n));
    }
    setEditing(null);
  };

  const remove = (id: string) => setNotes(prev => prev.filter(n => n.id !== id));

  if (editing) {
    return (
      <div className="space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title"
          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} placeholder="Note content..."
          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
        <div className="flex gap-2">
          <button onClick={save} className="px-4 py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}>Save</button>
          <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl text-sm text-white/50"
            style={{ background: 'rgba(255,255,255,0.06)' }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-purple-300"
        style={{ background: 'rgba(139,92,246,0.15)' }}>
        <Plus className="w-4 h-4" /> Add Note
      </button>
      {notes.length === 0 && <p className="text-white/30 text-sm">No notes yet.</p>}
      {notes.map(n => (
        <div key={n.id} className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{n.title}</p>
            <p className="text-xs text-white/40 truncate">{n.content || 'Empty'}</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => startEdit(n)} className="p-2 rounded-lg hover:bg-white/10"><Edit className="w-4 h-4 text-white/50" /></button>
            <button onClick={() => remove(n.id)} className="p-2 rounded-lg hover:bg-white/10"><Trash2 className="w-4 h-4 text-red-400" /></button>
          </div>
        </div>
      ))}
    </div>
  );
};
