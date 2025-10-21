# 🧪 Guia de Testes - Sprint 3

## Status: ⚠️ **TESTES PENDENTES**

Este sprint foi implementado mas ainda não foi testado completamente no navegador.

## 📋 Checklist de Testes

### ✅ Verificações Automáticas (Completadas)
- [x] TypeScript sem erros
- [x] Servidor compila sem erros
- [x] Rotas acessíveis (200 OK)

### ⏳ Testes Manuais (Pendentes)

#### 1. Dashboard Home
- [ ] Aceder a http://localhost:3005/dashboard
- [ ] Verificar card "Prompt do Dia" aparece
- [ ] Clicar "Começar a Escrever" → Abre /dashboard/escrever?prompt=daily
- [ ] Clicar "Ver Outros Prompts" → Abre /dashboard/prompts
- [ ] Sem erros no console (F12)

#### 2. Biblioteca de Prompts
- [ ] Aceder a http://localhost:3005/dashboard/prompts
- [ ] Verifica 19 prompts aparecem em grid
- [ ] Filtro "Ficção" → Mostra apenas prompts de ficção
- [ ] Filtro "Poesia" → Mostra apenas prompts de poesia
- [ ] Filtro "Iniciante" → Mostra apenas nível iniciante
- [ ] Contador "X prompts encontrados" atualiza
- [ ] Clicar "Começar a Escrever" num prompt → Abre editor

#### 3. Editor de Escrita
- [ ] Aceder a http://localhost:3005/dashboard/escrever
- [ ] Editor aparece (área branca/escura para escrever)
- [ ] Toolbar aparece acima do editor
- [ ] Placeholder aparece quando vazio
- [ ] Escrever texto → Contador de palavras atualiza
- [ ] Contador de caracteres atualiza
- [ ] Tempo de leitura calcula (palavras/200)

#### 4. Toolbar de Formatação
- [ ] Botão **Bold** (B) → Texto fica negrito
- [ ] Botão *Italic* (I) → Texto fica itálico
- [ ] Botão ~~Strikethrough~~ → Texto fica riscado
- [ ] Botão `Code` → Texto fica monoespaçado
- [ ] Botão H1 → Texto fica grande (Heading 1)
- [ ] Botão H2 → Texto fica médio (Heading 2)
- [ ] Botão H3 → Texto fica pequeno (Heading 3)
- [ ] Botão Lista → Cria bullet list
- [ ] Botão Lista Numerada → Cria numbered list
- [ ] Botão Quote → Cria blockquote
- [ ] Botão Undo → Desfaz última ação
- [ ] Botão Redo → Refaz ação desfeita
- [ ] Botão Clear → Remove formatação

#### 5. Timer e Controles
- [ ] Timer aparece (00:00)
- [ ] Clicar Play → Timer começa a contar
- [ ] Clicar Pause → Timer para
- [ ] Clicar Reset → Timer volta a 00:00
- [ ] Botão "Modo Foco" → Entra fullscreen
- [ ] Em modo foco: Editor ocupa tela toda
- [ ] Em modo foco: Toolbar esconde
- [ ] Em modo foco: Stats escondem
- [ ] Botão "Sair do Modo Foco" → Volta ao normal

#### 6. Prompts
- [ ] Aceder /dashboard/escrever?prompt=daily
- [ ] Card do prompt aparece acima do editor
- [ ] Título do prompt mostra
- [ ] Descrição do prompt mostra
- [ ] Badges de categoria e nível aparecem
- [ ] Tempo estimado e XP mostram
- [ ] Tags aparecem

#### 7. Responsividade
- [ ] Desktop (>1024px) → Tudo aparece
- [ ] Tablet (768-1024px) → Grid ajusta
- [ ] Mobile (<768px) → Grid 1 coluna

#### 8. Dark Mode
- [ ] Toggle dark mode no header
- [ ] Editor adapta (fundo escuro)
- [ ] Toolbar adapta
- [ ] Prompts adaptam
- [ ] Sem contraste ruim

#### 9. Performance
- [ ] Auto-save ativa após 30s
- [ ] Sem lag ao escrever
- [ ] Filtros respondem rápido
- [ ] Navegação fluída

#### 10. Console do Navegador
- [ ] Abrir DevTools (F12)
- [ ] Sem erros vermelhos
- [ ] Sem warnings críticos
- [ ] Network sem falhas 404/500

---

## 🐛 Bugs Encontrados

### Bug #1: TypeScript errors em editor-stats.tsx
- **Status**: ✅ Corrigido
- **Descrição**: `characters()` não estava tipado corretamente
- **Fix**: Adicionado type guards

---

## 📝 Notas de Teste

Data: 21/10/2025
Testador: [PENDENTE]

### Funciona:
- [ ] Editor carrega
- [ ] Toolbar funciona
- [ ] Timer funciona
- [ ] Modo foco funciona
- [ ] Prompts carregam
- [ ] Filtros funcionam
- [ ] Navegação funciona

### Não Funciona:
- [ ] [Listar bugs aqui]

### Melhorias Sugeridas:
- [ ] [Listar melhorias aqui]

---

## ✅ Aprovação Final

- [ ] Todos os testes passaram
- [ ] Sem bugs críticos
- [ ] Performance OK
- [ ] Aprovado por: _______________
- [ ] Data: _______________

**Status Final**: ⏳ AGUARDANDO TESTES
