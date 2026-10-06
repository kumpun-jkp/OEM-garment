export type GuideLocale = "th" | "en";
export type LocalisedCopy = { en: string; th: string };
export const copy = (en: string, th: string): LocalisedCopy => ({ en, th });
export type GuideTopic =
  "planning" | "materials" | "sampling" | "decoration" | "production";
export type GuideSummary = {
  slug: string;
  topic: GuideTopic;
  category: LocalisedCopy;
  title: LocalisedCopy;
  excerpt: LocalisedCopy;
  takeaway: LocalisedCopy;
  cta: LocalisedCopy;
  complete: boolean;
  related: readonly string[];
};

// Card-sized content only. Long-form articles live in guide-articles.ts on the server.
export const guides: readonly GuideSummary[] = [
  {
    slug: "preparing-garment-production-brief",
    topic: "planning",
    complete: true,
    category: copy("01 / Design brief", "01 / เตรียมบรีฟ"),
    title: copy(
      "Prepare a garment production brief before requesting a quotation",
      "เตรียมบรีฟผลิตเสื้อผ้าให้พร้อมก่อนขอใบเสนอราคา",
    ),
    excerpt: copy(
      "Bring your design references, quantities, sizes and delivery priorities together so the factory can review the same requirements you have in mind.",
      "รวบรวมแบบอ้างอิง จำนวน ไซซ์ และกำหนดส่งมอบ เพื่อให้โรงงานประเมินความต้องการตรงกับสิ่งที่คุณวางแผนไว้",
    ),
    takeaway: copy(
      "Leave the meeting with a clear next step.",
      "คุยกับโรงงานแล้วรู้ว่าต้องเตรียมอะไรต่อ",
    ),
    cta: copy("Read the brief checklist", "อ่าน Checklist เตรียมบรีฟ"),
    related: [
      "how-to-choose-fabric",
      "preparing-size-specifications",
      "planning-moq-and-order-quantity",
    ],
  },
  {
    slug: "how-to-choose-fabric",
    topic: "materials",
    complete: false,
    category: copy("02 / Fabric selection", "02 / เลือกผ้า"),
    title: copy(
      "Choose fabric around the garment you want to make",
      "เลือกผ้าให้เหมาะกับเสื้อผ้าที่ต้องการผลิต",
    ),
    excerpt: copy(
      "Compare feel, structure, stretch and drape, then confirm the actual fabric specification and availability before developing your sample.",
      "เปรียบเทียบสัมผัส โครงสร้าง ความยืดหยุ่น และการทิ้งตัว แล้วตรวจสอบ Spec และการจัดหาผ้าก่อนทำตัวอย่าง",
    ),
    takeaway: copy(
      "A fabric name alone is not a specification.",
      "ชื่อผ้าอย่างเดียวอาจยังไม่พอสำหรับผลิต",
    ),
    cta: copy("Explore fabric decisions", "อ่านแนวทางเลือกผ้า"),
    related: [
      "preparing-garment-production-brief",
      "preparing-sample-development",
      "choosing-printing-and-embroidery",
    ],
  },
  {
    slug: "preparing-sample-development",
    topic: "sampling",
    complete: false,
    category: copy("03 / Sample development", "03 / เตรียมทำตัวอย่าง"),
    title: copy(
      "Prepare the details your first garment sample needs",
      "เตรียมรายละเอียดก่อนทำตัวอย่างเสื้อผ้ารอบแรก",
    ),
    excerpt: copy(
      "Agree which materials, measurements and construction details the sample should demonstrate, and record any choices that still need confirmation.",
      "ตกลงวัสดุ ขนาด และรายละเอียดการประกอบที่ต้องการตรวจจากตัวอย่าง พร้อมบันทึกสิ่งที่ยังต้องยืนยัน",
    ),
    takeaway: copy(
      "Use each sample round to answer specific questions.",
      "ให้ตัวอย่างแต่ละรอบช่วยตอบคำถามที่ชัดเจน",
    ),
    cta: copy("Plan your sample round", "อ่านแนวทางเตรียมตัวอย่าง"),
    related: [
      "how-to-choose-fabric",
      "preparing-size-specifications",
      "sample-approval-process",
    ],
  },
  {
    slug: "sample-approval-process",
    topic: "sampling",
    complete: true,
    category: copy("04 / Sample approval", "04 / อนุมัติตัวอย่าง"),
    title: copy(
      "Approve a garment sample with a clear production reference",
      "อนุมัติตัวอย่างเสื้อผ้าให้เป็นแบบอ้างอิงก่อนผลิตจริง",
    ),
    excerpt: copy(
      "Review fit, measurements, fabric and finishing together. Turn revision notes into a documented decision before releasing the style for bulk production.",
      "ตรวจความพอดี ขนาด ผ้า และงานตกแต่งร่วมกัน แล้วสรุปการแก้ไขและการอนุมัติเป็นหลักฐานก่อนผลิตจริง",
    ),
    takeaway: copy(
      "Make approval specific, versioned and traceable.",
      "ระบุสิ่งที่อนุมัติและเวอร์ชันให้ตรวจสอบได้",
    ),
    cta: copy("Read the approval guide", "อ่านแนวทางอนุมัติตัวอย่าง"),
    related: [
      "preparing-sample-development",
      "quality-checkpoints-before-production",
      "preparing-bulk-production-and-delivery",
    ],
  },
  {
    slug: "choosing-printing-and-embroidery",
    topic: "decoration",
    complete: false,
    category: copy("05 / Print & embroidery", "05 / พิมพ์และปัก"),
    title: copy(
      "Choose printing or embroidery for your design and fabric",
      "เลือกเทคนิคพิมพ์หรือปักให้เหมาะกับแบบและผ้า",
    ),
    excerpt: copy(
      "Review artwork size, placement, colours and the desired surface feel with the factory before choosing a decoration technique.",
      "ตรวจขนาดลาย ตำแหน่ง สี และสัมผัสที่ต้องการร่วมกับโรงงาน ก่อนเลือกเทคนิคตกแต่งที่เหมาะกับชิ้นงาน",
    ),
    takeaway: copy(
      "Review the decoration on the intended material.",
      "ตรวจงานตกแต่งบนวัสดุที่ต้องการใช้จริง",
    ),
    cta: copy("Compare decoration options", "อ่านแนวทางเลือกงานตกแต่ง"),
    related: [
      "how-to-choose-fabric",
      "preparing-sample-development",
      "sample-approval-process",
    ],
  },
  {
    slug: "preparing-size-specifications",
    topic: "planning",
    complete: false,
    category: copy("06 / Sizes & measurements", "06 / ไซซ์และขนาด"),
    title: copy(
      "Prepare a size specification the team can measure consistently",
      "เตรียมตารางไซซ์และจุดวัดให้ทีมงานเข้าใจตรงกัน",
    ),
    excerpt: copy(
      "List the size range, measurement points and units. Agree how each point is measured and which sample will be used to review the fit.",
      "ระบุช่วงไซซ์ จุดวัด และหน่วยให้ชัดเจน ตกลงวิธีวัดแต่ละจุดและตัวอย่างที่จะใช้ตรวจความพอดี",
    ),
    takeaway: copy(
      "Show where to measure, not only the number.",
      "บอกจุดและวิธีวัดควบคู่กับตัวเลข",
    ),
    cta: copy("Build your size specification", "อ่านแนวทางเตรียมตารางไซซ์"),
    related: [
      "preparing-garment-production-brief",
      "preparing-sample-development",
      "sample-approval-process",
    ],
  },
  {
    slug: "planning-moq-and-order-quantity",
    topic: "planning",
    complete: false,
    category: copy("07 / Order quantities", "07 / จำนวนผลิต"),
    title: copy(
      "Discuss MOQ and plan quantities by style, colour and size",
      "วางแผนจำนวนผลิตและสอบถาม MOQ แยกตามแบบ สี และไซซ์",
    ),
    excerpt: copy(
      "Prepare your intended quantity breakdown and ask how fabric availability, trims and decoration affect the quotation for your particular project.",
      "เตรียมจำนวนที่ต้องการแยกตามแบบ สี และไซซ์ แล้วสอบถามว่าผ้า อุปกรณ์ และงานตกแต่งมีผลต่อใบเสนอราคาอย่างไร",
    ),
    takeaway: copy(
      "Confirm the MOQ for your actual design.",
      "ยืนยัน MOQ ตามแบบและวัสดุของคุณ",
    ),
    cta: copy("Plan the order breakdown", "อ่านแนวทางวางแผนจำนวน"),
    related: [
      "preparing-garment-production-brief",
      "how-to-choose-fabric",
      "preparing-bulk-production-and-delivery",
    ],
  },
  {
    slug: "quality-checkpoints-before-production",
    topic: "production",
    complete: false,
    category: copy("08 / Quality checkpoints", "08 / จุดตรวจคุณภาพ"),
    title: copy(
      "Agree quality checkpoints before bulk production begins",
      "ตกลงจุดตรวจคุณภาพก่อนเริ่มผลิตเสื้อผ้าจริง",
    ),
    excerpt: copy(
      "Use the approved sample to discuss material checks, in-line sewing checks and end-line inspection, including how corrections will be reviewed.",
      "ใช้ตัวอย่างที่อนุมัติคุยเรื่องตรวจวัสดุ สุ่มตรวจระหว่างเย็บ และตรวจหลังเย็บ รวมถึงวิธีตรวจซ้ำเมื่อมีการแก้ไข",
    ),
    takeaway: copy(
      "Make the production reference clear before checking against it.",
      "กำหนดแบบอ้างอิงให้ชัดก่อนนำไปตรวจงาน",
    ),
    cta: copy("Review the quality checkpoints", "อ่านแนวทางจุดตรวจคุณภาพ"),
    related: [
      "sample-approval-process",
      "preparing-size-specifications",
      "preparing-bulk-production-and-delivery",
    ],
  },
  {
    slug: "preparing-bulk-production-and-delivery",
    topic: "production",
    complete: false,
    category: copy("09 / Production & delivery", "09 / ผลิตและส่งมอบ"),
    title: copy(
      "Prepare for bulk production, packing and delivery",
      "เตรียมพร้อมก่อนผลิตจริง แพ็ก และส่งมอบสินค้า",
    ),
    excerpt: copy(
      "Confirm the approved version, quantity breakdown, labels, packing instructions and delivery details before the factory schedules your order.",
      "ยืนยันแบบที่อนุมัติ จำนวน ป้าย วิธีแพ็ก และรายละเอียดส่งมอบ ก่อนวางแผนผลิตออร์เดอร์ร่วมกับโรงงาน",
    ),
    takeaway: copy(
      "Plan the handover as carefully as the garment.",
      "เตรียมการส่งมอบให้ชัดเจนเช่นเดียวกับตัวสินค้า",
    ),
    cta: copy(
      "Prepare your production handover",
      "อ่านแนวทางเตรียมผลิตและส่งมอบ",
    ),
    related: [
      "planning-moq-and-order-quantity",
      "sample-approval-process",
      "quality-checkpoints-before-production",
    ],
  },
];

export const guideTopics: readonly { id: GuideTopic; label: LocalisedCopy }[] =
  [
    { id: "planning", label: copy("Brief & planning", "บรีฟและวางแผน") },
    { id: "materials", label: copy("Fabrics", "ผ้าและวัสดุ") },
    {
      id: "sampling",
      label: copy("Samples & approval", "ตัวอย่างและการอนุมัติ"),
    },
    { id: "decoration", label: copy("Print & embroidery", "พิมพ์และปัก") },
    { id: "production", label: copy("Production & delivery", "ผลิตและส่งมอบ") },
  ];

export function findGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
export function guidePath(slug: string) {
  return `/guides/${slug}`;
}
export function filterGuides(topic: string, query: string) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return guides.filter((guide) => {
    if (topic !== "all" && guide.topic !== topic) return false;
    const searchable = [
      guide.title.en,
      guide.title.th,
      guide.excerpt.en,
      guide.excerpt.th,
      guide.category.en,
      guide.category.th,
      guide.takeaway.en,
      guide.takeaway.th,
      guide.topic,
      guide.slug,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return words.every((word) => searchable.includes(word));
  });
}
