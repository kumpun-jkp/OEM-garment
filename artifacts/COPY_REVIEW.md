# Website Copy Review — Thonburi Master / TM Apparel

วันที่ตรวจ: 5 ตุลาคม 2026

ตรวจจาก source code และข้อความสองภาษาของเว็บไซต์ปัจจุบัน ครอบคลุม Home, About Us, Our Work, OEM Journey, Garment Style References, Technical Insights, Start Your Project, Contact, navigation, footer, metadata, image descriptions และข้อความสถานะ/ข้อผิดพลาด

ทบทวน 867 รายการข้อความสองภาษาใน dictionary: ปรับ 104 รายการ และคง 763 รายการที่ชัดเจนอยู่แล้ว รายการอาจถูกใช้ในหลายหน้า หรือเป็นข้อความสำรองใน framework ไม่ใช่จำนวน section บนเว็บไซต์

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

### 1. Home / Hero

ตำแหน่ง: `src/app/[locale]/page.tsx:48`

**Original**

TH: เปลี่ยนไอเดียของคุณ ให้เป็นสินค้าพร้อมขาย

EN: Turn your ideas into retail-ready garments

**Recommended Version**

TH: ผลิตเสื้อผ้า OEM จากไอเดียถึงส่งมอบ

EN: OEM garments, from idea to delivery

**Reasoning**

ระบุบริการและขอบเขตงานทันที แทนคำสัญญาเชิงโฆษณาว่าสินค้าพร้อมขาย

### 2. Home / Introduction

ตำแหน่ง: `src/content/site.ts:64`

**Original**

TH: Thonburi Master ให้บริการผลิตเสื้อผ้า OEM ผ่าน TM Apparel สำหรับแบรนด์ไทยและต่างประเทศ ดูแลงานตั้งแต่รับบรีฟ ทำตัวอย่าง ผลิตจริง ตรวจคุณภาพ จนถึงส่งมอบ

EN: Thonburi Master provides OEM garment manufacturing through TM Apparel for domestic and international brands. We manage the process from brief and sample making to bulk production, QC, and delivery.

**Recommended Version**

TH: Thonburi Master ให้บริการผลิตเสื้อผ้า OEM ผ่าน TM Apparel สำหรับแบรนด์ไทยและต่างประเทศ เราทำงานร่วมกับคุณตั้งแต่รับบรีฟและ Sampling ไปจนถึง Bulk Production, QC และส่งมอบ

EN: Thonburi Master provides OEM garment manufacturing through TM Apparel for Thai and international brands. We work with you from the brief and sampling through bulk production, QC and delivery.

**Reasoning**

แสดงบทบาทพาร์ตเนอร์ด้วยงานที่ทำจริง และใช้ศัพท์กระบวนการที่ลูกค้า B2B คุ้นเคย

### 3. Home / Why us

ตำแหน่ง: `src/app/[locale]/page.tsx:78`

**Original**

TH: เราเป็นพาร์ตเนอร์การผลิต ตั้งแต่เริ่มบรีฟจนถึงส่งมอบ

EN: Your manufacturing partner from brief to delivery

**Recommended Version**

TH: พาร์ตเนอร์การผลิตของคุณ ตั้งแต่บรีฟจนถึงส่งมอบ

EN: Your manufacturing partner from brief to delivery

**Reasoning**

คงแนวคิดเดิมที่ชัดเจน ปรับภาษาไทยให้กระชับและเป็นธรรมชาติ

### 4. Home / Why us

ตำแหน่ง: `src/content/site.ts:65`

**Original**

TH: สำหรับเรา งานผลิตที่ดีเริ่มต้นก่อนเข็มจักรเริ่มเดิน ด้วยการเข้าใจแบบสินค้า จำนวนที่ต้องการ การใช้งาน และกำหนดส่งมอบ เพื่อให้ทุกขั้นตอนของโครงการเป็นไปในทิศทางเดียวกัน

EN: For us, good manufacturing starts before the sewing needle moves. By understanding the product design, quantity, usage, and delivery schedule, we ensure every step of the project aligns in the same direction.

**Recommended Version**

TH: ก่อนเริ่มผลิต เราทบทวน Design จำนวน การใช้งาน และกำหนดส่งมอบร่วมกับคุณ เพื่อใช้เป็นแนวทางทำงานในแต่ละขั้นตอน

EN: We review your design, quantity, intended use and delivery date with you before production. These details guide the work at each stage.

**Reasoning**

แทนภาพเปรียบเทียบและคำรับประกันด้วยการทำงานร่วมกันที่เข้าใจง่าย

### 5. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:144`

**Original**

TH: เริ่มต้นโปรเจกต์

EN: Submission gateways

**Recommended Version**

TH: เริ่มโปรเจกต์

EN: Start your project

**Reasoning**

ใช้ภาษาที่ผู้เข้าชมเข้าใจทันทีแทนศัพท์ของระบบ

### 6. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:152`

**Original**

TH: ขั้นที่ 01 / ไอเดียเบื้องต้น

EN: Stage 01 / Concept

**Recommended Version**

TH: จุดเริ่มต้น 01 / ไอเดีย

EN: Starting point 01 / Idea

**Reasoning**

สองการ์ดเป็นทางเลือกเริ่มต้น ไม่ใช่ขั้นตอนที่ต้องทำตามลำดับ

### 7. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:162`

**Original**

TH: ขั้นที่ 02 / เตรียมผลิต

EN: Stage 02 / Production

**Recommended Version**

TH: จุดเริ่มต้น 02 / แบบหรือภาพอ้างอิง

EN: Starting point 02 / design or reference

**Reasoning**

สื่อความพร้อมที่ต้องใช้จริง โดยไม่ทำให้เข้าใจว่าสามารถเริ่มผลิตทันที

### 8. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:163`

**Original**

TH: พร้อมประเมินการผลิต

EN: Ready to production

**Recommended Version**

TH: พร้อมให้ทีมประเมิน

EN: Ready for review

**Reasoning**

แก้ไวยากรณ์อังกฤษและแยกการประเมินออกจากการเริ่มผลิต

### 9. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:164`

**Original**

TH: มีแบบสินค้าเบื้องต้น

EN: Early product idea

**Recommended Version**

TH: มีแบบหรือภาพอ้างอิงแล้ว

EN: Have a design or reference?

**Reasoning**

ทำให้สองทางเลือกแตกต่างกันชัดเจน

### 10. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:198`

**Original**

TH: บอกเราเกี่ยวกับสินค้าที่อยากทำ กลุ่มลูกค้า หรือผลลัพธ์ที่ต้องการ เพื่อช่วยกันกำหนดข้อมูลที่จำเป็นก่อนเริ่มผลิต

EN: Tell us about the product you want to make, target audience, or desired outcome to help define requirements before production.

**Recommended Version**

TH: บอกเราว่าต้องการผลิตอะไร สำหรับใคร และใช้งานอย่างไร เพื่อช่วยกันทบทวนรายละเอียดก่อนเริ่มผลิต

EN: Tell us what you want to make, who it is for and how it will be used. We can review the production requirements together.

**Reasoning**

ใช้คำถามที่ตอบได้ง่ายแทนการถามผลลัพธ์แบบกว้าง ๆ

### 11. Home / Starting points

ตำแหน่ง: `src/app/[locale]/page.tsx:199`

**Original**

TH: ส่งตัวอย่างสินค้า ภาพอ้างอิง สเก็ตช์ หรือแบบที่มี พร้อมระบุจำนวนที่ต้องการและวันที่ต้องการใช้งาน

EN: Send us a product sample, reference image, sketch, or design, along with the desired quantity and deadline.

**Recommended Version**

TH: ส่งตัวอย่าง ภาพอ้างอิง สเก็ตช์ หรือ Design ที่มี พร้อมจำนวนและวันที่ต้องการส่งมอบ

EN: Share your sample, reference images, sketch or design, together with the quantity and required delivery date.

**Reasoning**

บอกข้อมูลที่จำเป็นอย่างตรงไปตรงมา โดยคงรายละเอียดเดิม

### 12. Home / Starting points

ตำแหน่ง: `src/content/site.ts:67`

**Original**

TH: ไม่ว่าคุณจะมีตัวอย่างสินค้าอยู่แล้ว หรือมีเพียงไอเดียเบื้องต้น ส่งรายละเอียดที่มีมาให้เราได้ ทีมงานจะช่วยประเมินและพูดคุยถึงขั้นตอนถัดไปที่เหมาะกับโครงการของคุณ

EN: Whether you already have a product sample or just a preliminary idea, send us your details. Our team will help evaluate and discuss the next steps suited for your project.

**Recommended Version**

TH: มีตัวอย่าง แบบสินค้า หรือแค่ไอเดียเบื้องต้น ก็เริ่มพูดคุยได้ ส่งข้อมูลที่มีให้ทีมงานช่วยประเมินและหารือขั้นตอนถัดไปร่วมกับคุณ

EN: Have a sample, a design or an initial idea? Share what you have. Our team will review it with you and discuss the next step.

**Reasoning**

ลดความกังวลของแบรนด์ใหม่ พร้อมบอกวิธีเริ่มต้นอย่างชัดเจน

### 13. Shared / Factory visit CTA

ตำแหน่ง: `src/components/shared-sections.tsx:48`

**Original**

TH: เริ่มงานกับเราทันที เราพร้อมแล้วที่จะ Support คุณ

EN: Start working with us today, we are ready to support you

**Recommended Version**

TH: พูดคุยเรื่องโปรเจกต์เสื้อผ้าของคุณ

EN: Let’s discuss your garment project

**Reasoning**

ลดแรงกดดันให้เริ่มงานทันที และชวนเข้าสู่การพูดคุยที่เหมาะกับ CTA

### 14. Shared / Factory visit

ตำแหน่ง: `src/content/site.ts:71`

**Original**

TH: เรายินดีต้อนรับผู้บริหารหน่วยงาน ทีมพัฒนาผลิตภัณฑ์ หรือเจ้าของแบรนด์ เข้าชมกระบวนการผลิตของโรงงานโดยตรง พร้อมนัดหมายล่วงหน้าเพื่อพูดคุยความต้องการของแบรนด์ และเยี่ยมชมโรงงานของเราเพื่อศึกษาแนวทางการทำงานของเราก่อนเริ่มผลิต

EN: We welcome executives, product development teams, or brand owners to visit our factory production process directly. Please make an appointment in advance to discuss your brand's needs and tour our factory to understand our workflow before starting production.

**Recommended Version**

TH: นัดเยี่ยมชมโรงงานเพื่อดูขั้นตอนการทำงานและพูดคุยเรื่องการผลิตของแบรนด์คุณ เรายินดีต้อนรับเจ้าของแบรนด์ ทีมพัฒนาสินค้า และผู้บริหาร โดยนัดหมายล่วงหน้า

EN: Visit the factory to see how we work and discuss your brand’s production requirements. We welcome brand owners, product development teams and executives by appointment.

**Reasoning**

ลดประโยคซ้ำและเริ่มจากประโยชน์ที่ลูกค้าจะได้รับ โดยคงเงื่อนไขนัดหมาย

### 15. Shared / Customers

ตำแหน่ง: `src/content/site.ts:69`

**Original**

TH: TM Apparel เรามีประสบการณ์ผลิตเสื้อผ้าให้แก่ศูนย์การค้าชั้นนำของไทย สะท้อนความเข้าใจในการทำงานร่วมกับลูกค้าค้าปลีกและแบรนด์ที่มีความต้องการแตกต่างกัน

EN: At TM Apparel, we have experience manufacturing garments for leading Thai shopping malls, reflecting our understanding of working with retail clients and brands with varying requirements.

**Recommended Version**

TH: TM Apparel มีประสบการณ์ผลิตเสื้อผ้าให้ลูกค้าค้าปลีกในไทย โดยทำงานตามความต้องการด้านสินค้าและการผลิตของลูกค้าแต่ละราย

EN: TM Apparel has experience manufacturing garments for Thai retail clients. We work with each customer’s product and production requirements.

**Reasoning**

ตัดคำว่าชั้นนำและข้อสรุปเชิงโอ้อวด ใช้ประสบการณ์เดิมเป็นฐานความน่าเชื่อถือ

### 16. About / Introduction

ตำแหน่ง: `src/content/site.ts:75`

**Original**

TH: TM Apparel เป็นส่วนหนึ่งของ Thonburi Master ให้บริการผลิตเสื้อผ้า OEM สำหรับแบรนด์ไทยและต่างประเทศ ตั้งแต่รับบรีฟ ประเมินรายละเอียด เลือกวัสดุ พัฒนาตัวอย่าง ผลิตจริง ตรวจคุณภาพ จนถึงส่งมอบ เราวางแผนงานร่วมกับลูกค้าและใช้ตัวอย่างที่อนุมัติเป็นแนวทางในการผลิต เพื่อให้ขนาด รูปทรง และรายละเอียดสอดคล้องกับความต้องการของแต่ละแบรนด์

EN: TM Apparel is part of Thonburi Master, providing OEM garment manufacturing for Thai and international brands. We manage each stage, from reviewing the brief and selecting materials to sample development, bulk production, QC and delivery. We plan with our clients and use approved samples to guide production so that sizes, shapes and details match each brand's requirements.

**Recommended Version**

TH: TM Apparel เป็นส่วนหนึ่งของ Thonburi Master ให้บริการผลิตเสื้อผ้า OEM สำหรับแบรนด์ไทยและต่างประเทศ ตั้งแต่ทบทวนบรีฟและเลือก Material ไปจนถึง Sampling, Bulk Production, QC และส่งมอบ

EN: TM Apparel is part of Thonburi Master. We provide OEM garment manufacturing for Thai and international brands, from brief review and material selection through sampling, bulk production, QC and delivery.

**Reasoning**

แยกข้อมูลบริษัทออกจากวิธีทำงาน ลดเนื้อหาซ้ำกับย่อหน้าถัดไป

### 17. About / Collaboration

ตำแหน่ง: `src/app/[locale]/about/page.tsx:118`

**Original**

TH: เราวางแผนงานร่วมกับลูกค้าตั้งแต่เลือกผ้าและวัสดุ จนถึงอนุมัติตัวอย่าง ทีมตัด เย็บ และรีดประชุมเปิดแบบร่วมกันก่อนเริ่มผลิต เพื่อให้ขนาด รูปทรง เทคนิค และจุดตรวจคุณภาพเป็นไปตามรายละเอียดที่ตกลง

EN: We plan materials and sample approval with our customers. Cutting, sewing and pressing teams review the design together before production to align sizes, shapes, techniques and quality checkpoints with the agreed details.

**Recommended Version**

TH: เราวางแผนเลือก Material และอนุมัติตัวอย่างร่วมกับคุณ ก่อนเริ่มผลิต ทีมตัด เย็บ และรีดจะทบทวนแบบที่อนุมัติร่วมกัน ทั้งไซซ์ ทรง เทคนิค และจุดตรวจ QC

EN: We plan materials and sample approval with you. Before production, our cutting, sewing and pressing teams review the approved design together, including sizes, shapes, techniques and QC checkpoints.

**Reasoning**

ทำให้ลูกค้าเห็นว่าตัวอย่างที่อนุมัติเชื่อมกับการทำงานของทีมอย่างไร

### 18. About / Hero

ตำแหน่ง: `src/app/[locale]/about/page.tsx:113`

**Original**

TH: สำหรับ Brand ไทยและต่างประเทศ

EN: For Thai and international brands

**Recommended Version**

TH: สำหรับแบรนด์ไทยและต่างประเทศ

EN: For Thai and international brands

**Reasoning**

ใช้คำว่าแบรนด์ที่อ่านเป็นธรรมชาติในภาษาไทย โดยไม่จำเป็นต้องใช้ English ทุกคำ

### 19. About / History

ตำแหน่ง: `src/app/[locale]/about/page.tsx:156`

**Original**

TH: Company history // ประวัติบริษัท

EN: Company history

**Recommended Version**

TH: ประวัติบริษัท

EN: Company history

**Reasoning**

ตัดหัวข้อสองภาษาที่ซ้ำใน locale ไทย

### 20. About / History

ตำแหน่ง: `src/app/[locale]/about/page.tsx:406`

**Original**

TH: ประสบการณ์การผลิต ที่เติบโตไปพร้อมกับ Brand

EN: Manufacturing experience that grows with your brand

**Recommended Version**

TH: ประสบการณ์ด้านการผลิตของเรา

EN: Our manufacturing experience

**Reasoning**

ให้หัวข้อทำหน้าที่แนะนำประวัติบริษัท แทนคำสัญญาการเติบโตของลูกค้า

### 21. About / Audit

ตำแหน่ง: `src/app/[locale]/about/page.tsx:234`

**Original**

TH: ระบุช่วงเวลา audit ตามข้อมูลที่มี

EN: Audit periods shown where supplied

**Recommended Version**

TH: ตรวจสอบช่วงเวลาประเมิน

EN: Check the assessment period

**Reasoning**

เปลี่ยนคำอธิบายการจัดทำข้อมูลให้เป็นสิ่งที่ผู้ซื้อควรพิจารณา

### 22. About / Audit

ตำแหน่ง: `src/app/[locale]/about/page.tsx:241`

**Original**

TH: ผลประเมินโรงงานของ Big C ปี 2025 โดย NSF Asia-Pacific ระบุ Grade A, 94.61% และ Pass ผลประเมิน Lotus’s ที่ได้รับโดย TÜV Rheinland ระบุ Blue Tier ตาม Non-Food Standard v.1 ข้อมูลนี้เป็นผล audit จากลูกค้า กรุณาสอบถามช่วงเวลาประเมินปัจจุบันและรายละเอียดเอกสารโรงงานกับทีมงาน

EN: Big C's 2025 factory assessment by NSF Asia-Pacific recorded Grade A, 94.61% and Pass. The supplied Lotus’s assessment by TÜV Rheinland recorded Blue Tier against its Non-Food Standard v.1. These are partner audit results; ask our team for the current assessment period and relevant factory document details.

**Recommended Version**

TH: ผลประเมินโรงงานของ Big C ปี 2025 โดย NSF Asia-Pacific ระบุ Grade A, 94.61% และ Pass ส่วนผลประเมิน Lotus’s ที่มีโดย TÜV Rheinland ระบุ Blue Tier ตาม Non-Food Standard v.1 ข้อมูลนี้เป็นผล audit จากลูกค้า ติดต่อทีมงานเพื่อยืนยันช่วงเวลาประเมินปัจจุบันและขอเอกสารโรงงานที่เกี่ยวข้อง

EN: Big C’s 2025 factory assessment by NSF Asia-Pacific recorded Grade A, 94.61% and Pass. The available Lotus’s assessment by TÜV Rheinland recorded Blue Tier under its Non-Food Standard v.1. These are customer audit results. Contact our team to confirm the current assessment period and request relevant factory documents.

**Reasoning**

แบ่งประโยคให้อ่านง่าย รักษาผลและช่วงเวลา audit โดยไม่กล่าวว่าเป็น Certification ปัจจุบัน

### 23. About / People and workplace

ตำแหน่ง: `src/app/[locale]/about/page.tsx:315`

**Original**

TH: โรงงานดูแลค่าจ้างตามกฎหมาย ประกันสังคม และตรวจสุขภาพประจำปี มีเบี้ยขยัน ห้องพักราคาลดหย่อน น้ำดื่ม อาหารบริษัท และแจกข้าวสารประจำปี รวมถึงซ้อมดับเพลิง อุปกรณ์ดับเพลิง ปฐมพยาบาล และป้ายเตือนเพื่อเตรียมความพร้อมของสถานที่ทำงาน แผง Solar ช่วยจัดหาพลังงาน

EN: Our workforce provisions include wages in line with legal requirements, social security and annual health checks. Staff support includes attendance incentives, reduced-rate rooms, drinking water, company meals and annual rice distribution. Fire drills, fire equipment, first aid and warning signs support workplace preparedness; solar panels contribute to energy supply.

**Recommended Version**

TH: เราดูแลค่าจ้างตามกฎหมาย ประกันสังคม และการตรวจสุขภาพประจำปี สวัสดิการมีทั้งเบี้ยขยัน ที่พักราคาลดหย่อน น้ำดื่ม อาหารบริษัท และการแจกข้าวสารประจำปี โรงงานมีการซ้อมดับเพลิง อุปกรณ์ดับเพลิง ปฐมพยาบาล และป้ายเตือนเพื่อเตรียมความพร้อม รวมถึงใช้แผง Solar เป็นส่วนหนึ่งของแหล่งพลังงาน

EN: We provide wages in line with legal requirements, social security and annual health checks. Staff welfare includes attendance incentives, reduced-rate accommodation, drinking water, company meals and annual rice distribution. Fire drills, fire equipment, first aid and warning signs support workplace preparedness. Solar panels contribute to the factory’s energy supply.

**Reasoning**

แบ่งข้อมูลคน ความปลอดภัย และพลังงานออกเป็นประโยคสั้น โดยไม่เพิ่มข้ออ้างเรื่องมาตรฐาน

### 24. About / People and workplace

ตำแหน่ง: `src/app/[locale]/about/page.tsx:350`

**Original**

TH: แผง Solar ช่วยจัดหาพลังงานให้โรงงาน สามารถพูดคุยเรื่องผ้า Organic หรือ Recycled ตาม spec, MOQ และวัสดุที่ผู้จำหน่ายมี

EN: Solar panels contribute to the factory's energy supply. Organic or recycled fabric sourcing can be discussed by specification, minimum quantity and supplier availability.

**Recommended Version**

TH: โรงงานใช้แผง Solar เป็นส่วนหนึ่งของแหล่งพลังงาน สอบถามทางเลือกผ้า Organic หรือ Recycled ได้ โดยขึ้นอยู่กับ Specification, MOQ และการจัดหา

EN: Solar panels contribute to the factory’s energy supply. Ask us about organic or recycled fabric options; availability depends on specification, MOQ and sourcing.

**Reasoning**

คงข้อจำกัดการจัดหาผ้า และไม่เพิ่มคำกล่าวอ้างด้านผลกระทบสิ่งแวดล้อม

### 25. About / Team

ตำแหน่ง: `src/app/[locale]/about/page.tsx:396`

**Original**

TH: หน้าที่:

EN: Discipline:

**Recommended Version**

TH: หน้าที่:

EN: Role:

**Reasoning**

ใช้คำที่ตรงกับบทบาททีมงานมากกว่า discipline

### 26. Our Work / Hero

ตำแหน่ง: `src/app/[locale]/our-work/page.tsx:36`

**Original**

TH: ความไว้วางใจที่เราส่งต่อเป็นสินค้าจริง

EN: Your trust, delivered as finished garments

**Recommended Version**

TH: ผลิตเสื้อผ้าตามแบบที่คุณอนุมัติ

EN: Garment production to your approved design

**Reasoning**

แทน slogan เรื่องความไว้วางใจด้วยขอบเขตบริการที่ตรวจสอบได้

### 27. Our Work / Introduction

ตำแหน่ง: `src/app/[locale]/our-work/page.tsx:52`

**Original**

TH: TM Apparel ดูแลงานผลิตเสื้อผ้าตามแบบและรายละเอียดที่ลูกค้าอนุมัติ ตั้งแต่เลือกผ้า พัฒนาตัวอย่าง ตัดเย็บ และตกแต่ง จนถึงตรวจคุณภาพและเตรียมส่งมอบ เพื่อให้วัสดุ ขนาด และรายละเอียดของสินค้าสอดคล้องกับความต้องการของแบรนด์

EN: TM Apparel manufactures garments to customer-approved designs and specifications, from fabric selection, sampling, cutting, sewing and decoration to quality checks and delivery preparation, aligning materials, sizes and product details with each brand's requirements.

**Recommended Version**

TH: TM Apparel ผลิตเสื้อผ้าตาม Design และ Specification ที่คุณอนุมัติ เราดูแลตั้งแต่เลือกผ้า Sampling ตัด เย็บ และตกแต่ง ไปจนถึง QC และเตรียมส่งมอบ โดยตกลง Material ไซซ์ และรายละเอียดสินค้าร่วมกันสำหรับโปรเจกต์ของคุณ

EN: TM Apparel manufactures garments to your approved design and specification. We manage fabric selection, sampling, cutting, sewing and decoration, followed by QC and delivery preparation. Materials, sizes and garment details are agreed for your project.

**Reasoning**

แยกประโยคยาวและระบุจุดที่ตกลงกับลูกค้า โดยคงความหมายทางเทคนิค

### 28. Our Work / CTA

ตำแหน่ง: `src/app/[locale]/our-work/page.tsx:162`

**Original**

TH: แล้วคุณล่ะ? ถึงคราว Batch ของคุณบ้างแล้ว

EN: Is it time for your next batch?

**Recommended Version**

TH: กำลังวางแผนผลิตคอลเลกชันถัดไปอยู่ไหม

EN: Planning your next production run?

**Reasoning**

ปรับคำชวนที่ฟังเร่งเร้าให้สอดคล้องกับการวางแผนของลูกค้า

### 29. Our Work / CTA

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:199`

**Original**

TH: เริ่มต้นด้วยผ้า หรือดีไซน์ ที่ตอบโจทย์กับ Brand ของคุณ

EN: Start with fabric or a design that suits your brand

**Recommended Version**

TH: พูดคุยเรื่องผ้าและ Design สำหรับแบรนด์ของคุณ

EN: Discuss the fabric and design for your brand

**Reasoning**

ชวนหารือเรื่องงานที่เป็นรูปธรรมแทนคำว่าตอบโจทย์

### 30. Our Work / Page title

ตำแหน่ง: `src/app/[locale]/our-work/page.tsx:32`

**Original**

TH: ผลงานของเราและความไว้วางใจที่ส่งต่อ

EN: Our work, delivered trust

**Recommended Version**

TH: ผลงานและขอบเขตการผลิต

EN: Our work & capabilities

**Reasoning**

ชื่อหน้าชัดเจนและสอดคล้องกับเนื้อหา มากกว่าคำโฆษณา

### 31. Our Work / Page title

ตำแหน่ง: `src/components/product-directory.tsx:66`

**Original**

TH: ภาพรวมผลงานและการผลิต

EN: Our work & capabilities

**Recommended Version**

TH: ผลงานและขอบเขตการผลิต

EN: Our work & capabilities

**Reasoning**

ชื่อหน้าชัดเจนและสอดคล้องกับเนื้อหา มากกว่าคำโฆษณา

### 32. OEM Process / Introduction

ตำแหน่ง: `src/content/site.ts:73`

**Original**

TH: Thonburi Master ดูแลงานผลิตเสื้อผ้า OEM ผ่าน TM Apparel ตั้งแต่รับรายละเอียด ประเมินงาน ทำตัวอย่าง ผลิตจริง ตรวจคุณภาพ จนถึงส่งมอบ เพื่อให้แต่ละโปรเจกต์มีความชัดเจนตั้งแต่เริ่มต้น

EN: Thonburi Master manages OEM garment production through TM Apparel, from receiving details and assessing the project to sample making, bulk production, QC, and delivery, ensuring clarity for each project from the start.

**Recommended Version**

TH: วางแผนผลิตเสื้อผ้า OEM ร่วมกับ Thonburi Master ผ่าน TM Apparel ใน 6 ขั้นตอนหลัก ตั้งแต่ทบทวนบรีฟ เสนอราคา Sampling, Bulk Production, QC จนถึงส่งมอบ

EN: Plan your OEM garment project with Thonburi Master through TM Apparel. The six main steps cover brief review, quotation, sampling, bulk production, QC and delivery.

**Reasoning**

อธิบายภาพรวมที่ลูกค้าใช้วางแผนได้ โดยคงกระบวนการเดิม 6 ขั้นตอน

### 33. OEM Process / Hero

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:78`

**Original**

TH: วางแผนร่วมกันตั้งแต่รับรายละเอียดจนถึงส่งมอบ

EN: Synchronised from requirement to delivery

**Recommended Version**

TH: วางแผนแต่ละขั้นตอน ตั้งแต่บรีฟจนถึงส่งมอบ

EN: Plan each step from brief to delivery

**Reasoning**

ใช้ภาษาทำงานร่วมกันแทนศัพท์ที่ดูเป็นระบบมากเกินไป

### 34. OEM Process / Hero

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:46`, `src/app/[locale]/page.tsx:48`

**Original**

TH: เปลี่ยนไอเดียของคุณ

EN: Turn your ideas

**Recommended Version**

TH: พัฒนาไอเดียเสื้อผ้าของคุณ

EN: Develop your garment idea

**Reasoning**

ระบุสิ่งที่ลูกค้ากำลังทำแทนคำโฆษณากว้าง ๆ

### 35. OEM Process / Hero

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:47`

**Original**

TH: สู่สินค้าพร้อมขายอย่างเป็นระบบ

EN: Into retail-ready products through a clear process

**Recommended Version**

TH: ผ่าน 6 ขั้นตอนหลักในการผลิต

EN: Through six main production steps

**Reasoning**

เชื่อมกับกระบวนการบนหน้า โดยไม่รับประกันสถานะพร้อมขาย

### 36. OEM Process / Hero

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:82`

**Original**

TH: จากไอเดียสู่สินค้าพร้อมขาย

EN: From ideas to retail-ready products

**Recommended Version**

TH: จากไอเดียเสื้อผ้าจนถึงส่งมอบ

EN: From garment idea to delivery

**Reasoning**

ใช้ผลลัพธ์ที่อยู่ในขอบเขตบริการจริง

### 37. OEM Process / Brief

ตำแหน่ง: `src/content/site.ts:140`

**Original**

TH: ส่งแบบหรือภาพอ้างอิง จำนวน ไซซ์ สี และวันส่งมอบ หากมีตัวอย่างจริง ส่งให้ทีมตรวจสอบได้

EN: Send your design or reference images, quantity, sizes, colours and delivery date. If you have a physical sample, send it for the team to review.

**Recommended Version**

TH: ส่ง Design หรือภาพอ้างอิง พร้อมจำนวน ไซซ์ สี และวันที่ต้องการส่งมอบ หากมีตัวอย่างจริง ส่งให้ทีมงานพิจารณาได้

EN: Share your design or reference images, quantity, sizes, colours and required delivery date. If you have a physical sample, send it for review.

**Reasoning**

บอกสิ่งที่ลูกค้าต้องเตรียมอย่างกระชับ

### 38. OEM Process / Sampling

ตำแหน่ง: `src/content/site.ts:152`

**Original**

TH: เลือกผ้า สี และอุปกรณ์ ขึ้นตัวอย่างให้ตรวจขนาด ทรง และรายละเอียด แล้วอนุมัติก่อนผลิตจริง

EN: Select fabric, colours and trims. Review sample measurements, fit and details, then approve the sample before bulk production.

**Recommended Version**

TH: เลือกผ้า สี และวัสดุตกแต่งร่วมกับทีมงาน ตรวจขนาด Fit และรายละเอียดของตัวอย่าง แล้วอนุมัติก่อนเริ่ม Bulk Production

EN: Agree the fabric, colours and trims with the team. Review the sample’s measurements, fit and details before approving it for bulk production.

**Reasoning**

ชี้จุดมีส่วนร่วมและการอนุมัติของลูกค้า โดยรักษาลำดับขั้นตอน

### 39. OEM Process / FAQ

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:24`

**Original**

TH: ค่าทำตัวอย่างตามข้อมูลที่ได้รับคือ 1,000–2,000 บาท สามารถนำไปเป็นส่วนลดเมื่อสั่งผลิตได้ กรุณายืนยันจำนวนเงินและเงื่อนไขกับทีมงาน

EN: The supplied sample fee is THB 1,000–2,000. It can be credited as a discount when you place a production order; confirm the amount and terms with the team.

**Recommended Version**

TH: ค่าทำตัวอย่างอยู่ที่ 1,000–2,000 บาท และนำไปเป็นส่วนลดเมื่อสั่งผลิตได้ กรุณายืนยันค่าใช้จ่ายและเงื่อนไขกับทีมงาน

EN: The sample fee is THB 1,000–2,000 and can be credited towards a production order. Confirm the fee and credit terms with our team.

**Reasoning**

ตัดคำว่าตามข้อมูลที่ได้รับซึ่งเป็นภาษารายงานภายใน คงราคาและเงื่อนไขยืนยัน

### 40. OEM Process / FAQ

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:25`

**Original**

TH: เผื่อเวลาทำตัวอย่างประมาณ 7–14 วันต่อรอบ และผลิตจริง 30–45 วัน ขึ้นอยู่กับการสั่งผ้าและจำนวน QC และการแพ็ก/ส่งมอบใช้เวลาขั้นละประมาณ 2–5 วัน ระยะเวลาเหล่านี้ไม่ใช่การรับประกันกำหนดส่งมอบรวม

EN: Allow approximately 7–14 days per sample round and 30–45 days for bulk production, depending on fabric ordering and quantity. QC and packing/delivery each take about 2–5 days. These estimates are not a combined delivery guarantee.

**Recommended Version**

TH: Sampling ใช้เวลาประมาณ 7–14 วันต่อรอบ ส่วน Bulk Production ประมาณ 30–45 วัน ขึ้นอยู่กับการสั่งผ้าและจำนวน เผื่อเวลาสำหรับ QC และการแพ็ก/ส่งมอบขั้นละประมาณ 2–5 วัน กรุณายืนยันกำหนดการรวมกับทีมงาน ระยะเวลาแต่ละขั้นเป็นประมาณการ ไม่ใช่กำหนดส่งมอบที่รับประกัน

EN: Sampling takes approximately 7–14 days per round. Bulk production takes approximately 30–45 days, depending on fabric ordering and quantity. Allow about 2–5 days each for QC and packing/delivery. Confirm the overall schedule with our team; these stage estimates are not a guaranteed delivery date.

**Reasoning**

แยกระยะเวลาแต่ละขั้นให้ scan ได้ พร้อมบอกวิธียืนยัน Lead Time โดยไม่เพิ่มคำรับประกัน

### 41. OEM Process / FAQ

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:139`

**Original**

TH: // ตอบข้อสงสัย

EN: // Inquiry resolution

**Recommended Version**

TH: // ตอบข้อสงสัยของคุณ

EN: // Your questions

**Reasoning**

ลดศัพท์องค์กรและสื่อจากมุมมองผู้เข้าชม

### 42. OEM Process / CTA

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:169`

**Original**

TH: พร้อมที่จะเริ่มงานของพวกเรา ไปด้วยกันหรือยัง

EN: Ready to start working together?

**Recommended Version**

TH: พร้อมพูดคุยเรื่องโปรเจกต์ของคุณไหม

EN: Ready to discuss your project?

**Reasoning**

ให้ CTA เป็นมิตรและเริ่มจากการหารือ ไม่กดดันให้ตกลงผลิต

### 43. OEM Process / QC

ตำแหน่ง: `src/app/[locale]/oem-journey/page.tsx:121`

**Original**

TH: // มั่นใจในกระบวนการ

EN: // Be trusted

**Recommended Version**

TH: // การตรวจคุณภาพ

EN: // Quality checks

**Reasoning**

ระบุหน้าที่ของส่วนเนื้อหาแทนคำชวนให้เชื่อใจ

### 44. Shared / Materials

ตำแหน่ง: `src/content/site.ts:441`

**Original**

TH: ผ้าน้ำหนักเบาสำหรับเสื้อกีฬาและเสื้อทีม สอบถามการระบายอากาศ การแห้ง และ Recycled polyester

EN: Lightweight options for sports and teamwear. Discuss breathability, drying performance and recycled polyester.

**Recommended Version**

TH: ผ้าน้ำหนักเบาสำหรับเสื้อกีฬาและเสื้อทีม พูดคุยกับทีมงานเรื่องการระบายอากาศ การแห้ง และ Recycled polyester

EN: Lightweight fabric options for sportswear and teamwear. Discuss breathability, drying performance and recycled polyester with our team.

**Reasoning**

ปรับภาษาไทยที่แปลคำว่าการแห้งไม่ลื่นไหล โดยคงคุณสมบัติที่ต้องหารือ

### 45. Shared / Materials

ตำแหน่ง: `src/content/site.ts:451`

**Original**

TH: ผ้ามีพื้นผิวสำหรับกางเกง Cargo และเดินป่า คุณสมบัติสะท้อนน้ำขึ้นอยู่กับ spec และการตกแต่งผิว

EN: Textured fabric for cargo and outdoor trousers. Water repellency depends on specification and finish.

**Recommended Version**

TH: ผ้ามีพื้นผิวสำหรับกางเกง Cargo และกางเกงเดินป่า คุณสมบัติสะท้อนน้ำขึ้นอยู่กับ Specification ของผ้าและการตกแต่งผิว

EN: Textured fabric for cargo and outdoor trousers. Water repellency depends on the fabric specification and finish.

**Reasoning**

ทำให้ชัดว่าคุณสมบัติสะท้อนน้ำต้องตรวจตามผ้าที่ใช้จริง

### 46. Shared / Materials

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:98`

**Original**

TH: ผ้า Organic หรือ Recycled ขึ้นอยู่กับ spec, MOQ และการจัดหา สามารถขอเอกสารผ้า GOTS, GRS หรือ RCS ได้

EN: Organic or recycled fabrics depend on specification, minimum quantity and sourcing; GOTS, GRS or RCS fabric documentation can be requested.

**Recommended Version**

TH: ทางเลือกผ้า Organic หรือ Recycled ขึ้นอยู่กับ Specification, MOQ และการจัดหา สอบถามเอกสารผ้า GOTS, GRS หรือ RCS ที่เกี่ยวข้องได้กับทีมงาน

EN: Organic or recycled fabric options depend on specification, MOQ and sourcing. Ask our team for relevant GOTS, GRS or RCS fabric documentation.

**Reasoning**

รักษาชื่อมาตรฐานและข้อจำกัด โดยไม่ทำให้เข้าใจว่าโรงงานได้รับ Certification เหล่านี้

### 47. Shared / Services

ตำแหน่ง: `src/content/site.ts:295`

**Original**

TH: ตกแต่งสำเร็จภายในโรงงาน

EN: In-house finishing

**Recommended Version**

TH: งาน Finishing ภายในโรงงาน

EN: In-house finishing

**Reasoning**

รักษาศัพท์กระบวนการที่แม่นยำแทนคำแปลตกแต่งสำเร็จที่ไม่เป็นธรรมชาติ

### 48. Shared / Services

ตำแหน่ง: `src/content/site.ts:376`

**Original**

TH: อุปกรณ์ปิดเสื้อผ้า

EN: Fastenings

**Recommended Version**

TH: อุปกรณ์ยึดและปิดเสื้อผ้า

EN: Fastenings

**Reasoning**

แก้คำไทยให้สื่อถึงกระดุมและตัวปิดเสื้อผ้าได้ชัดขึ้น

### 49. Garment Style References / Introduction

ตำแหน่ง: `src/app/[locale]/oem-products/page.tsx:32`

**Original**

TH: สำรวจกลุ่มเสื้อผ้าและประเภทสินค้าสำหรับคอลเลกชันถัดไป ภาพประกอบและภาพถ่ายอ้างอิงใช้เป็นจุดเริ่มต้นในการพูดคุยเรื่องแบบของคุณ

EN: Explore garment groups and product types for your next collection. Style illustrations and photo references are starting points for discussing your own design.

**Recommended Version**

TH: เลือกดูกลุ่มเสื้อผ้าและรูปแบบสำหรับคอลเลกชันถัดไป ใช้ภาพประกอบและภาพถ่ายอ้างอิงเป็นจุดเริ่มต้นพูดคุยเรื่อง Design ของคุณกับทีมงาน

EN: Browse garment groups and styles for your next collection. Use the illustrations and photo references to discuss your own design with our team.

**Reasoning**

บอกว่าลูกค้าใช้ภาพอ้างอิงอย่างไร โดยไม่อ้างว่าเป็นผลงานลูกค้าจริง

### 50. Garment Style References / Details

ตำแหน่ง: `src/components/project-catalogue.tsx:166`

**Original**

TH: ผ้า การตกแต่ง ไซซ์ และรายละเอียดการผลิตจะตกลงร่วมกันสำหรับโปรเจกต์ของคุณ

EN: Fabric, decoration, sizing and production details are agreed for your project.

**Recommended Version**

TH: ตกลงผ้า การตกแต่ง ไซซ์ และรายละเอียดการผลิตกับทีมงานสำหรับโปรเจกต์ของคุณ

EN: Agree the fabric, decoration, sizes and production details with our team for your project.

**Reasoning**

เปลี่ยนประโยค passive เป็นขั้นตอนที่ลูกค้าร่วมทำได้

### 51. Garment Style References / Empty state

ตำแหน่ง: `src/components/project-catalogue.tsx:184`

**Original**

TH: ยังไม่มีแบบอ้างอิงที่ตรงกับตัวกรองนี้

EN: No matching references published yet.

**Recommended Version**

TH: ยังไม่มีแบบอ้างอิงที่ตรงกับตัวกรองนี้

EN: No references match these filters yet.

**Reasoning**

บอกสถานะผลลัพธ์โดยไม่ทำให้เข้าใจว่าโรงงานไม่รับผลิตประเภทนี้

### 52. Garment Style References / CTA

ตำแหน่ง: `src/app/[locale]/contact/page.tsx:28`, `src/components/project-catalogue.tsx:196`

**Original**

TH: พูดคุยเรื่องเสื้อผ้าของคุณ

EN: Discuss your garment

**Recommended Version**

TH: พูดคุยเรื่องแบบเสื้อผ้าของคุณ

EN: Discuss your design

**Reasoning**

ทำให้สิ่งที่ต้องการให้ลูกค้าติดต่อมาชัดเจน

### 53. Technical Insights / Introduction

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:33`

**Original**

TH: เริ่มจากสินค้าที่ต้องการทำ พิจารณาสัมผัสผ้า รูปทรง การเคลื่อนไหว และการตกแต่ง แล้วตกลงวัสดุ ไซซ์ และรายละเอียดผ่านตัวอย่างก่อนผลิตจริง

EN: Start with the product you want to make. Review fabric feel, shape, movement and finishing options, then agree the materials, sizes and details through a sample before bulk production.

**Recommended Version**

TH: เลือก Material ให้เหมาะกับการใช้งานเสื้อผ้า พิจารณาสัมผัสผ้า ทรง การเคลื่อนไหว และงาน Finishing แล้วใช้ Sampling เพื่อยืนยัน Material ไซซ์ และรายละเอียดก่อน Bulk Production

EN: Choose materials around the garment’s intended use. Review fabric feel, shape, movement and finishing options, then confirm materials, sizes and details through sampling before bulk production.

**Reasoning**

เริ่มจากการตัดสินใจของลูกค้า และเชื่อมข้อมูลเทคนิคกับการอนุมัติตัวอย่าง

### 54. Technical Insights / Summary

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:88`

**Original**

TH: สรุปแนวทาง / 3 ประเด็นหลัก

EN: Engineering summary / Three core takeaways

**Recommended Version**

TH: การเลือกผ้า / 3 ประเด็นสำคัญ

EN: Fabric selection / Three key points

**Reasoning**

ลดศัพท์ที่ทำให้เนื้อหาพื้นฐานดูซับซ้อนเกินจริง

### 55. Technical Insights / Tools

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:130`

**Original**

TH: เครื่องมือเตรียมงานและคำนวณ spec

EN: Practical tools & specification calculators

**Recommended Version**

TH: เครื่องมือเตรียมบรีฟการผลิต

EN: Tools for your production brief

**Reasoning**

หัวข้อเดิมเป็นพหูพจน์ทั้งที่มี calculator เพียงตัวเดียว ใช้ขอบเขตเครื่องมือที่มีจริง

### 56. Technical Insights / Tools

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:143`

**Original**

TH: ตารางไซซ์และ spec sheet

EN: Sizing matrix spec sheet

**Recommended Version**

TH: Spec sheet สำหรับไซซ์และขนาด

EN: Size & measurement spec sheet

**Reasoning**

ใช้คำที่อธิบายสิ่งที่ลูกค้าจะได้รับได้ทันที

### 57. Technical Insights / Tools

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:179`

**Original**

TH: รายการตรวจเอกสารเทคนิค

EN: Technical dossier checklist

**Recommended Version**

TH: Checklist เตรียมบรีฟการผลิต

EN: Production brief checklist

**Reasoning**

ลดศัพท์ dossier ที่ไม่จำเป็นสำหรับผู้เริ่มต้น

### 58. Technical Insights / Tools

ตำแหน่ง: `src/app/[locale]/technical-insights/page.tsx:192`

**Original**

TH: ขอชุดเอกสาร (PDF)

EN: Request dossier (PDF)

**Recommended Version**

TH: ขอ Checklist (PDF)

EN: Request checklist (PDF)

**Reasoning**

ให้ชื่อ CTA สอดคล้องกับเนื้อหาและคงรูปแบบไฟล์เดิม

### 59. Technical Insights / Tools

ตำแหน่ง: `src/components/insight-library.tsx:150`

**Original**

TH: เปิดเครื่องคำนวณ

EN: Open calculator suite

**Recommended Version**

TH: เปิดเครื่องคำนวณการหดตัวของผ้า

EN: Open shrinkage calculator

**Reasoning**

ระบุเครื่องมือที่เปิดจริง แทนการอ้างว่ามีชุดเครื่องมือหลายรายการ

### 60. Technical Insights / Library

ตำแหน่ง: `src/components/insight-library.tsx:106`

**Original**

TH: แสดงแนวทางวางแผน {count} รายการ

EN: Showing {count} planning excerpts

**Recommended Version**

TH: แสดงแนวทาง {count} รายการ

EN: Showing {count} guides

**Reasoning**

ให้คำเรียกและจำนวนตรงกับรายการเนื้อหาจริง โดยรักษาตัวแปรระบบ

### 61. Technical Insights / Library

ตำแหน่ง: `src/components/insight-library.tsx:72`

**Original**

TH: หัวข้อบทความ

EN: Bulletin topics

**Recommended Version**

TH: หัวข้อแนวทางการผลิต

EN: Guide topics

**Reasoning**

ใช้ชื่อที่ตรงกับเนื้อหาและเป็นมิตรต่อผู้อ่าน

### 62. Technical Insights / Library

ตำแหน่ง: `src/components/insight-library.tsx:75`

**Original**

TH: แนวทางวางแผนทั้งหมด (9)

EN: All planning excerpts (9)

**Recommended Version**

TH: แนวทางทั้งหมด (1)

EN: All guides (1)

**Reasoning**

มีเนื้อหาเพียงเรื่องเดียวที่ถูกแสดงซ้ำ 9 ครั้ง จึงแสดงรายการจริงเพียงครั้งเดียว

### 63. Technical Insights / Library

ตำแหน่ง: `src/components/insight-library.tsx:91`

**Original**

TH: ค้นหาบทความเทคนิค

EN: Search technical bulletins

**Recommended Version**

TH: ค้นหาแนวทางการผลิต

EN: Search production guides

**Reasoning**

ลดศัพท์แบบจดหมายข่าวและให้คำเรียกเนื้อหาสม่ำเสมอ

### 64. Technical Insights / Library

ตำแหน่ง: `src/components/insight-library.tsx:104`

**Original**

TH: รวมแนวทางเทคนิค

EN: Curated technical compendium

**Recommended Version**

TH: แนวทางวางแผนการผลิต

EN: Production planning guides

**Reasoning**

ตัดศัพท์โอ่อ่าที่ไม่ได้ช่วยให้ลูกค้าเข้าใจเนื้อหา

### 65. Technical Insights / Library

ตำแหน่ง: `src/components/insight-library.tsx:115`

**Original**

TH: ไม่พบแนวทางที่ตรงกับตัวกรองนี้

EN: No planning excerpts match this filter.

**Recommended Version**

TH: ไม่พบแนวทางที่ตรงกับตัวกรองนี้

EN: No guides match these filters.

**Reasoning**

ทำให้ข้อความผลการค้นหาสั้นและสม่ำเสมอ

### 66. Start Your Project / Introduction

ตำแหน่ง: `src/app/[locale]/start-your-project/page.tsx:35`

**Original**

TH: บอกเราว่าคุณต้องการผลิตอะไร จำนวนเท่าไร และต้องการเมื่อไร ทีมงานจะตรวจบรีฟและติดต่อกลับเพื่อพูดคุยขั้นตอนถัดไป

EN: Tell us what you want to make, how many pieces you need, and when you need them. Our team will review your brief and contact you to discuss the next step.

**Recommended Version**

TH: บอกเราว่าต้องการผลิตอะไร จำนวนเท่าไร และต้องการส่งมอบเมื่อไร ทีมงานจะทบทวนบรีฟและติดต่อกลับเพื่อหารือขั้นตอนถัดไป

EN: Tell us what you want to make, the quantity and your required delivery date. Our team will review your brief and contact you to discuss the next step.

**Reasoning**

ชี้แจงวันที่ต้องการให้หมายถึงส่งมอบ และบอกสิ่งที่จะเกิดหลังส่งข้อมูล

### 67. Start Your Project / Form

ตำแหน่ง: `src/app/[locale]/contact/page.tsx:207`

**Original**

TH: แบบฟอร์มประเมิน spec

EN: Spec evaluation terminal

**Recommended Version**

TH: แบบฟอร์มบรีฟโปรเจกต์

EN: Project brief form

**Reasoning**

ใช้ชื่อหน้าที่จริงของแบบฟอร์มแทนภาษาระบบ

### 68. Start Your Project / Form

ตำแหน่ง: `src/app/[locale]/contact/page.tsx:212`

**Original**

TH: แบบฟอร์มรับ CAD / BOM

EN: Structured CAD / BOM intake

**Recommended Version**

TH: ไฟล์ Design และรายละเอียดการผลิต

EN: Design files & production details

**Reasoning**

ไม่ทำให้ลูกค้าใหม่เข้าใจว่าต้องมี CAD หรือ BOM จึงเริ่มติดต่อได้

### 69. Start Your Project / Form

ตำแหน่ง: `src/app/[locale]/page.tsx:156`, `src/components/enquiry-form.tsx:344`

**Original**

TH: ข้อมูลที่จำเป็น

EN: Required credentials

**Recommended Version**

TH: ข้อมูลติดต่อ

EN: Contact details

**Reasoning**

ข้อมูลนี้ไม่ใช่ credentials สำหรับเข้าระบบ

### 70. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:348`

**Original**

TH: ช่องทางติดต่อที่สะดวก

EN: Preferred communication protocol

**Recommended Version**

TH: ช่องทางติดต่อที่สะดวก

EN: Preferred contact channel

**Reasoning**

ใช้ชื่อที่บอกสิ่งให้เลือกตรง ๆ

### 71. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:366`, `src/components/header.tsx:139`, `src/components/product-directory.tsx:58`

**Original**

TH: ประเภทสินค้า

EN: Categorisation

**Recommended Version**

TH: สินค้าที่ต้องการผลิต

EN: Your garment

**Reasoning**

เน้นข้อมูลของลูกค้าแทนกระบวนการจัดหมวดหมู่ภายใน

### 72. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:370`

**Original**

TH: ประเภทเสื้อผ้าหลัก

EN: Primary apparel category

**Recommended Version**

TH: ประเภทเสื้อผ้า

EN: Garment category

**Reasoning**

กระชับโดยคงความหมายของประเภทสินค้าที่เลือก

### 73. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:400`

**Original**

TH: ความพร้อมและจุดเริ่มต้นของคุณ *

EN: Technical readiness / current starting point *

**Recommended Version**

TH: จุดเริ่มต้นของคุณ *

EN: Your starting point *

**Reasoning**

ไม่ใช้ระดับความพร้อมทางเทคนิคเป็นเกณฑ์กีดกันลูกค้าใหม่

### 74. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:406`

**Original**

TH: ระดับ 01

EN: Level 01

**Recommended Version**

TH: ทางเลือก 01

EN: Option 01

**Reasoning**

สองรายการเป็นทางเลือก ไม่ใช่ระดับความสามารถของลูกค้า

### 75. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:412`

**Original**

TH: ระดับ 02

EN: Level 02

**Recommended Version**

TH: ทางเลือก 02

EN: Option 02

**Reasoning**

สองรายการเป็นทางเลือก ไม่ใช่ระดับความสามารถของลูกค้า

### 76. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:457`

**Original**

TH: ข้อมูล BOM

EN: BOM parameters

**Recommended Version**

TH: จำนวนและกำหนดส่งมอบ

EN: Quantity & delivery date

**Reasoning**

เนื้อหาส่วนนี้ถามจำนวนและเวลา ไม่ได้ให้กรอก BOM

### 77. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:466`

**Original**

TH: เลือกจำนวนสำหรับทดลองผลิตหรือผลิตจริง

EN: Select pilot or mass run capacity

**Recommended Version**

TH: เลือกจำนวนผลิตโดยประมาณ

EN: Select an estimated quantity

**Reasoning**

หลีกเลี่ยงการสื่อว่ารับ pilot run ทุกขนาดจากเพียงตัวเลือกในแบบฟอร์ม

### 78. Start Your Project / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:484`

**Original**

TH: กำหนดส่งมอบ / ช่วงเวลาส่งถึงท่าเรือ

EN: Target handover / on-port window

**Recommended Version**

TH: กำหนดส่งมอบ / วันที่ต้องการให้ถึงท่าเรือ

EN: Required delivery date / arrival at port

**Reasoning**

คงความหมายเรื่องท่าเรือ แต่เปลี่ยนภาษาที่กำกวมให้เข้าใจง่าย

### 79. Start Your Project / Upload

ตำแหน่ง: `src/components/enquiry-form.tsx:533`

**Original**

TH: เอกสารที่แนบ [{count} ไฟล์]

EN: Attached technical documentation [{count} files]

**Recommended Version**

TH: ไฟล์แนบ [{count} ไฟล์]

EN: Attachments [{count} files]

**Reasoning**

ไฟล์อาจเป็นภาพอ้างอิง ไม่จำเป็นต้องเป็นเอกสารเทคนิค

### 80. Start Your Project / Upload

ตำแหน่ง: `src/components/enquiry-form.tsx:504`

**Original**

TH: ลากไฟล์รายละเอียดสินค้ามาวางที่นี่

EN: Drag & drop specification assets

**Recommended Version**

TH: ลากไฟล์ Design หรือภาพอ้างอิงมาวางที่นี่

EN: Drop your design or reference files here

**Reasoning**

ใช้คำที่ตรงกับสิ่งที่ลูกค้าจะอัปโหลด

### 81. Start Your Project / Upload

ตำแหน่ง: `src/components/enquiry-form.tsx:511`

**Original**

TH: เลือกไฟล์จากอุปกรณ์

EN: Browse machine directory

**Recommended Version**

TH: เลือกไฟล์

EN: Choose files

**Reasoning**

CTA สั้นและตรงหน้าที่ของปุ่ม

### 82. Start Your Project / NDA

ตำแหน่ง: `src/components/enquiry-form.tsx:562`

**Original**

TH: ขอจัดทำ NDA ระหว่างทั้งสองฝ่าย:

EN: Request bilateral mutual NDA:

**Recommended Version**

TH: ขอ NDA ระหว่างทั้งสองฝ่าย:

EN: Request a mutual NDA:

**Reasoning**

ตัดคำซ้ำ bilateral/mutual โดยรักษาความหมายการขอข้อตกลง

### 83. Start Your Project / NDA

ตำแหน่ง: `src/components/enquiry-form.tsx:564`

**Original**

TH: ฉันต้องการ NDA ก่อนส่งรายละเอียดแพตเทิร์นที่เป็นความลับ

EN: I request an NDA before sharing confidential pattern engineering specifications.

**Recommended Version**

TH: ฉันต้องการ NDA ก่อนส่ง Specification ของ Pattern ที่เป็นความลับ

EN: I would like an NDA before sharing confidential pattern specifications.

**Reasoning**

ตัดศัพท์ engineering ที่ไม่จำเป็น โดยไม่เปลี่ยนขอบเขตความลับ

### 84. Start Your Project / Submission

ตำแหน่ง: `src/components/enquiry-form.tsx:572`

**Original**

TH: พร้อมให้ทีมประเมินความเป็นไปได้

EN: Ready for feasibility audit

**Recommended Version**

TH: พร้อมส่งบรีฟให้ทีมงานพิจารณาไหม

EN: Ready to share your brief?

**Reasoning**

ไม่เรียกการประเมินโปรเจกต์ว่า audit ซึ่งอาจทำให้เข้าใจผิด

### 85. Start Your Project / Submission

ตำแหน่ง: `src/components/enquiry-form.tsx:574`

**Original**

TH: ประเมินงานผลิต · รับบรีฟโปรเจกต์

EN: Production engineering review · Project brief intake

**Recommended Version**

TH: บรีฟโปรเจกต์ · ประเมินงานผลิต

EN: Project brief · Production review

**Reasoning**

คงหน้าที่ของขั้นตอนโดยลดภาษาระบบ

### 86. Start Your Project / Submission

ตำแหน่ง: `src/components/enquiry-form.tsx:584`

**Original**

TH: ส่งบรีฟเพื่อประเมินความเป็นไปได้

EN: Submit project brief for feasibility review

**Recommended Version**

TH: ส่งบรีฟโปรเจกต์

EN: Send your project brief

**Reasoning**

ปุ่มกระชับ ส่วนคำอธิบายขั้นตอนประเมินมีอยู่ในหน้าแล้ว

### 87. Start Your Project / Submission

ตำแหน่ง: `src/components/enquiry-form.tsx:588`

**Original**

TH: ทีมพัฒนาแพตเทิร์นเป็นผู้ตรวจสอบ

EN: Human pattern engineers only

**Recommended Version**

TH: ทีมงานจะพิจารณาบรีฟของคุณ

EN: Our team reviews your brief

**Reasoning**

ลดข้ออ้างเรื่องคุณสมบัติและความเป็นเอกสิทธิ์ของผู้ตรวจสอบที่ไม่มีหลักฐานเพิ่ม

### 88. Contact / Hero

ตำแหน่ง: `src/app/[locale]/contact/page.tsx:31`

**Original**

TH: พูดคุยกับทีมงานเรื่องโปรเจกต์เสื้อผ้าและความต้องการในการผลิต

EN: Talk to our team about your garment project & production requirements

**Recommended Version**

TH: พูดคุยกับเราเรื่องโปรเจกต์เสื้อผ้าของคุณ

EN: Talk to us about your garment project

**Reasoning**

Hero สั้นและอ่านได้ทันที โดยรายละเอียดการผลิตอยู่ในย่อหน้ารอง

### 89. Contact / Channels

ตำแหน่ง: `src/app/[locale]/start-your-project/page.tsx:119`

**Original**

TH: ช่องทางติดต่อทีมงานโดยตรง

EN: Direct desk channels

**Recommended Version**

TH: ติดต่อทีมงานโดยตรง

EN: Contact our team directly

**Reasoning**

ลดคำเรียกโต๊ะทำงานที่ไม่ช่วยผู้เข้าชม

### 90. Contact / Channels

ตำแหน่ง: `src/app/[locale]/contact/page.tsx:115`

**Original**

TH: ช่องทางติดต่อโดยตรง

EN: Direct channels roster

**Recommended Version**

TH: ช่องทางติดต่อโดยตรง

EN: Direct contact channels

**Reasoning**

ใช้ชื่อเนื้อหาที่ตรงและอ่านง่าย

### 91. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:209`

**Original**

TH: Email สำหรับติดต่อเรื่องงาน

EN: Official work email

**Recommended Version**

TH: Email สำหรับติดต่อ

EN: Contact email

**Reasoning**

ไม่ทำให้แบรนด์ใหม่เข้าใจว่าต้องมี Email บริษัทจึงติดต่อได้

### 92. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:251`

**Original**

TH: เลือกประเทศที่ดำเนินธุรกิจ

EN: Select country / operational jurisdiction

**Recommended Version**

TH: เลือกประเทศ

EN: Select a country

**Reasoning**

คำว่า jurisdiction ไม่จำเป็นต่อการเลือกประเทศ

### 93. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:594`

**Original**

TH: แบบฟอร์มติดต่อทีมงาน

EN: Desk transmission terminal

**Recommended Version**

TH: ส่งคำสอบถาม

EN: Send an enquiry

**Reasoning**

ระบุสิ่งที่ลูกค้าทำได้ แทนศัพท์เทคโนโลยี

### 94. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:599`

**Original**

TH: สำหรับประเมิน BOM และอัปโหลด CAD กรุณาใช้แบบฟอร์ม

EN: For detailed BOM evaluations and CAD uploads, please use the structured

**Recommended Version**

TH: หากต้องการส่งไฟล์ Design หรือข้อมูล BOM และ CAD ให้ใช้แบบฟอร์ม

EN: To share your design files or detailed BOM and CAD information, use the

**Reasoning**

ชี้ความต่างระหว่างแบบฟอร์มโดยยังรักษาการรองรับข้อมูลเทคนิค

### 95. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:608`

**Original**

TH: สำหรับส่งบรีฟ ใช้แบบฟอร์มนี้เพื่อสอบถามราคา นัดเยี่ยมชมโรงงาน หรือพูดคุยเรื่องความร่วมมือ

EN: brief terminal. Use this desk form for commercial inquiries, factory visit requests, and general partnership dialog.

**Recommended Version**

TH: ส่วนแบบฟอร์มนี้ใช้สอบถามราคา นัดเยี่ยมชมโรงงาน หรือพูดคุยเรื่องความร่วมมือ

EN: Form. Use this form for quotation enquiries, factory visits or partnership discussions.

**Reasoning**

แก้สำนวนที่แข็งและไวยากรณ์ให้ประโยคที่ประกอบกับลิงก์อ่านต่อเนื่อง

### 96. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:631`

**Original**

TH: Buyer audit / เอกสารประกอบ

EN: Buyer audit / certification binder

**Recommended Version**

TH: Buyer audit / เอกสารโรงงาน

EN: Buyer audit / factory documents

**Reasoning**

ไม่ทำให้เอกสารโรงงานทุกประเภทถูกเข้าใจว่าเป็น Certification

### 97. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:640`

**Original**

TH: ข้อความ / รายละเอียด spec

EN: Detailed message / specification notes

**Recommended Version**

TH: ข้อความ / รายละเอียด Specification

EN: Your message / specification details

**Reasoning**

สื่อสิ่งที่ต้องกรอกโดยตรงและรักษาศัพท์เทคนิค

### 98. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:651`

**Original**

TH: ระบุจำนวนผลิตโดยประมาณ ข้อกำหนดทางเทคนิค (เช่น GSM, fibre blend, seam sealing) หรือกำหนดการ audit ที่ต้องการ…

EN: Specify estimated production volumes, technical requirements (e.g., GSM, fibre blend, seam sealing), or desired audit schedule…

**Recommended Version**

TH: ระบุจำนวนผลิตโดยประมาณ ข้อกำหนดทางเทคนิค เช่น GSM หรือส่วนผสมเส้นใย หรือวันที่ต้องการนัด audit…

EN: Tell us your estimated quantity, technical requirements such as GSM or fibre blend, or preferred audit date…

**Reasoning**

ตัดตัวอย่าง seam sealing เพื่อไม่ให้เข้าใจว่ารองรับบริการนี้จาก placeholder เพียงอย่างเดียว

### 99. Contact / Form

ตำแหน่ง: `src/components/enquiry-form.tsx:662`

**Original**

TH: ส่งข้อความถึงทีมงาน

EN: Dispatch desk message

**Recommended Version**

TH: ส่งคำสอบถาม

EN: Send enquiry

**Reasoning**

ให้ CTA ตรงกับการทำงานและใช้คำสม่ำเสมอ

### 100. Shared / Footer

ตำแหน่ง: `src/components/shared-sections.tsx:204`

**Original**

TH: ขอบเขตงานผลิต

EN: Capabilities Matrix

**Recommended Version**

TH: ขอบเขตงานผลิต

EN: Production capabilities

**Reasoning**

ลดศัพท์ matrix ที่ไม่จำเป็นต่อการนำทาง

### 101. Shared / Footer

ตำแหน่ง: `src/components/shared-sections.tsx:215`

**Original**

TH: เครื่องจักรและอุปกรณ์

EN: Machinery Roster

**Recommended Version**

TH: เครื่องจักรและอุปกรณ์

EN: Machinery & equipment

**Reasoning**

ตั้งชื่อลิงก์ตามเนื้อหาปลายทาง

### 102. Shared / Footer

ตำแหน่ง: `src/app/[locale]/about/page.tsx:156`, `src/components/shared-sections.tsx:224`

**Original**

TH: ประวัติบริษัท

EN: Enterprise Heritage

**Recommended Version**

TH: ประวัติบริษัท

EN: Company history

**Reasoning**

ใช้ชื่อประวัติบริษัทตรง ๆ แทนภาษาที่โอ่อ่า

### 103. Shared / Footer

ตำแหน่ง: `src/components/shared-sections.tsx:247`

**Original**

TH: ผลิตเสื้อผ้า OEM สำหรับแบรนด์ ตั้งแต่รับบรีฟและตรวจตัวอย่าง ไปจนถึงตัด เย็บ ตกแต่ง ตรวจคุณภาพ และส่งมอบ พูดคุยเรื่องวัสดุ รายละเอียดสินค้า และความต้องการของคุณกับทีม TM Apparel

EN: Garment OEM production for brands, from brief and sample review to cutting, sewing, decoration, quality checks and delivery. Discuss your materials, product details and order requirements with the TM Apparel team.

**Recommended Version**

TH: ผลิตเสื้อผ้า OEM สำหรับแบรนด์ ตั้งแต่บรีฟและ Sampling ไปจนถึงตัด เย็บ ตกแต่ง QC และส่งมอบ พูดคุยกับ TM Apparel เรื่อง Material รายละเอียดสินค้า และความต้องการในการสั่งผลิต

EN: OEM garment manufacturing for brands, from brief and sampling to cutting, sewing, decoration, QC and delivery. Talk to TM Apparel about your materials, garment details and order requirements.

**Reasoning**

ลดความยาวของ Footer และใช้คำกระบวนการให้สอดคล้องกับหน้าหลัก

### 104. Shared / Metadata

ตำแหน่ง: `src/app/[locale]/layout.tsx:32`

**Original**

TH: Thonburi Master ให้บริการผลิตเสื้อผ้า OEM ผ่าน TM Apparel สำรวจวัสดุ กระบวนการผลิต และสอบถามโปรเจกต์ของคุณ

EN: Thonburi Master garment manufacturing, with OEM apparel services through TM Apparel. Explore materials, production and project enquiries.

**Recommended Version**

TH: Thonburi Master ให้บริการผลิตเสื้อผ้า OEM ผ่าน TM Apparel สำหรับแบรนด์ไทยและต่างประเทศ ดูข้อมูล Material, Sampling ขั้นตอนการผลิต และวิธีเริ่มโปรเจกต์

EN: OEM garment manufacturing for Thai and international brands through TM Apparel, part of Thonburi Master. Explore materials, sampling, production and ways to start your project.

**Reasoning**

บอกบริการ กลุ่มลูกค้า และเนื้อหาที่จะพบในเว็บไซต์อย่างกระชับ

## รายการที่คงเดิม

ดู [RETAINED_COPY.md](copy-review/RETAINED_COPY.md) สำหรับ Original / Recommended Version / Reasoning ของ 763 รายการที่คงเดิม และ [COPY_REVIEW.json](COPY_REVIEW.json) สำหรับข้อมูลทั้งหมดที่ค้นหาหรือกรองได้
