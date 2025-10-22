'use client';

/**
 * Página de Progresso
 * Exibe XP, Níveis, Badges, Streaks e Estatísticas
 * Sprint 4
 */

import { useProgress } from '@/lib/hooks/useProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LevelDisplay, StreakCounter, BadgeGallery } from '@/components/progress';
import {
  Trophy,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  Calendar,
  FileText,
  Target,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BadgeCategory } from '@/lib/types/progress';

export default function ProgressoPage() {
  const { progress, resetProgress } = useProgress();
  const [badgeFilter, setBadgeFilter] = useState<BadgeCategory | 'all'>('all');

  const { level, streak, stats, badges } = progress;

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Seu Progresso
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe sua evolução e conquistas
          </p>
        </div>

        {/* Debug button - remover em produção */}
        <Button variant="outline" size="sm" onClick={resetProgress}>
          Reset (Debug)
        </Button>
      </div>

      {/* Nível e Streak */}
      <div className="grid gap-6 md:grid-cols-2">
        <LevelDisplay level={level} variant="card" />
        <StreakCounter streak={streak} variant="card" />
      </div>

      {/* Estatísticas Rápidas */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={<BookOpen className="w-5 h-5" />}
            label="Total de Palavras"
            value={stats.totalWords.toLocaleString()}
            subtext={`${stats.wordsThisWeek.toLocaleString()} esta semana`}
            color="text-indigo-500"
          />

          <StatsCard
            icon={<FileText className="w-5 h-5" />}
            label="Textos Escritos"
            value={stats.totalTexts.toString()}
            subtext={`${stats.totalPrompts} prompts completados`}
            color="text-teal-500"
          />

          <StatsCard
            icon={<Clock className="w-5 h-5" />}
            label="Tempo Escrevendo"
            value={formatTime(stats.totalTimeWriting)}
            subtext={`${stats.activeDays} dias ativos`}
            color="text-amber-500"
          />

          <StatsCard
            icon={<Zap className="w-5 h-5" />}
            label="XP Total"
            value={level.totalXP.toLocaleString()}
            subtext={`Nível ${level.level}`}
            color="text-purple-500"
          />
        </div>
      </div>

      {/* Médias e Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Médias e Insights
          </CardTitle>
          <CardDescription>Entenda seus padrões de escrita</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Média por Sessão</p>
              <p className="text-2xl font-bold">
                {stats.averageWordsPerSession > 0
                  ? Math.round(stats.averageWordsPerSession).toLocaleString()
                  : '0'}{' '}
                palavras
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Média por Dia</p>
              <p className="text-2xl font-bold">
                {stats.averageWordsPerDay > 0
                  ? Math.round(stats.averageWordsPerDay).toLocaleString()
                  : '0'}{' '}
                palavras
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Hora Mais Produtiva</p>
              <p className="text-2xl font-bold">{stats.mostProductiveHour}:00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Categoria */}
      {Object.keys(stats.wordsByCategory).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Distribuição por Categoria
            </CardTitle>
            <CardDescription>Onde você mais escreve</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.wordsByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, words]) => {
                  const percentage =
                    stats.totalWords > 0
                      ? ((words / stats.totalWords) * 100).toFixed(1)
                      : 0;

                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{category}</span>
                        <span className="text-muted-foreground">
                          {words.toLocaleString()} palavras ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary/20 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Badges e Conquistas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Conquistas
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {badges.length} de {require('@/lib/data/badges').BADGES.length} badges
              desbloqueados
            </p>
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            <Button
              variant={badgeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBadgeFilter('all')}
            >
              Todos
            </Button>
            <Button
              variant={badgeFilter === 'milestone' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBadgeFilter('milestone')}
            >
              Marcos
            </Button>
            <Button
              variant={badgeFilter === 'streak' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBadgeFilter('streak')}
            >
              Streaks
            </Button>
          </div>
        </div>

        <BadgeGallery
          unlockedBadges={badges}
          filterByCategory={badgeFilter === 'all' ? undefined : badgeFilter}
          variant="grid"
          showLocked
        />
      </div>

      {/* Histórico de XP Recente */}
      {progress.xpHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Atividade Recente
            </CardTitle>
            <CardDescription>Últimos ganhos de XP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progress.xpHistory
                .slice(-10)
                .reverse()
                .map((xp, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm font-medium">
                          {getXPSourceLabel(xp.source)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(xp.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">
                      +{xp.amount} XP
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ============================================
// Componentes Auxiliares
// ============================================

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  color?: string;
}

function StatsCard({ icon, label, value, subtext, color = 'text-primary' }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <div className={color}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ============================================
// Helpers
// ============================================

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

function formatDateTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Agora mesmo';
  if (minutes < 60) return `Há ${minutes}min`;
  if (hours < 24) return `Há ${hours}h`;
  if (days < 7) return `Há ${days}d`;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date);
}

function getXPSourceLabel(source: string): string {
  const labels: Record<string, string> = {
    words_written: 'Palavras escritas',
    prompt_completed: 'Prompt completado',
    daily_streak: 'Streak diário',
    milestone: 'Conquista desbloqueada',
    community_feedback: 'Feedback dado',
    text_published: 'Texto publicado',
  };

  return labels[source] || source;
}
