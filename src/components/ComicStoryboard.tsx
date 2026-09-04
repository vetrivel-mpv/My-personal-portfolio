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
      subtitle: "Nokia WING Digital Hub & Gy/Ro Charging UAT",
      imageSrc: "/assets/vetrivel_comic_noc_commander.jpg",
      badge: "NOKIA WING 10M+ MIGRATION",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
      location: "India Remote Test Centers → Global Carrier IoT Grid",
      telecomDomain: "Diameter Gy/Ro, 4G/5G NSA Real SIMs, Monthly Rating Report (MRR)",
      narrative: [
        "When a Tier-1 global carrier prepared to migrate over 10 Million active IoT and cellular subscribers to Nokia WING (Worldwide IoT Network Grid), there was zero margin for error.",
        "Vetrivel spearheaded the end-to-end UAT and carrier migration strategy, validating real-time Diameter Gy/Ro credit-control session triggers, dynamic quota threshold events, and Real SIMs across 4G LTE and 5G NSA networks for Voice, SMS, and high-throughput Data.",
        "Validated end-of-day Monthly Rating Report (MRR) batch executions, Individual/Flex/Fixed rate plan configurations (MRC & NRC charges), secure SFTP pipelines, and automated customer Invoice PDF generation with 100% zero revenue leakage."
      ],
      keyAchievements: [
        "10,480,000+ active IoT/cellular subscriber SIM accounts migrated with 100% data integrity.",
        "Zero billing leakage across multi-country real SIM 4G/5G NSA network testing.",
        "100% on-time MRR batch rating runs and automated customer invoice PDF delivery via SFTP."
      ],
      architectureStack: [
        "Nokia WING Digital Hub",
        "Diameter Gy & Ro (3GPP 32.296 OCS)",
        "4G LTE & 5G NSA Real SIM Testbeds",
        "Monthly Rating Report (MRR)",
        "MRC / NRC Rating Configs",
        "Secure SFTP Pipelines",
        "Automated PDF Invoicing Engine"
      ]
    },
    {
      id: "chapter-2",
      number: "EPISODE 02",
      title: "Enterprise IoT Telemetry & Satellite Billing",
      subtitle: "AT&T Connection Manager & Inmarsat Global Satellite",
      imageSrc: "/assets/vetrivel_comic_satellite_iot.jpg",
      badge: "AT&T IoT & INMARSAT",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      location: "Enterprise IoT Device Fleet → Maritime Teleport",
      telecomDomain: "Enterprise Device Usage Tracking, Quota Throttling & CSG Singleview",
      narrative: [
        "Managing mission-critical connectivity over enterprise IoT fleets and maritime satellite arrays requires rigorous verification of real-time telemetry and rating rules.",
        "On the AT&T Connection Manager platform and Inmarsat BTP project (where he received the Star Performer Award), Vetrivel led verification of enterprise IoT device tracking platforms across thousands of active fleets.",
        "Validated proactive policy-based data quota throttling at dynamic consumption thresholds, preventing overage billing disputes and ensuring accurate synchronization into wholesale billing mediation ledgers."
      ],
      keyAchievements: [
        "Honored with Cognizant Star Performer Award on Inmarsat BTP satellite billing transformation.",
        "Verified telemetry tracking across hundreds of thousands of active enterprise IoT SIMs on AT&T Connection Manager.",
        "Eliminated billing overage disputes through automated threshold alerts and policy controls."
      ],
      architectureStack: [
        "AT&T Connection Manager Platform",
        "Inmarsat BTP Satellite Core",
        "Enterprise IoT SIM Telemetry Verification",
        "Policy Throttling & Quota Thresholds",
        "Rate Plan Configs (Individual, Flex, Fixed)",
        "CSG Singleview BSS"
      ]
    },
    {
      id: "chapter-3",
      number: "EPISODE 03",
      title: "Tech-Literate QA: Bridging Code & Carrier Business",
      subtitle: "Postgraduate in Software Development & TM Forum ODA",
      imageSrc: "/assets/vetrivel_comic_cloud_architect.jpg",
      badge: "PG SOFTWARE DEV & TECH LITERACY",
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      location: "Engineering Center → Cross-Functional Delivery",
      telecomDomain: "TM Forum ODA (TMF620, TMF622), RESTful APIs, Swagger & Microservices",
      narrative: [
        "The most impactful QA leaders possess deep software literacy to collaborate directly with developers and system architects.",
        "Armed with a Postgraduate Diploma in Software Development, Vetrivel understands modern full-stack architectures, Spring Boot microservices, REST APIs, JSON/XML schemas, and event-driven pipelines.",
        "This academic software engineering foundation allows him to review API contracts, debug network payload issues, analyze database structures, and design foolproof test strategies that software developers respect and trust."
      ],
      keyAchievements: [
        "Completed Postgraduate Diploma in Software Development with distinction in architecture & data models.",
        "Spearheaded API contract validation across TM Forum Open APIs (TMF620 Product Catalog, TMF622 Product Ordering).",
        "Bridges technical engineering squads with business and carrier operations seamlessly."
      ],
      architectureStack: [
        "PG in Software Development",
        "TM Forum ODA & Open APIs (TMF620/TMF622)",
        "REST API Contract Testing (Postman/Swagger)",
        "Microservices Architecture Comprehension",
        "SQL Database Schema Auditing",
        "Event-Driven Architecture (Kafka Concepts)"
      ]
    },
    {
      id: "chapter-4",
      number: "EPISODE 04",
      title: "Agile QA Leadership & -50% Testing Effort",
      subtitle: "Managing 15+ QA Engineers with Zero Defect Leakage",
      imageSrc: "/assets/vetrivel_comic_ai_laboratory.jpg",
      badge: "MANAGED 15+ QA ENGINEERS",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      location: "Agile Delivery Pods → Carrier Production Sign-Off",
      telecomDomain: "Agile/Scrum QA Governance, Sprint Planning, Defect Triage & UAT Sign-Offs",
      narrative: [
        "Leading high-performing quality assurance requires strong mentorship, disciplined Agile processes, and strategic test planning.",
        "Vetrivel managed cross-functional QA teams of over 15 engineers, directing sprint ceremonies, test case design, defect triage meetings, and carrier UAT governance.",
        "By structuring modular test architectures and eliminating redundant test workflows, his leadership cut manual testing cycle times by 50% and achieved a flawless zero P1/P2 defect escape record."
      ],
      keyAchievements: [
        "Managed and mentored high-performing QA teams of 15+ engineers under Agile/Scrum.",
        "Cut manual testing effort in half (-50%) and reduced post-release production issues by 30%.",
        "Achieved 100% on-time sprint deliveries across complex multi-vendor telecom releases."
      ],
      architectureStack: [
        "Agile / Scrum QA Delivery Management",
        "Sprint Planning & Velocity Tracking",
        "Defect Lifecycle Management (JIRA / Zephyr)",
        "Carrier UAT Acceptance Sign-Offs",
        "Risk-Based Testing & Test Coverage Metrics"
      ]
    },
    {
      id: "chapter-5",
      number: "EPISODE 05",
      title: "Overseas Opportunities & Global Client Delivery",
      subtitle: "Targeting Singapore 🇸🇬 • United Kingdom 🇬🇧 • United States 🇺🇸",
      imageSrc: "/assets/vetrivel_comic_executive_stage.jpg",
      badge: "TARGETING OVERSEAS (SG • UK • US)",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      location: "Singapore • London • Dallas • Worldwide Carrier Hubs",
      telecomDomain: "Global Carrier Delivery, Client Advisory, Multi-Vendor Alignment",
      narrative: [
        "With a proven track record delivering Tier-1 carrier transformations across British Telecom (UK), Verizon (US), Inmarsat, AT&T, and Nokia (3Austria, 3Ireland, 3Italy), Vetrivel is ready for international roles.",
        "Recipient of the Capgemini Customer Delight Award and Outstanding Contribution in Delivery Award, he brings a mature, culturally versatile consulting approach.",
        "Actively exploring international opportunities in Singapore, the United Kingdom, and the United States, offering deep telecom domain mastery and Agile QA leadership."
      ],
      keyAchievements: [
        "Honored with Capgemini Customer Delight Award & Outstanding Delivery in ER&D.",
        "Track record delivering for global Tier-1 clients: British Telecom (UK), Verizon (US), Inmarsat, Nokia 3Group.",
        "Actively available for overseas relocation & international deployments (Singapore, UK, USA)."
      ],
      architectureStack: [
        "Global Telecom Carrier Delivery",
        "Executive & Client Stakeholder Alignment",
        "Multi-Vendor Release Management",
        "Cross-Border QA Coordination",
        "Targeting Singapore, UK, USA"
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
