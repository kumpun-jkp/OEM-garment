import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

export const pngIcons = {
  adults: "adults",
  children: "children",
  trousers: "trousers",
  shirts: "shirts",
  "elephant-sets": "elephant-sets",
  sleepwear: "sleepwear",
  dresses: "dresses",
  skirts: "skirts",
  fabric: "fabric",
  sewing: "sewing",
  quality: "quality",
  brief: "brief",
} as const;

export type PngIconName = keyof typeof pngIcons;

// The PNG alpha defines the solid pictogram. CSS supplies one foreground colour,
// so the same artwork follows surface, control and hover colours without filters.
export function PngIcon({
  name,
  size = 28,
  className = "",
}: {
  name: PngIconName;
  size?: number;
  className?: string;
}) {
  const source = `/icons/unified/${pngIcons[name]}.png`;
  const { props } = getImageProps({
    src: source,
    alt: "",
    width: size,
    height: size,
  });
  return (
    <span
      aria-hidden="true"
      className={`app-icon png-icon ${className}`}
      style={
        {
          width: size,
          height: size,
          "--icon-mask": `url("${props.src}")`,
        } as CSSProperties
      }
      data-context-icon={name}
      data-icon-src={props.src}
      data-icon-style="solid"
    />
  );
}
