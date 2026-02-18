"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WaitlistModal } from "@/components/landing/waitlist-modal";

type WaitlistContextValue = {
  openWaitlist: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openWaitlist = useCallback(() => {
    setOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(() => ({ openWaitlist }), [openWaitlist]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal open={open} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);

  if (!context) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }

  return context;
}
