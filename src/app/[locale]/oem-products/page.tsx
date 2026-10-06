import { getTranslations, pageMetadata } from "@/lib/translations";
import { ProjectCatalogue } from "@/components/project-catalogue";
import { SectionHeader } from "@/components/primitives";
import { resolveProductSelection } from "@/content/products";
export const generateMetadata = pageMetadata("Garment Style References");
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { t } = await getTranslations();

  const query = await searchParams;
  const single = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  const selection = resolveProductSelection({
    audience: single(query.audience),
    category: single(query.category),
    subcategory: single(query.subcategory),
  });
  return (
    <section className="section products-page">
      <div className="container">
        <SectionHeader
          level={1}
          icon="shirts"
          label={t("Explore garment categories")}
          title={t("Garment style references")}
        />
        <p className="products-intro">
          {t(
            "Explore TM Apparel products by garment type. Browse the full garment, alternative views and close-up details, then discuss your own collection with our team.",
          )}
        </p>
        <ProjectCatalogue full selection={selection} />
      </div>
    </section>
  );
}
