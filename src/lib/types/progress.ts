/**
 * Sistema de Progresso e Gamificação
 * Sprint 4 - Tipos e Interfaces
 */

// ============================================
// XP e Níveis
// ============================================

export interface UserLevel {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  totalXP: number;
}

export interface XPGain {
  amount: number;
  source: XPSource;
  timestamp: Date;
}

export type XPSource =
  | 'words_written'      // 10 XP por 100 palavras
  | 'prompt_completed'   // 50-200 XP conforme dificuldade
  | 'daily_streak'       // Bonus diário
  | 'milestone'          // Conquistas especiais
  | 'community_feedback' // Dar feedback
  | 'text_published';    // Publicar texto

export const XP_RULES = {
  WORDS_PER_100: 10,        // 10 XP a cada 100 palavras
  PROMPT_BEGINNER: 50,      // 50 XP por prompt iniciante
  PROMPT_INTERMEDIATE: 100, // 100 XP por prompt intermediário
  PROMPT_ADVANCED: 200,     // 200 XP por prompt avançado
  DAILY_STREAK_BASE: 20,    // 20 XP base por manter streak
  DAILY_STREAK_MULTIPLIER: 5, // +5 XP por dia de streak (máx 7 dias)
  MILESTONE_FIRST_WRITE: 100,
  MILESTONE_1K_WORDS: 200,
  MILESTONE_10K_WORDS: 500,
  MILESTONE_50K_WORDS: 1000,
  MILESTONE_100K_WORDS: 2000,
};

// Cálculo progressivo de XP necessário por nível
// Fórmula: 100 * level^1.5 (arredondado)
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level, 1.5));
}

// Calcula o nível baseado no XP total
export function calculateLevel(totalXP: number): UserLevel {
  let level = 1;
  let xpUsed = 0;

  while (true) {
    const xpNeeded = getXPForLevel(level + 1);
    if (xpUsed + xpNeeded > totalXP) break;
    xpUsed += xpNeeded;
    level++;
  }

  const currentXP = totalXP - xpUsed;
  const xpForNextLevel = getXPForLevel(level + 1);

  return {
    level,
    currentXP,
    xpForNextLevel,
    totalXP,
  };
}

// ============================================
// Badges e Conquistas
// ============================================

export type BadgeCategory =
  | 'milestone'    // Marcos de palavras/textos
  | 'streak'       // Dias consecutivos
  | 'exploration'  // Exploração de categorias
  | 'dedication'   // Prompts completados
  | 'community'    // Interação social
  | 'special';     // Eventos especiais

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  icon: string; // Nome do ícone Lucide
  requirement: BadgeRequirement;
  xpReward: number;
}

export type BadgeRequirement =
  | { type: 'words_written'; count: number }
  | { type: 'texts_written'; count: number }
  | { type: 'streak_days'; count: number }
  | { type: 'categories_explored'; count: number }
  | { type: 'prompts_completed'; count: number }
  | { type: 'feedback_given'; count: number }
  | { type: 'special'; id: string };

export interface UserBadge {
  badgeId: string;
  unlockedAt: Date;
  seen: boolean; // Para notificação de conquista
}

// ============================================
// Streak System
// ============================================

export interface Streak {
  currentStreak: number;      // Dias consecutivos atuais
  longestStreak: number;      // Recorde pessoal
  lastActivityDate: Date;     // Última atividade
  streakFreezeAvailable: number; // Quantos freezes disponíveis (máx 2)
  streakFreezeUsed: number;   // Freezes usados este mês
  isAtRisk: boolean;          // True se não escreveu hoje
}

export interface StreakActivity {
  date: Date;
  wordsWritten: number;
  promptsCompleted: number;
}

// ============================================
// Estatísticas de Progresso
// ============================================

export interface WritingStats {
  // Totais gerais
  totalWords: number;
  totalTexts: number;
  totalPrompts: number;
  totalTimeWriting: number; // em minutos

  // Por categoria
  wordsByCategory: Record<string, number>;
  textsByCategory: Record<string, number>;

  // Temporal
  wordsThisWeek: number;
  wordsThisMonth: number;
  wordsToday: number;

  // Médias
  averageWordsPerSession: number;
  averageWordsPerDay: number;

  // Atividade
  activeDays: number;
  mostProductiveHour: number; // 0-23
}

// ============================================
// User Progress (Completo)
// ============================================

export interface UserProgress {
  userId: string;

  // XP e Níveis
  level: UserLevel;
  xpHistory: XPGain[];

  // Badges
  badges: UserBadge[];

  // Streak
  streak: Streak;
  streakHistory: StreakActivity[];

  // Estatísticas
  stats: WritingStats;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
