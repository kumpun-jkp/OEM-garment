"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { attachSilkMotion } from "@/lib/motion";

export function MotionSurface({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (root.current) return attachSilkMotion(root.current);
  }, [pathname]);
  return (
    <main ref={root} id="main-content" tabIndex={-1}>
      {children}
    </main>
  );
}
