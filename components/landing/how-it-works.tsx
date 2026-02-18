"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Timeline } from "@/components/timeline";
import { howItWorksItems } from "./how-it-works.data";

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();
  const titleId = "como-funciona-title";

  return (
    <section
      id="como-funciona"
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-28 bottom-0 -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-red-200/70">
            Cada dia é um momento
          </p>
          <h2
            id={titleId}
            className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Como Funciona
          </h2>
          <p className="mx-auto max-w-3xl text-base text-neutral-300 sm:text-lg lg:text-xl">
            Registre momentos, adicione fotos e detalhes, e deixe a timeline
            organizar tudo em uma história viva e compartilhável.
          </p>
        </motion.div>

        <div className="mt-16">
          <Timeline
            variant="story"
            items={howItWorksItems}
            density="compact"
            showStartMarker
          />
        </div>
      </div>
    </section>
  );
}
