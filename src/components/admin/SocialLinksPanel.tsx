import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Github, Linkedin, Twitter, Globe, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const DEFAULT_LINKS: SocialLink[] = [
  { id: '1', platform: 'GitHub', url: 'https://github.com/alexmorgan' },
  { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/alexmorgan' },
  { id: '3', platform: 'Twitter', url: 'https://twitter.com/alexmorgan' },
];

export const SocialLinksPanel = () => {
  const [links, setLinks] = useLocalStorage<SocialLink[]>('ios-social-links', DEFAULT_LINKS);
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');

  const add = () => {
    if (!platform.trim() || !url.trim()) return;
    setLinks(prev => [...prev, { id: Date.now().toString(), platform, url }]);
    setPlatform(''); setUrl('');
  };

  const remove = (id: string) => setLinks(prev => prev.filter(l => l.id !== id));

  return (
    <div className="space-y-4">
      {links.map(l => (
        <div key={l.id} className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <p className="text-sm font-medium text-white">{l.platform}</p>
            <p className="text-xs text-white/40 truncate">{l.url}</p>
          </div>
          <button onClick={() => remove(l.id)} className="p-2 rounded-lg hover:bg-white/10">
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      ))}

      <div className="p-4 rounded-2xl space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="text-sm font-semibold text-white">Add Link</h3>
        <input value={platform} onChange={e => setPlatform(e.target.value)} placeholder="Platform name"
          className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..."
          className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
        <button onClick={add} className="px-4 py-2 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}>
          <Plus className="w-4 h-4 inline mr-1" /> Add
        </button>
      </div>
    </div>
  );
};
