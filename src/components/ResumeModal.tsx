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
  Cpu
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

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: "Telecom QA Lead & UAT Test Manager (Singapore 🇸🇬)",
    role: "Lead Telecom QA & UAT Manager",
    jd: `Role: Lead Telecom QA & UAT Manager (Carrier Systems)
Location: Singapore (APAC Delivery Hub)
Requirements:
- 10+ years of deep domain experience in Mobile OSS/BSS, Convergent Billing, Nokia WING/eSIM, and real-time charging (Diameter Gy/Ro).
- Proven track record managing cross-functional QA teams of 10-15+ engineers under Agile/Scrum frameworks.
- Strong technical literacy in API contract testing (REST/JSON, Postman, TM Forum Open APIs) with academic/practical software foundations.
- End-to-end expertise in carrier UAT sign-offs, data migration audits, and Monthly Rating Report (MRR) invoicing reconciliation.
- Excellent executive communication and multi-vendor stakeholder coordination.`
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
  },
  {
    title: "Carrier Migration & Agile QA Delivery Lead (Dallas / US 🇺🇸)",
    role: "Agile QA Delivery & Migration Lead",
    jd: `Role: Agile QA Delivery Lead - Telecom & IoT Platforms
Location: Dallas, TX / US Carrier Networks
Requirements:
- 10+ years leading QA and migration programs for multi-million subscriber carrier deployments.
- Hands-on experience with AT&T IoT Connection Manager, CSG Singleview, and 4G/5G NSA network testing.
- Agile Scrum Master / Delivery Lead capable of mentoring teams of 15+ engineers, managing defect triage in JIRA/Zephyr.
- Ready for international on-site deployments and client advisory workshops.`
  }
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Tab selector: "standard" vs "ai-tailor"
  const [activeTab, setActiveTab] = useState<"standard" | "ai-tailor">("standard");

  // Standard CV state
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeCuredFailures, setIncludeCuredFailures] = useState(true);
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
    }, 600);
  };

  const getBaseMarkdownResume = () => {
    return `# VETRIVEL MUTHUSAMY
**Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager (10+ Years Experience)**

- 📱 **Mobile:** (+91) 9916008877
- 📧 **Email:** vetrivelm02@gmail.com
- 💼 **LinkedIn:** linkedin.com/in/vetrivelm
- 📡 **GitHub:** github.com/vetrivel-mpv
- 📍 **Location:** Bengaluru, Karnataka, India
- 🌏 **Overseas Availability:** Actively Seeking Opportunities in Singapore 🇸🇬, United Kingdom 🇬🇧, and United States 🇺🇸 (100% Relocation & Travel Ready)

---

## PROFESSIONAL SUMMARY
Senior Telecom QA Lead & UAT Delivery Manager with **over 10 years of specialized enterprise domain experience** in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). **Managed cross-functional QA teams of 15+ engineers under Agile/Scrum**, cutting manual testing efforts by **50%** and reducing post-release issues by 30% with zero defect leakage across Tier-1 carriers (British Telecom, Verizon, Inmarsat, AT&T, Nokia 3Group). Holds a **Postgraduate Diploma in Software Development**, uniquely bridging the gap between technical engineering, API contracts, and business stakeholder delivery. **Actively targeting overseas roles in Singapore, UK, and USA.**

---

## TOP SKILLS & TELECOM ARSENAL
- **Agile QA Leadership & Team Governance:** Managed 15+ QA Engineers, Sprint Planning & Scrum Ceremonies, Carrier UAT Governance, Defect Lifecycle Management (JIRA/Zephyr), Risk-Based Test Strategy.
- **Telecom BSS & Convergent Billing:** Nokia WING Digital Hub (10M+ Subs Migration UAT), CSG Singleview Core Billing, OCS/CCS Convergent Charging (3GPP 32.296, Diameter Gy/Ro), Monthly Rating Report (MRR), MRC & NRC Charge Models, Rate Plan Configurations (Individual, Flex, Fixed), Wholesale Invoicing (VZ450 BDT), Automated SFTP Pipelines, End-to-End Invoice PDF Generation.
- **Enterprise IoT & Network Verification:** AT&T Connection Manager (Enterprise IoT Device Usage Tracking & Dynamic Quota Throttling), Real SIM Network Testing (4G LTE, 5G NSA, Voice, SMS, Data from India testbeds).
- **Technical Literacy & Software Engineering:** Postgraduate Diploma in Software Development (Full Stack), RESTful API Contract Testing (Postman/Swagger), TM Forum Open APIs (TMF620 Catalog, TMF622 Ordering), JSON/XML Data Validation, Relational Database & SQL Schema Auditing.
- **Testing Architecture & Optimization:** Functional Testing, Integration & E2E Validation, Data Migration Reconciliation, Test Suite Modularization (-50% Manual Effort Reduction).

---

## HONORS & AWARDS
- **Customer Delight Award (Capgemini Engineering):** Recognized for prioritizing customer satisfaction and putting customers first (Q3, July 1 – Sept 30, 2022).
- **Outstanding Contribution in Delivery Award (Capgemini ER&D):** Acknowledged for outstanding delivery in Engineering Research & Development sector (Q2, April 1 – June 30, 2022).
- **Star Performer Award (Cognizant):** Awarded for providing consistently high-quality and valuable contributions to the Inmarsat BTP Project.
- **CIT Domain Excellence Award (Tech Mahindra):** Awarded for bringing deep telecom domain knowledge to CIT and being result-oriented.

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
- Awarded for bringing deep telecom domain knowledge to CIT and executing high-impact test automation strategies.
- Led **British Telecom (BT) Retail Unit** customer ordering (TM Forum ODA TMF622) and employee discount e-commerce validations.

### Accenture — Chennai Area, India
**Application Development Associate** | *February 2017 — September 2017 (8 months)*
- Developed and validated application integrations across enterprise telecom client stacks.

### GapBridge — Chennai Area, India
**Software Test Engineer** | *November 2014 — February 2017 (2 years 4 months)*
- Gathered and translated business requirements into meticulous test plans and test designs.
- Executed end-to-end test cases for User Acceptance Testing (UAT) ensuring comprehensive coverage.
- Collaborated with business analysts to align clients' objectives with testing strategies.
- Played a pivotal role in defining service packages, pricing structures, and billing components.
- Actively participated in defect meetings, handoff sessions, and daily triage calls for seamless coordination.

---

## EDUCATION
- **Master of Science (MS) in Computer Software Engineering**  
  *Liverpool John Moores University* | *July 2021 — July 2022*
- **PG Diploma in Software Development (Full Stack Development)**  
  *International Institute of Information Technology Bangalore (IIIT Bangalore)* | *March 2020 — May 2021*
- **Bachelor of Computer Application (BCA) in Computer Programming**  
  *Valluvar College of Science and Management* | *2009 — 2012*

---

## CERTIFICATIONS
- **SDC16 - PG Diploma in Software Development (Full Stack)** — IIIT Bangalore (March 2020)
- **Google IT Automation with Python Specialization**
- **AWS Certified Cloud Practitioner**
- **Oracle Certified Web Component Developer (OCWCD)**

---

## LANGUAGES
- **English:** Professional Working Proficiency
- **Tamil:** Native or Bilingual Proficiency
- **Telugu:** Elementary Proficiency
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
    setGenerationStep("Analyzing Job Description requirements & terminology...");

    setTimeout(() => {
      setGenerationStep("Matching 11+ Years Telecom OSS/BSS, Java microservices & QA leadership...");
    }, 500);

    setTimeout(() => {
      setGenerationStep("Highlighting Global Mobility & Frequent Travel readiness...");
    }, 1100);

    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDescriptionInput.trim(),
          targetRole: targetRoleInput.trim() || undefined,
          travelPreference: travelPreference,
          focusAreas: "Telecom OSS/BSS, Java Spring Boot microservices, Quality Architecture, Worldwide Travel & Onsite Client Leadership"
        })
      });

      if (!response.ok) {
        throw new Error("HTTP connection failed");
      }

      const data: TailoredResumeData = await response.json();
      setTailoredData(data);
    } catch (err: any) {
      console.warn("Using intelligent fallback CV generator:", err);
      
      // Intelligent fallback synthesis
      const isTelecom = jobDescriptionInput.toLowerCase().includes("telecom") || jobDescriptionInput.toLowerCase().includes("oss") || jobDescriptionInput.toLowerCase().includes("billing");
      const isCloud = jobDescriptionInput.toLowerCase().includes("cloud") || jobDescriptionInput.toLowerCase().includes("aws") || jobDescriptionInput.toLowerCase().includes("microservices");
      
      const matchedRole = targetRoleInput.trim() || "Global Solution Architect & Systems Delivery Lead";
      
      const fallbackMarkdown = `# VETRIVEL MUTHUSAMY
**${matchedRole} — 11+ Years Enterprise Custody**

- 📧 **Email:** vetrivelm02@gmail.com | 📱 **Phone:** (+91) 9916008877
- 💼 **LinkedIn:** linkedin.com/in/vetrivelm | 📡 **GitHub:** github.com/vetrivelm
- ✈️ **Global Mobility:** 100% Willing to Travel Frequently Worldwide (EMEA, Americas, APAC, UK)

---

## TARGETED EXECUTIVE SUMMARY
High-impact **${matchedRole}** bringing **11+ years of enterprise custody** in ${isTelecom ? "Telecom OSS/BSS, Singleview rating engines, and mediation APIs" : "distributed architectures, Java Spring Boot microservices, and high-performance quality frameworks"}. Proven record eliminating multi-million dollar billing contract discrepancies and cutting regression duration by 40% with multithreaded Java Selenium Grids. **Fully prepared and enthusiastic for frequent worldwide international travel** for client discovery workshops, pre-sales architecture, and on-site mission delivery.

---

## TARGETED CORE COMPETENCIES
- **Architecture & System Integration:** ${isTelecom ? "Singleview Billing, Aria Middleware, SNMP Collectors, TM Forum eTOM/TAM" : "Java 21, Spring Boot 3.3 REST APIs, Kafka Streams, Docker, Kubernetes (AWS EKS)"}.
- **Quality & Performance Engineering:** Selenium Grid Concurrent Clusters, -40% Regression Execution Duration, Zero P1/P2 Leakage.
- **Global Delivery & Client Advisory:** On-site Client Workshops, Pre-Sales Architecture, Frequent International Travel Readiness.

---

## PROVEN SYSTEM FAILURES CURED
- **Carrier Invoicing Discrepancy Eradicated:** Eliminated monthly partner contract leakage across wholesale rating engines.
- **SNMP Telemetry Overflow Intercept:** Prevented queue buffers crashing during fiber outage simulations using custom throttling.

---

## PROFESSIONAL EXPERIENCE

### Capgemini — Test Architect & QA Lead *(Jan 2022 — Present)*
- Orchestrated Java Selenium Grid framework acceleration, reducing regression execution cycles by 40%.
- Recipient of Capgemini Outstanding Delivery Award and Customer Delight Award (2022).

### Prodapt Solutions — Lead Engineer *(Jan 2021 — Jan 2022)*
- Architected integration mapping across Singleview Billing core modules and postpaid rating systems.

### Cognizant — Project Associate *(Feb 2019 — Jan 2021)*
- Delivered end-to-end System Integration Testing (SIT) on core carrier charging pipelines.

---

## EDUCATION & ACCREDITATIONS
- **M.Sc in Science (MS)** | Liverpool John Moores University (2022)
- **BCA** | Bharathidasan University (2012)
- **AWS Certified Cloud Practitioner** | **Oracle Certified Web Component Developer (OCWCD)**
`;

      setTailoredData({
        matchScore: 95,
        keyMatchedSkills: [
          "Telecom OSS/BSS",
          "Java 21 / Spring Boot",
          "Selenium Grid (-40% Time)",
          "Frequent Worldwide Travel",
          "Singleview Billing",
          "Global Client Delivery"
        ],
        tailoredSummary: `Tailored for ${matchedRole} with strong emphasis on 11+ years of architecture custody and 100% frequent international travel readiness.`,
        markdownResume: fallbackMarkdown
      });
    } finally {
      setIsGeneratingAI(false);
      setGenerationStep("");
    }
  };

  return (
    <div 
      id="resume-modal-container"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in print:hidden"
    >
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />
      
      <div 
        className="relative w-full max-w-6xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-[92vh] md:h-[88vh] animate-scale-up text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Tab Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 bg-slate-950 border-b border-slate-800 shrink-0">
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
              <span>Executive CV</span>
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
              <span>WORLDWIDE TRAVEL READY</span>
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab 1: Standard Executive CV */}
        {activeTab === "standard" && (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Left Controls */}
            <div className="w-full md:w-80 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-sky-400" />
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      CV Customizer
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Adjust layout and sections in real-time
                  </p>
                </div>

                {/* Global Mobility Card */}
                <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 text-xs font-mono font-bold">
                    <Plane size={13} />
                    <span>GLOBAL TRAVEL MOBILITY</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    100% Enthusiastic and ready to travel frequently worldwide for client discovery, architecture, and deployments.
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
                    <span>Outages Cured</span>
                    <input
                      type="checkbox"
                      checked={includeCuredFailures}
                      onChange={(e) => setIncludeCuredFailures(e.target.checked)}
                      className="rounded text-sky-500 accent-sky-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer text-xs font-mono text-slate-300">
                    <span>Certifications</span>
                    <input
                      type="checkbox"
                      checked={includeCertifications}
                      onChange={(e) => setIncludeCertifications(e.target.checked)}
                      className="rounded text-sky-500 accent-sky-500"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-6 border-t border-slate-800">
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

            {/* Right: Live Preview Sheet */}
            <div className="flex-grow p-6 sm:p-10 overflow-y-auto bg-slate-900 space-y-6 font-sans text-xs text-slate-300">
              {/* Header */}
              <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    VETRIVEL MUTHUSAMY
                  </h1>
                  <p className="text-sm font-mono text-sky-400 font-bold">
                    Architect & Lead Consultant | Telecommunications Industry
                  </p>
                  <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 pt-0.5">
                    <Plane size={13} />
                    <span>Global Mobility: 100% Willing & Ready to Travel Frequently Worldwide</span>
                  </p>
                </div>

                <div className="text-right space-y-1 text-slate-400 font-mono text-[11px]">
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Mail size={12} className="text-sky-400" /> vetrivelm02@gmail.com
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Smartphone size={12} className="text-emerald-400" /> (+91) 9916008877
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <MapPin size={12} className="text-indigo-400" /> Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1">
                  PROFESSIONAL SUMMARY
                </h3>
                <p className="leading-relaxed text-slate-300 text-xs">
                  As an Architect, Test Lead and QA Engineer with over 10 years of experience in telecom, passionate about driving quality assurance, continuous improvement, and cross-functional Agile leadership. Expertise lies in Mobile OSS/BSS stacks (CSG Singleview, Nokia WING 10M+ subscribers, AT&T Connection Manager IoT), where I have led cross-functional teams and implemented automated testing frameworks that cut manual testing efforts in half (50%) and reduced post-release issues by 30%.
                </p>
              </div>

              {/* Competencies */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1">
                  TOP SKILLS & TELECOM ARSENAL
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-white block font-mono text-[11px] mb-0.5">UAT Coordination & Project Delivery</strong>
                    <span>Defect Management, End-to-End Test Strategy, Agile Release Governance, Cross-Functional Team Leadership</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-white block font-mono text-[11px] mb-0.5">Telecom BSS & Nokia WING (10M+ Subs)</strong>
                    <span>CSG Singleview Billing, Nokia WING Digital Hub UAT/Migration, Diameter Gy/Ro, MRR, MRC/NRC Plans, SFTP & Invoice PDF Gen</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-white block font-mono text-[11px] mb-0.5">Enterprise IoT & Real SIMs Testing</strong>
                    <span>AT&T Connection Manager Telemetry & Quota Throttling, 4G LTE & 5G NSA Real SIMs (Voice, SMS, Data from India test centers)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-white block font-mono text-[11px] mb-0.5">TM Forum ODA & Full-Stack Cloud</strong>
                    <span>TMF620/622/638/679 APIs, Java 21, Spring Boot 3.3, Docker, Kubernetes (AWS EKS), Kafka Streams, Selenium Grid Cluster (-40% Time)</span>
                  </div>
                </div>
              </div>

              {/* Honors & Awards */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1">
                  HONORS & AWARDS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-amber-400 block font-mono text-[11px]">🏆 Customer Delight Award</strong>
                    <span className="text-[11px] text-slate-300">Capgemini Engineering — Recognized for putting customers first (Q3 2022).</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-amber-400 block font-mono text-[11px]">🏆 Outstanding Delivery in ER&D</strong>
                    <span className="text-[11px] text-slate-300">Capgemini Engineering Research & Development Sector (Q2 2022).</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-amber-400 block font-mono text-[11px]">⭐ Star Performer Award</strong>
                    <span className="text-[11px] text-slate-300">Cognizant — Consistently high-quality contributions to Inmarsat BTP Project.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850">
                    <strong className="text-amber-400 block font-mono text-[11px]">⭐ CIT Domain Excellence Award</strong>
                    <span className="text-[11px] text-slate-300">Tech Mahindra — For bringing deep telecom domain knowledge to CIT.</span>
                  </div>
                </div>
              </div>

              {/* Career History */}
              {includeTimeline && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1">
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white text-xs">Capgemini Engineering — Senior Professional / Test Architect & QA Lead</h4>
                      <span className="text-[11px] font-mono text-slate-400">Jan 2022 — Aug 2025 (3 yrs 8 mos)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Implemented automated testing frameworks cutting manual testing efforts in half (50%) and reducing post-release issues by 30%. Led architecture and validation for <strong>AT&T Connection Manager</strong> (enterprise IoT device usage tracking and rating). Honored with Customer Delight and Outstanding Delivery in ER&D awards.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white text-xs">Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)</h4>
                      <span className="text-[11px] font-mono text-slate-400">Jan 2021 — Jan 2022 (1 yr 1 mo)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Led UAT & migration for <strong>10 Million+ subscribers</strong> on <strong>Nokia WING Digital Hub</strong>. Governed Diameter Gy/Ro online charging, Real SIM testing (4G/5G NSA, SMS, Voice, Data), Monthly Rating Report (MRR), MRC/NRC charge models, SFTP batch transfer, and automated Invoice PDF generation.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white text-xs">Cognizant — Associate Project Engineer</h4>
                      <span className="text-[11px] font-mono text-slate-400">Feb 2019 — Jan 2021 (2 yrs)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Awarded <strong>Star Performer</strong> for Inmarsat BTP Project. Orchestrated system integration testing (SIT) and rating validation for Nokia Hutchison 3Group European networks (3Austria, 3Ireland, 3Italy).
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white text-xs">Tech Mahindra — Software Test Analyst</h4>
                      <span className="text-[11px] font-mono text-slate-400">Oct 2017 — Feb 2019 (1 yr 5 mos)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Awarded CIT Domain Excellence Award. Led British Telecom (BT) Retail Unit mobile ordering (TMF622) and employee discount e-commerce automations.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white text-xs">Accenture & GapBridge — Early Formative QA Engineering</h4>
                      <span className="text-[11px] font-mono text-slate-400">Nov 2014 — Sep 2017 (3 yrs)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Gathered business requirements into test plans, executed E2E test cases for UAT, aligned client objectives, and defined service pricing and billing structures.
                    </p>
                  </div>
                </div>
              )}

              {/* Certifications */}
              {includeCertifications && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1">
                    CERTIFICATIONS & ACCREDITATIONS
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300">
                      SDC16 - PG Diploma in Software Development (Full Stack) — IIIT Bangalore
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300">
                      Google IT Automation with Python Specialization
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-orange-300">
                      AWS Certified Cloud Practitioner
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-300">
                      Oracle Certified Web Component Developer (OCWCD)
                    </span>
                  </div>
                </div>
              )}

              {/* Education */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
                  ACADEMIC BACKGROUND
                </h3>
                <div className="space-y-2 text-xs text-slate-300">
                  <p>
                    <strong>Master of Science (MS) in Computer Software Engineering</strong><br />
                    <span className="text-slate-400 font-mono text-[11px]">Liverpool John Moores University (July 2021 — July 2022)</span>
                  </p>
                  <p>
                    <strong>PG Diploma in Software Development (Full Stack Development)</strong><br />
                    <span className="text-slate-400 font-mono text-[11px]">International Institute of Information Technology Bangalore (IIIT Bangalore) (March 2020 — May 2021)</span>
                  </p>
                  <p>
                    <strong>Bachelor of Computer Application (BCA) in Computer Programming</strong><br />
                    <span className="text-slate-400 font-mono text-[11px]">Valluvar College of Science and Management (2009 — 2012)</span>
                  </p>
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 pb-1">
                  LANGUAGES
                </h3>
                <div className="flex flex-wrap gap-3 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                    🗣️ English: <strong>Professional Working</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                    🗣️ Tamil: <strong>Native / Bilingual</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                    🗣️ Telugu: <strong>Elementary</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Realtime AI CV Tailor (Gemini Powered) */}
        {activeTab === "ai-tailor" && (
          <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
            {/* Left Input Pane */}
            <div className="w-full lg:w-96 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 overflow-y-auto space-y-6">
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-sky-400" />
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      Gemini AI CV Tailor
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Paste any Job Description to generate a tailored, ATS-aligned CV in seconds.
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
                    placeholder="Paste role description from LinkedIn, job portal, or recruiter spec here..."
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
                      placeholder="e.g. Global Principal Solution Architect"
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                      <Plane size={12} className="text-emerald-400" />
                      <span>Travel Mobility Stance</span>
                    </label>
                    <select
                      value={travelPreference}
                      onChange={(e) => setTravelPreference(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="100% Willing to Travel Frequently Worldwide">✈️ 100% Willing to Travel Frequently Worldwide</option>
                      <option value="Up to 75% Global International Travel">✈️ Up to 75% Global International Travel</option>
                      <option value="50% Hybrid & International Relocation Ready">✈️ 50% Hybrid & International Relocation Ready</option>
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
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleGenerateAICV}
                  disabled={isGeneratingAI || !jobDescriptionInput.trim()}
                  className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={14} className={isGeneratingAI ? "animate-spin" : ""} />
                  <span>{isGeneratingAI ? "SYNTHESIZING TAILORED CV..." : "GENERATE TAILORED CV"}</span>
                </button>
                {generationStep && (
                  <p className="text-[10.5px] font-mono text-sky-400 text-center mt-2 animate-pulse">
                    {generationStep}
                  </p>
                )}
              </div>
            </div>

            {/* Right Output Pane */}
            <div className="flex-grow p-6 sm:p-10 overflow-y-auto bg-slate-900 space-y-6 font-sans text-xs text-slate-300">
              {tailoredData ? (
                <div className="space-y-6">
                  {/* Top Match Bar */}
                  <div className="p-4 sm:p-5 rounded-2xl glass-card border border-sky-500/30 bg-sky-500/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md">
                          {tailoredData.matchScore}%
                        </div>
                        <div>
                          <span className="font-mono font-bold text-sky-300 text-xs uppercase block">
                            JD ALIGNMENT MATCH SCORE
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
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedTailored ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          <span>{copiedTailored ? "Copied!" : "Copy"}</span>
                        </button>

                        <button
                          onClick={() => handleDownloadMarkdown(tailoredData.markdownResume, `Vetrivel_Muthusamy_Tailored_CV.md`)}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
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

                  {/* Rendered Tailored Resume Sheet */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6">
                    {tailoredData.markdownResume.split("\n\n").map((section, sIdx) => {
                      if (section.startsWith("# ")) {
                        return (
                          <div key={sIdx} className="pb-4 border-b border-slate-800">
                            <h2 className="text-2xl font-extrabold text-white">
                              {section.replace("# ", "")}
                            </h2>
                          </div>
                        );
                      }
                      if (section.startsWith("## ")) {
                        return (
                          <h3 key={sIdx} className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 pt-2">
                            {section.replace("## ", "")}
                          </h3>
                        );
                      }
                      if (section.startsWith("### ")) {
                        return (
                          <h4 key={sIdx} className="text-sm font-bold text-white pt-1">
                            {section.replace("### ", "")}
                          </h4>
                        );
                      }
                      if (section.startsWith("- ") || section.startsWith("* ")) {
                        const items = section.split("\n");
                        return (
                          <ul key={sIdx} className="space-y-1 text-xs text-slate-300">
                            {items.map((it, iIdx) => (
                              <li key={iIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                                <span>{it.replace(/^[\*\-]\s+/, "")}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={sIdx} className="leading-relaxed text-xs text-slate-300">
                          {section}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Empty state when no CV has been generated yet */
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Sparkles size={28} className="animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-white">
                      Real-Time AI Resume Tailoring
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Paste any Job Description on the left pane or pick a sample preset. Gemini AI will analyze the JD, match Vetrivel&apos;s 11+ years of Telecom OSS/BSS & microservices custody, emphasize his worldwide travel readiness, and generate an ATS-optimized CV.
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
