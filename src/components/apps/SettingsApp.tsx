import { AppLayout } from '@/components/ios/AppLayout';
import { useTheme, getWallpapers } from '@/contexts/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Wifi, Bluetooth, Moon, Bell, Battery, Shield, ChevronRight } from 'lucide-react';

export const SettingsApp = () => {
  const { isDark, toggleDark, wallpaper, setWallpaper } = useTheme();
  const [wifi, setWifi] = useLocalStorage('ios-wifi', true);
  const [bt, setBt] = useLocalStorage('ios-bt', true);
  const [dnd, setDnd] = useLocalStorage('ios-dnd', false);
  const [notifications, setNotifications] = useLocalStorage('ios-notif', true);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors ${on ? 'bg-green-500' : 'bg-muted'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const Row = ({ icon: Icon, label, right }: { icon: any; label: string; right: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 border-b border-border">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary" />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      {right}
    </div>
  );

  return (
    <AppLayout title="Settings">
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Connectivity</h3>
          <div className="bg-card rounded-xl px-4">
            <Row icon={Wifi} label="Wi-Fi" right={<Toggle on={wifi} onToggle={() => setWifi(!wifi)} />} />
            <Row icon={Bluetooth} label="Bluetooth" right={<Toggle on={bt} onToggle={() => setBt(!bt)} />} />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Preferences</h3>
          <div className="bg-card rounded-xl px-4">
            <Row icon={Moon} label="Dark Mode" right={<Toggle on={isDark} onToggle={toggleDark} />} />
            <Row icon={Bell} label="Notifications" right={<Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />} />
            <Row icon={Shield} label="Do Not Disturb" right={<Toggle on={dnd} onToggle={() => setDnd(!dnd)} />} />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Wallpaper</h3>
          <div className="grid grid-cols-3 gap-3">
            {getWallpapers().map((w, i) => (
              <button
                key={i}
                onClick={() => setWallpaper(w)}
                className={`h-20 rounded-xl border-2 transition-all ${w === wallpaper ? 'border-primary scale-105' : 'border-transparent'}`}
                style={{ background: w }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">About</h3>
          <div className="bg-card rounded-xl px-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-foreground">Version</span>
              <span className="text-sm text-muted-foreground">iOS Web 1.0</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-foreground">Built with</span>
              <span className="text-sm text-muted-foreground">React + Vite</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
