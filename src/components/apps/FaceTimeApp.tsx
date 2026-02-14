import { AppLayout } from '@/components/ios/AppLayout';
import { Video, Phone, PhoneOff } from 'lucide-react';
import { useState } from 'react';

const CONTACTS = [
  { id: '1', name: 'Mom', avatar: '👩' },
  { id: '2', name: 'Dad', avatar: '👨' },
  { id: '3', name: 'Alex', avatar: '🧑' },
  { id: '4', name: 'Sarah', avatar: '👩‍💼' },
  { id: '5', name: 'Mike', avatar: '👨‍💻' },
  { id: '6', name: 'Lisa', avatar: '👩‍🎨' },
];

export const FaceTimeApp = () => {
  const [calling, setCalling] = useState<string | null>(null);
  const contact = CONTACTS.find(c => c.id === calling);

  if (contact) {
    return (
      <AppLayout title="" bgClass="bg-gray-900" noPadding>
        <div className="flex flex-col items-center justify-center h-full text-white">
          <span className="text-6xl mb-4">{contact.avatar}</span>
          <p className="text-xl font-light">{contact.name}</p>
          <p className="text-white/50 text-sm mt-2 animate-pulse">Calling...</p>
          <button
            onClick={() => setCalling(null)}
            className="mt-12 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
          >
            <PhoneOff className="w-7 h-7 text-white" />
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="FaceTime">
      <div className="grid grid-cols-2 gap-3">
        {CONTACTS.map(c => (
          <button
            key={c.id}
            onClick={() => setCalling(c.id)}
            className="bg-card rounded-xl p-4 flex flex-col items-center gap-2 border border-border"
          >
            <span className="text-4xl">{c.avatar}</span>
            <span className="text-sm text-foreground">{c.name}</span>
            <div className="flex gap-3 mt-1">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </AppLayout>
  );
};
