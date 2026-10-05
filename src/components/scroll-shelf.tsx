"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "./locale-provider";
import { AppIcon } from "./app-icon";

export function ScrollShelf({
  children,
  kind,
}: {
  children: ReactNode;
  kind: "fabrics" | "techniques";
}) {
  const { isThai } = useLocale();
  const shelf = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    id: number;
    x: number;
    left: number;
    moved: boolean;
  } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const name =
    kind === "fabrics"
      ? isThai
        ? "ผ้า"
        : "fabrics"
      : isThai
        ? "เทคนิคการผลิต"
        : "techniques";

  useEffect(() => {
    const element = shelf.current;
    if (!element) return;
    const measure = () => {
      const start = element.scrollLeft < 2;
      const end =
        element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      setEdges((previous) =>
        previous.start === start && previous.end === end
          ? previous
          : { start, end },
      );
    };
    measure();
    element.addEventListener("scroll", measure, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    return () => {
      element.removeEventListener("scroll", measure);
      resize.disconnect();
    };
  }, []);

  const advance = (direction: number) => {
    const element = shelf.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 24;
    element.scrollBy({
      left:
        direction * ((card?.offsetWidth ?? element.clientWidth * 0.85) + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const release = () => {
    const element = shelf.current;
    if (element && drag.current) {
      if (element.hasPointerCapture(drag.current.id))
        element.releasePointerCapture(drag.current.id);
      delete element.dataset.dragging;
    }
    drag.current = null;
  };

  return (
    <div className="scroll-shelf">
      <div className="shelf-controls">
        <p className="micro">
          {isThai ? "เลื่อนเพื่อสำรวจ" : "Scroll to explore"}
        </p>
        <div>
          <button
            type="button"
            disabled={edges.start}
            aria-label={isThai ? `ดู${name}ก่อนหน้า` : `Previous ${name}`}
            onClick={() => advance(-1)}
          >
            <AppIcon name="forward" className="shelf-previous" />
          </button>
          <button
            type="button"
            disabled={edges.end}
            aria-label={isThai ? `ดู${name}ถัดไป` : `Next ${name}`}
            onClick={() => advance(1)}
          >
            <AppIcon name="forward" />
          </button>
        </div>
      </div>
      <div
        ref={shelf}
        className="shelf-track"
        tabIndex={0}
        role="region"
        aria-label={isThai ? `สำรวจ${name}` : `Explore ${name}`}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            advance(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onPointerDown={(event) => {
          if (
            event.pointerType !== "mouse" ||
            event.button !== 0 ||
            (event.target as Element).closest(
              "a, button, input, select, textarea",
            )
          )
            return;
          drag.current = {
            id: event.pointerId,
            x: event.clientX,
            left: event.currentTarget.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start) return;
          const distance = event.clientX - start.x;
          if (!start.moved && Math.abs(distance) < 6) return;
          start.moved = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.dataset.dragging = "true";
          event.currentTarget.scrollLeft = start.left - distance;
          event.preventDefault();
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onPointerLeave={() => {
          if (!drag.current?.moved) release();
        }}
      >
        {children}
      </div>
    </div>
  );
}
