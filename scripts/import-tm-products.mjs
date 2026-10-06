import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

// Reviewed against every supplied image. Numbers refer to source-inventory.json,
// not manufacturer SKUs. Each row is one distinct style/print, with its primary
// full-garment view first. Alternative views never create another catalogue card.
const products = [];
function add(
  group,
  numbers,
  category,
  subcategory,
  shape,
  title,
  th,
  description,
  descriptionTh,
  note = "Matching garment, print and construction; full view followed by additional views.",
) {
  const codes = numbers.map((n) => `${group}-${String(n).padStart(2, "0")}`);
  products.push({
    id: `tm-${codes[0]}`,
    audience: "adults",
    category,
    ...(subcategory ? { subcategory } : {}),
    shape,
    title,
    th,
    description,
    descriptionTh,
    codes,
    note,
  });
}
const skirt = (n, title, th, description, descriptionTh, note) =>
  add(
    "skirt",
    n,
    "skirts",
    undefined,
    "skirt",
    title,
    th,
    description,
    descriptionTh,
    note,
  );
skirt(
  [1],
  "Black dotted tiered skirt",
  "กระโปรงระบายลายจุดสีดำ",
  "A long tiered skirt with a small dotted print.",
  "กระโปรงยาวต่อระบาย พิมพ์ลายจุดขนาดเล็ก",
);
skirt(
  [2],
  "Gingham tiered skirt",
  "กระโปรงระบายลายตาราง",
  "A long tiered skirt with a black and white gingham print.",
  "กระโปรงยาวต่อระบาย ลายตารางสีดำและขาว",
);
add(
  "skirt",
  [3],
  "trousers",
  "shorts",
  "shorts",
  "Pink plaid pocket skorts",
  "กางเกงกระโปรงลายตารางสีชมพู",
  "Skorts with a front overlay, side buckle and two flap pockets.",
  "กางเกงกระโปรงมีผ้าปิดด้านหน้า หัวเข็มขัดด้านข้าง และกระเป๋าฝาสองข้าง",
  "Source label explicitly says Skorts. Assigned to Shorts by construction. Distinct from short-31/32: overlay, buckle and front pockets differ.",
);
add(
  "skirt",
  [4, 5],
  "trousers",
  "shorts",
  "shorts",
  "Beige wrap skorts",
  "กางเกงกระโปรงแบบป้ายสีเบจ",
  "Wrap-style skorts with a side tie.",
  "กางเกงกระโปรงแบบป้าย มีเชือกผูกด้านข้าง",
  "Source label explicitly says Skorts. Full garment and matching tie detail; assigned to Shorts.",
);
skirt(
  [6, 7],
  "Blue pocket skirt",
  "กระโปรงกระเป๋าสีฟ้า",
  "A short A-line skirt with two front flap pockets.",
  "กระโปรงสั้นทรงเอ มีกระเป๋าฝาด้านหน้าสองข้าง",
);
skirt(
  [8, 9],
  "Polka-dot pocket skirt",
  "กระโปรงกระเป๋าลายจุด",
  "A short white skirt with black dots and two front flap pockets.",
  "กระโปรงสั้นสีขาวลายจุดสีดำ มีกระเป๋าฝาด้านหน้าสองข้าง",
);

const long = (n, title, th, description, descriptionTh) =>
  add(
    "long",
    n,
    "trousers",
    "long-trousers",
    "trousers",
    title,
    th,
    description,
    descriptionTh,
  );
long(
  [1, 2, 3],
  "Striped drawstring trousers",
  "กางเกงขายาวลายทางผูกเชือก",
  "Striped trousers with an elastic drawstring waist and side pockets.",
  "กางเกงขายาวลายทาง เอวยางยืดผูกเชือกและกระเป๋าด้านข้าง",
);
long(
  [4, 5],
  "White drawstring trousers",
  "กางเกงขายาวสีขาวผูกเชือก",
  "White straight-leg trousers with an elastic drawstring waist.",
  "กางเกงขายาวสีขาวทรงตรง เอวยางยืดผูกเชือก",
);
long(
  [6, 7],
  "Black contrast-tip drawstring trousers",
  "กางเกงขายาวสีดำเชือกปลายสีตัด",
  "Black trousers with a drawstring waist and contrasting cord tips.",
  "กางเกงขายาวสีดำ เอวผูกเชือกพร้อมปลายเชือกสีตัด",
);
long(
  [8, 9],
  "Medallion-print trousers",
  "กางเกงขายาวลายเมดัลเลียน",
  "Printed trousers with an elastic waist and a repeating medallion pattern.",
  "กางเกงขายาวเอวยางยืด พิมพ์ลายเมดัลเลียนซ้ำ",
);
long(
  [10, 11],
  "Navy elastic-waist trousers",
  "กางเกงขายาวเอวยางยืดสีกรมท่า",
  "Navy trousers with a gathered elastic waist.",
  "กางเกงขายาวสีกรมท่า เอวยางยืด",
);
long(
  [12, 13],
  "Black elastic-waist trousers",
  "กางเกงขายาวเอวยางยืดสีดำ",
  "Black trousers with a gathered elastic waist and drawstring.",
  "กางเกงขายาวสีดำ เอวยางยืดพร้อมเชือกผูก",
);
long(
  [14, 15],
  "Navy striped easy linen trousers",
  "กางเกงขายาวอีซี่ลินินลายทางสีกรมท่า",
  "Navy pinstriped trousers with a drawstring waist, labelled Easy Linen Pants in the supplied images.",
  "กางเกงขายาวลายทางสีกรมท่า เอวผูกเชือก ระบุชื่อ Easy Linen Pants ในภาพต้นฉบับ",
);
long(
  [16, 17],
  "Beige striped easy linen trousers",
  "กางเกงขายาวอีซี่ลินินลายทางสีเบจ",
  "Beige pinstriped trousers with a drawstring waist, labelled Easy Linen Pants in the supplied images.",
  "กางเกงขายาวลายทางสีเบจ เอวผูกเชือก ระบุชื่อ Easy Linen Pants ในภาพต้นฉบับ",
);
long(
  [18, 19, 20],
  "Beige unisex trousers",
  "กางเกงขายาวยูนิเซ็กซ์สีเบจ",
  "Beige trousers with side pockets and an elastic waist, labelled Unisex in the supplied images.",
  "กางเกงขายาวสีเบจ มีกระเป๋าข้างและเอวยางยืด ระบุ Unisex ในภาพต้นฉบับ",
);
long(
  [21, 22],
  "Ivory pleated trousers",
  "กางเกงขายาวจับจีบสีงาช้าง",
  "Ivory straight-leg trousers with front pleats and a button waist.",
  "กางเกงขายาวสีงาช้างทรงตรง จับจีบด้านหน้าและเอวติดกระดุม",
);
long(
  [23, 24],
  "Beige straight-leg trousers",
  "กางเกงขายาวทรงตรงสีเบจ",
  "Beige straight-leg trousers with front pleats and side pockets.",
  "กางเกงขายาวสีเบจทรงตรง จับจีบด้านหน้าและมีกระเป๋าข้าง",
);
long(
  [25, 26],
  "Camel pleated trousers",
  "กางเกงขายาวจับจีบสีน้ำตาลอ่อน",
  "Camel-coloured trousers with front pleats and a button waist.",
  "กางเกงขายาวสีน้ำตาลอ่อน จับจีบด้านหน้าและเอวติดกระดุม",
);
long(
  [27, 28],
  "Charcoal pinstriped trousers",
  "กางเกงขายาวลายทางสีเทาเข้ม",
  "Charcoal pinstriped trousers with a tailored front waist.",
  "กางเกงขายาวลายทางสีเทาเข้ม เอวด้านหน้าแบบเรียบ",
);
long(
  [29, 30],
  "Brown formal trousers",
  "กางเกงขายาวแบบทางการสีน้ำตาล",
  "Brown formal trousers with belt loops and a button fastening.",
  "กางเกงขายาวแบบทางการสีน้ำตาล มีหูเข็มขัดและกระดุมเอว",
);
long(
  [31, 32],
  "Charcoal formal trousers",
  "กางเกงขายาวแบบทางการสีเทาเข้ม",
  "Charcoal formal trousers with belt loops and a button fastening.",
  "กางเกงขายาวแบบทางการสีเทาเข้ม มีหูเข็มขัดและกระดุมเอว",
);

const shorts = (n, title, th, description, descriptionTh, note) =>
  add(
    "short",
    n,
    "trousers",
    "shorts",
    "shorts",
    title,
    th,
    description,
    descriptionTh,
    note,
  );
shorts(
  [1, 2, 3, 4, 5, 6],
  "Cuffed denim shorts",
  "กางเกงขาสั้นเดนิมพับปลายขา",
  "Indigo denim shorts with turned-up hems, shown flat and on a model.",
  "กางเกงขาสั้นเดนิมสีคราม พับปลายขา มีภาพวางสินค้าและภาพสวมใส่",
);
shorts(
  [7, 8, 9],
  "Navy patch-pocket shorts",
  "กางเกงขาสั้นกระเป๋าปะสีกรมท่า",
  "Navy shorts with an elastic waist and front patch pockets.",
  "กางเกงขาสั้นสีกรมท่า เอวยางยืดและกระเป๋าปะด้านหน้า",
);
shorts(
  [10, 11, 12],
  "Mustard patch-pocket shorts",
  "กางเกงขาสั้นกระเป๋าปะสีมัสตาร์ด",
  "Mustard shorts with an elastic waist and patch pockets.",
  "กางเกงขาสั้นสีมัสตาร์ด เอวยางยืดและกระเป๋าปะ",
);
shorts(
  [13, 14, 15],
  "Cream pinstriped shorts",
  "กางเกงขาสั้นลายทางสีครีม",
  "Cream pinstriped shorts with an elastic waist.",
  "กางเกงขาสั้นลายทางสีครีม เอวยางยืด",
);
shorts(
  [16, 17, 18],
  "Ivory tailored shorts",
  "กางเกงขาสั้นจับจีบสีงาช้าง",
  "Ivory shorts with front pleats and a button waist.",
  "กางเกงขาสั้นสีงาช้าง จับจีบด้านหน้าและเอวติดกระดุม",
);
shorts(
  [19, 20],
  "Ivory longline shorts",
  "กางเกงขาสั้นทรงยาวสีงาช้าง",
  "Longer-cut ivory shorts with pleats and belt loops.",
  "กางเกงขาสั้นทรงยาวสีงาช้าง จับจีบและมีหูเข็มขัด",
);
shorts(
  [21],
  "Olive pleated shorts",
  "กางเกงขาสั้นจับจีบสีเขียวมะกอก",
  "Olive shorts with front pleats and a button waist.",
  "กางเกงขาสั้นสีเขียวมะกอก จับจีบด้านหน้าและเอวติดกระดุม",
);
shorts(
  [22],
  "Navy tie-belt shorts",
  "กางเกงขาสั้นผูกเอวสีกรมท่า",
  "Navy shorts with a matching tie belt.",
  "กางเกงขาสั้นสีกรมท่า พร้อมสายผูกเอวสีเดียวกัน",
);
shorts(
  [23, 24, 25],
  "Pastel striped shorts",
  "กางเกงขาสั้นลายทางสีพาสเทล",
  "Pastel striped shorts with an elastic waist and front patch pockets.",
  "กางเกงขาสั้นลายทางสีพาสเทล เอวยางยืดและกระเป๋าปะด้านหน้า",
);
shorts(
  [26, 27, 28],
  "Geometric printed shorts",
  "กางเกงขาสั้นพิมพ์ลายเรขาคณิต",
  "Geometric printed shorts shown in blue and purple colourways.",
  "กางเกงขาสั้นพิมพ์ลายเรขาคณิต มีภาพสีฟ้าและสีม่วง",
  "The primary source board presents both colourways together; matching on-model views remain one product gallery.",
);
shorts(
  [29, 30],
  "Slate-blue drawstring shorts",
  "กางเกงขาสั้นผูกเชือกสีฟ้าเทา",
  "Slate-blue shorts with front pleats and a drawstring waist.",
  "กางเกงขาสั้นสีฟ้าเทา จับจีบด้านหน้าและเอวผูกเชือก",
);
shorts(
  [31, 32],
  "Grey plaid cargo shorts",
  "กางเกงขาสั้นกระเป๋าข้างลายตารางสีเทา",
  "Grey plaid shorts with side flap pockets and an elastic back waist.",
  "กางเกงขาสั้นลายตารางสีเทา มีกระเป๋าฝาด้านข้างและเอวยางยืดด้านหลัง",
  "Matching front and back views. Distinct from skirt-03 skorts: no front overlay or buckle, side pockets and grey colour.",
);
shorts(
  [33, 34],
  "Charcoal tailored shorts",
  "กางเกงขาสั้นทรงเรียบสีเทาเข้ม",
  "Charcoal shorts with a button waist and side pockets.",
  "กางเกงขาสั้นสีเทาเข้ม เอวติดกระดุมและกระเป๋าข้าง",
);
shorts(
  [35, 36],
  "Tropical-print beach shorts",
  "กางเกงขาสั้นชายหาดลายทรอปิคอล",
  "White, blue and orange printed beach shorts with a drawstring waist.",
  "กางเกงขาสั้นชายหาดพิมพ์ลายสีขาว ฟ้า และส้ม เอวผูกเชือก",
);
shorts(
  [37, 38, 39],
  "Grey beach shorts",
  "กางเกงขาสั้นชายหาดสีเทา",
  "Grey drawstring shorts with a printed pocket detail.",
  "กางเกงขาสั้นสีเทา เอวผูกเชือกและรายละเอียดลายพิมพ์ที่กระเป๋า",
);
shorts(
  [40, 41, 42],
  "Navy flat-front shorts",
  "กางเกงขาสั้นเอวเรียบสีกรมท่า",
  "Navy shorts with a flat front waist and side pockets.",
  "กางเกงขาสั้นสีกรมท่า เอวด้านหน้าเรียบและกระเป๋าข้าง",
);
shorts(
  [43, 44],
  "Olive botanical shorts",
  "กางเกงขาสั้นลายพฤกษาสีเขียวมะกอก",
  "Botanical-print shorts with an elastic waist.",
  "กางเกงขาสั้นพิมพ์ลายพฤกษา เอวยางยืด",
);
shorts(
  [45, 46, 47],
  "Black side-stripe sports shorts",
  "กางเกงกีฬาขาสั้นสีดำแถบข้าง",
  "Black sports shorts with a light side stripe and a drawstring waist.",
  "กางเกงกีฬาขาสั้นสีดำ มีแถบสีอ่อนด้านข้างและเอวผูกเชือก",
);
shorts(
  [48, 49],
  "Navy sports shorts",
  "กางเกงกีฬาขาสั้นสีกรมท่า",
  "Navy sports shorts with an elastic drawstring waist.",
  "กางเกงกีฬาขาสั้นสีกรมท่า เอวยางยืดผูกเชือก",
);

const cargo = (n, title, th, description, descriptionTh) =>
  add(
    "cargo",
    n,
    "trousers",
    "cargo-outdoor",
    "trousers",
    title,
    th,
    description,
    descriptionTh,
  );
add(
  "cargo",
  [1, 2, 3],
  "trousers",
  "shorts",
  "shorts",
  "Black drawstring cargo shorts",
  "กางเกงคาร์โก้ขาสั้นสีดำผูกเชือก",
  "Black cargo shorts with a drawstring waist and large flap pockets.",
  "กางเกงคาร์โก้ขาสั้นสีดำ เอวผูกเชือกและกระเป๋าฝาขนาดใหญ่",
  "Explicit Cargo Shorts label and short leg length. Assigned to Shorts; cargo-outdoor is the existing full-length trousers branch.",
);
cargo(
  [4, 5],
  "Olive belted cargo trousers",
  "กางเกงคาร์โก้ขายาวสีเขียวมะกอกพร้อมเข็มขัด",
  "Olive cargo trousers with a belt and side flap pockets.",
  "กางเกงคาร์โก้ขายาวสีเขียวมะกอก พร้อมเข็มขัดและกระเป๋าฝาด้านข้าง",
);
cargo(
  [6, 7, 8],
  "Black wide-leg cargo trousers",
  "กางเกงคาร์โก้ขายาวขากว้างสีดำ",
  "Black wide-leg trousers with a button waist and cargo pockets.",
  "กางเกงขายาวขากว้างสีดำ เอวติดกระดุมและกระเป๋าคาร์โก้",
);
cargo(
  [9, 10, 11],
  "Cream cargo trousers",
  "กางเกงคาร์โก้ขายาวสีครีม",
  "Cream trousers with a button waist and cargo pockets.",
  "กางเกงขายาวสีครีม เอวติดกระดุมและกระเป๋าคาร์โก้",
);
cargo(
  [12, 13, 14],
  "Olive drawstring cargo trousers",
  "กางเกงคาร์โก้ขายาวสีเขียวมะกอกผูกเชือก",
  "Olive trousers with a drawstring waist and cargo pockets.",
  "กางเกงขายาวสีเขียวมะกอก เอวผูกเชือกและกระเป๋าคาร์โก้",
);
cargo(
  [15, 16, 17, 18],
  "Grey cargo joggers",
  "กางเกงคาร์โก้จ็อกเกอร์สีเทา",
  "Grey cargo trousers with an elastic waist and gathered cuffs.",
  "กางเกงคาร์โก้ขายาวสีเทา เอวยางยืดและปลายขาจั๊ม",
);
cargo(
  [19, 20],
  "Mint wide-leg cargo trousers",
  "กางเกงคาร์โก้ขายาวขากว้างสีมิ้นต์",
  "Mint trousers with an elastic waist and large cargo pockets.",
  "กางเกงขายาวสีมิ้นต์ เอวยางยืดและกระเป๋าคาร์โก้ขนาดใหญ่",
);
cargo(
  [21, 22, 23],
  "Navy button-waist cargo trousers",
  "กางเกงคาร์โก้ขายาวสีกรมท่าเอวติดกระดุม",
  "Navy cargo trousers with a button waist and side flap pockets.",
  "กางเกงคาร์โก้ขายาวสีกรมท่า เอวติดกระดุมและกระเป๋าฝาด้านข้าง",
);
add(
  "cargo",
  [24, 25, 26],
  "skirts",
  undefined,
  "skirt",
  "Olive drawstring cargo skirt",
  "กระโปรงคาร์โก้สีเขียวมะกอกผูกเชือก",
  "A long olive skirt with a drawstring waist and gathered cargo pockets.",
  "กระโปรงยาวสีเขียวมะกอก เอวผูกเชือกและกระเป๋าคาร์โก้แบบรูด",
  "Source label explicitly says Cargo Skirt; categorised by garment type under Skirts rather than cargo trousers.",
);

const sleep = (n, title, th, description, descriptionTh, shape = "set") =>
  add(
    "sleep",
    n,
    "sleepwear",
    undefined,
    shape,
    title,
    th,
    description,
    descriptionTh,
  );
sleep(
  [1, 2, 3, 4],
  "Pastel blue printed pyjama set",
  "ชุดนอนพิมพ์ลายสีฟ้าพาสเทล",
  "A printed short-sleeve pyjama shirt and matching shorts.",
  "ชุดนอนเสื้อแขนสั้นพิมพ์ลาย พร้อมกางเกงขาสั้นเข้าชุด",
);
sleep(
  [5, 6, 7],
  "Mint checked pyjama set",
  "ชุดนอนลายตารางสีมิ้นต์",
  "A mint checked short-sleeve pyjama shirt and matching shorts.",
  "ชุดนอนเสื้อแขนสั้นลายตารางสีมิ้นต์ พร้อมกางเกงขาสั้นเข้าชุด",
);
sleep(
  [8, 9],
  "Blue polka-dot pyjama set",
  "ชุดนอนลายจุดสีฟ้า",
  "A blue and white polka-dot pyjama shirt and matching shorts.",
  "ชุดนอนเสื้อลายจุดสีฟ้าและขาว พร้อมกางเกงขาสั้นเข้าชุด",
);
sleep(
  [10, 11, 12],
  "Pink long-sleeve pyjama set",
  "ชุดนอนเสื้อแขนยาวสีชมพู",
  "A pink printed long-sleeve pyjama shirt and matching shorts.",
  "ชุดนอนเสื้อแขนยาวพิมพ์ลายสีชมพู พร้อมกางเกงขาสั้นเข้าชุด",
);
sleep(
  [13, 14, 15],
  "Yellow printed pyjama set",
  "ชุดนอนพิมพ์ลายสีเหลือง",
  "A pale yellow short-sleeve pyjama shirt and matching shorts.",
  "ชุดนอนเสื้อแขนสั้นสีเหลืองอ่อน พร้อมกางเกงขาสั้นเข้าชุด",
);
sleep(
  [16],
  "Blue cartoon-print sleep shirt",
  "เสื้อนอนลายการ์ตูนสีฟ้า",
  "A short-sleeve blue sleep shirt with a cartoon print.",
  "เสื้อนอนแขนสั้นสีฟ้าพิมพ์ลายการ์ตูน",
  "shirt",
);
sleep(
  [17],
  "Cherry-print sleep shirt",
  "เสื้อนอนลายเชอร์รี",
  "A white cherry-print sleep shirt with a rounded collar and two pockets.",
  "เสื้อนอนสีขาวลายเชอร์รี คอปกมนและกระเป๋าสองข้าง",
  "shirt",
);
sleep(
  [18],
  "Pink gingham sleep shirt",
  "เสื้อนอนลายตารางสีชมพู",
  "A pink gingham sleep shirt with a rounded collar and two pockets.",
  "เสื้อนอนลายตารางสีชมพู คอปกมนและกระเป๋าสองข้าง",
  "shirt",
);
sleep(
  [19],
  "Cream dotted sleep shirt",
  "เสื้อนอนลายจุดสีครีม",
  "A cream dotted sleep shirt with a rounded collar and two pockets.",
  "เสื้อนอนลายจุดสีครีม คอปกมนและกระเป๋าสองข้าง",
  "shirt",
);
sleep(
  [20],
  "Pink plaid sleep shirt",
  "เสื้อนอนลายสก็อตสีชมพู",
  "A pink plaid sleep shirt with a rounded collar and two pockets.",
  "เสื้อนอนลายสก็อตสีชมพู คอปกมนและกระเป๋าสองข้าง",
  "shirt",
);
sleep(
  [21, 22],
  "Cherry camisole pyjama set",
  "ชุดนอนสายเดี่ยวลายเชอร์รี",
  "A pink cherry-print camisole and matching shorts.",
  "ชุดนอนเสื้อสายเดี่ยวสีชมพูลายเชอร์รี พร้อมกางเกงขาสั้นเข้าชุด",
);

const elephant = (
  n,
  title,
  th,
  description,
  descriptionTh,
  shape = "trousers",
  note,
) =>
  add(
    "elephant",
    n,
    "elephant-sets",
    undefined,
    shape,
    title,
    th,
    description,
    descriptionTh,
    note,
  );
elephant(
  [1, 2],
  "White elephant-motif shirt",
  "เสื้อสีขาวลายช้างที่อก",
  "A white short-sleeve shirt with a split neckline and small chest motif.",
  "เสื้อแขนสั้นสีขาว คอผ่าหน้าและลายช้างขนาดเล็กที่อก",
  "shirt",
);
elephant(
  [3],
  "Navy elephant-print shirt",
  "เสื้อพิมพ์ลายช้างสีกรมท่า",
  "A navy and white elephant-print short-sleeve collared shirt.",
  "เสื้อเชิ้ตแขนสั้นพิมพ์ลายช้างสีกรมท่าและขาว",
  "shirt",
);
elephant(
  [4],
  "White elephant-print shirt",
  "เสื้อพิมพ์ลายช้างสีขาว",
  "A white and grey elephant-print short-sleeve collared shirt.",
  "เสื้อเชิ้ตแขนสั้นพิมพ์ลายช้างสีขาวและเทา",
  "shirt",
);
elephant(
  [5, 6],
  "Navy cropped elephant shirt",
  "เสื้อครอปลายช้างสีกรมท่า",
  "A cropped navy elephant-print shirt, shown from the front and back.",
  "เสื้อครอปพิมพ์ลายช้างสีกรมท่า มีภาพด้านหน้าและด้านหลัง",
  "shirt",
);
elephant(
  [7, 8],
  "Pink cropped elephant shirt",
  "เสื้อครอปลายช้างสีชมพู",
  "A cropped pink elephant-print shirt, shown from the front and back.",
  "เสื้อครอปพิมพ์ลายช้างสีชมพู มีภาพด้านหน้าและด้านหลัง",
  "shirt",
);
elephant(
  [9],
  "Black elephant co-ord set",
  "ชุดเสื้อและกางเกงขาสั้นลายช้างสีดำ",
  "A black and white elephant-print shirt and matching shorts.",
  "เสื้อพิมพ์ลายช้างสีดำและขาว พร้อมกางเกงขาสั้นเข้าชุด",
  "set",
);
elephant(
  [10],
  "Blue elephant co-ord set",
  "ชุดเสื้อและกางเกงขาสั้นลายช้างสีฟ้า",
  "A blue and white elephant-print shirt and matching shorts.",
  "เสื้อพิมพ์ลายช้างสีฟ้าและขาว พร้อมกางเกงขาสั้นเข้าชุด",
  "set",
);
elephant(
  [11],
  "Ochre elephant-print shorts",
  "กางเกงขาสั้นลายช้างสีเหลืองน้ำตาล",
  "Ochre, black and white elephant-print shorts with an elastic waist.",
  "กางเกงขาสั้นลายช้างสีเหลืองน้ำตาล ดำ และขาว เอวยางยืด",
  "shorts",
);
elephant(
  [12, 13, 14],
  "Navy geometric elephant trousers",
  "กางเกงขายาวลายช้างเรขาคณิตสีกรมท่า",
  "Navy and cream elephant-print trousers with geometric borders.",
  "กางเกงขายาวลายช้างสีกรมท่าและครีม พร้อมลายขอบเรขาคณิต",
);
elephant(
  [15, 16],
  "Black and white elephant trousers",
  "กางเกงขายาวลายช้างสีดำและขาว",
  "Black and white elephant-print trousers with an elastic waist.",
  "กางเกงขายาวพิมพ์ลายช้างสีดำและขาว เอวยางยืด",
);
elephant(
  [17, 18],
  "Black and tan elephant trousers",
  "กางเกงขายาวลายช้างสีดำและน้ำตาลอ่อน",
  "Black and tan elephant-print trousers with an elastic waist.",
  "กางเกงขายาวพิมพ์ลายช้างสีดำและน้ำตาลอ่อน เอวยางยืด",
);
elephant(
  [19, 20],
  "Navy and tan elephant trousers",
  "กางเกงขายาวลายช้างสีกรมท่าและน้ำตาลอ่อน",
  "Navy and tan elephant-print trousers with an elastic waist.",
  "กางเกงขายาวพิมพ์ลายช้างสีกรมท่าและน้ำตาลอ่อน เอวยางยืด",
);
elephant(
  [21],
  "Pink geometric elephant trousers",
  "กางเกงขายาวลายช้างเรขาคณิตสีชมพู",
  "Pink elephant-print trousers with geometric bands and a drawstring waist.",
  "กางเกงขายาวลายช้างสีชมพู มีลายแถบเรขาคณิตและเอวผูกเชือก",
);
elephant(
  [22, 23],
  "Plum elephant-print trousers",
  "กางเกงขายาวลายช้างสีม่วงพลัม",
  "Plum and white elephant-print trousers with an elastic waist.",
  "กางเกงขายาวพิมพ์ลายช้างสีม่วงพลัมและขาว เอวยางยืด",
);
elephant(
  [25, 24],
  "Pink medallion elephant trousers",
  "กางเกงขายาวลายช้างเมดัลเลียนสีชมพู",
  "Pink wide-leg elephant-print trousers with a tie waist and medallion borders.",
  "กางเกงขายาวขากว้างลายช้างสีชมพู เอวผูกและลายขอบเมดัลเลียน",
  "trousers",
  "Same print and cut, front tie-waist view (25) selected before back elastic-waist view (24). Distinct print from elephant-21 and elephant-26.",
);
elephant(
  [26, 27],
  "Pink diamond elephant trousers",
  "กางเกงขายาวลายช้างข้าวหลามตัดสีชมพู",
  "Pink elephant-print trousers with diamond motifs and a tie waist.",
  "กางเกงขายาวลายช้างสีชมพู มีลายข้าวหลามตัดและเอวผูก",
  "trousers",
  "Image 26 is incorrectly labelled Elephant Shirt; the garment is visibly trousers. Matching waistband detail (27) grouped with it.",
);
elephant(
  [28, 29],
  "Ivory and blue elephant shirt",
  "เสื้อพิมพ์ลายช้างสีงาช้างและฟ้า",
  "An ivory and blue elephant-print collared shirt with short sleeves.",
  "เสื้อเชิ้ตแขนสั้นพิมพ์ลายช้างสีงาช้างและฟ้า",
  "shirt",
);
add(
  "elephant",
  [30, 31, 32],
  "skirts",
  undefined,
  "skirt",
  "Ivory and blue elephant skirt",
  "กระโปรงพิมพ์ลายช้างสีงาช้างและฟ้า",
  "A long ivory and blue elephant-print skirt with an elastic waist and patterned border.",
  "กระโปรงยาวลายช้างสีงาช้างและฟ้า เอวยางยืดและลายขอบ",
  "Visible skirt and matching detail shots. Existing elephant category names shirts and trousers, so assigned once to Skirts. Separate garment from the coordinating shirt (28/29).",
);

const dress = (n, title, th, description, descriptionTh) =>
  add(
    "dress",
    n,
    "dresses",
    undefined,
    "dress",
    title,
    th,
    description,
    descriptionTh,
  );
dress(
  [1, 2],
  "Olive botanical sleeveless dress",
  "เดรสแขนกุดลายพฤกษาสีเขียวมะกอก",
  "A long sleeveless botanical-print dress, shown from the front and back.",
  "เดรสยาวแขนกุดพิมพ์ลายพฤกษา มีภาพด้านหน้าและด้านหลัง",
);
dress(
  [3, 4],
  "Patchwork-print sleeveless dress",
  "เดรสแขนกุดพิมพ์ลายแพตช์เวิร์ก",
  "A long sleeveless dress with a multicolour patchwork print.",
  "เดรสยาวแขนกุด พิมพ์ลายแพตช์เวิร์กหลายสี",
);
dress(
  [5],
  "Blue floral shirt dress",
  "เดรสเชิ้ตลายดอกสีฟ้า",
  "A blue floral collared shirt dress with a waist tie.",
  "เดรสเชิ้ตคอปกลายดอกสีฟ้า พร้อมสายผูกเอว",
);
dress(
  [6, 7],
  "Black geometric shirt dress",
  "เดรสเชิ้ตลายเรขาคณิตสีดำ",
  "A black and white geometric shirt dress with short sleeves and a collar.",
  "เดรสเชิ้ตลายเรขาคณิตสีดำและขาว แขนสั้นและคอปก",
);

const hawaiian = (n, title, th, description, descriptionTh) =>
  add(
    "hawaiian",
    n,
    "shirts",
    "hawaiian-shirts",
    "shirt",
    title,
    th,
    description,
    descriptionTh,
  );
hawaiian(
  [1],
  "Warm floral Hawaiian shirt",
  "เสื้อฮาวายลายดอกโทนสีอุ่น",
  "A short-sleeve open-collar shirt with a multicolour floral print.",
  "เสื้อแขนสั้นคอปกเปิด พิมพ์ลายดอกหลายสี",
);
hawaiian(
  [2],
  "Blue and yellow Hawaiian shirt",
  "เสื้อฮาวายลายดอกสีฟ้าและเหลือง",
  "A white open-collar shirt with blue leaves and yellow flowers.",
  "เสื้อคอปกเปิดสีขาว พิมพ์ลายใบไม้สีฟ้าและดอกสีเหลือง",
);
hawaiian(
  [3],
  "Pale blue tropical Hawaiian shirt",
  "เสื้อฮาวายลายทรอปิคอลสีฟ้าอ่อน",
  "A pale blue short-sleeve shirt with a tropical print and open collar.",
  "เสื้อแขนสั้นสีฟ้าอ่อน พิมพ์ลายทรอปิคอลและคอปกเปิด",
);
hawaiian(
  [4],
  "Green floral Hawaiian shirt",
  "เสื้อฮาวายลายดอกสีเขียว",
  "A green and yellow floral short-sleeve shirt with an open collar.",
  "เสื้อแขนสั้นลายดอกสีเขียวและเหลือง คอปกเปิด",
);
hawaiian(
  [5],
  "Brown floral Hawaiian shirt",
  "เสื้อฮาวายลายดอกสีน้ำตาล",
  "A brown and white floral short-sleeve shirt with an open collar.",
  "เสื้อแขนสั้นลายดอกสีน้ำตาลและขาว คอปกเปิด",
);
add(
  "jacket",
  [1, 2],
  "shirts",
  "jackets",
  "jacket",
  "Cream cropped zip jacket",
  "แจ็กเก็ตครอปสีครีมซิปหน้า",
  "A cream cropped jacket with a front zip and collar.",
  "แจ็กเก็ตครอปสีครีม มีซิปด้านหน้าและคอปก",
);
add(
  "shirt",
  [1],
  "shirts",
  undefined,
  "shirt",
  "Pink checked cropped shirt",
  "เสื้อเชิ้ตครอปลายตารางสีชมพู",
  "A pink checked cropped shirt with a contrasting collar and patch pocket.",
  "เสื้อเชิ้ตครอปลายตารางสีชมพู คอปกสีตัดและกระเป๋าปะ",
  "General collared shirt fits the existing Shirts parent, but none of its Hawaiian, Jacket or Sports/team leaves. No new category needed.",
);

const root = path.resolve("TM apparel");
const output = path.resolve("artifacts/tm-products");
const inventory = JSON.parse(
  await fs.readFile(path.join(output, "source-inventory.json"), "utf8"),
);
const files = new Map(inventory.map((file) => [file.code, file]));
const assigned = products.flatMap((product) => product.codes);
if (
  assigned.length !== inventory.length ||
  new Set(assigned).size !== inventory.length ||
  assigned.some((code) => !files.has(code))
)
  throw new Error(
    "Source coverage must be exactly once for every inventoried image.",
  );
const media = path.resolve("public/media/products/tm");
await fs.mkdir(media, { recursive: true });
const manifest = [];
const catalogue = [];
let webBytes = 0;
// Sequential conversion avoids decoding 185 large originals into memory at once.
for (const product of products) {
  const { codes, note, ...data } = product;
  const images = [];
  const sources = [];
  for (const [index, code] of codes.entries()) {
    const file = files.get(code);
    const original = await fs.readFile(path.join(root, file.source));
    if (createHash("sha256").update(original).digest("hex") !== file.sha256)
      throw new Error(`Source changed since inventory: ${file.source}`);
    const converted = await sharp(original)
      .webp({ quality: 90, effort: 5 })
      .toBuffer();
    await fs.writeFile(path.join(media, `${code}.webp`), converted);
    webBytes += converted.length;
    const src = `/media/products/tm/${code}.webp`;
    images.push({
      src,
      alt: `${product.title} — ${index === 0 ? "full product view" : `additional view ${index + 1}`}`,
      th: `${product.th} — ${index === 0 ? "ภาพสินค้าทั้งตัว" : `ภาพเพิ่มเติม ${index + 1}`}`,
    });
    sources.push({
      code,
      source: file.source,
      sha256: file.sha256,
      src,
      primary: index === 0,
      webSha256: createHash("sha256").update(converted).digest("hex"),
      webBytes: converted.length,
    });
  }
  manifest.push({ ...data, sources, note });
  catalogue.push({ ...data, images });
}
await fs.writeFile(
  path.resolve("src/content/tm-products.json"),
  JSON.stringify(catalogue, null, 2) + "\n",
);
await fs.writeFile(
  path.join(output, "product-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
const counts = Object.entries(
  Object.groupBy(products, (p) => p.subcategory ?? p.category),
).map(([category, rows]) => ({
  category,
  products: rows.length,
  images: rows.reduce((count, p) => count + p.codes.length, 0),
}));
const report = `# TM Apparel product mapping\n\nReviewed on 2026-10-05. All ${inventory.length} supplied PNGs map to ${products.length} catalogue products; ${products.filter((p) => p.codes.length > 1).length} have multiple images. No new taxonomy categories. Original files remain unchanged.\n\n## Evidence and grouping rules\n\nThe directory is flat, with numbered filenames and no SKU, age, price, sizing or composition register. Product identities are visual inferences from garment construction, matching prints and adjacent full/detail/front/back views. Distinct prints or cuts remain separate; the blue/purple geometric shorts stay together because their source board explicitly shows both colourways. These IDs are website references, not verified manufacturer SKUs. No supplied item is explicitly identified as children’s wear or a sports/team shirt; those existing branches remain available with an empty state. Linen is a supplied image label, not a verified composition claim.\n\nThe primary view shows the full garment or coordinated set. Source branding, labels and all four image edges are preserved. WebP versions use the original dimensions, with no crop.\n\n## Category reconciliation\n\n| Existing category / type | Products | Images |\n| --- | ---: | ---: |\n${counts.map((c) => `| ${c.category} | ${c.products} | ${c.images} |`).join("\n")}\n| **Total** | **${products.length}** | **${inventory.length}** |\n\n## Product-by-product map\n\nImage codes resolve to the exact original filenames and source/output SHA-256 hashes in [product-manifest.json](./product-manifest.json). The first code is the primary image. All supplied images are visible in the contact sheets alongside [source-inventory.json](./source-inventory.json).\n\n| Website product ID | Product | Existing category / type | Source image codes (primary first) | Grouping / classification evidence |\n| --- | --- | --- | --- | --- |\n${manifest.map((p) => `| ${p.id} | ${p.title} | adults / ${p.category}${p.subcategory ? ` / ${p.subcategory}` : ""} | ${p.sources.map((s) => s.code).join(", ")} | ${p.note} |`).join("\n")}\n`;
await fs.writeFile(path.join(output, "PRODUCT_MAP.md"), report);
console.log(
  JSON.stringify(
    {
      products: products.length,
      images: inventory.length,
      multiImageProducts: products.filter((p) => p.codes.length > 1).length,
      sourceMB: +(
        inventory.reduce((n, i) => n + i.bytes, 0) /
        1024 /
        1024
      ).toFixed(2),
      webMB: +(webBytes / 1024 / 1024).toFixed(2),
      counts,
    },
    null,
    2,
  ),
);
