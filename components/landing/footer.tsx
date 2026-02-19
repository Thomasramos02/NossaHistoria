"use client";

import {
  ArrowUpRight,
  Heart,
  Instagram,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  Youtube,
} from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";

const footerLinks = {
  produto: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Planos", href: "#preços" },
    { label: "Depoimentos", href: "#social-proof" },
    { label: "FAQ", href: "#faq" },
  ],
  suporte: [
    { label: "Central de ajuda", href: "#" },
    { label: "Contato", href: "#" },
  ],
  legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos", href: "#" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "Telegram", href: "#", icon: Send },
];

export function Footer() {
  const isPlaceholderLink = (href: string) => href === "#";

  return (
    <footer className="relative isolate overflow-hidden border-t border-[rgba(255,255,255,0.08)] py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-56 w-56 -translate-y-1/2 rounded-full bg-[#EF4444]/9 blur-[100px]" />
      <div className="pointer-events-none absolute right-12 bottom-6 -z-10 h-64 w-64 rounded-full bg-[#EF4444]/8 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
            >
              <Heart className="h-5 w-5 text-[#EF4444]" />
              <span className="text-lg font-bold text-[#FAFAFA]">
                {landingCopy.brandName}
              </span>
            </a>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#A1A1AA]">
              Plataforma para criar uma retrospectiva digital do relacionamento
              e revelar uma surpresa no aniversário de namoro.
            </p>

            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  aria-disabled={
                    isPlaceholderLink(social.href) ? "true" : undefined
                  }
                  onClick={(event) => {
                    if (isPlaceholderLink(social.href)) event.preventDefault();
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#262626] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] ${
                    isPlaceholderLink(social.href)
                      ? "cursor-not-allowed text-[#6B7280]"
                      : "text-[#A1A1AA] hover:border-[#EF4444]/35 hover:text-[#EF4444]"
                  }`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAFAFA]">
              Produto
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-md text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAFAFA]">
              Suporte
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-disabled={
                      isPlaceholderLink(link.href) ? "true" : undefined
                    }
                    onClick={(event) => {
                      if (isPlaceholderLink(link.href)) event.preventDefault();
                    }}
                    className={`inline-flex items-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] ${
                      isPlaceholderLink(link.href)
                        ? "cursor-not-allowed text-[#6B7280]"
                        : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                    }`}
                  >
                    {link.label}
                    {isPlaceholderLink(link.href) && (
                      <span className="rounded-full border border-[rgba(255,255,255,0.12)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[#71717A]">
                        Em breve
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAFAFA]">
              Legal e contato
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-disabled={
                      isPlaceholderLink(link.href) ? "true" : undefined
                    }
                    onClick={(event) => {
                      if (isPlaceholderLink(link.href)) event.preventDefault();
                    }}
                    className={`inline-flex items-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] ${
                      isPlaceholderLink(link.href)
                        ? "cursor-not-allowed text-[#6B7280]"
                        : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                    }`}
                  >
                    {link.label}
                    {isPlaceholderLink(link.href) && (
                      <span className="rounded-full border border-[rgba(255,255,255,0.12)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[#71717A]">
                        Em breve
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:contato@nossahistoria.app"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#262626] px-3 py-2 text-sm text-[#FAFAFA] transition-colors hover:border-[#EF4444]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
            >
              <Mail className="h-4 w-4 text-[#EF4444]" />
              contato@nossahistoria.app
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.06)] pt-6 sm:flex-row">
          <p className="text-xs text-[#71717A]">
            &copy; 2026 {landingCopy.brandName}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#71717A]">
            Feito para transformar memórias em surpresa.
          </p>
        </div>
      </div>
    </footer>
  );
}
