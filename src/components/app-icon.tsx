import ArrowForwardSharp from "@mui/icons-material/ArrowForwardSharp";
import ArrowOutwardSharp from "@mui/icons-material/ArrowOutwardSharp";
import ExpandMoreSharp from "@mui/icons-material/ExpandMoreSharp";
import MenuSharp from "@mui/icons-material/MenuSharp";
import CloseSharp from "@mui/icons-material/CloseSharp";
import PersonSharp from "@mui/icons-material/PersonSharp";
import UploadFileSharp from "@mui/icons-material/UploadFileSharp";
import SearchSharp from "@mui/icons-material/SearchSharp";
import CalculateSharp from "@mui/icons-material/CalculateSharp";
import StraightenSharp from "@mui/icons-material/StraightenSharp";
import FactCheckSharp from "@mui/icons-material/FactCheckSharp";
import LocationOnSharp from "@mui/icons-material/LocationOnSharp";
import PhoneSharp from "@mui/icons-material/PhoneSharp";
import PrintSharp from "@mui/icons-material/PrintSharp";
import ScheduleSharp from "@mui/icons-material/ScheduleSharp";
import FactorySharp from "@mui/icons-material/FactorySharp";
import VerifiedSharp from "@mui/icons-material/VerifiedSharp";
import InfoSharp from "@mui/icons-material/InfoSharp";
import SendSharp from "@mui/icons-material/SendSharp";
import RestartAltSharp from "@mui/icons-material/RestartAltSharp";
import WorkSharp from "@mui/icons-material/WorkSharp";
import LocalShippingSharp from "@mui/icons-material/LocalShippingSharp";
import { PngIcon, pngIcons, type PngIconName } from "./png-icon";

// All glyphs use a solid monochrome style. Sharp supplies conventional controls;
// the PNG silhouettes retain precise garment meanings. Text supplies the labels.
const icons = {
  forward: ArrowForwardSharp,
  outward: ArrowOutwardSharp,
  expand: ExpandMoreSharp,
  menu: MenuSharp,
  close: CloseSharp,
  person: PersonSharp,
  upload: UploadFileSharp,
  search: SearchSharp,
  calculator: CalculateSharp,
  measure: StraightenSharp,
  checklist: FactCheckSharp,
  location: LocationOnSharp,
  phone: PhoneSharp,
  fax: PrintSharp,
  schedule: ScheduleSharp,
  factory: FactorySharp,
  verified: VerifiedSharp,
  info: InfoSharp,
  send: SendSharp,
  reset: RestartAltSharp,
  work: WorkSharp,
  delivery: LocalShippingSharp,
} as const;

export type AppIconName = keyof typeof icons | PngIconName;

export function AppIcon({
  name,
  size = 18,
  className = "",
}: {
  name: AppIconName;
  size?: number;
  className?: string;
}) {
  const iconSize = size <= 16 ? 16 : size <= 20 ? 20 : size;
  if (name in pngIcons) {
    return (
      <PngIcon
        name={name as PngIconName}
        size={iconSize}
        className={className}
      />
    );
  }
  const Icon = icons[name as keyof typeof icons];
  return (
    <Icon
      className={`app-icon ${className}`}
      style={{ width: iconSize, height: iconSize, fontSize: iconSize }}
      aria-hidden="true"
      focusable="false"
      data-icon-theme="sharp"
      data-icon-style="solid"
    />
  );
}

export function ProductSymbol({
  category,
  size = 28,
  className = "",
}: {
  category: string;
  size?: number;
  className?: string;
}) {
  const name: AppIconName =
    category === "children"
      ? "children"
      : category === "adults"
        ? "adults"
        : category === "trousers"
          ? "trousers"
          : category === "shirts"
            ? "shirts"
            : category === "sleepwear"
              ? "sleepwear"
              : category === "elephant-sets"
                ? "elephant-sets"
                : category === "dresses"
                  ? "dresses"
                  : category === "skirts"
                    ? "skirts"
                    : "work";
  return <AppIcon name={name} size={size} className={className} />;
}
