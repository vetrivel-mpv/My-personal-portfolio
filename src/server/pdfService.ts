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
  pageMode?: "1-page" | "2-page";
}

export function generateResumePDF(res: Response, customData?: ResumeData) {
  const pageMode = customData?.pageMode || "1-page";
  const margin = pageMode === "1-page" ? 24 : 32;

  const doc = new PDFDocument({
    size: "A4",
    margin: margin,
    bufferPages: true,
    info: {
      Title: "Vetrivel Muthusamy - Principal Telecom & Enterprise Solutions Lead",
      Author: "Vetrivel Muthusamy",
      Subject: pageMode === "1-page" ? "1-Page Executive ATS Resume" : "2-Page Comprehensive Technical Resume",
      Keywords: "Telecom, QA Lead, Solutions Consultant, Singleview, Nokia WING, Agile Delivery, UAT, AT&T IoT, Singtel, Singapore, UK, USA"
    }
  });

  res.setHeader("Content-Type", "application/pdf");
  const filename = pageMode === "1-page" 
    ? "Vetrivel_Muthusamy_1Page_Executive_Resume.pdf"
    : "Vetrivel_Muthusamy_2Page_Detailed_Resume.pdf";
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

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
  const borderBox = "#cbd5e1";

  // Helper for drawing clean section headers with horizontal rule
  const drawSectionHeader = (title: string, topMargin: number = 5, lineWidth: number = pageMode === "1-page" ? 539 : 531) => {
    doc.moveDown(topMargin / 10);
    doc.fillColor(darkBlue).font("Helvetica-Bold").fontSize(pageMode === "1-page" ? 10 : 9.5).text(title.toUpperCase(), { characterSpacing: 0.5 });
    const y = doc.y + 1.5;
    doc.strokeColor(blue).lineWidth(1.2).moveTo(margin, y).lineTo(margin + lineWidth, y).stroke();
    doc.moveDown(0.35);
  };

  // =========================================================================
  // OPTION 1: 1-PAGE ULTRA-DENSE EXECUTIVE FORMAT (100% UTILIZED, ZERO WASTE)
  // =========================================================================
  if (pageMode === "1-page") {
    const contentWidth = 595.28 - 2 * margin; // 539.28 pt

    // Header (Clean, professional, without relocation badges on formal CV)
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(22).text(candidateName, margin, doc.y);
    doc.fillColor(darkBlue).font("Helvetica-Bold").fontSize(11).text(targetRole);
    doc.moveDown(0.25);

    const contactLine = `${location}  |  ${phone}  |  ${email}  |  ${linkedin}  |  ${github}`;
    doc.fillColor(textDark).font("Helvetica").fontSize(8.8).text(contactLine);
    
    // Header Underline
    doc.moveDown(0.35);
    doc.strokeColor(navy).lineWidth(1.5).moveTo(margin, doc.y).lineTo(margin + contentWidth, doc.y).stroke();
    doc.moveDown(0.3);

    // 1. PROFESSIONAL SUMMARY
    drawSectionHeader("Professional Summary", 3, contentWidth);
    const summaryText = customData?.summary || 
      "Senior Telecom QA Lead & Solutions Delivery Architect with over 10 years of specialized enterprise domain mastery in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T Enterprise IoT Connection Manager, CSG Singleview Core Billing, Diameter Gy/Ro online charging, Real SIM 4G/5G NSA testing). Managed cross-functional QA teams of 15+ test engineers under Agile/Scrum, cutting manual testing efforts by 50% and reducing post-release defect escapes by 30% with zero defect leakage across Tier-1 carriers (British Telecom, Verizon Wireless, Inmarsat, AT&T Enterprise, and Nokia 3Group). Holds a Postgraduate Diploma in Software Development (Full Stack), seamlessly unifying Node.js backend architectures, REST/TM Forum Open APIs, modern frontend engineering, and large-scale telecom carrier delivery.";
    
    doc.fillColor(textDark).font("Helvetica").fontSize(8.8).text(summaryText, {
      align: "justify",
      lineGap: 2.5
    });

    // 2. TECHNICAL SKILLS & ENGINEERING ARSENAL (4 High-Density Cards: Node.js, Frontend, QA, Telecom)
    drawSectionHeader("Technical Skills & Engineering Arsenal", 4, contentWidth);
    const colW = (contentWidth - 14) / 2;
    const x1 = margin;
    const x2 = margin + colW + 14;
    let sY = doc.y;

    doc.rect(x1, sY, colW, 48).fillAndStroke("#f8fafc", "#cbd5e1");
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.8).text("Backend & Systems Engineering", x1 + 8, sY + 6);
    doc.fillColor(textDark).font("Helvetica").fontSize(8).text("Node.js, Express.js, TypeScript, RESTful Microservices, GraphQL, Python (Automation), SQL (PostgreSQL, Oracle DB), Redis.", x1 + 8, sY + 20, { width: colW - 16, lineGap: 1.5 });

    doc.rect(x2, sY, colW, 48).fillAndStroke("#f8fafc", "#cbd5e1");
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.8).text("Advanced Frontend & Modern Web", x2 + 8, sY + 6);
    doc.fillColor(textDark).font("Helvetica").fontSize(8).text("Next.js, Modern TypeScript/JavaScript (ESNext), Component Architecture, TailwindCSS, WebSockets, High-Performance Responsive UI.", x2 + 8, sY + 20, { width: colW - 16, lineGap: 1.5 });

    sY = sY + 54;
    doc.rect(x1, sY, colW, 48).fillAndStroke("#f8fafc", "#cbd5e1");
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.8).text("Test Automation & QA Architecture", x1 + 8, sY + 6);
    doc.fillColor(textDark).font("Helvetica").fontSize(8).text("Playwright, Cypress, Selenium Grid, Postman/Newman, RestAssured, Supertest, CI/CD (GitHub Actions, Jenkins), JIRA/Zephyr.", x1 + 8, sY + 20, { width: colW - 16, lineGap: 1.5 });

    doc.rect(x2, sY, colW, 48).fillAndStroke("#f8fafc", "#cbd5e1");
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.8).text("Telecom BSS/OSS & Network Protocols", x2 + 8, sY + 6);
    doc.fillColor(textDark).font("Helvetica").fontSize(8).text("CSG Singleview Billing, Nokia WING (10M+ Subs), Diameter Gy/Ro (OCS/OFCS), Real SIM 4G/5G NSA Testing, TM Forum Open APIs (TMF620/622).", x2 + 8, sY + 20, { width: colW - 16, lineGap: 1.5 });

    doc.y = sY + 55;

    // 3. PROFESSIONAL EXPERIENCE
    drawSectionHeader("Professional Experience", 4, contentWidth);

    // Job 1: Capgemini
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(9.6).text("Capgemini Engineering — Senior Professional / Test Architect & Agile QA Lead", margin, doc.y, { continued: true });
    doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8.6).text("  (Jan 2022 — Aug 2025 | 3 yrs 8 mos)", { align: "right" });
    doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8.3).text("Enterprise IoT & Global Carrier Solutions | Bengaluru, Karnataka, India", margin, doc.y);
    doc.moveDown(0.18);

    const capBullets1P = [
      "Managed a cross-functional QA team of 15+ test engineers under Agile/Scrum; cut manual testing efforts by 50% and defect escapes by 30%.",
      "Led QA and validation for AT&T Connection Manager: Enterprise IoT device telemetry, real-time data quota policy throttling, and billing mediation.",
      "Delivered robust architecture governance for Verizon Wireless & AT&T Enterprise accounts with zero P1/P2 defect escapes.",
      "Honored with Customer Delight Award (Q3 2022) and ER&D Outstanding Contribution in Delivery Award (Q2 2022) for carrier excellence."
    ];
    capBullets1P.forEach(b => {
      doc.fillColor(textDark).font("Helvetica").fontSize(8.4).text(`•  ${b}`, margin + 8, doc.y, { width: contentWidth - 14, lineGap: 1.8 });
    });
    doc.moveDown(0.35);

    // Job 2: Prodapt
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(9.6).text("Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)", margin, doc.y, { continued: true });
    doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8.6).text("  (Jan 2021 — Jan 2022 | 1 yr 1 mo)", { align: "right" });
    doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8.3).text("Nokia WING Digital Hub & Singleview BSS | Chennai, Tamil Nadu, India", margin, doc.y);
    doc.moveDown(0.18);

    const prodaptBullets1P = [
      "Spearheaded UAT & carrier migration for 10 Million+ subscribers on Nokia WING (Worldwide IoT Network Grid) Digital Hub.",
      "Governed Diameter Gy/Ro online charging, Real SIM 4G/5G NSA testing, Monthly Rating Reports (MRR), and automated SFTP invoice PDF generation.",
      "Validated complex charge models, SIM provisioning workflows, and billing mediation for global carrier tenants."
    ];
    prodaptBullets1P.forEach(b => {
      doc.fillColor(textDark).font("Helvetica").fontSize(8.4).text(`•  ${b}`, margin + 8, doc.y, { width: contentWidth - 14, lineGap: 1.8 });
    });
    doc.moveDown(0.35);

    // Jobs 3, 4, 5: Compact Progression
    // Cognizant
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(9.4).text("Cognizant — Associate Project Engineer", margin, doc.y, { continued: true });
    doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8.6).text("  (Feb 2019 — Jan 2021 | 2 yrs)", { align: "right" });
    doc.fillColor(textDark).font("Helvetica").fontSize(8.4).text("•  Awarded Star Performer for Inmarsat BTP Project; validated SIT & postpaid rating for Nokia Hutchison 3Group Europe (3Austria, 3Ireland, 3Italy) and Singleview BSS pipelines.", margin + 8, doc.y, { width: contentWidth - 14, lineGap: 1.8 });
    doc.moveDown(0.3);

    // Tech Mahindra
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(9.4).text("Tech Mahindra — Software Test Analyst", margin, doc.y, { continued: true });
    doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8.6).text("  (Oct 2017 — Feb 2019 | 1 yr 5 mos)", { align: "right" });
    doc.fillColor(textDark).font("Helvetica").fontSize(8.4).text("•  Awarded CIT Domain Excellence Award; led British Telecom (BT) Retail Unit customer ordering (TMF622) and employee discount portal validation.", margin + 8, doc.y, { width: contentWidth - 14, lineGap: 1.8 });
    doc.moveDown(0.3);

    // Early Career / GapBridge & Accenture
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(9.4).text("Accenture & GapBridge — Early Formative QA Engineering", margin, doc.y, { continued: true });
    doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8.6).text("  (Nov 2014 — Sep 2017 | 3 yrs)", { align: "right" });
    doc.fillColor(textDark).font("Helvetica").fontSize(8.4).text("•  Translated business requirements into test designs for UAT, verifying enterprise service packages, pricing structures, and ERP billing components.", margin + 8, doc.y, { width: contentWidth - 14, lineGap: 1.8 });
    doc.moveDown(0.38);

    // 4. HONORS & CORPORATE AWARDS
    drawSectionHeader("Honors & Corporate Awards", 3, contentWidth);
    let aY = doc.y;
    doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.6).text("★ Customer Delight Award", x1, aY);
    doc.fillColor(textDark).font("Helvetica").fontSize(8.1).text("Capgemini Engineering (Q3 2022) — Zero-defect carrier delivery.", x1, doc.y, { width: colW });

    doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.6).text("★ Outstanding Delivery in ER&D", x2, aY);
    doc.fillColor(textDark).font("Helvetica").fontSize(8.1).text("Capgemini Engineering ER&D Sector (Q2 2022) milestone.", x2, doc.y, { width: colW });

    aY = Math.max(doc.y, aY + 20) + 4;
    doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.6).text("★ Star Performer Award", x1, aY);
    doc.fillColor(textDark).font("Helvetica").fontSize(8.1).text("Cognizant — Inmarsat BTP Project high-quality contribution.", x1, doc.y, { width: colW });

    doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.6).text("★ CIT Domain Excellence", x2, aY);
    doc.fillColor(textDark).font("Helvetica").fontSize(8.1).text("Tech Mahindra — British Telecom transformation domain custody.", x2, doc.y, { width: colW });

    doc.x = margin;
    doc.y = aY + 22;

    // 5. EDUCATION & CERTIFICATIONS
    drawSectionHeader("Education & Certifications", 3, contentWidth);
    let eduY = doc.y;
    const col3W = (contentWidth - 16) / 3;
    const e1 = margin;
    const e2 = margin + col3W + 8;
    const e3 = margin + (col3W + 8) * 2;

    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.6).text("MS Computer Software Eng", e1, eduY);
    doc.fillColor(textMuted).font("Helvetica").fontSize(7.8).text("Liverpool John Moores Univ (2021-22)", e1, doc.y, { width: col3W });

    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.6).text("PG Diploma Software Dev", e2, eduY);
    doc.fillColor(textMuted).font("Helvetica").fontSize(7.8).text("IIIT Bangalore Full Stack (2020-21)", e2, doc.y, { width: col3W });

    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.6).text("Bachelor of Comp Apps (BCA)", e3, eduY);
    doc.fillColor(textMuted).font("Helvetica").fontSize(7.8).text("Valluvar / Bharathidasan (2009-12)", e3, doc.y, { width: col3W });

    doc.x = margin;
    doc.y = eduY + 26;

    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.4).text("Certifications: ", margin, doc.y, { continued: true });
    doc.fillColor(textDark).font("Helvetica").fontSize(8.1).text("AWS Certified Cloud Practitioner  |  Google IT Automation with Python  |  Oracle OCWCD  |  IIIT-B SDC16");
    doc.moveDown(0.2);

    doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.4).text("Languages & Carrier Scope: ", margin, doc.y, { continued: true });
    doc.fillColor(textDark).font("Helvetica").fontSize(8.1).text("English (Professional), Tamil (Native), Telugu  |  British Telecom (UK), Verizon Wireless (US), AT&T (US), Inmarsat, Nokia 3Group.");

    doc.end();
    return;
  }

  // =========================================================================
  // OPTION 2: 2-PAGE DETAILED TECHNICAL LEADERSHIP FORMAT (PROPORTIONALLY BALANCED)
  // =========================================================================
  
  // ---------------- PAGE 1 ----------------
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(18).text(candidateName, { align: "left" });
  doc.fillColor(blue).font("Helvetica-Bold").fontSize(9.5).text(targetRole, { align: "left" });
  doc.moveDown(0.15);

  const contactText = `${location}  |  ${phone}  |  ${email}  |  ${linkedin}  |  ${github}`;
  doc.fillColor(textMuted).font("Helvetica").fontSize(8).text(contactText);
  
  doc.moveDown(0.3);
  doc.strokeColor(navy).lineWidth(1.5).moveTo(32, doc.y).lineTo(563, doc.y).stroke();
  doc.moveDown(0.2);

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader("Professional Summary", 4);
  const summaryText = customData?.summary || 
    "Senior Telecom QA Lead & Solutions Delivery Architect with over 10 years of specialized enterprise domain experience in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T Enterprise IoT Connection Manager, CSG Singleview Core Billing, Diameter Gy/Ro online charging, Real SIM 4G/5G NSA testing). Managed cross-functional QA teams of 15+ test engineers under Agile/Scrum, cutting manual testing efforts by 50% and reducing post-release defect escapes by 30% with zero defect leakage across Tier-1 carriers (British Telecom, Verizon Wireless, Inmarsat, AT&T Enterprise, and Nokia 3Group). Holds a Postgraduate Diploma in Software Development (Full Stack), seamlessly unifying Node.js backend architectures, REST/TM Forum Open APIs, modern frontend engineering, and large-scale telecom carrier delivery.";
  
  doc.fillColor(textDark).font("Helvetica").fontSize(8.2).text(summaryText, {
    align: "justify",
    lineGap: 1.5
  });

  // 2. TECHNICAL ARSENAL
  drawSectionHeader("Technical Skills & Engineering Arsenal", 6);
  const colW2 = 255;
  const startX1 = 32;
  const startX2 = 300;
  let skillsY = doc.y;

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Backend & Systems Engineering", startX1, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Node.js, Express.js, TypeScript, RESTful Microservices, GraphQL, Python (Automation), SQL (PostgreSQL, Oracle DB), Redis.", startX1, doc.y, { width: colW2, lineGap: 1 });

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Advanced Frontend & Modern Web", startX2, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Next.js, Modern TypeScript/JavaScript (ESNext), Component Architecture, TailwindCSS, WebSockets, High-Performance UI.", startX2, doc.y, { width: colW2, lineGap: 1 });

  skillsY = Math.max(doc.y, skillsY + 28) + 4;

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Test Automation & QA Architecture", startX1, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Playwright, Cypress, Selenium Grid, Postman/Newman, RestAssured, Supertest, CI/CD (GitHub Actions, Jenkins), JIRA/Zephyr.", startX1, doc.y, { width: colW2, lineGap: 1 });

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Telecom BSS/OSS & Network Protocols", startX2, skillsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("CSG Singleview Billing, Nokia WING (10M+ Subs), Diameter Gy/Ro (OCS/OFCS), Real SIM 4G/5G NSA Testing, TM Forum Open APIs.", startX2, doc.y, { width: colW2, lineGap: 1 });

  doc.x = 32;
  doc.y = skillsY + 30;

  // 3. PROFESSIONAL EXPERIENCE (PART 1)
  drawSectionHeader("Professional Experience (Senior Leadership)", 6);

  // Job 1: Capgemini
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Capgemini Engineering — Senior Professional / Test Architect & Agile QA Lead", 32, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Jan 2022 — Aug 2025 | 3 yrs 8 mos)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Enterprise IoT & Global Carrier Solutions | Bengaluru, Karnataka, India", 32, doc.y);
  doc.moveDown(0.2);

  const capgeminiBullets = [
    "Managed a cross-functional QA team of 15+ test engineers under Agile/Scrum, directing sprint ceremonies, test strategy, and carrier acceptance milestones.",
    "Cut manual testing efforts by 50% and reduced post-release production defect escapes by 30% through modular test architecture.",
    "Led QA and validation for AT&T Connection Manager: Enterprise IoT device telemetry, real-time data quota policy throttling, and billing mediation.",
    "Delivered robust architecture governance for global carrier accounts including Verizon Wireless and AT&T Enterprise with zero P1/P2 defect escapes.",
    "Honored with Customer Delight Award (Q3 2022) and Outstanding Contribution in Delivery Award in ER&D (Q2 2022)."
  ];
  capgeminiBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 40, doc.y, { width: 515, lineGap: 1.2 });
  });
  doc.moveDown(0.4);

  // Job 2: Prodapt
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)", 32, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Jan 2021 — Jan 2022 | 1 yr 1 mo)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Nokia WING Digital Hub & Singleview BSS | Chennai, Tamil Nadu, India", 32, doc.y);
  doc.moveDown(0.2);

  const prodaptBullets = [
    "Spearheaded UAT and carrier migration activities for 10 Million+ subscribers on Nokia WING (Worldwide IoT Network Grid) Digital Hub.",
    "Governed Diameter Gy and Ro online charging, real-time balance reservations, and quota policy enforcement.",
    "Supported Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data) from India test centers.",
    "Managed Monthly Rating Report (MRR) runs, rate plan configs (Individual, Flex, Fixed), MRC & NRC charges, automated SFTP pipelines, and invoice PDF generation."
  ];
  prodaptBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 40, doc.y, { width: 515, lineGap: 1.2 });
  });

  // Page 1 Footer Milestone Banner (Filling Page 1 Smoothly)
  doc.moveDown(0.5);
  const milestoneY = doc.y;
  doc.rect(32, milestoneY, 531, 38).fillAndStroke("#f8fafc", "#cbd5e1");
  doc.fillColor(darkBlue).font("Helvetica-Bold").fontSize(8).text("VERIFIED ENTERPRISE CARRIER IMPACT & GOVERNANCE HIGHLIGHTS", 42, milestoneY + 7);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.2).text("✓ 10M+ Subscriber Carrier UAT & Migration  |  ✓ Zero P1/P2 Defect Leakage  |  ✓ 15+ QA Engineer Agile Governance  |  ✓ -50% Manual Effort Optimization", 42, milestoneY + 20);

  // ---------------- PAGE 2 ----------------
  doc.addPage({ margin: 32, size: "A4" });

  // Page 2 Header Banner
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text("VETRIVEL MUTHUSAMY", 32, 32, { continued: true });
  doc.fillColor(textMuted).font("Helvetica").fontSize(8).text("  —  Curriculum Vitae (Page 2 of 2)", { align: "right" });
  doc.strokeColor(navy).lineWidth(0.8).moveTo(32, doc.y + 2).lineTo(563, doc.y + 2).stroke();
  doc.moveDown(0.4);

  // Continued Experience
  drawSectionHeader("Professional Experience (Career Progression)", 2);

  // Job 3: Cognizant
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Cognizant — Associate Project Engineer", 32, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Feb 2019 — Jan 2021 | 2 yrs)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Inmarsat BTP & European Carrier Transformations | Chennai, India", 32, doc.y);
  doc.moveDown(0.2);

  const cognizantBullets = [
    "Awarded Star Performer for consistently high-quality contributions to the Inmarsat BTP Project.",
    "Orchestrated system integration testing (SIT) and rating validation for Nokia Hutchison 3Group European networks (3Austria, 3Ireland, 3Italy) and core Singleview postpaid charging pipelines."
  ];
  cognizantBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 40, doc.y, { width: 515, lineGap: 1.2 });
  });
  doc.moveDown(0.4);

  // Job 4: Tech Mahindra
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Tech Mahindra — Software Test Analyst", 32, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Oct 2017 — Feb 2019 | 1 yr 5 mos)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("British Telecom (BT) Retail Transformation | Bangalore, India", 32, doc.y);
  doc.moveDown(0.2);

  const tmBullets = [
    "Awarded CIT Domain Excellence Award for bringing deep telecom domain knowledge to CIT and executing high-impact test automation strategies.",
    "Led British Telecom (BT) Retail Unit customer ordering (TM Forum ODA TMF622) and employee discount e-commerce validations."
  ];
  tmBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 40, doc.y, { width: 515, lineGap: 1.2 });
  });
  doc.moveDown(0.4);

  // Job 5: Accenture & GapBridge
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text("Accenture & GapBridge — Early Formative QA Engineering", 32, doc.y, { continued: true });
  doc.fillColor(textMuted).font("Helvetica-Bold").fontSize(8).text("  (Nov 2014 — Sep 2017 | 3 yrs)", { align: "right" });
  doc.fillColor(darkBlue).font("Helvetica-Oblique").fontSize(8).text("Enterprise Telecom Test Systems | Chennai, India", 32, doc.y);
  doc.moveDown(0.2);

  const gapbridgeBullets = [
    "Gathered and translated business requirements into meticulous test plans and test designs for carrier acceptance.",
    "Executed end-to-end test cases for User Acceptance Testing (UAT), aligning client objectives and verifying service pricing and billing structures."
  ];
  gapbridgeBullets.forEach((bullet) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`•  ${bullet}`, 40, doc.y, { width: 515, lineGap: 1.2 });
  });

  // 4. HONORS & AWARDS
  drawSectionHeader("Honors & Corporate Awards", 6);
  let awardsY = doc.y;

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("Customer Delight Award", startX1, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Capgemini Engineering — Recognizing customer-first excellence (Q3 2022).", startX1, doc.y, { width: colW2 });

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("Outstanding Delivery in ER&D", startX2, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Capgemini Engineering ER&D Sector (Q2 2022).", startX2, doc.y, { width: colW2 });

  awardsY = Math.max(doc.y, awardsY + 22) + 3;

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("Star Performer Award", startX1, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Cognizant — High-quality contributions to Inmarsat BTP Project.", startX1, doc.y, { width: colW2 });

  doc.fillColor("#b45309").font("Helvetica-Bold").fontSize(8.5).text("CIT Domain Excellence Award", startX2, awardsY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Tech Mahindra — Deep domain knowledge in British Telecom transformation.", startX2, doc.y, { width: colW2 });

  doc.x = 32;
  doc.y = awardsY + 24;

  // 5. EDUCATION
  drawSectionHeader("Academic Background & Education", 6);
  const eduWidth = 175;
  let eduY = doc.y;

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Master of Science (MS)", 32, eduY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Computer Software Engineering", 32, doc.y);
  doc.fillColor(textMuted).font("Helvetica").fontSize(7.2).text("Liverpool John Moores Univ (2021-2022)", 32, doc.y, { width: eduWidth });

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("PG Diploma (Software Dev)", 210, eduY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Full Stack Development", 210, doc.y);
  doc.fillColor(textMuted).font("Helvetica").fontSize(7.2).text("IIIT Bangalore (2020-2021)", 210, doc.y, { width: eduWidth });

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8.5).text("Bachelor of Comp App (BCA)", 384, eduY);
  doc.fillColor(textDark).font("Helvetica").fontSize(7.5).text("Computer Programming", 384, doc.y);
  doc.fillColor(textMuted).font("Helvetica").fontSize(7.2).text("Valluvar College / Bharathidasan (2009-2012)", 384, doc.y, { width: eduWidth });

  doc.x = 32;
  doc.y = eduY + 32;

  // 6. CERTIFICATIONS
  drawSectionHeader("Certifications & Accreditations", 4);
  const certs = [
    "SDC16 - PG Diploma in Software Development (Full Stack) — IIIT Bangalore",
    "Google IT Automation with Python Specialization",
    "AWS Certified Cloud Practitioner",
    "Oracle Certified Web Component Developer (OCWCD)"
  ];
  certs.forEach((cert) => {
    doc.fillColor(textDark).font("Helvetica").fontSize(7.8).text(`✓  ${cert}`, 40, doc.y, { lineGap: 1 });
  });

  // 7. LANGUAGES & DOMAIN FOOTER
  doc.moveDown(0.4);
  doc.strokeColor(borderBox).lineWidth(0.8).moveTo(32, doc.y).lineTo(563, doc.y).stroke();
  doc.moveDown(0.3);

  doc.fillColor(navy).font("Helvetica-Bold").fontSize(8).text("LANGUAGES: ", 32, doc.y, { continued: true });
  doc.fillColor(textDark).font("Helvetica").fontSize(8).text("English (Professional Working)  |  Tamil (Native/Bilingual)  |  Telugu (Elementary)");

  doc.end();
}
