import React, { useState } from "react";
import { 
  Briefcase, 
  Globe2, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Bot, 
  Mail, 
  Phone, 
  Linkedin, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Award, 
  Plane, 
  Network, 
  Cpu, 
  Database,
  Star,
  ExternalLink
} from "lucide-react";

interface RecruiterHubProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
  onNavigateSection: (sectionId: string) => void;
}

type CountryFilter = "all" | "singapore" | "uk" | "usa" | "europe";

interface CountryHighlight {
  id: CountryFilter;
  country: string;
  flag: string;
  targetMarket: string;
  relevantExperience: string[];
  keyClientMatches: string[];
  visaReadiness: string;
}

const COUNTRY_HIGHLIGHTS: Record<CountryFilter, CountryHighlight> = {
  all: {
    id: "all",
    country: "Global Telecom Markets",
    flag: "🌐",
    targetMarket: "Worldwide Enterprise & Carrier Deployments",
    relevantExperience: [
      "10+ Years of specialized Mobile OSS/BSS domain expertise across Tier-1 telecom operators.",
      "Managed cross-functional QA teams of 15+ engineers under Agile/Scrum delivery frameworks.",
      "Spearheaded UAT and carrier migration for 10M+ subscribers on Nokia WING (Worldwide IoT Network Grid).",
      "Postgraduate in Software Development (IIIT Bangalore) ensuring high technical API literacy."
    ],
    keyClientMatches: ["British Telecom", "AT&T Enterprise", "Verizon Wireless", "Inmarsat Satellite", "Nokia 3Group"],
    visaReadiness: "100% Ready for International Relocation, Work Sponsorship & Frequent Worldwide Travel"
  },
  singapore: {
    id: "singapore",
    country: "Singapore & APAC",
    flag: "🇸🇬",
    targetMarket: "APAC Telco Hubs & MVNO/MVNE Ecosystems",
    relevantExperience: [
      "Expertise in multi-country subscriber migrations, eSIM profile provisioning, and cloud IoT connectivity.",
      "Hands-on with Diameter Gy/Ro online charging, real-time balance reservations, and quota throttling.",
      "Real SIM network testing experience for 4G LTE and 5G NSA networks from remote test centers.",
      "Proven delivery leadership managing 15+ QA engineers with 50% test cycle optimization."
    ],
    keyClientMatches: ["Singtel", "StarHub", "M1 Singapore", "Circles.Life", "Nokia APAC Grid"],
    visaReadiness: "Eligible and prepared for Singapore Employment Pass (EP) sponsorship & immediate relocation."
  },
  uk: {
    id: "uk",
    country: "United Kingdom & EMEA",
    flag: "🇬🇧",
    targetMarket: "UK Carrier Modernization & TM Forum ODA Digital Transformation",
    relevantExperience: [
      "Led British Telecom (BT) Retail Unit customer ordering (TM Forum ODA TMF622) and employee discount validations.",
      "Validated Inmarsat Global Satellite maritime teleport billing transformations (Awarded Star Performer).",
      "Conducted TM Forum SID data schema modeling, RESTful API contract audits, and HP ALM test governance.",
      "Holds Master of Science (MS) in Software Engineering from Liverpool John Moores University (UK)."
    ],
    keyClientMatches: ["British Telecom (BT)", "Vodafone UK", "Inmarsat Satellite", "EE", "Virgin Media O2"],
    visaReadiness: "Eligible for UK Skilled Worker Visa sponsorship; MS degree from Liverpool John Moores University."
  },
  usa: {
    id: "usa",
    country: "United States & North America",
    flag: "🇺🇸",
    targetMarket: "US Tier-1 Carriers, Enterprise IoT Fleets & BSS Wholesale Settlements",
    relevantExperience: [
      "Led validation for AT&T Connection Manager: Enterprise IoT device usage tracking, SIM telemetry, and quota throttling.",
      "Audited wholesale settlement billing pipelines, Bill Data Tape (BDT), and VZ450 invoicing for Verizon Wireless.",
      "Extensive background in CSG Singleview Core Billing and multi-million dollar rating reconciliation.",
      "Managed distributed Agile delivery teams across global US/India time zones."
    ],
    keyClientMatches: ["AT&T Enterprise", "Verizon Wireless", "T-Mobile USA", "Dish Wireless", "CSG International"],
    visaReadiness: "Available for US H-1B transfer, L-1, or international business travel deployments."
  },
  europe: {
    id: "europe",
    country: "Europe (DACH & Western Europe)",
    flag: "🇪🇺",
    targetMarket: "Multi-Country Rating Harmonization & Carrier BSS Modernization",
    relevantExperience: [
      "Orchestrated System Integration Testing (SIT) and rating validation for Nokia Hutchison 3Group (3Austria, 3Ireland, 3Italy).",
      "Harmonized multi-country roaming tariffs (TAP3/RAP), voucher lifecycles, and CSG Singleview postpaid engines.",
      "Awarded multiple Capgemini Customer Delight and Delivery Excellence awards for European carrier satisfaction."
    ],
    keyClientMatches: ["Nokia 3Austria", "Nokia 3Ireland", "3Italy", "Deutsche Telekom", "Orange"],
    visaReadiness: "Ready for EU Blue Card sponsorship and European on-site deployment assignments."
  }
};

const TELECOM_SKILL_CHECKLIST = [
  { category: "Carrier Protocols", skills: ["Diameter Gy (Online Charging)", "Diameter Ro (Credit Control)", "3GPP 32.296 OCS/CCS", "Real SIM 4G LTE Testing", "Real SIM 5G NSA Testing", "SMS / Voice Channels"] },
  { category: "Billing & Invoicing", skills: ["Nokia WING 10M+ Migration", "Monthly Rating Report (MRR)", "MRC & NRC Rate Plans", "Individual / Flex / Fixed Plans", "Automated SFTP Batch Push", "Automated PDF Invoicing", "CSG Singleview Billing", "Wholesale VZ450 / BDT"] },
  { category: "Agile QA Leadership", skills: ["Managed 15+ QA Engineers", "Agile / Scrum Sprint Governance", "Carrier UAT Acceptance", "JIRA & Zephyr Defect Triage", "Zero Defect Leakage", "-50% Testing Effort Optimization"] },
  { category: "Tech & Architecture", skills: ["PG Software Dev (IIIT Bangalore)", "RESTful APIs & Postman", "Swagger / OpenAPI 3.0", "TM Forum ODA (TMF620/622)", "JSON / XML Schema Audits", "SQL & Database Ledger Checks"] }
];

export default function RecruiterHub({ 
  onOpenResume, 
  onExploreProjects,
  onNavigateSection 
}: RecruiterHubProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryFilter>("all");
  const [activeTab, setActiveTab] = useState<"summary" | "countries" | "checklist" | "fastfacts">("summary");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const activeHighlight = COUNTRY_HIGHLIGHTS[selectedCountry];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vetrivelm02@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyRecruiterBrief = () => {
    const brief = `VETRIVEL MUTHUSAMY - RECRUITER BRIEF
Role: Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager
Experience: 10+ Years (Mobile OSS/BSS, Nokia WING 10M+, AT&T IoT, CSG Singleview)
Management Scale: Managed 15+ QA Engineers under Agile/Scrum
Domain: Diameter Gy/Ro, 4G/5G NSA Real SIM, MRR Invoicing, MRC/NRC Rate Plans, TM Forum ODA
Education: PG Diploma in Software Development (IIIT Bangalore) | MS in Software Engineering (LJMU)
Target Locations: Singapore, United Kingdom, United States (100% Relocation & Travel Ready)
Email: vetrivelm02@gmail.com | Phone: (+91) 9916008877 | Portfolio: https://vetrivelmpv.com`;

    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <section 
      id="recruiter-hub" 
      className="py-16 md:py-24 px-4 md:px-8 xl:px-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500 relative"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 select-none">
              <span className="h-[1px] w-6 bg-sky-500" />
              <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={13} className="animate-pulse" />
                <span>EXECUTIVE RECRUITER & HIRING HUB</span>
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              Recruiter Quick-Look Brief
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Designed for Hiring Managers & Executive Recruiters seeking specialized Telecom QA leadership, 15+ team Agile management, and global carrier delivery.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenResume}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Download size={14} />
              <span>Executive CV (PDF)</span>
            </button>

            <button
              onClick={handleCopyRecruiterBrief}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase glass-card border border-slate-300 dark:border-slate-700 hover:border-sky-500/50 text-slate-800 dark:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedBrief ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span>{copiedBrief ? "Brief Copied!" : "Copy Recruiter Brief"}</span>
            </button>
          </div>
        </div>

        {/* Recruiter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "summary"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Briefcase size={14} />
            <span>30-Second Executive Summary</span>
          </button>

          <button
            onClick={() => setActiveTab("countries")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "countries"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Globe2 size={14} />
            <span>Target Country Alignment</span>
          </button>

          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "checklist"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <CheckCircle2 size={14} />
            <span>Telecom Competency Checklist</span>
          </button>

          <button
            onClick={() => setActiveTab("fastfacts")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "fastfacts"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Award size={14} />
            <span>Education & Verified Awards</span>
          </button>
        </div>

        {/* TAB 1: 30-SECOND EXECUTIVE SUMMARY */}
        {activeTab === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            
            {/* Left 8 Cols: Key Metric Cards */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-sans">
                    10+ Years
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                    Telecom Domain Mastery
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Mobile OSS/BSS, Nokia WING, CSG Singleview & Convergent Charging.
                  </p>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-sans">
                    15+ Engineers
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                    Managed under Agile
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Sprint planning, defect triage (JIRA), risk-based testing & UAT sign-offs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">
                    10.4M+ Subs
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                    Nokia WING Migration
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    100% data fidelity, zero revenue leakage, MRR batch runs & SFTP invoicing.
                  </p>
                </div>
              </div>

              {/* Core Candidate Pitch */}
              <div className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  <ShieldCheck size={16} className="text-sky-500" />
                  <span>THE RECRUITER VALUE PROPOSITION</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Vetrivel Muthusamy bridges the critical gap between <strong>complex telecom business rules</strong>, <strong>carrier protocol governance (Gy/Ro, 4G/5G NSA)</strong>, and <strong>modern software engineering teams</strong>. With a <strong>Postgraduate in Software Development</strong> and over a decade of carrier QA leadership, he provides executive confidence, cuts manual test effort in half (-50%), and ensures zero defect leakage for Tier-1 operators.
                </p>
                
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 text-[11px] font-mono font-bold text-sky-700 dark:text-sky-400">
                    Nokia WING 10M+ Hub
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    AT&T Connection Manager
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-400">
                    British Telecom Retail
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-slate-900 border border-purple-200 dark:border-slate-800 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-400">
                    Inmarsat Global Satellite
                  </span>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Quick Contact & Coordinates */}
            <div className="lg:col-span-4 p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-5">
              
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  DIRECT RECRUITER CONTACT
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                  Vetrivel Muthusamy
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Bengaluru, India • Available for Global Roles
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Email:</span>
                  <button
                    onClick={handleCopyEmail}
                    className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedEmail ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span>{copiedEmail ? "Copied!" : "vetrivelm02@gmail.com"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                  <a href="tel:+919916008877" className="font-bold text-slate-800 dark:text-slate-200 hover:text-sky-500">
                    (+91) 9916008877
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">LinkedIn:</span>
                  <a 
                    href="https://linkedin.com/in/vetrivelm" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>/in/vetrivelm</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Relocation:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    100% Ready (SG • UK • US)
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenResume}
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bot size={15} />
                  <span>AI Custom Tailor CV</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TARGET COUNTRY ALIGNMENT */}
        {activeTab === "countries" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Country Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(["all", "singapore", "uk", "usa", "europe"] as CountryFilter[]).map((countryKey) => {
                const item = COUNTRY_HIGHLIGHTS[countryKey];
                return (
                  <button
                    key={countryKey}
                    onClick={() => setSelectedCountry(countryKey)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      selectedCountry === countryKey
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.country}</span>
                  </button>
                );
              })}
            </div>

            {/* Country Deep Dive Card */}
            <div className="p-6 md:p-8 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white font-sans">
                    <span>{activeHighlight.flag}</span>
                    <span>{activeHighlight.country}</span>
                  </div>
                  <div className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold">
                    {activeHighlight.targetMarket}
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
                  {activeHighlight.visaReadiness}
                </div>
              </div>

              {/* Highlights & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                <div className="md:col-span-8 space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    TARGET DOMAIN ALIGNMENT
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                    {activeHighlight.relevantExperience.map((exp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-4 space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    KEY CLIENT & CARRIER MATCHES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeHighlight.keyClientMatches.map((client, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                      >
                        {client}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={onOpenResume}
                      className="w-full py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-sky-500 hover:bg-sky-400 text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Bot size={14} />
                      <span>Tailor CV for {activeHighlight.country}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: TELECOM COMPETENCY CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            {TELECOM_SKILL_CHECKLIST.map((group, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 text-left space-y-3"
              >
                <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                  {group.category}
                </div>
                <ul className="space-y-2">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: EDUCATION & VERIFIED HONORS */}
        {activeTab === "fastfacts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn text-left">
            
            {/* Education Card */}
            <div className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu size={15} />
                <span>ACADEMIC FOUNDATION & DEGREES</span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    PG Diploma in Software Development (Full Stack)
                  </div>
                  <div className="text-[11px] text-sky-600 dark:text-sky-400 font-mono">
                    IIIT Bangalore | March 2020 – May 2021
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Academic specialization in full-stack architecture, API design, microservices, and database engineering.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    Master of Science (MS) in Computer Software Engineering
                  </div>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono">
                    Liverpool John Moores University (UK) | July 2021 – July 2022
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Advanced software engineering methodology, cloud distributed systems, and quality assurance.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    Bachelor of Computer Application (BCA)
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                    Valluvar College of Science and Management | 2009 – 2012
                  </div>
                </div>
              </div>
            </div>

            {/* Awards Card */}
            <div className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Award size={15} />
                <span>VERIFIED CORPORATE AWARDS & HONORS</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Customer Delight Award</span>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Capgemini Engineering</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Recognized for prioritizing customer satisfaction and delivering zero-defect carrier releases (Q3 2022).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Outstanding Contribution in Delivery Award</span>
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">Capgemini ER&D</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Acknowledged for excellence in telecom carrier research & development delivery (Q2 2022).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Star Performer Award</span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Cognizant</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Awarded for high-quality contributions on the Inmarsat BTP satellite billing transformation project.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/20 space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>CIT Domain Excellence Award</span>
                    <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">Tech Mahindra</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Awarded for deep telecom domain knowledge and execution on British Telecom retail programs.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
