'use client';

import { useState, useEffect } from 'react';
import { useLibrary } from '@/lib/hooks/useLibrary';
import { TextCard } from '@/components/library';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Library,
  Search,
  Filter,
  Grid3x3,
  List,
  Plus,
  FileText,
  AlignLeft,
  Star,
  FolderOpen,
  SortAsc,
  SortDesc,
  ArrowUpDown,
} from 'lucide-react';
import Link from 'next/link';
import type { TextCategory, TextStatus, SortField } from '@/lib/types/library';

export default function BibliotecaPage() {
  const {
    library,
    filteredTexts,
    stats,
    filters,
    setFilters,
    sorting,
    setSorting,
    viewMode,
    setViewMode,
    toggleFavorite,
    deleteText,
  } = useLibrary();

  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch - só renderiza após montar no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler para pesquisa
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters({ ...filters, search: query });
  };

  // Handler para filtro de categoria
  const handleCategoryFilter = (category: TextCategory | 'all') => {
    setFilters({ ...filters, category });
  };

  // Handler para filtro de status
  const handleStatusFilter = (status: TextStatus | 'all') => {
    setFilters({ ...filters, status });
  };

  // Handler para filtro de favoritos
  const handleFavoritesFilter = () => {
    setFilters({ ...filters, isFavorite: !filters.isFavorite });
  };

  // Handler para ordenação
  const handleSort = (field: SortField) => {
    if (sorting.field === field) {
      // Toggle order
      setSorting({ field, order: sorting.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSorting({ field, order: 'desc' });
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Library className="h-8 w-8" />
            Biblioteca Pessoal
          </h1>
          <p className="text-muted-foreground mt-1">
            Seus textos e histórias organizados
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/escrever">
            <Plus className="mr-2 h-4 w-4" />
            Novo Texto
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Textos</p>
                <p className="text-2xl font-bold">{mounted ? stats.totalTexts : '...'}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Palavras</p>
                <p className="text-2xl font-bold">{mounted ? stats.totalWords.toLocaleString() : '...'}</p>
              </div>
              <AlignLeft className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Favoritos</p>
                <p className="text-2xl font-bold">{mounted ? stats.favoriteTexts : '...'}</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projetos</p>
                <p className="text-2xl font-bold">{mounted ? library.projects.length : '...'}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar textos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Filter */}
              <div className="flex gap-1">
                <Button
                  variant={filters.category === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('all')}
                >
                  Todas
                </Button>
                <Button
                  variant={filters.category === 'fiction' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('fiction')}
                >
                  Ficção
                </Button>
                <Button
                  variant={filters.category === 'poetry' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('poetry')}
                >
                  Poesia
                </Button>
                <Button
                  variant={filters.category === 'non-fiction' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('non-fiction')}
                >
                  Não-ficção
                </Button>
              </div>

              {/* Favorites Filter */}
              <Button
                variant={filters.isFavorite ? 'default' : 'outline'}
                size="sm"
                onClick={handleFavoritesFilter}
              >
                <Star className={`h-4 w-4 mr-1 ${filters.isFavorite ? 'fill-current' : ''}`} />
                Favoritos
              </Button>

              {/* View Mode Toggle */}
              <div className="flex gap-1 border-l pl-2 ml-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort */}
              <div className="flex gap-1 border-l pl-2 ml-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort('updatedAt')}
                >
                  Data {sorting.field === 'updatedAt' && (sorting.order === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort('title')}
                >
                  Título {sorting.field === 'title' && (sorting.order === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort('wordCount')}
                >
                  Palavras {sorting.field === 'wordCount' && (sorting.order === 'asc' ? '↑' : '↓')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      {mounted && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            {filteredTexts.length} {filteredTexts.length === 1 ? 'texto' : 'textos'}
            {filters.search && ` encontrado${filteredTexts.length === 1 ? '' : 's'} para "${filters.search}"`}
          </p>
        </div>
      )}

      {/* Texts Grid/List */}
      {!mounted ? (
        <div className="text-center py-12 text-muted-foreground">
          Carregando...
        </div>
      ) : filteredTexts.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Nenhum texto encontrado</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {filters.search || filters.category !== 'all' || filters.isFavorite
                ? 'Tente ajustar os filtros ou faça uma nova pesquisa.'
                : 'Comece a escrever sua primeira história!'}
            </p>
            {!filters.search && filters.category === 'all' && !filters.isFavorite && (
              <Button asChild>
                <Link href="/dashboard/escrever">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Texto
                </Link>
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
              : 'space-y-3'
          }
        >
          {filteredTexts.map((text) => (
            <TextCard
              key={text.id}
              text={text}
              onToggleFavorite={toggleFavorite}
              onDelete={deleteText}
              view={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
