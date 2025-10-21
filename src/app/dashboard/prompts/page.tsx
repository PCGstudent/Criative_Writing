"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PROMPTS, type PromptCategory, type PromptLevel } from "@/lib/data/prompts"
import { PenTool, Clock, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | "all">("all")
  const [selectedLevel, setSelectedLevel] = useState<PromptLevel | "all">("all")

  const categories: Array<{ value: PromptCategory | "all"; label: string }> = [
    { value: "all", label: "Todos" },
    { value: "fiction", label: "Ficção" },
    { value: "poetry", label: "Poesia" },
    { value: "non-fiction", label: "Não-ficção" },
    { value: "exercise", label: "Exercícios" },
  ]

  const levels: Array<{ value: PromptLevel | "all"; label: string; color: string }> = [
    { value: "all", label: "Todos os Níveis", color: "text-muted-foreground" },
    { value: "beginner", label: "Iniciante", color: "text-green-600 dark:text-green-400" },
    { value: "intermediate", label: "Intermediário", color: "text-yellow-600 dark:text-yellow-400" },
    { value: "advanced", label: "Avançado", color: "text-red-600 dark:text-red-400" },
  ]

  const filteredPrompts = PROMPTS.filter((prompt) => {
    if (selectedCategory !== "all" && prompt.category !== selectedCategory) return false
    if (selectedLevel !== "all" && prompt.level !== selectedLevel) return false
    return true
  })

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      fiction: "Ficção",
      poetry: "Poesia",
      "non-fiction": "Não-ficção",
      exercise: "Exercício",
    }
    return labels[category] || category
  }

  const getLevelInfo = (level: string) => {
    const info = levels.find((l) => l.value === level)
    return info || levels[0]
  }

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Biblioteca de Prompts
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore centenas de prompts criativos organizados por categoria e nível
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Categoria</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Nível</h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level.value}
                variant={selectedLevel === level.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level.value)}
                className={selectedLevel === level.value ? "" : level.color}
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredPrompts.length} {filteredPrompts.length === 1 ? "prompt encontrado" : "prompts encontrados"}
      </div>

      {/* Prompts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrompts.map((prompt) => {
          const levelInfo = getLevelInfo(prompt.level)
          return (
            <Card
              key={prompt.id}
              className="group hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {prompt.title}
                  </CardTitle>
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(prompt.category)}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs", levelInfo.color)}>
                    {levelInfo.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">
                  {prompt.description}
                </CardDescription>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{prompt.estimatedMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{prompt.xp} XP</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/dashboard/escrever?prompt=${prompt.id}`}>
                    <PenTool className="mr-2 h-4 w-4" />
                    Começar a Escrever
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum prompt encontrado com estes filtros.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedCategory("all")
              setSelectedLevel("all")
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
