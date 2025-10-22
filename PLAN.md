# Plano de Desenvolvimento - Plataforma de Escrita Criativa

**Data de Criação**: 21 de Outubro de 2025
**Última Atualização**: 21 de Outubro de 2025 - Sprint 4 Completo!
**Projeto**: Aplicação Web de Escrita Criativa
**Objetivo**: Criar uma plataforma elegante e intuitiva para prática, aprendizagem e evolução em escrita criativa

---

## 📊 Progresso Geral

**Sprint Atual**: Sprint 4 ✅ **COMPLETO**
**Próximo Sprint**: Sprint 5 - Biblioteca Pessoal

### Status por Sprint
- ✅ **Sprint 1** - Setup + Landing Page + Design System (COMPLETO)
- ✅ **Sprint 2** - Autenticação + Dashboard (COMPLETO)
- ✅ **Sprint 3** - Editor de Escrita + Prompts (COMPLETO)
- ✅ **Sprint 4** - Sistema de Progresso e Gamificação (COMPLETO)
- ⏳ **Sprint 5** - Biblioteca Pessoal (PRÓXIMO)
- ⬜ **Sprint 6** - Competições e Desafios
- ⬜ **Sprint 7** - Comunidade e Partilha
- ⬜ **Sprint 8** - Analytics, Polimento e Otimização

### Progresso: 50% (4/8 sprints)

---

## 🎉 Sprint 1 - Completado em 21/10/2025

**Entregues:**
- ✅ Projeto Next.js 15 + TypeScript + Tailwind CSS v4
- ✅ Design System completo (cores, tipografia, componentes)
- ✅ Landing Page elegante com animações (Framer Motion)
- ✅ Dark Mode funcional com toggle
- ✅ Componentes base (Button, Card)
- ✅ Servidor de desenvolvimento rodando em http://localhost:3001

**Stack Implementada:**
- Next.js 15.5.6 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- next-themes
- Lucide React

---

## Stack Tecnológica

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Componentes UI**: shadcn/ui (componentes elegantes, acessíveis e customizáveis)
- **Animações**: Framer Motion
- **Ícones**: Lucide React

### Editor
- **Editor de Texto**: Tiptap (editor de texto rico baseado em ProseMirror)
- **Formatação**: Markdown support + Rich text

### State Management & Data
- **State**: Zustand (leve e performático)
- **Forms**: React Hook Form + Zod (validação)
- **Data Fetching**: TanStack Query (React Query)

### Backend & Database
- **Backend**: Next.js API Routes (Server Actions)
- **Database**: Supabase (PostgreSQL + Real-time)
- **ORM**: Prisma ou Drizzle
- **Storage**: Supabase Storage (para exports e media)

### Autenticação
- **Auth Provider**: Clerk (autenticação moderna e segura)
- **Social Login**: Google, GitHub

### Deploy & Infraestrutura
- **Hosting**: Vercel (otimizado para Next.js)
- **Analytics**: Vercel Analytics + Posthog
- **Monitoring**: Sentry (error tracking)

---

## Estrutura de Sprints

### 📋 Sprint 1: Setup + Landing Page + Design System ✅ COMPLETO

**Objetivo**: Ter algo visual e elegante para validação imediata

#### Tarefas Técnicas
- [x] Inicializar projeto Next.js 14 com TypeScript
- [x] Configurar Tailwind CSS
- [x] Instalar e configurar shadcn/ui (componentes base criados)
- [x] Setup Framer Motion
- [x] Configurar estrutura de pastas (app, components, lib, etc)

#### Design System
- [x] Definir paleta de cores:
  - Primária: Indigo (inspirador)
  - Secundária: Amber (highlights)
  - Accent: Teal (criativo)
  - Semânticas (success, error, warning, info)
- [x] Tipografia:
  - Headings: Geist Sans
  - Body: Geist Sans
  - Monospace: Geist Mono
- [x] Espaçamentos e breakpoints responsivos
- [x] Componentes base:
  - Button (6 variants: default, secondary, accent, outline, ghost, link)
  - Card (com Header, Title, Description, Content, Footer)
  - Theme Toggle

#### Landing Page
- [x] Hero Section:
  - Título impactante com gradiente animado
  - Subtítulo explicativo
  - CTAs principais ("Começar a Escrever" + "Saiba Mais")
  - Animações de entrada (Framer Motion)
  - Stats cards (10K+ escritores, 50K+ textos, etc)
- [x] Secção de Features:
  - 6 features com ícones e descrições
  - Layout em grid responsivo (3 colunas)
  - Animações ao scroll e hover effects
- [x] Secção "Como Funciona":
  - 3 passos com ícones e numeração
  - Visual timeline
- [x] CTA Section com gradiente
- [x] Footer:
  - 4 colunas (Produto, Comunidade, Suporte, Sobre)
  - Links organizados
  - Copyright

#### Extra
- [x] Dark mode com toggle (next-themes)
- [x] Animações suaves e elegantes (Framer Motion)
- [x] Totalmente responsivo (mobile-first)
- [x] Background gradientes radiais
- [x] Smooth scrolling

**Entrega**: ✅ Landing page funcional e elegante, rodando em http://localhost:3001

---

### 🔐 Sprint 2: Autenticação + Dashboard ✅ COMPLETO

**Completado em**: 21 de Outubro de 2025

#### Autenticação
- [x] Integrar Clerk
- [x] Páginas de login/signup
- [x] Social login (Google, GitHub)
- [x] Proteção de rotas
- [x] Middleware de autenticação

#### Dashboard Principal
- [x] Layout principal:
  - Sidebar responsiva (desktop) / Bottom nav (mobile)
  - Header com perfil e notificações
  - Área de conteúdo principal
- [x] Navegação:
  - Home/Dashboard
  - Nova Escrita
  - Biblioteca
  - Progresso
  - Comunidade
  - Perfil
- [x] Dashboard Home:
  - Widgets de estatísticas rápidas
  - Prompt do dia
  - Atividade recente
  - Streak atual

#### Perfil do Utilizador
- [x] Página de perfil básico
- [x] Edição de informações (preparado)
- [x] Upload de avatar (via Clerk)
- [x] Preferências básicas

#### Onboarding
- [x] Fluxo de boas-vindas (primeiro acesso)
- [x] Seleção de interesses
- [x] Tutorial rápido da plataforma

**Entrega**: ✅ Sistema completo de autenticação e dashboard navegável com onboarding

---

### ✍️ Sprint 3: Editor de Escrita + Prompts ✅ COMPLETO

**Completado em**: 21 de Outubro de 2025

#### Editor de Texto
- [x] Integrar Tiptap
- [x] Toolbar de formatação:
  - Bold, Italic, Strikethrough
  - Headings (H1, H2, H3)
  - Lists (ordered, unordered)
  - Blockquote
  - Code inline
  - Undo/Redo
  - Clear formatting
- [x] Features do editor:
  - Contador de palavras (tempo real)
  - Contador de caracteres
  - Tempo de leitura estimado
  - Timer com play/pause/reset
  - Modo foco fullscreen
  - Auto-save (a cada 30 segundos)
- [x] Atalhos de teclado (Ctrl+B, Ctrl+I, etc)
- [x] Placeholder customizável
- [x] Estilos prose para editor

#### Sistema de Prompts
- [x] Base de dados de prompts (19 prompts)
- [x] Categorias:
  - Ficção
  - Poesia
  - Não-ficção
  - Exercícios
- [x] Níveis de dificuldade:
  - Iniciante (50 XP)
  - Intermediário (100 XP)
  - Avançado (200 XP)
- [x] Prompt do dia (renovado diariamente via seed)
- [x] Sistema de filtros por categoria e nível
- [x] Visualização de prompt com detalhes completos
- [x] Badges de categoria e nível
- [x] Tags e tempo estimado

#### Página "Nova Escrita"
- [x] Seleção de prompt via query params
- [x] Interface completa do editor
- [x] Controles de escrita (timer, modo foco, save)
- [x] Display do prompt selecionado
- [x] Auto-save funcional
- [x] Modo foco fullscreen

#### Biblioteca de Prompts
- [x] Página dedicada (/dashboard/prompts)
- [x] Grid responsivo de prompts
- [x] Filtros interativos
- [x] Contagem de resultados
- [x] Link direto para escrever

**Entrega**: ✅ Editor completo com Tiptap, 19 prompts organizados, sistema de filtros e página de escrita funcional

---

### 📈 Sprint 4: Sistema de Progresso e Gamificação ✅ COMPLETO

**Completado em**: 21 de Outubro de 2025

#### Sistema de XP e Níveis
- [x] Modelo de dados para XP/níveis
- [x] Regras de atribuição de XP:
  - Por palavras escritas (10 XP / 100 palavras)
  - Por conclusão de prompt (50-200 XP conforme dificuldade)
  - Por streak (bonus diário 20-55 XP)
  - Por milestone (badges 100-3000 XP)
- [x] Cálculo de níveis (progressivo - fórmula 100 * level^1.5)
- [x] Barra de progresso visual

#### Badges e Conquistas
- [x] Sistema de badges (24 badges total):
  - Milestone: Primeira Escrita, 1k-100k palavras, 10-100 textos
  - Streak: 3, 7, 30, 100 dias consecutivos
  - Explorador: Todas as 4 categorias
  - Dedicação: 10-100 prompts completados
  - Comunidade: 10-100 feedbacks dados
  - Especial: Pioneiro (early adopter)
- [x] Notificações de conquista (animadas com Framer Motion)
- [x] Galeria de badges no perfil e página de progresso

#### Streak System
- [x] Contador de dias consecutivos
- [x] Lógica de manutenção de streak
- [x] Avisos quando streak está em risco
- [x] Streak freeze (2 disponíveis por mês)
- [x] Tracking de recorde pessoal

#### Dashboard de Progresso
- [x] Página dedicada ao progresso (/dashboard/progresso)
- [x] Visualizações:
  - Distribuição por categoria (barras de progresso)
  - Estatísticas detalhadas (média por sessão/dia)
  - Cards de nível e streak
- [x] Estatísticas resumidas (4 cards principais)
- [x] Lista de atividade recente (XP gains)
- [x] Filtros de badges por categoria

**Entrega**: ✅ Sistema completo de gamificação motivador e visualmente apelativo

---

### 📚 Sprint 5: Biblioteca Pessoal (1 semana)

#### Listagem de Textos
- [ ] Página "Biblioteca"
- [ ] Grid/List view de todos os textos
- [ ] Card de preview:
  - Título
  - Excerto
  - Categoria
  - Data
  - Contagem de palavras
  - Status (rascunho/publicado)

#### Organização
- [ ] Sistema de projetos/pastas
- [ ] Tags customizáveis
- [ ] Favoritos (star)
- [ ] Arquivos
- [ ] Ordenação (data, título, palavras)
- [ ] Pesquisa full-text

#### Histórico de Versões
- [ ] Auto-save cria versões
- [ ] Visualização de histórico
- [ ] Comparação entre versões
- [ ] Restaurar versão anterior

#### Exportação
- [ ] Export para PDF (formatado)
- [ ] Export para DOCX
- [ ] Export para TXT/Markdown
- [ ] Export para EPUB (avançado)
- [ ] Configurações de exportação

**Entrega**: Biblioteca completa e organizada com exports funcionais

---

### 🏆 Sprint 6: Competições e Desafios (1-2 semanas)

#### Desafios
- [ ] Tipos de desafios:
  - Desafio Diário (prompt específico)
  - Desafio Semanal (tema aberto)
  - Desafio Mensal (grande competição)
  - Sprint de Palavras (quem escreve mais em X min)
- [ ] Sistema de submissão
- [ ] Validação automática (tempo, palavras)
- [ ] Prémios e reconhecimentos

#### Leaderboards
- [ ] Leaderboard global
- [ ] Leaderboards por categoria
- [ ] Leaderboard semanal/mensal
- [ ] Filtros e períodos
- [ ] Top 10/100 destacados
- [ ] Posição do utilizador

#### Sistema de Pontos
- [ ] Pontuação competitiva (separada de XP)
- [ ] Reset mensal/semanal
- [ ] Multiplicadores e bónus
- [ ] Histórico de pontuações

#### Página de Rankings
- [ ] Visualização de leaderboards
- [ ] Perfis de top writers
- [ ] Estatísticas comparativas

**Entrega**: Sistema de competição ativo e motivador

---

### 👥 Sprint 7: Comunidade e Partilha (1-2 semanas)

#### Partilha de Textos
- [ ] Toggle público/privado em textos
- [ ] Feed público de textos
- [ ] Filtros no feed (categoria, popularidade)
- [ ] Preview e leitura completa

#### Sistema de Feedback
- [ ] Comentários em textos:
  - Comentário geral
  - Highlight de trechos específicos
  - Reply a comentários
- [ ] Reações:
  - Like/Heart
  - Reações específicas (inspirador, criativo, profundo)
- [ ] Sistema de moderação básico

#### Perfis Públicos
- [ ] Página de perfil público
- [ ] Textos publicados
- [ ] Badges e conquistas
- [ ] Estatísticas públicas
- [ ] Bio e redes sociais

#### Networking
- [ ] Seguir outros escritores
- [ ] Feed personalizado
- [ ] Notificações de atividade
- [ ] Descoberta de novos escritores

**Entrega**: Comunidade ativa com possibilidade de partilha e feedback

---

### 🔧 Sprint 8: Analytics, Polimento e Otimização (1 semana)

#### Analytics Avançado
- [ ] Dashboard de estatísticas:
  - Palavras por dia/semana/mês
  - Tempo total de escrita
  - Média de palavras por sessão
  - Géneros mais escritos
  - Horário mais produtivo
  - Evolução temporal (gráficos)
- [ ] Insights personalizados
- [ ] Comparação com médias da plataforma

#### Performance
- [ ] Otimização de imagens (Next.js Image)
- [ ] Code splitting
- [ ] Lazy loading de componentes
- [ ] Caching estratégico
- [ ] Lighthouse score > 90

#### UX/UI
- [ ] Testes de usabilidade
- [ ] Ajustes de acessibilidade (WCAG)
- [ ] Micro-interações
- [ ] Loading states elegantes
- [ ] Error states informativos
- [ ] Empty states motivadores

#### SEO & Meta
- [ ] Meta tags otimizados
- [ ] Open Graph
- [ ] Twitter Cards
- [ ] Sitemap
- [ ] robots.txt

#### Testes
- [ ] Testes E2E (Playwright)
- [ ] Testes de componentes
- [ ] Testes de integração
- [ ] Bug fixes finais

**Entrega**: Aplicação polida, performática e pronta para produção

---

## Funcionalidades Principais (Resumo)

### 🎯 Prática
- Editor de texto rico e intuitivo
- Prompts diários personalizados por nível
- Exercícios guiados por categoria
- Timers e sprints de escrita
- Modo foco sem distrações

### 📚 Aprendizagem
- Prompts categorizados por dificuldade
- Recursos e dicas de escrita criativa
- Feedback da comunidade
- Análise de evolução temporal

### 📈 Evolução
- Sistema de níveis e XP gamificado
- Tracking detalhado de progresso
- Estatísticas e analytics completos
- Histórico de versões dos textos

### 💾 Arquivo
- Biblioteca pessoal organizada
- Projetos e tags customizáveis
- Versionamento automático
- Exportação em múltiplos formatos (PDF, DOCX, TXT, EPUB)

### 🏆 Competição
- Desafios diários, semanais e mensais
- Leaderboards globais e por categoria
- Sistema de pontos e rankings
- Badges e conquistas

### 👥 Comunidade
- Partilha opcional de textos
- Sistema de comentários e highlights
- Reações e feedback construtivo
- Seguir e descobrir outros escritores
- Perfis públicos customizáveis

---

## Métricas de Sucesso

### Engagement
- Taxa de retenção D1, D7, D30
- Tempo médio na plataforma
- Número de textos escritos por utilizador
- Taxa de conclusão de prompts

### Crescimento
- Novos registos semanais
- Utilizadores ativos (DAU/MAU)
- Taxa de conversão (visitante → registo)

### Qualidade
- Lighthouse score > 90
- Core Web Vitals no verde
- Taxa de erro < 1%
- Tempo de resposta API < 200ms

### Comunidade
- Textos partilhados vs privados
- Comentários por texto
- Taxa de interação
- Network effect (follows, shares)

---

## Considerações Técnicas

### Performance
- Server Components para melhor performance
- Streaming de conteúdo
- Optimistic updates
- Edge functions quando apropriado

### Segurança
- Rate limiting em APIs
- Sanitização de inputs
- CSP headers
- Proteção contra XSS/CSRF

### Escalabilidade
- Database indexing adequado
- Caching em múltiplos níveis
- CDN para assets estáticos
- Preparado para crescimento horizontal

### Acessibilidade
- Navegação por teclado
- Screen reader friendly
- Contraste adequado (WCAG AA)
- ARIA labels apropriados

---

## Timeline Estimado

| Sprint | Duração | Data Início | Data Fim |
|--------|---------|-------------|----------|
| Sprint 1 | 1 semana | Semana 1 | Semana 1 |
| Sprint 2 | 1 semana | Semana 2 | Semana 2 |
| Sprint 3 | 1-2 semanas | Semana 3 | Semana 4 |
| Sprint 4 | 1 semana | Semana 5 | Semana 5 |
| Sprint 5 | 1 semana | Semana 6 | Semana 6 |
| Sprint 6 | 1-2 semanas | Semana 7 | Semana 8 |
| Sprint 7 | 1-2 semanas | Semana 9 | Semana 10 |
| Sprint 8 | 1 semana | Semana 11 | Semana 11 |

**Total**: 11-15 semanas (~3-4 meses)

---

## Próximos Passos

### ✅ Completados (Sprint 1 + Sprint 2)
1. ✅ Criar este documento de planeamento
2. ✅ Setup inicial do projeto Next.js
3. ✅ Configurar Tailwind CSS e shadcn/ui
4. ✅ Definir design system (cores, tipografia)
5. ✅ Implementar landing page
6. ✅ Adicionar dark mode
7. ✅ Configurar Clerk para autenticação
8. ✅ Criar páginas de login/signup
9. ✅ Implementar layout do dashboard (sidebar + header)
10. ✅ Criar navegação principal
11. ✅ Desenvolver dashboard home com widgets
12. ✅ Implementar perfil básico do utilizador
13. ✅ Criar fluxo de onboarding

### 🎯 Próximo Sprint (Sprint 3)
1. ⏳ Integrar Tiptap como editor de texto rico
2. ⏳ Criar toolbar de formatação
3. ⏳ Implementar features do editor (contador, timer, auto-save)
4. ⏳ Criar base de dados de prompts
5. ⏳ Implementar sistema de categorias e níveis
6. ⏳ Criar prompt do dia
7. ⏳ Desenvolver página "Nova Escrita"

---

## Notas

- Este plano é iterativo e pode ser ajustado com base no feedback
- Cada sprint deve terminar com uma demo/validação
- Prioridade em ter entregas visuais rapidamente
- Foco em elegância, intuitividade e performance
- Código limpo e bem documentado desde o início

---

## 🎉 Sprint 2 - Completado em 21/10/2025

**Entregues:**
- ✅ Clerk integrado com autenticação completa
- ✅ Páginas de login/signup elegantes e funcionais
- ✅ Social login configurado (Google, GitHub)
- ✅ Middleware de proteção de rotas
- ✅ Dashboard completo com sidebar responsiva
- ✅ Navegação entre 6 seções principais
- ✅ Dashboard home com widgets interativos
- ✅ Página de perfil com estatísticas e conquistas
- ✅ Fluxo de onboarding em 3 etapas
- ✅ Landing page atualizada com links de autenticação

**Stack Implementada:**
- @clerk/nextjs 6.33.7
- Middleware de autenticação Next.js
- Componentes dashboard com Framer Motion
- Sistema de navegação completo

---

## 🎉 Sprint 3 - Completado em 21/10/2025

**Entregues:**
- ✅ Editor de texto rico Tiptap completo
- ✅ Toolbar com 15+ opções de formatação
- ✅ Contador de palavras, caracteres e tempo de leitura
- ✅ Timer funcional com play/pause/reset
- ✅ Modo foco fullscreen
- ✅ Auto-save a cada 30 segundos
- ✅ 19 prompts organizados em 4 categorias e 3 níveis
- ✅ Sistema de filtros por categoria e nível
- ✅ Página "Nova Escrita" completa
- ✅ Biblioteca de Prompts com grid responsivo
- ✅ Integração prompt do dia no dashboard

**Stack Implementada:**
- @tiptap/react 3.7.2
- @tiptap/starter-kit 3.7.2
- @tiptap/extension-character-count
- @tiptap/extension-placeholder
- @tiptap/extension-typography
- Componente Badge UI
- Sistema de prompts com TypeScript

**Componentes Criados:**
- Editor
- EditorToolbar
- EditorStats
- WritingTimer
- WritingControls
- Badge

---

---

## 🎉 Sprint 4 - Completado em 21/10/2025

**Entregues:**
- ✅ Sistema completo de XP e níveis com cálculo progressivo
- ✅ 24 badges organizados em 6 categorias (milestone, streak, exploration, dedication, community, special)
- ✅ Hook useProgress para gerenciamento de estado de progresso
- ✅ Componentes de UI: ProgressBar, LevelDisplay, StreakCounter, BadgeGallery
- ✅ Notificações animadas de conquistas (AchievementNotification)
- ✅ Página dedicada de Progresso (/dashboard/progresso)
- ✅ Integração completa no editor (ganho de XP ao escrever)
- ✅ Dashboard home atualizado com dados reais de progresso
- ✅ Página de perfil atualizada com badges e estatísticas
- ✅ Streak system com avisos e tracking de recorde
- ✅ Botão "Completar Escrita" com gamificação

**Stack Implementada:**
- LocalStorage para persistência de dados
- Framer Motion para animações
- Sistema de tipos TypeScript completo
- Hook customizado useProgress
- 24 badges com 4 raridades (common, rare, epic, legendary)

**Componentes Criados:**
- ProgressBar (com 4 variants e 3 tamanhos)
- LevelDisplay (3 variants: compact, full, card)
- StreakCounter (3 variants: compact, full, card)
- BadgeGallery (grid e list views)
- AchievementNotification (com confetti effect)

---

**Documento criado em**: 21 de Outubro de 2025
**Última atualização**: 21 de Outubro de 2025 - Sprint 4 Completo!
