import type { LocalisedCopy } from "./guides";

const text = (en: string, th: string): LocalisedCopy => ({ en, th });
export type GuideLink = { href: string; label: LocalisedCopy };
export type GuideSection = {
  id: string;
  title: LocalisedCopy;
  paragraphs: readonly LocalisedCopy[];
  subheading?: LocalisedCopy;
  bullets?: readonly LocalisedCopy[];
  links?: readonly GuideLink[];
};
export type GuideArticle = {
  introduction: LocalisedCopy;
  sections: readonly GuideSection[];
  checklist: readonly LocalisedCopy[];
  advice: LocalisedCopy;
  services: readonly GuideLink[];
  contact: LocalisedCopy;
};

// Editorial guidance based on the site's owner-confirmed workflow. Numerical
// prices, tolerances, universal MOQs and guaranteed lead times are not inferred.
export const guideArticles: Readonly<Record<string, GuideArticle>> = {
  "preparing-garment-production-brief": {
    introduction: text(
      "A useful brief explains the garment you want, what matters to your customer and which decisions still need help. You do not need a finished technical pack to begin a conversation with TM Apparel. A clear starting point lets the team review your references, discuss materials and identify the information needed for a quotation and sample.",
      "บรีฟที่ดีควรอธิบายเสื้อผ้าที่ต้องการ สิ่งที่สำคัญกับลูกค้าของคุณ และเรื่องที่ยังต้องการคำแนะนำ คุณไม่จำเป็นต้องมี Tech pack ที่สมบูรณ์ก่อนเริ่มคุยกับ TM Apparel แต่ข้อมูลเริ่มต้นที่ชัดเจนจะช่วยให้ทีมตรวจแบบอ้างอิง พูดคุยเรื่องวัสดุ และระบุสิ่งที่ต้องยืนยันเพื่อเสนอราคาและทำตัวอย่างได้",
    ),
    sections: [
      {
        id: "product-purpose",
        title: text(
          "Start with the product and its intended use",
          "เริ่มจากสินค้าและการใช้งานที่ต้องการ",
        ),
        paragraphs: [
          text(
            "Describe the garment type, the people who will wear it and the situation it is designed for. A team shirt, resort shirt and pair of cargo trousers raise different questions about shape, movement, pockets and decoration. Explain the intended fit and the details that are essential to your brand, rather than relying on a reference photograph to communicate everything.",
            "ระบุประเภทเสื้อผ้า ผู้สวมใส่ และโอกาสในการใช้งาน เสื้อทีม เสื้อรีสอร์ต และกางเกงคาร์โก้มีประเด็นเรื่องทรง การเคลื่อนไหว กระเป๋า และการตกแต่งต่างกัน อธิบายความพอดีที่ต้องการและรายละเอียดสำคัญของแบรนด์ให้ชัดเจน แทนการให้ภาพอ้างอิงเพียงภาพเดียวสื่อสารทุกอย่าง",
          ),
          text(
            "Send sketches, reference images or a physical garment if you have one. Annotate what you want to keep and what you want to change: for example, retain the collar shape but change the sleeve length. If a reference is only a mood or colour direction, say so. This helps separate an exact construction requirement from an idea that the sample still needs to explore.",
            "ส่งสเก็ตช์ ภาพอ้างอิง หรือตัวอย่างจริงถ้ามี พร้อมระบุส่วนที่ต้องการเก็บไว้และส่วนที่จะเปลี่ยน เช่น ใช้ทรงปกเดิมแต่ปรับความยาวแขน หากภาพใช้สื่ออารมณ์หรือโทนสีเท่านั้น ควรบอกไว้ เพื่อแยกข้อกำหนดที่ต้องทำตามจากแนวคิดที่ยังต้องทดลองในตัวอย่าง",
          ),
        ],
        links: [
          {
            href: "/oem-products?audience=adults&category=shirts",
            label: text(
              "Browse shirt references to discuss shape and details",
              "ดูแบบเสื้ออ้างอิงเพื่อคุยเรื่องทรงและรายละเอียด",
            ),
          },
        ],
      },
      {
        id: "material-decisions",
        title: text(
          "Separate confirmed materials from open choices",
          "แยกวัสดุที่ยืนยันแล้วออกจากตัวเลือกที่ยังเปิดอยู่",
        ),
        paragraphs: [
          text(
            "Record any fabric or trim you have already selected, including the supplier reference or swatch where available. Where you have not chosen a material, describe the feel, drape, stretch or structure you want and ask the team to discuss suitable options. Fabric composition, construction, finish and availability need to be reviewed together; a broad fabric name should not be treated as a final purchase specification.",
            "บันทึกผ้าหรืออุปกรณ์ที่เลือกแล้ว พร้อมรหัสจากผู้จัดหาหรือชิ้นผ้าตัวอย่างถ้ามี หากยังไม่ได้เลือก ให้บอกสัมผัส การทิ้งตัว ความยืดหยุ่น หรือการคงรูปที่ต้องการ แล้วคุยกับทีมเรื่องทางเลือกที่เหมาะสม ควรตรวจส่วนผสม โครงสร้าง การตกแต่งผิว และการจัดหาควบคู่กัน ชื่อประเภทผ้ากว้าง ๆ ยังไม่ควรใช้เป็น Spec สั่งซื้อขั้นสุดท้าย",
          ),
          text(
            "For prints or embroidery, include the artwork, intended dimensions, placement and colours. Mention labels, buttons, zips, elastic or other trims that affect the finished garment. Mark uncertain details as ‘to confirm’ so they can be discussed before the quotation or sample is treated as final.",
            "สำหรับงานพิมพ์หรือปัก ให้แนบไฟล์ลาย ขนาด ตำแหน่ง และสีที่ต้องการ รวมถึงป้าย กระดุม ซิป ยางยืด หรืออุปกรณ์ที่มีผลต่อชิ้นงาน ระบุเรื่องที่ยังไม่แน่ใจว่า ‘รอยืนยัน’ เพื่อให้ตรวจสอบก่อนถือว่าใบเสนอราคาหรือตัวอย่างเป็นฉบับสุดท้าย",
          ),
        ],
        links: [
          {
            href: "/guides/how-to-choose-fabric",
            label: text(
              "Continue with fabric selection",
              "อ่านต่อเรื่องการเลือกผ้า",
            ),
          },
          {
            href: "/guides/choosing-printing-and-embroidery",
            label: text(
              "Prepare your decoration requirements",
              "เตรียมรายละเอียดงานพิมพ์และปัก",
            ),
          },
        ],
      },
      {
        id: "quantities-sizes",
        title: text(
          "Break down quantities and sizes",
          "แยกจำนวนผลิตและไซซ์ให้ตรวจสอบได้",
        ),
        paragraphs: [
          text(
            "Provide the intended total and a breakdown by style, colour and size. If you are still estimating demand, distinguish an initial estimate from the quantities you are ready to confirm. Ask the team to review MOQ for the actual design and selected materials. The website does not set a single minimum that applies to every garment project.",
            "แจ้งจำนวนรวมที่ต้องการและแยกตามแบบ สี และไซซ์ หากยังประเมินความต้องการตลาดอยู่ ให้แยกยอดประมาณการออกจากยอดที่พร้อมยืนยัน สอบถาม MOQ ตามแบบและวัสดุที่เลือกจริง เว็บไซต์ไม่ได้กำหนดจำนวนขั้นต่ำเดียวสำหรับทุกโปรเจกต์",
          ),
          text(
            "Include a size chart if you have one, with measurement points and units. If you only have a target fit or an existing sample, explain that and ask which measurements should be recorded next. A size label such as M does not, by itself, define the dimensions or fit of the garment you want to produce.",
            "แนบตารางไซซ์พร้อมจุดวัดและหน่วยถ้ามี หากมีเพียงทรงที่ต้องการหรือตัวอย่างเดิม ให้แจ้งทีมและสอบถามว่าควรบันทึกขนาดใดเพิ่มเติม ชื่อไซซ์อย่าง M เพียงอย่างเดียวยังไม่ได้ระบุขนาดหรือความพอดีของเสื้อผ้าที่ต้องการผลิต",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-size-specifications",
            label: text(
              "Prepare a measurable size specification",
              "เตรียมตารางไซซ์ที่วัดและตรวจสอบได้",
            ),
          },
          {
            href: "/guides/planning-moq-and-order-quantity",
            label: text("Plan your order quantities", "วางแผนจำนวนผลิต"),
          },
        ],
      },
      {
        id: "schedule-priorities",
        title: text(
          "Explain your schedule and priorities",
          "แจ้งกำหนดเวลาและลำดับความสำคัญ",
        ),
        paragraphs: [
          text(
            "Tell the factory your required delivery date and whether it is tied to a launch, event or other fixed commitment. Discuss the time needed for material sourcing, sample revisions, production, quality checks and packing. A desired date is a planning input; it becomes a production commitment only when the team confirms the project schedule with you.",
            "แจ้งวันที่ต้องการรับสินค้าและความเกี่ยวข้องกับวันเปิดตัว งานอีเวนต์ หรือกำหนดที่เปลี่ยนไม่ได้ คุยเรื่องเวลาจัดหาวัสดุ แก้ตัวอย่าง ผลิต ตรวจคุณภาพ และแพ็ก วันที่ต้องการเป็นข้อมูลสำหรับวางแผน และจะเป็นกำหนดส่งมอบที่ตกลงกันเมื่อทีมยืนยันแผนของโปรเจกต์แล้ว",
          ),
          text(
            "If you have a target budget, state what it needs to cover and which design details are priorities. This gives the team a basis for discussing options. Keep unresolved commercial terms separate from design approval, and confirm the quotation scope, sample charges and payment arrangements directly with the factory.",
            "ถ้ามีงบประมาณเป้าหมาย ให้บอกขอบเขตค่าใช้จ่ายและรายละเอียดแบบที่สำคัญที่สุด เพื่อใช้คุยทางเลือกกับทีม แยกเงื่อนไขทางการค้าที่ยังไม่ตกลงออกจากการอนุมัติแบบ และยืนยันขอบเขตใบเสนอราคา ค่าตัวอย่าง และการชำระเงินกับโรงงานโดยตรง",
          ),
        ],
      },
      {
        id: "brief-example",
        title: text(
          "Turn scattered references into one working brief",
          "รวมข้อมูลที่กระจัดกระจายเป็นบรีฟฉบับเดียว",
        ),
        paragraphs: [
          text(
            "For example, a resort-shirt brief could contain an annotated collar reference, a preferred drape, artwork showing print placement, a colour-and-size quantity table and a requested delivery date. It could also flag two decisions still open: the exact fabric and the base-size measurements. These are discussion points, not missing information to conceal.",
            "ตัวอย่างบรีฟเสื้อรีสอร์ตอาจประกอบด้วยภาพปกที่มีหมายเหตุ สัมผัสและการทิ้งตัวที่ต้องการ ลายที่แสดงตำแหน่งพิมพ์ ตารางจำนวนแยกสีและไซซ์ และวันที่ต้องการส่งมอบ พร้อมระบุเรื่องที่ยังเปิดอยู่ เช่น ผ้าที่จะใช้จริงและขนาดของไซซ์ตั้งต้น เรื่องเหล่านี้ควรนำมาคุยกับทีม ไม่จำเป็นต้องปิดบังว่าไม่ทราบ",
          ),
          text(
            "Give the document a date or version name and keep the current files together. After the team reviews it, record the agreed changes and who will supply each outstanding item. The next step may be a revised quotation, fabric review or sample plan; ask which decision is needed before that step can begin.",
            "ตั้งชื่อเอกสารให้มีวันที่หรือเวอร์ชัน และเก็บไฟล์ปัจจุบันไว้ด้วยกัน หลังทีมตรวจบรีฟ ให้บันทึกสิ่งที่ตกลงแก้และผู้รับผิดชอบข้อมูลที่ยังขาด ขั้นต่อไปอาจเป็นปรับใบเสนอราคา ตรวจผ้า หรือวางแผนตัวอย่าง ควรถามว่าต้องยืนยันเรื่องใดก่อนเริ่มขั้นนั้น",
          ),
        ],
        subheading: text(
          "Before you send the brief",
          "ตรวจอีกครั้งก่อนส่งบรีฟ",
        ),
        bullets: [
          text(
            "Use one current version and mark superseded references clearly.",
            "ใช้เวอร์ชันปัจจุบันฉบับเดียวและระบุไฟล์ที่ยกเลิกให้ชัด",
          ),
          text(
            "Label assumptions and unresolved choices rather than presenting them as approved specifications.",
            "ระบุสมมติฐานและสิ่งที่รอยืนยัน แทนการเขียนเหมือนเป็น Spec ที่อนุมัติแล้ว",
          ),
          text(
            "Name one contact who can consolidate feedback and confirm decisions.",
            "กำหนดผู้ประสานงานที่รวบรวมความเห็นและยืนยันการตัดสินใจได้",
          ),
        ],
      },
      {
        id: "next-step",
        title: text(
          "Use the brief to plan the sample",
          "ใช้บรีฟเป็นจุดเริ่มต้นของแผนตัวอย่าง",
        ),
        paragraphs: [
          text(
            "Once the brief is reviewed, agree what the sample needs to demonstrate. Keep the material choices, measurement requirements and decoration notes aligned with that plan. TM Apparel’s workflow moves from brief review and quotation to sample development and approval before bulk production; the sample is where you review the garment details that will guide production.",
            "เมื่อทีมตรวจบรีฟแล้ว ให้ตกลงว่าตัวอย่างต้องแสดงอะไรบ้าง และจัดวัสดุ ขนาด และหมายเหตุงานตกแต่งให้สอดคล้องกับแผน ขั้นตอนของ TM Apparel เริ่มจากตรวจบรีฟและเสนอราคา แล้วทำและอนุมัติตัวอย่างก่อนผลิตจริง ตัวอย่างจึงเป็นจุดที่ใช้ตรวจรายละเอียดซึ่งจะนำไปอ้างอิงในการผลิต",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-sample-development",
            label: text(
              "Prepare for your first sample round",
              "เตรียมทำตัวอย่างรอบแรก",
            ),
          },
          {
            href: "/oem-journey",
            label: text(
              "See the six-stage OEM workflow",
              "ดูขั้นตอนผลิต OEM ทั้ง 6 ขั้นตอน",
            ),
          },
        ],
      },
    ],
    checklist: [
      text(
        "Garment type, intended use and annotated references",
        "ประเภทเสื้อผ้า การใช้งาน และภาพอ้างอิงพร้อมหมายเหตุ",
      ),
      text(
        "Material choices and any items still to confirm",
        "วัสดุที่เลือกและรายการที่ยังต้องยืนยัน",
      ),
      text("Quantities by style, colour and size", "จำนวนแยกตามแบบ สี และไซซ์"),
      text(
        "Size chart or sample measurements, where available",
        "ตารางไซซ์หรือขนาดตัวอย่าง ถ้ามี",
      ),
      text(
        "Artwork, trims, labels and packing requirements",
        "ลาย อุปกรณ์ ป้าย และข้อกำหนดการแพ็ก",
      ),
      text(
        "Required delivery date, priorities and decision-maker",
        "วันที่ต้องการรับสินค้า ลำดับความสำคัญ และผู้ยืนยันการตัดสินใจ",
      ),
    ],
    advice: text(
      "A preliminary idea is enough to start a discussion. Make clear what you know, what is estimated and what you need help deciding.",
      "เริ่มคุยได้แม้มีเพียงแนวคิดเบื้องต้น ขอให้ระบุสิ่งที่ทราบ สิ่งที่ประมาณการ และสิ่งที่ต้องการคำแนะนำให้ชัดเจน",
    ),
    services: [
      {
        href: "/our-work#capabilities",
        label: text("Explore production capabilities", "ดูขอบเขตงานผลิต"),
      },
      {
        href: "/oem-products",
        label: text("Browse garment references", "ดูแบบเสื้อผ้าอ้างอิง"),
      },
    ],
    contact: text("Discuss your production brief", "พูดคุยเรื่องบรีฟการผลิต"),
  },
  "sample-approval-process": {
    introduction: text(
      "Sample approval turns a design discussion into a reference for production. The aim is to confirm what the garment should be, record any corrections and make the approved version unambiguous. Reviewing a sample carefully is useful only if the resulting decision can be understood by the people who will cut, sew, decorate and check the order.",
      "การอนุมัติตัวอย่างเปลี่ยนการพูดคุยเรื่องแบบให้เป็นข้อมูลอ้างอิงสำหรับผลิต เป้าหมายคือยืนยันลักษณะสินค้า บันทึกการแก้ไข และระบุเวอร์ชันที่อนุมัติให้ชัดเจน การตรวจตัวอย่างจะมีประโยชน์เมื่อทีมตัด เย็บ ตกแต่ง และตรวจคุณภาพเข้าใจการตัดสินใจเดียวกันได้",
    ),
    sections: [
      {
        id: "review-reference",
        title: text(
          "Review against the current brief",
          "ตรวจเทียบกับบรีฟฉบับปัจจุบัน",
        ),
        paragraphs: [
          text(
            "Begin with the current design brief, measurement sheet, material references and decoration notes. Identify the sample version and what this round was intended to test. If the sample uses a substitute fabric or temporary trim, record that before reviewing it. Approval of one feature should not silently approve a material or detail that was never presented for review.",
            "เริ่มจากบรีฟ ตารางขนาด วัสดุอ้างอิง และหมายเหตุงานตกแต่งฉบับปัจจุบัน ระบุเวอร์ชันตัวอย่างและสิ่งที่ต้องการทดสอบในรอบนี้ หากใช้ผ้าทดแทนหรืออุปกรณ์ชั่วคราว ให้บันทึกไว้ก่อนตรวจ การอนุมัติรายละเอียดหนึ่งไม่ควรทำให้เข้าใจว่าวัสดุหรือรายละเอียดที่ยังไม่ได้ตรวจได้รับอนุมัติไปด้วย",
          ),
          text(
            "Bring the people who can decide on fit, brand appearance and production requirements into the same review process. Consolidate their feedback so the factory receives one coherent set of instructions. Where reviewers disagree, resolve the decision before asking the team to revise the garment.",
            "ให้ผู้ตัดสินใจเรื่องความพอดี ภาพลักษณ์แบรนด์ และข้อกำหนดผลิตร่วมกระบวนการตรวจเดียวกัน รวบรวมความเห็นเป็นคำสั่งแก้ไขชุดเดียวที่สอดคล้องกัน หากผู้ตรวจเห็นต่าง ควรสรุปการตัดสินใจก่อนขอให้ทีมแก้ตัวอย่าง",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-garment-production-brief",
            label: text(
              "Check the information in your production brief",
              "ตรวจข้อมูลในบรีฟการผลิต",
            ),
          },
        ],
      },
      {
        id: "fit-measurements",
        title: text(
          "Check measurements and fit separately",
          "ตรวจขนาดและความพอดีเป็นคนละประเด็น",
        ),
        paragraphs: [
          text(
            "Measure the sample against the agreed measurement points and units. Record the actual values beside the required values, using the same measuring method each time. Discuss acceptable tolerances with the factory for the particular garment and point of measure; do not borrow a universal tolerance from an unrelated product.",
            "วัดตัวอย่างตามจุดวัดและหน่วยที่ตกลง บันทึกค่าจริงเทียบค่าที่ต้องการโดยใช้วิธีวัดเดียวกันทุกครั้ง ตกลงค่าความคลาดเคลื่อนกับโรงงานตามประเภทเสื้อผ้าและแต่ละจุดวัด ไม่ควรนำค่าตายตัวของสินค้าประเภทอื่นมาใช้ทันที",
          ),
          text(
            "Then review the intended fit and shape. Consider sleeve or leg length, ease of movement, collar or waistband position and the way the garment sits. A measurement sheet and a fit review answer different questions. If the size range needs further checking, agree which additional sizes or samples should be reviewed before treating the whole range as confirmed.",
            "จากนั้นตรวจทรงและความพอดีตามที่ตั้งใจ พิจารณาความยาวแขนหรือขา การเคลื่อนไหว ตำแหน่งปกหรือขอบเอว และลักษณะเมื่อสวมใส่ ตารางขนาดกับการตรวจความพอดีตอบคำถามต่างกัน หากยังต้องตรวจช่วงไซซ์ ให้ตกลงว่าจะตรวจไซซ์หรือตัวอย่างใดเพิ่มก่อนถือว่ายืนยันทุกไซซ์แล้ว",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-size-specifications",
            label: text(
              "Review size points and measurement instructions",
              "ทบทวนจุดวัดและวิธีวัดในตารางไซซ์",
            ),
          },
        ],
      },
      {
        id: "material-details",
        title: text(
          "Review fabric, construction and decoration together",
          "ตรวจผ้า การประกอบ และงานตกแต่งร่วมกัน",
        ),
        paragraphs: [
          text(
            "Confirm the fabric reference, colour and trims used in the sample. Review seams, closures, pockets, labels and finishing against the brief. For printing or embroidery, inspect placement, dimensions, colours and the surface feel you agreed to review. Where a feature depends on the final material, ask to review that combination before signing it off.",
            "ยืนยันผ้า สี และอุปกรณ์ที่ใช้ในตัวอย่าง ตรวจตะเข็บ การเปิดปิด กระเป๋า ป้าย และ Finishing เทียบกับบรีฟ สำหรับพิมพ์หรือปัก ให้ตรวจตำแหน่ง ขนาด สี และสัมผัสตามที่ตกลง หากรายละเอียดใดขึ้นอยู่กับวัสดุสุดท้าย ควรขอตรวจเมื่อใช้วัสดุนั้นร่วมกันก่อนอนุมัติ",
          ),
          text(
            "If care, washing or performance requirements are important to your product, tell the team what needs to be assessed and agree the review method. A visual sample review alone should not be treated as evidence for every performance claim. Confirm the intended material, any relevant documentation and any project-specific checks separately.",
            "หากการดูแล การซัก หรือคุณสมบัติการใช้งานสำคัญกับสินค้า ให้แจ้งสิ่งที่ต้องประเมินและตกลงวิธีตรวจ การดูตัวอย่างด้วยสายตาเพียงอย่างเดียวไม่ใช่หลักฐานยืนยันคุณสมบัติทุกด้าน ควรยืนยันวัสดุ เอกสารที่เกี่ยวข้อง และการตรวจเฉพาะโปรเจกต์แยกกัน",
          ),
        ],
        links: [
          {
            href: "/guides/choosing-printing-and-embroidery",
            label: text(
              "Review decoration choices before approval",
              "ทบทวนงานตกแต่งก่อนอนุมัติ",
            ),
          },
        ],
      },
      {
        id: "revision-record",
        title: text(
          "Write revision notes the team can act on",
          "เขียนหมายเหตุแก้ไขให้ทีมทำตามได้",
        ),
        paragraphs: [
          text(
            "For each requested change, identify the location, the current issue and the desired result. ‘Improve the fit’ leaves several possible interpretations. ‘Review the waistband position against the agreed fit reference’ gives the team a more specific question to resolve. Use annotated photographs where helpful, and connect the note to the correct sample version.",
            "การแก้แต่ละรายการควรระบุตำแหน่ง ปัญหาปัจจุบัน และผลที่ต้องการ คำว่า ‘ปรับให้ใส่ดีขึ้น’ ตีความได้หลายแบบ ขณะที่ ‘ทบทวนตำแหน่งขอบเอวเทียบกับตัวอย่างทรงที่ตกลง’ ช่วยระบุคำถามที่ต้องแก้ได้ชัดขึ้น ใช้ภาพพร้อมหมายเหตุเมื่อเหมาะสม และอ้างอิงเวอร์ชันตัวอย่างให้ถูกต้อง",
          ),
          text(
            "Separate required corrections from optional ideas. Ask whether a change affects the fabric, pattern, decoration, price or schedule, and agree which items require a revised sample. Keep an unresolved issue open until its outcome has been checked; a promise to correct it is not the same as reviewing the corrected result.",
            "แยกสิ่งที่ต้องแก้ออกจากแนวคิดทางเลือก สอบถามว่าการเปลี่ยนกระทบผ้า แพตเทิร์น งานตกแต่ง ราคา หรือกำหนดเวลาหรือไม่ และตกลงว่ารายการใดต้องทำตัวอย่างใหม่ เรื่องที่ยังไม่ได้ตรวจผลการแก้ควรคงสถานะรอยืนยัน เพราะการตกลงว่าจะแก้ยังไม่เท่ากับได้ตรวจชิ้นงานที่แก้แล้ว",
          ),
        ],
        subheading: text(
          "A simple revision record",
          "รายการแก้ไขที่ใช้คุยร่วมกันได้",
        ),
        bullets: [
          text(
            "Sample version and review date",
            "เวอร์ชันตัวอย่างและวันที่ตรวจ",
          ),
          text(
            "Location, requested change and supporting reference",
            "ตำแหน่ง สิ่งที่ต้องแก้ และข้อมูลอ้างอิง",
          ),
          text(
            "Person responsible for confirming the result",
            "ผู้รับผิดชอบยืนยันผลการแก้",
          ),
          text(
            "Outcome: confirmed, revise and recheck, or still to decide",
            "ผลตรวจ: ยืนยันแล้ว แก้และตรวจซ้ำ หรือยังรอตัดสินใจ",
          ),
        ],
      },
      {
        id: "approval-decision",
        title: text(
          "Make the approval decision explicit",
          "สรุปการอนุมัติให้ชัดเจน",
        ),
        paragraphs: [
          text(
            "Once the agreed checks are complete, identify the physical sample or sample version that becomes the production reference, along with its matching specifications. Record the decision and the person authorised to make it. If a detail remains unresolved, list it explicitly and agree whether it prevents release to production. Avoid an approval message that can be read as permission to proceed on assumptions.",
            "เมื่อตรวจรายการที่ตกลงครบแล้ว ให้ระบุตัวอย่างจริงหรือเวอร์ชันที่จะเป็นแบบอ้างอิง พร้อม Spec ที่ตรงกัน บันทึกการอนุมัติและผู้มีอำนาจยืนยัน หากยังมีเรื่องค้าง ให้ระบุชัดเจนและตกลงว่ามีผลให้ยังเริ่มผลิตไม่ได้หรือไม่ หลีกเลี่ยงข้อความอนุมัติที่ทำให้เข้าใจว่าเริ่มผลิตตามสมมติฐานได้",
          ),
          text(
            "Keep the approved sample, measurements, material references and revision record aligned. If you later request a change, discuss its impact and update the reference before the changed detail enters production. This gives both your brand and the factory a shared basis for checking the order.",
            "เก็บตัวอย่างที่อนุมัติ ตารางขนาด วัสดุอ้างอิง และบันทึกการแก้ไขให้ตรงกัน หากขอเปลี่ยนภายหลัง ให้คุยผลกระทบและปรับแบบอ้างอิงก่อนนำรายละเอียดใหม่เข้าผลิต เพื่อให้แบรนด์และโรงงานใช้ข้อมูลชุดเดียวกันตรวจออร์เดอร์",
          ),
        ],
      },
      {
        id: "production-handover",
        title: text(
          "Connect approval to the production handover",
          "เชื่อมการอนุมัติเข้ากับการส่งต่องานผลิต",
        ),
        paragraphs: [
          text(
            "Design approval is one part of readiness. Confirm the final quantities, materials, labels, packing instructions, commercial terms and schedule with the team. TM Apparel uses the approved sample to guide production, with sample checks during sewing and inspection of every completed garment at end-line. Discuss the relevant quality checkpoints and how corrections will be rechecked for your order.",
            "การอนุมัติแบบเป็นเพียงส่วนหนึ่งของความพร้อม ควรยืนยันจำนวน วัสดุ ป้าย วิธีแพ็ก เงื่อนไขทางการค้า และกำหนดเวลากับทีมด้วย TM Apparel ใช้ตัวอย่างที่อนุมัติเป็นแนวทางผลิต สุ่มตรวจระหว่างเย็บและตรวจสินค้าทุกตัวหลังเย็บ จึงควรคุยจุดตรวจที่เกี่ยวข้องและวิธีตรวจซ้ำเมื่อแก้ไขสำหรับออร์เดอร์ของคุณ",
          ),
          text(
            "Before the order moves forward, ask which documents the team will use and who to contact if a decision changes. A clear handover helps keep the sample decision connected to cutting, sewing, decoration, QC and delivery rather than leaving approval in a separate message thread.",
            "ก่อนเดินหน้าผลิต ให้สอบถามว่าทีมจะใช้เอกสารใดและติดต่อใครเมื่อมีการเปลี่ยนการตัดสินใจ การส่งต่องานที่ชัดเจนช่วยเชื่อมสิ่งที่อนุมัติในตัวอย่างเข้ากับงานตัด เย็บ ตกแต่ง QC และส่งมอบ แทนการเก็บการอนุมัติไว้ในบทสนทนาอีกชุดหนึ่ง",
          ),
        ],
        links: [
          {
            href: "/guides/quality-checkpoints-before-production",
            label: text("Agree your quality checkpoints", "ตกลงจุดตรวจคุณภาพ"),
          },
          {
            href: "/guides/preparing-bulk-production-and-delivery",
            label: text(
              "Prepare the production and delivery handover",
              "เตรียมส่งต่องานผลิตและส่งมอบ",
            ),
          },
        ],
      },
    ],
    checklist: [
      text(
        "Correct sample version and current specification",
        "เวอร์ชันตัวอย่างและ Spec ปัจจุบันที่ตรงกัน",
      ),
      text(
        "Measurements, fit and size-range review completed as agreed",
        "ตรวจขนาด ความพอดี และช่วงไซซ์ตามที่ตกลง",
      ),
      text(
        "Fabric, colour, trims and decoration confirmed",
        "ยืนยันผ้า สี อุปกรณ์ และงานตกแต่ง",
      ),
      text(
        "Required revisions checked and unresolved items identified",
        "ตรวจผลการแก้ไขและระบุรายการที่ยังรอยืนยัน",
      ),
      text(
        "Approval recorded by the authorised decision-maker",
        "บันทึกการอนุมัติโดยผู้มีอำนาจยืนยัน",
      ),
      text(
        "Quantity breakdown, packing and production terms confirmed with the team",
        "ยืนยันจำนวน วิธีแพ็ก และเงื่อนไขผลิตกับทีม",
      ),
    ],
    advice: text(
      "Approve the reference you have actually reviewed. When a material or detail changes, confirm whether another sample or check is needed before proceeding.",
      "อนุมัติแบบอ้างอิงที่ได้ตรวจจริง เมื่อเปลี่ยนวัสดุหรือรายละเอียด ให้ยืนยันว่าต้องทำตัวอย่างหรือตรวจอะไรเพิ่มเติมก่อนดำเนินการ",
    ),
    services: [
      {
        href: "/oem-journey#quality",
        label: text(
          "See the factory’s quality checkpoints",
          "ดูจุดตรวจคุณภาพของโรงงาน",
        ),
      },
      {
        href: "/about#process",
        label: text(
          "Explore the production process",
          "ดูกระบวนการผลิตในโรงงาน",
        ),
      },
    ],
    contact: text(
      "Discuss your sample approval",
      "พูดคุยเรื่องการอนุมัติตัวอย่าง",
    ),
  },
  "how-to-choose-fabric": {
    introduction: text(
      "Start with how the garment should feel, move and hold its shape. Bring a swatch or garment reference, then discuss composition, construction, finish and sourcing with the team. The selected fabric should be reviewed in the sample rather than chosen from a name alone.",
      "เริ่มจากสัมผัส การเคลื่อนไหว และรูปทรงที่ต้องการ นำชิ้นผ้าหรือเสื้อผ้าอ้างอิงมาคุยเรื่องส่วนผสม โครงสร้าง การตกแต่งผิว และการจัดหากับทีม ควรตรวจผ้าที่เลือกในตัวอย่าง ไม่เลือกจากชื่อประเภทผ้าเพียงอย่างเดียว",
    ),
    sections: [
      {
        id: "compare-materials",
        title: text(
          "Compare against the product brief",
          "เปรียบเทียบกับบรีฟสินค้า",
        ),
        paragraphs: [
          text(
            "Discuss softness, drape, structure and stretch in relation to the garment. The fabric options shown on this website are starting points for that conversation; confirm the actual specification and available material before committing to production.",
            "คุยเรื่องความนุ่ม การทิ้งตัว การคงรูป และความยืดหยุ่นให้สัมพันธ์กับเสื้อผ้า ตัวเลือกผ้าบนเว็บไซต์เป็นจุดเริ่มต้นของการพูดคุย ควรยืนยัน Spec และวัสดุที่จัดหาได้จริงก่อนตกลงผลิต",
          ),
        ],
        links: [
          {
            href: "/about#fabrics",
            label: text("Explore the fabric range", "ดูตัวเลือกผ้า"),
          },
        ],
      },
      {
        id: "confirm-sourcing",
        title: text(
          "Confirm sourcing and documentation",
          "ยืนยันการจัดหาและเอกสาร",
        ),
        paragraphs: [
          text(
            "Ask about availability, quantity requirements, colour and any required supporting documents. Organic or recycled options depend on the specification, MOQ and sourcing. If certification is part of your brief, confirm the relevant fabric documentation with the team.",
            "สอบถามวัสดุที่มี จำนวนที่ต้องสั่ง สี และเอกสารที่ต้องใช้ ทางเลือก Organic หรือ Recycled ขึ้นอยู่กับ Spec, MOQ และการจัดหา หากบรีฟกำหนดเรื่องใบรับรอง ให้ยืนยันเอกสารของผ้าที่เกี่ยวข้องกับทีม",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-sample-development",
            label: text(
              "Review the chosen fabric through sampling",
              "ตรวจผ้าที่เลือกผ่านการทำตัวอย่าง",
            ),
          },
        ],
      },
    ],
    checklist: [
      text(
        "Bring a swatch or describe the required feel",
        "นำชิ้นผ้าหรือระบุสัมผัสที่ต้องการ",
      ),
      text(
        "Confirm specification, colour and availability",
        "ยืนยัน Spec สี และการจัดหา",
      ),
      text(
        "Identify documentation or performance checks needed",
        "ระบุเอกสารหรือการตรวจคุณสมบัติที่ต้องใช้",
      ),
    ],
    advice: text(
      "Confirm performance claims against the material selected for your order.",
      "ยืนยันคุณสมบัติกับผ้าที่เลือกใช้ในออร์เดอร์จริง",
    ),
    services: [
      { href: "/about#fabrics", label: text("Fabric options", "ตัวเลือกผ้า") },
    ],
    contact: text(
      "Discuss your fabric requirements",
      "พูดคุยเรื่องผ้าที่ต้องการ",
    ),
  },
  "preparing-sample-development": {
    introduction: text(
      "A first sample should answer the questions that matter most to your design. Agree the brief, material direction and measurements, then identify which details are ready to demonstrate and which remain open.",
      "ตัวอย่างรอบแรกควรช่วยตอบคำถามสำคัญของแบบ ตกลงบรีฟ แนวทางวัสดุ และขนาด พร้อมระบุรายละเอียดที่จะตรวจได้และเรื่องที่ยังเปิดอยู่",
    ),
    sections: [
      {
        id: "sample-scope",
        title: text(
          "Define the purpose of the sample round",
          "กำหนดเป้าหมายของตัวอย่างแต่ละรอบ",
        ),
        paragraphs: [
          text(
            "Give the team your references, measurement sheet and decoration requirements. Ask which fabric and trims will be used, and record any substitutions so you know what the sample can demonstrate.",
            "ส่งแบบอ้างอิง ตารางขนาด และรายละเอียดตกแต่งให้ทีม สอบถามผ้าและอุปกรณ์ที่จะใช้ และบันทึกวัสดุทดแทนเพื่อให้ทราบขอบเขตที่ตรวจจากตัวอย่างได้",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-garment-production-brief",
            label: text(
              "Prepare the supporting brief",
              "เตรียมบรีฟประกอบตัวอย่าง",
            ),
          },
        ],
      },
      {
        id: "sample-feedback",
        title: text(
          "Plan the review and feedback",
          "วางแผนตรวจและรวบรวมความเห็น",
        ),
        paragraphs: [
          text(
            "Choose who will review fit, appearance and details. Confirm the sample charges and schedule with the team, including any revision rounds. Keep one consolidated feedback record and use it to plan the approval review.",
            "กำหนดผู้ตรวจความพอดี รูปลักษณ์ และรายละเอียด ยืนยันค่าตัวอย่างและกำหนดเวลากับทีม รวมถึงรอบแก้ไข รวบรวมความเห็นไว้ชุดเดียวเพื่อใช้วางแผนตรวจอนุมัติ",
          ),
        ],
        links: [
          {
            href: "/guides/sample-approval-process",
            label: text(
              "Continue to sample approval",
              "อ่านต่อเรื่องอนุมัติตัวอย่าง",
            ),
          },
        ],
      },
    ],
    checklist: [
      text("Current brief and references", "บรีฟและแบบอ้างอิงปัจจุบัน"),
      text(
        "Measurements, materials and details to review",
        "ขนาด วัสดุ และรายละเอียดที่ต้องตรวจ",
      ),
      text(
        "Reviewer, feedback process and agreed sample terms",
        "ผู้ตรวจ วิธีรวบรวมความเห็น และเงื่อนไขตัวอย่างที่ตกลง",
      ),
    ],
    advice: text(
      "Record temporary materials so they do not become unintended production choices.",
      "บันทึกวัสดุชั่วคราวเพื่อไม่ให้นำไปใช้ผลิตโดยไม่ได้ตั้งใจ",
    ),
    services: [
      {
        href: "/oem-journey",
        label: text(
          "Sample development in the OEM workflow",
          "การทำตัวอย่างในขั้นตอน OEM",
        ),
      },
    ],
    contact: text("Discuss your first sample", "พูดคุยเรื่องตัวอย่างรอบแรก"),
  },
  "choosing-printing-and-embroidery": {
    introduction: text(
      "Decoration is part of the garment specification. Share the artwork, intended size and placement, and explain the visual effect and surface feel you want. Discuss the technique in relation to the fabric and design.",
      "งานตกแต่งเป็นส่วนหนึ่งของ Spec เสื้อผ้า ส่งไฟล์ลาย ขนาด และตำแหน่ง พร้อมอธิบายภาพและสัมผัสที่ต้องการ แล้วคุยเทคนิคให้สัมพันธ์กับผ้าและแบบ",
    ),
    sections: [
      {
        id: "artwork-brief",
        title: text("Prepare the artwork and placement", "เตรียมลายและตำแหน่ง"),
        paragraphs: [
          text(
            "Mark the placement on a garment reference and confirm the artwork dimensions and colours. Ask which files the team needs. Embroidery, screen printing, DTF and sublimation are options to discuss; their suitability should be reviewed for the intended material and result.",
            "ระบุตำแหน่งบนภาพเสื้อผ้าและยืนยันขนาดลายกับสี สอบถามรูปแบบไฟล์ที่ทีมต้องใช้ งานปัก สกรีน DTF และ Sublimation เป็นตัวเลือกสำหรับพูดคุย โดยควรตรวจความเหมาะสมตามวัสดุและผลที่ต้องการ",
          ),
        ],
        links: [
          {
            href: "/about#manufacturing",
            label: text(
              "Explore printing and finishing techniques",
              "ดูเทคนิคพิมพ์และตกแต่ง",
            ),
          },
        ],
      },
      {
        id: "decoration-review",
        title: text(
          "Review the decorated sample",
          "ตรวจตัวอย่างที่มีงานตกแต่ง",
        ),
        paragraphs: [
          text(
            "Review the appearance, position and feel on the intended fabric. If your design has specific care or performance requirements, agree the relevant checks with the team before approval.",
            "ตรวจรูปลักษณ์ ตำแหน่ง และสัมผัสบนผ้าที่ต้องการใช้ หากแบบมีข้อกำหนดการดูแลหรือคุณสมบัติเฉพาะ ให้ตกลงการตรวจที่เกี่ยวข้องกับทีมก่อนอนุมัติ",
          ),
        ],
        links: [
          {
            href: "/guides/sample-approval-process",
            label: text(
              "Include decoration in sample approval",
              "รวมงานตกแต่งในการตรวจอนุมัติตัวอย่าง",
            ),
          },
        ],
      },
    ],
    checklist: [
      text("Artwork and colour references", "ไฟล์ลายและสีอ้างอิง"),
      text("Dimensions and placement", "ขนาดและตำแหน่งลาย"),
      text(
        "Fabric and sample review requirements",
        "ผ้าและสิ่งที่ต้องตรวจในตัวอย่าง",
      ),
    ],
    advice: text(
      "Choose the technique after reviewing the design and material together.",
      "เลือกเทคนิคหลังพิจารณาแบบและวัสดุร่วมกัน",
    ),
    services: [
      {
        href: "/our-work#capabilities",
        label: text("Production capabilities", "ขอบเขตงานผลิต"),
      },
    ],
    contact: text("Discuss printing or embroidery", "พูดคุยเรื่องพิมพ์หรือปัก"),
  },
  "preparing-size-specifications": {
    introduction: text(
      "A useful size sheet explains both the number and how it is measured. Define the size range, units and points of measure so the sample review has a shared reference.",
      "ตารางไซซ์ที่ใช้งานได้ควรบอกทั้งตัวเลขและวิธีวัด กำหนดช่วงไซซ์ หน่วย และจุดวัดให้การตรวจตัวอย่างใช้ข้อมูลอ้างอิงเดียวกัน",
    ),
    sections: [
      {
        id: "measurement-points",
        title: text(
          "Define measurement points and units",
          "กำหนดจุดวัดและหน่วย",
        ),
        paragraphs: [
          text(
            "Label each measurement on a sketch or photograph. State the unit and measuring method, including whether a value refers to a flat width or a full circumference. If you start from a physical sample, ask the team to help identify the measurements needed.",
            "ระบุจุดวัดบนสเก็ตช์หรือภาพ พร้อมหน่วยและวิธีวัด เช่น ค่าวัดหน้ากว้างเมื่อวางราบหรือรอบตัว หากเริ่มจากตัวอย่างจริง ให้คุยกับทีมเพื่อระบุขนาดที่ต้องบันทึก",
          ),
        ],
        links: [
          {
            href: "/oem-products",
            label: text(
              "Find garment references for your size sheet",
              "ดูแบบเสื้อผ้าเพื่อเตรียมตารางไซซ์",
            ),
          },
        ],
      },
      {
        id: "size-review",
        title: text(
          "Agree how to review the size range",
          "ตกลงวิธีตรวจช่วงไซซ์",
        ),
        paragraphs: [
          text(
            "Review the base sample, then discuss which other sizes need checking. Confirm measurement tolerances for your garment with the factory rather than assuming one value applies everywhere.",
            "ตรวจตัวอย่างไซซ์ตั้งต้น แล้วตกลงว่าต้องตรวจไซซ์ใดเพิ่ม ยืนยันค่าความคลาดเคลื่อนตามเสื้อผ้ากับโรงงาน ไม่ใช้ค่าเดียวกับทุกจุดโดยไม่ได้ตกลง",
          ),
        ],
        links: [
          {
            href: "/guides/sample-approval-process",
            label: text(
              "Check size specifications during approval",
              "ตรวจตารางไซซ์ระหว่างอนุมัติตัวอย่าง",
            ),
          },
        ],
      },
    ],
    checklist: [
      text("Size range and units", "ช่วงไซซ์และหน่วย"),
      text("Labelled measurement points", "จุดวัดพร้อมคำอธิบาย"),
      text(
        "Fit reference and agreed tolerance review",
        "ทรงอ้างอิงและการทบทวนค่าความคลาดเคลื่อน",
      ),
    ],
    advice: text(
      "A size label alone does not define garment measurements.",
      "ชื่อไซซ์เพียงอย่างเดียวไม่ได้ระบุขนาดเสื้อผ้า",
    ),
    services: [
      {
        href: "/technical-insights#toolkit",
        label: text(
          "Sizing tools and specification requests",
          "เครื่องมือไซซ์และการขอ Spec sheet",
        ),
      },
    ],
    contact: text("Discuss your size specification", "พูดคุยเรื่องตารางไซซ์"),
  },
  "planning-moq-and-order-quantity": {
    introduction: text(
      "Begin with the quantities you expect to order, separated by style, colour and size. MOQ should be discussed for your actual design and materials, not assumed from an unrelated garment.",
      "เริ่มจากจำนวนที่ต้องการแยกตามแบบ สี และไซซ์ ควรสอบถาม MOQ ตามแบบและวัสดุจริง ไม่อ้างอิงจำนวนขั้นต่ำของสินค้าที่ไม่เกี่ยวข้อง",
    ),
    sections: [
      {
        id: "quantity-table",
        title: text("Prepare a quantity breakdown", "เตรียมตารางจำนวนผลิต"),
        paragraphs: [
          text(
            "Separate estimates from confirmed quantities. Show how the total is distributed across colours and sizes so the factory can review the order scope and identify details still needed for the quotation.",
            "แยกยอดประมาณการออกจากยอดยืนยัน แสดงจำนวนแต่ละสีและไซซ์เพื่อให้โรงงานตรวจขอบเขตออร์เดอร์และข้อมูลที่ยังต้องใช้สำหรับเสนอราคา",
          ),
        ],
        links: [
          {
            href: "/guides/preparing-garment-production-brief",
            label: text(
              "Include quantities in your brief",
              "ใส่จำนวนผลิตในบรีฟ",
            ),
          },
        ],
      },
      {
        id: "moq-review",
        title: text(
          "Confirm requirements with the team",
          "ยืนยันข้อกำหนดกับทีม",
        ),
        paragraphs: [
          text(
            "Ask how material sourcing, trims, decoration and order changes affect the quotation and minimum quantities for this project. Confirm what the quoted price covers and revisit the scope if the quantity breakdown changes.",
            "สอบถามว่าการจัดหาวัสดุ อุปกรณ์ งานตกแต่ง และการเปลี่ยนออร์เดอร์มีผลต่อราคาและจำนวนขั้นต่ำของโปรเจกต์อย่างไร ยืนยันขอบเขตราคา และทบทวนอีกครั้งเมื่อเปลี่ยนจำนวนแต่ละรายการ",
          ),
        ],
        links: [
          {
            href: "/guides/how-to-choose-fabric",
            label: text("Review material availability", "ทบทวนการจัดหาวัสดุ"),
          },
        ],
      },
    ],
    checklist: [
      text(
        "Total and breakdown by style, colour and size",
        "ยอดรวมและจำนวนแยกแบบ สี และไซซ์",
      ),
      text("Estimated versus confirmed quantities", "ยอดประมาณการและยอดยืนยัน"),
      text(
        "MOQ and quotation scope confirmed for the design",
        "MOQ และขอบเขตราคาที่ตกลงตามแบบ",
      ),
    ],
    advice: text(
      "Confirm quantity changes before assuming the original quotation still applies.",
      "ยืนยันการเปลี่ยนจำนวนก่อนถือว่าใบเสนอราคาเดิมยังใช้ได้",
    ),
    services: [
      {
        href: "/start-your-project",
        label: text(
          "Share your proposed order",
          "ส่งรายละเอียดออร์เดอร์ที่วางแผนไว้",
        ),
      },
    ],
    contact: text("Discuss quantities and MOQ", "พูดคุยเรื่องจำนวนผลิตและ MOQ"),
  },
  "quality-checkpoints-before-production": {
    introduction: text(
      "Quality checks need a clear reference. Agree the approved sample, specifications and material details before discussing how the order will be checked during production and before packing.",
      "การตรวจคุณภาพต้องมีแบบอ้างอิงที่ชัดเจน ยืนยันตัวอย่าง Spec และวัสดุก่อนตกลงวิธีตรวจระหว่างผลิตและก่อนแพ็ก",
    ),
    sections: [
      {
        id: "quality-reference",
        title: text(
          "Agree what the team will check against",
          "ตกลงข้อมูลที่ทีมใช้ตรวจเทียบ",
        ),
        paragraphs: [
          text(
            "Use the current approved sample and measurement sheet, with any specific appearance, construction or decoration requirements. Record how corrections and changes will be communicated.",
            "ใช้ตัวอย่างที่อนุมัติและตารางขนาดปัจจุบัน พร้อมข้อกำหนดรูปลักษณ์ การประกอบ หรืองานตกแต่ง บันทึกวิธีสื่อสารเมื่อแก้ไขหรือเปลี่ยนรายละเอียด",
          ),
        ],
        links: [
          {
            href: "/guides/sample-approval-process",
            label: text(
              "Establish the approved sample reference",
              "กำหนดตัวอย่างอ้างอิงที่อนุมัติ",
            ),
          },
        ],
      },
      {
        id: "factory-checks",
        title: text(
          "Discuss the factory checkpoints",
          "พูดคุยเรื่องจุดตรวจในโรงงาน",
        ),
        paragraphs: [
          text(
            "The factory workflow includes incoming fabric checks, sample checks during sewing and inspection of every completed garment at end-line. Corrections are rechecked before pressing and packing, with needle or metal checks before packing. Discuss any additional project-specific requirements with the team.",
            "ขั้นตอนโรงงานมีการตรวจผ้าที่รับเข้า สุ่มตรวจระหว่างเย็บ และตรวจสินค้าทุกตัวหลังเย็บ ตรวจซ้ำเมื่อแก้ไขก่อนรีดและแพ็ก พร้อมตรวจเข็มหรือโลหะก่อนแพ็ก หากโปรเจกต์มีข้อกำหนดเพิ่มเติม ให้คุยกับทีมเพื่อยืนยัน",
          ),
        ],
        links: [
          {
            href: "/oem-journey#quality",
            label: text(
              "See the quality control protocol",
              "ดูแนวทางตรวจคุณภาพ",
            ),
          },
        ],
      },
    ],
    checklist: [
      text(
        "Approved sample and current specifications",
        "ตัวอย่างอนุมัติและ Spec ปัจจุบัน",
      ),
      text("Specific quality requirements", "ข้อกำหนดคุณภาพเฉพาะ"),
      text("Correction and recheck process", "วิธีแก้ไขและตรวจซ้ำ"),
    ],
    advice: text(
      "Confirm additional requirements before production starts.",
      "ยืนยันข้อกำหนดเพิ่มเติมก่อนเริ่มผลิต",
    ),
    services: [
      {
        href: "/about#process",
        label: text(
          "Factory process and equipment",
          "กระบวนการและอุปกรณ์โรงงาน",
        ),
      },
    ],
    contact: text("Discuss quality requirements", "พูดคุยเรื่องข้อกำหนดคุณภาพ"),
  },
  "preparing-bulk-production-and-delivery": {
    introduction: text(
      "Once the sample is approved, bring the production details together: final quantities, material references, labels, packing and delivery arrangements. Confirm the schedule and terms directly with the factory.",
      "เมื่ออนุมัติตัวอย่างแล้ว ให้รวมข้อมูลผลิต ได้แก่ จำนวนสุดท้าย วัสดุอ้างอิง ป้าย วิธีแพ็ก และการส่งมอบ พร้อมยืนยันแผนเวลาและเงื่อนไขกับโรงงานโดยตรง",
    ),
    sections: [
      {
        id: "production-release",
        title: text(
          "Confirm the production handover",
          "ยืนยันข้อมูลส่งต่องานผลิต",
        ),
        paragraphs: [
          text(
            "Check that the approved version, measurement sheet and material choices agree with the order. Identify unresolved items and ask whether they prevent production from starting. Reconfirm the plan when specifications or quantities change.",
            "ตรวจแบบอนุมัติ ตารางขนาด และวัสดุให้ตรงกับออร์เดอร์ ระบุเรื่องที่ยังค้างและสอบถามว่ามีผลให้เริ่มผลิตไม่ได้หรือไม่ ยืนยันแผนใหม่เมื่อเปลี่ยน Spec หรือจำนวน",
          ),
        ],
        links: [
          {
            href: "/guides/sample-approval-process",
            label: text(
              "Review the approval decision",
              "ทบทวนการอนุมัติตัวอย่าง",
            ),
          },
        ],
      },
      {
        id: "packing-delivery",
        title: text(
          "Plan labels, packing and delivery",
          "วางแผนป้าย แพ็ก และส่งมอบ",
        ),
        paragraphs: [
          text(
            "Provide label and barcode requirements, packing instructions, delivery location and contact details. Agree how goods will be counted by style, colour and size, and confirm the delivery date after material, production and QC planning is reviewed.",
            "แจ้งข้อกำหนดป้ายและบาร์โค้ด วิธีแพ็ก สถานที่ส่งและผู้ติดต่อ ตกลงการตรวจนับแยกตามแบบ สี และไซซ์ และยืนยันกำหนดส่งหลังทบทวนแผนวัสดุ ผลิต และ QC",
          ),
        ],
        links: [
          {
            href: "/oem-journey",
            label: text(
              "Follow the production-to-delivery workflow",
              "ดูขั้นตอนตั้งแต่ผลิตถึงส่งมอบ",
            ),
          },
        ],
      },
    ],
    checklist: [
      text(
        "Final approved specifications and quantities",
        "Spec และจำนวนสุดท้ายที่อนุมัติ",
      ),
      text(
        "Labels, packing instructions and delivery contact",
        "ป้าย วิธีแพ็ก และผู้ติดต่อรับสินค้า",
      ),
      text(
        "Confirmed schedule and commercial terms",
        "แผนเวลาและเงื่อนไขทางการค้าที่ตกลง",
      ),
    ],
    advice: text(
      "A requested delivery date needs confirmation against the actual order plan.",
      "วันที่ต้องการรับสินค้าต้องยืนยันตามแผนของออร์เดอร์จริง",
    ),
    services: [
      {
        href: "/oem-journey#quality",
        label: text("Checks before packing", "การตรวจก่อนแพ็ก"),
      },
    ],
    contact: text(
      "Discuss production and delivery",
      "พูดคุยเรื่องผลิตและส่งมอบ",
    ),
  },
};
