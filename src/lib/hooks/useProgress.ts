'use client';

/**
 * Hook para gerenciar progresso do usuário
 * XP, Níveis, Badges, Streaks e Estatísticas
 * Sprint 4
 */

import { useState, useEffect, useCallback } from 'react';
import {
  UserProgress,
  UserLevel,
  XPSource,
  XPGain,
  UserBadge,
  Streak,
  WritingStats,
  calculateLevel,
  XP_RULES,
} from '@/lib/types/progress';
import { BADGES, getBadgeById } from '@/lib/data/badges';

// Chave para localStorage
const STORAGE_KEY = 'user_progress';

// Dados iniciais
function getInitialProgress(): UserProgress {
  const now = new Date();
  return {
    userId: 'demo_user', // Em produção, virá do Clerk
    level: {
      level: 1,
      currentXP: 0,
      xpForNextLevel: 100,
      totalXP: 0,
    },
    xpHistory: [],
    badges: [
      // Early adopter para todos os usuários iniciais
      {
        badgeId: 'early_adopter',
        unlockedAt: now,
        seen: false,
      },
    ],
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: now,
      streakFreezeAvailable: 2,
      streakFreezeUsed: 0,
      isAtRisk: false,
    },
    streakHistory: [],
    stats: {
      totalWords: 0,
      totalTexts: 0,
      totalPrompts: 0,
      totalTimeWriting: 0,
      wordsByCategory: {},
      textsByCategory: {},
      wordsThisWeek: 0,
      wordsThisMonth: 0,
      wordsToday: 0,
      averageWordsPerSession: 0,
      averageWordsPerDay: 0,
      activeDays: 0,
      mostProductiveHour: 9,
    },
    createdAt: now,
    updatedAt: now,
  };
}

// Carregar do localStorage
function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getInitialProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getInitialProgress();

    const parsed = JSON.parse(stored);
    // Converter strings de data de volta para Date objects
    parsed.xpHistory = parsed.xpHistory.map((xp: any) => ({
      ...xp,
      timestamp: new Date(xp.timestamp),
    }));
    parsed.badges = parsed.badges.map((badge: any) => ({
      ...badge,
      unlockedAt: new Date(badge.unlockedAt),
    }));
    parsed.streak.lastActivityDate = new Date(parsed.streak.lastActivityDate);
    parsed.streakHistory = parsed.streakHistory.map((activity: any) => ({
      ...activity,
      date: new Date(activity.date),
    }));
    parsed.createdAt = new Date(parsed.createdAt);
    parsed.updatedAt = new Date(parsed.updatedAt);

    return parsed;
  } catch (error) {
    console.error('Error loading progress:', error);
    return getInitialProgress();
  }
}

// Salvar no localStorage
function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [newBadges, setNewBadges] = useState<string[]>([]); // IDs de badges desbloqueados recentemente

  // Carregar do storage ao montar
  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // ============================================
  // XP e Níveis
  // ============================================

  const addXP = useCallback(
    (amount: number, source: XPSource) => {
      setProgress((prev) => {
        const newTotalXP = prev.level.totalXP + amount;
        const newLevel = calculateLevel(newTotalXP);

        const xpGain: XPGain = {
          amount,
          source,
          timestamp: new Date(),
        };

        const leveledUp = newLevel.level > prev.level.level;

        return {
          ...prev,
          level: newLevel,
          xpHistory: [...prev.xpHistory, xpGain],
          updatedAt: new Date(),
        };
      });
    },
    []
  );

  // ============================================
  // Badges
  // ============================================

  const checkAndUnlockBadges = useCallback(() => {
    setProgress((prev) => {
      const unlockedBadgeIds = new Set(prev.badges.map((b) => b.badgeId));
      const newlyUnlocked: UserBadge[] = [];

      BADGES.forEach((badge) => {
        // Já desbloqueado
        if (unlockedBadgeIds.has(badge.id)) return;

        let shouldUnlock = false;

        // Verificar requisito
        switch (badge.requirement.type) {
          case 'words_written':
            shouldUnlock = prev.stats.totalWords >= badge.requirement.count;
            break;
          case 'texts_written':
            shouldUnlock = prev.stats.totalTexts >= badge.requirement.count;
            break;
          case 'streak_days':
            shouldUnlock = prev.streak.currentStreak >= badge.requirement.count;
            break;
          case 'prompts_completed':
            shouldUnlock = prev.stats.totalPrompts >= badge.requirement.count;
            break;
          case 'categories_explored':
            const categoriesCount = Object.keys(prev.stats.textsByCategory).length;
            shouldUnlock = categoriesCount >= badge.requirement.count;
            break;
          case 'feedback_given':
            // TODO: implementar quando tivermos sistema de feedback
            shouldUnlock = false;
            break;
          case 'special':
            // Badges especiais já são desbloqueados manualmente
            shouldUnlock = false;
            break;
        }

        if (shouldUnlock) {
          newlyUnlocked.push({
            badgeId: badge.id,
            unlockedAt: new Date(),
            seen: false,
          });
        }
      });

      if (newlyUnlocked.length === 0) return prev;

      // Adicionar XP pelos badges
      let bonusXP = 0;
      newlyUnlocked.forEach((userBadge) => {
        const badge = getBadgeById(userBadge.badgeId);
        if (badge) bonusXP += badge.xpReward;
      });

      const newTotalXP = prev.level.totalXP + bonusXP;
      const newLevel = calculateLevel(newTotalXP);

      // Guardar IDs dos novos badges para notificação
      setNewBadges(newlyUnlocked.map((b) => b.badgeId));

      return {
        ...prev,
        badges: [...prev.badges, ...newlyUnlocked],
        level: newLevel,
        xpHistory: [
          ...prev.xpHistory,
          ...newlyUnlocked.map((ub) => ({
            amount: getBadgeById(ub.badgeId)?.xpReward || 0,
            source: 'milestone' as XPSource,
            timestamp: new Date(),
          })),
        ],
        updatedAt: new Date(),
      };
    });
  }, []);

  const markBadgeAsSeen = useCallback((badgeId: string) => {
    setProgress((prev) => ({
      ...prev,
      badges: prev.badges.map((b) =>
        b.badgeId === badgeId ? { ...b, seen: true } : b
      ),
      updatedAt: new Date(),
    }));
  }, []);

  // ============================================
  // Streak
  // ============================================

  const updateStreak = useCallback(() => {
    setProgress((prev) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastActivity = new Date(
        prev.streak.lastActivityDate.getFullYear(),
        prev.streak.lastActivityDate.getMonth(),
        prev.streak.lastActivityDate.getDate()
      );

      const daysDiff = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );

      let newStreak = prev.streak.currentStreak;

      if (daysDiff === 0) {
        // Mesma data, mantém streak
        return prev;
      } else if (daysDiff === 1) {
        // Dia seguinte, incrementa streak
        newStreak++;
      } else {
        // Quebrou o streak
        newStreak = 1;
      }

      const longestStreak = Math.max(newStreak, prev.streak.longestStreak);

      // XP bonus por streak
      const streakBonus = Math.min(
        XP_RULES.DAILY_STREAK_BASE + newStreak * XP_RULES.DAILY_STREAK_MULTIPLIER,
        XP_RULES.DAILY_STREAK_BASE + 7 * XP_RULES.DAILY_STREAK_MULTIPLIER
      );

      const newTotalXP = prev.level.totalXP + streakBonus;
      const newLevel = calculateLevel(newTotalXP);

      return {
        ...prev,
        level: newLevel,
        streak: {
          ...prev.streak,
          currentStreak: newStreak,
          longestStreak,
          lastActivityDate: now,
          isAtRisk: false,
        },
        xpHistory: [
          ...prev.xpHistory,
          {
            amount: streakBonus,
            source: 'daily_streak' as XPSource,
            timestamp: now,
          },
        ],
        updatedAt: now,
      };
    });
  }, []);

  // ============================================
  // Estatísticas
  // ============================================

  const addWords = useCallback(
    (count: number, category?: string) => {
      setProgress((prev) => {
        const wordXP = Math.floor(count / 100) * XP_RULES.WORDS_PER_100;
        const newTotalXP = prev.level.totalXP + wordXP;
        const newLevel = calculateLevel(newTotalXP);

        const newWordsByCategory = { ...prev.stats.wordsByCategory };
        if (category) {
          newWordsByCategory[category] = (newWordsByCategory[category] || 0) + count;
        }

        return {
          ...prev,
          level: newLevel,
          stats: {
            ...prev.stats,
            totalWords: prev.stats.totalWords + count,
            wordsToday: prev.stats.wordsToday + count,
            wordsByCategory: newWordsByCategory,
          },
          xpHistory: [
            ...prev.xpHistory,
            {
              amount: wordXP,
              source: 'words_written' as XPSource,
              timestamp: new Date(),
            },
          ],
          updatedAt: new Date(),
        };
      });

      // Verificar badges após adicionar palavras
      setTimeout(checkAndUnlockBadges, 100);
    },
    [checkAndUnlockBadges]
  );

  const completeText = useCallback(
    (category?: string) => {
      setProgress((prev) => {
        const newTextsByCategory = { ...prev.stats.textsByCategory };
        if (category) {
          newTextsByCategory[category] = (newTextsByCategory[category] || 0) + 1;
        }

        return {
          ...prev,
          stats: {
            ...prev.stats,
            totalTexts: prev.stats.totalTexts + 1,
            textsByCategory: newTextsByCategory,
          },
          updatedAt: new Date(),
        };
      });

      // Verificar badges
      setTimeout(checkAndUnlockBadges, 100);
    },
    [checkAndUnlockBadges]
  );

  const completePrompt = useCallback(
    (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
      const xpReward =
        difficulty === 'beginner'
          ? XP_RULES.PROMPT_BEGINNER
          : difficulty === 'intermediate'
          ? XP_RULES.PROMPT_INTERMEDIATE
          : XP_RULES.PROMPT_ADVANCED;

      setProgress((prev) => {
        const newTotalXP = prev.level.totalXP + xpReward;
        const newLevel = calculateLevel(newTotalXP);

        return {
          ...prev,
          level: newLevel,
          stats: {
            ...prev.stats,
            totalPrompts: prev.stats.totalPrompts + 1,
          },
          xpHistory: [
            ...prev.xpHistory,
            {
              amount: xpReward,
              source: 'prompt_completed' as XPSource,
              timestamp: new Date(),
            },
          ],
          updatedAt: new Date(),
        };
      });

      // Verificar badges
      setTimeout(checkAndUnlockBadges, 100);
    },
    [checkAndUnlockBadges]
  );

  const addWritingTime = useCallback((minutes: number) => {
    setProgress((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalTimeWriting: prev.stats.totalTimeWriting + minutes,
      },
      updatedAt: new Date(),
    }));
  }, []);

  // ============================================
  // Reset e Debugging
  // ============================================

  const resetProgress = useCallback(() => {
    const initial = getInitialProgress();
    setProgress(initial);
    saveProgress(initial);
  }, []);

  return {
    // Estado
    progress,
    newBadges,

    // XP e Níveis
    addXP,

    // Badges
    checkAndUnlockBadges,
    markBadgeAsSeen,
    clearNewBadges: () => setNewBadges([]),

    // Streak
    updateStreak,

    // Estatísticas
    addWords,
    completeText,
    completePrompt,
    addWritingTime,

    // Utilidades
    resetProgress,
  };
}
