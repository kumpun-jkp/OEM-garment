import { getTranslations } from "@/lib/translations";
import Link from "next/link";
import { productHref, productTaxonomy } from "@/content/products";
import { homeCopy } from "@/content/site";
import { ButtonLink, SectionHeader } from "./primitives";
import { AppIcon, ProductSymbol } from "./app-icon";

export async function ProductShowcase() {
  const { t, href: localHref } = await getTranslations();

  const [adults, children] = productTaxonomy;
  return (
    <section
      className="section selected-work product-showcase"
      id="product-showcase"
    >
      <div className="container">
        <SectionHeader
          icon="shirts"
          label={t("Our manufacturing range")}
          title={t(homeCopy.products.en)}
          aside={<p className="micro">{t(homeCopy.productIntro.en)}</p>}
        />
        <div className="work-editorial">
          <div className="split-label">
            <div>
              <p className="eyebrow work-accent">{t("Product showcase")}</p>
              <h3>{t("A starting point for your collection.")}</h3>
              <p>
                {t(
                  "Browse garment groups, then explore styles and details in Garment Style References.",
                )}
              </p>
            </div>
            <ButtonLink href={localHref("/our-work")} variant="dark">
              {t(homeCopy.work.en)}
            </ButtonLink>
          </div>
          <div className="showcase-heading">
            <h3>
              <ProductSymbol category={adults.id} />
              {t(adults.label)}
            </h3>
            <Link href={localHref(productHref({ audience: adults.id }))}>
              {t("Explore adult garments")}
              <AppIcon name="forward" />
            </Link>
          </div>
          <div className="showcase-grid">
            {adults.children?.map((category) => (
              <Link
                className="showcase-card"
                key={category.id}
                href={localHref(
                  productHref({
                    audience: adults.id,
                    category: category.id,
                  }),
                )}
              >
                <div className="showcase-visual">
                  <ProductSymbol
                    category={category.id}
                    size={120}
                    className="showcase-symbol"
                  />
                </div>
                <div className="showcase-copy">
                  <h4>
                    {t(category.label)}
                    <span aria-hidden="true">
                      <AppIcon name="outward" size={18} />
                    </span>
                  </h4>
                  <p>{t(category.description)}</p>
                  <span className="showcase-action">
                    {t("Explore styles")}
                    <AppIcon name="forward" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            className="showcase-children"
            href={localHref(productHref({ audience: children.id }))}
          >
            <ProductSymbol
              category={children.id}
              size={64}
              className="children-symbol"
            />
            <div>
              <h3>{t(children.label)}</h3>
              <p>{t(children.description)}</p>
            </div>
            <span>
              {t("Explore children’s garments")}
              <AppIcon name="forward" />
            </span>
          </Link>
          <div className="split-label micro">
            <span>
              <AppIcon name="info" size={14} />
              {t("Explore styles and details for your collection")}
            </span>
            <Link href={localHref("/start-your-project")}>
              {t("Tell us what you’re making")}
              <AppIcon name="forward" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
