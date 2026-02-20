"use client";

import { Check, Crown, Infinity, Sparkles } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { useWaitlist } from "@/components/landing/waitlist-provider";

const features = [
  "Criação guiada com perguntas emocionais",
  "Envio de 5 a 8 fotos organizadas em momentos",
  "Mensagem final personalizada",
  "Escolha entre temas prontos e elegantes",
  "Prévia completa antes da publicação",
  "Link exclusivo para compartilhar",
  "QR Code automático para entregar",
  "Acesso disponível por 12 meses",
  "Suporte por email",
];

export function Pricing() {
  const { openWaitlist } = useWaitlist();

  const handleCTA = () => {
    const checkoutTarget = document.querySelector<HTMLElement>(
      landingCopy.checkoutAnchor,
    );

    if (checkoutTarget) {
      checkoutTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    openWaitlist();
  };

  return (
    <section
      id="preços"
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-44 w-44 rounded-full bg-[#EF4444]/10 blur-[40px] sm:h-72 sm:w-72 sm:blur-[110px]" />
      <div className="pointer-events-none absolute right-8 top-24 -z-10 hidden h-56 w-56 rounded-full bg-[#EF4444]/12 blur-[120px] sm:block" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 hidden h-80 w-80 rounded-full bg-[#EF4444]/9 blur-[130px] sm:block" />

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EF4444]">
            Preco
          </p>
          <h2 className="text-balance text-2xl font-bold text-[#FAFAFA] sm:text-3xl md:text-4xl">
            Um presente que dura para sempre
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#71717A]">
            Pagamento unico. Sem mensalidade. Acesso vitalicio.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[rgba(239,68,68,0.25)] bg-[#1C1C1C]">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#EF4444] to-transparent" />

          <div className="p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EF4444]/10 ring-1 ring-[#EF4444]/20">
                  <Crown className="h-5 w-5 text-[#EF4444]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#FAFAFA]">
                    Retrospectiva
                  </h3>
                  <p className="text-xs text-[#71717A]">Acesso completo</p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 rounded-full bg-[#EF4444]/10 px-3 py-1 text-xs font-semibold text-[#EF4444] ring-1 ring-[#EF4444]/20">
                <Infinity className="h-3 w-3" />
                Vitalicio
              </span>
            </div>

            <div className="my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            <div className="flex items-end gap-3">
              <div>
                <p className="mb-1 text-sm text-[#71717A] line-through">
                  R$ 24,90
                </p>
                <div className="flex items-start gap-1">
                  <span className="mt-1.5 text-sm font-medium text-[#71717A]">
                    R$
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight text-[#FAFAFA]">
                    12
                  </span>
                  <span className="mt-2 text-2xl font-bold text-[#FAFAFA]">
                    ,90
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#52525B]">
                  pagamento unico - sem renovacao
                </p>
              </div>

              <div className="mb-5 ml-auto flex items-center gap-1.5 rounded-lg bg-[#EF4444]/8 px-3 py-1.5 ring-1 ring-[#EF4444]/15">
                <Sparkles className="h-3 w-3 text-[#EF4444]" />
                <span className="text-xs font-medium text-[#EF4444]">
                  Oferta de lançamento
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EF4444]/12">
                    <Check className="h-2.5 w-2.5 text-[#EF4444]" />
                  </div>
                  <span className="text-sm text-[#A1A1AA]">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="my-7 h-px bg-[rgba(255,255,255,0.06)]" />

            <button
              type="button"
              onClick={handleCTA}
              className="group relative w-full overflow-hidden rounded-xl bg-[#EF4444] py-4 text-sm font-bold text-white shadow-lg shadow-[#EF4444]/20 transition-all hover:bg-[#DC2626] hover:shadow-[#EF4444]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative inline-flex items-center gap-2">
                <span>Criar minha retrospectiva</span>
                <span className="text-white/75 line-through">R$ 24,90</span>
                <span>R$ 12,90</span>
              </span>
            </button>

            <p className="mt-3 text-center text-xs text-[#52525B]">
              Cartao, Pix ou boleto - Pagamento seguro
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
