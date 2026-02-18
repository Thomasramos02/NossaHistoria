"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  MessageCircle,
  Pencil,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TimelineFilters } from "./TimelineFilters";
import { TimelineItem } from "./TimelineItem";
import {
  defaultTimelineFilters,
  type TimelineEvent,
  type TimelineFilterState,
  type TimelineReaction,
} from "./types";

type TimelineFeedProps = {
  items: TimelineEvent[];
  filters?: TimelineFilterState;
  onFilterChange?: (filters: TimelineFilterState) => void;
  onActiveChange?: (index: number, item: TimelineEvent) => void;
  onEdit?: (item: TimelineEvent) => void;
  onDelete?: (item: TimelineEvent) => void;
  onReact?: (item: TimelineEvent, reactionId: string) => void;
  onCommentAdd?: (item: TimelineEvent, message: string) => void;
  onCreate?: () => void;
  renderMedia?: (item: TimelineEvent) => React.ReactNode;
  renderActions?: (item: TimelineEvent) => React.ReactNode;
  className?: string;
};

const getYearLabel = (value: string) => {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return "Sem data";
  return new Date(parsed).getFullYear().toString();
};

const defaultReactions: TimelineReaction[] = [
  { id: "love", emoji: "❤️", count: 0 },
  { id: "spark", emoji: "✨", count: 0 },
  { id: "heart", emoji: "💫", count: 0 },
];

export function TimelineFeed({
  items,
  filters,
  onFilterChange,
  onActiveChange,
  onEdit,
  onDelete,
  onReact,
  onCommentAdd,
  onCreate,
  renderMedia,
  renderActions,
  className,
}: TimelineFeedProps) {
  const [internalFilters, setInternalFilters] =
    useState<TimelineFilterState>(defaultTimelineFilters);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>(
    {}
  );
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const effectiveFilters = filters ?? internalFilters;
  const setFilters = onFilterChange ?? setInternalFilters;

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [items]);

  const years = useMemo(() => {
    const yearSet = new Set<string>();
    items.forEach((item) => yearSet.add(getYearLabel(item.date)));
    return Array.from(yearSet).sort((a, b) => {
      if (a === "Sem data") return 1;
      if (b === "Sem data") return -1;
      return Number(a) - Number(b);
    });
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = effectiveFilters.query.toLowerCase();
    const filtered = items.filter((item) => {
      const text = [
        item.title,
        item.description,
        item.location,
        item.tags?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (query && !text.includes(query)) return false;
      if (
        effectiveFilters.tag !== "all" &&
        !item.tags?.includes(effectiveFilters.tag)
      )
        return false;
      if (
        effectiveFilters.year !== "all" &&
        getYearLabel(item.date) !== effectiveFilters.year
      )
        return false;
      if (effectiveFilters.onlyMilestones && !item.isMilestone) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const dateA = Date.parse(a.date);
      const dateB = Date.parse(b.date);
      const valueA = Number.isNaN(dateA) ? Number.POSITIVE_INFINITY : dateA;
      const valueB = Number.isNaN(dateB) ? Number.POSITIVE_INFINITY : dateB;
      return effectiveFilters.sort === "asc"
        ? valueA - valueB
        : valueB - valueA;
    });

    return sorted;
  }, [items, effectiveFilters]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, TimelineEvent[]>();
    filteredItems.forEach((item) => {
      const year = getYearLabel(item.date);
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year)?.push(item);
    });

    const orderedYears = Array.from(groups.keys()).sort((a, b) => {
      if (a === "Sem data") return 1;
      if (b === "Sem data") return -1;
      return effectiveFilters.sort === "asc"
        ? Number(a) - Number(b)
        : Number(b) - Number(a);
    });

    return orderedYears.map((year) => ({
      year,
      items: groups.get(year) ?? [],
    }));
  }, [filteredItems, effectiveFilters.sort]);

  const toggleComments = (id: string) => {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentSubmit = (
    event: FormEvent<HTMLFormElement>,
    item: TimelineEvent
  ) => {
    event.preventDefault();
    const message = drafts[item.id]?.trim();
    if (!message) return;
    onCommentAdd?.(item, message);
    setDrafts((prev) => ({ ...prev, [item.id]: "" }));
  };

  return (
    <div className={cn("relative space-y-8", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
            Sua história
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Timeline do casal
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-400">
            Filtre, edite e celebre cada capítulo. Tudo organizado para
            compartilhar com quem importa.
          </p>
        </div>
        {onCreate && (
          <Button
            type="button"
            onClick={onCreate}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600"
          >
            Novo capítulo
          </Button>
        )}
      </div>

      <TimelineFilters
        filters={effectiveFilters}
        tags={tags}
        years={years}
        onChange={setFilters}
      />

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-neutral-900/60 p-10 text-center text-neutral-400">
          Nenhum capítulo encontrado. Ajuste seus filtros ou crie um novo
          momento.
        </div>
      ) : (
        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-red-500/40 via-red-500/10 to-transparent" />

          <div className="space-y-10">
            {groupedItems.map((group) => (
              <div key={group.year} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/40 bg-red-500/10 text-red-200">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-300">
                    {group.year}
                  </h3>
                </div>

                <ul className="space-y-8">
                  {group.items.map((item, index) => {
                    const reactions = item.reactions ?? defaultReactions;
                    const isCommentsOpen = !!expandedComments[item.id];

                    return (
                      <li
                        key={item.id}
                        className="relative pl-12"
                        onMouseEnter={() =>
                          onActiveChange?.(index, item)
                        }
                        onFocus={() => onActiveChange?.(index, item)}
                      >
                        <div className="absolute left-[10px] top-6 h-3 w-3 rounded-full border border-red-400/50 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />

                        <TimelineItem
                          item={item}
                          variant="feed"
                          renderMedia={renderMedia}
                          renderActions={
                            renderActions
                              ? renderActions
                              : (_current) => (
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                      {reactions.map((reaction) => (
                                        <button
                                          key={reaction.id}
                                          type="button"
                                          onClick={() =>
                                            onReact?.(item, reaction.id)
                                          }
                                          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${
                                            reaction.reacted
                                              ? "border-red-400/60 bg-red-500/10 text-red-100"
                                              : "border-white/10 bg-neutral-950/40 text-neutral-300 hover:border-red-400/40"
                                          }`}
                                        >
                                          <span>{reaction.emoji}</span>
                                          <span className="text-[11px]">
                                            {reaction.count}
                                          </span>
                                        </button>
                                      ))}

                                      <button
                                        type="button"
                                        onClick={() => toggleComments(item.id)}
                                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${
                                          isCommentsOpen
                                            ? "border-red-400/60 bg-red-500/10 text-red-100"
                                            : "border-white/10 bg-neutral-950/40 text-neutral-300 hover:border-red-400/40"
                                        }`}
                                      >
                                        <MessageCircle className="h-3.5 w-3.5" />
                                        {item.comments?.length ?? 0}
                                      </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      {onEdit && (
                                        <button
                                          type="button"
                                          onClick={() => onEdit(item)}
                                          className="rounded-full border border-white/10 bg-neutral-950/40 p-2 text-neutral-300 transition hover:border-red-400/40 hover:text-white"
                                          aria-label="Editar capítulo"
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </button>
                                      )}
                                      {onDelete && (
                                        <button
                                          type="button"
                                          onClick={() => onDelete(item)}
                                          className="rounded-full border border-white/10 bg-neutral-950/40 p-2 text-neutral-300 transition hover:border-red-400/40 hover:text-white"
                                          aria-label="Remover capítulo"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )
                          }
                        />

                        {isCommentsOpen && (
                          <div className="mt-4 rounded-2xl border border-white/5 bg-neutral-950/50 p-4">
                            <div className="space-y-3">
                              {(item.comments ?? []).length === 0 && (
                                <p className="text-xs text-neutral-500">
                                  Nenhum comentário ainda. Seja o primeiro!
                                </p>
                              )}
                              {(item.comments ?? []).map((comment) => (
                                <div
                                  key={comment.id}
                                  className="flex items-start gap-3"
                                >
                                  <Avatar className="h-8 w-8">
                                    {comment.avatarUrl ? (
                                      <AvatarImage
                                        src={comment.avatarUrl}
                                        alt={comment.author}
                                      />
                                    ) : null}
                                    <AvatarFallback className="bg-red-500/10 text-red-200">
                                      <UserRound className="h-4 w-4" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-xs font-semibold text-neutral-200">
                                      {comment.author}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                      {comment.message}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <form
                              onSubmit={(event) =>
                                handleCommentSubmit(event, item)
                              }
                              className="mt-4 flex flex-wrap items-center gap-2"
                            >
                              <Input
                                value={drafts[item.id] ?? ""}
                                onChange={(event) =>
                                  setDrafts((prev) => ({
                                    ...prev,
                                    [item.id]: event.target.value,
                                  }))
                                }
                                placeholder="Adicionar comentário"
                                className="h-10 flex-1 border-white/10 bg-neutral-950/60 text-neutral-200 placeholder:text-neutral-500"
                              />
                              <Button
                                type="submit"
                                size="sm"
                                className="rounded-lg bg-red-500 px-4 text-white hover:bg-red-600"
                              >
                                Enviar
                              </Button>
                            </form>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
