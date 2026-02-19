"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, Crown, Sparkles, Infinity } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { useWaitlist } from "@/components/landing/waitlist-provider";

const features = [
  "Roteiro guiado com perguntas por fase",
  "Capítulos e marcos com destaque",
  "Modo surpresa com contagem regressiva",
  "Revelação programada na data escolhida",
  "Carta final personalizada",
  "Até 10 fotos por momento",
  "Link secreto + QR Code para entregar",
  "Compartilhamento privado ou com senha",
  "Prévia antes do grande dia",
  "Edição a qualquer momento",
  "Sem marca d'água",
  "Suporte por email",
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCTA = () => {
    const checkoutTarget = document.querySelector<HTMLElement>(
      landingCopy.checkoutAnchor,
    );
    if (checkoutTarget) {
      checkoutTarget.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    openWaitlist();
  };

  return (
    <section
      ref={sectionRef}
      id="preços"
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#EF4444]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-8 top-24 -z-10 h-56 w-56 rounded-full bg-[#EF4444]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-[#EF4444]/9 blur-[130px]" />

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EF4444]">
            Preço
          </p>
          <h2 className="text-balance text-2xl font-bold text-[#FAFAFA] sm:text-3xl md:text-4xl">
            Um presente que dura para sempre
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#71717A]">
            Pagamento único. Sem mensalidade. Acesso vitalício.
          </p>
        </div>

        {/* Card */}
        <div
          className={`relative overflow-hidden rounded-2xl border border-[rgba(239,68,68,0.25)] bg-[#1C1C1C] transition-all duration-700 ${
            visible && !prefersReducedMotion
              ? "translate-y-0 opacity-100"
              : prefersReducedMotion
                ? ""
                : "translate-y-8 opacity-0"
          }`}
        >
          {/* Top accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#EF4444] to-transparent" />

          {/* Card inner */}
          <div className="p-7 sm:p-9">
            {/* Header row */}
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

              {/* Badge */}
              <span className="flex items-center gap-1.5 rounded-full bg-[#EF4444]/10 px-3 py-1 text-xs font-semibold text-[#EF4444] ring-1 ring-[#EF4444]/20">
                <Infinity className="h-3 w-3" />
                Vitalício
              </span>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            {/* Price */}
            <div className="flex items-end gap-3">
              <div>
                <div className="flex items-start gap-1">
                  <span className="mt-1.5 text-sm font-medium text-[#71717A]">
                    R$
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight text-[#FAFAFA]">
                    49
                  </span>
                  <span className="mt-2 text-2xl font-bold text-[#FAFAFA]">
                    ,90
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#52525B]">
                  pagamento único · sem renovação
                </p>
              </div>

              {/* Launch offer pill */}
              <div className="mb-5 ml-auto flex items-center gap-1.5 rounded-lg bg-[#EF4444]/8 px-3 py-1.5 ring-1 ring-[#EF4444]/15">
                <Sparkles className="h-3 w-3 text-[#EF4444]" />
                <span className="text-xs font-medium text-[#EF4444]">
                  Oferta de lançamento
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            {/* Features grid */}
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

            {/* Divider */}
            <div className="my-7 h-px bg-[rgba(255,255,255,0.06)]" />

            {/* CTA */}
            <button
              type="button"
              onClick={handleCTA}
              className="group relative w-full overflow-hidden rounded-xl bg-[#EF4444] py-4 text-sm font-bold text-white shadow-lg shadow-[#EF4444]/20 transition-all hover:bg-[#DC2626] hover:shadow-[#EF4444]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">
                Criar minha retrospectiva — R$ 49,90
              </span>
            </button>

            <p className="mt-3 text-center text-xs text-[#52525B]">
              💳 Cartão, Pix ou boleto · 🔒 Pagamento seguro
            </p>
          </div>

          {/* Bottom accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
