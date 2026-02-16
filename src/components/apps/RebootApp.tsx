import { useState } from 'react';
import { useScreen } from '@/contexts/ScreenContext';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { motion } from 'framer-motion';
import { Power, RefreshCw, AlertCircle, ChevronRight, X } from 'lucide-react';

export const RebootApp = () => {
  const { closeApp, lock } = useScreen();
  const [rebooting, setRebooting] = useState(false);
  const [poweringOff, setPoweringOff] = useState(false);

  const handleReboot = () => {
    setRebooting(true);
    // Clear all storage and cookies
    localStorage.clear();
    sessionStorage.clear();
    // Clear cookies
    document.cookie.split(';').forEach(c => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    // Clear caches
    if ('caches' in window) {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handlePowerOff = () => {
    setPoweringOff(true);
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach(c => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    if ('caches' in window) {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
    setTimeout(() => {
      lock();
    }, 2000);
  };

  if (rebooting || poweringOff) {
    return (
      <motion.div
        className="absolute inset-0 bg-black flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg className="opacity-90 mb-8" fill="white" height="80" width="80" viewBox="0 0 24 24">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="text-white/50 text-sm mt-6">
          {rebooting ? 'Restarting...' : 'Shutting down...'}
        </p>
      </motion.div>
    );
  }

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black flex flex-col items-center justify-between p-8 pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Apple Logo */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <svg className="opacity-90" fill="white" height="80" width="80" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full opacity-40" />
            <div className="w-2 h-2 bg-white rounded-full opacity-60" />
            <div className="w-2 h-2 bg-white rounded-full opacity-80" />
          </div>
        </div>
      </div>

      {/* Power Options */}
      <div className="w-full space-y-4">
        {/* Slide to Power Off */}
        <button onClick={handlePowerOff} className="w-full rounded-[20px] p-5 overflow-hidden" style={glassStyle}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Power className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="text-white text-[17px] font-semibold">slide to power off</div>
                <div className="text-white text-[13px] opacity-60 mt-0.5">Tap to confirm</div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/40" />
          </div>
        </button>

        {/* Restart */}
        <button onClick={handleReboot} className="w-full rounded-[20px] p-5" style={glassStyle}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <RefreshCw className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="text-white text-[17px] font-semibold">Restart</div>
                <div className="text-white text-[13px] opacity-60 mt-0.5">Reboot your device</div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/40" />
          </div>
        </button>

        {/* Cancel */}
        <button
          onClick={closeApp}
          className="w-full rounded-xl px-6 py-3"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(40px)' }}
        >
          <span className="text-white text-[17px] font-semibold">Cancel</span>
        </button>
      </div>

      {/* Emergency SOS */}
      <div className="w-full mt-8">
        <div className="rounded-[20px] p-5 overflow-hidden" style={{
          background: 'rgba(255, 59, 48, 0.2)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 59, 48, 0.3)',
          boxShadow: '0 8px 32px rgba(255, 59, 48, 0.2)',
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-500/30 rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-500" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-red-500 text-[17px] font-semibold">Emergency SOS</div>
                <div className="text-white text-[13px] opacity-60 mt-0.5">Slide for emergency call</div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-red-500/60" />
          </div>
        </div>
      </div>

      <HomeIndicator light />
    </motion.div>
  );
};
