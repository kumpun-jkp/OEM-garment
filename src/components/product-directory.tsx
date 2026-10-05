"use client";
import { useLocale } from "@/components/locale-provider";
import Link from "next/link";
import { AppIcon, ProductSymbol } from "./app-icon";
import {
  productHref,
  productTaxonomy,
  type ProductNode,
} from "@/content/products";

export function ProductDirectory({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const { t, href: localHref, isThai: thai } = useLocale();

  const [adults, children] = productTaxonomy;
  const label = (node: ProductNode) => (thai ? node.th : node.label);
  const categoryLink = (node: ProductNode) => (
    <Link
      href={localHref(productHref({ audience: adults.id, category: node.id }))}
      onClick={onNavigate}
    >
      <ProductSymbol category={node.id} />
      {t(label(node))} <AppIcon name="forward" size={16} />
    </Link>
  );
  const types = (node: ProductNode) => (
    <ul>
      {node.children?.map((type) => (
        <li key={type.id}>
          <Link
            href={localHref(
              productHref({
                audience: adults.id,
                category: node.id,
                subcategory: type.id,
              }),
            )}
            onClick={onNavigate}
          >
            {t(label(type))}
          </Link>
        </li>
      ))}
    </ul>
  );
  const groups = adults.children ?? [];
  return (
    <div
      className={`product-directory${compact ? " product-directory--compact" : ""}`}
    >
      <div className="directory-intro">
        <p className="eyebrow">
          {t(thai ? "สำรวจประเภทสินค้า" : "Explore our garment range")}
        </p>
        <Link href={localHref(productHref())} onClick={onNavigate}>
          {t(thai ? "ดูแบบเสื้อผ้าทั้งหมด" : "All garment style references")}
          {t(" ")}
          <AppIcon name="forward" size={16} />
        </Link>
        <Link href={localHref("/our-work")} onClick={onNavigate}>
          {t(thai ? "ภาพรวมผลงานและการผลิต" : "Our work & capabilities")}
          {t(" ")}
          <AppIcon name="forward" size={16} />
        </Link>
      </div>
      {compact ? (
        <details className="directory-adults">
          <summary>
            <ProductSymbol category={adults.id} />
            {t(label(adults))}
            <AppIcon name="expand" className="disclosure-icon" />
          </summary>
          <Link
            href={localHref(productHref({ audience: adults.id }))}
            onClick={onNavigate}
          >
            {t(thai ? "ดูเสื้อผ้าผู้ใหญ่ทั้งหมด" : "All adult garments")}
            {t(" ")}
            <AppIcon name="forward" size={16} />
          </Link>
          {groups.map((category) =>
            category.children ? (
              <details key={category.id}>
                <summary>
                  <ProductSymbol category={category.id} />
                  {t(label(category))}
                  <AppIcon name="expand" className="disclosure-icon" />
                </summary>
                {t(categoryLink(category))}
                {t(types(category))}
              </details>
            ) : (
              <div key={category.id}>{t(categoryLink(category))}</div>
            ),
          )}
        </details>
      ) : (
        <div className="directory-adults">
          <div className="directory-parent">
            <h2>
              <ProductSymbol category={adults.id} />
              {t(label(adults))}
            </h2>
            <Link
              href={localHref(productHref({ audience: adults.id }))}
              onClick={onNavigate}
            >
              {t(thai ? "ดูทั้งหมด" : "Explore all adults")}
              {t(" ")}
              <AppIcon name="forward" size={16} />
            </Link>
          </div>
          <div className="directory-columns">
            {groups
              .filter((node) => node.children)
              .map((category) => (
                <div key={category.id}>
                  <h3>{t(categoryLink(category))}</h3>
                  {t(types(category))}
                </div>
              ))}
            <div>
              <h3>
                {t(thai ? "ประเภทเสื้อผ้าอื่น ๆ" : "More adult garments")}
              </h3>
              <ul>
                {groups
                  .filter((node) => !node.children)
                  .map((category) => (
                    <li key={category.id}>{t(categoryLink(category))}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="directory-children">
        <h2>
          <Link
            href={localHref(productHref({ audience: children.id }))}
            onClick={onNavigate}
          >
            <ProductSymbol category={children.id} />
            {t(label(children))} <AppIcon name="forward" size={16} />
          </Link>
        </h2>
        <p>
          {t(
            thai
              ? "พูดคุยเกี่ยวกับแบบเสื้อผ้าเด็กกับทีมงาน"
              : "Discuss children’s garment styles with our team.",
          )}
        </p>
      </div>
    </div>
  );
}
