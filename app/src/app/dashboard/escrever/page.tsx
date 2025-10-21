"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Editor, WritingControls } from "@/components/editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDailyPrompt, getPromptById, type Prompt } from "@/lib/data/prompts"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EscreverPage() {
  const searchParams = useSearchParams()
  const promptParam = searchParams?.get("prompt")

  const [content, setContent] = useState("")
  const [focusMode, setFocusMode] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (promptParam === "daily") {
      setSelectedPrompt(getDailyPrompt())
    } else if (promptParam) {
      const prompt = getPromptById(promptParam)
      if (prompt) setSelectedPrompt(prompt)
    }
  }, [promptParam])

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    // TODO: Implement actual save to database
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving content:", content)
    setIsSaving(false)
  }, [content])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!content) return

    const interval = setInterval(() => {
      handleSave()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [content, handleSave])

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      fiction: "Ficção",
      poetry: "Poesia",
      "non-fiction": "Não-ficção",
      exercise: "Exercício",
    }
    return labels[category] || category
  }

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado",
    }
    return labels[level] || level
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nova Escrita</h1>
          <p className="text-muted-foreground mt-1">
            Deixe sua criatividade fluir
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Prompt Display */}
      {selectedPrompt && !focusMode && (
        <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {selectedPrompt.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {selectedPrompt.description}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">
                  {getCategoryLabel(selectedPrompt.category)}
                </Badge>
                <Badge variant="outline">
                  {getLevelLabel(selectedPrompt.level)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⏱️ ~{selectedPrompt.estimatedMinutes} min</span>
              <span>⭐ {selectedPrompt.xp} XP</span>
              <span className="flex gap-1">
                {selectedPrompt.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Writing Controls */}
      {!focusMode && (
        <WritingControls
          focusMode={focusMode}
          onFocusModeToggle={() => setFocusMode(!focusMode)}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}

      {/* Editor */}
      <div className={focusMode ? "fixed inset-0 z-50 bg-background p-8" : ""}>
        {focusMode && (
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFocusMode(false)}
            >
              Sair do Modo Foco
            </Button>
          </div>
        )}

        <Editor
          content={content}
          onChange={setContent}
          placeholder={
            selectedPrompt
              ? `Comece a escrever sobre: ${selectedPrompt.title}...`
              : "Comece a escrever sua história..."
          }
          className={focusMode ? "min-h-[calc(100vh-120px)]" : "min-h-[500px]"}
          focusMode={focusMode}
        />
      </div>

      {/* Quick Save Reminder */}
      {!focusMode && content.length > 100 && (
        <p className="text-xs text-muted-foreground text-center">
          💾 Auto-save ativo • Última atualização há menos de 30s
        </p>
      )}
    </div>
  )
}
