"use client";

import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { landingCopy } from "@/lib/landing-copy";
import { useWaitlist } from "@/components/landing/waitlist-provider";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Preços", href: "#preços" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent backdrop-blur-sm border-b border-[rgba(255,255,255,0.04)]"
      }`}
    >
      {/* red ambient glows */}
      <div className="pointer-events-none absolute -left-16 top-[-48px] h-44 w-44 rounded-full bg-[#EF4444]/12 blur-[90px]" />
      <div className="pointer-events-none absolute right-8 bottom-[-52px] h-48 w-48 rounded-full bg-[#EF4444]/10 blur-[110px]" />

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]"
        >
          <Heart className="h-6 w-6 text-[#EF4444] transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold text-[#FAFAFA] tracking-tight">
            {landingCopy.brandName}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-1 py-1 text-sm font-medium text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          type="button"
          onClick={openWaitlist}
          className="hidden rounded-lg bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#DC2626] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F] md:inline-flex"
        >
          {landingCopy.primaryCtaLabel}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F] md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-20 border-b border-[rgba(255,255,255,0.06)] bg-[#0F0F0F]/95 backdrop-blur-xl md:hidden">
          <nav
            className="flex flex-col gap-1 px-6 py-4"
            aria-label="Navegação mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#A1A1AA] transition-colors hover:bg-[#262626] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-2 rounded-lg bg-[#EF4444] px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#DC2626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]"
              onClick={() => {
                openWaitlist();
                setMobileMenuOpen(false);
              }}
            >
              {landingCopy.primaryCtaLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
