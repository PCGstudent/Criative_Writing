/**
 * Sistema de Biblioteca Pessoal
 * Sprint 5 - Tipos e Interfaces
 */

// ============================================
// Textos
// ============================================

export type TextStatus = 'draft' | 'completed' | 'published' | 'archived';
export type TextCategory = 'fiction' | 'poetry' | 'non-fiction' | 'exercise';

export interface TextVersion {
  id: string;
  content: string; // HTML do Tiptap
  plainText: string; // Texto puro para pesquisa
  wordCount: number;
  createdAt: Date;
  note?: string; // Nota opcional sobre a versão
}

export interface WritingText {
  id: string;
  title: string;
  content: string; // HTML do Tiptap (versão atual)
  plainText: string; // Texto puro para pesquisa

  // Metadados
  category?: TextCategory;
  promptId?: string; // ID do prompt usado (se houver)
  tags: string[];

  // Organização
  projectId?: string;
  isFavorite: boolean;

  // Status
  status: TextStatus;

  // Estatísticas
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
  writingTimeMinutes: number; // Tempo gasto escrevendo

  // Versionamento
  versions: TextVersion[];
  currentVersionId: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  publishedAt?: Date;
}

// ============================================
// Projetos/Pastas
// ============================================

export interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string; // Hex color para identificação visual
  icon?: string; // Nome do ícone Lucide

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Tags
// ============================================

export interface Tag {
  id: string;
  name: string;
  color?: string;

  // Timestamps
  createdAt: Date;
}

// ============================================
// Biblioteca (Coleção)
// ============================================

export interface Library {
  userId: string;

  // Dados principais
  texts: WritingText[];
  projects: Project[];
  tags: Tag[];

  // Metadados
  totalWords: number; // Cache do total de palavras
  totalTexts: number; // Cache do total de textos

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Filtros e Ordenação
// ============================================

export type SortField = 'updatedAt' | 'createdAt' | 'title' | 'wordCount';
export type SortOrder = 'asc' | 'desc';

export interface LibraryFilters {
  search?: string;
  category?: TextCategory | 'all';
  status?: TextStatus | 'all';
  projectId?: string | 'all';
  tags?: string[]; // IDs de tags
  isFavorite?: boolean;
}

export interface LibrarySorting {
  field: SortField;
  order: SortOrder;
}

// ============================================
// Exportação
// ============================================

export type ExportFormat = 'pdf' | 'docx' | 'txt' | 'md' | 'epub';

export interface ExportOptions {
  format: ExportFormat;

  // Opções de formatação
  includeTitle?: boolean;
  includeMetadata?: boolean;
  includeStats?: boolean;

  // Opções de conteúdo
  fontSize?: number;
  fontFamily?: string;
  pageSize?: 'A4' | 'Letter';

  // Para EPUB
  author?: string;
  coverImage?: string;
}

// ============================================
// Estatísticas da Biblioteca
// ============================================

export interface LibraryStats {
  // Totais
  totalTexts: number;
  totalWords: number;
  totalCharacters: number;
  totalWritingTime: number; // em minutos

  // Por categoria
  textsByCategory: Record<TextCategory, number>;
  wordsByCategory: Record<TextCategory, number>;

  // Por status
  textsByStatus: Record<TextStatus, number>;

  // Por projeto
  textsByProject: Record<string, number>; // projectId -> count

  // Favoritos
  favoriteTexts: number;

  // Médias
  averageWordCount: number;
  averageWritingTime: number;

  // Temporais
  textsThisWeek: number;
  textsThisMonth: number;
  wordsThisWeek: number;
  wordsThisMonth: number;
}

// ============================================
// Utilitários
// ============================================

/**
 * Calcula tempo de leitura estimado (baseado em 200 palavras/minuto)
 */
export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

/**
 * Extrai texto puro do HTML do Tiptap
 */
export function extractPlainText(html: string): string {
  // Remove tags HTML
  const text = html.replace(/<[^>]*>/g, '');
  // Decodifica entidades HTML
  const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null;
  if (textarea) {
    textarea.innerHTML = text;
    return textarea.value;
  }
  return text;
}

/**
 * Gera ID único para textos, versões, etc
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Formata data para exibição
 */
export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  if (days < 7) return `${days} dias atrás`;
  if (days < 30) return `${Math.floor(days / 7)} semanas atrás`;
  if (days < 365) return `${Math.floor(days / 30)} meses atrás`;
  return `${Math.floor(days / 365)} anos atrás`;
}

/**
 * Obtém label de categoria em português
 */
export function getCategoryLabel(category: TextCategory): string {
  const labels: Record<TextCategory, string> = {
    fiction: 'Ficção',
    poetry: 'Poesia',
    'non-fiction': 'Não-ficção',
    exercise: 'Exercício',
  };
  return labels[category] || category;
}

/**
 * Obtém label de status em português
 */
export function getStatusLabel(status: TextStatus): string {
  const labels: Record<TextStatus, string> = {
    draft: 'Rascunho',
    completed: 'Completo',
    published: 'Publicado',
    archived: 'Arquivado',
  };
  return labels[status] || status;
}

/**
 * Obtém cor do status
 */
export function getStatusColor(status: TextStatus): string {
  const colors: Record<TextStatus, string> = {
    draft: 'gray',
    completed: 'green',
    published: 'blue',
    archived: 'orange',
  };
  return colors[status] || 'gray';
}
