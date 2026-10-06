"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";

type GalleryImage = { src: string; alt: string };
type GalleryLabels = {
  region: string;
  previous: string;
  next: string;
  view: string;
  position: string;
};

export function ProductGallery({
  images,
  title,
  labels,
}: {
  images: readonly GalleryImage[];
  title: string;
  labels: GalleryLabels;
}) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const multiple = images.length > 1;
  const selected = images[active];
  const move = (direction: number) =>
    setActive((index) => (index + direction + images.length) % images.length);
  const position = labels.position
    .replace("{current}", String(active + 1))
    .replace("{total}", String(images.length));

  // Reveal the selected thumbnail inside its own strip without scrolling the
  // page when an arrow, key or swipe selects an off-screen image.
  useEffect(() => {
    const strip = thumbnails.current;
    const button = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !button) return;
    const left = button.offsetLeft;
    const right = left + button.offsetWidth;
    if (left < strip.scrollLeft) strip.scrollLeft = left;
    else if (right > strip.scrollLeft + strip.clientWidth)
      strip.scrollLeft = right - strip.clientWidth;
  }, [active]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!multiple || event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowLeft":
        move(-1);
        break;
      case "ArrowRight":
        move(1);
        break;
      case "Home":
        setActive(0);
        break;
      case "End":
        setActive(images.length - 1);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (
      !multiple ||
      !start ||
      event.touches.length > 0 ||
      !event.changedTouches[0]
    )
      return;
    const end = event.changedTouches[0];
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5)
      move(dx < 0 ? 1 : -1);
  }

  return (
    <div
      className="product-gallery"
      role="region"
      aria-label={`${title} · ${labels.region}`}
      aria-roledescription={multiple ? "carousel" : undefined}
      data-image-count={images.length}
      onKeyDown={onKeyDown}
    >
      <div
        className="product-gallery-stage"
        tabIndex={multiple ? 0 : undefined}
        aria-label={multiple ? `${labels.region} · ${position}` : undefined}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current =
            touch && event.touches.length === 1
              ? { x: touch.clientX, y: touch.clientY }
              : null;
        }}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        <Image
          className="product-gallery-image"
          src={selected.src}
          alt={selected.alt}
          fill
          sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) 45vw, 30vw"
          onLoad={(event) => {
            const image = event.currentTarget;
            if (!image.animate) return;
            image.getAnimations().forEach((animation) => animation.cancel());
            image.animate([{ opacity: 0.65 }, { opacity: 1 }], {
              duration: 240,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            });
          }}
        />
        {multiple && (
          <>
            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow--previous"
              aria-label={labels.previous}
              onClick={() => move(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow--next"
              aria-label={labels.next}
              onClick={() => move(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="product-gallery-browse">
        <div className="product-gallery-thumbnails" ref={thumbnails}>
          {multiple &&
            images.map((image, index) => (
              <button
                type="button"
                key={image.src}
                aria-label={labels.view.replace("{number}", String(index + 1))}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={44}
                  height={44}
                  sizes="44px"
                />
              </button>
            ))}
        </div>
        <span
          className="product-gallery-position"
          aria-live="polite"
          aria-atomic="true"
          aria-label={position}
        >
          {active + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
