// Animate existing content without changing its server-rendered structure.
// Nothing is hidden before hydration or when browser animation APIs are absent.

/* ── reveal targets ─────────────────────────────────────────────────── */

const revealTargets = [
  ".hero-ribbon",
  ".hero-columns > *",
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

/* ── helpers ────────────────────────────────────────────────────────── */

function getRevealDirection(
  element: HTMLElement,
): [number, number, number, number] {
  // [startOpacity, startX, startY, startScale]
  const parent = element.parentElement;
  if (!parent) return [0, 0, 24, 1];

  const siblings = Array.from(parent.children);
  const index = siblings.indexOf(element);
  const total = siblings.length;

  // Grid items: alternate slide directions for visual interest
  const isGridChild =
    parent.classList.contains("home-reason-grid") ||
    parent.classList.contains("home-quality-grid") ||
    parent.classList.contains("stage-grid") ||
    parent.classList.contains("showcase-grid") ||
    parent.classList.contains("home-facts");

  if (isGridChild) {
    // Gentle sway: even items from left, odd from right
    const sway = index % 2 === 0 ? -16 : 16;
    return [0, sway, 16, 1];
  }

  // Metrics / facts: scale up gently
  if (
    parent.classList.contains("metrics") ||
    parent.classList.contains("customer-logos")
  ) {
    return [0, 0, 12, 0.97];
  }

  // Default: gentle rise
  return [0, 0, 24, 1];
}

/* ── easing curves ──────────────────────────────────────────────────── */

const SILK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SILK_SETTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

/* ── parallax ──────────────────────────────────────────────────────── */

function attachParallax(surface: HTMLElement): () => void {
  const heroImg = surface.querySelector<HTMLElement>(
    ".home-hero .hero-background",
  );
  if (!heroImg) return () => {};

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroSection = heroImg.closest(".home-hero") as HTMLElement | null;
      if (heroSection) {
        const heroBottom =
          heroSection.offsetTop + heroSection.offsetHeight;
        if (scrollY < heroBottom) {
          // Subtle parallax: image moves slower than scroll
          const shift = scrollY * 0.15;
          heroImg.style.transform = `translate3d(0, ${shift}px, 0) scale(1.05)`;
        }
      }
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => {
    window.removeEventListener("scroll", onScroll);
    heroImg.style.transform = "";
  };
}

/* ── counter animation for stats ───────────────────────────────────── */

function animateCounter(element: HTMLElement) {
  const text = element.textContent?.trim() || "";
  // Match numbers like "35+", "500,000+", "130", etc.
  const match = text.match(/^([\d,]+)(\+?)$/);
  if (!match) return;

  const rawTarget = match[1].replace(/,/g, "");
  const target = parseInt(rawTarget, 10);
  const suffix = match[2] || "";
  if (isNaN(target) || target <= 0) return;

  const hasCommas = match[1].includes(",");
  const duration = 1400;
  const start = performance.now();

  const format = (n: number) => {
    if (hasCommas) return n.toLocaleString();
    return String(n);
  };

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart for a satisfying deceleration
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(eased * target);
    element.textContent = format(current) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/* ── section reveal (scroll-triggered fade of entire sections) ──── */

function attachSectionReveals(surface: HTMLElement): () => void {
  const sections = surface.querySelectorAll<HTMLElement>("section");
  if (!sections.length) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add("silk-section-visible");
          observer.unobserve(el);
        }
      }
    },
    { rootMargin: "0px 0px -60px 0px", threshold: 0.01 },
  );

  sections.forEach((section) => {
    if (!section.classList.contains("home-hero")) {
      section.classList.add("silk-section");
      observer.observe(section);
    }
  });

  return () => observer.disconnect();
}

/* ── scroll-linked journey progress bar ────────────────────────────── */

function attachJourneyProgress(surface: HTMLElement): () => void {
  const journey = document.querySelector<HTMLElement>(".home-journey");
  if (!journey) return () => {};

  // Create progress indicator
  let progressBar = journey.querySelector<HTMLElement>(
    ".journey-progress",
  );
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.className = "journey-progress";
    journey.appendChild(progressBar);
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / docHeight, 1);
      progressBar!.style.transform = `scaleX(${progress})`;
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}

/* ── main motion attachment ────────────────────────────────────────── */

export function attachSilkMotion(surface: HTMLElement) {
  if (!surface || !window.IntersectionObserver || !Element.prototype.animate)
    return;

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Map<HTMLElement, Animation>();
  const observed = new Set<HTMLElement>();
  const countersAnimated = new WeakSet<HTMLElement>();
  let reveals: IntersectionObserver | undefined;
  let additions: MutationObserver | undefined;
  let cleanupParallax: (() => void) | undefined;
  let cleanupSections: (() => void) | undefined;
  let cleanupJourney: (() => void) | undefined;

  const settle = (element: HTMLElement) => {
    animations.get(element)?.cancel();
    animations.delete(element);
    element.dataset.silkReveal = "settled";
  };

  const reveal = (element: HTMLElement) => {
    reveals?.unobserve(element);
    // A focused control must be usable immediately, even during a reveal.
    if (element.contains(document.activeElement)) return settle(element);

    const siblings = element.parentElement?.children;
    const index = siblings ? Array.from(siblings).indexOf(element) : 0;
    const [startOpacity, startX, startY, startScale] =
      getRevealDirection(element);

    const fromTransform =
      startScale !== 1
        ? `translate3d(${startX}px, ${startY}px, 0) scale(${startScale})`
        : `translate3d(${startX}px, ${startY}px, 0)`;

    const toTransform =
      startScale !== 1
        ? "translate3d(0, 0, 0) scale(1)"
        : "translate3d(0, 0, 0)";

    const animation = element.animate(
      [
        { opacity: startOpacity, transform: fromTransform },
        { opacity: 1, transform: toTransform },
      ],
      {
        duration: 800,
        delay: Math.min(index, 4) * 80,
        easing: SILK_EASE,
        fill: "backwards",
      },
    );
    element.dataset.silkReveal = "entering";
    animations.set(element, animation);
    animation.onfinish = () => settle(element);
  };

  const stop = () => {
    reveals?.disconnect();
    additions?.disconnect();
    cleanupParallax?.();
    cleanupSections?.();
    cleanupJourney?.();
    animations.forEach((_, element) => settle(element));
  };

  const start = () => {
    stop();
    if (preference.matches) return;

    // Set up section-level reveals
    cleanupSections = attachSectionReveals(surface);

    // Set up parallax
    cleanupParallax = attachParallax(surface);

    // Set up journey progress
    cleanupJourney = attachJourneyProgress(surface);

    reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            reveal(el);

            // Animate counters for stats
            if (el.tagName === "DIV") {
              const h2 = el.querySelector("h2");
              if (
                h2 &&
                (el.parentElement?.classList.contains("home-facts") ||
                  el.parentElement?.classList.contains("metrics")) &&
                !countersAnimated.has(h2)
              ) {
                countersAnimated.add(h2);
                animateCounter(h2);
              }
            }
          }
        }
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0 },
    );

    const scan = () => {
      surface
        .querySelectorAll<HTMLElement>(revealTargets)
        .forEach((element) => {
          // Keep each card atomic; nested photos should not move twice.
          if (
            observed.has(element) ||
            element.parentElement?.closest(revealTargets)
          )
            return;
          observed.add(element);
          const bounds = element.getBoundingClientRect();
          if (bounds.bottom <= 0 || element.contains(document.activeElement))
            return settle(element);
          if (bounds.top < window.innerHeight - 24) {
            if (window.scrollY < 8) reveal(element);
            else settle(element);
          } else reveals?.observe(element);
        });
    };
    observed.clear();
    scan();
    // Query filters and client navigation can replace cards without a new path.
    additions = new MutationObserver(scan);
    additions.observe(surface, { childList: true, subtree: true });
  };

  const onInteract = (event: Event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest<HTMLElement>("[data-silk-reveal]");
    if (element) settle(element);
  };
  start();
  preference.addEventListener("change", start);
  surface.addEventListener("focusin", onInteract);
  surface.addEventListener("pointerover", onInteract);
  return () => {
    stop();
    preference.removeEventListener("change", start);
    surface.removeEventListener("focusin", onInteract);
    surface.removeEventListener("pointerover", onInteract);
    observed.forEach((element) => delete element.dataset.silkReveal);
  };
}
