import { useLocalStorage } from '@/hooks/useLocalStorage';

interface SiteSettings {
  siteName: string;
  darkMode: boolean;
  wifi: boolean;
  bluetooth: boolean;
  notifications: boolean;
  dnd: boolean;
}

const DEFAULT: SiteSettings = {
  siteName: 'iOS Web Simulator',
  darkMode: false,
  wifi: true,
  bluetooth: true,
  notifications: true,
  dnd: false,
};

export const SiteSettingsPanel = () => {
  const [darkMode, setDarkMode] = useLocalStorage('ios-dark', false);
  const [wifi, setWifi] = useLocalStorage('ios-wifi', true);
  const [bt, setBt] = useLocalStorage('ios-bt', true);
  const [notif, setNotif] = useLocalStorage('ios-notif', true);
  const [dnd, setDnd] = useLocalStorage('ios-dnd', false);

  const Toggle = ({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) => (
    <div className="flex items-center justify-between p-4 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <span className="text-sm text-white">{label}</span>
      <button onClick={onToggle}
        className={`w-11 h-6 rounded-full transition-colors ${on ? 'bg-green-500' : 'bg-white/20'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-3">
      <p className="text-xs text-white/40">These settings sync with the main app's Settings app.</p>
      <Toggle label="Dark Mode" on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      <Toggle label="Wi-Fi" on={wifi} onToggle={() => setWifi(!wifi)} />
      <Toggle label="Bluetooth" on={bt} onToggle={() => setBt(!bt)} />
      <Toggle label="Notifications" on={notif} onToggle={() => setNotif(!notif)} />
      <Toggle label="Do Not Disturb" on={dnd} onToggle={() => setDnd(!dnd)} />
    </div>
  );
};
