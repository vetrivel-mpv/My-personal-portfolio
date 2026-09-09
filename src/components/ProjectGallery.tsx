import React, { useState, useMemo } from "react";
import { 
  Search, 
  FolderGit2, 
  Sparkles, 
  Filter, 
  ExternalLink, 
  ArrowUpRight, 
  X, 
  Layers, 
  Cpu, 
  Compass, 
  BookOpen, 
  AlertCircle, 
  Code, 
  Database, 
  Terminal, 
  CheckSquare, 
  Wrench,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Github,
  Star,
  GitFork
} from "lucide-react";
import { Project } from "../types";
import SectionHeader from "./SectionHeader";

interface ProjectDetailDeepDive {
  role: string;
  challenges: string[];
  granularStack: string[];
  metrics: string[];
}

const PROJECT_DEEP_DIVES: Record<string, ProjectDetailDeepDive> = {
  "proj-1": {
    role: "Senior Telecom BSS QA Consultant (Inmarsat BTP & Verizon Wholesale)",
    challenges: [
      "Interfacing complex legacy Amdocs & Singleview subscriber databases with external wholesale partner middleware channels.",
      "Validating massive billing transaction volumes in dynamic test environments without causing state overlaps.",
      "Auditing multi-vendor customer agreements against specific custom invoicing rules to eliminate billing leaks."
    ],
    granularStack: [
      "CSG Singleview Billing Core",
      "VZ450 / Bill Data Tape (BDT)",
      "Diameter Rf / Gz Mediation",
      "Oracle Advanced SQL & PL/SQL Audits",
      "TM Forum SID Schema Modeling",
      "Postman REST API Validation"
    ],
    metrics: [
      "Honored with Cognizant Star Performer Award on Inmarsat BTP satellite billing transformation.",
      "Eliminated 100% of major partner SLA contract discrepancies during wholesale mediation.",
      "Saved approx 12 hours of manual balance checking workloads per regression cycle."
    ]
  },
  "proj-2": {
    role: "Agile QA Delivery Lead (Managed 15+ QA Engineers, -50% Effort)",
    challenges: [
      "Managing and mentoring 15+ QA engineers across parallel sprint delivery tracks in an Agile/Scrum environment.",
      "Structuring modular test case architectures to replace slow, redundant manual test workflows.",
      "Establishing carrier-grade defect triage governance in JIRA/Zephyr with zero P1/P2 defect escapes."
    ],
    granularStack: [
      "Agile / Scrum Team Leadership (15+ Engineers)",
      "Sprint Planning & Velocity Tracking",
      "JIRA & Zephyr Defect Lifecycle Management",
      "Carrier UAT Acceptance Governance",
      "Modular Functional Test Architecture"
    ],
    metrics: [
      "Cut manual testing effort in half (-50%) and reduced post-release issues by 30%.",
      "Awarded Capgemini Outstanding Contribution in Delivery & Customer Delight awards."
    ]
  },
  "proj-3": {
    role: "Telecom Rating & Revenue Assurance Specialist (Nokia 3Group Europe)",
    challenges: [
      "Consolidating multiple international rate structures across Austria, Ireland, and Italy without service disruption.",
      "Crafting rigorous functional verification models to audit diverse subscriber voucher usage across distinct geographic regions.",
      "Ensuring perfect database schema synchronization prior to launching high-value billing pipelines."
    ],
    granularStack: [
      "CSG International Billing Suite",
      "Diameter Ro / Gy Convergent Charging (OCS)",
      "Relational Database Schema Auditing",
      "Revenue Assurance & Fraud Detection Checks",
      "Multi-Country Roaming Rate Validation"
    ],
    metrics: [
      "Ensured zero post-release billing leaks or SLA breaks on multi-country European operations.",
      "Managed safe balance migrations representing over $4M+ of active wholesale accounts."
    ]
  },
  "proj-4": {
    role: "Principal QA Lead & UAT Manager (British Telecom Retail Core)",
    challenges: [
      "Formulating exhaustive end-to-end UAT scenarios for complex employee discount and retail order fulfillment rules.",
      "Resolving ordering request mismatches when upstream CRM records contained missing metadata fields.",
      "Maintaining high-cadence testing grids across multiple parallel system build versions."
    ],
    granularStack: [
      "TM Forum TMF622 (Product Ordering)",
      "TM Forum TMF620 (Product Catalog)",
      "HP ALM / Quality Center Governance",
      "Microsoft SQL Server Core Schema Audit",
      "SOAP / REST Web Service Validation"
    ],
    metrics: [
      "Shipped multiple high-value retail releases with zero critical P1/P2 failures.",
      "Sustained 100% test planning compliance scores under strict BT group operational metrics."
    ]
  },
  "proj-5": {
    role: "Lead Telecom UAT & Migration Consultant (Nokia WING 10M+)",
    challenges: [
      "Orchestrating large-scale UAT and production migration for 10 Million+ subscribers across Nokia WING (Worldwide IoT Network Grid) Digital Hub.",
      "Validating Diameter Gy and Ro online charging triggers, real-time balance reservations, quota threshold events, and session teardowns.",
      "Executing rigorous Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data) from India remote test centers.",
      "Managing complex Monthly Rating Report (MRR end-of-day / end-of-month batch runs) with deep charging attribute analysis.",
      "Configuring multi-tier Rate Plans (Individual, Flex, Fixed rate plans) and validating MRC (Monthly Recurring Charges) and NRC (Non-Recurring Charges).",
      "Designing automated secure SFTP batch file transfer pipelines for CDR feeds and end-to-end customer Invoice PDF generation based on MRR."
    ],
    granularStack: [
      "Nokia WING Digital Hub Platform",
      "Diameter Gy & Ro Online Charging (OCS)",
      "4G LTE & 5G NSA Real SIM Testbeds",
      "Monthly Rating Report (MRR) Engine",
      "MRC / NRC Rating Engine Configs",
      "Automated SFTP Batch Pipelines",
      "Automated Customer Invoice PDF Engine",
      "Oracle PL/SQL Billing Ledgers"
    ],
    metrics: [
      "Successfully migrated 10M+ active IoT/cellular subscriber accounts with 100% data integrity.",
      "Zero billing leakage across multi-country real SIM 4G/5G NSA charging sessions.",
      "100% on-time MRR batch rating runs and automated customer invoice PDF delivery."
    ]
  },
  "proj-6": {
    role: "Principal IoT QA Specialist (AT&T Connection Manager Platform)",
    challenges: [
      "Leading verification of enterprise-grade IoT device usage tracking and rating for Fortune 500 enterprise fleets on AT&T Connection Manager.",
      "Ingesting high-frequency SIM telemetry signals and validating policy-based data quota throttling in real-time.",
      "Bridging raw device data consumption into wholesale enterprise billing mediation and automated usage threshold alerts."
    ],
    granularStack: [
      "AT&T Connection Manager Platform",
      "Enterprise IoT SIM Telemetry Verification",
      "Real-Time Policy & Throttling Engine",
      "Rate Plan Models (Individual, Flex, Fixed)",
      "Enterprise Invoicing Mediation"
    ],
    metrics: [
      "Delivered real-time telemetry verification across hundreds of thousands of active enterprise IoT devices.",
      "Eliminated overage billing disputes through automated threshold alerts and dynamic policy controls."
    ]
  },
  "proj-fs-1": {
    role: "Technical QA Architect (TM Forum ODA & Open API Harness)",
    challenges: [
      "Verifying RESTful APIs implementing TM Forum Open Digital Architecture (TMF620/622/638/679).",
      "Validating event payloads streamed via Kafka against TM Forum SID data schemas.",
      "Bridging developer microservice contracts with functional business requirements."
    ],
    granularStack: [
      "PG in Software Development",
      "TM Forum TMF620 / TMF622 / TMF679",
      "OpenAPI 3.0 & Swagger UI",
      "RESTful API & JSON/XML Validation",
      "Postman API Test Suites"
    ],
    metrics: [
      "Validated against TM Forum SID 21.0 conformance suites with 100% pass score.",
      "Established standard API test validation harness for enterprise carrier integrations."
    ]
  },
  "proj-fs-2": {
    role: "Lead QA Automation Strategist (Distributed Test Architecture)",
    challenges: [
      "Architecting scalable test strategy to eliminate manual regression bottlenecks across carrier web and mobile portals.",
      "Implementing structured page object models and parallel test runners for cross-browser verification.",
      "Integrating quality gates into automated CI/CD deployment pipelines."
    ],
    granularStack: [
      "Selenium Test Architecture",
      "Parallel Test Execution Strategies",
      "CI/CD Quality Gates",
      "Risk-Based Test Coverage Metrics"
    ],
    metrics: [
      "Reduced regression cycle execution times by 40% with zero defect leakage.",
      "Guaranteed test stability across multi-browser carrier customer portals."
    ]
  },
  "proj-fs-3": {
    role: "BSS/OSS QA Specialist (CDR Mediation & Rating Audit Engine)",
    challenges: [
      "Validating high-volume batch CDR files for mediation and rating accuracy without record loss.",
      "Auditing standard VZ450 Bill Data Tape (BDT) settlement records for Tier-1 carrier invoicing.",
      "Reconciling ledger discrepancies between rating engines and billing ledgers."
    ],
    granularStack: [
      "Diameter Ro / Gy Protocol Audits",
      "Oracle PL/SQL Billing Ledger Verification",
      "CDR Reconciliation Matrices",
      "Revenue Assurance Auditing"
    ],
    metrics: [
      "100% Zero financial leakage during simulated wholesale carrier interconnect settlement.",
      "Sustained 15,000 TPS peak batch CDR throughput."
    ]
  },
  "proj-fs-4": {
    role: "Full-Stack AI Application Architect",
    challenges: [
      "Integrating Gemini AI 2.5 Flash with strict structured JSON output parsing and custom error fallback.",
      "Building client-side markdown compilation and formatted PDF document export.",
      "Optimizing token latency for near-instant AI resume generation."
    ],
    granularStack: [
      "Node.js & Next.js (TypeScript)",
      "Tailwind CSS & Glassmorphism Tokens",
      "Google Gen AI SDK (Gemini 2.5 Flash)",
      "Express.js & PDFKit Vector Engine",
      "Playwright & Automated Testing",
      "Print CSS & Markdown Parsers"
    ],
    metrics: [
      "Sub-2s end-to-end Job Description analysis and tailored CV generation.",
      "Over 95% ATS keyword matching accuracy across telecom and cloud roles."
    ]
  }
};

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const list = ["All"];
    projects.forEach((p) => {
      if (!list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techs.some((t) => t.toLowerCase().includes(q)) ||
        p.impact.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const detailInfo = selectedProjectForDetail 
    ? PROJECT_DEEP_DIVES[selectedProjectForDetail.id] || {
        role: "Lead Systems Architect",
        challenges: [selectedProjectForDetail.description],
        granularStack: selectedProjectForDetail.techs,
        metrics: [selectedProjectForDetail.impact]
      }
    : null;

  return (
    <section 
      id="projects" 
      className="py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-slate-50 text-slate-900 border-b border-slate-200 transition-colors duration-500 relative"
    >
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            badgeNumber="05"
            badgeText="ENTERPRISE ENGAGEMENTS & CODE"
            badgeColor="sky"
            title="Enterprise Engagements &"
            gradientWord="Full-Stack Projects"
            description="Explore enterprise Telecom OSS/BSS case studies alongside modern open-source Full-Stack developments in Node.js, Next.js, Playwright automated testing, TM Forum Open APIs, and AI engineering."
          />

          {/* Total count badge */}
          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 glass-pill rounded-xl text-xs font-mono text-slate-700 self-start lg:self-end pb-2 shadow-xs">
            <FolderGit2 size={14} className="text-sky-600" />
            <span>{filteredProjects.length} SHOWCASED PROJECTS</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 select-none">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl glass-card border border-slate-200 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tech or keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid: 3-column Widescreen Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProjectForDetail(project)}
              className="group p-6 sm:p-7 rounded-3xl glass-card border border-slate-200 hover:border-sky-500/50 bg-white transition-all duration-300 space-y-4 cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01]"
            >
              {/* Category & Icon & GitHub Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{project.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="View repository on GitHub"
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold"
                    >
                      <Github size={13} />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                  )}

                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-sky-700 group-hover:translate-x-1 transition-transform">
                    <span>DEEP DIVE</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors font-sans">
                    {project.title}
                  </h3>

                  {/* GitHub stars if present */}
                  {project.stars !== undefined && (
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star size={12} className="fill-amber-400 text-amber-500" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <GitFork size={12} />
                        {project.forks}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Impact Callout */}
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-start gap-2 text-xs font-sans">
                <Sparkles size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-left">
                  <span className="font-mono font-bold text-emerald-800 text-[10px] uppercase block">MEASURABLE IMPACT</span>
                  <span className="text-slate-800 text-[11.5px] leading-snug">{project.impact}</span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-lg text-[10.5px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Case Study Modal */}
        {selectedProjectForDetail && detailInfo && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedProjectForDetail(null)}
          >
            <div
              className="w-full max-w-3xl rounded-3xl glass-panel bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto animate-scale-up text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedProjectForDetail.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200 uppercase">
                      {selectedProjectForDetail.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-sans">
                    {selectedProjectForDetail.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Role: <strong className="text-sky-700">{detailInfo.role}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedProjectForDetail.githubUrl && (
                    <a
                      href={selectedProjectForDetail.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-sky-600 transition-colors text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Github size={13} />
                      <span>Repo</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProjectForDetail(null)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  EXECUTIVE SUMMARY
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {selectedProjectForDetail.description}
                </p>
              </div>

              {/* Architectural Challenges Overcome */}
              <div className="space-y-2">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-rose-700 font-bold block flex items-center gap-1.5">
                  <AlertCircle size={13} />
                  <span>COMPLEX CHALLENGES OVERCOME</span>
                </span>
                <ul className="space-y-2 text-xs text-slate-700 font-sans">
                  {detailInfo.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Measurable Verified Outcomes */}
              <div className="space-y-2">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-emerald-800 font-bold block flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>VERIFIED OUTCOMES & METRICS</span>
                </span>
                <ul className="space-y-2 text-xs text-slate-700 font-sans">
                  {detailInfo.metrics.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <Sparkles size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-emerald-900">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Granular Technology Stack */}
              <div className="space-y-2">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  TECHNICAL INFRASTRUCTURE & TOOLS
                </span>
                <div className="flex flex-wrap gap-2">
                  {detailInfo.granularStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl text-xs font-mono bg-slate-100 text-sky-800 border border-slate-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedProjectForDetail(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors cursor-pointer shadow-xs"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
