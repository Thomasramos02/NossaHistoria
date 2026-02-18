"use client";

import { useEffect, useState } from "react";

export function VerticalTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [markers, setMarkers] = useState<number[]>([]);

  useEffect(() => {
    const calculateMarkers = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section, footer")
      );

      if (scrollableHeight <= 0 || sections.length === 0) {
        setMarkers([0, 1]);
        return;
      }

      const positions = sections.map((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        return Math.min(Math.max(sectionTop / scrollableHeight, 0), 1);
      });

      setMarkers(positions);
    };

    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(window.scrollY / scrollableHeight, 1);
      setScrollProgress(progress);
    };

    calculateMarkers();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateMarkers);

    const delayedRecalc = window.setTimeout(calculateMarkers, 400);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateMarkers);
      window.clearTimeout(delayedRecalc);
    };
  }, []);

  const allDots = markers.length > 0 ? markers : [0, 0.2, 0.4, 0.6, 0.8, 1];
  const dots = allDots.slice(1);

  return (
    <div
      className="pointer-events-none fixed left-3 top-0 z-40 hidden h-screen xl:block"
      aria-hidden="true"
    >
      <div className="relative h-full w-px">
        <div className="pointer-events-none absolute -left-10 top-1/4 h-32 w-32 rounded-full bg-[#EF4444]/12 blur-[90px]" />
        <div className="pointer-events-none absolute -right-12 bottom-1/6 h-36 w-36 rounded-full bg-[#EF4444]/10 blur-[100px]" />
        {/* Progress line */}
        <div className="absolute left-0 top-0 h-full w-px bg-[#EF4444]/10" />
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#EF4444]/50 to-[#EF4444]/20"
          style={{
            height: `${scrollProgress * 100}%`,
            transition: "height 0.15s linear",
          }}
        />

        {/* Dots */}
        {dots.map((position, i) => {
          const isActive = scrollProgress >= position - 0.01;
          return (
            <div
              key={`${position}-${i}`}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: `${position * 100}%`,
                opacity: isActive ? 1 : 0.15,
                transition: "opacity 0.4s ease-out",
              }}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2.5 w-2.5 bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                    : "h-2 w-2 bg-[#EF4444]/50"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
