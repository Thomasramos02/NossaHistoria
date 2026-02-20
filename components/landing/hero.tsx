import { Heart, ImageIcon, Calendar, Share2 } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { WaitlistCTAButton } from "@/components/landing/waitlist-cta-button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF4444]/6 blur-[42px] sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-6 -z-10 hidden h-72 w-72 rounded-full bg-[#EF4444]/8 blur-[110px] sm:block" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#EF4444]/20 bg-[#EF4444]/10 px-3 py-1 sm:mb-6 sm:px-4 sm:py-1.5">
            <Heart className="h-3 w-3 text-[#EF4444] sm:h-3.5 sm:w-3.5" />
            <span className="text-xs font-medium text-[#EF4444]">
              Surpreenda no aniversario de namoro
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-[#FAFAFA] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            A Historia de Amor de <span className="text-[#EF4444]">Voces</span>{" "}
            em uma Retrospectiva Inesquecivel
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:mt-6 sm:text-lg lg:text-xl">
            {landingCopy.valueProposition}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <WaitlistCTAButton
              label={landingCopy.primaryCtaLabel}
              showArrow
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-[#EF4444] px-6 text-sm font-semibold text-white shadow-lg shadow-[#EF4444]/25 transition-all hover:scale-[1.03] hover:bg-[#DC2626] hover:shadow-[#EF4444]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F] sm:h-14 sm:px-8 sm:text-base"
            />
          </div>

          <p className="mt-3 text-xs text-[#52525B] sm:mt-4 sm:text-sm">
            Sem cartao de credito - Garanta o presente com preco de lancamento
            (R$ 12,90)
          </p>
        </div>

        <div className="relative w-full max-w-sm flex-1 sm:max-w-md lg:max-w-lg">
          <div className="relative rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1A1A1A] p-4 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center gap-3 sm:mb-6">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/60 sm:h-3 sm:w-3" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#52525B]/40 sm:h-3 sm:w-3" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#52525B]/40 sm:h-3 sm:w-3" />
              </div>
              <div className="flex-1 rounded-md bg-[#262626] px-2 py-1 sm:px-3 sm:py-1.5">
                <span className="text-[10px] text-[#52525B] sm:text-xs">
                  nossahistoria.app/ana-e-pedro
                </span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: Heart,
                  title: "Comeco da nossa historia",
                  date: "Fev 2022",
                  color: "#EF4444",
                },
                {
                  icon: Calendar,
                  title: "Capitulo: nossa primeira viagem",
                  date: "Jul 2022",
                  color: "#DC2626",
                },
                {
                  icon: ImageIcon,
                  title: "Carta final",
                  date: "Mai 2024",
                  color: "#EF4444",
                },
                {
                  icon: Share2,
                  title: "Revelacao no aniversario",
                  date: "Jun 2024",
                  color: "#DC2626",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[#262626] p-3 sm:gap-4 sm:p-4"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#FAFAFA]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#52525B]">{item.date}</p>
                  </div>
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[#EF4444]/5 blur-[36px] sm:blur-2xl" />
        </div>
      </div>
    </section>
  );
}
