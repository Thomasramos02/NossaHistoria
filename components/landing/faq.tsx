"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o pagamento único?",
    answer:
      "Você paga R$ 49,90 uma única vez e tem acesso vitalício à sua timeline. Sem mensalidades, sem surpresas. Crie momentos ilimitados e preserve suas memórias para sempre.",
  },
  {
    question: "Como garanto que não vou perder o acesso?",
    answer:
      "Ao criar sua timeline, você recebe um QR Code exclusivo e um link privado por email. Salve o QR Code, adicione o link aos favoritos ou guarde o email. Se perder, é só recuperar pelo email cadastrado.",
  },
  {
    question: "Posso compartilhar minha timeline?",
    answer:
      "Sim! Você pode gerar um link de compartilhamento público ou protegido por senha. Escolha quem pode ver sua história ou mantenha totalmente privada.",
  },
  {
    question: "Quantas fotos posso adicionar?",
    answer:
      "Você pode criar momentos ilimitados e adicionar até 10 fotos em cada momento. O sistema comprime automaticamente as imagens mantendo a qualidade visual.",
  },
  {
    question: "Meus dados são seguros?",
    answer:
      "Absolutamente. Suas fotos são armazenadas com criptografia, seu link é único e privado, e nunca compartilhamos seus dados com terceiros.",
  },
  {
    question: "Funciona no celular?",
    answer:
      "Sim! A timeline funciona perfeitamente em smartphones, tablets e computadores. Acesse de qualquer dispositivo, a qualquer hora.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-10 top-6 -z-10 h-64 w-64 rounded-full bg-[#EF4444]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-8 bottom-4 -z-10 h-72 w-72 rounded-full bg-[#EF4444]/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF4444]/6 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-[#FAFAFA] sm:text-3xl md:text-4xl lg:text-5xl text-balance">
          Perguntas Frequentes
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-[#A1A1AA] sm:mt-4 sm:text-base">
          Tire suas dúvidas sobre a Timeline do Casal
        </p>

        <div className={`mt-12 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#262626] px-4 sm:px-6 data-[state=open]:border-[#EF4444]/30 transition-colors"
              >
                <AccordionTrigger className="py-5 text-left text-[#FAFAFA] hover:text-[#EF4444] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] [&[data-state=open]>svg]:text-[#EF4444]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#A1A1AA] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
