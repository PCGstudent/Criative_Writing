"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import Typography from "@tiptap/extension-typography"
import { EditorToolbar } from "./editor-toolbar"
import { EditorStats } from "./editor-stats"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface EditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  showStats?: boolean
  focusMode?: boolean
  onWordCountChange?: (count: number) => void
}

export function Editor({
  content = "",
  onChange,
  placeholder = "Comece a escrever sua história...",
  className,
  showStats = true,
  focusMode = false,
  onWordCountChange,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
      Typography,
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl",
          "dark:prose-invert",
          "max-w-none",
          "focus:outline-none",
          "min-h-[300px] p-4",
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)

      // Calculate word count
      const text = editor.getText()
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
      onWordCountChange?.(words)
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      {!focusMode && <EditorToolbar editor={editor} />}

      <div className={cn(
        "flex-1 overflow-y-auto rounded-lg border border-border bg-background",
        focusMode && "border-none"
      )}>
        <EditorContent editor={editor} />
      </div>

      {showStats && !focusMode && <EditorStats editor={editor} />}
    </div>
  )
}
