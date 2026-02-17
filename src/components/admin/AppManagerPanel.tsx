import { useState } from 'react';
import { HOME_APPS, DOCK_APPS, ALL_APPS } from '@/config/apps';
import { Eye, EyeOff, GripVertical } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const AppManagerPanel = () => {
  const [hiddenApps, setHiddenApps] = useLocalStorage<string[]>('ios-hidden-apps', []);

  const toggleApp = (id: string) => {
    setHiddenApps(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const allApps = ALL_APPS;

  return (
    <div className="space-y-4">
      <p className="text-xs text-white/40">Toggle visibility of apps on the home screen. Dock apps cannot be hidden.</p>

      <div className="space-y-2">
        {allApps.map(app => {
          const isDock = app.dock;
          const isHidden = hiddenApps.includes(app.id);
          return (
            <div key={app.id}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{app.name[0]}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{app.name}</span>
                  {isDock && <span className="ml-2 text-[10px] text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded">Dock</span>}
                </div>
              </div>
              <button onClick={() => !isDock && toggleApp(app.id)} disabled={isDock}
                className={`p-2 rounded-lg transition-colors ${isDock ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}>
                {isHidden ? <EyeOff className="w-4 h-4 text-red-400" /> : <Eye className="w-4 h-4 text-green-400" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
