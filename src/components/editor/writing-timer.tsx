"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Timer } from "lucide-react"

interface WritingTimerProps {
  onTimeUpdate?: (seconds: number) => void
}

export function WritingTimer({ onTimeUpdate }: WritingTimerProps) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newValue = prev + 1
          onTimeUpdate?.(newValue)
          return newValue
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, onTimeUpdate])

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }, [])

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
    onTimeUpdate?.(0)
  }

  return (
    <Card className="inline-flex items-center gap-2 px-4 py-2">
      <Timer className="h-4 w-4 text-muted-foreground" />
      <span className="font-mono text-lg font-semibold">
        {formatTime(seconds)}
      </span>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setIsRunning(!isRunning)}
          title={isRunning ? "Pausar" : "Iniciar"}
        >
          {isRunning ? (
            <Pause className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={handleReset}
          title="Reiniciar"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  )
}
