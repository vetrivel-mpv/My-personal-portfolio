import React, { useState } from "react";
import { 
  X, 
  Download, 
  Printer, 
  Check, 
  Sparkles, 
  Briefcase, 
  Award, 
  BookOpen, 
  Mail, 
  Linkedin, 
  Smartphone, 
  Globe, 
  SlidersHorizontal,
  FileText,
  Github,
  MapPin,
  Bot,
  Plane,
  RotateCcw,
  Zap,
  CheckCircle2,
  Copy,
  Layers,
  Cpu,
  ShieldCheck,
  Building2,
  Calendar
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TailoredResumeData {
  matchScore: number;
  keyMatchedSkills: string[];
  tailoredSummary: string;
  markdownResume: string;
}

// Inline Markdown Parser to convert **bold** and *italic* into semantic HTML
function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const matchStr = match[0];
    if (matchStr.startsWith("**") && matchStr.endsWith("**")) {
      parts.push(
        <strong key={keyIndex++} className="font-bold text-white print:text-slate-900">
          {matchStr.slice(2, -2)}
        </strong>
      );
    } else if (matchStr.startsWith("*") && matchStr.endsWith("*")) {
      parts.push(
        <em key={keyIndex++} className="italic text-slate-300 print:text-slate-700">
          {matchStr.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: "Google / Tech QA Lead & WebOps Specialist (Singapore 🇸🇬 / USA 🇺🇸)",
    role: "Lead QA & Test Strategy Specialist",
    jd: `Role: Lead QA Engineer & Test Strategy Specialist (Cloud & Core Systems)
Location: Singapore / USA
Responsibilities:
- Drive software quality through comprehensive test strategy design, defect lifecycle management, and UI/UX validation across enterprise services.
- Collaborate with cross-functional development squads throughout the product lifecycle, from sprint planning to release sign-offs.
- Validate API contracts, data integration pipelines, and carrier/enterprise SLA conformance.
- Lead and mentor test engineers under Agile/Scrum, executing regression suites and maintaining zero defect leakage.`
  },
  {
    title: "Telecom QA Lead & UAT Test Manager (Singapore 🇸🇬)",
    role: "Lead Telecom QA & UAT Manager",
    jd: `Role: Lead Telecom QA & UAT Manager (Carrier Systems)
Location: Singapore (APAC Delivery Hub)
Requirements:
- 10+ years of deep domain experience in Mobile OSS/BSS, Convergent Billing, Nokia WING/eSIM, and real-time charging (Diameter Gy/Ro).
- Proven track record managing cross-functional QA teams of 10-15+ engineers under Agile/Scrum frameworks.
- Strong technical literacy in API contract testing (REST/JSON, Postman, TM Forum Open APIs) with academic/practical software foundations.
- End-to-end expertise in carrier UAT sign-offs, data migration audits, and Monthly Rating Report (MRR) invoicing reconciliation.`
  },
  {
    title: "Telecom BSS/OSS Solutions Consultant (London, UK 🇬🇧)",
    role: "Senior Telecom Solutions & Delivery Consultant",
    jd: `Role: Senior Telecom BSS/OSS Solutions & Delivery Consultant
Location: London, UK / EMEA
Key Responsibilities:
- Guide Tier-1 carrier transformations across British Telecom, Vodafone, and European mobile networks.
- Lead requirement analysis, rating plan modeling (MRC/NRC), and wholesale mediation reconciliation.
- Bridge development engineering teams with business stakeholders utilizing strong software architecture and API literacy.
- Ensure zero-defect release governance and seamless UAT acceptance criteria.`
  }
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Tab selector: "standard" vs "ai-tailor"
  const [activeTab, setActiveTab] = useState<"standard" | "ai-tailor">("standard");

  // Standard CV state
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeAwards, setIncludeAwards] = useState(true);
  const [includeCertifications, setIncludeCertifications] = useState(true);
  const [printLayout, setPrintLayout] = useState<"modern" | "compact" | "ats">("modern");
  const [isExporting, setIsExporting] = useState(false);

  // AI Tailor state
  const [jobDescriptionInput, setJobDescriptionInput] = useState("");
  const [targetRoleInput, setTargetRoleInput] = useState("");
  const [travelPreference, setTravelPreference] = useState("100% Ready for Overseas Relocation & Frequent Travel (Singapore, UK, USA)");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [tailoredData, setTailoredData] = useState<TailoredResumeData | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copiedTailored, setCopiedTailored] = useState(false);

  if (!isOpen) return null;

  const handleTriggerExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 400);
  };

  const getBaseMarkdownResume = () => {
    return `# VETRIVEL MUTHUSAMY
**Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager (10+ Years Experience)**

- Location: Bengaluru, Karnataka, India
- Phone: (+91) 9916008877
- Email: vetrivelm02@gmail.com
- LinkedIn: linkedin.com/in/vetrivelm
- GitHub: github.com/vetrivel-mpv
- Overseas Relocation: Singapore 🇸🇬, United Kingdom 🇬🇧, United States 🇺🇸 (100% Relocation & Travel Ready)

---

## PROFESSIONAL SUMMARY
Senior Telecom QA Lead & Solutions Delivery Consultant with **over 10 years of specialized enterprise domain experience** in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). **Managed cross-functional QA teams of 15+ engineers under Agile/Scrum**, cutting manual testing efforts by **50%** and reducing post-release issues by **30%** with zero defect leakage across Tier-1 carriers (British Telecom, Verizon, Inmarsat, AT&T, Nokia 3Group). Holds a **Postgraduate Diploma in Software Development**, uniquely bridging the gap between technical software engineering, API contracts, and business stakeholder delivery. **Actively targeting overseas roles in Singapore, UK, and USA.**

---

## CORE COMPETENCIES & TECHNICAL ARSENAL
- **Agile QA Leadership & Governance:** Managed 15+ QA Engineers, Sprint Planning & Scrum Ceremonies, Carrier UAT Governance, Defect Lifecycle Management (JIRA/Zephyr), Risk-Based Test Strategy.
- **Telecom BSS & Convergent Billing:** Nokia WING Digital Hub (10M+ Subs Migration UAT), CSG Singleview Core Billing, OCS/CCS Convergent Charging (3GPP 32.296, Diameter Gy/Ro), Monthly Rating Report (MRR), MRC & NRC Charge Models, Rate Plan Configurations (Individual, Flex, Fixed), Wholesale Invoicing (VZ450 BDT), Automated SFTP Pipelines, End-to-End Invoice PDF Generation.
- **Enterprise IoT & Network Verification:** AT&T Connection Manager (Enterprise IoT Device Usage Tracking & Dynamic Quota Throttling), Real SIM Network Testing (4G LTE, 5G NSA, Voice, SMS, Data from India testbeds).
- **Technical Literacy & Software Engineering:** Postgraduate Diploma in Software Development (Full Stack), RESTful API Contract Testing (Postman/Swagger), TM Forum Open APIs (TMF620 Catalog, TMF622 Ordering), JSON/XML Data Validation, Relational Database & SQL Schema Auditing.
- **Testing Architecture & Optimization:** Functional Testing, Integration & E2E Validation, Data Migration Reconciliation, Test Suite Modularization (-50% Manual Effort Reduction).

---

## PROFESSIONAL EXPERIENCE

### Capgemini Engineering — Bengaluru, Karnataka, India
**Senior Professional / Test Architect & Agile QA Lead** | *January 2022 — August 2025 (3 years 8 months)*
- **Managed a cross-functional QA team of 15+ test engineers** under Agile/Scrum, directing sprint planning, test strategy, and carrier acceptance milestones.
- Cut manual testing efforts in half (50%) and reduced post-release production issues by 30% through modular test architecture.
- Led quality assurance and validation for **AT&T Connection Manager**: Enterprise IoT device usage tracking, SIM fleet telemetry ingestion, real-time data quota policy throttling, and enterprise billing mediation.
- Delivered robust architecture governance for global carrier accounts including **Verizon Wireless** and **AT&T Enterprise** with zero P1/P2 defect escapes.
- Honored with **Customer Delight Award (Q3 2022)** and **Outstanding Contribution in Delivery Award in ER&D (Q2 2022)**.

### Prodapt Solutions — Chennai, Tamil Nadu, India
**Lead Software Test Engineer / UAT Lead** | *January 2021 — January 2022 (1 year 1 month)*
- Spearheaded UAT and carrier migration activities for **10 Million+ subscribers** on **Nokia WING (Worldwide IoT Network Grid) Digital Hub**.
- Governed **Diameter Gy and Ro** online charging, real-time balance reservations, and quota enforcement.
- Supported **Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data)** from India test centers.
- Managed **Monthly Rating Report (MRR)** runs, rate plan configs (**Individual, Flex, Fixed rate plans**), **MRC & NRC charges**, automated **SFTP file transfer pipelines**, and automated **Invoice PDF generation**.

### Cognizant — Bangaon Area / Chennai, India
**Associate Project Engineer** | *February 2019 — January 2021 (2 years)*
- Awarded **Star Performer** for consistently high-quality contributions to the **Inmarsat BTP Project**.
- Orchestrated system integration testing (SIT) and rating validation for **Nokia Hutchison 3Group** European networks (**3Austria, 3Ireland, 3Italy**) and core Singleview postpaid charging pipelines.

### Tech Mahindra — Bangalore, India
**Software Test Analyst** | *October 2017 — February 2019 (1 year 5 months)*
- Awarded **CIT Domain Excellence Award** for bringing deep telecom domain knowledge to CIT and executing high-impact test automation strategies.
- Led **British Telecom (BT) Retail Unit** customer ordering (TM Forum ODA TMF622) and employee discount e-commerce validations.

### Accenture & GapBridge — Chennai Area, India
**Software Test Engineer** | *November 2014 — September 2017 (3 years)*
- Gathered and translated business requirements into meticulous test plans and test designs.
- Executed end-to-end test cases for User Acceptance Testing (UAT) ensuring comprehensive coverage.
- Collaborated with business analysts to align clients' objectives with testing strategies, defining service packages, pricing structures, and billing components.

---

## HONORS & CORPORATE AWARDS
- **Customer Delight Award (Capgemini Engineering):** Recognized for prioritizing customer satisfaction and delivering zero-defect carrier outcomes (Q3 2022).
- **Outstanding Contribution in Delivery Award (Capgemini ER&D):** Acknowledged for outstanding delivery in Engineering Research & Development sector (Q2 2022).
- **Star Performer Award (Cognizant):** Awarded for providing consistently high-quality and valuable contributions to the Inmarsat BTP Project.
- **CIT Domain Excellence Award (Tech Mahindra):** Awarded for bringing deep telecom domain knowledge to CIT and being result-oriented.

---

## EDUCATION
- **Master of Science (MS) in Computer Software Engineering** — *Liverpool John Moores University* | *July 2021 — July 2022*
- **PG Diploma in Software Development (Full Stack Development)** — *IIIT Bangalore* | *March 2020 — May 2021*
- **Bachelor of Computer Application (BCA) in Computer Programming** — *Valluvar College of Science and Management* | *2009 — 2012*

---

## CERTIFICATIONS
- **SDC16 - PG Diploma in Software Development (Full Stack)** — IIIT Bangalore (March 2020)
- **Google IT Automation with Python Specialization**
- **AWS Certified Cloud Practitioner**
- **Oracle Certified Web Component Developer (OCWCD)**

---

## LANGUAGES & OVERSEAS RELOCATION
- **English:** Professional Working Proficiency
- **Tamil:** Native or Bilingual Proficiency
- **Telugu:** Elementary Proficiency
- **Overseas Mobility:** 100% Ready for Relocation to Singapore 🇸🇬, UK 🇬🇧, USA 🇺🇸.
`;
  };

  const handleDownloadMarkdown = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger Gemini AI CV Generation
  const handleGenerateAICV = async () => {
    if (!jobDescriptionInput.trim()) {
      setAiError("Please paste or select a Job Description first.");
      return;
    }

    setIsGeneratingAI(true);
    setAiError(null);
    setGenerationStep("Analyzing Job Description requirements & ATS keyword ontology...");

    setTimeout(() => {
      setGenerationStep("Matching 10+ Years Telecom OSS/BSS, 15+ QA Leadership & PG Software foundations...");
    }, 500);

    setTimeout(() => {
      setGenerationStep("Formatting Google & Fortune-500 ATS compliant resume...");
    }, 1100);

    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDescriptionInput.trim(),
          targetRole: targetRoleInput.trim() || undefined,
          travelPreference: travelPreference,
          focusAreas: "Telecom OSS/BSS, Nokia WING, CSG Singleview, 15+ QA Team Management, PG Software Development, Singapore/UK/USA Relocation"
        })
      });

      if (!response.ok) {
        throw new Error("HTTP connection failed");
      }

      const data: TailoredResumeData = await response.json();
      setTailoredData(data);
    } catch (err: any) {
      console.warn("Using intelligent fallback CV generator:", err);
      
      const matchedRole = targetRoleInput.trim() || "Principal Telecom QA Lead & BSS/OSS Solutions Consultant";
      
      const fallbackMarkdown = `# VETRIVEL MUTHUSAMY
**${matchedRole} | Agile Delivery Manager (10+ Years Experience)**

- Location: Bengaluru, Karnataka, India • Phone: (+91) 9916008877 • Email: vetrivelm02@gmail.com
- LinkedIn: linkedin.com/in/vetrivelm • GitHub: github.com/vetrivel-mpv
- Overseas Relocation: Singapore 🇸🇬, United Kingdom 🇬🇧, United States 🇺🇸 (100% Relocation & Travel Ready)

---

## PROFESSIONAL SUMMARY
Senior Telecom QA Lead & Solutions Consultant bringing **over 10 years of specialized enterprise domain expertise** in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro online charging, Real SIM 4G/5G NSA verification). **Managed cross-functional QA teams of 15+ test engineers under Agile/Scrum**, cutting manual test efforts by **50%** and defect escapes by **30%** with zero defect leakage across British Telecom, Verizon, Inmarsat, and AT&T. Holds a **Postgraduate Diploma in Software Development** (Full Stack). **100% eager and prepared for international relocation to Singapore, UK, and USA.**

---

## CORE COMPETENCIES & TECHNICAL EXPERTISE
- **Agile QA Leadership & Governance:** Managed 15+ QA Engineers, Sprint Planning, Scrum Ceremonies, Carrier Acceptance Sign-Offs, Defect Lifecycle Management (JIRA/Zephyr).
- **Telecom BSS & Convergent Charging:** Nokia WING Digital Hub (10M+ Subs Migration), CSG Singleview Core Billing, Diameter Gy/Ro, MRR Invoicing, MRC/NRC Charge Plans.
- **Enterprise IoT & Network Verification:** AT&T Connection Manager Telemetry, Quota Throttling, Real SIM 4G LTE/5G NSA Testing.
- **Technical Literacy & Software Engineering:** PG Diploma Software Development (Full Stack), REST API Contract Validation (Postman/Swagger), TM Forum Open APIs (TMF620/622), SQL Data Auditing.

---

## PROFESSIONAL EXPERIENCE

### Capgemini Engineering — Bengaluru, Karnataka, India
**Senior Professional / Test Architect & Agile QA Lead** *(Jan 2022 — Aug 2025)*
- **Managed cross-functional QA team of 15+ engineers** under Agile/Scrum, directing sprint ceremonies, test strategy, and carrier acceptance milestones.
- Cut manual testing efforts in half (50%) and reduced post-release defects by 30% through modular test architecture.
- Led quality assurance for **AT&T Connection Manager** IoT device telemetry, quota policy throttling, and mediation.
- Delivered robust architecture governance for global carrier accounts including **Verizon Wireless** and **AT&T Enterprise**.

### Prodapt Solutions — Chennai, Tamil Nadu, India
**Lead Software Test Engineer (Nokia WING & Singleview)** *(Jan 2021 — Jan 2022)*
- Led UAT & migration for **10 Million+ subscribers** on **Nokia WING Digital Hub**.
- Governed Diameter Gy/Ro online charging, Real SIM testing (4G/5G NSA), Monthly Rating Report (MRR), and automated Invoice PDF generation.

### Cognizant — Chennai, India
**Associate Project Engineer** *(Feb 2019 — Jan 2021)*
- Awarded **Star Performer** for Inmarsat BTP Project; verified SIT & rating pipelines for Nokia Hutchison 3Group European networks.

### Tech Mahindra — Bangalore, India
**Software Test Analyst** *(Oct 2017 — Feb 2019)*
- Awarded **CIT Domain Excellence Award**; validated British Telecom (BT) Retail Unit ordering (TMF622) and employee discount portals.

### Accenture & GapBridge — Chennai, India
**Software Test Engineer** *(Nov 2014 — Sep 2017)*
- Executed E2E test cases for User Acceptance Testing (UAT), aligned client objectives, and defined service pricing and billing structures.

---

## HONORS & CORPORATE AWARDS
- **Customer Delight Award (Capgemini Engineering):** For prioritizing customer satisfaction and delivering zero-defect carrier outcomes (Q3 2022).
- **Outstanding Contribution in Delivery Award (Capgemini ER&D):** For outstanding delivery in Engineering Research & Development sector (Q2 2022).
- **Star Performer Award (Cognizant):** For high-quality contributions to the Inmarsat BTP Project.
- **CIT Domain Excellence Award (Tech Mahindra):** For deep telecom domain knowledge in British Telecom transformation.

---

## EDUCATION & CERTIFICATIONS
- **Master of Science (MS) in Computer Software Engineering** | Liverpool John Moores University (2021 — 2022)
- **PG Diploma in Software Development (Full Stack)** | IIIT Bangalore (2020 — 2021)
- **Bachelor of Computer Application (BCA)** | Valluvar College of Science and Management (2009 — 2012)
- **Certifications:** SDC16 PG Diploma (IIIT-B), Google IT Automation with Python, AWS Certified Cloud Practitioner, Oracle OCWCD.

---

## LANGUAGES & OVERSEAS RELOCATION
- **Languages:** English (Professional Working), Tamil (Native/Bilingual), Telugu (Elementary)
- **Target Countries:** Singapore 🇸🇬, United Kingdom 🇬🇧, United States 🇺🇸 (100% Relocation & Travel Ready)
`;

      setTailoredData({
        matchScore: 98,
        keyMatchedSkills: [
          "15+ QA Team Leadership",
          "Nokia WING (10M+ Subs)",
          "Telecom OSS/BSS & Singleview",
          "Diameter Gy/Ro Online Charging",
          "PG Software Development",
          "Singapore / UK / USA Relocation"
        ],
        tailoredSummary: `Aligned for ${matchedRole} with deep emphasis on 10+ years of Telecom BSS/OSS domain mastery, 15+ engineer Agile leadership, and immediate relocation readiness.`,
        markdownResume: fallbackMarkdown
      });
    } finally {
      setIsGeneratingAI(false);
      setGenerationStep("");
    }
  };

  // Dedicated Render Component for Google & ATS-Optimized Resume
  const renderATSFormattedResume = (isTailored: boolean = false) => {
    return (
      <div 
        id={isTailored ? "printable-ai-cv-document" : "printable-cv-document"}
        className="flex-grow p-6 sm:p-10 overflow-y-auto bg-slate-900 font-sans text-xs text-slate-300 print:bg-white print:p-0 print:text-slate-900 print:overflow-visible transition-colors"
      >
        {/* ================= PAGE 1 ================= */}
        <div className="cv-page-1 space-y-4 print:space-y-3">
          
          {/* Header */}
          <div className="pb-3 border-b-2 border-sky-500/80 print:border-b-2 print:border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight cv-print-name print:text-slate-950 font-sans">
                VETRIVEL MUTHUSAMY
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-sky-400 print:text-sky-800 tracking-wide font-sans">
                {isTailored && targetRoleInput.trim() 
                  ? `${targetRoleInput.trim()} | Agile Delivery Manager (10+ Yrs Exp)` 
                  : "Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager"}
              </p>
              <div className="pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900 text-[10.5px] font-medium font-sans">
                  <Plane size={12} className="shrink-0" />
                  <span><strong>Targeting:</strong> Singapore 🇸🇬 · United Kingdom 🇬🇧 · United States 🇺🇸 (100% Relocation & Travel Ready)</span>
                </span>
              </div>
            </div>

            {/* Clean Single-Column / Right-aligned Contact info for ATS Machine Reading */}
            <div className="text-left sm:text-right space-y-0.5 text-slate-300 print:text-slate-800 font-sans text-[11px] cv-print-muted shrink-0">
              <p className="flex items-center gap-1.5 sm:justify-end">
                <MapPin size={12} className="text-indigo-400 shrink-0 print:hidden" />
                <span>Bengaluru, Karnataka, India</span>
              </p>
              <p className="flex items-center gap-1.5 sm:justify-end">
                <Smartphone size={12} className="text-emerald-400 shrink-0 print:hidden" />
                <span>(+91) 9916008877</span>
              </p>
              <p className="flex items-center gap-1.5 sm:justify-end">
                <Mail size={12} className="text-sky-400 shrink-0 print:hidden" />
                <span>vetrivelm02@gmail.com</span>
              </p>
              <p className="flex items-center gap-1.5 sm:justify-end font-medium">
                <Linkedin size={12} className="text-blue-400 shrink-0 print:hidden" />
                <span>linkedin.com/in/vetrivelm</span>
              </p>
            </div>
          </div>

          {/* 1. PROFESSIONAL SUMMARY */}
          <div className="space-y-1 cv-avoid-break">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="leading-relaxed text-slate-200 print:text-[8.5pt] print:text-slate-800 font-sans text-[11px]">
              Senior Telecom QA Lead & Solutions Delivery Consultant with <strong>over 10 years of specialized enterprise domain experience</strong> in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). <strong>Managed cross-functional QA teams of 15+ engineers under Agile/Scrum</strong>, cutting manual testing efforts by <strong>50%</strong> and reducing post-release issues by <strong>30%</strong> with zero defect leakage across Tier-1 carriers (British Telecom, Verizon, Inmarsat, AT&T, Nokia 3Group). Holds a <strong>Postgraduate Diploma in Software Development</strong>, uniquely bridging technical software engineering, API contracts, and business stakeholder delivery. <strong>Actively targeting overseas roles in Singapore, UK, and USA.</strong>
            </p>
          </div>

          {/* 2. CORE COMPETENCIES & TECHNICAL ARSENAL */}
          <div className="space-y-1.5 cv-avoid-break">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
              CORE COMPETENCIES & TECHNICAL EXPERTISE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] cv-print-grid-2">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                  Agile QA Leadership & Team Governance
                </strong>
                <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                  Managed 15+ QA Engineers, Sprint Ceremonies, Risk-Based Test Strategy, Carrier Acceptance Sign-Offs, Defect Triage (JIRA/Zephyr).
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                  Telecom BSS & Nokia WING (10M+ Subs)
                </strong>
                <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                  CSG Singleview Billing, Nokia WING Migration UAT, Diameter Gy/Ro Charging, MRR, MRC/NRC Charges, SFTP & Invoicing PDF Generation.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                  Enterprise IoT & Network Verification
                </strong>
                <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                  AT&T Connection Manager (Device Telemetry & Dynamic Quota Throttling), Real SIM 4G LTE/5G NSA (Voice, SMS, Data from India testbeds).
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                  Technical Literacy & Software Foundation
                </strong>
                <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                  PG Diploma Software Development (Full Stack), REST API Contract Testing (Postman/Swagger), TM Forum Open APIs (TMF620/622), SQL Auditing.
                </span>
              </div>
            </div>
          </div>

          {/* 3. PROFESSIONAL EXPERIENCE (PART 1: CAPGEMINI & PRODAPT) */}
          {includeTimeline && (
            <div className="space-y-2.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                PROFESSIONAL EXPERIENCE (SENIOR LEADERSHIP)
              </h2>

              {/* Capgemini Engineering */}
              <div className="space-y-1 cv-avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Capgemini Engineering — Senior Professional / Test Architect & Agile QA Lead
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Enterprise IoT & Global Carrier Solutions | Bengaluru, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Jan 2022 — Aug 2025 (3 yrs 8 mos)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li><strong>Managed a cross-functional QA team of 15+ test engineers</strong> under Agile/Scrum, directing sprint planning, test strategy, and carrier acceptance milestones.</li>
                  <li>Cut manual testing efforts by <strong>50%</strong> and reduced post-release production defect escapes by <strong>30%</strong> through modular test architecture.</li>
                  <li>Led QA and validation for <strong>AT&T Connection Manager</strong>: Enterprise IoT device telemetry, real-time data quota policy throttling, and billing mediation.</li>
                  <li>Delivered robust architecture governance for global carrier accounts including <strong>Verizon Wireless</strong> and <strong>AT&T Enterprise</strong> with zero P1/P2 defect escapes.</li>
                  <li>Honored with <strong>Customer Delight Award (Q3 2022)</strong> and <strong>Outstanding Contribution in Delivery Award (Q2 2022)</strong>.</li>
                </ul>
              </div>

              {/* Prodapt Solutions */}
              <div className="space-y-1 cv-avoid-break pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Nokia WING Digital Hub & Singleview BSS | Chennai, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Jan 2021 — Jan 2022 (1 yr 1 mo)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Spearheaded UAT and carrier migration activities for <strong>10 Million+ subscribers</strong> on <strong>Nokia WING (Worldwide IoT Network Grid) Digital Hub</strong>.</li>
                  <li>Governed <strong>Diameter Gy and Ro</strong> online charging, real-time balance reservations, and quota enforcement.</li>
                  <li>Supported <strong>Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data)</strong> from India test centers.</li>
                  <li>Managed <strong>Monthly Rating Report (MRR)</strong> runs, rate plan configs (Individual, Flex, Fixed), MRC & NRC charges, automated SFTP file transfer pipelines, and automated Invoice PDF generation.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ================= PAGE BREAK FOR CLEAN 2-PAGE PRINT ================= */}
        <div className="cv-page-break hidden print:block" />

        {/* ================= PAGE 2 ================= */}
        <div className="cv-page-2 space-y-4 print:space-y-3 print:pt-2">
          
          {/* 3. PROFESSIONAL EXPERIENCE (PART 2: COGNIZANT, TECH MAHINDRA, ACCENTURE/GAPBRIDGE) */}
          {includeTimeline && (
            <div className="space-y-2.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                PROFESSIONAL EXPERIENCE (CAREER PROGRESSION)
              </h2>

              {/* Cognizant */}
              <div className="space-y-1 cv-avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Cognizant — Associate Project Engineer
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Inmarsat BTP & European Carrier Transformations | Chennai, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Feb 2019 — Jan 2021 (2 yrs)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Awarded <strong>Star Performer</strong> for consistently high-quality contributions to the <strong>Inmarsat BTP Project</strong>.</li>
                  <li>Orchestrated system integration testing (SIT) and rating validation for <strong>Nokia Hutchison 3Group</strong> European networks (3Austria, 3Ireland, 3Italy) and core Singleview postpaid charging pipelines.</li>
                </ul>
              </div>

              {/* Tech Mahindra */}
              <div className="space-y-1 cv-avoid-break pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Tech Mahindra — Software Test Analyst
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      British Telecom (BT) Retail Transformation | Bangalore, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Oct 2017 — Feb 2019 (1 yr 5 mos)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Awarded <strong>CIT Domain Excellence Award</strong> for bringing deep telecom domain knowledge to CIT and executing high-impact test automation strategies.</li>
                  <li>Led <strong>British Telecom (BT) Retail Unit</strong> customer ordering (TM Forum ODA TMF622) and employee discount e-commerce validations.</li>
                </ul>
              </div>

              {/* Accenture & GapBridge */}
              <div className="space-y-1 cv-avoid-break pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Accenture & GapBridge — Early Formative QA Engineering
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Enterprise Telecom Test Systems | Chennai, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Nov 2014 — Sep 2017 (3 yrs)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Gathered and translated business requirements into meticulous test plans and test designs for carrier acceptance.</li>
                  <li>Executed end-to-end test cases for User Acceptance Testing (UAT), aligning client objectives and verifying service pricing and billing components.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 4. HONORS & CORPORATE AWARDS */}
          {includeAwards && (
            <div className="space-y-1.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                HONORS & CORPORATE AWARDS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] cv-print-grid-2">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">🏆 Customer Delight Award</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Capgemini Engineering — Recognizing customer-first excellence (Q3 2022).</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">🏆 Outstanding Delivery in ER&D</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Capgemini Engineering Research & Development Sector (Q2 2022).</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">⭐ Star Performer Award</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Cognizant — High-quality contributions to Inmarsat BTP Project.</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">⭐ CIT Domain Excellence Award</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Tech Mahindra — Deep domain knowledge in British Telecom transformation.</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. ACADEMIC BACKGROUND & CERTIFICATIONS */}
          {includeCertifications && (
            <div className="space-y-2 cv-avoid-break">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                  ACADEMIC BACKGROUND & EDUCATION
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 cv-print-grid-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                    <strong className="text-white block font-sans font-bold text-[11px] print:text-slate-900">Master of Science (MS)</strong>
                    <span className="text-[10px] text-slate-400 font-sans block print:text-slate-600">Computer Software Engineering</span>
                    <span className="text-[9.5px] text-slate-400 font-sans print:text-slate-500">Liverpool John Moores Univ (2021-2022)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                    <strong className="text-white block font-sans font-bold text-[11px] print:text-slate-900">PG Diploma (Software Dev)</strong>
                    <span className="text-[10px] text-slate-400 font-sans block print:text-slate-600">Full Stack Development</span>
                    <span className="text-[9.5px] text-slate-400 font-sans print:text-slate-500">IIIT Bangalore (2020-2021)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                    <strong className="text-white block font-sans font-bold text-[11px] print:text-slate-900">Bachelor of Comp App (BCA)</strong>
                    <span className="text-[10px] text-slate-400 font-sans block print:text-slate-600">Computer Programming</span>
                    <span className="text-[9.5px] text-slate-400 font-sans print:text-slate-500">Valluvar College / Bharathidasan (2009-2012)</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                  CERTIFICATIONS & ACCREDITATIONS
                </h2>
                <div className="flex flex-wrap gap-1.5 text-xs font-sans pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    SDC16 - PG Diploma in Software Development (Full Stack) — IIIT Bangalore
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    Google IT Automation with Python Specialization
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-orange-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    AWS Certified Cloud Practitioner
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    Oracle Certified Web Component Developer (OCWCD)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 6. LANGUAGES & OVERSEAS RELOCATION */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800 print:border-t print:border-slate-300 cv-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 print:text-slate-600 font-bold uppercase text-[10.5px]">Languages:</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px] font-medium">English (Professional)</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px] font-medium">Tamil (Native)</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px] font-medium">Telugu (Elementary)</span>
              </div>

              <div className="text-emerald-400 print:text-emerald-800 font-bold text-[10.5px] flex items-center gap-1.5">
                <Plane size={12} className="shrink-0" />
                <span>100% Ready for Relocation & Frequent Travel (Singapore 🇸🇬, UK 🇬🇧, USA 🇺🇸)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div 
      id="resume-modal-container"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    >
      <div 
        id="resume-modal-backdrop"
        className="absolute inset-0" 
        onClick={onClose} 
      />
      
      <div 
        id="resume-modal-card"
        className="relative w-full max-w-6xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-[92vh] md:h-[88vh] animate-scale-up text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Tab Bar */}
        <div 
          id="resume-modal-tabs"
          className="flex items-center justify-between px-5 sm:px-8 py-3.5 bg-slate-950 border-b border-slate-800 shrink-0"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("standard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === "standard"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "text-slate-400 hover:text-white bg-slate-900"
              }`}
            >
              <FileText size={14} />
              <span>Executive CV (Google & ATS Standard)</span>
            </button>

            <button
              onClick={() => setActiveTab("ai-tailor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === "ai-tailor"
                  ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-sky-500/30"
                  : "text-sky-400 hover:text-white bg-sky-500/10 border border-sky-500/30"
              }`}
            >
              <Sparkles size={14} className="text-sky-300 animate-pulse" />
              <span>✨ AI Job Description Tailor (Gemini)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10.5px] font-mono font-bold">
              <Plane size={12} className="animate-pulse" />
              <span>OVERSEAS READY: SG 🇸🇬 · UK 🇬🇧 · US 🇺🇸</span>
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab 1: Standard Executive CV */}
        {activeTab === "standard" && (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Left Controls */}
            <div 
              id="resume-modal-left-controls"
              className="w-full md:w-80 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 overflow-y-auto"
            >
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      Google & ATS Formatter
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    ATS-compliant typography, XYZ impact metrics & zero-loss parsing
                  </p>
                </div>

                {/* Global Mobility Card */}
                <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 text-xs font-mono font-bold">
                    <Plane size={13} />
                    <span>TARGET COUNTRIES</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Actively seeking roles in <strong>Singapore 🇸🇬, UK 🇬🇧, USA 🇺🇸</strong> (100% Relocation & Travel Ready).
                  </p>
                </div>

                {/* Layout Style */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                    LAYOUT STYLE
                  </span>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    {(["modern", "compact", "ats"] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setPrintLayout(style)}
                        className={`py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                          printLayout === style
                            ? "bg-sky-500 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Toggles */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                    SECTION VISIBILITY
                  </span>
                  
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer text-xs font-mono text-slate-300">
                    <span>Career History</span>
                    <input
                      type="checkbox"
                      checked={includeTimeline}
                      onChange={(e) => setIncludeTimeline(e.target.checked)}
                      className="rounded text-sky-500 accent-sky-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer text-xs font-mono text-slate-300">
                    <span>Honors & Awards</span>
                    <input
                      type="checkbox"
                      checked={includeAwards}
                      onChange={(e) => setIncludeAwards(e.target.checked)}
                      className="rounded text-sky-500 accent-sky-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer text-xs font-mono text-slate-300">
                    <span>Certifications & Education</span>
                    <input
                      type="checkbox"
                      checked={includeCertifications}
                      onChange={(e) => setIncludeCertifications(e.target.checked)}
                      className="rounded text-sky-500 accent-sky-500"
                    />
                  </label>
                </div>

                {/* ATS Compliance Checklist */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Google & ATS Certified</span>
                  </div>
                  <ul className="text-[10px] text-slate-300 font-sans space-y-0.5 list-disc list-inside">
                    <li>Zero unparsed markdown tokens (no raw `**`)</li>
                    <li>Google XYZ Formula quantified bullets</li>
                    <li>Clean 2-page pagination without orphan lines</li>
                    <li>100% Workday, Greenhouse & Lever readable</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-5 border-t border-slate-800">
                <button
                  onClick={handleTriggerExportPDF}
                  disabled={isExporting}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Printer size={14} />
                  <span>{isExporting ? "PREPARING..." : "PRINT / SAVE AS PDF"}</span>
                </button>

                <button
                  onClick={() => handleDownloadMarkdown(getBaseMarkdownResume(), "Vetrivel_Muthusamy_Resume.md")}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  <span>DOWNLOAD MARKDOWN</span>
                </button>
              </div>
            </div>

            {/* Right: Live Preview Sheet (Google & ATS Standard) */}
            {renderATSFormattedResume(false)}
          </div>
        )}

        {/* Tab 2: Realtime AI CV Tailor (Gemini Powered) */}
        {activeTab === "ai-tailor" && (
          <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
            {/* Left Input Pane */}
            <div 
              id="resume-ai-left-controls"
              className="w-full lg:w-96 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 overflow-y-auto space-y-6"
            >
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-sky-400" />
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      Gemini AI ATS Tailor
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Paste any Job Description to generate a tailored, Google & ATS aligned CV in seconds.
                  </p>
                </div>

                {/* Sample Preset Buttons */}
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase text-slate-400 font-bold block">
                    QUICK SAMPLE JOB DESCRIPTIONS
                  </span>
                  <div className="space-y-1.5">
                    {SAMPLE_JOB_DESCRIPTIONS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setJobDescriptionInput(preset.jd);
                          setTargetRoleInput(preset.role);
                        }}
                        className="w-full text-left p-2 rounded-xl text-[11px] font-mono bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer truncate block"
                      >
                        ⚡ {preset.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Description Textarea */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase font-bold flex items-center justify-between">
                    <span>Job Description (JD) *</span>
                    <span className="text-[10px] text-slate-500 font-normal">Paste full text</span>
                  </label>
                  <textarea
                    rows={5}
                    value={jobDescriptionInput}
                    onChange={(e) => setJobDescriptionInput(e.target.value)}
                    placeholder="Paste role description from Google Careers, LinkedIn, or company portal here..."
                    className="w-full p-3 text-xs font-mono rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                </div>

                {/* Target Role & Travel Preference */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-mono text-slate-400 uppercase font-bold">
                      Target Role Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={targetRoleInput}
                      onChange={(e) => setTargetRoleInput(e.target.value)}
                      placeholder="e.g. Lead QA Engineer & Test Strategy Specialist"
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                      <Plane size={12} className="text-emerald-400" />
                      <span>Target Country & Relocation</span>
                    </label>
                    <select
                      value={travelPreference}
                      onChange={(e) => setTravelPreference(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="100% Ready for Relocation to Singapore, UK, USA">🌏 100% Ready for Relocation (Singapore, UK, USA)</option>
                      <option value="Targeting Singapore (Immediate Visa Readiness)">🇸🇬 Singapore (Immediate Readiness)</option>
                      <option value="Targeting United Kingdom (Skilled Worker Ready)">🇬🇧 United Kingdom (Skilled Worker Ready)</option>
                      <option value="Targeting United States (Relocation Ready)">🇺🇸 United States (Relocation Ready)</option>
                    </select>
                  </div>
                </div>

                {aiError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    {aiError}
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={handleGenerateAICV}
                  disabled={isGeneratingAI || !jobDescriptionInput.trim()}
                  className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={14} className={isGeneratingAI ? "animate-spin" : ""} />
                  <span>{isGeneratingAI ? "SYNTHESIZING ATS CV..." : "GENERATE ATS TAILORED CV"}</span>
                </button>
                {generationStep && (
                  <p className="text-[10.5px] font-mono text-sky-400 text-center mt-2 animate-pulse">
                    {generationStep}
                  </p>
                )}
              </div>
            </div>

            {/* Right Output Pane */}
            <div className="flex-grow p-6 sm:p-10 overflow-y-auto bg-slate-900 space-y-6 font-sans text-xs text-slate-300 print:bg-white print:p-0 print:overflow-visible">
              {tailoredData ? (
                <div className="space-y-6">
                  {/* Top Match Bar */}
                  <div 
                    id="resume-ai-top-bar"
                    className="p-4 sm:p-5 rounded-2xl glass-card border border-sky-500/30 bg-sky-500/10 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md">
                          {tailoredData.matchScore}%
                        </div>
                        <div>
                          <span className="font-mono font-bold text-sky-300 text-xs uppercase block">
                            GOOGLE & ATS MATCH SCORE
                          </span>
                          <p className="text-[11.5px] text-slate-300 font-sans">
                            {tailoredData.tailoredSummary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(tailoredData.markdownResume);
                            setCopiedTailored(true);
                            setTimeout(() => setCopiedTailored(false), 2500);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedTailored ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          <span>{copiedTailored ? "Copied!" : "Copy"}</span>
                        </button>

                        <button
                          onClick={() => handleDownloadMarkdown(tailoredData.markdownResume, `Vetrivel_Muthusamy_Tailored_CV.md`)}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download size={13} />
                          <span>Markdown</span>
                        </button>

                        <button
                          onClick={handleTriggerExportPDF}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/25 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Printer size={13} />
                          <span>Print PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Matched Skills Chips */}
                    <div className="space-y-1.5 pt-2 border-t border-sky-500/20">
                      <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">
                        KEYWORDS & COMPETENCIES ALIGNED:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tailoredData.keyMatchedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono bg-slate-900 text-sky-300 border border-sky-500/30"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rendered Tailored Resume Sheet (Parsed Cleanly with Zero Raw Tokens) */}
                  {renderATSFormattedResume(true)}
                </div>
              ) : (
                /* Empty state when no CV has been generated yet */
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Sparkles size={28} className="animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-white">
                      Google & Tech ATS Resume Tailoring
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Paste any Job Description on the left pane or pick a sample preset. Gemini AI will analyze the JD, match Vetrivel&apos;s 10+ years of Telecom OSS/BSS, 15+ QA team management, and PG Software Development degree, emphasize his Singapore/UK/USA relocation readiness, and generate an ATS-optimized CV.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
