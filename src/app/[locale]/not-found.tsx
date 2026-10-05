import { getTranslations } from "@/lib/translations";
import { ButtonLink } from "@/components/primitives";
export default async function NotFound() {
  const { t, href: localHref } = await getTranslations();

  return (
    <section className="section">
      <div className="container empty-state">
        <p className="eyebrow">{t("404 / Page not found")}</p>
        <h1>{t("This page is unavailable.")}</h1>
        <p>{t("Explore our production capabilities or contact the team.")}</p>
        <ButtonLink href={localHref("/")} variant="primary">
          {t("Return home")}
        </ButtonLink>
      </div>
    </section>
  );
}
