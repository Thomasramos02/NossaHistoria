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
    question: "Como funciona o modo surpresa?",
    answer:
      "Você define a data do aniversário. Até lá, a retrospectiva fica privada com contagem regressiva. No dia, você libera o link ou o QR Code para a revelação.",
  },
  {
    question: "Posso editar a retrospectiva depois de pronta?",
    answer:
      "Sim. Você pode ajustar fotos, textos e capítulos sempre que quiser; tudo é atualizado imediatamente.",
  },
  {
    question: "Preciso do e-mail do meu parceiro(a)?",
    answer:
      "Não. Você monta a surpresa e entrega com link secreto ou QR Code.",
  },
  {
    question: "Quanto tempo leva para montar?",
    answer:
      "Com o roteiro guiado, dá para montar em 15–30 minutos. Você pode salvar e continuar depois.",
  },
  {
    question: "Como funciona o pagamento único?",
    answer:
      "Você paga R$ 49,90 uma única vez e tem acesso vitalício à sua retrospectiva. Sem mensalidades.",
  },
  {
    question: "A retrospectiva é privada?",
    answer:
      "Sim. Você escolhe entre link privado, senha e liberação no dia. Seus dados ficam protegidos.",
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
          Tire suas dúvidas sobre a retrospectiva digital
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
