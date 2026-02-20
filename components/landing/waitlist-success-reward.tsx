"use client";

import { useEffect } from "react";
import { useReward } from "partycles";

const REWARD_ID = "waitlist-submit-reward";

export function WaitlistSuccessReward() {
  const { reward } = useReward(REWARD_ID, "hearts", {
    particleCount: 20,
    spread: 80,
    elementSize: 20,
    startVelocity: 20,
    lifetime: 200,
    decay: 0.92,
    effects: { pulse: true },
  });

  useEffect(() => {
    reward();
  }, [reward]);

  return (
    <span
      id={REWARD_ID}
      className="pointer-events-none absolute left-1/2 top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    />
  );
}

