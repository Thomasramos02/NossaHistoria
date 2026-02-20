"use client";

import { useEffect, useState, type FormEvent } from "react";
import { WaitlistSuccessReward } from "@/components/landing/waitlist-success-reward";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [leadEmail, setLeadEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (!open) {
      setLeadEmail("");
      setEmailError("");
      setLeadCaptured(false);
      setShowReward(false);
    }
  }, [open]);

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = leadEmail.trim();

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setEmailError("Esse e-mail já está cadastrado.");
        return;
      }

      if (res.status === 400) {
        setEmailError("Digite um e-mail válido para receber o aviso.");
        return;
      }

      if (!res.ok) {
        setEmailError("Não foi possível salvar. Tente novamente.");
        return;
      }

      setEmailError("");
      setShowReward(true);
      setTimeout(() => {
        setLeadCaptured(true);
      }, 800);
    } catch {
      setEmailError("Não foi possível salvar. Tente novamente.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#1A1A1A] p-6 shadow-2xl">
        {showReward && !leadCaptured ? <WaitlistSuccessReward /> : null}

        <h3 id="waitlist-title" className="text-xl font-bold text-[#FAFAFA]">
          Estamos quase lá!
        </h3>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          A retrospectiva digital está em preparação final. Deixe seu e-mail
          para ser um dos primeiros a criar a surpresa do aniversário.
        </p>

        {leadCaptured ? (
          <div id="waitlist-success" className="mt-4 space-y-2">
            <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
              Cadastro realizado com sucesso!
            </p>
            <p className="text-xs text-[#A1A1AA]">
              Você receberá um email assim que a retrospectiva estiver
              disponível.
            </p>
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={handleLeadSubmit}>
            <label
              htmlFor="waitlist-lead-email"
              className="block text-sm font-medium text-[#E4E4E7]"
            >
              Seu melhor e-mail
            </label>
            <input
              id="waitlist-lead-email"
              type="email"
              value={leadEmail}
              onChange={(event) => {
                setLeadEmail(event.target.value);
                setEmailError("");
              }}
              className="w-full rounded-lg border border-[rgba(255,255,255,0.16)] bg-[#262626] px-3 py-2 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
            {emailError ? (
              <p className="text-xs text-red-400">{emailError}</p>
            ) : null}

            <button
              id="submit-btn"
              type="submit"
              className="w-full rounded-lg bg-[#EF4444] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#DC2626] hover:shadow-lg hover:shadow-[#EF4444]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
            >
              Quero ser avisado do lançamento
            </button>

            <p className="text-center text-xs text-[#71717A]">
              Oferta especial de lançamento: R$ 12,90 (ao invés de R$ 24,90)
            </p>
          </form>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg border border-[rgba(255,255,255,0.14)] px-4 py-2 text-sm font-medium text-[#A1A1AA] transition-colors hover:border-[rgba(255,255,255,0.24)] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
