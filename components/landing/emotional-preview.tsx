"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart, Lock, MapPin, Music, Play, ChevronRight } from "lucide-react";

type EmotionalPreviewProps = {
  className?: string;
  variant?: "frame" | "screen";
};

const photos = [
  "bg-gradient-to-br from-rose-400/40 via-red-500/30 to-orange-400/20",
  "bg-gradient-to-br from-amber-400/40 via-rose-400/30 to-red-500/20",
  "bg-gradient-to-br from-red-400/40 via-pink-500/30 to-rose-400/20",
  "bg-gradient-to-br from-orange-400/40 via-red-400/30 to-rose-500/20",
];

const chapters = [
  { emoji: "☕", label: "Onde tudo começou", count: "8 fotos" },
  { emoji: "✈️", label: "Nossa primeira viagem", count: "12 fotos" },
  { emoji: "🏠", label: "Nosso lar", count: "6 fotos" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: "easeOut", delay },
  };
}

export function EmotionalPreview({
  className,
  variant = "frame",
}: EmotionalPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  const mp = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : fadeUp(delay);

  const screen = (
    <div
      className={cn(
        "relative h-full overflow-hidden",
        variant === "screen"
          ? "bg-[#0D0D0D] p-4 pt-8"
          : "rounded-[2.2rem] bg-[#0D0D0D] p-4 pt-10",
      )}
    >
      {/* Top & bottom fade */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-10 bg-gradient-to-b from-[#0D0D0D] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-[#0D0D0D] to-transparent" />

      {/* Scrollbar hint */}
      <div className="pointer-events-none absolute right-1.5 top-10 bottom-10 z-10 w-[2px] rounded-full bg-white/8">
        <div className="mt-8 h-16 rounded-full bg-white/25" />
      </div>

      <div className="space-y-3.5 pb-20">
        {/* ── Hero cover ── */}
        <motion.div
          {...mp(0)}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EF4444]/30 via-rose-600/20 to-[#0D0D0D] p-5"
        >
          {/* Subtle texture */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent_60%)]" />

          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-1.5">
              <Heart className="h-3 w-3 fill-[#EF4444] text-[#EF4444]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#EF4444]">
                Retrospectiva
              </p>
            </div>
            <h3 className="text-xl font-bold leading-tight text-white">
              Ana & Pedro
            </h3>
            <p className="mt-1 text-xs text-white/50">
              3 anos juntos · 10 Jun 2024
            </p>

            {/* Photo strip */}
            <div className="mt-4 flex gap-2">
              {photos.map((bg, i) => (
                <div
                  key={i}
                  className={`h-12 flex-1 rounded-xl ${bg} ring-1 ring-white/10`}
                />
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-4 flex gap-3">
              {[
                { val: "4", label: "capítulos" },
                { val: "36", label: "fotos" },
                { val: "1", label: "carta" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-base font-bold text-white">
                    {s.val}
                  </span>
                  <span className="text-[10px] text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Music playing ── */}
        <motion.div
          {...mp(0.07)}
          className="flex items-center gap-3 rounded-2xl border border-white/6 bg-neutral-900/70 px-4 py-3"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EF4444]/15 ring-1 ring-[#EF4444]/20">
            <Music className="h-3.5 w-3.5 text-[#EF4444]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">
              Perfect — Ed Sheeran
            </p>
            <p className="text-[10px] text-white/40">Nossa música</p>
          </div>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/8">
            <Play className="h-3 w-3 fill-white text-white" />
          </div>
        </motion.div>

        {/* ── Chapters ── */}
        <motion.div
          {...mp(0.13)}
          className="rounded-2xl border border-white/6 bg-neutral-900/70 p-4"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Capítulos
          </p>
          <ul className="space-y-2">
            {chapters.map((ch, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/4 px-3 py-2.5"
              >
                <span className="text-base">{ch.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-neutral-200">
                    {ch.label}
                  </p>
                  <p className="text-[10px] text-neutral-500">{ch.count}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-neutral-600" />
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Final letter ── */}
        <motion.div
          {...mp(0.19)}
          className="rounded-2xl border border-white/6 bg-neutral-900/70 p-4"
        >
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-sm">💌</span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Carta final
            </p>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">
            "Obrigada por transformar cada dia em algo especial. Hoje quero te
            mostrar tudo que construímos juntos."
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-neutral-600">
              Com amor, no nosso aniversário ❤️
            </p>
          </div>
        </motion.div>

        {/* ── Reveal button ── */}
        <motion.div {...mp(0.25)}>
          <div className="flex items-center gap-2 rounded-2xl bg-[#EF4444]/10 px-4 py-3 ring-1 ring-[#EF4444]/20">
            <Lock className="h-3.5 w-3.5 shrink-0 text-[#EF4444]" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#EF4444]">
                Revelação programada
              </p>
              <p className="text-[10px] text-[#EF4444]/60">
                Disponível em 10 Jun 2025
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (variant === "screen") {
    return <div className={cn("h-full w-full", className)}>{screen}</div>;
  }

  return (
    <div className={cn("mx-auto w-full max-w-4xl", className)}>
      <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="relative rounded-[2.75rem] border border-white/10 bg-neutral-900/70 p-3 shadow-2xl">
          <div className="pointer-events-none absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-neutral-800" />
          {screen}
        </div>
      </div>
    </div>
  );
}
