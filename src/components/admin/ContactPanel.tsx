import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website: string;
  available: boolean;
}

const DEFAULT: ContactInfo = {
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  website: 'https://alexmorgan.dev',
  available: true,
};

export const ContactPanel = () => {
  const [info, setInfo] = useLocalStorage<ContactInfo>('ios-contact-info', DEFAULT);

  const update = (field: keyof ContactInfo, value: any) => setInfo(prev => ({ ...prev, [field]: value }));

  const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Field label="Email" value={info.email} onChange={v => update('email', v)} />
        <Field label="Phone" value={info.phone} onChange={v => update('phone', v)} />
        <Field label="Location" value={info.location} onChange={v => update('location', v)} />
        <Field label="Website" value={info.website} onChange={v => update('website', v)} />

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-white">Available for hire</span>
          <button onClick={() => update('available', !info.available)}
            className={`w-11 h-6 rounded-full transition-colors ${info.available ? 'bg-green-500' : 'bg-white/20'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${info.available ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
