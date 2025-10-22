'use client';

/**
 * Galeria de Badges
 * Exibe badges desbloqueados e bloqueados
 * Sprint 4
 */

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Badge, UserBadge, BadgeCategory } from '@/lib/types/progress';
import { BADGES, RARITY_COLORS, CATEGORY_INFO, getBadgeById } from '@/lib/data/badges';
import { cn } from '@/lib/utils';

interface BadgeGalleryProps {
  unlockedBadges: UserBadge[];
  filterByCategory?: BadgeCategory;
  variant?: 'grid' | 'list';
  showLocked?: boolean;
  className?: string;
}

export function BadgeGallery({
  unlockedBadges,
  filterByCategory,
  variant = 'grid',
  showLocked = true,
  className,
}: BadgeGalleryProps) {
  const unlockedIds = new Set(unlockedBadges.map((b) => b.badgeId));

  // Filtrar badges
  let displayBadges = BADGES;
  if (filterByCategory) {
    displayBadges = displayBadges.filter((b) => b.category === filterByCategory);
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {displayBadges.map((badge, index) => {
          const isUnlocked = unlockedIds.has(badge.id);
          const userBadge = unlockedBadges.find((ub) => ub.badgeId === badge.id);

          return (
            <BadgeListItem
              key={badge.id}
              badge={badge}
              isUnlocked={isUnlocked}
              unlockedAt={userBadge?.unlockedAt}
              index={index}
            />
          );
        })}
      </div>
    );
  }

  // variant === 'grid'
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4', className)}>
      {displayBadges.map((badge, index) => {
        const isUnlocked = unlockedIds.has(badge.id);
        if (!showLocked && !isUnlocked) return null;

        return (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={isUnlocked}
            index={index}
          />
        );
      })}
    </div>
  );
}

// ============================================
// Badge Card (Grid)
// ============================================

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  index: number;
}

function BadgeCard({ badge, isUnlocked, index }: BadgeCardProps) {
  const Icon = Icons[badge.icon as keyof typeof Icons] as Icons.LucideIcon;
  const colors = RARITY_COLORS[badge.rarity];

  return (
    <motion.div
      className={cn(
        'relative group rounded-xl p-4 border transition-all duration-300',
        isUnlocked
          ? `${colors.bg} ${colors.border} hover:shadow-lg ${colors.glow}`
          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-50',
        'cursor-pointer'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
    >
      {/* Badge Icon */}
      <div className="flex justify-center mb-3">
        <div
          className={cn(
            'flex items-center justify-center w-16 h-16 rounded-full',
            isUnlocked
              ? `${colors.bg} ${colors.border} border-2`
              : 'bg-slate-200 dark:bg-slate-800'
          )}
        >
          {Icon && (
            <Icon
              className={cn(
                'w-8 h-8',
                isUnlocked ? colors.text : 'text-slate-400 dark:text-slate-600'
              )}
            />
          )}
        </div>
      </div>

      {/* Badge Info */}
      <div className="text-center space-y-1">
        <h4
          className={cn(
            'font-bold text-sm line-clamp-1',
            isUnlocked
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-500 dark:text-slate-500'
          )}
        >
          {isUnlocked ? badge.name : '???'}
        </h4>
        <p
          className={cn(
            'text-xs line-clamp-2',
            isUnlocked
              ? 'text-slate-600 dark:text-slate-400'
              : 'text-slate-400 dark:text-slate-600'
          )}
        >
          {isUnlocked ? badge.description : 'Badge bloqueado'}
        </p>
      </div>

      {/* Rarity Indicator */}
      {isUnlocked && (
        <div className="mt-3 flex justify-center">
          <span
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              colors.bg,
              colors.text
            )}
          >
            {badge.rarity}
          </span>
        </div>
      )}

      {/* Shine effect when unlocked */}
      {isUnlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'linear',
          }}
        />
      )}

      {/* Lock icon for locked badges */}
      {!isUnlocked && (
        <div className="absolute top-2 right-2">
          <Icons.Lock className="w-4 h-4 text-slate-400 dark:text-slate-600" />
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// Badge List Item
// ============================================

interface BadgeListItemProps {
  badge: Badge;
  isUnlocked: boolean;
  unlockedAt?: Date;
  index: number;
}

function BadgeListItem({ badge, isUnlocked, unlockedAt, index }: BadgeListItemProps) {
  const Icon = Icons[badge.icon as keyof typeof Icons] as Icons.LucideIcon;
  const colors = RARITY_COLORS[badge.rarity];
  const categoryInfo = CATEGORY_INFO[badge.category];

  return (
    <motion.div
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border transition-all',
        isUnlocked
          ? `${colors.bg} ${colors.border} hover:shadow-md`
          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-50'
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0',
          isUnlocked ? `${colors.bg} ${colors.border} border-2` : 'bg-slate-200 dark:bg-slate-800'
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              'w-7 h-7',
              isUnlocked ? colors.text : 'text-slate-400 dark:text-slate-600'
            )}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4
            className={cn(
              'font-bold',
              isUnlocked
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 dark:text-slate-500'
            )}
          >
            {isUnlocked ? badge.name : 'Badge Bloqueado'}
          </h4>

          {isUnlocked && (
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0',
                colors.bg,
                colors.text
              )}
            >
              {badge.rarity}
            </span>
          )}
        </div>

        <p
          className={cn(
            'text-sm mb-2',
            isUnlocked
              ? 'text-slate-600 dark:text-slate-400'
              : 'text-slate-400 dark:text-slate-600'
          )}
        >
          {isUnlocked ? badge.description : 'Continue progredindo para desbloquear'}
        </p>

        <div className="flex items-center gap-3 text-xs">
          <span className={cn('flex items-center gap-1', categoryInfo.color)}>
            <Icons.Tag className="w-3 h-3" />
            {categoryInfo.label}
          </span>

          {isUnlocked && (
            <>
              <span className="text-slate-500 dark:text-slate-400">•</span>
              <span className="text-green-600 dark:text-green-400">
                +{badge.xpReward} XP
              </span>
              {unlockedAt && (
                <>
                  <span className="text-slate-500 dark:text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {formatDate(unlockedAt)}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lock/Check Icon */}
      <div className="flex-shrink-0">
        {isUnlocked ? (
          <Icons.CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <Icons.Lock className="w-6 h-6 text-slate-400 dark:text-slate-600" />
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// Helpers
// ============================================

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
