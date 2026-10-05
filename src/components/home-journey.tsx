"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./locale-provider";

const chapters = [
  ["home-partner", "Our approach", "แนวทางของเรา"],
  ["customers", "Customers", "ลูกค้าของเรา"],
  ["product-showcase", "Garments", "เสื้อผ้า"],
  ["home-process", "Process", "ขั้นตอน"],
  ["home-quality", "Quality", "คุณภาพ"],
  ["home-contact", "Let’s talk", "คุยกับเรา"],
] as const;

export function HomeJourney() {
  const { isThai } = useLocale();
  const [current, setCurrent] = useState<string>(chapters[0][0]);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (arriving[0]) setCurrent(arriving[0].target.id);
      },
      { rootMargin: "-25% 0px -50% 0px", threshold: 0 },
    );
    chapters.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Keep the current chapter visible in the touch-scrollable navigation only.
    const rail = nav.current?.querySelector<HTMLElement>(".journey-links");
    const link = rail?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!rail || !link) return;
    rail.scrollTo({
      left: Math.max(
        0,
        link.offsetLeft -
          rail.offsetLeft -
          (rail.clientWidth - link.clientWidth) / 2,
      ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [current]);

  return (
    <nav
      ref={nav}
      className="home-journey"
      aria-label={isThai ? "สำรวจหน้าแรก" : "Explore this page"}
    >
      <div className="container journey-links">
        {chapters.map(([id, en, th], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={current === id ? "location" : undefined}
          >
            <span className="journey-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {isThai ? th : en}
          </a>
        ))}
      </div>
    </nav>
  );
}
