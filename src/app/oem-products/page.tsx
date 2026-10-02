import type { Metadata } from "next";
import { ProjectCatalogue } from "@/components/project-catalogue";
import { SectionHeader } from "@/components/primitives";
export const metadata: Metadata = { title: "OEM Products" };
export default function Products() {
  return (
    <section className="section products-page">
      <div className="container">
        <SectionHeader level={1} title="Verified production cases" />
        <ProjectCatalogue full />
      </div>
    </section>
  );
}
