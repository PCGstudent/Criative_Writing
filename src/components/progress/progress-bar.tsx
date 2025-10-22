'use client';

/**
 * Componente de Barra de Progresso
 * Usado para XP e outras métricas de progresso
 * Sprint 4
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showValues?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const variantStyles = {
  default: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  accent: 'bg-teal-500',
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  current,
  max,
  label,
  showValues = false,
  variant = 'default',
  size = 'md',
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {(label || showValues) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </span>
          )}
          {showValues && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {current.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}

      <div className="relative w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={cn(
            'relative rounded-full transition-colors',
            sizeStyles[size],
            variantStyles[variant]
          )}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: 'easeOut',
          }}
        >
          {/* Brilho */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Pulso de animação */}
          {animated && percentage > 0 && percentage < 100 && (
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Percentagem (opcional, abaixo da barra) */}
      {size === 'lg' && (
        <div className="mt-1 text-center">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}
