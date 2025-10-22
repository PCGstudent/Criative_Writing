"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Editor, WritingControls } from "@/components/editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDailyPrompt, getPromptById, type Prompt } from "@/lib/data/prompts"
import { useProgress } from "@/lib/hooks/useProgress"
import { useLibrary } from "@/lib/hooks/useLibrary"
import { Sparkles, ArrowLeft, Trophy } from "lucide-react"
import Link from "next/link"

export default function EscreverPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const promptParam = searchParams?.get("prompt")

  // All state declarations first
  const [content, setContent] = useState("")
  const [wordCount, setWordCount] = useState(0) // Track word count from editor
  const [characterCount, setCharacterCount] = useState(0) // Track character count from editor
  const [focusMode, setFocusMode] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [initialWordCount, setInitialWordCount] = useState(0)
  const [currentTextId, setCurrentTextId] = useState<string | null>(null) // ID do texto sendo editado
  const [textTitle, setTextTitle] = useState("") // Título do texto
  const hasUpdatedStreak = useRef(false)

  // Progress hook
  const { updateStreak, addWords, completePrompt, completeText, progress } = useProgress()

  // Library hook
  const { createText, updateText } = useLibrary()


  useEffect(() => {
    if (promptParam === "daily") {
      setSelectedPrompt(getDailyPrompt())
    } else if (promptParam) {
      const prompt = getPromptById(promptParam)
      if (prompt) setSelectedPrompt(prompt)
    }
  }, [promptParam])

  // Atualizar streak ao começar a escrever (apenas uma vez por sessão)
  useEffect(() => {
    if (content.length > 50 && !hasUpdatedStreak.current) {
      updateStreak()
      hasUpdatedStreak.current = true
    }
  }, [content, updateStreak])

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    try {
      // Auto-determinar título se não houver
      const title = textTitle || (selectedPrompt ? selectedPrompt.title : `Texto ${new Date().toLocaleDateString()}`)

      if (!currentTextId) {
        // Criar novo texto
        const textId = createText({
          title,
          content,
          category: selectedPrompt?.category as any,
          promptId: selectedPrompt?.id,
          wordCount,
          characterCount,
        })
        setCurrentTextId(textId)
        console.log('✅ Novo texto criado:', textId)
      } else {
        // Atualizar texto existente
        updateText(currentTextId, {
          title,
          content,
          wordCount,
          characterCount,
          createVersion: false, // Não criar versão no auto-save
        })
        console.log('✅ Texto atualizado:', currentTextId)
      }
    } catch (error) {
      console.error('❌ Erro ao salvar:', error)
    }

    setIsSaving(false)
  }, [content, wordCount, characterCount, textTitle, currentTextId, selectedPrompt, createText, updateText])

  // Completar texto e ganhar XP
  const handleCompleteWriting = useCallback(async () => {
    console.log('🎯 Completando escrita...')
    console.log('📊 wordCount:', wordCount)
    console.log('📊 initialWordCount:', initialWordCount)
    console.log('📊 selectedPrompt:', selectedPrompt)

    setIsCompleting(true)

    // Usar o wordCount do editor (já calculado corretamente)
    const wordsWritten = Math.max(0, wordCount - initialWordCount)
    console.log('✍️ Palavras escritas:', wordsWritten)

    // Auto-determinar título se não houver
    const title = textTitle || (selectedPrompt ? selectedPrompt.title : `Texto ${new Date().toLocaleDateString()}`)

    // Salvar na biblioteca como texto completado
    if (!currentTextId) {
      // Criar novo texto completo
      const textId = createText({
        title,
        content,
        category: selectedPrompt?.category as any,
        promptId: selectedPrompt?.id,
        wordCount,
        characterCount,
      })
      // Marcar como completado
      updateText(textId, {
        status: 'completed',
        createVersion: true,
        versionNote: 'Versão final completada',
      })
      setCurrentTextId(textId)
      console.log('✅ Texto criado e completado:', textId)
    } else {
      // Atualizar texto existente e marcar como completado
      updateText(currentTextId, {
        title,
        content,
        wordCount,
        characterCount,
        status: 'completed',
        createVersion: true,
        versionNote: 'Versão final completada',
      })
      console.log('✅ Texto completado:', currentTextId)
    }

    // Dar XP pelas palavras (já pode ter dado incrementalmente, mas garantir o total)
    if (wordsWritten > 0) {
      console.log('💰 Chamando addWords com', wordsWritten, 'palavras')
      addWords(wordsWritten, selectedPrompt?.category)
    }

    // Completar texto
    console.log('✅ Chamando completeText')
    completeText(selectedPrompt?.category)

    // Se tiver prompt, dar XP do prompt
    if (selectedPrompt) {
      const difficulty = selectedPrompt.level as 'beginner' | 'intermediate' | 'advanced'
      console.log('🏆 Chamando completePrompt com difficulty:', difficulty)
      completePrompt(difficulty)
    }

    setIsCompleting(false)

    console.log('✅ Redirecionando para biblioteca...')
    // Mostrar mensagem de sucesso e redirecionar
    setTimeout(() => {
      router.push('/dashboard/biblioteca')
    }, 1000)
  }, [wordCount, characterCount, initialWordCount, selectedPrompt, textTitle, content, currentTextId, addWords, completeText, completePrompt, createText, updateText, router])

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
          onWordCountChange={setWordCount}
          onCharacterCountChange={setCharacterCount}
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

      {/* Complete Writing Button */}
      {!focusMode && wordCount >= 50 && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-green-900 dark:text-green-100 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Pronto para finalizar?
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Você escreveu {wordCount} palavras.
                  Complete sua escrita para ganhar XP e badges!
                </p>
                {selectedPrompt && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    ⭐ Ganhe {selectedPrompt.xp} XP ao completar este prompt
                  </p>
                )}
              </div>
              <Button
                onClick={handleCompleteWriting}
                disabled={isCompleting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isCompleting ? "Completando..." : "Completar Escrita"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Indicator */}
      {!focusMode && progress && (
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Nível {progress.level.level}</span>
            <span className="text-xs">•</span>
            <span>{progress.level.totalXP} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Streak: {progress.streak.currentStreak} dias</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{progress.stats.totalWords} palavras totais</span>
          </div>
        </div>
      )}
    </div>
  )
}
