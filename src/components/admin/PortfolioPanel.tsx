import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useState } from 'react';

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  github: string;
  projects: { name: string; desc: string; tags: string; img: string }[];
  stats: { value: string; label: string }[];
}

const DEFAULT: PortfolioData = {
  name: 'Alex Morgan',
  title: 'Full Stack Developer',
  bio: 'Building scalable web applications with modern JavaScript frameworks.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  github: '@alexmorgan',
  projects: [
    { name: 'Analytics Dashboard', desc: 'Real-time data visualization platform.', tags: 'React,D3.js,Node.js', img: '' },
    { name: 'E-commerce Platform', desc: 'Full-featured online store.', tags: 'Next.js,Stripe,MongoDB', img: '' },
  ],
  stats: [
    { value: '127', label: 'Projects Completed' },
    { value: '5+', label: 'Years Experience' },
    { value: '2.4K', label: 'GitHub Commits' },
    { value: '43', label: 'Open Source' },
  ],
};

export const PortfolioPanel = () => {
  const [data, setData] = useLocalStorage<PortfolioData>('ios-portfolio', DEFAULT);

  const update = (field: keyof PortfolioData, value: any) => setData(prev => ({ ...prev, [field]: value }));

  const Field = ({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none resize-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="text-sm font-semibold text-white">Profile Info</h3>
        <Field label="Name" value={data.name} onChange={v => update('name', v)} />
        <Field label="Title" value={data.title} onChange={v => update('title', v)} />
        <Field label="Bio" value={data.bio} onChange={v => update('bio', v)} multiline />
        <Field label="Avatar URL" value={data.avatar} onChange={v => update('avatar', v)} />
        <Field label="GitHub Handle" value={data.github} onChange={v => update('github', v)} />
      </div>

      <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="text-sm font-semibold text-white">Stats</h3>
        {data.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={s.value} onChange={e => {
              const stats = [...data.stats];
              stats[i] = { ...stats[i], value: e.target.value };
              update('stats', stats);
            }}
              className="px-3 py-2 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
            <input value={s.label} onChange={e => {
              const stats = [...data.stats];
              stats[i] = { ...stats[i], label: e.target.value };
              update('stats', stats);
            }}
              className="px-3 py-2 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
