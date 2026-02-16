import { useScreen } from '@/contexts/ScreenContext';
import { StatusBar } from '@/components/ios/StatusBar';
import { HomeIndicator } from '@/components/ios/HomeIndicator';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  noPadding?: boolean;
  bgClass?: string;
}

export const AppLayout = ({ title, children, headerRight, noPadding, bgClass = 'bg-background' }: AppLayoutProps) => {
  const { closeApp } = useScreen();

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.x > 100 && info.velocity.x > 200) {
      closeApp();
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col ${bgClass}`}
      initial={{ scale: 0.3, opacity: 0, borderRadius: '16px' }}
      animate={{ scale: 1, opacity: 1, borderRadius: '0px' }}
      exit={{ scale: 0.3, opacity: 0, borderRadius: '16px' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDrag}
    >
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={closeApp} className="flex items-center gap-0.5 text-primary">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        <div className="w-16 flex justify-end">{headerRight}</div>
      </div>
      <div className={`flex-1 overflow-y-auto ${noPadding ? '' : 'px-4 pb-4'}`}>
        {children}
      </div>
      <HomeIndicator />
    </motion.div>
  );
};
