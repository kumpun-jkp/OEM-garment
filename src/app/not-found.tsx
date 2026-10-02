import { ButtonLink } from "@/components/primitives";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This page is unavailable.</h1>
        <p>Explore our production capabilities or contact the team.</p>
        <ButtonLink href="/" variant="primary">
          Return home
        </ButtonLink>
      </div>
    </section>
  );
}
