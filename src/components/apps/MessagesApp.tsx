import { useState, useRef, useEffect } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Conversation, Message } from '@/types';
import { Send } from 'lucide-react';

const INITIAL_CONVOS: Conversation[] = [
  {
    id: '1', name: 'Mom', avatar: '👩', unread: 2,
    lastMessage: 'Are you coming for dinner?',
    messages: [
      { id: '1', text: 'Hey sweetie!', sender: 'them', timestamp: Date.now() - 3600000 },
      { id: '2', text: 'Are you coming for dinner?', sender: 'them', timestamp: Date.now() - 1800000 },
    ]
  },
  {
    id: '2', name: 'Alex', avatar: '👨', unread: 0,
    lastMessage: 'Sounds good!',
    messages: [
      { id: '1', text: 'Want to grab coffee?', sender: 'me', timestamp: Date.now() - 7200000 },
      { id: '2', text: 'Sounds good!', sender: 'them', timestamp: Date.now() - 3600000 },
    ]
  },
  {
    id: '3', name: 'Work Group', avatar: '💼', unread: 5,
    lastMessage: 'Meeting moved to 3pm',
    messages: [
      { id: '1', text: 'Meeting moved to 3pm', sender: 'them', timestamp: Date.now() - 900000 },
    ]
  },
];

export const MessagesApp = () => {
  const [convos, setConvos] = useLocalStorage<Conversation[]>('ios-messages', INITIAL_CONVOS);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  const active = convos.find(c => c.id === activeConvo);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages.length]);

  const sendMessage = () => {
    if (!input.trim() || !activeConvo) return;
    const msg: Message = { id: Date.now().toString(), text: input, sender: 'me', timestamp: Date.now() };
    setConvos(prev => prev.map(c =>
      c.id === activeConvo
        ? { ...c, messages: [...c.messages, msg], lastMessage: input, unread: 0 }
        : c
    ));
    setInput('');
  };

  if (active) {
    return (
      <AppLayout title={active.name}>
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-2 pb-2">
            {active.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>
          <div className="flex gap-2 pt-2 border-t border-border sticky bottom-0 bg-background pb-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="iMessage"
              className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground"
            />
            <button onClick={sendMessage} className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Messages">
      <div className="space-y-0">
        {convos.map(c => (
          <button
            key={c.id}
            className="w-full flex items-center gap-3 py-3 border-b border-border text-left"
            onClick={() => setActiveConvo(c.id)}
          >
            <span className="text-3xl">{c.avatar}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="font-medium text-sm text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground">now</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
            </div>
            {c.unread > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {c.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </AppLayout>
  );
};
