'use client';

/**
 * Componente de Contador de Streak
 * Exibe streak atual, recorde e status
 * Sprint 4
 */

import { motion } from 'framer-motion';
import { Flame, TrendingUp, AlertTriangle, Snowflake } from 'lucide-react';
import { Streak } from '@/lib/types/progress';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  streak: Streak;
  variant?: 'compact' | 'full' | 'card';
  className?: string;
}

export function StreakCounter({
  streak,
  variant = 'full',
  className,
}: StreakCounterProps) {
  const { currentStreak, longestStreak, isAtRisk, streakFreezeAvailable } = streak;

  if (variant === 'compact') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <motion.div
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium',
            currentStreak > 0
              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          )}
          animate={
            currentStreak > 0 && !isAtRisk
              ? { scale: [1, 1.05, 1] }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Flame className="w-4 h-4" />
          <span className="text-sm">{currentStreak}</span>
        </motion.div>

        {isAtRisk && (
          <motion.div
            className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Em risco!</span>
          </motion.div>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800',
          currentStreak > 0
            ? 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50'
            : 'bg-white dark:bg-slate-900',
          'p-6',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorativo */}
        {currentStreak > 0 && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl" />
        )}

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={cn(
                  'flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg',
                  currentStreak > 0
                    ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30'
                    : 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-slate-500/30'
                )}
                animate={
                  currentStreak > 0
                    ? { scale: [1, 1.05, 1] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Streak atual
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Recorde: {longestStreak}
                </span>
              </div>
            </div>
          </div>

          {/* Avisos e Info */}
          <div className="space-y-2">
            {isAtRisk && (
              <motion.div
                className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-300">
                    Seu streak está em risco!
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Escreva algo hoje para manter sua sequência.
                  </p>
                </div>
              </motion.div>
            )}

            {streakFreezeAvailable > 0 && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Snowflake className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-700 dark:text-blue-300">
                  {streakFreezeAvailable} {streakFreezeAvailable === 1 ? 'freeze disponível' : 'freezes disponíveis'}
                </span>
              </div>
            )}

            {currentStreak === 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-2">
                Comece a escrever para iniciar seu streak!
              </p>
            )}

            {currentStreak >= 7 && !isAtRisk && (
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 text-center py-2">
                Continue assim! Você está arrasando! 🔥
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // variant === 'full'
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-xl shadow-md',
              currentStreak > 0
                ? 'bg-gradient-to-br from-orange-500 to-red-600'
                : 'bg-gradient-to-br from-slate-400 to-slate-600'
            )}
            animate={
              currentStreak > 0
                ? { scale: [1, 1.05, 1] }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Streak atual
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Recorde
          </div>
          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
            <TrendingUp className="w-4 h-4" />
            <span className="font-bold">{longestStreak}</span>
          </div>
        </div>
      </div>

      {isAtRisk && (
        <motion.div
          className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <p className="text-sm text-amber-900 dark:text-amber-300 font-medium">
            Escreva algo hoje para manter seu streak!
          </p>
        </motion.div>
      )}

      {streakFreezeAvailable > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Snowflake className="w-4 h-4 text-blue-500" />
          <span>
            {streakFreezeAvailable} {streakFreezeAvailable === 1 ? 'freeze disponível' : 'freezes disponíveis'}
          </span>
        </div>
      )}
    </div>
  );
}
