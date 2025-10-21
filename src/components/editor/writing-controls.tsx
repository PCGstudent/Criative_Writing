"use client"

import { Button } from "@/components/ui/button"
import { WritingTimer } from "./writing-timer"
import { Eye, EyeOff, Save } from "lucide-react"

interface WritingControlsProps {
  focusMode: boolean
  onFocusModeToggle: () => void
  onSave?: () => void
  isSaving?: boolean
  showTimer?: boolean
}

export function WritingControls({
  focusMode,
  onFocusModeToggle,
  onSave,
  isSaving = false,
  showTimer = true,
}: WritingControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        {showTimer && <WritingTimer />}

        <Button
          variant="outline"
          size="sm"
          onClick={onFocusModeToggle}
          className="gap-2"
        >
          {focusMode ? (
            <>
              <Eye className="h-4 w-4" />
              Sair do Modo Foco
            </>
          ) : (
            <>
              <EyeOff className="h-4 w-4" />
              Modo Foco
            </>
          )}
        </Button>
      </div>

      {onSave && (
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      )}
    </div>
  )
}
