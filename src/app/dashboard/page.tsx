"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PenTool,
  BookOpen,
  TrendingUp,
  Award,
  Flame,
  Clock,
  Target,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/hooks/useProgress"
import { AchievementNotificationsContainer } from "@/components/progress"

export default function DashboardPage() {
  const { user } = useUser()
  const { progress, newBadges, clearNewBadges } = useProgress()

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      {/* Achievement Notifications */}
      <AchievementNotificationsContainer
        badgeIds={newBadges}
        onClear={clearNewBadges}
      />

      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Olá, {user?.firstName || "Escritor"}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Pronto para continuar sua jornada criativa?
        </p>
      </div>

      {/* Quick Stats - Com dados reais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Streak Atual</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress.streak.currentStreak} {progress.streak.currentStreak === 1 ? 'dia' : 'dias'}
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.streak.isAtRisk ? 'Em risco! Escreva hoje' : 'Continue escrevendo!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Palavras</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress.stats.totalWords.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{progress.stats.wordsThisWeek.toLocaleString()} esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Nível</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Nível {progress.level.level}</div>
            <p className="text-xs text-muted-foreground">
              {progress.level.currentXP}/{progress.level.xpForNextLevel} XP para nível {progress.level.level + 1}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Textos Escritos</CardTitle>
            <PenTool className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.stats.totalTexts}</div>
            <p className="text-xs text-muted-foreground">
              {progress.stats.totalPrompts} prompts completados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Prompt do Dia */}
      <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Prompt do Dia
              </CardTitle>
              <CardDescription className="mt-1">Desafio diário de escrita criativa</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Renova em 12h</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              Ficção • Intermediário
            </div>
            <h3 className="text-lg font-semibold">
              "Escreva sobre um objeto comum que guarda uma memória extraordinária"
            </h3>
            <p className="text-sm text-muted-foreground">
              Escolha um objeto do seu dia a dia e conte a história por trás dele.
              Pode ser uma chave, uma caneta, uma fotografia... O que torna esse objeto especial?
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/dashboard/escrever?prompt=daily">
                <PenTool className="mr-2 h-4 w-4" />
                Começar a Escrever
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/prompts">
                Ver Outros Prompts
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Seus últimos textos e conquistas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <PenTool className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Novo texto: "A Casa Abandonada"</p>
                <p className="text-xs text-muted-foreground">Há 2 horas • 847 palavras</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-2">
                <Award className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Conquista Desbloqueada: "7 Dias Seguidos"</p>
                <p className="text-xs text-muted-foreground">Ontem</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-secondary/10 p-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Subiu para Nível 8</p>
                <p className="text-xs text-muted-foreground">Há 3 dias</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/biblioteca">Ver Toda Biblioteca</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Objetivos */}
        <Card>
          <CardHeader>
            <CardTitle>Objetivos da Semana</CardTitle>
            <CardDescription>Continue sua jornada de escrita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Escrever 5.000 palavras
                </span>
                <span className="font-medium">2,341 / 5,000</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/20">
                <div className="h-2 rounded-full bg-primary w-[47%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-accent" />
                  Completar 3 prompts
                </span>
                <span className="font-medium">1 / 3</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/20">
                <div className="h-2 rounded-full bg-accent w-[33%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Manter streak de 7 dias
                </span>
                <span className="font-medium">7 / 7</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/20">
                <div className="h-2 rounded-full bg-orange-500 w-[100%]" />
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">✓ Objetivo completado!</p>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/progresso">Ver Progresso Completo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
