import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { copyRefinements } from "../src/content/copy-refinements.ts";
import { createTranslator } from "../src/lib/locale.ts";
import { loadDictionaries } from "./lib/load-dictionaries.mjs";

const root = new URL("../", import.meta.url);
const inventoryPath = new URL("artifacts/COPY_REVIEW.json", root);
// Preserve the captured original copy; this report can be regenerated after edits.
const inventory = JSON.parse(await fs.readFile(inventoryPath, "utf8"));
const dictionaries = await loadDictionaries();
const en = createTranslator(dictionaries.en);
const th = createTranslator(dictionaries.th);
const refinements = new Map(copyRefinements.map((item) => [item[1], item]));
assert.equal(refinements.size, copyRefinements.length, "Duplicate copy source");
const sourceFiles = [];
async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (
      /\.(?:ts|tsx)$/.test(file) &&
      !/translations|copy-refinements/.test(file)
    )
      sourceFiles.push({ file, text: await fs.readFile(file, "utf8") });
  }
}
await scan(fileURLToPath(new URL("src/", root)));
for (const record of inventory.records) {
  record.recommended = { en: en(record.key), th: th(record.key) };
  const refinement =
    refinements.get(record.key) ??
    copyRefinements.find(
      (item) =>
        item[2] === record.recommended.en && item[3] === record.recommended.th,
    );
  record.changed =
    record.original.en !== record.recommended.en ||
    record.original.th !== record.recommended.th;
  record.section = refinement?.[0] ?? "Retained copy";
  record.reasoning =
    refinement?.[4] ??
    "คงข้อความเดิม เพราะระบุข้อมูล หน้าที่ หรือคำศัพท์เฉพาะได้ชัดเจนอยู่แล้ว ไม่จำเป็นต้อง rewrite เพื่อให้แตกต่าง";
  record.locations = sourceFiles.flatMap(({ file, text }) => {
    const index = text.indexOf(record.key);
    const thaiIndex = text.indexOf(record.original.th);
    const position = index >= 0 ? index : thaiIndex;
    return position < 0
      ? []
      : [
          {
            file: path
              .relative(fileURLToPath(root), file)
              .replaceAll("\\", "/"),
            line: text.slice(0, position).split("\n").length,
          },
        ];
  });
}
for (const key of refinements.keys())
  assert(
    inventory.records.some((item) => item.key === key),
    `Source absent from review: ${key}`,
  );
await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + "\n");

const changed = inventory.records
  .filter((item) => item.changed)
  .sort(
    (a, b) =>
      copyRefinements.findIndex((item) => item[0] === a.section) -
      copyRefinements.findIndex((item) => item[0] === b.section),
  );
const retained = inventory.records.filter((item) => !item.changed);
function entry(record, number) {
  number += 1;
  const locations = record.locations
    .map(({ file, line }) => `\`${file}:${line}\``)
    .join(", ");
  return `### ${number}. ${record.section}\n\n${locations ? `ตำแหน่ง: ${locations}\n\n` : ""}**Original**\n\nTH: ${record.original.th}\n\nEN: ${record.original.en}\n\n**Recommended Version**\n\nTH: ${record.recommended.th}\n\nEN: ${record.recommended.en}\n\n**Reasoning**\n\n${record.reasoning}\n`;
}
const introduction = `# Website Copy Review — Thonburi Master / TM Apparel

วันที่ตรวจ: 5 ตุลาคม 2026

ตรวจจาก source code และข้อความสองภาษาของเว็บไซต์ปัจจุบัน ครอบคลุม Home, About Us, Our Work, OEM Journey, Garment Style References, Technical Insights, Start Your Project, Contact, navigation, footer, metadata, image descriptions และข้อความสถานะ/ข้อผิดพลาด

ทบทวน ${inventory.records.length} รายการข้อความสองภาษาใน dictionary: ปรับ ${changed.length} รายการ และคง ${retained.length} รายการที่ชัดเจนอยู่แล้ว รายการอาจถูกใช้ในหลายหน้า หรือเป็นข้อความสำรองใน framework ไม่ใช่จำนวน section บนเว็บไซต์

เวอร์ชันที่แนะนำถูกนำไปใช้ผ่าน locale dictionary แล้ว โดยเก็บ source key เดิมเพื่อให้หน้าและ component ที่ใช้ร่วมกันอ้างอิงได้ต่อเนื่อง ภาษาไทยคงศัพท์เทคนิคที่ช่วยความแม่นยำ ภาษาอังกฤษใช้ภาษาอังกฤษและชื่อ romanised ตาม locale policy เดิม

## หลักการและขอบเขตข้อมูล

- เริ่มจากคำถามของลูกค้า: รับผลิตอะไร เริ่มอย่างไร ต้องเตรียมอะไร และจะเกิดอะไรต่อไป
- ให้ความน่าเชื่อถือผ่านกระบวนการที่มีอยู่ แทนคำโอ้อวดหรือคำรับประกันใหม่
- คงชื่อ Product Category, Material, เทคนิคการผลิต, Specification, ขั้นตอนหลัก และตัวเลขธุรกิจเดิม
- คงค่าตัวอย่าง 1,000–2,000 บาท มัดจำ 50% และระยะเวลาโดยประมาณ พร้อมข้อจำกัดเรื่องผ้า จำนวน และการยืนยันกำหนดการ
- แยกผล customer audit ที่มีช่วงเวลาออกจาก Certification ปัจจุบัน ไม่ได้ตรวจยืนยันเอกสารธุรกิจต้นฉบับใหม่ในงานนี้
- คงสถานะยังไม่ส่งคำสอบถามเมื่อระบบส่งแบบฟอร์มยังไม่ตั้งค่า ไม่มีคำสัญญาตอบกลับภายในเวลาที่ไม่ได้ระบุไว้เดิม
- แก้รายการ Insights ที่แสดงเนื้อหาเดียวซ้ำ 9 ครั้งให้เป็น 1 รายการจริง ไม่ได้สร้างบทความใหม่ จำนวนนี้เป็นการแก้การแสดงผล ไม่ใช่การเปลี่ยนตัวเลขธุรกิจ
- รูปอ้างอิงและภาพที่สร้างด้วย AI ยังคงป้ายกำกับเดิม ไม่เปลี่ยนให้ดูเป็นผลงานลูกค้าหรือภาพโรงงานจริง

## การตรวจที่ยังต้องอาศัยเจ้าของข้อมูล

ข้อความนี้เป็นการปรับภาษาโดยยึดข้อมูลเดิม ไม่ใช่การรับรองความถูกต้องของกำลังผลิต สวัสดิการ สิทธิ์ใช้โลโก้ หรืออายุเอกสาร audit ใหม่ ผล Big C ที่แสดงยังคงเป็นปี 2025 และยังไม่เพิ่มผลปี 2026 ข้อกำหนด NDA, privacy และการผลิตยังต้องยืนยันตามข้อตกลงจริงก่อนใช้กับลูกค้า

## รายการที่ปรับ
`;
await fs.writeFile(
  new URL("artifacts/COPY_REVIEW.md", root),
  introduction +
    "\n" +
    changed.map(entry).join("\n") +
    `\n## รายการที่คงเดิม\n\nดู [RETAINED_COPY.md](copy-review/RETAINED_COPY.md) สำหรับ Original / Recommended Version / Reasoning ของ ${retained.length} รายการที่คงเดิม และ [COPY_REVIEW.json](COPY_REVIEW.json) สำหรับข้อมูลทั้งหมดที่ค้นหาหรือกรองได้\n`,
);
await fs.mkdir(new URL("artifacts/copy-review/", root), { recursive: true });
await fs.writeFile(
  new URL("artifacts/copy-review/RETAINED_COPY.md", root),
  `# ข้อความที่คงเดิม\n\nคงคำอธิบายที่ชัดเจน ชื่อสินค้าและเทคนิค ตัวเลขธุรกิจ เงื่อนไข ระบบ validation และคำบรรยายภาพที่ตรงกับเนื้อหา รายการที่คงเดิมไม่ได้หมายถึงการยืนยันข้อเท็จจริงจากเอกสารภายนอกใหม่\n\n` +
    retained.map(entry).join("\n"),
);
console.log(
  `Reviewed ${inventory.records.length} entries: ${changed.length} changed, ${retained.length} retained.`,
);
