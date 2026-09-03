import React, { useState } from "react";
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Globe2, 
  Radio, 
  Cpu, 
  Bot, 
  ShieldCheck, 
  Plane, 
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Zap,
  Terminal,
  Award
} from "lucide-react";

interface StoryboardChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  badge: string;
  badgeColor: string;
  location: string;
  telecomDomain: string;
  narrative: string[];
  keyAchievements: string[];
  architectureStack: string[];
}

export default function ComicStoryboard() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const chapters: StoryboardChapter[] = [
    {
      id: "chapter-1",
      number: "EPISODE 01",
      title: "The 10-Million Subscriber Migration",
      subtitle: "Nokia WING Digital Hub & Convergent Ro/Gy Charging",
      imageSrc: "/assets/vetrivel_comic_noc_commander.jpg",
      badge: "NOKIA WING 10M+",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
      location: "India Remote Test Centers → Global IoT Grid",
      telecomDomain: "Diameter Gy/Ro, 4G/5G NSA Real SIMs, Monthly Rating Report (MRR)",
      narrative: [
        "When a global tier-1 carrier prepared to migrate over 10 Million active IoT and cellular subscribers to Nokia WING (Worldwide IoT Network Grid), zero margin for error existed.",
        "Vetrivel led the end-to-end UAT and migration strategy, validating real-time Diameter Gy/Ro credit-control session triggers, dynamic quota threshold events, and Real SIMs across 4G LTE and 5G NSA networks for Voice, SMS, and high-throughput Data.",
        "Engineered end-of-day Monthly Rating Report (MRR) batch executions, Individual/Flex/Fixed rate plan configurations (MRC & NRC charges), automated SFTP pipelines, and automated customer Invoice PDF generation with 100% zero revenue leakage."
      ],
      keyAchievements: [
        "10,480,000+ active IoT/cellular subscriber SIM accounts migrated with 100% data fidelity.",
        "Zero billing leakage across multi-country real SIM 4G/5G NSA sessions.",
        "100% on-time MRR batch rating runs and automated customer invoice PDF delivery."
      ],
      architectureStack: [
        "Nokia WING Digital Hub",
        "Diameter Gy & Ro (3GPP 32.296 OCS)",
        "4G LTE & 5G NSA Real SIM Testbeds",
        "Monthly Rating Report (MRR)",
        "MRC / NRC Rating Configs",
        "Automated SFTP Pipelines",
        "Automated PDF Invoicing Engine"
      ]
    },
    {
      id: "chapter-2",
      number: "EPISODE 02",
      title: "The Satellite Teleport & Enterprise IoT Telemetry",
      subtitle: "Inmarsat Global Satellite & AT&T Connection Manager",
      imageSrc: "/assets/vetrivel_comic_satellite_iot.jpg",
      badge: "INMARSAT & AT&T IoT",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      location: "Earth Station Teleport → Fortune 500 Enterprise Fleets",
      telecomDomain: "High-Frequency Telemetry Ingestion & Dynamic Quota Throttling",
      narrative: [
        "Managing mission-critical connectivity over maritime satellite arrays and enterprise IoT device fleets requires sub-second visibility into raw data consumption.",
        "On the Inmarsat BTP project (where he received the Star Performer Award) and AT&T Connection Manager, Vetrivel architected real-time telemetry ingestion pipelines that track live device SIM consumption across thousands of enterprise fleets.",
        "Implemented proactive policy-based data quota throttling at 99% consumption thresholds, eliminating overage billing disputes and synchronizing usage directly into wholesale billing mediation ledgers."
      ],
      keyAchievements: [
        "Honored with Cognizant Star Performer Award on Inmarsat BTP satellite billing transformation.",
        "Sub-15ms telemetry ingestion across hundreds of thousands of active enterprise IoT devices on AT&T Connection Manager.",
        "Eliminated billing overage disputes through automated threshold alerts and policy controls."
      ],
      architectureStack: [
        "Inmarsat BTP Core",
        "AT&T Connection Manager Core",
        "Enterprise IoT SIM Telemetry APIs",
        "Policy Throttling State Machines",
        "Spring Boot 3.3 Reactive Microservices",
        "Kafka Event Streaming",
        "CSG Singleview BSS"
      ]
    },
    {
      id: "chapter-3",
      number: "EPISODE 03",
      title: "Full-Stack Microservices & ODA Architecture",
      subtitle: "Java 21 Virtual Threads, Spring Boot 3.3 & TM Forum Open APIs",
      imageSrc: "/assets/vetrivel_comic_cloud_architect.jpg",
      badge: "FULL-STACK & TM FORUM ODA",
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      location: "High-Rise Cloud Lab → Global Carrier Cloud",
      telecomDomain: "TM Forum ODA (TMF620, TMF622, TMF638, TMF679), Kafka & Docker",
      narrative: [
        "An elite Solution Architect speaks both carrier protocol standards and modern software engineering fluently.",
        "Vetrivel built production-ready open-source reference implementations of TM Forum Open Digital Architecture (ODA) gateways in React 19, Java 21, and Spring Boot 3.3.",
        "Leveraging Java 21 Virtual Threads and reactive Spring WebFlux, his reference microservices process over 15,000 TPS with Kafka event streaming, Docker Compose orchestration, and automated OpenAPI 3.0 Swagger compliance testing."
      ],
      keyAchievements: [
        "Engineered open-source `telco-oda-api-gateway` and `convergent-billing-mediation-engine`.",
        "Validated against TM Forum SID 21.0 conformance suites with 100% pass score.",
        "Processes 15,000+ simulated order events per second under sub-15ms latency."
      ],
      architectureStack: [
        "React 19 & TypeScript",
        "Java 21 (Virtual Threads)",
        "Spring Boot 3.3 WebFlux",
        "Apache Kafka Streams",
        "Docker & Kubernetes (AWS EKS)",
        "TM Forum TMF620 / TMF622 / TMF679"
      ]
    },
    {
      id: "chapter-4",
      number: "EPISODE 04",
      title: "The Autonomous AI Telco Diagnostic Lab",
      subtitle: "Agentic AI, LangGraph Anomaly Detectors & Gemini LLMs",
      imageSrc: "/assets/vetrivel_comic_ai_laboratory.jpg",
      badge: "AI-NATIVE ARCHITECTURE",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      location: "Autonomous AI Research & Operations Center",
      telecomDomain: "Autonomous Networks (AN Level 4), Self-Healing Mediation & Root Cause Analysis",
      narrative: [
        "Generic AI developers lack understanding of Diameter Gy/Ro charging triggers, Singleview state machines, and SNMP trap storms. Vetrivel bridges 11+ years of carrier domain custody with Agentic AI.",
        "Directing multi-agent LangGraph workflows and Gemini AI models, his systems ingest real-time telemetry anomalies (e.g. roaming link buffer congestions) and execute autonomous Root Cause Analysis (RCA).",
        "The AI copilot dynamically triggers microservice auto-scaling, reroutes traffic to standby CCS charging nodes, and preserves carrier SLA uptime with zero unbilled revenue leakage."
      ],
      keyAchievements: [
        "Automates Mean-Time-To-Repair (MTTR) by up to 60% via autonomous AI diagnostic workflows.",
        "Reconciles unbilled CDR discrepancies against rating ledgers in milliseconds.",
        "Designed real-time interactive AI Copilot simulator directly integrated into executive portfolio."
      ],
      architectureStack: [
        "Gemini 2.5 Flash LLMs",
        "LangChain & LangGraph Multi-Agent Workflows",
        "AIOps Telco Telemetry Anomaly Detectors",
        "Vector Embeddings & Semantic Search",
        "Reactive Circuit-Breakers",
        "Self-Healing Network Intent (IBN)"
      ]
    },
    {
      id: "chapter-5",
      number: "EPISODE 05",
      title: "Global Mobility & C-Level Keynote Leadership",
      subtitle: "Worldwide On-Site Architecture & Enterprise Delivery",
      imageSrc: "/assets/vetrivel_comic_executive_stage.jpg",
      badge: "100% WORLDWIDE TRAVEL READY",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      location: "EMEA • Americas • APAC • United Kingdom • Europe",
      telecomDomain: "Executive Advisory, Pre-Sales Architecture & Zero-Defect Delivery",
      narrative: [
        "From presenting architectural roadmaps on international keynote stages to conducting intensive on-site discovery workshops across London, Dallas, and Europe, Vetrivel thrives on global mobility.",
        "Recipient of Capgemini Customer Delight and Outstanding Contribution in Delivery awards, he cut manual testing efforts in half (-50%) and slashed regression run times by 40% using multithreaded Selenium Grid frameworks.",
        "100% enthusiastic and available for frequent international travel to champion large-scale carrier transformations, lead cross-functional squads, and ensure zero-leakage enterprise success."
      ],
      keyAchievements: [
        "Honored with Capgemini Customer Delight Award (Q3 2022) & Outstanding Delivery in ER&D (Q2 2022).",
        "Cut manual testing effort by 50% and reduced post-release issues by 30%.",
        "100% Enthusiastic and prepared for frequent international deployments worldwide."
      ],
      architectureStack: [
        "Capgemini Lead Delivery Method",
        "Executive C-Level Phrasing & Advisory",
        "Selenium Grid Distributed Docker Cluster",
        "Multi-Carrier Harmonization (BT, VZ, AT&T, Nokia)",
        "Frequent International Travel Readiness"
      ]
    }
  ];

  const currentChapter = chapters[activeChapterIndex];

  const handleNextChapter = () => {
    setActiveChapterIndex((prev) => (prev + 1) % chapters.length);
  };

  const handlePrevChapter = () => {
    setActiveChapterIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  return (
    <section 
      id="storyboard" 
      className="py-24 px-4 md:px-8 xl:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 right-5 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-[550px] h-[550px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2 select-none">
            <span className="h-[1px] w-6 bg-purple-500" />
            <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest">
              INTERACTIVE GRAPHIC NOVEL CHRONICLES
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                Chronicles of a Telecom Architect
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Step inside the real-world missions: From migrating 10M+ subscribers on Nokia WING and managing satellite telemetry to engineering full-stack cloud meshes and autonomous AI copilots.
              </p>
            </div>

            {/* Chapter Indicator Navigation */}
            <div className="flex items-center gap-2 select-none self-start lg:self-auto">
              <button
                onClick={handlePrevChapter}
                className="w-10 h-10 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                title="Previous Episode"
              >
                <ChevronLeft size={18} />
              </button>
              
              <div className="px-4 py-2 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white shadow-sm">
                EPISODE {activeChapterIndex + 1} / {chapters.length}
              </div>

              <button
                onClick={handleNextChapter}
                className="w-10 h-10 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                title="Next Episode"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Selection Pill Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 select-none">
          {chapters.map((chap, idx) => {
            const isSelected = idx === activeChapterIndex;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-purple-500 shadow-lg shadow-purple-500/15 scale-[1.02]"
                    : "glass-card border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">
                    {chap.number}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />}
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white font-sans truncate block">
                  {chap.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate block">
                  {chap.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Comic Showcase Stage (Graphic Novel Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 7 COLS: Cinematic Comic Illustration Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl group flex-grow bg-slate-950 flex flex-col justify-between">
              
              {/* Image Container with Zoom & Hover Scanlines */}
              <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] overflow-hidden bg-slate-950">
                <img
                  src={currentChapter.imageSrc}
                  alt={currentChapter.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Comic Halftone & Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Comic Episode Tag Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase bg-slate-950/90 backdrop-blur-md text-purple-300 border border-purple-500/40 shadow-lg">
                    ⚡ {currentChapter.number}
                  </span>
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase border bg-slate-950/80 backdrop-blur-md shadow-lg ${currentChapter.badgeColor}`}>
                    {currentChapter.badge}
                  </span>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-left space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <Globe2 size={13} className="text-sky-400" />
                    <span>MISSION THEATER: {currentChapter.location}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white font-sans">
                    {currentChapter.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-300 font-medium">
                    {currentChapter.subtitle}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 5 COLS: Graphic Novel Script & Architectural Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 space-y-5 shadow-2xl flex-grow flex flex-col justify-between">
              
              {/* Mission Summary & Narrative */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal size={15} className="text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                      EXECUTIVE MISSION BRIEF
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
                    WCAG AA ACCESSIBLE
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {currentChapter.narrative.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Verified Mission Metrics */}
              <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  🏆 VERIFIED ARCHITECTURAL OUTCOMES:
                </span>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200 font-sans">
                  {currentChapter.keyAchievements.map((item, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Protocol Stack Pills */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  ⚙️ DEPLOYED PROTOCOL & TECH STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentChapter.architectureStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold bg-slate-100 dark:bg-slate-950 text-purple-700 dark:text-purple-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
