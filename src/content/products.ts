import tmProducts from "./tm-products.json" with { type: "json" };

export type GarmentShape =
  "shirt" | "jacket" | "trousers" | "shorts" | "set" | "dress" | "skirt";
export type ProductNode = {
  id: string;
  label: string;
  th: string;
  description: string;
  shape: GarmentShape;
  children?: readonly ProductNode[];
};

// Transcribed from the owner-supplied hierarchy. Children has no supplied branches.
export const productTaxonomy: readonly ProductNode[] = [
  {
    id: "adults",
    label: "Adults",
    th: "ผู้ใหญ่",
    description: "Explore garment groups for adult collections.",
    shape: "shirt",
    children: [
      {
        id: "trousers",
        label: "Trousers",
        th: "กางเกง",
        description: "Cargo, outdoor, long trousers and shorts.",
        shape: "trousers",
        children: [
          {
            id: "cargo-outdoor",
            label: "Cargo & outdoor trousers",
            th: "กางเกงคาร์โก้ / เดินป่า",
            description:
              "Explore pocket placement, leg shape and outdoor garment details.",
            shape: "trousers",
          },
          {
            id: "long-trousers",
            label: "Long trousers",
            th: "กางเกงขายาว",
            description:
              "Explore full-length silhouettes, waistbands and fits.",
            shape: "trousers",
          },
          {
            id: "shorts",
            label: "Shorts",
            th: "กางเกงขาสั้น",
            description:
              "Explore shorter lengths, pockets and waistband details.",
            shape: "shorts",
          },
        ],
      },
      {
        id: "shirts",
        label: "Shirts",
        th: "เสื้อ",
        description: "Hawaiian shirts, jackets and sports or team shirts.",
        shape: "shirt",
        children: [
          {
            id: "hawaiian-shirts",
            label: "Hawaiian shirts",
            th: "เสื้อฮาวาย",
            description:
              "Explore relaxed short sleeves, open collars and print placement.",
            shape: "shirt",
          },
          {
            id: "jackets",
            label: "Jackets",
            th: "แจ็คเก็ต",
            description:
              "Explore outer layers, closures, cuffs and pocket details.",
            shape: "jacket",
          },
          {
            id: "sports-team-shirts",
            label: "Sports & team shirts",
            th: "เสื้อกีฬา เสื้อทีม",
            description:
              "Explore team colours, necklines and decoration placement.",
            shape: "shirt",
          },
        ],
      },
      {
        id: "elephant-sets",
        label: "Elephant shirts & trousers",
        th: "รวม เสื้อช้าง-กางเกงช้าง",
        description: "Explore elephant shirts and trousers together.",
        shape: "set",
      },
      {
        id: "sleepwear",
        label: "Sleepwear",
        th: "ชุดนอน",
        description: "Explore sleepwear shapes and coordinated sets.",
        shape: "set",
      },
      {
        id: "dresses",
        label: "Dresses",
        th: "ชุดเดรส",
        description: "Explore dress silhouettes, lengths and garment details.",
        shape: "dress",
      },
      {
        id: "skirts",
        label: "Skirts",
        th: "กระโปรง",
        description: "Explore skirt lengths, waistbands and silhouettes.",
        shape: "skirt",
      },
    ],
  },
  {
    id: "children",
    label: "Children",
    th: "เด็ก",
    description: "Explore the children’s garment range with our team.",
    shape: "set",
  },
];

export type ProductSelection = {
  audience?: string;
  category?: string;
  subcategory?: string;
};

export function resolveProductSelection(
  input: ProductSelection,
): ProductSelection {
  const audience = productTaxonomy.find((node) => node.id === input.audience);
  const parents = audience ? [audience] : productTaxonomy;
  for (const parent of parents) {
    for (const category of parent.children ?? []) {
      const subcategory = category.children?.find(
        (node) => node.id === input.subcategory,
      );
      if (subcategory && (!input.category || input.category === category.id)) {
        return {
          audience: parent.id,
          category: category.id,
          subcategory: subcategory.id,
        };
      }
    }
    const category = parent.children?.find(
      (node) => node.id === input.category,
    );
    if (category) return { audience: parent.id, category: category.id };
  }
  return audience ? { audience: audience.id } : {};
}

export function productHref(selection: ProductSelection = {}) {
  const resolved = resolveProductSelection(selection);
  const query = new URLSearchParams();
  for (const key of ["audience", "category", "subcategory"] as const) {
    if (resolved[key]) query.set(key, resolved[key]);
  }
  return `/oem-products${query.size ? `?${query}` : ""}`;
}

export function selectionNodes(selection: ProductSelection) {
  const audience = productTaxonomy.find(
    (node) => node.id === selection.audience,
  );
  const category = audience?.children?.find(
    (node) => node.id === selection.category,
  );
  const subcategory = category?.children?.find(
    (node) => node.id === selection.subcategory,
  );
  return { audience, category, subcategory };
}

export type GarmentReference = {
  id: string;
  audience: string;
  category: string;
  subcategory?: string;
  title: string;
  th: string;
  description: string;
  descriptionTh: string;
  shape: GarmentShape;
  images: readonly { src: string; alt: string; th: string }[];
};

// Generated from the reviewed source map by scripts/import-tm-products.mjs.
// The first image is the representative full-garment view. Coverage, taxonomy
// and bilingual fields are reconciled against the originals in products tests.
export const garmentReferences: readonly GarmentReference[] =
  tmProducts as readonly GarmentReference[];

export function projectReferenceHref(item: GarmentReference) {
  const query = new URLSearchParams({
    stage: "reference",
    category:
      item.subcategory === "sports-team-shirts" ? "Sportswear" : "Other",
    productId: item.id,
  });
  return `/start-your-project?${query}`;
}

export function filterGarmentReferences(selection: ProductSelection) {
  const filters = resolveProductSelection(selection);
  return garmentReferences.filter(
    (item) =>
      (!filters.audience || item.audience === filters.audience) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.subcategory || item.subcategory === filters.subcategory),
  );
}
