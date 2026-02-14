import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MailItem } from '@/types';
import { Star, Trash2, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_MAILS: MailItem[] = [
  { id: '1', from: 'Apple', subject: 'Your Apple ID was used to sign in', preview: 'Your Apple ID was used to sign in to iCloud via a web browser.', date: 'Today', read: false, starred: false },
  { id: '2', from: 'John Smith', subject: 'Meeting tomorrow', preview: 'Hey, just wanted to confirm our meeting tomorrow at 10am...', date: 'Today', read: false, starred: true },
  { id: '3', from: 'GitHub', subject: 'New pull request', preview: 'A new pull request has been opened on your repository...', date: 'Yesterday', read: true, starred: false },
  { id: '4', from: 'Netflix', subject: 'New arrivals this week', preview: 'Check out the latest movies and shows added this week...', date: 'Yesterday', read: true, starred: false },
  { id: '5', from: 'Sarah Johnson', subject: 'Project update', preview: 'Hi, I wanted to share the latest project status report...', date: 'Mon', read: true, starred: false },
];

export const MailApp = () => {
  const [mails, setMails] = useLocalStorage<MailItem[]>('ios-mails', INITIAL_MAILS);
  const [composing, setComposing] = useState(false);

  const toggleStar = (id: string) => {
    setMails(prev => prev.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  const deleteMail = (id: string) => {
    setMails(prev => prev.filter(m => m.id !== id));
  };

  const markRead = (id: string) => {
    setMails(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  return (
    <AppLayout
      title="Mail"
      headerRight={<button onClick={() => setComposing(true)}><Pencil className="w-5 h-5 text-primary" /></button>}
    >
      <div className="space-y-0">
        <AnimatePresence>
          {mails.map(mail => (
            <motion.div
              key={mail.id}
              layout
              exit={{ x: -300, opacity: 0 }}
              className={`flex items-start gap-3 py-3 border-b border-border ${!mail.read ? 'bg-primary/5' : ''}`}
              onClick={() => markRead(mail.id)}
            >
              {!mail.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className={`text-sm ${!mail.read ? 'font-semibold' : ''} text-foreground`}>{mail.from}</span>
                  <span className="text-xs text-muted-foreground">{mail.date}</span>
                </div>
                <p className="text-sm text-foreground truncate">{mail.subject}</p>
                <p className="text-xs text-muted-foreground truncate">{mail.preview}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={(e) => { e.stopPropagation(); toggleStar(mail.id); }}>
                  <Star className={`w-4 h-4 ${mail.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); deleteMail(mail.id); }}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {composing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-background w-full rounded-t-xl p-4 max-h-[80%]"
          >
            <div className="flex justify-between mb-4">
              <button onClick={() => setComposing(false)} className="text-primary text-sm">Cancel</button>
              <span className="font-semibold text-foreground">New Message</span>
              <button className="text-primary text-sm font-semibold">Send</button>
            </div>
            <input placeholder="To:" className="w-full border-b border-border py-2 text-sm bg-transparent text-foreground" />
            <input placeholder="Subject" className="w-full border-b border-border py-2 text-sm bg-transparent text-foreground" />
            <textarea placeholder="Write your message..." className="w-full py-2 text-sm h-40 bg-transparent text-foreground resize-none" />
          </motion.div>
        </div>
      )}
    </AppLayout>
  );
};
