import { Heart } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { WaitlistCTAButton } from "@/components/landing/waitlist-cta-button";

export function FinalCTA() {
  return (
    <section
      id="comecar"
      className="relative isolate overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute left-10 top-8 -z-10 h-40 w-40 rounded-full bg-[#EF4444]/10 blur-[42px] sm:h-64 sm:w-64 sm:blur-[100px]" />
      <div className="pointer-events-none absolute right-10 bottom-6 -z-10 hidden h-72 w-72 rounded-full bg-[#EF4444]/10 blur-[120px] sm:block" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF4444]/7 blur-[46px] sm:h-[500px] sm:w-[500px] sm:blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Heart className="mx-auto mb-8 h-12 w-12 rounded-full text-white/80 animate-pulse-glow" />

        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
          Prepare a surpresa que vai marcar o aniversário de namoro
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-lg text-white/80">
          {landingCopy.valueProposition}
        </p>

        <WaitlistCTAButton
          label={landingCopy.primaryCtaLabel}
          showArrow
          className="group mt-10 inline-flex h-16 items-center gap-3 rounded-2xl bg-white px-10 text-lg font-bold text-[#EF4444] shadow-2xl shadow-black/20 transition-all hover:scale-[1.03] hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
        />

        <p className="mt-5 text-sm text-white/60">
          Junte-se a casais preparando a surpresa
        </p>
      </div>
    </section>
  );
}
