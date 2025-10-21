"use client"

import { type Editor } from "@tiptap/react"
import { FileText, Type, Clock } from "lucide-react"

interface EditorStatsProps {
  editor: Editor
}

export function EditorStats({ editor }: EditorStatsProps) {
  if (!editor) {
    return null
  }

  const { characters, words } = editor.storage.characterCount
  const charCount = typeof characters === 'function' ? characters() : 0
  const wordCount = typeof words === 'function' ? words() : 0

  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="flex items-center gap-6 rounded-b-lg border border-t-0 border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        <span>
          <strong className="text-foreground">{wordCount}</strong> palavras
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Type className="h-4 w-4" />
        <span>
          <strong className="text-foreground">{charCount}</strong> caracteres
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>
          <strong className="text-foreground">{readingTime}</strong> min leitura
        </span>
      </div>
    </div>
  )
}
