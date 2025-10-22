'use client';

/**
 * Text Card Component
 * Card para preview de texto na biblioteca
 * Sprint 5
 */

import { WritingText, getCategoryLabel, getStatusLabel, getStatusColor, formatDate } from '@/lib/types/library';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Calendar,
  AlignLeft,
  Star,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import Link from 'next/link';

interface TextCardProps {
  text: WritingText;
  onToggleFavorite?: (id: string) => void;
  onDelete?: (id: string) => void;
  view?: 'grid' | 'list';
}

export function TextCard({ text, onToggleFavorite, onDelete, view = 'grid' }: TextCardProps) {
  // Extrair excerto do plainText (primeiras 150 chars)
  const excerpt = text.plainText.substring(0, 150).trim() + (text.plainText.length > 150 ? '...' : '');

  // Cores de badge baseado no status
  const statusVariant = (() => {
    switch (text.status) {
      case 'completed':
        return 'default';
      case 'published':
        return 'default';
      case 'archived':
        return 'secondary';
      default:
        return 'outline';
    }
  })();

  if (view === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Title and metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <h3 className="font-semibold truncate">{text.title}</h3>
                {text.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{excerpt}</p>
            </div>

            {/* Middle: Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <AlignLeft className="h-4 w-4" />
                <span>{text.wordCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(text.updatedAt)}</span>
              </div>
            </div>

            {/* Right: Badges and actions */}
            <div className="flex items-center gap-2">
              {text.category && (
                <Badge variant="outline" className="whitespace-nowrap">
                  {getCategoryLabel(text.category)}
                </Badge>
              )}
              <Badge variant={statusVariant} className="whitespace-nowrap">
                {getStatusLabel(text.status)}
              </Badge>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/biblioteca/${text.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite?.(text.id)}
                >
                  <Star className={text.isFavorite ? 'h-4 w-4 fill-yellow-500 text-yellow-500' : 'h-4 w-4'} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="hover:shadow-lg transition-shadow group h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-2">{text.title}</CardTitle>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => onToggleFavorite?.(text.id)}
          >
            <Star className={text.isFavorite ? 'h-5 w-5 fill-yellow-500 text-yellow-500' : 'h-5 w-5'} />
          </Button>
        </div>
        <CardDescription className="line-clamp-3 mt-2">
          {excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        {/* Metadata */}
        <div className="space-y-3">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <AlignLeft className="h-4 w-4" />
              <span>{text.wordCount.toLocaleString()} palavras</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(text.updatedAt)}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {text.category && (
              <Badge variant="outline">
                {getCategoryLabel(text.category)}
              </Badge>
            )}
            <Badge variant={statusVariant}>
              {getStatusLabel(text.status)}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/biblioteca/${text.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Ver
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/escrever?text=${text.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
