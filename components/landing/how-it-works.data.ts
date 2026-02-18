import type { TimelineEvent } from "@/components/timeline";

export const howItWorksItems: TimelineEvent[] = [
  {
    id: "primeiro-encontro",
    title: "Primeiro Encontro",
    date: "14 Fev 2022",
    description: "Vocês registram o primeiro momento em segundos.",
    coverUrl: "/images/casal-1.svg",
    tags: ["primeiro", "encontro", "marco"],
    isMilestone: true,
  },
  {
    id: "fotos-e-detalhes",
    title: "Fotos e Detalhes",
    date: "22 Jul 2022",
    description: "Adicionem fotos, local e aquele detalhe inesquecível.",
    coverUrl: "/images/casal-2.svg",
    tags: ["fotos", "memórias", "surpresa"],
  },
  {
    id: "ordem-automatica",
    title: "Ordem Automática",
    date: "10 Dez 2022",
    description: "A timeline organiza cada momento por data, sem esforço.",
    coverUrl: "/images/casal-3.svg",
    tags: ["organização", "timeline"],
  },
  {
    id: "personalizem",
    title: "Personalizem",
    date: "03 Mai 2023",
    description: "Escolham tema, cores e o clima da história.",
    coverUrl: "/images/casal-4.svg",
    tags: ["design", "estilo"],
  },
  {
    id: "compartilhem",
    title: "Compartilhem",
    date: "16 Set 2023",
    description: "Gerem um link privado para quem faz parte dessa história.",
    coverUrl: "/images/casal-5.svg",
    tags: ["compartilhar", "pedido", "privado"],
    isMilestone: true,
  },
];
