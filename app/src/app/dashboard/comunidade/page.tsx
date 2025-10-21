import { Users, Clock } from "lucide-react"

export default function ComunidadePage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <Users className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Comunidade</h1>

        <p className="text-muted-foreground">
          Esta funcionalidade será implementada no <strong>Sprint 7</strong>.
          Aqui poderás partilhar textos, dar feedback, seguir outros escritores, e participar na comunidade.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <Clock className="h-4 w-4" />
          <span>Em breve...</span>
        </div>
      </div>
    </div>
  )
}
