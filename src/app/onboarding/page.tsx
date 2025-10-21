"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PenTool,
  BookOpen,
  Target,
  Users,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const categories = [
  { id: "fiction", name: "Ficção", icon: BookOpen, description: "Contos, romances, fantasia" },
  { id: "poetry", name: "Poesia", icon: Sparkles, description: "Versos, sonetos, poemas livres" },
  { id: "non-fiction", name: "Não-ficção", icon: Target, description: "Ensaios, artigos, memórias" },
  { id: "scripts", name: "Roteiros", icon: Users, description: "Teatro, cinema, diálogos" },
]

const goals = [
  { id: "practice", name: "Praticar regularmente", description: "Criar o hábito de escrever todos os dias" },
  { id: "improve", name: "Melhorar minhas habilidades", description: "Desenvolver técnicas e estilo" },
  { id: "complete", name: "Completar um projeto", description: "Finalizar um livro, conto ou obra" },
  { id: "share", name: "Compartilhar minhas histórias", description: "Conectar com outros escritores" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const totalSteps = 3

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleFinish = () => {
    // TODO: Save preferences to database
    console.log({ selectedCategories, selectedGoals })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Passo {step} de {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((step / totalSteps) * 100)}% completo
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary/20">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <PenTool className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl">
                    Bem-vindo, {user?.firstName}! 👋
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Estamos felizes em tê-lo aqui. Vamos personalizar sua experiência em apenas alguns passos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <PenTool className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium">Pratique</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Centenas de prompts criativos
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <Target className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-medium">Evolua</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Acompanhe seu progresso
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <h3 className="font-medium">Conecte</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Comunidade de escritores
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep(2)} size="lg">
                      Começar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quais são seus interesses?</CardTitle>
                  <CardDescription>
                    Selecione os tipos de escrita que você gosta ou quer explorar (escolha quantos quiser)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      const isSelected = selectedCategories.includes(category.id)
                      return (
                        <button
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className={cn(
                            "flex items-start gap-4 p-4 rounded-lg border bg-card text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0",
                            isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                          )}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium flex items-center gap-2">
                              {category.name}
                              {isSelected && <Check className="h-4 w-4 text-primary" />}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {category.description}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={selectedCategories.length === 0}
                    >
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quais são seus objetivos?</CardTitle>
                  <CardDescription>
                    Selecione o que você espera alcançar na plataforma (escolha quantos quiser)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {goals.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.id)
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={cn(
                            "w-full flex items-start gap-4 p-4 rounded-lg border bg-card text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            isSelected
                              ? "bg-primary text-white"
                              : "border-2 border-muted-foreground"
                          )}>
                            {isSelected && <Check className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium">{goal.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {goal.description}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Button>
                    <Button
                      onClick={handleFinish}
                      disabled={selectedGoals.length === 0}
                      size="lg"
                      className="bg-gradient-to-r from-primary via-accent to-secondary"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Começar a Escrever
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
