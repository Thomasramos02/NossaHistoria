"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EmotionalPreview } from "@/components/landing/emotional-preview";
import { Iphone17Pro } from "@/components/ui/iphone-17-pro";

export function IPhone17ProDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:mx-0 lg:justify-self-end lg:max-w-[320px] xl:max-w-[360px]">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-gradient-to-br from-rose-500/30 via-red-500/10 to-transparent blur-3xl" />
      <Iphone17Pro className="h-auto w-full text-neutral-900 drop-shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />
      <div className="absolute left-[7%] top-[3.2%] h-[93.6%] w-[86%] overflow-hidden rounded-[22px] bg-neutral-950">
        <EmotionalPreview variant="screen" className="h-full w-full" />
      </div>
    </div>
  );
}

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
        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            className="text-center lg:pt-6 lg:text-left"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-red-200/70">
              O resultado que emociona
            </p>
            <h2
              id={titleId}
              className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              A surpresa pronta para o aniversário
            </h2>
            <p className="mx-auto max-w-2xl text-base text-neutral-300 sm:text-lg lg:mx-0 lg:max-w-xl lg:text-xl">
              Uma retrospectiva que entrega emoção: carta final, capítulos
              marcantes e a revelação perfeita no aniversário de namoro.
            </p>
          </motion.div>

          <IPhone17ProDemo />
        </div>
      </div>
    </section>
  );
}
