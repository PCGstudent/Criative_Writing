# 📝 Escrita Criativa - Plataforma Web

Uma plataforma moderna e elegante dedicada à escrita criativa, onde escritores podem praticar, aprender, evoluir, acompanhar seu progresso e competir com outros.

## 🚀 Status do Projeto

**Sprint Atual**: Sprint 1 ✅ **COMPLETO**

- ✅ Landing page elegante com animações
- ✅ Design system completo
- ✅ Dark mode funcional
- ✅ Totalmente responsivo

## 🛠️ Stack Tecnológica

### Core
- **Next.js** 15.5.6 (App Router)
- **React** 19
- **TypeScript**
- **Tailwind CSS** v4

### UI/UX
- **Framer Motion** - Animações suaves
- **next-themes** - Dark mode
- **Lucide React** - Ícones
- **class-variance-authority** - Variantes de componentes
- **tailwind-merge** - Merge de classes Tailwind

### Design System
- Paleta de cores elegante (Indigo, Amber, Teal)
- Componentes customizáveis (Button, Card, etc)
- Suporte completo a dark mode
- Animações suaves e profissionais

## 🏃 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Linting
npm run lint
```

A aplicação estará disponível em **http://localhost:3000** (ou 3001 se 3000 estiver ocupado)

## 📁 Estrutura do Projeto

```
app/
├── src/
│   ├── app/              # App Router (Next.js 13+)
│   │   ├── layout.tsx    # Layout raiz com ThemeProvider
│   │   ├── page.tsx      # Landing page
│   │   └── globals.css   # Estilos globais + Design system
│   ├── components/       # Componentes React
│   │   ├── ui/          # Componentes base do design system
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── lib/             # Utilitários
│       └── utils.ts     # Helpers (cn, etc)
├── public/              # Assets estáticos
└── package.json
```

## 🎨 Design System

### Cores Principais

#### Light Mode
- **Primary**: Indigo (#6366F1) - Inspirador
- **Secondary**: Amber (#FBBF24) - Highlights
- **Accent**: Teal (#14B8A6) - Criativo

#### Dark Mode
- **Primary**: Indigo claro (#818CF8)
- **Secondary**: Amber claro (#FCD34D)
- **Accent**: Teal claro (#2DD4BF)

### Componentes Disponíveis

#### Button
```tsx
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

#### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo aqui
  </CardContent>
  <CardFooter>
    Footer aqui
  </CardFooter>
</Card>
```

## 🎯 Funcionalidades Implementadas (Sprint 1)

- ✅ Landing page completa e responsiva
- ✅ Hero section com animações
- ✅ Seção de features (6 cards)
- ✅ Seção "Como Funciona" (3 passos)
- ✅ CTA section com gradiente
- ✅ Footer organizado
- ✅ Dark mode com toggle
- ✅ Animações suaves (Framer Motion)
- ✅ Design system completo
- ✅ Componentes base (Button, Card)

## 📋 Próximos Passos (Sprint 2)

- ⏳ Integração com Clerk (autenticação)
- ⏳ Dashboard principal
- ⏳ Navegação (sidebar + header)
- ⏳ Perfil do utilizador
- ⏳ Onboarding flow

## 📖 Documentação

Para mais detalhes sobre o planeamento completo do projeto, consulte:
- **PLAN_2025_10_21.md** (na raiz do projeto)

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Atualmente em **Sprint 1** de 8 sprints planejados.

---

**Desenvolvido com ❤️ para escritores**
