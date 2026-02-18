"use client";

import { useState } from "react";
import {
  Timeline,
  TimelineComposer,
  defaultTimelineFilters,
  type TimelineEvent,
  type TimelineReaction,
} from "@/components/timeline";

const initialItems: TimelineEvent[] = [
  {
    id: "primeiro-encontro",
    title: "Primeiro encontro",
    date: "2022-02-14",
    description:
      "Aquele café que virou o capítulo mais importante da nossa história.",
    coverUrl: "/images/casal-1.svg",
    location: "São Paulo",
    tags: ["Encontro", "Marco"],
    isMilestone: true,
    reactions: [
      { id: "love", emoji: "❤️", count: 18, reacted: true },
      { id: "spark", emoji: "✨", count: 6 },
      { id: "heart", emoji: "💫", count: 4 },
    ],
    comments: [
      {
        id: "c1",
        author: "Ana",
        message: "Ainda lembro do nosso nervosismo!",
        date: "2022-02-15",
      },
    ],
  },
  {
    id: "primeira-viagem",
    title: "Primeira viagem juntos",
    date: "2022-06-12",
    description: "Três dias no litoral e um pôr do sol inesquecível.",
    coverUrl: "/images/casal-2.svg",
    location: "Ubatuba",
    tags: ["Viagem", "Praia"],
    reactions: [
      { id: "love", emoji: "❤️", count: 9 },
      { id: "spark", emoji: "✨", count: 5, reacted: true },
      { id: "heart", emoji: "💫", count: 2 },
    ],
    comments: [
      {
        id: "c2",
        author: "Pedro",
        message: "Preciso repetir esse fim de semana.",
        date: "2022-06-13",
      },
    ],
  },
  {
    id: "novo-lar",
    title: "Novo lar",
    date: "2023-01-08",
    description: "Mudamos juntos e criamos nosso cantinho favorito.",
    coverUrl: "/images/casal-3.svg",
    location: "Curitiba",
    tags: ["Casa", "Mudança"],
    reactions: [
      { id: "love", emoji: "❤️", count: 11 },
      { id: "spark", emoji: "✨", count: 3 },
      { id: "heart", emoji: "💫", count: 1 },
    ],
  },
  {
    id: "aniversario",
    title: "Aniversário de namoro",
    date: "2023-08-20",
    description: "Jantar à luz de velas e carta surpresa.",
    coverUrl: "/images/casal-4.svg",
    location: "São Paulo",
    tags: ["Aniversário", "Romântico"],
    isMilestone: true,
    reactions: [
      { id: "love", emoji: "❤️", count: 22, reacted: true },
      { id: "spark", emoji: "✨", count: 10 },
      { id: "heart", emoji: "💫", count: 7 },
    ],
    comments: [
      {
        id: "c3",
        author: "Lia",
        message: "Ainda tenho a carta guardada.",
        date: "2023-08-21",
      },
    ],
  },
  {
    id: "pedido",
    title: "Pedido especial",
    date: "2024-02-14",
    description: "O sim mais bonito da nossa vida.",
    coverUrl: "/images/casal-5.svg",
    location: "Gramado",
    tags: ["Pedido", "Marco"],
    isMilestone: true,
    reactions: [
      { id: "love", emoji: "❤️", count: 30, reacted: true },
      { id: "spark", emoji: "✨", count: 15 },
      { id: "heart", emoji: "💫", count: 9 },
    ],
    comments: [
      {
        id: "c4",
        author: "Amigos",
        message: "Choramos assistindo vocês.",
        date: "2024-02-15",
      },
    ],
  },
];

const toggleReaction = (
  reactions: TimelineReaction[] | undefined,
  reactionId: string
) => {
  const list = reactions ?? [];
  return list.map((reaction) => {
    if (reaction.id !== reactionId) return reaction;
    const reacted = !reaction.reacted;
    const nextCount = Math.max(0, reaction.count + (reacted ? 1 : -1));
    return { ...reaction, reacted, count: nextCount };
  });
};

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineEvent[]>(initialItems);
  const [filters, setFilters] = useState(defaultTimelineFilters);
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineEvent | null>(null);

  const handleOpenChange = (open: boolean) => {
    setComposerOpen(open);
    if (!open) setEditingItem(null);
  };

  const handleSave = (item: TimelineEvent) => {
    setItems((prev) => {
      const exists = prev.some((entry) => entry.id === item.id);
      if (exists) {
        return prev.map((entry) => (entry.id === item.id ? item : entry));
      }
      return [...prev, item];
    });
  };

  const handleDelete = (item: TimelineEvent) => {
    setItems((prev) => prev.filter((entry) => entry.id !== item.id));
  };

  const handleReact = (item: TimelineEvent, reactionId: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.id === item.id
          ? { ...entry, reactions: toggleReaction(entry.reactions, reactionId) }
          : entry
      )
    );
  };

  const handleCommentAdd = (item: TimelineEvent, message: string) => {
    const nextComment = {
      id: `c-${Date.now()}`,
      author: "Você",
      message,
      date: new Date().toISOString(),
    };
    setItems((prev) =>
      prev.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              comments: [...(entry.comments ?? []), nextComment],
            }
          : entry
      )
    );
  };

  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-6xl px-6 py-24">
        <Timeline
          variant="feed"
          items={items}
          filters={filters}
          onFilterChange={setFilters}
          onCreate={() => {
            setEditingItem(null);
            setComposerOpen(true);
          }}
          onEdit={(item) => {
            setEditingItem(item);
            setComposerOpen(true);
          }}
          onDelete={handleDelete}
          onReact={handleReact}
          onCommentAdd={handleCommentAdd}
        />
      </main>

      <TimelineComposer
        open={composerOpen}
        onOpenChange={handleOpenChange}
        initialItem={editingItem}
        onSave={handleSave}
      />
    </div>
  );
}
