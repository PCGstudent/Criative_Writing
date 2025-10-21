import { TrendingUp, Clock } from "lucide-react"

export default function ProgressoPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Sistema de Progresso</h1>

        <p className="text-muted-foreground">
          Esta funcionalidade será implementada no <strong>Sprint 4</strong>.
          Aqui poderás ver o teu XP, níveis, badges, conquistas, e gráficos de evolução.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <Clock className="h-4 w-4" />
          <span>Em breve...</span>
        </div>
      </div>
    </div>
  )
}
