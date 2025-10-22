"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress"
import {
  User,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Flame,
  Settings
} from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/hooks/useProgress"
import { getBadgeById } from "@/lib/data/badges"
import * as Icons from "lucide-react"

export default function ProfilePage() {
  const { user } = useUser()
  const { progress } = useProgress()

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas informações e preferências
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-xl font-bold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                @{user?.username || "escritor"}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user?.primaryEmailAddress?.emailAddress || "email@exemplo.com"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Membro desde {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Bio</h3>
              <p className="text-sm text-muted-foreground">
                Apaixonado por escrita criativa e sempre em busca de melhorar minha arte.
                Escrevo principalmente ficção e poesia.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Achievements */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid - Com dados reais */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Nível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progress.level.level}</div>
                <div className="mt-2">
                  <ProgressBar
                    current={progress.level.currentXP}
                    max={progress.level.xpForNextLevel}
                    size="sm"
                    variant="default"
                    animated={false}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {progress.level.currentXP}/{progress.level.xpForNextLevel} XP para nível {progress.level.level + 1}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {progress.streak.currentStreak} {progress.streak.currentStreak === 1 ? 'dia' : 'dias'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Melhor: {progress.streak.longestStreak} dias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  Palavras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {progress.stats.totalWords.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Total escritas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progress.badges.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Badges desbloqueados</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements - Com dados reais */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>Badges e marcos desbloqueados</CardDescription>
            </CardHeader>
            <CardContent>
              {progress.badges.length > 0 ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {progress.badges.slice(0, 4).map((userBadge) => {
                      const badge = getBadgeById(userBadge.badgeId)
                      if (!badge) return null

                      const Icon = Icons[badge.icon as keyof typeof Icons] as Icons.LucideIcon

                      return (
                        <div key={badge.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                          <div className="rounded-lg bg-primary/10 p-3">
                            {Icon && <Icon className="h-6 w-6 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{badge.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {badge.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Desbloqueado{' '}
                              {formatRelativeDate(userBadge.unlockedAt)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/dashboard/progresso">
                      Ver Todas as Conquistas ({progress.badges.length})
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Você ainda não desbloqueou nenhum badge.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Comece a escrever para ganhar suas primeiras conquistas!
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/escrever">Começar a Escrever</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>Configure sua experiência na plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-xs text-muted-foreground">Receber atualizações e novidades</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Perfil Público</p>
                  <p className="text-xs text-muted-foreground">Permitir que outros vejam seu perfil</p>
                </div>
                <Button variant="outline" size="sm">Ativo</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-xs text-muted-foreground">Português (Brasil)</p>
                </div>
                <Button variant="outline" size="sm">Alterar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper function para formatar data relativa
function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'hoje'
  if (days === 1) return 'ontem'
  if (days < 7) return `há ${days} dias`
  if (days < 30) return `há ${Math.floor(days / 7)} semanas`
  if (days < 365) return `há ${Math.floor(days / 30)} meses`
  return `há ${Math.floor(days / 365)} anos`
}
