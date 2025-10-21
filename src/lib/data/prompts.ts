export type PromptCategory =
  | "fiction"
  | "poetry"
  | "non-fiction"
  | "exercise"

export type PromptLevel = "beginner" | "intermediate" | "advanced"

export interface Prompt {
  id: string
  title: string
  description: string
  category: PromptCategory
  level: PromptLevel
  xp: number
  estimatedMinutes: number
  tags: string[]
}

export const PROMPTS: Prompt[] = [
  // Fiction - Beginner
  {
    id: "f-b-001",
    title: "O Objeto Esquecido",
    description:
      "Escreva sobre um objeto comum que guarda uma memória extraordinária. Pode ser uma chave, uma caneta, uma fotografia... O que torna esse objeto especial?",
    category: "fiction",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 15,
    tags: ["memória", "objeto", "descrição"],
  },
  {
    id: "f-b-002",
    title: "A Carta Misteriosa",
    description:
      "Seu personagem recebe uma carta sem remetente. O que está escrito? Como isso muda o dia dele?",
    category: "fiction",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 20,
    tags: ["mistério", "carta", "descoberta"],
  },
  {
    id: "f-b-003",
    title: "Primeiro Encontro",
    description:
      "Descreva o primeiro encontro entre duas pessoas que se tornarão grandes amigos. Onde acontece? O que chama atenção de um no outro?",
    category: "fiction",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 15,
    tags: ["amizade", "personagens", "diálogo"],
  },

  // Fiction - Intermediate
  {
    id: "f-i-001",
    title: "A Escolha Impossível",
    description:
      "Seu personagem precisa fazer uma escolha que mudará sua vida para sempre. Descreva o dilema, o processo de decisão e a escolha final.",
    category: "fiction",
    level: "intermediate",
    xp: 100,
    estimatedMinutes: 30,
    tags: ["dilema", "decisão", "conflito"],
  },
  {
    id: "f-i-002",
    title: "O Segredo da Família",
    description:
      "Um segredo guardado por gerações está prestes a ser revelado. Como a família reage? Quem mais é afetado?",
    category: "fiction",
    level: "intermediate",
    xp: 100,
    estimatedMinutes: 25,
    tags: ["família", "segredo", "drama"],
  },
  {
    id: "f-i-003",
    title: "Mudança Inesperada",
    description:
      "Escreva sobre alguém que teve que recomeçar a vida em um lugar completamente diferente. O que os levou até ali?",
    category: "fiction",
    level: "intermediate",
    xp: 100,
    estimatedMinutes: 30,
    tags: ["mudança", "recomeço", "adaptação"],
  },

  // Fiction - Advanced
  {
    id: "f-a-001",
    title: "Realidades Paralelas",
    description:
      "Escreva uma história onde o mesmo evento é narrado de três perspectivas diferentes, cada uma revelando uma verdade distinta.",
    category: "fiction",
    level: "advanced",
    xp: 200,
    estimatedMinutes: 45,
    tags: ["perspectiva", "narrativa", "complexo"],
  },
  {
    id: "f-a-002",
    title: "O Fim do Mundo (Pessoal)",
    description:
      "Narre o 'fim do mundo' de um personagem - não necessariamente apocalíptico, mas uma mudança que destrói tudo que ele conhecia.",
    category: "fiction",
    level: "advanced",
    xp: 200,
    estimatedMinutes: 40,
    tags: ["transformação", "metáfora", "profundo"],
  },

  // Poetry - Beginner
  {
    id: "p-b-001",
    title: "As Quatro Estações",
    description:
      "Escreva um poema curto para cada estação do ano, capturando sua essência em poucas palavras.",
    category: "poetry",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 15,
    tags: ["natureza", "estações", "haiku"],
  },
  {
    id: "p-b-002",
    title: "Cores e Emoções",
    description:
      "Escolha uma cor e escreva um poema que transmita uma emoção através dela. Como a cor se manifesta na emoção?",
    category: "poetry",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 10,
    tags: ["cor", "emoção", "sensorial"],
  },

  // Poetry - Intermediate
  {
    id: "p-i-001",
    title: "Soneto Moderno",
    description:
      "Escreva um soneto (14 versos) sobre um tema contemporâneo. Mantenha a estrutura clássica mas com linguagem atual.",
    category: "poetry",
    level: "intermediate",
    xp: 100,
    estimatedMinutes: 25,
    tags: ["soneto", "estrutura", "clássico"],
  },
  {
    id: "p-i-002",
    title: "A Cidade Adormecida",
    description:
      "Descreva uma cidade à noite em versos. Capture os sons, silêncios e movimentos noturnos.",
    category: "poetry",
    level: "intermediate",
    xp: 100,
    estimatedMinutes: 20,
    tags: ["urbano", "noite", "atmosfera"],
  },

  // Non-Fiction - Beginner
  {
    id: "nf-b-001",
    title: "Minha Primeira Memória",
    description:
      "Escreva sobre sua primeira memória clara da infância. Por que acha que essa memória permaneceu?",
    category: "non-fiction",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 15,
    tags: ["memória", "infância", "pessoal"],
  },
  {
    id: "nf-b-002",
    title: "Uma Lição Aprendida",
    description:
      "Relate uma experiência que te ensinou algo importante. Como isso mudou você?",
    category: "non-fiction",
    level: "beginner",
    xp: 50,
    estimatedMinutes: 20,
    tags: ["experiência", "aprendizado", "reflexão"],
  },

  // Exercise
  {
    id: "e-b-001",
    title: "Descrição em 5 Sentidos",
    description:
      "Escolha um lugar e descreva-o usando todos os cinco sentidos: visão, audição, olfato, paladar e tato.",
    category: "exercise",
    level: "beginner",
    xp: 30,
    estimatedMinutes: 10,
    tags: ["descrição", "sentidos", "técnica"],
  },
  {
    id: "e-b-002",
    title: "Diálogo sem Contexto",
    description:
      "Escreva um diálogo entre duas pessoas sem descrições ou narração. Apenas as falas devem revelar quem são e do que estão falando.",
    category: "exercise",
    level: "beginner",
    xp: 30,
    estimatedMinutes: 15,
    tags: ["diálogo", "técnica", "subtexto"],
  },
  {
    id: "e-i-001",
    title: "Reescrever a Perspectiva",
    description:
      "Pegue uma cena famosa de um conto de fadas e reescreva do ponto de vista do antagonista.",
    category: "exercise",
    level: "intermediate",
    xp: 80,
    estimatedMinutes: 25,
    tags: ["perspectiva", "recriação", "ponto de vista"],
  },
]

export function getPromptsByCategory(category: PromptCategory): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.category === category)
}

export function getPromptsByLevel(level: PromptLevel): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.level === level)
}

export function getPromptById(id: string): Prompt | undefined {
  return PROMPTS.find((prompt) => prompt.id === id)
}

export function getRandomPrompt(
  category?: PromptCategory,
  level?: PromptLevel
): Prompt {
  let filtered = PROMPTS

  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (level) {
    filtered = filtered.filter((p) => p.level === level)
  }

  const randomIndex = Math.floor(Math.random() * filtered.length)
  return filtered[randomIndex]
}

export function getDailyPrompt(): Prompt {
  // Use a seed based on current date to get same prompt each day
  const today = new Date()
  const seed =
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const index = seed % PROMPTS.length
  return PROMPTS[index]
}
