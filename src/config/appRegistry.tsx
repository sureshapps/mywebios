import React from 'react';
import { MailApp } from '@/components/apps/MailApp';
import { MessagesApp } from '@/components/apps/MessagesApp';
import { NotesApp } from '@/components/apps/NotesApp';
import { CalendarApp } from '@/components/apps/CalendarApp';
import { CalculatorApp } from '@/components/apps/CalculatorApp';
import { ClockApp } from '@/components/apps/ClockApp';
import { RemindersApp } from '@/components/apps/RemindersApp';
import { WeatherApp } from '@/components/apps/WeatherApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
import { CameraApp } from '@/components/apps/CameraApp';
import { PhotosApp } from '@/components/apps/PhotosApp';
import { SafariApp } from '@/components/apps/SafariApp';
import { FaceTimeApp } from '@/components/apps/FaceTimeApp';
import { AppLayout } from '@/components/ios/AppLayout';

const PlaceholderApp = ({ name }: { name: string }) => (
  <AppLayout title={name}>
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground text-sm">{name} - Coming Soon</p>
    </div>
  </AppLayout>
);

const APP_COMPONENTS: Record<string, React.FC> = {
  mail: MailApp,
  messages: MessagesApp,
  notes: NotesApp,
  calendar: CalendarApp,
  calculator: CalculatorApp,
  clock: ClockApp,
  reminders: RemindersApp,
  weather: WeatherApp,
  settings: SettingsApp,
  camera: CameraApp,
  photos: PhotosApp,
  safari: SafariApp,
  facetime: FaceTimeApp,
  phone: () => <PlaceholderApp name="Phone" />,
  music: () => <PlaceholderApp name="Music" />,
  maps: () => <PlaceholderApp name="Maps" />,
  wallet: () => <PlaceholderApp name="Wallet" />,
  health: () => <PlaceholderApp name="Health" />,
  files: () => <PlaceholderApp name="Files" />,
  stocks: () => <PlaceholderApp name="Stocks" />,
};

export const getAppComponent = (appId: string): React.FC => {
  return APP_COMPONENTS[appId] || (() => <PlaceholderApp name={appId} />);
};
