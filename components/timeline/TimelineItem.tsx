"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { CalendarDays, ImageIcon, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TimelineEvent, TimelineVariant } from "./types";

type TimelineItemProps = {
  item: TimelineEvent;
  variant?: TimelineVariant;
  isActive?: boolean;
  isSpecial?: boolean;
  eyebrowLabel?: string;
  size?: "compact" | "comfortable";
  showHeader?: boolean;
  className?: string;
  renderMedia?: (item: TimelineEvent) => ReactNode;
  renderActions?: (item: TimelineEvent) => ReactNode;
  showActions?: boolean;
};

const formatDate = (value: string) => {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(parsed));
};

export function TimelineItem({
  item,
  variant = "feed",
  isActive,
  isSpecial,
  eyebrowLabel,
  size = "comfortable",
  showHeader = true,
  className,
  renderMedia,
  renderActions,
  showActions = true,
}: TimelineItemProps) {
  const tags = item.tags?.slice(0, 4) ?? [];
  const showMedia = Boolean(item.coverUrl || (item.gallery && item.gallery[0]));
  const headerStyle =
    variant === "story"
      ? "text-[0.65rem] uppercase tracking-[0.3em] text-red-200/70"
      : "text-[0.7rem] uppercase tracking-[0.25em] text-red-200/70";
  const isCompact = size === "compact";
  const containerPadding = isCompact ? "p-4" : "p-5";
  const titleSize = isCompact ? "text-base" : "text-lg";
  const descriptionSize = isCompact ? "text-xs" : "text-sm";
  const gapSize = isCompact ? "gap-3" : "gap-4";
  const thumbSize = isCompact
    ? "h-12 w-12 sm:h-14 sm:w-14"
    : "h-16 w-16 sm:h-20 sm:w-20";
  const bodyMarginTop = showHeader ? "mt-4" : "mt-2";

  return (
    <article
      className={cn(
        "relative rounded-[1.5rem] border border-white/5 bg-neutral-900/70 text-left shadow-[0_28px_60px_-50px_rgba(239,68,68,0.8)] backdrop-blur",
        containerPadding,
        isActive
          ? "border-red-400/60 bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-neutral-950/95"
          : isSpecial
            ? "border-red-400/35 bg-neutral-900/75"
            : "",
        className
      )}
    >
      {showHeader && (
        <div className={cn("flex items-center justify-between gap-3", headerStyle)}>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-3 w-3" />
            <span className="text-neutral-400">{formatDate(item.date)}</span>
          </span>
          {eyebrowLabel && (
            <span className="rounded-full border border-red-400/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-200">
              {eyebrowLabel}
            </span>
          )}
        </div>
      )}

      <div className={cn(bodyMarginTop, "flex items-start", gapSize)}>
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 p-1",
            thumbSize
          )}
        >
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-red-200">
            {item.isMilestone ? <Sparkles className="h-3 w-3" /> : "•"}
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            {renderMedia ? (
              renderMedia(item)
            ) : showMedia && item.coverUrl ? (
              <Image
                src={item.coverUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
              />
            ) : showMedia && item.gallery?.[0] ? (
              <Image
                src={item.gallery[0]}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-950/60">
                <ImageIcon className="h-6 w-6 text-red-300/60" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className={cn("font-semibold text-white", titleSize)}>
            {item.title}
          </h3>
          {item.description && (
            <p className={cn("mt-1 leading-relaxed text-neutral-300", descriptionSize)}>
              {item.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-red-300/70" />
                {item.location}
              </span>
            )}
            {item.isMilestone && (
              <Badge
                variant="secondary"
                className="border border-red-400/30 bg-red-500/10 text-red-200"
              >
                Marco
              </Badge>
            )}
            {isSpecial && !item.isMilestone && (
              <Badge
                variant="secondary"
                className="border border-red-400/30 bg-red-500/10 text-red-200"
              >
                Especial
              </Badge>
            )}
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/10 text-neutral-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {showActions && renderActions ? (
        <div className="mt-4">{renderActions(item)}</div>
      ) : null}
    </article>
  );
}
