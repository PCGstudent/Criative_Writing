'use client';

/**
 * Componente de Exibição de Nível
 * Mostra nível atual e progresso para próximo nível
 * Sprint 4
 */

import { motion } from 'framer-motion';
import { Trophy, Zap } from 'lucide-react';
import { UserLevel } from '@/lib/types/progress';
import { ProgressBar } from './progress-bar';
import { cn } from '@/lib/utils';

interface LevelDisplayProps {
  level: UserLevel;
  variant?: 'compact' | 'full' | 'card';
  showXPDetails?: boolean;
  className?: string;
}

export function LevelDisplay({
  level,
  variant = 'full',
  showXPDetails = true,
  className,
}: LevelDisplayProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm">
          {level.level}
        </div>
        <div className="flex-1 min-w-[80px]">
          <ProgressBar
            current={level.currentXP}
            max={level.xpForNextLevel}
            size="sm"
            variant="default"
            animated={false}
          />
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800',
          'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50',
          'p-6',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorativo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                <div className="text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-0.5" />
                  <div className="text-xs font-bold">{level.level}</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Nível {level.level}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {getLevelTitle(level.level)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {level.totalXP.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Progresso para Nível {level.level + 1}
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {level.currentXP} / {level.xpForNextLevel} XP
              </span>
            </div>
            <ProgressBar
              current={level.currentXP}
              max={level.xpForNextLevel}
              size="lg"
              variant="default"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // variant === 'full'
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-md">
            {level.level}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Nível {level.level}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {getLevelTitle(level.level)}
            </p>
          </div>
        </div>

        {showXPDetails && (
          <div className="text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Total XP
            </div>
            <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
              <span className="font-bold">
                {level.totalXP.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <ProgressBar
        current={level.currentXP}
        max={level.xpForNextLevel}
        label={`Nível ${level.level + 1}`}
        showValues
        size="md"
      />
    </div>
  );
}

// Títulos por nível
function getLevelTitle(level: number): string {
  if (level < 5) return 'Aprendiz';
  if (level < 10) return 'Praticante';
  if (level < 20) return 'Escritor';
  if (level < 30) return 'Autor Talentoso';
  if (level < 50) return 'Mestre das Palavras';
  if (level < 75) return 'Virtuoso';
  return 'Lenda da Escrita';
}
