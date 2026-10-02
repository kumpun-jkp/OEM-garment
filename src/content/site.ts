export const navigation = [
  { href: "/", label: "Home", th: "หน้าแรก" },
  { href: "/about", label: "About Us", th: "เกี่ยวกับเรา" },
  { href: "/our-work", label: "Our Work", th: "ผลงานของเรา" },
  { href: "/oem-journey", label: "Journey", th: "ขั้นตอนการผลิต" },
  { href: "/technical-insights", label: "Insights", th: "ข้อมูลเทคนิค" },
  { href: "/contact", label: "Contact Us", th: "ติดต่อเรา" },
] as const;

export const copy = {
  intro:
    "TM Apparel คือพาร์ตเนอร์ด้านการผลิตเสื้อผ้า OEM สำหรับแบรนด์ไทยและต่างประเทศ เราดูแลงานตั้งแต่รับบรีฟ ทำตัวอย่าง ผลิตจริง ตรวจคุณภาพ จนถึงส่งมอบ",
  why: "สำหรับเรา งานผลิตที่ดีเริ่มต้นก่อนเข็มจักรเริ่มเดิน ด้วยการเข้าใจแบบสินค้า จำนวนที่ต้องการ การใช้งาน และกำหนดส่งมอบ เพื่อให้ทุกขั้นตอนของโครงการเป็นไปในทิศทางเดียวกัน",
  gateways:
    "ไม่ว่าคุณจะมีตัวอย่างสินค้าอยู่แล้ว หรือมีเพียงไอเดียเบื้องต้น ส่งรายละเอียดที่มีมาให้เราได้ ทีมงานจะช่วยประเมินและพูดคุยถึงขั้นตอนถัดไปที่เหมาะกับโครงการของคุณ",
  customers:
    "TM Apparel เรามีประสบการณ์ผลิตเสื้อผ้าให้แก่ศูนย์การค้าชั้นนำของไทย สะท้อนความเข้าใจในการทำงานร่วมกับลูกค้าค้าปลีกและแบรนด์ที่มีความต้องการแตกต่างกัน",
  visit:
    "เรายินดีต้อนรับผู้บริหารหน่วยงาน ทีมพัฒนาผลิตภัณฑ์ หรือเจ้าของแบรนด์ เข้าชมกระบวนการผลิตของโรงงานโดยตรง พร้อมนัดหมายล่วงหน้าเพื่อพูดคุยความต้องการของแบรนด์ และเยี่ยมชมโรงงานของเราเพื่อศึกษาแนวทางการทำงานของเราก่อนเริ่มผลิต",
  journey:
    "TM Apparel ดูแลงานผลิตเสื้อผ้า OEM ตั้งแต่รับรายละเอียด ประเมินความเป็นไปได้ ทำตัวอย่าง ผลิตจริง ตรวจคุณภาพ จนถึงการส่งมอบ เพื่อให้ทุกโปรเจกต์มีความชัดเจนตั้งแต่เริ่มต้น",
  about:
    "TM Apparel คือ Partner ด้านการผลิตเสื้อผ้า OEM สำหรับแบรนด์ไทยและต่างประเทศ ที่พร้อมเปลี่ยนไอเดียให้เป็นสินค้าพร้อมขาย เราดูแลทุกขั้นตอนอย่างใกล้ชิด ตั้งแต่รับบรีฟ ประเมินความเป็นไปได้ พัฒนาตัวอย่าง ผลิตจริง ตรวจคุณภาพ จนถึงส่งมอบ เพื่อให้ทุกโปรเจกต์เดินหน้าได้อย่างชัดเจน มั่นใจ และตรงตามเป้าหมายตั้งแต่ต้นจนจบ",
} as const;

export const assets = {
  hero: "/media/077ebd5701c67272.jpeg",
  aboutHero: "/media/e578014d7678b67d.jpeg",
  workHero: "/media/97b64963cb13fbef.jpeg",
  factory: "/media/31fbb00bba478309.jpeg",
  idea: "/media/8c63453655491259.jpeg",
  production: "/media/66d98d869ed03a07.jpeg",
  manufacturing: "/media/1669e96efd424299.jpeg",
  marrow: "/media/23486c449fac44a7.jpeg",
  arcadia: "/media/9d6b90ac45452bc1.jpeg",
  fabric: "/media/7c1d0775aab27e3c.jpeg",
  quality: "/media/17a6624764c35a5c.jpeg",
  journeyHero: "/media/45743959c833f84f.jpeg",
  materialScience: "/media/83f158669e513fa8.jpeg",
  startFactory: "/media/f5a46c7c8448783b.jpeg",
  facilities: [
    "/media/5850c3234f9d2253.jpeg",
    "/media/ff79d56abd6fffa6.jpeg",
    "/media/bb91e0155c0799c5.jpeg",
  ],
  team: [
    "/media/ce1c79bf6c53872d.jpeg",
    "/media/87442a2b4289ae79.jpeg",
    "/media/2360744347985c8d.jpeg",
  ],
  contact: [
    "/media/af23acb8bb213647.jpeg",
    "/media/d5c6dc20b94a0566.jpeg",
    "/media/52cad6bcddb90955.jpeg",
  ],
} as const;

// The repeated case metadata and six images are present in the approved Figma frames.
export const cases = [
  "/media/431be4e5a73b6df6.jpeg",
  "/media/64fb4e9e0b1a8da6.jpeg",
  "/media/4a4d21039b91692b.jpeg",
  "/media/216af5a8a21fa538.jpeg",
  "/media/3381904ee8b51958.jpeg",
  "/media/d4255ca03b962fd1.jpeg",
].map((image, index) => ({
  id: `production-${index + 1}`,
  image,
  alt: [
    "Black embroidered garment",
    "Blue workwear shirt",
    "Blue garment detail",
    "Garment fabric cutting",
    "Beige polo shirt",
    "Black T-shirt",
  ][index],
  title: "Tokyo streetwear drop-shoulder hoodie batch",
  category: "Streetwear & heavyweight jersey",
  fabric: "500 GSM Loopback French Terry",
  finish: "High-Density 3D Puff / Stone Wash",
  lot: index === 1 ? "12,000" : "4,500",
}));

export const stages = [
  [
    "Discovery & spec intake",
    "ส่งตัวอย่าง จำนวน และวันที่ต้องการ เพื่อให้ทีมเข้าใจความต้องการของคุณตั้งแต่ต้น",
    "ข้อมูลเบื้องต้นสำหรับประเมินงาน",
  ],
  [
    "Feasibility & quotation",
    "ทีมงานประเมินรูปแบบสินค้า วัสดุ จำนวนผลิต และเงื่อนไขที่เกี่ยวข้อง",
    "แนวทางการผลิตและใบเสนอราคา",
  ],
  [
    "Tech pack & lab dips",
    "ร่วมกันเลือกผ้า สี และวัสดุ ที่เหมาะกับรูปแบบสินค้า การใช้งาน",
    "รายละเอียดวัสดุสำหรับทำตัวอย่าง",
  ],
  [
    "Prototyping & bilateral NDA",
    "ผลิตตัวอย่างเพื่อให้ลูกค้าตรวจสอบ ก่อนเริ่มการผลิตจริง",
    "ตัวอย่างสินค้าเพื่อพิจารณา",
  ],
  [
    "Master pattern & final prototype",
    "ลูกค้าตรวจสอบและยืนยันตัวอย่าง ก่อนเข้าสู่ขั้นตอนการผลิตจริง",
    "ข้อสรุปก่อนเริ่มผลิต",
  ],
  [
    "Bulk CAM & assembly line",
    "เริ่มการผลิตตามรายละเอียดที่ได้รับการอนุมัติ ติดตามขั้นตอนการทำงานตามแผน",
    "สินค้าตามจำนวนที่ตกลง",
  ],
  [
    "Quality control & AQL audit",
    "ตรวจสอบงานตามขั้นตอนที่เกี่ยวข้อง ก่อนเข้าสู่การแพ็กสินค้า",
    "สินค้าพร้อมจัดส่ง",
  ],
  [
    "Packaging & port dispatch",
    "ดำเนินการแพ็กสินค้าและเตรียมส่งมอบ ตามรายละเอียดที่ตกลงกับลูกค้า",
    "ส่งสินค้าถึงมือลูกค้า พร้อมจำหน่าย",
  ],
] as const;

export const machinery = [
  {
    zone: "Zone 01 // Cutting bay",
    title: "Automated Gerber CAM Vector cutting & CAD digitization",
    body: "Equipped with Gerber Paragon multi-ply vacuum cutting tables and digitising optical cameras. Translates DXF/AAMA nested patterns directly into real-time blade motions without perimeter distortion.",
    details: [
      ["Max ply depth", "7.2 cm compressed"],
      ["Laser precision", "±0.25 mm"],
      ["Throughput", "12,000 cut pieces / day"],
    ],
  },
  {
    zone: "Zone 02 // Sewing lines",
    title: "Precision sewing & flatlock assembly lines",
    body: "Configured with 8 parallel modular assembly cells featuring high-speed direct-drive Juki lockstitch, Brother programmable bartack, and Yamato cylinder-bed 4-needle flatlock workstations.",
    details: [
      ["Machine roster", "142 direct-drive heads"],
      ["Assembly types", "Flatlock, overlock, single"],
      ["Output density", "8,000 assembled tees / shift"],
    ],
  },
  {
    zone: "Zone 03 // Lab & embellishment",
    title: "Embellishment & chemistry lab",
    body: "In-house chemical formulation facility hosting an M&R 12-colour automatic screen carousel, Tajima 20-head multi-colour embroidery arrays, and high-pressure ultrasonic seam-welding presses.",
    details: [
      ["Ink standards", "Waterbase / discharge / silicone"],
      ["Embroidery resolution", "Up to 1,000 SPM / head"],
      ["Bonding rigor", "Bemis tape certified"],
    ],
  },
  {
    zone: "Zone 04 // Audit & detection",
    title: "4-tier quality control & needle scan tunnel bay",
    body: "Rigorous inline verification including 100% initial cut audit, roaming line QA checkpoints, end-of-line measurement charting, and automated conveyorised magnetic needle detection tunnels.",
    details: [
      ["Metal sensitivity", "Fe 0.8 mm calibrated"],
      ["AQL benchmark", "AQL 1.0 critical / 1.5 major"],
      ["Audit log", "Digital real-time ledger"],
    ],
  },
  {
    zone: "Zone 05 // Logistics & export",
    title: "Clean room packing & customs-sealed",
    body: "Climate-controlled clean packaging bay equipped with automated bagging machines, anti-microbial desiccants, barcode serialisation, and direct customs documentation seals for export departure.",
    details: [
      ["Port proximity", "12.4 km to Klong Toey terminal"],
      ["Customs integration", "Paperless EDI direct filing"],
      ["Security seal", "ISO 17712 high-security bolted"],
    ],
  },
] as const;
