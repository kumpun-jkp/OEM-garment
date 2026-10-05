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
  description: string;
  shape: GarmentShape;
  image?: string;
  alt?: string;
};

// Style illustrations describe the supplied range; they are not factory project photos.
export const garmentReferences: readonly GarmentReference[] = [
  ...productTaxonomy.flatMap((audience) =>
    (audience.children ?? []).flatMap((category) =>
      (category.children ?? [category]).map((style) => ({
        id: style.id,
        audience: audience.id,
        category: category.id,
        subcategory: category.children ? style.id : undefined,
        title: style.label,
        description: style.description,
        shape: style.shape,
      })),
    ),
  ),
  {
    id: "blue-shirt",
    audience: "adults",
    category: "shirts",
    title: "Workwear shirt reference",
    description:
      "A shirt reference for discussing collars, pockets and garment construction.",
    shape: "shirt",
    image: "/media/64fb4e9e0b1a8da6.jpeg",
    alt: "Blue workwear shirt reference",
  },
  {
    id: "polo-shirt",
    audience: "adults",
    category: "shirts",
    title: "Polo shirt reference",
    description:
      "A shirt reference for discussing collars, plackets and short sleeves.",
    shape: "shirt",
    image: "/media/3381904ee8b51958.jpeg",
    alt: "Beige polo shirt reference",
  },
  {
    id: "t-shirt",
    audience: "adults",
    category: "shirts",
    title: "T-shirt reference",
    description:
      "A shirt reference for discussing necklines, fit and decoration placement.",
    shape: "shirt",
    image: "/media/d4255ca03b962fd1.jpeg",
    alt: "Black T-shirt reference",
  },
];

export function filterGarmentReferences(selection: ProductSelection) {
  const filters = resolveProductSelection(selection);
  return garmentReferences.filter(
    (item) =>
      (!filters.audience || item.audience === filters.audience) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.subcategory || item.subcategory === filters.subcategory),
  );
}
