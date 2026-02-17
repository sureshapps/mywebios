import { useState, useEffect } from 'react';
import { LOCK_WALLPAPERS, HOME_WALLPAPERS } from '@/contexts/ThemeContext';
import { Plus, Trash2 } from 'lucide-react';

export const BackgroundPanel = () => {
  const [lockWp, setLockWp] = useState(() => localStorage.getItem('ios-lock-wallpaper') || LOCK_WALLPAPERS[0]);
  const [homeWp, setHomeWp] = useState(() => localStorage.getItem('ios-home-wallpaper') || HOME_WALLPAPERS[0]);
  const [customLock, setCustomLock] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('ios-custom-lock-wp') || '[]'); } catch { return []; }
  });
  const [customHome, setCustomHome] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('ios-custom-home-wp') || '[]'); } catch { return []; }
  });
  const [newGradient, setNewGradient] = useState('');

  const selectLock = (w: string) => { setLockWp(w); localStorage.setItem('ios-lock-wallpaper', w); };
  const selectHome = (w: string) => { setHomeWp(w); localStorage.setItem('ios-home-wallpaper', w); };

  const addCustom = (type: 'lock' | 'home') => {
    if (!newGradient.trim()) return;
    if (type === 'lock') {
      const updated = [...customLock, newGradient];
      setCustomLock(updated);
      localStorage.setItem('ios-custom-lock-wp', JSON.stringify(updated));
    } else {
      const updated = [...customHome, newGradient];
      setCustomHome(updated);
      localStorage.setItem('ios-custom-home-wp', JSON.stringify(updated));
    }
    setNewGradient('');
  };

  const WallpaperGrid = ({ items, selected, onSelect, label }: { items: string[]; selected: string; onSelect: (w: string) => void; label: string }) => (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">{label}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {items.map((w, i) => (
          <button key={i} onClick={() => onSelect(w)}
            className={`h-24 rounded-2xl transition-all ${w === selected ? 'ring-2 ring-purple-400 scale-105' : 'ring-1 ring-white/10'}`}
            style={{ background: w }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <WallpaperGrid items={[...LOCK_WALLPAPERS, ...customLock]} selected={lockWp} onSelect={selectLock} label="Lock Screen Wallpapers" />
      <WallpaperGrid items={[...HOME_WALLPAPERS, ...customHome]} selected={homeWp} onSelect={selectHome} label="Home Screen Wallpapers" />

      <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="text-sm font-semibold text-white mb-3">Add Custom Gradient</h3>
        <div className="flex gap-2">
          <input value={newGradient} onChange={e => setNewGradient(e.target.value)}
            placeholder="linear-gradient(135deg, #ff0 0%, #f0f 100%)"
            className="flex-1 px-3 py-2 rounded-xl text-sm text-white outline-none"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
          <button onClick={() => addCustom('lock')} className="px-3 py-2 rounded-xl text-xs font-medium text-purple-300"
            style={{ background: 'rgba(139,92,246,0.2)' }}>+ Lock</button>
          <button onClick={() => addCustom('home')} className="px-3 py-2 rounded-xl text-xs font-medium text-purple-300"
            style={{ background: 'rgba(139,92,246,0.2)' }}>+ Home</button>
        </div>
        {newGradient && (
          <div className="mt-3 h-16 rounded-xl" style={{ background: newGradient }} />
        )}
      </div>
    </div>
  );
};
