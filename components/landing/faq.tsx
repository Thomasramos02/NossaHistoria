"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quantas fotos posso armazenar?",
    answer:
      "Voce pode definir até 8 fotos em cada retrospectiva em qualquer formato(JPEG, PNG, etc)",
  },
  {
    question: "Posso editar a retrospectiva depois de pronta?",
    answer: "Não. Voce pode editar apenas durante o processo de criação.",
  },
  {
    question: "Preciso do e-mail do meu parceiro(a)?",
    answer: "Nao. Voce monta a surpresa e entrega com link secreto ou QR Code.",
  },
  {
    question: "Quanto tempo leva para montar?",
    answer:
      "Com o roteiro guiado, da para montar em 5-15 minutos. Voce pode salvar e continuar depois.",
  },
  {
    question: "Como funciona o pagamento unico?",
    answer:
      "Voce paga R$ 12,90 uma unica vez e tem acesso vitalicio a sua retrospectiva. Sem mensalidades.",
  },
  {
    question: "A retrospectiva é privada?",
    answer:
      "Sim. Voce escolhe entre link privado, senha e liberacao no dia. Seus dados ficam protegidos.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-10 top-6 -z-10 h-40 w-40 rounded-full bg-[#EF4444]/10 blur-[40px] sm:h-64 sm:w-64 sm:blur-[110px]" />
      <div className="pointer-events-none absolute right-8 bottom-4 -z-10 hidden h-72 w-72 rounded-full bg-[#EF4444]/10 blur-[130px] sm:block" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF4444]/6 blur-[140px] sm:block" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-balance text-center text-2xl font-bold text-[#FAFAFA] sm:text-3xl md:text-4xl lg:text-5xl">
          Perguntas Frequentes
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-[#A1A1AA] sm:mt-4 sm:text-base">
          Tire suas duvidas sobre a retrospectiva digital
        </p>

        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#262626] px-4 transition-colors data-[state=open]:border-[#EF4444]/30 sm:px-6"
              >
                <AccordionTrigger className="py-5 text-left text-[#FAFAFA] hover:text-[#EF4444] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] [&[data-state=open]>svg]:text-[#EF4444]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-[#A1A1AA]">
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
