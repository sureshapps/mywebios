import * as LucideIcons from 'lucide-react';
import { AppInfo } from '@/types';
import { useScreen } from '@/contexts/ScreenContext';
import { motion } from 'framer-motion';

interface AppIconProps {
  app: AppInfo;
  index?: number;
}

export const AppIcon = ({ app, index = 0 }: AppIconProps) => {
  const { openApp } = useScreen();
  const IconComponent = (LucideIcons as any)[app.icon];

  return (
    <motion.button
      className="flex flex-col items-center gap-1 w-full"
      onClick={() => openApp(app.id)}
      whileTap={{ scale: 0.85 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, type: 'spring', damping: 20 }}
    >
      <div className={`relative w-14 h-14 rounded-[16px] ${app.color} flex items-center justify-center shadow-lg`}>
        {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
        {app.badge && app.badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {app.badge}
          </span>
        )}
      </div>
      <span className="text-[11px] text-white drop-shadow-sm truncate w-full text-center">
        {app.name}
      </span>
    </motion.button>
  );
};
