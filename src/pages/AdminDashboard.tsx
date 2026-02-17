import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  Image, LayoutGrid, FileText, MessageCircle, Settings, Palette,
  Share2, Phone, Code, Bell, Power, ArrowLeft, LogOut,
  Smartphone, Globe, Camera, Music, Calculator, Clock
} from 'lucide-react';

// Admin sub-panels
import { BackgroundPanel } from '@/components/admin/BackgroundPanel';
import { AppManagerPanel } from '@/components/admin/AppManagerPanel';
import { NotesPanel } from '@/components/admin/NotesPanel';
import { MessagesPanel } from '@/components/admin/MessagesPanel';
import { PortfolioPanel } from '@/components/admin/PortfolioPanel';
import { SiteSettingsPanel } from '@/components/admin/SiteSettingsPanel';
import { SocialLinksPanel } from '@/components/admin/SocialLinksPanel';
import { ContactPanel } from '@/components/admin/ContactPanel';

const SECTIONS = [
  { id: 'background', name: 'Background', desc: 'Manage wallpapers', icon: Image, component: BackgroundPanel },
  { id: 'apps', name: 'App Manager', desc: 'Manage apps & layout', icon: LayoutGrid, component: AppManagerPanel },
  { id: 'portfolio', name: 'Portfolio', desc: 'Manage portfolio content', icon: Code, component: PortfolioPanel },
  { id: 'notes', name: 'Public Notes', desc: 'Manage notes', icon: FileText, component: NotesPanel },
  { id: 'messages', name: 'Messages', desc: 'Manage conversations', icon: MessageCircle, component: MessagesPanel },
  { id: 'social', name: 'Social Links', desc: 'Manage social links', icon: Share2, component: SocialLinksPanel },
  { id: 'contact', name: 'Contact Settings', desc: 'Manage contact info', icon: Phone, component: ContactPanel },
  { id: 'settings', name: 'Site Settings', desc: 'Manage site settings', icon: Settings, component: SiteSettingsPanel },
] as const;

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const active = SECTIONS.find(s => s.id === activeSection);

  if (active) {
    const Panel = active.component;
    return (
      <div className="min-h-screen" style={{ background: '#0d0b1a' }}>
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <button onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-purple-400 text-sm mb-6 hover:text-purple-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-white mb-1">{active.name}</h1>
          <p className="text-white/40 text-sm mb-6">{active.desc}</p>
          <Panel />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0d0b1a' }}>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
            <p className="text-white/40 text-sm">Manage your portfolio app from here.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Smartphone className="w-4 h-4" />
            </button>
            <button onClick={() => { logout(); navigate('/admin'); }}
              className="px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className="text-left p-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(139,92,246,0.15)' }}>
                <s.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-0.5">{s.name}</h3>
              <p className="text-xs text-white/40">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
