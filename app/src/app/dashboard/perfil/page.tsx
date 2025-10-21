"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function ProfilePage() {
  const { user } = useUser()

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
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Nível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <div className="mt-2 h-2 rounded-full bg-secondary/20">
                  <div className="h-2 rounded-full bg-primary w-[65%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">450 XP para nível 9</p>
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
                <div className="text-2xl font-bold">7 dias</div>
                <p className="text-xs text-muted-foreground mt-1">Melhor: 23 dias</p>
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
                <div className="text-2xl font-bold">12,453</div>
                <p className="text-xs text-muted-foreground mt-1">Total escritas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#127</div>
                <p className="text-xs text-muted-foreground mt-1">Global</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>Badges e marcos desbloqueados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Primeira Escrita</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Completou seu primeiro texto na plataforma
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Desbloqueado há 2 meses
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="rounded-lg bg-orange-500/10 p-3">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Semana Dedicada</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Manteve um streak de 7 dias consecutivos
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Desbloqueado ontem
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">10K Palavras</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Escreveu mais de 10.000 palavras no total
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Desbloqueado há 1 semana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50 opacity-50">
                  <div className="rounded-lg bg-muted p-3">
                    <TrendingUp className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Nível 10</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Alcance o nível 10
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Bloqueado • 1,250 XP necessários
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Ver Todas as Conquistas (15/42)
              </Button>
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
