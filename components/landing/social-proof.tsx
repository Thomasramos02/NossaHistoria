"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Star, Users, Heart, BarChart3 } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";

const stats = [
  { icon: Users, value: "500+", label: "Casais surpreendidos" },
  { icon: Heart, value: "2.500+", label: "Retrospectivas criadas" },
  { icon: BarChart3, value: "4.8", label: "Avaliação média", suffix: "★" },
];

const testimonials = [
  {
    quote:
      "O roteiro guiado nos ajudou a transformar memórias em capítulos. A revelação no aniversário foi perfeita.",
    name: "Ana & Pedro",
    status: "Juntos há 4 anos",
    rating: 5,
  },
  {
    quote:
      "Usei o modo surpresa com QR Code e minha namorada se emocionou no aniversário. Tudo ficou lindo!",
    name: "Mariana & Lucas",
    status: "Namorando há 3 anos",
    rating: 5,
  },
  {
    quote:
      "Montar a retrospectiva foi rápido e o link secreto deixou a entrega especial. Recomendo demais.",
    name: "Rafael & Júlia",
    status: "Juntos há 2 anos",
    rating: 5,
  },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="relative isolate overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute left-1/4 top-12 -z-10 h-64 w-64 rounded-full bg-[#EF4444]/8 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-[#EF4444]/7 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Stats Bar */}
        <div
          className={`grid gap-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#262626] p-6 sm:p-8 sm:grid-cols-3 ${
            visible ? (prefersReducedMotion ? "" : "animate-fade-up") : "opacity-0"
          }`}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <stat.icon className="mb-3 h-6 w-6 text-[#EF4444]/60" />
              <div className="text-3xl font-bold text-[#EF4444] sm:text-4xl lg:text-5xl">
                {stat.value}
                {stat.suffix && (
                  <span className="ml-1 text-3xl text-[#EF4444]">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-[#A1A1AA]">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-[#71717A]">
          Dados atualizados em {landingCopy.metricsUpdatedAt}.
        </p>

        {/* Testimonials */}
        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#262626] p-6 transition-all duration-500 hover:-translate-y-1 ${
                visible ? (prefersReducedMotion ? "" : "animate-fade-up") : "opacity-0"
              }`}
              style={{
                animationDelay: prefersReducedMotion ? "0s" : `${0.2 + i * 0.15}s`,
              }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[#EF4444] text-[#EF4444]"
                  />
                ))}
              </div>

              <blockquote className="text-sm italic leading-relaxed text-[#FAFAFA]/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-5 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EF4444]/15">
                  <Heart className="h-4 w-4 text-[#EF4444]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#FAFAFA]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#52525B]">
                    {testimonial.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
