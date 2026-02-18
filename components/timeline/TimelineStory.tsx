"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "./types";
import { TimelineItem } from "./TimelineItem";

type TimelineStoryProps = {
  items: TimelineEvent[];
  className?: string;
  activeIndex?: number;
  onActiveChange?: (index: number, item: TimelineEvent) => void;
  density?: "compact" | "comfortable";
  specialKeywords?: string[];
  showStartMarker?: boolean;
};

const defaultSpecialKeywords = [
  "aniversario",
  "aniversário",
  "pedido",
  "noivado",
  "casamento",
  "viagem",
  "mudamos",
  "primeiro",
  "surpresa",
  "formatura",
  "nascimento",
  "gravidez",
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const formatDate = (value: string) => {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(parsed));
};

export function TimelineStory({
  items,
  className,
  activeIndex,
  onActiveChange,
  density = "compact",
  specialKeywords,
  showStartMarker = true,
}: TimelineStoryProps) {
  const [internalActive, setInternalActive] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const itemCentersRef = useRef<number[]>([]);
  const activeIndexRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const isControlled = typeof activeIndex === "number";
  const currentActive = isControlled ? activeIndex : internalActive;

  const [openId, setOpenId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    activeIndexRef.current = currentActive;
  }, [currentActive]);

  useEffect(() => {
    if (items.length === 0) return;
    setOpenId((prev) => {
      if (prev && items.some((item) => item.id === prev)) return prev;
      return items[0].id;
    });
  }, [items]);

  useEffect(() => {
    if (!isControlled) return;
    if (activeIndex === undefined) return;
    const nextId = items[activeIndex]?.id;
    if (nextId) setOpenId(nextId);
  }, [activeIndex, isControlled, items]);

  const keywordList = useMemo(
    () =>
      (specialKeywords ?? defaultSpecialKeywords).map((keyword) =>
        normalizeText(keyword)
      ),
    [specialKeywords]
  );

  const isSpecialItem = (item: TimelineEvent) => {
    if (item.isMilestone) return true;
    const haystack = normalizeText(
      [item.title, item.description, item.tags?.join(" ")].filter(Boolean).join(" ")
    );
    return keywordList.some((keyword) => haystack.includes(keyword));
  };

  const isCompact = density === "compact";
  const lineProgress =
    items.length <= 1 ? 1 : Math.min(currentActive / (items.length - 1), 1);

  const setActive = (index: number, shouldScrollIntoView = false) => {
    const boundedIndex = Math.min(Math.max(index, 0), items.length - 1);
    const isAlreadyActive = boundedIndex === activeIndexRef.current;
    if (!isAlreadyActive) {
      if (!isControlled) {
        setInternalActive(boundedIndex);
      }
      onActiveChange?.(boundedIndex, items[boundedIndex]);
    }

    if (shouldScrollIntoView) {
      stepRefs.current[boundedIndex]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    let frameId: number | null = null;
    let recalcId: number | null = null;

    const updateItemCenters = () => {
      const containerRect = container.getBoundingClientRect();
      itemCentersRef.current = stepRefs.current.map((element) => {
        if (!element) return Number.NaN;
        const rect = element.getBoundingClientRect();
        return (
          rect.left -
          containerRect.left +
          container.scrollLeft +
          rect.width / 2
        );
      });
    };

    const updateActiveByCenter = () => {
      if (!desktopQuery.matches) return;
      if (container.offsetParent === null) return;
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const centers = itemCentersRef.current;
        if (centers.length === 0) return;
        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let closestIndex = -1;
        let smallestDistance = Number.POSITIVE_INFINITY;

        centers.forEach((center, index) => {
          if (!Number.isFinite(center)) return;
          const distance = Math.abs(center - containerCenter);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex >= 0 && closestIndex !== activeIndexRef.current) {
          setActive(closestIndex);
        }
      });
    };

    const scheduleRecalc = () => {
      if (recalcId !== null) return;
      recalcId = window.requestAnimationFrame(() => {
        recalcId = null;
        updateItemCenters();
        updateActiveByCenter();
      });
    };

    updateItemCenters();
    updateActiveByCenter();
    container.addEventListener("scroll", updateActiveByCenter, {
      passive: true,
    });
    window.addEventListener("resize", scheduleRecalc);
    desktopQuery.addEventListener("change", scheduleRecalc);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        scheduleRecalc();
      });
      resizeObserver.observe(container);
      stepRefs.current.forEach((element) => {
        if (element) resizeObserver?.observe(element);
      });
    }

    return () => {
      container.removeEventListener("scroll", updateActiveByCenter);
      window.removeEventListener("resize", scheduleRecalc);
      desktopQuery.removeEventListener("change", scheduleRecalc);
      resizeObserver?.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (recalcId !== null) {
        window.cancelAnimationFrame(recalcId);
      }
    };
  }, [items, prefersReducedMotion]);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-white/5 bg-neutral-900/60 p-10 text-center text-neutral-400">
        Nenhum momento disponível ainda.
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative md:hidden">
        <div className="pointer-events-none absolute left-4 top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent" />
        <motion.div
          className="pointer-events-none absolute left-4 top-2 w-px origin-top bg-gradient-to-b from-red-500/70 via-red-500/40 to-transparent"
          style={prefersReducedMotion ? { scaleY: lineProgress } : undefined}
          animate={prefersReducedMotion ? undefined : { scaleY: lineProgress }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        />

        <Accordion
          type="single"
          collapsible
          value={openId}
          onValueChange={(value) => {
            setOpenId(value || undefined);
            const index = items.findIndex((item) => item.id === value);
            if (index >= 0) setActive(index);
          }}
          className="space-y-4"
        >
          {items.map((item, i) => {
            const isActive = currentActive === i;
            const isSpecial = isSpecialItem(item);
            const showSpecialLabel = isSpecial && !item.isMilestone;
            const isStart = showStartMarker && i === 0;

            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="relative border-none pl-10"
              >
                <span
                  className={cn(
                    "absolute left-4 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-white/10 bg-neutral-800",
                    isSpecial && "border-red-400/50 bg-red-500",
                    isActive &&
                      "h-4 w-4 border-red-300 bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.5)]"
                  )}
                />

                <AccordionTrigger className="rounded-2xl border border-white/5 bg-neutral-900/60 px-4 py-3 text-left no-underline hover:no-underline">
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                        <span>{formatDate(item.date)}</span>
                        {isStart && (
                          <span className="rounded-full border border-red-400/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-200">
                            Início
                          </span>
                        )}
                        {showSpecialLabel && (
                          <span className="rounded-full border border-red-400/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-200">
                            Especial
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-2">
                  <TimelineItem
                    item={item}
                    variant="story"
                    isActive={isActive}
                    isSpecial={isSpecial}
                    showHeader={false}
                    size="comfortable"
                    eyebrowLabel={isStart ? "Início" : undefined}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative hidden overflow-x-auto pb-10 pt-6 scroll-smooth timeline-scrollbar snap-x snap-mandatory md:block"
      >
        <div className="relative min-w-max px-6 lg:px-10">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
          <motion.div
            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-red-500/70 to-transparent"
            style={prefersReducedMotion ? { scaleX: lineProgress } : undefined}
            animate={prefersReducedMotion ? undefined : { scaleX: lineProgress }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          />

          <ol
            className={cn(
              "relative grid grid-flow-col gap-8 px-2 py-8",
              isCompact
                ? "min-h-[380px] auto-cols-[minmax(15rem,1fr)] lg:auto-cols-[minmax(17rem,1fr)]"
                : "min-h-[520px] auto-cols-[minmax(18rem,1fr)] lg:auto-cols-[minmax(20rem,1fr)]"
            )}
            aria-label="Linha do tempo do casal"
          >
            {items.map((item, i) => {
              const isTop = i % 2 === 1;
              const isActive = currentActive === i;
              const isSpecial = isSpecialItem(item);
              const isStart = showStartMarker && i === 0;
              const MarkerIcon = isSpecial ? Sparkles : Heart;

              return (
                <motion.li
                  key={item.id}
                  ref={(element) => {
                    stepRefs.current[i] = element;
                  }}
                  initial={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, y: isTop ? -20 : 20 }
                  }
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative grid h-full snap-center grid-rows-[1fr_auto_1fr] items-center"
                >
                  <div
                    className={cn(
                      "flex flex-col items-center",
                      isTop
                        ? isCompact
                          ? "row-start-1 justify-end pb-6"
                          : "row-start-1 justify-end pb-12"
                        : isCompact
                          ? "row-start-3 justify-start pt-6"
                          : "row-start-3 justify-start pt-12"
                    )}
                  >
                    {isTop ? (
                      <>
                        <TimelineItem
                          item={item}
                          variant="story"
                          isActive={isActive}
                          isSpecial={isSpecial}
                          eyebrowLabel={isStart ? "Início" : undefined}
                          size={isCompact ? "compact" : "comfortable"}
                          className={cn(
                            isCompact ? "w-[15rem] lg:w-[17rem]" : "w-80"
                          )}
                        />
                        <div className="h-10 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div className="h-10 w-px bg-gradient-to-t from-red-500/50 to-transparent" />
                        <TimelineItem
                          item={item}
                          variant="story"
                          isActive={isActive}
                          isSpecial={isSpecial}
                          eyebrowLabel={isStart ? "Início" : undefined}
                          size={isCompact ? "compact" : "comfortable"}
                          className={cn(
                            isCompact ? "w-[15rem] lg:w-[17rem]" : "w-80"
                          )}
                        />
                      </>
                    )}
                  </div>

                  <motion.button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i, true)}
                    aria-label={`Ir para o momento ${item.title}`}
                    aria-current={isActive ? "step" : undefined}
                    animate={
                      isActive && !prefersReducedMotion
                        ? {
                            scale: [1, 1.12, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(239, 68, 68, 0.55)",
                              "0 0 0 14px rgba(239, 68, 68, 0)",
                            ],
                          }
                        : undefined
                    }
                    transition={
                      isActive && !prefersReducedMotion
                        ? { duration: 1.4, repeat: Infinity }
                        : { duration: 0 }
                    }
                    className={cn(
                      "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                      isActive
                        ? "border-red-400 bg-red-500 text-white shadow-[0_0_26px_rgba(239,68,68,0.45)]"
                        : isSpecial
                          ? "border-red-400/60 bg-neutral-900 text-red-200"
                          : "border-white/10 bg-neutral-900 text-red-300"
                    )}
                  >
                    <MarkerIcon className="h-5 w-5" />
                  </motion.button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-neutral-500 md:hidden">
        Toque em um momento para ver os detalhes.
      </p>
      <p className="mt-6 hidden text-center text-sm text-neutral-500 md:block">
        Arraste para o lado ou use o scroll para ver todos os momentos.
      </p>
    </div>
  );
}
