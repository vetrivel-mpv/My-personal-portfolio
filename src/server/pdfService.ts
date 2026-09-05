import PDFDocument from "pdfkit";
import { Response } from "express";

export interface ResumeData {
  candidateName?: string;
  targetRole?: string;
  phone?: string;
  email?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  relocationTarget?: string;
  summary?: string;
  customMarkdown?: string;
}

export function generateResumePDF(res: Response, customData?: ResumeData) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 36, // 0.5 inch / 12.7mm margin
    bufferPages: true,
    info: {
      Title: "Vetrivel Muthusamy - Principal Telecom QA Lead & Solutions Consultant",
      Author: "Vetrivel Muthusamy",
      Subject: "Google & ATS Compliant Executive Resume",
      Keywords: "Telecom, QA Lead, Singleview, Nokia WING, Agile Delivery, UAT, AT&T IoT, TM Forum, Singapore, UK, USA"
    }
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="Vetrivel_Muthusamy_Resume.pdf"');

  doc.pipe(res);

  const candidateName = customData?.candidateName || "VETRIVEL MUTHUSAMY";
  const targetRole = customData?.targetRole || "Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager (10+ Yrs Exp)";
  const location = customData?.location || "Bengaluru, Karnataka, India";
  const phone = customData?.phone || "(+91) 9916008877";
  const email = customData?.email || "vetrivelm02@gmail.com";
  const linkedin = customData?.linkedin || "linkedin.com/in/vetrivelm";
  const github = customData?.github || "github.com/vetrivel-mpv";
  const relocation = customData?.relocationTarget || "Targeting Singapore 🇸🇬 · United Kingdom 🇬🇧 · United States 🇺🇸 (100% Relocation Ready)";

  const navy = "#0f172a";
  const blue = "#0284c7";
  const darkBlue = "#0369a1";
  const textDark = "#1e293b";
  const textMuted = "#475569";
  const bgBox = "#f8fafc";
  const borderBox = "#cbd5e1";

  // Helper for drawing clean section headers with horizontal rule
  const drawSectionHeader = (title: string, topMargin: number = 8) => {
    doc.moveDown(topMargin / 10);
    doc.fillColor(darkBlue).font("Helvetica-Bold").fontSize(9.5).text(title.toUpperCase(), { characterSpacing: 0.5 });
    const y = doc.y + 1;
    doc.strokeColor(blue).lineWidth(1.2).moveTo(36, y).lineTo(559, y).stroke();
    doc.moveDown(0.3);
  };

  // ==========================================
  // PAGE 1: HEADER, SUMMARY, SKILLS, SENIOR ROLES
  // ==========================================

  // Candidate Name
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(20).text(candidateName, { align: "left" });
  
  // Target Role
  doc.fillColor(blue).font("Helvetica-Bold").fontSize(10).text(targetRole, { align: "left" });
  doc.moveDown(0.15);

  // Relocation Pill / Text
  doc.fillColor("#047857").font("Helvetica-Bold").fontSize(8).text(`• Mobility: ${relocation}`);
  doc.moveDown(0.15);

  // Contact Coordinates Line
  const contactText = `${location}  |  ${phone}  |  ${email}  |  ${linkedin}  |  ${github}`;
  doc.fillColor(textMuted).font("Helvetica").fontSize(8).text(contactText);
  
  // Header underline
  doc.moveDown(0.3);
  doc.strokeColor(navy).lineWidth(1.5).moveTo(36, doc.y).lineTo(559, doc.y).stroke();
  doc.moveDown(0.2);

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader("Professional Summary", 4);
  const summaryText = customData?.summary || 
    "Senior Telecom QA Lead & Solutions Delivery Consultant with over 10 years of specialized enterprise domain experience in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). Managed cross-functional QA teams of 15+ engineers under Agile/Scrum, cutting manual testing efforts by 50% and reducing post-release issues by 30% with zero defect leakage across Tier-1 carriers (British Telecom, Verizon, Inmarsat, AT&T, Nokia 3Group). Holds a Postgraduate Diploma in Software Development, uniquely bridging technical software engineering, API contracts, and business stakeholder delivery. Actively targeting overseas roles in Singapore, UK, and USA.";
  
  doc.fillColor(textDark).font("Helvetica").fontSize(8.2).text(summaryText, {
    align: "justify",
    lineGap: 1.5
  });

  // 2. CORE COMPETENCIES & TECHNICAL EXPERTISE
  drawSectionHeader("Core Competencies & Technical Arsenal", 6);
  
  const colWidth = 255;
  const startX1 = 36;
  const startX2 = 304;
  let skillsY = doc.y;

  // Box 1
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Agile QA Leadership & Governance", startX1, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Managed 15+ QA Engineers, Sprint Ceremonies, Risk-Based Strategy, Carrier UAT Sign-Offs, Defect Triage (JIRA/Zephyr).", startX1, doc.y, { width: colWidth, lineGap: 1 });

  // Box 2
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Telecom BSS & Nokia WING (10M+ Subs)", startX2, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("CSG Singleview Billing, Nokia WING Migration UAT, Diameter Gy/Ro Charging, MRR, MRC/NRC Charges, Invoicing PDF Generation.", startX2, doc.y, { width: colWidth, lineGap: 1 });

  skillsY = Math.max(doc.y, skillsY + 28) + 4;

  // Box 3
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Enterprise IoT & Network Verification", startX1, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("AT&T Connection Manager (Device Telemetry & Quota Throttling), Real SIM 4G LTE/5G NSA (Voice, SMS, Data from India testbeds).", startX1, doc.y, { width: colWidth, lineGap: 1 });

  // Box 4
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Technical Literacy & Software Foundation", startX2, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("PG Diploma Software Dev (Full Stack), REST API Contract Testing (Postman/Swagger), TM Forum Open APIs (TMF620/622), SQL Auditing.", startX2, doc.y, { width: colWidth, lineGap: 1 });

  doc.x = 36;
  doc.y = skillsY + 30;

  // 3. PROFESSIONAL EXPERIENCE (PART 1: SENIOR ROLES)
  drawSectionHeader("Professional Experience (Senior Leadership)", 6);

  // Job 1: Capgemini Engineering
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Capgemini Engineering — Senior Professional / Test Architect & Agile QA Lead", 36, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Jan 2022 — Aug 2025 | 3 yrs 8 mos)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Enterprise IoT & Global Carrier Solutions | Bengaluru, Karnataka, India", 36, doc.y);
  doc.moveDown(0.2);

  const capgeminiBullets = [
    "Managed a cross-functional QA team of 15+ test engineers under Agile/Scrum, directing sprint ceremonies, test strategy, and carrier acceptance milestones.",
    "Cut manual testing efforts by 50% and reduced post-release production defect escapes by 30% through modular test architecture.",
    "Led QA and validation for AT&T Connection Manager: Enterprise IoT device telemetry, real-time data quota policy throttling, and billing mediation.",
    "Delivered robust architecture governance for global carrier accounts including Verizon Wireless and AT&T Enterprise with zero P1/P2 defect escapes.",
    "Honored with Customer Delight Award (Q3 2022) and Outstanding Contribution in Delivery Award (Q2 2022)."
  ];

  capgeminiBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 44, doc.y, { width: 510, lineGap: 1.2 });
  });

  doc.moveDown(0.4);

  // Job 2: Prodapt Solutions
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)", 36, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Jan 2021 — Jan 2022 | 1 yr 1 mo)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Nokia WING Digital Hub & Singleview BSS | Chennai, Tamil Nadu, India", 36, doc.y);
  doc.moveDown(0.2);

  const prodaptBullets = [
    "Spearheaded UAT and carrier migration activities for 10 Million+ subscribers on Nokia WING (Worldwide IoT Network Grid) Digital Hub.",
    "Governed Diameter Gy and Ro online charging, real-time balance reservations, and quota policy enforcement.",
    "Supported Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data) from India test centers.",
    "Managed Monthly Rating Report (MRR) runs, rate plan configs (Individual, Flex, Fixed), MRC & NRC charges, automated SFTP pipelines, and invoice PDF generation."
  ];

  prodaptBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 44, doc.y, { width: 510, lineGap: 1.2 });
  });

  // ==========================================
  // PAGE 2: CONTINUED EXPERIENCE, AWARDS, EDUCATION, CERTS, LANGUAGES
  // ==========================================
  doc.addPage({ margin: 36, size: "A4" });

  // Header banner on Page 2
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text("VETRIVEL MUTHUSAMY", 36, 36, { continued: true });
  doc.fillColor(textMuted).font("Helvetica").fontSize(8).text("  —  Curriculum Vitae (Page 2 of 2)", { align: "right" });
  doc.strokeColor(navy).lineWidth(0.8).moveTo(36, doc.y + 2).lineTo(559, doc.y + 2).stroke();
  doc.moveDown(0.4);

  // 3. CONTINUED PROFESSIONAL EXPERIENCE
  drawSectionHeader("Professional Experience (Career Progression)", 2);

  // Job 3: Cognizant
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Cognizant — Associate Project Engineer", 36, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Feb 2019 — Jan 2021 | 2 yrs)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Inmarsat BTP & European Carrier Transformations | Chennai, India", 36, doc.y);
  doc.moveDown(0.2);

  const cognizantBullets = [
    "Awarded Star Performer for consistently high-quality contributions to the Inmarsat BTP Project.",
    "Orchestrated system integration testing (SIT) and rating validation for Nokia Hutchison 3Group European networks (3Austria, 3Ireland, 3Italy) and core Singleview postpaid charging pipelines."
  ];
  cognizantBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 44, doc.y, { width: 510, lineGap: 1.2 });
  });

  doc.moveDown(0.4);

  // Job 4: Tech Mahindra
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Tech Mahindra — Software Test Analyst", 36, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Oct 2017 — Feb 2019 | 1 yr 5 mos)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("British Telecom (BT) Retail Transformation | Bangalore, India", 36, doc.y);
  doc.moveDown(0.2);

  const tmBullets = [
    "Awarded CIT Domain Excellence Award for bringing deep telecom domain knowledge to CIT and executing high-impact test automation strategies.",
    "Led British Telecom (BT) Retail Unit customer ordering (TM Forum ODA TMF622) and employee discount e-commerce validations."
  ];
  tmBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 44, doc.y, { width: 510, lineGap: 1.2 });
  });

  doc.moveDown(0.4);

  // Job 5: Accenture & GapBridge
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Accenture & GapBridge — Early Formative QA Engineering", 36, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Nov 2014 — Sep 2017 | 3 yrs)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Enterprise Telecom Test Systems | Chennai, India", 36, doc.y);
  doc.moveDown(0.2);

  const gapbridgeBullets = [
    "Gathered and translated business requirements into meticulous test plans and test designs for carrier acceptance.",
    "Executed end-to-end test cases for User Acceptance Testing (UAT), aligning client objectives and verifying service pricing and billing structures."
  ];
  gapbridgeBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 44, doc.y, { width: 510, lineGap: 1.2 });
  });

  // 4. HONORS & CORPORATE AWARDS
  drawSectionHeader("Honors & Corporate Awards", 6);
  let awardsY = doc.y;

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("Customer Delight Award", startX1, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Capgemini Engineering — Recognizing customer-first excellence (Q3 2022).", startX1, doc.y, { width: colWidth });

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("Outstanding Delivery in ER&D", startX2, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Capgemini Engineering ER&D Sector (Q2 2022).", startX2, doc.y, { width: colWidth });

  awardsY = Math.max(doc.y, awardsY + 22) + 3;

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("Star Performer Award", startX1, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Cognizant — High-quality contributions to Inmarsat BTP Project.", startX1, doc.y, { width: colWidth });

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("CIT Domain Excellence Award", startX2, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Tech Mahindra — Deep domain knowledge in British Telecom transformation.", startX2, doc.y, { width: colWidth });

  doc.x = 36;
  doc.y = awardsY + 24;

  // 5. ACADEMIC BACKGROUND & EDUCATION
  drawSectionHeader("Academic Background & Education", 6);
  const eduWidth = 170;
  let eduY = doc.y;

  // Degree 1
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Master of Science (MS)", 36, eduY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Computer Software Engineering", 36, doc.y);
  doc.fillColor(textMuted).font("Helvetica").fontSize(7.2).text("Liverpool John Moores Univ (2021-2022)", 36, doc.y, { width: eduWidth });

  // Degree 2
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("PG Diploma (Software Dev)", 210, eduY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Full Stack Development", 210, doc.y);
  doc.fillColor(textMuted).font("Helvetica").fontSize(7.2).text("IIIT Bangalore (2020-2021)", 210, doc.y, { width: eduWidth });

  // Degree 3
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Bachelor of Comp App (BCA)", 384, eduY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Computer Programming", 384, doc.y);
  doc.fillColor(textMuted).font("Helvetica").fontSize(7.2).text("Valluvar College / Bharathidasan (2009-2012)", 384, doc.y, { width: eduWidth });

  doc.x = 36;
  doc.y = eduY + 32;

  // 6. CERTIFICATIONS & ACCREDITATIONS
  drawSectionHeader("Certifications & Accreditations", 4);
  const certs = [
    "SDC16 - PG Diploma in Software Development (Full Stack) — IIIT Bangalore",
    "Google IT Automation with Python Specialization",
    "AWS Certified Cloud Practitioner",
    "Oracle Certified Web Component Developer (OCWCD)"
  ];
  certs.forEach((cert) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`✓  ${cert}`, 44, doc.y, { lineGap: 1 });
  });

  // 7. LANGUAGES & OVERSEAS RELOCATION FOOTER
  doc.moveDown(0.4);
  doc.strokeColor(borderBox).lineWidth(0.8).moveTo(36, doc.y).lineTo(559, doc.y).stroke();
  doc.moveDown(0.3);

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8).text("LANGUAGES: ", 36, doc.y, { continued: true });
  doc.fillColor(textDark).font("Helvetica").fontSize(8).text("English (Professional Working)  |  Tamil (Native/Bilingual)  |  Telugu (Elementary)", { continued: true });
  doc.fillColor("#047857").font("Helvetica-Bold").fontSize(8).text("    ✈ 100% Relocation Ready (Singapore, UK, USA)", { align: "right" });

  doc.end();
}
