'use client';

/**
 * Hook para gerenciar biblioteca pessoal de textos
 * Textos, Projetos, Tags, Versões e Exportação
 * Sprint 5
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Library,
  WritingText,
  Project,
  Tag,
  TextVersion,
  TextStatus,
  TextCategory,
  LibraryFilters,
  LibrarySorting,
  LibraryStats,
  generateId,
  extractPlainText,
  calculateReadingTime,
} from '@/lib/types/library';

// Chave para localStorage
const STORAGE_KEY = 'user_library';

// Dados iniciais
function getInitialLibrary(): Library {
  const now = new Date();
  return {
    userId: 'demo_user', // Em produção, virá do Clerk
    texts: [],
    projects: [],
    tags: [],
    totalWords: 0,
    totalTexts: 0,
    createdAt: now,
    updatedAt: now,
  };
}

// Carregar do localStorage
function loadLibrary(): Library {
  if (typeof window === 'undefined') return getInitialLibrary();

  try {
    console.log('📚 Carregando biblioteca do localStorage...');
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('⚠️ Nenhuma biblioteca salva encontrada, usando dados iniciais');
      return getInitialLibrary();
    }

    const parsed = JSON.parse(stored);

    // Converter strings de data de volta para Date objects
    parsed.texts = parsed.texts.map((text: any) => ({
      ...text,
      createdAt: new Date(text.createdAt),
      updatedAt: new Date(text.updatedAt),
      completedAt: text.completedAt ? new Date(text.completedAt) : undefined,
      publishedAt: text.publishedAt ? new Date(text.publishedAt) : undefined,
      versions: text.versions.map((v: any) => ({
        ...v,
        createdAt: new Date(v.createdAt),
      })),
    }));

    parsed.projects = parsed.projects.map((project: any) => ({
      ...project,
      createdAt: new Date(project.createdAt),
      updatedAt: new Date(project.updatedAt),
    }));

    parsed.tags = parsed.tags.map((tag: any) => ({
      ...tag,
      createdAt: new Date(tag.createdAt),
    }));

    parsed.createdAt = new Date(parsed.createdAt);
    parsed.updatedAt = new Date(parsed.updatedAt);

    console.log('✅ Biblioteca carregada:', {
      totalTexts: parsed.totalTexts,
      totalWords: parsed.totalWords,
      projects: parsed.projects.length,
      tags: parsed.tags.length,
    });

    return parsed;
  } catch (error) {
    console.error('❌ Error loading library:', error);
    return getInitialLibrary();
  }
}

// Salvar no localStorage
function saveLibrary(library: Library): void {
  if (typeof window === 'undefined') return;
  try {
    console.log('💾 Salvando biblioteca no localStorage:', {
      totalTexts: library.totalTexts,
      totalWords: library.totalWords,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
    console.log('✅ Biblioteca salva com sucesso!');
  } catch (error) {
    console.error('❌ Error saving library:', error);
  }
}

// ============================================
// Hook Principal
// ============================================

export function useLibrary() {
  // Carregar do localStorage IMEDIATAMENTE no estado inicial
  const [library, setLibrary] = useState<Library>(() => {
    console.log('🔄 useLibrary montado, carregando do storage...');
    return loadLibrary();
  });

  const [filters, setFilters] = useState<LibraryFilters>({
    category: 'all',
    status: 'all',
    projectId: 'all',
  });

  const [sorting, setSorting] = useState<LibrarySorting>({
    field: 'updatedAt',
    order: 'desc',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const isInitialized = useRef(false);

  // Salvar sempre que mudar (mas só DEPOIS da primeira montagem)
  useEffect(() => {
    if (!isInitialized.current) {
      console.log('⏭️ Primeira montagem, marcando como inicializado');
      isInitialized.current = true;
      return;
    }
    console.log('🔄 Biblioteca mudou, salvando...');
    saveLibrary(library);
  }, [library]);

  // ============================================
  // Textos
  // ============================================

  const createText = useCallback(
    (data: {
      title: string;
      content: string;
      category?: TextCategory;
      promptId?: string;
      wordCount: number;
      characterCount: number;
      writingTimeMinutes?: number;
    }) => {
      const now = new Date();
      const plainText = extractPlainText(data.content);
      const readingTime = calculateReadingTime(data.wordCount);

      const versionId = generateId();
      const version: TextVersion = {
        id: versionId,
        content: data.content,
        plainText,
        wordCount: data.wordCount,
        createdAt: now,
        note: 'Versão inicial',
      };

      const newText: WritingText = {
        id: generateId(),
        title: data.title || 'Sem título',
        content: data.content,
        plainText,
        category: data.category,
        promptId: data.promptId,
        tags: [],
        isFavorite: false,
        status: 'draft',
        wordCount: data.wordCount,
        characterCount: data.characterCount,
        readingTimeMinutes: readingTime,
        writingTimeMinutes: data.writingTimeMinutes || 0,
        versions: [version],
        currentVersionId: versionId,
        createdAt: now,
        updatedAt: now,
      };

      setLibrary((prev) => {
        const newTotalWords = prev.totalWords + data.wordCount;
        const newTotalTexts = prev.totalTexts + 1;

        return {
          ...prev,
          texts: [newText, ...prev.texts],
          totalWords: newTotalWords,
          totalTexts: newTotalTexts,
          updatedAt: now,
        };
      });

      console.log('✅ Texto criado:', newText.id, newText.title);
      return newText.id;
    },
    []
  );

  const updateText = useCallback(
    (
      textId: string,
      updates: {
        title?: string;
        content?: string;
        wordCount?: number;
        characterCount?: number;
        category?: TextCategory;
        tags?: string[];
        projectId?: string;
        status?: TextStatus;
        createVersion?: boolean;
        versionNote?: string;
      }
    ) => {
      setLibrary((prev) => {
        const textIndex = prev.texts.findIndex((t) => t.id === textId);
        if (textIndex === -1) {
          console.warn('⚠️ Texto não encontrado:', textId);
          return prev;
        }

        const text = prev.texts[textIndex];
        const now = new Date();

        // Calcular diferença de palavras para atualizar total
        const oldWordCount = text.wordCount;
        const newWordCount = updates.wordCount ?? oldWordCount;
        const wordDiff = newWordCount - oldWordCount;

        let newVersions = text.versions;
        let newCurrentVersionId = text.currentVersionId;

        // Criar nova versão se solicitado
        if (updates.createVersion && updates.content) {
          const plainText = extractPlainText(updates.content);
          const versionId = generateId();
          const newVersion: TextVersion = {
            id: versionId,
            content: updates.content,
            plainText,
            wordCount: newWordCount,
            createdAt: now,
            note: updates.versionNote,
          };
          newVersions = [...text.versions, newVersion];
          newCurrentVersionId = versionId;
        }

        const plainText = updates.content
          ? extractPlainText(updates.content)
          : text.plainText;

        const readingTime = calculateReadingTime(newWordCount);

        const updatedText: WritingText = {
          ...text,
          title: updates.title ?? text.title,
          content: updates.content ?? text.content,
          plainText,
          wordCount: newWordCount,
          characterCount: updates.characterCount ?? text.characterCount,
          readingTimeMinutes: readingTime,
          category: updates.category ?? text.category,
          tags: updates.tags ?? text.tags,
          projectId: updates.projectId ?? text.projectId,
          status: updates.status ?? text.status,
          versions: newVersions,
          currentVersionId: newCurrentVersionId,
          updatedAt: now,
          completedAt:
            updates.status === 'completed' && !text.completedAt ? now : text.completedAt,
          publishedAt:
            updates.status === 'published' && !text.publishedAt ? now : text.publishedAt,
        };

        const newTexts = [...prev.texts];
        newTexts[textIndex] = updatedText;

        return {
          ...prev,
          texts: newTexts,
          totalWords: prev.totalWords + wordDiff,
          updatedAt: now,
        };
      });

      console.log('✅ Texto atualizado:', textId);
    },
    []
  );

  const deleteText = useCallback((textId: string) => {
    setLibrary((prev) => {
      const text = prev.texts.find((t) => t.id === textId);
      if (!text) {
        console.warn('⚠️ Texto não encontrado:', textId);
        return prev;
      }

      return {
        ...prev,
        texts: prev.texts.filter((t) => t.id !== textId),
        totalWords: prev.totalWords - text.wordCount,
        totalTexts: prev.totalTexts - 1,
        updatedAt: new Date(),
      };
    });

    console.log('🗑️ Texto deletado:', textId);
  }, []);

  const toggleFavorite = useCallback((textId: string) => {
    setLibrary((prev) => {
      const textIndex = prev.texts.findIndex((t) => t.id === textId);
      if (textIndex === -1) return prev;

      const newTexts = [...prev.texts];
      newTexts[textIndex] = {
        ...newTexts[textIndex],
        isFavorite: !newTexts[textIndex].isFavorite,
        updatedAt: new Date(),
      };

      return {
        ...prev,
        texts: newTexts,
        updatedAt: new Date(),
      };
    });
  }, []);

  const getTextById = useCallback(
    (textId: string): WritingText | undefined => {
      return library.texts.find((t) => t.id === textId);
    },
    [library.texts]
  );

  // ============================================
  // Versões
  // ============================================

  const restoreVersion = useCallback((textId: string, versionId: string) => {
    setLibrary((prev) => {
      const textIndex = prev.texts.findIndex((t) => t.id === textId);
      if (textIndex === -1) return prev;

      const text = prev.texts[textIndex];
      const version = text.versions.find((v) => v.id === versionId);
      if (!version) return prev;

      const now = new Date();

      // Criar nova versão com o conteúdo restaurado
      const newVersion: TextVersion = {
        id: generateId(),
        content: version.content,
        plainText: version.plainText,
        wordCount: version.wordCount,
        createdAt: now,
        note: `Restaurado da versão de ${version.createdAt.toLocaleString()}`,
      };

      const newTexts = [...prev.texts];
      newTexts[textIndex] = {
        ...text,
        content: version.content,
        plainText: version.plainText,
        wordCount: version.wordCount,
        versions: [...text.versions, newVersion],
        currentVersionId: newVersion.id,
        updatedAt: now,
      };

      return {
        ...prev,
        texts: newTexts,
        updatedAt: now,
      };
    });

    console.log('♻️ Versão restaurada:', textId, versionId);
  }, []);

  // ============================================
  // Projetos
  // ============================================

  const createProject = useCallback(
    (data: { name: string; description?: string; color?: string; icon?: string }) => {
      const now = new Date();
      const newProject: Project = {
        id: generateId(),
        name: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
        createdAt: now,
        updatedAt: now,
      };

      setLibrary((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject],
        updatedAt: now,
      }));

      console.log('✅ Projeto criado:', newProject.id, newProject.name);
      return newProject.id;
    },
    []
  );

  const updateProject = useCallback(
    (
      projectId: string,
      updates: { name?: string; description?: string; color?: string; icon?: string }
    ) => {
      setLibrary((prev) => {
        const projectIndex = prev.projects.findIndex((p) => p.id === projectId);
        if (projectIndex === -1) return prev;

        const project = prev.projects[projectIndex];
        const now = new Date();

        const newProjects = [...prev.projects];
        newProjects[projectIndex] = {
          ...project,
          ...updates,
          updatedAt: now,
        };

        return {
          ...prev,
          projects: newProjects,
          updatedAt: now,
        };
      });

      console.log('✅ Projeto atualizado:', projectId);
    },
    []
  );

  const deleteProject = useCallback((projectId: string) => {
    setLibrary((prev) => {
      // Remover projectId dos textos associados
      const newTexts = prev.texts.map((t) =>
        t.projectId === projectId ? { ...t, projectId: undefined } : t
      );

      return {
        ...prev,
        texts: newTexts,
        projects: prev.projects.filter((p) => p.id !== projectId),
        updatedAt: new Date(),
      };
    });

    console.log('🗑️ Projeto deletado:', projectId);
  }, []);

  // ============================================
  // Tags
  // ============================================

  const createTag = useCallback((data: { name: string; color?: string }) => {
    const now = new Date();
    const newTag: Tag = {
      id: generateId(),
      name: data.name,
      color: data.color,
      createdAt: now,
    };

    setLibrary((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
      updatedAt: now,
    }));

    console.log('✅ Tag criada:', newTag.id, newTag.name);
    return newTag.id;
  }, []);

  const deleteTag = useCallback((tagId: string) => {
    setLibrary((prev) => {
      // Remover tag dos textos associados
      const newTexts = prev.texts.map((t) => ({
        ...t,
        tags: t.tags.filter((tid) => tid !== tagId),
      }));

      return {
        ...prev,
        texts: newTexts,
        tags: prev.tags.filter((t) => t.id !== tagId),
        updatedAt: new Date(),
      };
    });

    console.log('🗑️ Tag deletada:', tagId);
  }, []);

  // ============================================
  // Filtros e Busca
  // ============================================

  const filteredTexts = useMemo(() => {
    let result = [...library.texts];

    // Filtro de pesquisa (full-text)
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (text) =>
          text.title.toLowerCase().includes(searchLower) ||
          text.plainText.toLowerCase().includes(searchLower)
      );
    }

    // Filtro de categoria
    if (filters.category && filters.category !== 'all') {
      result = result.filter((text) => text.category === filters.category);
    }

    // Filtro de status
    if (filters.status && filters.status !== 'all') {
      result = result.filter((text) => text.status === filters.status);
    }

    // Filtro de projeto
    if (filters.projectId && filters.projectId !== 'all') {
      result = result.filter((text) => text.projectId === filters.projectId);
    }

    // Filtro de tags
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter((text) =>
        filters.tags!.some((tagId) => text.tags.includes(tagId))
      );
    }

    // Filtro de favoritos
    if (filters.isFavorite !== undefined) {
      result = result.filter((text) => text.isFavorite === filters.isFavorite);
    }

    // Ordenação
    result.sort((a, b) => {
      const field = sorting.field;
      let aValue: any = a[field];
      let bValue: any = b[field];

      // Converter datas para timestamp
      if (aValue instanceof Date) aValue = aValue.getTime();
      if (bValue instanceof Date) bValue = bValue.getTime();

      // Strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sorting.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [library.texts, filters, sorting]);

  // ============================================
  // Estatísticas
  // ============================================

  const stats = useMemo((): LibraryStats => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const textsByCategory: Record<TextCategory, number> = {
      fiction: 0,
      poetry: 0,
      'non-fiction': 0,
      exercise: 0,
    };

    const wordsByCategory: Record<TextCategory, number> = {
      fiction: 0,
      poetry: 0,
      'non-fiction': 0,
      exercise: 0,
    };

    const textsByStatus: Record<TextStatus, number> = {
      draft: 0,
      completed: 0,
      published: 0,
      archived: 0,
    };

    const textsByProject: Record<string, number> = {};

    let totalCharacters = 0;
    let totalWritingTime = 0;
    let favoriteTexts = 0;
    let textsThisWeek = 0;
    let textsThisMonth = 0;
    let wordsThisWeek = 0;
    let wordsThisMonth = 0;

    library.texts.forEach((text) => {
      // Por categoria
      if (text.category) {
        textsByCategory[text.category]++;
        wordsByCategory[text.category] += text.wordCount;
      }

      // Por status
      textsByStatus[text.status]++;

      // Por projeto
      if (text.projectId) {
        textsByProject[text.projectId] = (textsByProject[text.projectId] || 0) + 1;
      }

      // Estatísticas gerais
      totalCharacters += text.characterCount;
      totalWritingTime += text.writingTimeMinutes;
      if (text.isFavorite) favoriteTexts++;

      // Temporais
      if (text.createdAt >= weekAgo) {
        textsThisWeek++;
        wordsThisWeek += text.wordCount;
      }
      if (text.createdAt >= monthAgo) {
        textsThisMonth++;
        wordsThisMonth += text.wordCount;
      }
    });

    const averageWordCount =
      library.totalTexts > 0 ? Math.round(library.totalWords / library.totalTexts) : 0;
    const averageWritingTime =
      library.totalTexts > 0 ? Math.round(totalWritingTime / library.totalTexts) : 0;

    return {
      totalTexts: library.totalTexts,
      totalWords: library.totalWords,
      totalCharacters,
      totalWritingTime,
      textsByCategory,
      wordsByCategory,
      textsByStatus,
      textsByProject,
      favoriteTexts,
      averageWordCount,
      averageWritingTime,
      textsThisWeek,
      textsThisMonth,
      wordsThisWeek,
      wordsThisMonth,
    };
  }, [library]);

  // ============================================
  // Utilidades
  // ============================================

  const resetLibrary = useCallback(() => {
    const initial = getInitialLibrary();
    setLibrary(initial);
    saveLibrary(initial);
  }, []);

  return {
    // Estado
    library,
    filters,
    sorting,
    viewMode,
    filteredTexts,
    stats,

    // Textos
    createText,
    updateText,
    deleteText,
    toggleFavorite,
    getTextById,

    // Versões
    restoreVersion,

    // Projetos
    createProject,
    updateProject,
    deleteProject,

    // Tags
    createTag,
    deleteTag,

    // Filtros e Ordenação
    setFilters,
    setSorting,
    setViewMode,

    // Utilidades
    resetLibrary,
  };
}
