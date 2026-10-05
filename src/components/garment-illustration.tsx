import type { GarmentShape } from "@/content/products";

export function GarmentIllustration({
  shape,
  variant,
}: {
  shape: GarmentShape;
  variant?: string;
}) {
  const shirt = (
    <>
      <path d="M75 34 50 45 30 77 53 91 65 72v87h90V72l12 19 23-14-20-32-25-11c-8 18-62 18-70 0Z" />
      <path d="M75 34c8 25 62 25 70 0M65 145h90" />
    </>
  );
  const trousers = (
    <>
      <path d="M71 29h78l8 141h-38l-9-89-9 89H63Z" />
      <path d="M70 43h80M110 43v38M73 51l15 15M147 51l-15 15M65 155h36M119 155h36" />
    </>
  );
  return (
    <svg
      viewBox="0 0 220 200"
      className={`garment-illustration garment-illustration--${shape}`}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="var(--brand-info)"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {shape === "shirt" &&
          (variant === "hawaiian-shirts" ? (
            <>
              <path d="m82 31-31 14-21 33 24 14 14-22v89h84V70l14 22 24-14-21-33-31-14-28 10Z" />
              <path d="m82 31 9 29 19-19 19 19 9-29M110 58v101M122 76h19v20h-19" />
              <g fill="currentColor" stroke="none">
                <circle cx="115" cy="76" r="2" />
                <circle cx="115" cy="96" r="2" />
                <circle cx="115" cy="116" r="2" />
                <circle cx="115" cy="136" r="2" />
              </g>
            </>
          ) : (
            shirt
          ))}
        {variant === "sports-team-shirts" && (
          <path d="m79 36 31 27 31-27M65 91h90M65 105h90" fill="none" />
        )}
        {shape === "jacket" && (
          <>
            <path d="m84 28-28 16-22 111 25 5 17-77v90h68V83l17 77 25-5-22-111-28-16-26 15Z" />
            <path d="M110 43v130M84 28l9 27 17-12 17 12 9-27M80 123h21v19H80M119 123h21v19h-21" />
          </>
        )}
        {shape === "trousers" && trousers}
        {variant === "cargo-outdoor" && (
          <path d="M66 86h29v28H66Zm2 7h25M125 86h29v28h-29Zm2 7h25" />
        )}
        {shape === "shorts" && (
          <>
            <path d="M68 48h84l10 102h-43l-9-53-9 53H58Z" />
            <path d="M67 63h86M110 63v34M70 74l17 15M150 74l-17 15M60 138h43M117 138h43" />
          </>
        )}
        {shape === "dress" && (
          <>
            <path d="m82 25-25 15-18 39 26 11 15-29 8 43-31 74h106l-31-74 8-43 15 29 26-11-18-39-25-15c-12 20-44 20-56 0Z" />
            <path d="M88 104h44M77 160h66" />
          </>
        )}
        {shape === "skirt" && (
          <>
            <path d="M78 43h64l35 127H43Z" />
            <path d="M77 56h66M93 57l-13 99M127 57l13 99M47 157h126" />
          </>
        )}
        {shape === "set" && (
          <>
            <g transform="translate(-10 12) scale(.65)">{shirt}</g>
            <g transform="translate(90 45) scale(.7)">{trousers}</g>
          </>
        )}
      </g>
    </svg>
  );
}
