import { EmotionalPreview } from "@/components/landing/emotional-preview";

export default function TimelinePage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-200/70">
            Preview emocional
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            A surpresa pronta para emocionar no aniversário
          </h1>
          <p className="mt-4 text-base text-neutral-300 sm:text-lg">
            Uma retrospectiva digital com carta final, capítulos marcantes e
            revelação perfeita para o grande dia.
          </p>
        </div>

        <EmotionalPreview className="mt-12" />
      </main>
    </div>
  );
}
