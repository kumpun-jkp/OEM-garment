import { getTranslations } from "@/lib/translations";
import Link from "next/link";
import {
  filterGarmentReferences,
  productHref,
  productTaxonomy,
  selectionNodes,
  resolveProductSelection,
  projectReferenceHref,
  type ProductSelection,
} from "@/content/products";
import { ButtonLink } from "./primitives";
import { ProductGallery } from "./product-gallery";
import { AppIcon } from "./app-icon";

export async function ProjectCatalogue({
  full = false,
  selection = {},
}: {
  full?: boolean;
  selection?: ProductSelection;
}) {
  const { t, isThai, href: localHref } = await getTranslations();

  const filters = resolveProductSelection(selection);
  const { audience, category, subcategory } = selectionNodes(filters);
  const entries = filterGarmentReferences(filters);
  const visible = full ? entries : entries.slice(0, 6);
  const categories =
    audience?.children ??
    (!audience ? productTaxonomy.flatMap((node) => node.children ?? []) : []);
  return (
    <div className="catalogue">
      <nav
        className="catalogue-filters taxonomy-filters"
        aria-label={t("Garment category filters")}
      >
        <div className="filter-row">
          <span className="micro">{t("Collection")}</span>
          <Link
            href={localHref(productHref())}
            aria-current={!audience ? "true" : undefined}
          >
            {t("All garments")}
          </Link>
          {productTaxonomy.map((node) => (
            <Link
              key={node.id}
              href={localHref(productHref({ audience: node.id }))}
              aria-current={audience?.id === node.id ? "true" : undefined}
            >
              {t(node.label)}
            </Link>
          ))}
        </div>
        {categories.length > 0 && (
          <div className="filter-row">
            <span className="micro">{t("Garment group")}</span>
            <Link
              href={localHref(productHref({ audience: audience?.id }))}
              aria-current={!category ? "true" : undefined}
            >
              {t("All groups")}
            </Link>
            {categories.map((node) => (
              <Link
                key={node.id}
                href={localHref(
                  productHref({ audience: "adults", category: node.id }),
                )}
                aria-current={category?.id === node.id ? "true" : undefined}
              >
                {t(node.label)}
              </Link>
            ))}
          </div>
        )}
        {category?.children && (
          <div className="filter-row">
            <span className="micro">{t("Product type")}</span>
            <Link
              href={localHref(
                productHref({
                  audience: audience?.id,
                  category: category.id,
                }),
              )}
              aria-current={!subcategory ? "true" : undefined}
            >
              {t("All {category}", { category: t(category.label) })}
            </Link>
            {category.children.map((node) => (
              <Link
                key={node.id}
                href={localHref(
                  productHref({ ...filters, subcategory: node.id }),
                )}
                aria-current={subcategory?.id === node.id ? "true" : undefined}
              >
                {t(node.label)}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <div className="catalogue-summary">
        <p>
          {t(
            [audience?.label, category?.label, subcategory?.label]
              .filter(Boolean)
              .map((label) => t(label))
              .join(" / ") || "All products",
          )}
        </p>
        <Link href={localHref(productHref())}>{t("Clear filters")}</Link>
      </div>
      <p className="catalogue-count" role="status">
        {t(entries.length)} {t(entries.length === 1 ? "product" : "products")}
        {t(
          !full && entries.length > visible.length
            ? t(" · Showing {count}", { count: visible.length })
            : "",
        )}
      </p>
      <div className="grid-three project-grid">
        {visible.map((item) => (
          <article
            className="project-card"
            key={item.id}
            data-product-id={item.id}
            data-category={item.category}
            data-subcategory={item.subcategory}
          >
            <div className="project-card-label split-label micro">
              <strong>{t("Product")}</strong>
              <span className="export-tag">
                {t(item.images.length === 1 ? "1 view" : "{count} views", {
                  count: item.images.length,
                })}
              </span>
            </div>
            <ProductGallery
              title={isThai ? item.th : item.title}
              images={item.images.map((image) => ({
                src: image.src,
                alt: isThai ? image.th : image.alt,
              }))}
              labels={{
                region: t("Product images"),
                previous: t("Previous image"),
                next: t("Next image"),
                view: t("View image {number}"),
                position: t("Image {current} of {total}"),
              }}
            />
            <div className="project-card-copy">
              <p className="eyebrow">
                {t(selectionNodes(item).audience?.label)}
                {t("/")}
                {t(" ")}
                {t(
                  selectionNodes(item).subcategory?.label ??
                    selectionNodes(item).category?.label,
                )}
              </p>
              <h3>{isThai ? item.th : item.title}</h3>
              <p>{isThai ? item.descriptionTh : item.description}</p>
              <p className="reference-note">
                {t(
                  "Fabric, decoration, sizing and production details are agreed for your project.",
                )}
              </p>
            </div>
            <ButtonLink
              href={localHref(projectReferenceHref(item))}
              variant="secondary"
              className="card-link"
            >
              {t("Start with this idea")}
            </ButtonLink>
          </article>
        ))}
      </div>
      {entries.length === 0 && (
        <div className="empty-state">
          <h3>{t("No matching references published yet.")}</h3>
          <p>
            {t(
              "Share your garment reference with our team to discuss your project.",
            )}
          </p>
          <div className="button-row">
            <ButtonLink
              href={localHref(
                "/start-your-project?stage=reference&category=Other",
              )}
            >
              {t("Discuss your garment")}
            </ButtonLink>
            <ButtonLink href={localHref(productHref())} variant="secondary">
              {t("Explore all references")}
            </ButtonLink>
          </div>
        </div>
      )}
      {!full && (
        <div className="catalogue-end">
          <p className="micro">
            <AppIcon name="shirts" size={16} />
            {t("Explore the complete garment range")}
          </p>
          <ButtonLink href={localHref(productHref(filters))} variant="dark">
            {t("Explore all garment styles")}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
