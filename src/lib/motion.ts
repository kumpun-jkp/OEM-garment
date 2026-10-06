// Motion enhances visible server content. Never hide a whole section or move
// both a card and its children; interaction feedback remains independent.
const revealTargets = [
  ".section-header",
  ".why-copy > *",
  ".home-facts > div",
  ".home-reason-grid > article",
  ".home-quality-grid > article",
  ".showcase-grid > a",
  ".showcase-children",
  ".stage-grid > li",
  ".capability-card",
  ".project-card",
  ".article-card",
  ".photo",
  ".metrics > div",
  ".cta-grid > div > h2",
  ".cta-grid > div > p",
  ".cta-grid > div > .button-row",
  ".contact-block",
  ".customer-logos",
  ".showcase-heading",
  ".work-editorial",
  ".split-label",
  ".faq-list",
].join(",");
const SILK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(value, max));

// Keep every photo's maximum shift inside its scaled, clipped image area.
export function silkPhotoDepth(
  progress: number,
  height: number,
  compact: boolean,
) {
  const travel = Math.min(
    compact ? 18 : 36,
    Math.max(0, height) * (compact ? 0.04 : 0.07),
  );
  return { y: (clamp(progress) * 2 - 1) * travel, scale: compact ? 1.1 : 1.16 };
}

export function silkHeroDepth(
  progress: number,
  height: number,
  compact: boolean,
) {
  const travel = Math.min(
    compact ? 36 : 72,
    Math.max(0, height) * (compact ? 0.055 : 0.085),
  );
  return { y: clamp(progress) * travel, scale: compact ? 1.12 : 1.18 };
}

// Time-based easing keeps the same response across different refresh rates.
// Only decorative layers trail the scroll; the document always scrolls natively.
export function easeSilkScroll(
  current: number,
  target: number,
  elapsed: number,
  viewport: number,
) {
  if (Math.abs(target - current) > viewport || Math.abs(target - current) < 0.1)
    return target;
  return (
    current + (target - current) * (1 - Math.exp(-Math.max(0, elapsed) / 95))
  );
}

type ScrollLayer = {
  element: HTMLElement;
  box: HTMLElement;
  kind: "photo" | "accent";
  top: number;
  height: number;
  original: {
    translate: string;
    scale: string;
    willChange: string;
    flow: string;
    marker: string | null;
  };
};

// One passive listener and a frame loop that stops as soon as movement settles.
// Geometry reads are batched before writes, and cached between surface changes.
function attachScrollEffects(surface: HTMLElement): {
  stop: () => void;
  refresh: () => void;
} {
  const hero = surface.querySelector<HTMLElement>(".home-hero");
  const image = hero?.querySelector<HTMLElement>(".hero-background");
  const foreground = hero?.querySelector<HTMLElement>(".hero-columns");
  const header = document.querySelector<HTMLElement>(".site-header");
  const journey = surface.querySelector<HTMLElement>(".home-journey");
  const progress = journey ? document.createElement("div") : undefined;
  if (progress) {
    progress.className = "journey-progress";
    progress.setAttribute("aria-hidden", "true");
    journey!.appendChild(progress);
  }
  const originalTransform = image?.style.transform ?? "";
  const originalForeground = foreground?.style.transform ?? "";
  const originalScrolled = header?.getAttribute("data-scrolled") ?? null;
  const layers = new Map<HTMLElement, ScrollLayer>();
  let frame: number | undefined;
  let needsMeasure = true;
  let heroTop = 0;
  let heroHeight = 0;
  let documentRange = 0;
  let viewportHeight = window.innerHeight;
  let compact = window.innerWidth <= 700;
  let easedScroll = window.scrollY;
  let lastTime = 0;

  const restoreLayer = (layer: ScrollLayer) => {
    const { element, original, kind } = layer;
    element.style.translate = original.translate;
    element.style.scale = original.scale;
    element.style.willChange = original.willChange;
    if (original.flow) element.style.setProperty("--silk-flow", original.flow);
    else element.style.removeProperty("--silk-flow");
    const marker = kind === "photo" ? "data-silk-depth" : "data-silk-flow";
    if (original.marker === null) element.removeAttribute(marker);
    else element.setAttribute(marker, original.marker);
  };

  const render = (time: number) => {
    frame = undefined;
    const scrollY = window.scrollY;
    if (needsMeasure) {
      viewportHeight = window.innerHeight;
      compact = window.innerWidth <= 700;
      heroTop = hero ? hero.getBoundingClientRect().top + scrollY : 0;
      heroHeight = hero?.offsetHeight ?? 0;
      documentRange = document.documentElement.scrollHeight - viewportHeight;
      const present = new Set<HTMLElement>();
      const measure = (
        element: HTMLElement,
        box: HTMLElement,
        kind: ScrollLayer["kind"],
      ) => {
        present.add(element);
        const bounds = box.getBoundingClientRect();
        let layer = layers.get(element);
        if (!layer) {
          layer = {
            element,
            box,
            kind,
            top: 0,
            height: 0,
            original: {
              translate: element.style.translate,
              scale: element.style.scale,
              willChange: element.style.willChange,
              flow: element.style.getPropertyValue("--silk-flow"),
              marker: element.getAttribute(
                kind === "photo" ? "data-silk-depth" : "data-silk-flow",
              ),
            },
          };
          layers.set(element, layer);
        }
        layer.top = bounds.top + scrollY;
        layer.height = bounds.height;
      };
      surface.querySelectorAll<HTMLElement>(".photo img").forEach((element) => {
        // Horizontal shelves already have native motion. Keep off-screen shelf
        // images out of the vertical parallax loop and preserve their framing.
        if (element.closest(".shelf-track")) return;
        const box = element.closest<HTMLElement>(".photo");
        if (box) measure(element, box, "photo");
      });
      surface
        .querySelectorAll<HTMLElement>(".section-header")
        .forEach((element) => measure(element, element, "accent"));
      // Start writes only after all measurements above have completed.
      layers.forEach((layer, element) => {
        if (!present.has(element)) {
          restoreLayer(layer);
          layers.delete(element);
        } else
          element.setAttribute(
            layer.kind === "photo" ? "data-silk-depth" : "data-silk-flow",
            "",
          );
      });
      easedScroll = scrollY;
      needsMeasure = false;
    }
    easedScroll = easeSilkScroll(
      easedScroll,
      scrollY,
      lastTime ? Math.min(time - lastTime, 64) : 16,
      viewportHeight,
    );
    lastTime = time;
    if (image && heroHeight) {
      const visible =
        scrollY < heroTop + heroHeight && scrollY + viewportHeight > heroTop;
      image.style.willChange = visible ? "transform" : "";
      if (foreground) foreground.style.willChange = visible ? "transform" : "";
      if (visible) {
        const ratio = clamp((easedScroll - heroTop) / heroHeight);
        const depth = silkHeroDepth(ratio, heroHeight, compact);
        image.style.transform = `translate3d(0, ${depth.y}px, 0) scale(${depth.scale})`;
        if (foreground)
          foreground.style.transform = `translate3d(0, ${-ratio * (compact ? 18 : 36)}px, 0)`;
      }
    }
    layers.forEach((layer) => {
      const { element, kind, top, height } = layer;
      const visible = scrollY < top + height && scrollY + viewportHeight > top;
      if (kind === "photo") {
        element.style.willChange = visible
          ? "translate, scale, transform"
          : layer.original.willChange;
        if (!visible) return;
        const ratio =
          (easedScroll + viewportHeight - top) / (viewportHeight + height);
        const depth = silkPhotoDepth(ratio, height, compact);
        // Individual translate/scale compose with the existing CSS hover zoom.
        element.style.translate = `0 ${depth.y}px`;
        element.style.scale = String(depth.scale);
      } else if (visible) {
        element.style.setProperty(
          "--silk-flow",
          String(
            clamp(
              (easedScroll + viewportHeight - top) / (viewportHeight * 0.7),
            ),
          ),
        );
      }
    });
    if (header) header.toggleAttribute("data-scrolled", scrollY > 16);
    if (progress) {
      const ratio = documentRange > 0 ? clamp(easedScroll / documentRange) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
    if (Math.abs(easedScroll - scrollY) >= 0.1) schedule();
  };
  const schedule = () => {
    if (frame === undefined) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    needsMeasure = true;
    schedule();
  };
  const observer =
    typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver(resize);
  observer?.observe(surface);
  if (hero) observer?.observe(hero);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  schedule();
  const stop = () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", resize);
    observer?.disconnect();
    if (frame !== undefined) cancelAnimationFrame(frame);
    progress?.remove();
    if (image) {
      image.style.transform = originalTransform;
      image.style.willChange = "";
    }
    if (foreground) {
      foreground.style.transform = originalForeground;
      foreground.style.willChange = "";
    }
    layers.forEach(restoreLayer);
    if (header) {
      if (originalScrolled === null) header.removeAttribute("data-scrolled");
      else header.setAttribute("data-scrolled", originalScrolled);
    }
  };
  return { stop, refresh: resize };
}

export function animateCounter(element: HTMLElement): () => void {
  const text = element.textContent?.trim() || "";
  const match = text.match(/^([\d,]+)(\+?)$/);
  if (!match) return () => {};
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  if (isNaN(target) || target <= 0) return () => {};
  const suffix = match[2] || "";
  const hasCommas = match[1].includes(",");
  const start = performance.now();
  let frame: number | undefined;
  let cancelled = false;
  const step = (now: number) => {
    if (cancelled) return;
    const progress = Math.min((now - start) / 1100, 1);
    const current = Math.round((1 - Math.pow(1 - progress, 4)) * target);
    element.textContent =
      (hasCommas ? current.toLocaleString() : String(current)) + suffix;
    if (progress < 1) frame = requestAnimationFrame(step);
    else {
      frame = undefined;
      element.textContent = text;
    }
  };
  frame = requestAnimationFrame(step);
  return () => {
    cancelled = true;
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    element.textContent = text;
  };
}

export function attachSilkMotion(surface: HTMLElement) {
  if (!surface || !window.IntersectionObserver || !Element.prototype.animate)
    return;
  const animations = new Map<HTMLElement, Animation>();
  const observed = new Set<HTMLElement>();
  const revealed = new WeakSet<HTMLElement>();
  const countersAnimated = new WeakSet<HTMLElement>();
  const counters = new Map<HTMLElement, () => void>();
  let reveals: IntersectionObserver | undefined;
  let additions: MutationObserver | undefined;
  let scrollEffects: ReturnType<typeof attachScrollEffects> | undefined;
  let scanFrame: number | undefined;
  let running = false;
  const pendingRoots = new Set<Element>();

  const settle = (element: HTMLElement) => {
    animations.get(element)?.cancel();
    animations.delete(element);
    revealed.add(element);
    element.dataset.silkReveal = "settled";
  };
  const reveal = (element: HTMLElement) => {
    reveals?.unobserve(element);
    if (element.contains(document.activeElement) || !surface.contains(element))
      return settle(element);
    const siblings = element.parentElement?.children;
    const index = siblings ? Array.from(siblings).indexOf(element) : 0;
    // Individual translate leaves the card's CSS hover transform independent.
    const distance = window.innerWidth <= 700 ? 20 : 36;
    const card = element.matches(
      "article, li, .project-card, .showcase-card, .capability-card",
    );
    const animation = element.animate(
      [
        {
          opacity: 0.3,
          translate: `0 ${distance}px`,
          scale: card ? "0.985" : "1",
        },
        { opacity: 1, translate: "0 0", scale: "1" },
      ],
      {
        duration: 780,
        delay: Math.min(Math.max(index, 0), 4) * 55,
        easing: SILK_EASE,
        fill: "backwards",
      },
    );
    element.dataset.silkReveal = "entering";
    animations.set(element, animation);
    animation.onfinish = () => settle(element);
    const h2 = element.querySelector("h2");
    if (
      h2 &&
      (element.parentElement?.classList.contains("home-facts") ||
        element.parentElement?.classList.contains("metrics")) &&
      !countersAnimated.has(h2)
    ) {
      countersAnimated.add(h2);
      counters.set(h2, animateCounter(h2));
    }
  };
  const stop = () => {
    running = false;
    reveals?.disconnect();
    additions?.disconnect();
    scrollEffects?.stop();
    scrollEffects = undefined;
    if (scanFrame !== undefined) cancelAnimationFrame(scanFrame);
    scanFrame = undefined;
    pendingRoots.clear();
    counters.forEach((cancel) => cancel());
    counters.clear();
    animations.forEach((_, element) => settle(element));
  };
  const sync = () => {
    const enabled = !document.hidden;
    if (enabled === running) return;
    stop();
    if (!enabled) {
      surface
        .getAnimations({ subtree: true })
        .forEach((animation) => animation.cancel());
      return;
    }
    running = true;
    scrollEffects = attachScrollEffects(surface);
    reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          // A large scroll jump must not hide content already above the viewport.
          if (entry.boundingClientRect.bottom <= 0) settle(element);
          else reveal(element);
        }
      },
      { rootMargin: "0px 0px 48px 0px", threshold: 0 },
    );
    const register = (element: HTMLElement) => {
      if (
        observed.has(element) ||
        element.parentElement?.closest(revealTargets)
      )
        return;
      observed.add(element);
      if (revealed.has(element)) return;
      const bounds = element.getBoundingClientRect();
      // Already-visible content stays visible after hydration and mode changes.
      if (
        bounds.top < window.innerHeight ||
        element.contains(document.activeElement)
      )
        settle(element);
      else reveals?.observe(element);
    };
    const scan = (root: Element) => {
      if (root !== surface && !surface.contains(root)) return;
      if (root instanceof HTMLElement && root.matches(revealTargets))
        register(root);
      root.querySelectorAll<HTMLElement>(revealTargets).forEach(register);
    };
    observed.clear();
    scan(surface);
    additions = new MutationObserver((changes) => {
      for (const change of changes) {
        for (const node of change.addedNodes)
          if (node instanceof Element) pendingRoots.add(node);
      }
      if (!pendingRoots.size || scanFrame !== undefined) return;
      scanFrame = requestAnimationFrame(() => {
        scanFrame = undefined;
        for (const element of observed) {
          if (surface.contains(element)) continue;
          reveals?.unobserve(element);
          animations.get(element)?.cancel();
          animations.delete(element);
          observed.delete(element);
        }
        pendingRoots.forEach(scan);
        pendingRoots.clear();
        scrollEffects?.refresh();
      });
    });
    additions.observe(surface, { childList: true, subtree: true });
  };
  const onInteract = (event: Event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest<HTMLElement>("[data-silk-reveal]");
    if (element) settle(element);
  };
  sync();
  document.addEventListener("visibilitychange", sync);
  surface.addEventListener("focusin", onInteract);
  surface.addEventListener("pointerdown", onInteract);
  return () => {
    stop();
    document.removeEventListener("visibilitychange", sync);
    surface.removeEventListener("focusin", onInteract);
    surface.removeEventListener("pointerdown", onInteract);
    observed.forEach((element) => delete element.dataset.silkReveal);
  };
}
