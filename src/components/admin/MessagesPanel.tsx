import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Conversation } from '@/types';
import { Trash2, MessageCircle } from 'lucide-react';

export const MessagesPanel = () => {
  const [convos, setConvos] = useLocalStorage<Conversation[]>('ios-messages', []);

  const removeConvo = (id: string) => setConvos(prev => prev.filter(c => c.id !== id));
  const clearMessages = (id: string) => setConvos(prev => prev.map(c => c.id === id ? { ...c, messages: [], lastMessage: '', unread: 0 } : c));

  return (
    <div className="space-y-3">
      <p className="text-xs text-white/40">Manage conversations in the Messages app. Changes sync instantly.</p>
      {convos.length === 0 && <p className="text-white/30 text-sm">No conversations.</p>}
      {convos.map(c => (
        <div key={c.id} className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{c.avatar}</span>
            <div>
              <p className="text-sm font-medium text-white">{c.name}</p>
              <p className="text-xs text-white/40">{c.messages.length} messages • {c.unread} unread</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button onClick={() => clearMessages(c.id)} className="p-2 rounded-lg hover:bg-white/10" title="Clear messages">
              <MessageCircle className="w-4 h-4 text-white/50" />
            </button>
            <button onClick={() => removeConvo(c.id)} className="p-2 rounded-lg hover:bg-white/10" title="Delete conversation">
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
