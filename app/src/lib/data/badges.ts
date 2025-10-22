/**
 * Sistema de Badges e Conquistas
 * Sprint 4
 */

import { Badge } from '@/lib/types/progress';

export const BADGES: Badge[] = [
  // ============================================
  // MILESTONE BADGES - Marcos de Escrita
  // ============================================
  {
    id: 'first_words',
    name: 'Primeiras Palavras',
    description: 'Escreva seu primeiro texto na plataforma',
    category: 'milestone',
    rarity: 'common',
    icon: 'Sparkles',
    requirement: { type: 'texts_written', count: 1 },
    xpReward: 100,
  },
  {
    id: 'wordsmith_1k',
    name: 'Escritor Iniciante',
    description: 'Escreva 1.000 palavras',
    category: 'milestone',
    rarity: 'common',
    icon: 'FileText',
    requirement: { type: 'words_written', count: 1000 },
    xpReward: 200,
  },
  {
    id: 'wordsmith_5k',
    name: 'Escritor Dedicado',
    description: 'Escreva 5.000 palavras',
    category: 'milestone',
    rarity: 'common',
    icon: 'BookOpen',
    requirement: { type: 'words_written', count: 5000 },
    xpReward: 300,
  },
  {
    id: 'wordsmith_10k',
    name: 'Escritor Talentoso',
    description: 'Escreva 10.000 palavras',
    category: 'milestone',
    rarity: 'rare',
    icon: 'Book',
    requirement: { type: 'words_written', count: 10000 },
    xpReward: 500,
  },
  {
    id: 'wordsmith_50k',
    name: 'Escritor Prolífico',
    description: 'Escreva 50.000 palavras',
    category: 'milestone',
    rarity: 'epic',
    icon: 'Library',
    requirement: { type: 'words_written', count: 50000 },
    xpReward: 1000,
  },
  {
    id: 'wordsmith_100k',
    name: 'Mestre das Palavras',
    description: 'Escreva 100.000 palavras',
    category: 'milestone',
    rarity: 'legendary',
    icon: 'Crown',
    requirement: { type: 'words_written', count: 100000 },
    xpReward: 2000,
  },
  {
    id: 'ten_texts',
    name: 'Colecionador de Histórias',
    description: 'Complete 10 textos',
    category: 'milestone',
    rarity: 'common',
    icon: 'FolderOpen',
    requirement: { type: 'texts_written', count: 10 },
    xpReward: 250,
  },
  {
    id: 'fifty_texts',
    name: 'Biblioteca Pessoal',
    description: 'Complete 50 textos',
    category: 'milestone',
    rarity: 'rare',
    icon: 'Archive',
    requirement: { type: 'texts_written', count: 50 },
    xpReward: 750,
  },
  {
    id: 'hundred_texts',
    name: 'Arquivista',
    description: 'Complete 100 textos',
    category: 'milestone',
    rarity: 'epic',
    icon: 'Database',
    requirement: { type: 'texts_written', count: 100 },
    xpReward: 1500,
  },

  // ============================================
  // STREAK BADGES - Consistência
  // ============================================
  {
    id: 'streak_3',
    name: 'Hábito em Formação',
    description: 'Mantenha um streak de 3 dias consecutivos',
    category: 'streak',
    rarity: 'common',
    icon: 'Flame',
    requirement: { type: 'streak_days', count: 3 },
    xpReward: 150,
  },
  {
    id: 'streak_7',
    name: 'Uma Semana Forte',
    description: 'Mantenha um streak de 7 dias consecutivos',
    category: 'streak',
    rarity: 'rare',
    icon: 'Zap',
    requirement: { type: 'streak_days', count: 7 },
    xpReward: 300,
  },
  {
    id: 'streak_30',
    name: 'Mestre da Consistência',
    description: 'Mantenha um streak de 30 dias consecutivos',
    category: 'streak',
    rarity: 'epic',
    icon: 'TrendingUp',
    requirement: { type: 'streak_days', count: 30 },
    xpReward: 1000,
  },
  {
    id: 'streak_100',
    name: 'Inabalável',
    description: 'Mantenha um streak de 100 dias consecutivos',
    category: 'streak',
    rarity: 'legendary',
    icon: 'Trophy',
    requirement: { type: 'streak_days', count: 100 },
    xpReward: 3000,
  },

  // ============================================
  // EXPLORATION BADGES - Exploração
  // ============================================
  {
    id: 'explorer',
    name: 'Explorador Literário',
    description: 'Escreva em todas as 4 categorias de prompts',
    category: 'exploration',
    rarity: 'rare',
    icon: 'Compass',
    requirement: { type: 'categories_explored', count: 4 },
    xpReward: 400,
  },

  // ============================================
  // DEDICATION BADGES - Dedicação a Prompts
  // ============================================
  {
    id: 'prompt_beginner',
    name: 'Aprendiz Dedicado',
    description: 'Complete 10 prompts',
    category: 'dedication',
    rarity: 'common',
    icon: 'Target',
    requirement: { type: 'prompts_completed', count: 10 },
    xpReward: 200,
  },
  {
    id: 'prompt_intermediate',
    name: 'Praticante Assíduo',
    description: 'Complete 25 prompts',
    category: 'dedication',
    rarity: 'rare',
    icon: 'Award',
    requirement: { type: 'prompts_completed', count: 25 },
    xpReward: 500,
  },
  {
    id: 'prompt_advanced',
    name: 'Mestre dos Desafios',
    description: 'Complete 50 prompts',
    category: 'dedication',
    rarity: 'epic',
    icon: 'Medal',
    requirement: { type: 'prompts_completed', count: 50 },
    xpReward: 1000,
  },
  {
    id: 'prompt_master',
    name: 'Lenda dos Prompts',
    description: 'Complete 100 prompts',
    category: 'dedication',
    rarity: 'legendary',
    icon: 'Star',
    requirement: { type: 'prompts_completed', count: 100 },
    xpReward: 2500,
  },

  // ============================================
  // COMMUNITY BADGES - Interação Social
  // ============================================
  {
    id: 'helpful_reader',
    name: 'Leitor Prestativo',
    description: 'Dê feedback em 10 textos de outros escritores',
    category: 'community',
    rarity: 'common',
    icon: 'MessageCircle',
    requirement: { type: 'feedback_given', count: 10 },
    xpReward: 300,
  },
  {
    id: 'community_pillar',
    name: 'Pilar da Comunidade',
    description: 'Dê feedback em 50 textos de outros escritores',
    category: 'community',
    rarity: 'rare',
    icon: 'Users',
    requirement: { type: 'feedback_given', count: 50 },
    xpReward: 800,
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Dê feedback em 100 textos de outros escritores',
    category: 'community',
    rarity: 'epic',
    icon: 'Heart',
    requirement: { type: 'feedback_given', count: 100 },
    xpReward: 1500,
  },

  // ============================================
  // SPECIAL BADGES - Eventos Especiais
  // ============================================
  {
    id: 'early_adopter',
    name: 'Pioneiro',
    description: 'Você faz parte dos primeiros escritores da plataforma!',
    category: 'special',
    rarity: 'legendary',
    icon: 'Rocket',
    requirement: { type: 'special', id: 'early_adopter' },
    xpReward: 500,
  },
];

// Helpers para buscar badges
export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((badge) => badge.id === id);
}

export function getBadgesByCategory(category: Badge['category']): Badge[] {
  return BADGES.filter((badge) => badge.category === category);
}

export function getBadgesByRarity(rarity: Badge['rarity']): Badge[] {
  return BADGES.filter((badge) => badge.rarity === rarity);
}

// Cores por raridade (para UI)
export const RARITY_COLORS = {
  common: {
    bg: 'bg-slate-500/10 dark:bg-slate-500/20',
    border: 'border-slate-500/50',
    text: 'text-slate-600 dark:text-slate-400',
    glow: 'shadow-slate-500/50',
  },
  rare: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    border: 'border-blue-500/50',
    text: 'text-blue-600 dark:text-blue-400',
    glow: 'shadow-blue-500/50',
  },
  epic: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    border: 'border-purple-500/50',
    text: 'text-purple-600 dark:text-purple-400',
    glow: 'shadow-purple-500/50',
  },
  legendary: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    border: 'border-amber-500/50',
    text: 'text-amber-600 dark:text-amber-400',
    glow: 'shadow-amber-500/50',
  },
} as const;

// Ícones por categoria (para UI)
export const CATEGORY_INFO = {
  milestone: {
    label: 'Marco',
    color: 'text-indigo-500',
  },
  streak: {
    label: 'Streak',
    color: 'text-orange-500',
  },
  exploration: {
    label: 'Exploração',
    color: 'text-teal-500',
  },
  dedication: {
    label: 'Dedicação',
    color: 'text-rose-500',
  },
  community: {
    label: 'Comunidade',
    color: 'text-green-500',
  },
  special: {
    label: 'Especial',
    color: 'text-amber-500',
  },
} as const;
