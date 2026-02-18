"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, Crown, Heart } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { useWaitlist } from "@/components/landing/waitlist-provider";

type PlanFeature = {
  text: string;
  type: "ok" | "warn";
};

type Plan = {
  name: string;
  icon: typeof Heart;
  description: string;
  features: PlanFeature[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Timeline",
    icon: Crown,
    description:
      "Crie e preserve toda a história do seu amor em uma timeline linda e organizada. Pagamento único, acesso vitalício.",
    badge: "Vitalício",
    features: [
      { text: "Momentos ilimitados", type: "ok" },
      { text: "Até 10 fotos por momento", type: "ok" },
      { text: "Marcos especiais com destaque", type: "ok" },
      { text: "Timeline horizontal interativa", type: "ok" },
      { text: "Compartilhamento público ou privado", type: "ok" },
      { text: "Link privado vitalício", type: "ok" },
      { text: "QR Code de acesso personalizado", type: "ok" },
      { text: "Adicionar fotos a qualquer momento", type: "ok" },
      { text: "Contador de dias juntos", type: "ok" },
      { text: "Sem marca d'água", type: "ok" },
      { text: "Suporte por email", type: "ok" },
    ],
    cta: "Criar Minha Timeline - R$ 49,90",
    highlighted: true,
  },
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

  const handlePlanCTA = () => {
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
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#EF4444]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-8 top-24 -z-10 h-56 w-56 rounded-full bg-[#EF4444]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-[#EF4444]/9 blur-[130px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-balance text-center text-2xl font-bold text-[#FAFAFA] sm:text-3xl md:text-4xl lg:text-5xl">
          Escolha seu plano
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#A1A1AA] sm:mt-4 sm:text-base">
          {landingCopy.valueProposition}
        </p>

        <div className="mt-10 flex justify-center sm:mt-16">
          {plans.map((plan, i) => {
            return (
              <div
                key={plan.name}
                className={`relative w-full max-w-xl rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#262626] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${
                  plan.highlighted ? "ring-1 ring-[#EF4444]/40" : ""
                } ${
                  visible
                    ? prefersReducedMotion
                      ? ""
                      : "animate-fade-up"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: prefersReducedMotion ? "0s" : `${i * 0.15}s`,
                  ...(plan.highlighted
                    ? { transform: "translateY(-8px)" }
                    : {}),
                }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <plan.icon
                    className={`h-6 w-6 ${
                      plan.highlighted ? "text-white" : "text-[#EF4444]"
                    }`}
                  />
                  <h3
                    className={`text-lg font-bold ${
                      plan.highlighted ? "text-white" : "text-[#FAFAFA]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-2">
                  <span
                    className={`text-3xl font-extrabold ${
                      plan.highlighted ? "text-white" : "text-[#FAFAFA]"
                    }`}
                  >
                    R$ 49,90
                  </span>
                  <span
                    className={`ml-1.5 text-sm ${
                      plan.highlighted ? "text-white/80" : "text-[#52525B]"
                    }`}
                  >
                    {" "}
                    pagamento único
                  </span>
                </div>

                <p
                  className={`mb-4 text-xs font-semibold uppercase tracking-[0.1em] ${
                    plan.highlighted ? "text-white/80" : "text-[#F87171]"
                  }`}
                >
                  Vitalício
                </p>

                <p
                  className={`mb-6 text-sm leading-relaxed ${
                    plan.highlighted ? "text-white/80" : "text-[#A1A1AA]"
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mb-7 grid gap-2.5 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-center gap-2.5"
                    >
                      {feature.type === "ok" ? (
                        <Check
                          className={`h-4 w-4 shrink-0 ${
                            plan.highlighted ? "text-white" : "text-[#EF4444]"
                          }`}
                        />
                      ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-300" />
                      )}
                      <span
                        className={`text-sm ${
                          plan.highlighted ? "text-white/90" : "text-[#A1A1AA]"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={handlePlanCTA}
                  aria-label={`Selecionar plano ${plan.name}`}
                  className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] ${
                    plan.highlighted
                      ? "bg-white text-[#EF4444] shadow-lg hover:bg-[#FAFAFA]"
                      : "border border-[#EF4444] bg-transparent text-[#EF4444] hover:bg-[#EF4444]/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
