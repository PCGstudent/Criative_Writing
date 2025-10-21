"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  PenTool,
  BookOpen,
  TrendingUp,
  Trophy,
  Users,
  Sparkles,
  Target,
  Award,
  Zap
} from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.1),transparent_50%)]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              Transforme sua escrita em arte
            </motion.div>

            <motion.h1
              className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Pratique. Aprenda. Evolua.
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Escrita Criativa
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Uma plataforma dedicada para escritores que querem aprimorar suas habilidades,
              acompanhar seu progresso e se conectar com uma comunidade criativa.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="xl" className="group">
                Começar a Escrever
                <Zap className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
              <Button size="xl" variant="outline">
                Saiba Mais
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { label: "Escritores Ativos", value: "10K+" },
                { label: "Textos Criados", value: "50K+" },
                { label: "Prompts Diários", value: "100+" },
                { label: "Comunidade", value: "24/7" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Tudo que você precisa para evoluir
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Ferramentas poderosas e intuitivas para transformar você em um escritor melhor
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: PenTool,
                title: "Pratique Diariamente",
                description: "Prompts criativos renovados todos os dias para manter sua inspiração sempre ativa.",
                color: "text-primary"
              },
              {
                icon: BookOpen,
                title: "Aprenda Técnicas",
                description: "Recursos educativos e exercícios guiados para desenvolver suas habilidades.",
                color: "text-accent"
              },
              {
                icon: TrendingUp,
                title: "Acompanhe Progresso",
                description: "Sistema de níveis, XP e estatísticas detalhadas da sua evolução.",
                color: "text-secondary"
              },
              {
                icon: Trophy,
                title: "Competições",
                description: "Desafios semanais e mensais para testar suas habilidades.",
                color: "text-primary"
              },
              {
                icon: Users,
                title: "Comunidade Ativa",
                description: "Conecte-se com outros escritores, compartilhe e receba feedback.",
                color: "text-accent"
              },
              {
                icon: Award,
                title: "Conquistas",
                description: "Badges e reconhecimentos por marcos importantes na sua jornada.",
                color: "text-secondary"
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="group h-full transition-all hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Como Funciona
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Simples, intuitivo e projetado para seu crescimento
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Escolha um Prompt",
                description: "Selecione entre centenas de prompts criativos ou comece uma escrita livre.",
                icon: Target
              },
              {
                step: "02",
                title: "Escreva e Evolua",
                description: "Use nosso editor intuitivo com contador de palavras, timer e modo foco.",
                icon: PenTool
              },
              {
                step: "03",
                title: "Acompanhe e Compartilhe",
                description: "Veja seu progresso, ganhe XP, badges e compartilhe com a comunidade.",
                icon: TrendingUp
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {step.step}
                </div>
                <div className="mb-4 flex justify-center">
                  <step.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary p-12 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Pronto para Começar sua Jornada?
              </h2>
              <p className="mb-8 text-xl text-white/90">
                Junte-se a milhares de escritores e transforme sua criatividade
              </p>
              <Button size="xl" variant="secondary" className="shadow-lg">
                Criar Conta Gratuita
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">Escrita Criativa</h3>
              <p className="text-sm text-muted-foreground">
                Transformando escritores através da prática, aprendizado e comunidade.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutoriais</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Comunidade</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Escritores</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Eventos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            2025 Escrita Criativa. Feito com amor para escritores.
          </div>
        </div>
      </footer>
    </div>
  )
}
