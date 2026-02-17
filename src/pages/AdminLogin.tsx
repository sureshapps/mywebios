import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try admin@example.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 30%, #1a1145 60%, #0f0a1e 100%)' }}>
      <form onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl p-8 space-y-6"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #c084fc 0%, #ec4899 100%)' }}>
            <Lock className="w-9 h-9 text-white" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-white/50">Enter your credentials to access the admin panel</p>
        </div>

        {error && <p className="text-red-400 text-xs text-center">{error}</p>}

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white placeholder:text-white/30 outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white text-sm"
          style={{ background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)' }}>
          Sign In
        </button>

        <p className="text-center text-white/30 text-xs">Forgot your password?</p>
      </form>

      <button onClick={() => navigate('/')}
        className="mt-6 flex items-center gap-2 text-white/40 text-sm hover:text-white/60 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return to main app
      </button>
    </div>
  );
};

export default AdminLogin;
