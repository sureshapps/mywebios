import { AppInfo } from '@/types';

export const DOCK_APPS: AppInfo[] = [
  { id: 'phone', name: 'Phone', icon: 'Phone', color: 'bg-green-500', dock: true },
  { id: 'safari', name: 'Safari', icon: 'Compass', color: 'bg-blue-500', dock: true },
  { id: 'messages', name: 'Messages', icon: 'MessageCircle', color: 'bg-green-500', dock: true },
  { id: 'music', name: 'Music', icon: 'Music', color: 'bg-gradient-to-br from-pink-500 to-red-500', dock: true },
];

export const HOME_APPS: AppInfo[][] = [
  [
    { id: 'facetime', name: 'FaceTime', icon: 'Video', color: 'bg-green-500' },
    { id: 'calendar', name: 'Calendar', icon: 'CalendarDays', color: 'bg-white' },
    { id: 'photos', name: 'Photos', icon: 'Image', color: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600' },
    { id: 'camera', name: 'Camera', icon: 'Camera', color: 'bg-gray-700' },
    { id: 'mail', name: 'Mail', icon: 'Mail', color: 'bg-blue-500' },
    { id: 'clock', name: 'Clock', icon: 'Clock', color: 'bg-black' },
    { id: 'weather', name: 'Weather', icon: 'CloudSun', color: 'bg-gradient-to-b from-blue-400 to-blue-600' },
    { id: 'notes', name: 'Notes', icon: 'FileText', color: 'bg-yellow-500' },
    { id: 'reminders', name: 'Reminders', icon: 'CheckSquare', color: 'bg-blue-500' },
    { id: 'calculator', name: 'Calculator', icon: 'Calculator', color: 'bg-gray-800' },
    { id: 'settings', name: 'Settings', icon: 'Settings', color: 'bg-gray-500' },
    { id: 'maps', name: 'Maps', icon: 'Map', color: 'bg-green-600' },
  ],
  [
    { id: 'wallet', name: 'Wallet', icon: 'Wallet', color: 'bg-black' },
    { id: 'health', name: 'Health', icon: 'Heart', color: 'bg-red-500' },
    { id: 'files', name: 'Files', icon: 'FolderOpen', color: 'bg-blue-500' },
    { id: 'stocks', name: 'Stocks', icon: 'TrendingUp', color: 'bg-black' },
  ],
];

export const ALL_APPS = [...DOCK_APPS, ...HOME_APPS.flat()];
