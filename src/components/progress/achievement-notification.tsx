'use client';

/**
 * Componente de Notificação de Conquista
 * Toast animado quando desbloquear badges
 * Sprint 4
 */

import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useEffect } from 'react';
import { getBadgeById, RARITY_COLORS } from '@/lib/data/badges';
import { cn } from '@/lib/utils';

interface AchievementNotificationProps {
  badgeId: string;
  onClose: () => void;
  duration?: number; // em ms
}

export function AchievementNotification({
  badgeId,
  onClose,
  duration = 5000,
}: AchievementNotificationProps) {
  const badge = getBadgeById(badgeId);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!badge) return null;

  const Icon = Icons[badge.icon as keyof typeof Icons] as Icons.LucideIcon;
  const colors = RARITY_COLORS[badge.rarity];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 right-4 z-[100] max-w-md"
        initial={{ opacity: 0, y: -100, x: 100, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.5 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-xl shadow-2xl',
            'bg-white dark:bg-slate-900',
            'border-2',
            colors.border
          )}
        >
          {/* Background Gradient */}
          <div
            className={cn(
              'absolute inset-0 opacity-10',
              colors.bg
            )}
          />

          {/* Shine Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />

          {/* Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className={cn(
                  'flex items-center justify-center w-16 h-16 rounded-full',
                  colors.bg,
                  colors.border,
                  'border-2'
                )}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                {Icon && <Icon className={cn('w-8 h-8', colors.text)} />}
              </motion.div>

              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Conquista Desbloqueada!
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {badge.name}
                  </h3>
                </motion.div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <motion.p
              className="text-sm text-slate-600 dark:text-slate-400 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {badge.description}
            </motion.p>

            {/* Footer */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className={cn('text-xs font-medium px-2 py-1 rounded-full', colors.bg, colors.text)}>
                {badge.rarity}
              </span>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                +{badge.xpReward} XP
              </span>
            </motion.div>
          </div>

          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={cn('absolute w-2 h-2 rounded-full', colors.bg)}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '50%',
                }}
                initial={{ scale: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  y: [-50, -150],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + i * 0.05,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// Container para múltiplas notificações
// ============================================

interface AchievementNotificationsContainerProps {
  badgeIds: string[];
  onClear: () => void;
}

export function AchievementNotificationsContainer({
  badgeIds,
  onClear,
}: AchievementNotificationsContainerProps) {
  if (badgeIds.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-4 max-w-md">
      {badgeIds.map((badgeId, index) => (
        <AchievementNotification
          key={badgeId}
          badgeId={badgeId}
          onClose={onClear}
          duration={5000 + index * 1000} // Aumenta duração para cada badge subsequente
        />
      ))}
    </div>
  );
}
