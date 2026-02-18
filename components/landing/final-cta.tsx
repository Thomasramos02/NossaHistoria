"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { useWaitlist } from "@/components/landing/waitlist-provider";

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  const { openWaitlist } = useWaitlist();

  return (
    <section
      id="comecar"
      className="relative isolate overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute left-10 top-8 -z-10 h-64 w-64 rounded-full bg-[#EF4444]/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 bottom-6 -z-10 h-72 w-72 rounded-full bg-[#EF4444]/10 blur-[120px]" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#EF4444]/7 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Heart
          className={`mx-auto mb-8 h-12 w-12 rounded-full text-white/80 ${
            prefersReducedMotion ? "" : "animate-pulse-glow"
          }`}
        />

        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
          Comece a Construir Sua História Hoje
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-lg text-white/80">
          {landingCopy.valueProposition}
        </p>

        <button
          type="button"
          onClick={openWaitlist}
          className="group mt-10 inline-flex h-16 items-center gap-3 rounded-2xl bg-white px-10 text-lg font-bold text-[#EF4444] shadow-2xl shadow-black/20 transition-all hover:scale-[1.03] hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
        >
          {landingCopy.primaryCtaLabel}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-5 text-sm text-white/60">
          Junte-se a centenas de casais
        </p>
      </div>
    </section>
  );
}
