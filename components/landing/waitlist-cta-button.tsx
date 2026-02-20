"use client";

import { ArrowRight } from "lucide-react";
import { useWaitlist } from "@/components/landing/waitlist-provider";

type WaitlistCTAButtonProps = {
  className?: string;
  label?: string;
  showArrow?: boolean;
};

export function WaitlistCTAButton({
  className,
  label = "Criar minha retrospectiva",
  showArrow = false,
}: WaitlistCTAButtonProps) {
  const { openWaitlist } = useWaitlist();

  return (
    <button type="button" onClick={openWaitlist} className={className}>
      {label}
      {showArrow ? <ArrowRight className="h-5 w-5" /> : null}
    </button>
  );
}

