import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { Github, Linkedin, Twitter, Send, ExternalLink } from 'lucide-react';

const SKILLS = {
  Frontend: { color: 'bg-blue-500/10 text-blue-500', items: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'GraphQL'] },
  Backend: { color: 'bg-green-500/10 text-green-500', items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis'] },
  'DevOps & Tools': { color: 'bg-violet-500/10 text-violet-500', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Linux'] },
};

const PROJECTS = [
  { name: 'Analytics Dashboard', desc: 'Real-time data visualization platform with customizable widgets and interactive charts.', tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'], img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop', live: true },
  { name: 'E-commerce Platform', desc: 'Full-featured online store with payment integration and inventory management.', tags: ['Next.js', 'Stripe', 'MongoDB', 'Redis'], img: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=300&fit=crop', live: true },
  { name: 'Task Management App', desc: 'Collaborative project management tool with real-time updates and team chat.', tags: ['Vue.js', 'Socket.io', 'Express', 'MySQL'], img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=300&fit=crop', live: true },
  { name: 'AI Content Generator', desc: 'ML powered content creation platform using GPT models for marketing copy.', tags: ['Next.js', 'OpenAI', 'TypeScript', 'Supabase'], img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop', live: true },
];

const STATS = [
  { value: '127', label: 'Projects Completed', color: 'text-blue-500' },
  { value: '5+', label: 'Years Experience', color: 'text-green-500' },
  { value: '2.4K', label: 'GitHub Commits', color: 'text-violet-500' },
  { value: '43', label: 'Open Source', color: 'text-orange-500' },
];

const CONTRIBUTION_LEVELS = [20, 40, 60, 80, 100, 40, 60, 80, 100, 20, 40, 60, 80, 100, 40, 60, 80, 100, 20, 40, 60, 60, 80, 100, 20, 40, 60, 80, 100, 20, 40, 60, 80, 100, 40];

export const PortfolioApp = () => {
  const [filter, setFilter] = useState('all');
  const filters = ['All Projects', 'Web Apps', 'Mobile', 'Open Source'];

  return (
    <AppLayout title="Portfolio" noPadding>
      <div className="overflow-y-auto bg-secondary/30">
        {/* Hero */}
        <header className="px-5 pt-8 pb-8">
          <div className="flex items-start gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Alex Morgan"
              className="w-24 h-24 rounded-3xl shadow-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Alex Morgan</h1>
              <p className="text-lg font-semibold text-violet-500 mb-2">Full Stack Developer</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building scalable web applications with modern JavaScript frameworks.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              Get in Touch
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-card text-primary text-sm font-semibold">
              Download CV
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="px-5 pb-6">
          <div className="grid grid-cols-2 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="p-4 rounded-2xl bg-card border border-border">
                <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="px-5 pb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Technical Skills</h2>
          <div className="space-y-4">
            {Object.entries(SKILLS).map(([cat, { color, items }]) => (
              <div key={cat} className="p-4 rounded-2xl bg-card border border-border">
                <h3 className="text-base font-semibold text-foreground mb-3">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => (
                    <span key={s} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${color}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="px-5 pb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Featured Projects</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f.toLowerCase())}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  filter === f.toLowerCase() ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {PROJECTS.map(p => (
              <article key={p.name} className="rounded-2xl bg-card border border-border overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                    {p.live && <span className="w-2 h-2 rounded-full bg-green-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-secondary text-xs text-muted-foreground font-medium">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold text-center flex items-center justify-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Live Demo
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-semibold text-center flex items-center justify-center gap-1">
                      <Github className="w-3 h-3" /> GitHub
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* GitHub Activity */}
        <section className="px-5 pb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">GitHub Activity</h2>
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Github className="w-7 h-7 text-foreground" />
                <div>
                  <div className="text-base font-semibold text-foreground">@alexmorgan</div>
                  <div className="text-xs text-muted-foreground">2,437 contributions this year</div>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">Follow</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {CONTRIBUTION_LEVELS.map((lvl, i) => (
                <div key={i} className="w-full aspect-square rounded" style={{ backgroundColor: `rgba(52, 199, 89, ${lvl / 100})` }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[{ v: '83', l: 'Repositories' }, { v: '1.2K', l: 'Followers' }, { v: '342', l: 'Following' }].map(s => (
                <div key={s.l}>
                  <div className="text-base font-semibold text-foreground">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-5 pb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Get in Touch</h2>
          <p className="text-sm text-muted-foreground mb-4">Have a project in mind? Let's work together.</p>
          <div className="rounded-2xl bg-card border border-border p-5 space-y-4">
            <input className="w-full px-4 py-3 rounded-xl bg-secondary text-sm text-foreground" placeholder="Your name" />
            <input className="w-full px-4 py-3 rounded-xl bg-secondary text-sm text-foreground" placeholder="your.email@example.com" />
            <textarea className="w-full px-4 py-3 rounded-xl bg-secondary text-sm text-foreground resize-none" rows={4} placeholder="Tell me about your project..." />
            <button className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              Send Message
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-5 pb-8">
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-semibold text-foreground">Alex Morgan</div>
                <div className="text-xs text-muted-foreground">Full Stack Developer • San Francisco, CA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[Github, Linkedin, Twitter, Send].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">© 2024 Alex Morgan. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
};
