'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLibrary } from '@/lib/hooks/useLibrary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Edit,
  Star,
  Calendar,
  AlignLeft,
  Clock,
  FileText,
  History,
  Download,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { getCategoryLabel, getStatusLabel, formatDate } from '@/lib/types/library';

export default function TextDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getTextById, toggleFavorite, deleteText } = useLibrary();
  const [mounted, setMounted] = useState(false);

  const textId = params?.id as string;
  const text = getTextById(textId);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!text) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/biblioteca">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Biblioteca
          </Link>
        </Button>

        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Texto não encontrado</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              O texto que você está procurando não existe ou foi deletado.
            </p>
            <Button asChild>
              <Link href="/dashboard/biblioteca">
                Voltar para Biblioteca
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar este texto? Esta ação não pode ser desfeita.')) {
      deleteText(textId);
      router.push('/dashboard/biblioteca');
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Button variant="ghost" size="sm" className="mb-2" asChild>
            <Link href="/dashboard/biblioteca">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Biblioteca
            </Link>
          </Button>

          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold break-words">{text.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {text.category && (
                  <Badge variant="outline">
                    {getCategoryLabel(text.category)}
                  </Badge>
                )}
                <Badge>
                  {getStatusLabel(text.status)}
                </Badge>
                {text.isFavorite && (
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    Favorito
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleFavorite(textId)}
          >
            <Star className={text.isFavorite ? 'h-5 w-5 fill-yellow-500 text-yellow-500' : 'h-5 w-5'} />
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/escrever?text=${textId}`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Deletar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <AlignLeft className="h-4 w-4" />
              <span>Palavras</span>
            </div>
            <p className="text-2xl font-bold">{text.wordCount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span>Caracteres</span>
            </div>
            <p className="text-2xl font-bold">{text.characterCount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span>Leitura</span>
            </div>
            <p className="text-2xl font-bold">{text.readingTimeMinutes} min</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <History className="h-4 w-4" />
              <span>Versões</span>
            </div>
            <p className="text-2xl font-bold">{text.versions.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Criado:</span>
            <span>{formatDate(text.createdAt)} ({text.createdAt.toLocaleDateString()})</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Última atualização:</span>
            <span>{formatDate(text.updatedAt)} ({text.updatedAt.toLocaleDateString()})</span>
          </div>
          {text.completedAt && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Completado:</span>
              <span>{formatDate(text.completedAt)} ({text.completedAt.toLocaleDateString()})</span>
            </div>
          )}
          {text.writingTimeMinutes > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Tempo de escrita:</span>
              <span>{text.writingTimeMinutes} minutos</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
          <CardDescription>Visualização do texto</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: text.content }}
          />
        </CardContent>
      </Card>

      {/* Versions (if more than 1) */}
      {text.versions.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Histórico de Versões ({text.versions.length})
            </CardTitle>
            <CardDescription>
              Versões salvas deste texto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {text.versions.slice().reverse().map((version, index) => (
                <div
                  key={version.id}
                  className={`p-4 rounded-lg border ${
                    version.id === text.currentVersionId
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">
                          Versão {text.versions.length - index}
                        </p>
                        {version.id === text.currentVersionId && (
                          <Badge variant="default" className="text-xs">Atual</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {version.note || 'Sem nota'}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{formatDate(version.createdAt)}</span>
                        <span>•</span>
                        <span>{version.wordCount.toLocaleString()} palavras</span>
                      </div>
                    </div>
                    {version.id !== text.currentVersionId && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Restaurar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Exportar DOCX
          </Button>
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Exportar TXT
          </Button>
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Exportar Markdown
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
