export type ScreenType = 'lock' | 'home' | 'widgets' | 'app';

export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
  badge?: number;
  dock?: boolean;
}

export interface WidgetSize {
  cols: number;
  rows: number;
}

export type WidgetType = 'clock' | 'weather' | 'calendar' | 'fitness';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  size: WidgetSize;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  createdAt: number;
  updatedAt: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  color: string;
}

export interface Reminder {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  list: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: number;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
  lastMessage: string;
  unread: number;
}

export interface MailItem {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

export interface Alarm {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
  days: string[];
}

export interface Photo {
  id: string;
  src: string;
  timestamp: number;
  album?: string;
}
