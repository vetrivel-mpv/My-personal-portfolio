import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip
} from "recharts";
import { 
  Layers, 
  Sliders, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Activity, 
  GitBranch, 
  Clock, 
  Terminal, 
  Network,
  Wrench,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Plane,
  Radio,
  Workflow,
  FileCheck,
  Zap,
  Globe2,
  Play,
  RotateCw,
  Orbit,
  Code
} from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  proficiency: number;
  years: number;
  description: string;
  standard?: string;
}

interface DomainSection {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  orbitAngle: number;
  overallRating: number;
  yearsOfExp: number;
  description: string;
  keyHighlight: string;
  operators: string[];
  skills: SkillItem[];
}

export default function SkillMap() {
  const [activeTab, setActiveTab] = useState<"galaxy" | "grid" | "terminal">("galaxy");
  const [selectedDomainId, setSelectedDomainId] = useState<string>("domain-telecom");

  // Terminal simulator state
  const [activeProtocolTest, setActiveProtocolTest] = useState<string>("tmf622");
  const [isExecutingProtocol, setIsExecutingProtocol] = useState(false);
  const [protocolResponse, setProtocolResponse] = useState<{
    endpoint: string;
    status: string;
    protocol: string;
    operatorRef: string;
    payload: any;
  }>({
    endpoint: "POST /tmf-api/productOrderingManagement/v4/productOrder",
    status: "201 CREATED (9ms)",
    protocol: "TM Forum ODA TMF622 & SID 21.0",
    operatorRef: "British Telecom (BT Retail Core Unit)",
    payload: {
      orderId: "ORD-BT-994812",
      customer: "Enterprise Fiber Tier-1",
      carrierSLA: "99.999%",
      ratingEngine: "Singleview Postpaid VZ450",
      mediationStatus: "CONVERGENT_ACTIVE"
    }
  });

  const skillDomains: DomainSection[] = [
    {
      id: "domain-telecom",
      name: "Telecom BSS, Convergent Billing & Revenue Management",
      shortName: "BSS & Singleview",
      tagline: "CSG Singleview, OCS/CCS, Rating Engines, VZ450 Invoicing & Revenue Assurance",
      icon: <Network className="text-sky-500 dark:text-sky-400" size={18} />,
      color: "sky",
      orbitAngle: 0,
      overallRating: 99,
      yearsOfExp: 11,
      description: "Comprehensive architectural custody over postpaid/prepaid rating state machines, wholesale carrier settlements, bill run cycles (BDT/VZ450), and multi-million dollar contract mediation.",
      keyHighlight: "Audited complex billing and mediation integrations for Verizon Wholesale and Inmarsat, completely eliminating post-release contract discrepancies.",
      operators: ["Verizon Wireless (US)", "Inmarsat Satellite", "Nokia 3Group (Austria, Ireland, Italy)"],
      skills: [
        { id: "tel-1", name: "CSG Singleview Billing", proficiency: 98, years: 11, description: "Subscriber schemas, rating engines, billing accounts, invoicing & collections", standard: "Carrier BSS" },
        { id: "tel-2", name: "OCS / CCS Convergent Charging", proficiency: 95, years: 10, description: "Online/Offline charging, Diameter (Ro/Gy/Rf/Gz), real-time balance reservations", standard: "3GPP 32.296" },
        { id: "tel-3", name: "TM Forum ODA & Open APIs", proficiency: 96, years: 9, description: "TMF620 (Catalog), TMF622 (Ordering), TMF638 (Service Inv), TMF679 (Billing)", standard: "TM Forum SID/eTOM" },
        { id: "tel-4", name: "Wholesale Carrier Settlement", proficiency: 97, years: 11, description: "Partner mediation, rate plan setups, Bill Data Tape (BDT), VZ450 invoicing", standard: "Carrier Invoicing" }
      ]
    },
    {
      id: "domain-oss",
      name: "Telecom OSS, Network Topology & Protocol Mediation",
      shortName: "OSS & Protocols",
      tagline: "Southbound/Northbound Mediation, SNMP v2c/v3, NMS/EMS, GPON & 5G/4G Protocol Validation",
      icon: <Radio className="text-emerald-500 dark:text-emerald-400" size={18} />,
      color: "emerald",
      orbitAngle: 72,
      overallRating: 97,
      yearsOfExp: 11,
      description: "Synchronous and asynchronous telemetry collection across physical & logical network resources, FTTH/GPON topology mapping, and protocol analysis.",
      keyHighlight: "Engineered SNMP trap-storm collector throttling scripts, preventing telemetry queue buffer overflows under simulated network disaster traps.",
      operators: ["AT&T Enterprise", "British Telecom Retail", "Nokia Core 3Group"],
      skills: [
        { id: "oss-1", name: "SNMP & Telemetry Collectors", proficiency: 96, years: 11, description: "SNMP v1/v2c/v3 MIB parsing, trap throttling, event correlation, NetFlow", standard: "IETF RFC 3416" },
        { id: "oss-2", name: "5G NR & 4G LTE Protocols", proficiency: 93, years: 9, description: "5G Core SBA HTTP/2, LTE L1/L2/L3 protocol verification, Network Slicing", standard: "3GPP Rel 15/16" },
        { id: "oss-3", name: "GPON / FTTH Network Topology", proficiency: 94, years: 10, description: "Physical fiber distribution, NMS/EMS element management, GIS inventory sync", standard: "ITU-T G.984" },
        { id: "oss-4", name: "Protocol Analyzers & Mocks", proficiency: 95, years: 11, description: "Wireshark packet decoding, Seagull Diameter traffic simulation, RESTCONF/NETCONF", standard: "Protocol Testing" }
      ]
    },
    {
      id: "domain-backend",
      name: "Full-Stack Telco Microservices & Cloud Middleware",
      shortName: "Full-Stack & Java 21",
      tagline: "React 19, TypeScript, Java 21, Spring Boot 3.3, Kafka Streams, Docker & Kubernetes",
      icon: <Database className="text-indigo-500 dark:text-indigo-400" size={18} />,
      color: "indigo",
      orbitAngle: 144,
      overallRating: 95,
      yearsOfExp: 8,
      description: "High-concurrency full-stack pipelines and microservice backbones to process high-velocity subscriber events, asynchronous queue mediation, and reactive UI dashboards.",
      keyHighlight: "Designed custom Spring Boot REST middleware pipelines for mediation streams, decreasing parsing latency by 35% during heavy concurrent bursts.",
      operators: ["Capgemini Enterprise Cloud", "Inmarsat Platform", "BT Digital"],
      skills: [
        { id: "bak-1", name: "Java 21/17 Enterprise Core", proficiency: 95, years: 8, description: "Multithreading, Virtual Threads, concurrency locks, stream pipelines", standard: "Java SE 21" },
        { id: "bak-2", name: "Spring Boot 3.3 & WebFlux", proficiency: 92, years: 7, description: "Reactive microservices, RESTful OpenAPIs, Spring Data JPA, resilient circuit breakers", standard: "Spring Cloud" },
        { id: "bak-3", name: "React 19 & TypeScript", proficiency: 90, years: 6, description: "Modern React architecture, state management, real-time telemetry dashboards", standard: "Frontend" },
        { id: "bak-4", name: "Kafka Streams & Event Mesh", proficiency: 88, years: 5, description: "High-throughput event pub/sub, partition balancing, asynchronous CDR mediation", standard: "Event Mesh" }
      ]
    },
    {
      id: "domain-automation",
      name: "Telecom Test Architecture & Zero-Defect QA",
      shortName: "Selenium Grid",
      tagline: "Selenium Grid Concurrent Clusters, -40% Regression Cycles, Performance & SLA Testing",
      icon: <Cpu className="text-rose-500 dark:text-rose-400" size={18} />,
      color: "rose",
      orbitAngle: 216,
      overallRating: 99,
      yearsOfExp: 11,
      description: "Top-tier test checking architectures using parallel thread pools, scalable Selenium Docker clusters, and automated carrier regression boards.",
      keyHighlight: "Overhauled legacy regression grids at Capgemini into a high-performance Selenium automation pool, reducing execution run-times by 40% with zero P1/P2 leaks.",
      operators: ["Capgemini Quality Delivery Lines", "British Telecom UAT", "Cognizant SIT"],
      skills: [
        { id: "aut-1", name: "Selenium Grid Architecture", proficiency: 99, years: 11, description: "Dockerized scalable grid nodes, concurrent thread execution, robust POM design", standard: "Automation" },
        { id: "aut-2", name: "Telecom E2E UAT Governance", proficiency: 97, years: 11, description: "Cross-system verification, bill run validation, partner rating audit frameworks", standard: "UAT / Release" },
        { id: "aut-3", name: "Performance & Stress Testing", proficiency: 94, years: 9, description: "High-load transaction simulation, SNMP trap storm overloading, latency analysis", standard: "SRE / SLA" },
        { id: "aut-4", name: "CI/CD Pipeline Automation", proficiency: 91, years: 6, description: "GitLab CI/CD automated regression gates on code merge, automated smoke suites", standard: "DevOps" }
      ]
    },
    {
      id: "domain-leadership",
      name: "Global Solution Consulting & Worldwide Mobility",
      shortName: "Global Delivery",
      tagline: "100% Worldwide Travel Readiness, Client Onsite Advisory, TM Forum Architecture Alignment",
      icon: <Plane className="text-amber-500 dark:text-amber-400" size={18} />,
      color: "amber",
      orbitAngle: 288,
      overallRating: 96,
      yearsOfExp: 8,
      description: "Advising enterprise carriers and telecom operators worldwide, leading architecture discovery workshops, pre-sales technical proposals, and multi-vendor delivery.",
      keyHighlight: "Awarded Capgemini Outstanding Contribution in Delivery Award and Customer Delight Award for exceptional carrier client satisfaction.",
      operators: ["British Telecom", "Verizon", "Inmarsat", "AT&T", "Nokia 3Austria/Ireland/Italy"],
      skills: [
        { id: "led-1", name: "Worldwide Client Mobility", proficiency: 100, years: 8, description: "100% ready for frequent international travel across EMEA, Americas, APAC & UK", standard: "Global Travel" },
        { id: "led-2", name: "Pre-Sales & Solution Advisory", proficiency: 94, years: 8, description: "RFP/RFI technical responses, carrier migration blueprints, customer workshops", standard: "Pre-Sales" },
        { id: "led-3", name: "Carrier SLA Assurance", proficiency: 95, years: 11, description: "Zero-defect release criteria, SLA audit governance, executive stakeholder reporting", standard: "SLA Governance" },
        { id: "led-4", name: "Cross-Group Squad Leadership", proficiency: 94, years: 9, description: "Bridging OSS physical network engineers with BSS software and cloud squads", standard: "Leadership" }
      ]
    }
  ];

  const currentDomain = skillDomains.find(d => d.id === selectedDomainId) || skillDomains[0];

  const handleTestProtocol = (protoType: string) => {
    setActiveProtocolTest(protoType);
    setIsExecutingProtocol(true);

    setTimeout(() => {
      if (protoType === "tmf622") {
        setProtocolResponse({
          endpoint: "POST /tmf-api/productOrderingManagement/v4/productOrder",
          status: "201 CREATED (9ms)",
          protocol: "TM Forum ODA TMF622 & SID 21.0",
          operatorRef: "British Telecom (BT Retail Core Unit)",
          payload: {
            orderId: "ORD-BT-994812",
            customer: "Enterprise 5G Slicing Contract",
            carrierSLA: "99.999%",
            ratingEngine: "Singleview Postpaid VZ450",
            mediationStatus: "CONVERGENT_ACTIVE"
          }
        });
      } else if (protoType === "nokia_wing") {
        setProtocolResponse({
          endpoint: "BATCH EXECUTE: Nokia WING MRR (Monthly Rating Report) & SFTP PDF Invoicing",
          status: "200 RUN_COMPLETE (14ms)",
          protocol: "Diameter Gy/Ro OCS & Automated SFTP PDF Delivery",
          operatorRef: "Nokia WING Digital Hub (10 Million+ Subscribers)",
          payload: {
            batchSession: "WING-MRR-BATCH-2026-EOD",
            migratedSubscribers: "10,480,210 Active SIMs",
            networkTypes: ["4G LTE Real SIMs", "5G NSA Real SIMs", "Voice / SMS / Data Channels"],
            ratePlanModels: {
              individualPlans: "MRC: $18.50/mo, NRC: $10.00 Activation",
              flexRatePlans: "Dynamic Tiered Consumption (0-5GB, 5-20GB)",
              fixedPlans: "Enterprise IoT Fleet Fixed Cap"
            },
            sftpStatus: "SECURE_PUSH_CONFIRMED -> /sftp/billing/invoices/2026_09/",
            invoicePdfGeneration: "100% Invoices Compiled & Transmitted to End-Users"
          }
        });
      } else if (protoType === "att_conn_mgr") {
        setProtocolResponse({
          endpoint: "INGEST /telemetry/iot-fleet/v2/sim-usage-event",
          status: "200 QUOTA_ENFORCED (6ms)",
          protocol: "AT&T Connection Manager Core Telemetry & Rating",
          operatorRef: "AT&T Enterprise (Fortune 500 Fleet Tracking)",
          payload: {
            deviceId: "IOT-ATT-FLEET-992140",
            simStatus: "ACTIVE_TRACKED",
            monthlyQuotaBytes: 10737418240, // 10 GB
            consumedBytes: 10630048100, // 9.9 GB
            policyAction: "AUTO_THROTTLE_WARNING_TRIGGERED (99% Threshold)",
            overageDisputeState: "0_DISPUTE_PREVENTED",
            enterpriseBillerSync: "RECONCILED"
          }
        });
      } else if (protoType === "diameter") {
        setProtocolResponse({
          endpoint: "CCR / Diameter Ro / Gy Credit-Control-Request",
          status: "200 DIAMETER_SUCCESS (12ms)",
          protocol: "3GPP 32.296 OCS / CCS Convergent Charging",
          operatorRef: "Nokia — 3Austria / 3Ireland / 3Italy",
          payload: {
            sessionId: "dia-nokia-3group-8837192",
            ratingGroup: 4001,
            grantedServiceUnits: "5000000000 bytes (5GB 5G NR)",
            reservedBalanceUnits: "€15.00 EUR",
            zeroLeakageState: "CONFIRMED"
          }
        });
      } else if (protoType === "singleview") {
        setProtocolResponse({
          endpoint: "EXECUTE BDT / Invoicing Engine Run (VZ450 Tape)",
          status: "200 SETTLEMENT_BALANCED (18ms)",
          protocol: "CSG Singleview Billing Wholesale Settlement",
          operatorRef: "Verizon Wireless Wholesale & Inmarsat",
          payload: {
            billCycleDate: "2026-09-01",
            partnerLedger: "VZ_PRIME_BILLER_LEDGER_01",
            reconciledDiscrepancies: 0,
            settlementVolume: "$4,280,190.00 USD",
            slaAudit: "PASSED_100%"
          }
        });
      }
      setIsExecutingProtocol(false);
    }, 450);
  };

  return (
    <section 
      id="skills-analytics-section" 
      className="py-24 px-4 md:px-8 xl:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2 select-none">
            <span className="h-[1px] w-6 bg-sky-500" />
            <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest">
              ANIMATED SKILL GALAXY & FULL-STACK ARSENAL
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                Interactive Skill Constellation
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Explore Vetrivel&apos;s 11+ years of carrier domain custody across CSG Singleview BSS, 5G/4G OSS Southbound mediation, TM Forum ODA, and Full-Stack Java 21/React 19 microservices in an animated interactive matrix.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 self-start lg:self-auto select-none">
              <button
                onClick={() => setActiveTab("galaxy")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === "galaxy"
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Orbit size={14} className={activeTab === "galaxy" ? "animate-spin-slow" : ""} />
                <span>3D ORBIT GALAXY</span>
              </button>

              <button
                onClick={() => setActiveTab("grid")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === "grid"
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Activity size={14} />
                <span>SIGNAL EQUALIZER</span>
              </button>

              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === "terminal"
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25"
                    : "text-sky-600 dark:text-sky-400 hover:text-slate-950 dark:hover:text-white bg-sky-500/10"
                }`}
              >
                <Terminal size={14} />
                <span>LIVE TELCO SANDBOX</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Animated 3D Orbit Galaxy View */}
        {activeTab === "galaxy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 6 Cols: Animated Rotating Orbit Galaxy Stage */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 shadow-2xl flex flex-col items-center justify-center relative min-h-[460px] overflow-hidden">
              
              {/* Central Pulsing Avatar Core */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 shadow-xl shadow-sky-500/20">
                  <img
                    src="/assets/vetrivel_avatar_architect.jpg"
                    alt="Vetrivel Muthusamy Core"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-sky-300 border border-sky-500/40 text-[9px] font-mono font-bold shadow-md">
                      CORE ARCHITECT
                    </span>
                  </div>
                </div>
              </div>

              {/* Orbiting concentric rings */}
              <div className="absolute w-[360px] h-[360px] rounded-full border border-sky-500/20 border-dashed animate-spin-slow pointer-events-none" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-indigo-500/20 border-dotted animate-spin-reverse pointer-events-none" />

              {/* Orbit Satellite Nodes positioned along the circle */}
              {skillDomains.map((domain, index) => {
                const isSelected = domain.id === selectedDomainId;
                const angle = (index * 72) * (Math.PI / 180); // 5 equidistant nodes
                const radius = 145; // pixel radius from center
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomainId(domain.id)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className={`absolute z-20 p-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:scale-110 focus:outline-none ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-sky-500 text-slate-900 dark:text-white shadow-sky-500/40 ring-2 ring-sky-400/50 scale-110"
                        : "glass-card border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                      {domain.icon}
                    </div>
                    <div className="text-left font-mono pr-1">
                      <span className="block text-[11px] font-bold leading-tight">
                        {domain.shortName}
                      </span>
                      <span className="text-[9.5px] text-sky-600 dark:text-sky-400 font-bold">
                        {domain.overallRating}%
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-3 text-center text-[10.5px] font-mono text-slate-500 dark:text-slate-500">
                [CLICK ANY ORBIT NODE TO INSPECT COMPETENCIES]
              </div>
            </div>

            {/* Right 6 Cols: Selected Domain Deep-Dive Inspector */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 space-y-6 shadow-2xl">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                      {currentDomain.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {currentDomain.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {currentDomain.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-sans">
                      {currentDomain.overallRating}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">RATING</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {currentDomain.description}
                </p>

                {/* Operators Verified Ribbon */}
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold">
                    <Globe2 size={14} />
                    <span>VERIFIED OPERATOR ENGAGEMENTS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDomain.operators.map((op, oIdx) => (
                      <span
                        key={oIdx}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-medium"
                      >
                        ✓ {op}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Skill Signal Bars */}
                <div className="space-y-3 pt-1">
                  {currentDomain.skills.map(skill => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-800 dark:text-slate-200 font-bold">{skill.name}</span>
                          {skill.standard && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-400 border border-slate-200 dark:border-slate-700">
                              {skill.standard}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                          <span>{skill.years} Yrs</span>
                          <span className="text-sky-600 dark:text-sky-400 font-bold">{skill.proficiency}%</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Signal Equalizer View */}
        {activeTab === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillDomains.map(domain => (
              <div 
                key={domain.id}
                className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-all duration-300 space-y-5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {domain.icon}
                  </div>

                  {/* Animated Equalizer Wave */}
                  <div className="flex items-end gap-1 h-5 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="w-1 bg-sky-500 rounded-full animate-sound-1" />
                    <span className="w-1 bg-indigo-500 rounded-full animate-sound-2" />
                    <span className="w-1 bg-emerald-500 rounded-full animate-sound-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {domain.yearsOfExp} Years Professional Custody
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {domain.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  {domain.skills.map(s => (
                    <div key={s.id} className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{s.name}</span>
                      <span className="text-sky-600 dark:text-sky-400 font-bold">{s.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Interactive Live Telco Protocol Sandbox Terminal */}
        {activeTab === "terminal" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 4 Cols: Protocol Action Buttons */}
            <div className="lg:col-span-4 space-y-3">
              <div className="pb-1 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>SELECT PROTOCOL SCENARIO</span>
                <span className="text-sky-600 dark:text-sky-400">[CLICK TO TEST]</span>
              </div>

              {[
                { id: "nokia_wing", title: "Nokia WING MRR & PDF Invoicing", desc: "10M+ Subs, Gy/Ro, MRC/NRC, SFTP push", badge: "Nokia WING" },
                { id: "att_conn_mgr", title: "AT&T Connection Manager (IoT)", desc: "SIM telemetry ingestion & quota throttling", badge: "AT&T IoT" },
                { id: "tmf622", title: "TM Forum TMF622 Ordering", desc: "British Telecom Retail unit order flow", badge: "ODA v4.0" },
                { id: "singleview", title: "Singleview VZ450 Bill Run", desc: "Wholesale Carrier settlement validation", badge: "CSG BSS" }
              ].map(proto => (
                <button
                  key={proto.id}
                  onClick={() => handleTestProtocol(proto.id)}
                  disabled={isExecutingProtocol}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    activeProtocolTest === proto.id
                      ? "bg-white dark:bg-slate-900 border-sky-500 shadow-md shadow-sky-500/20 text-slate-900 dark:text-white scale-[1.02]"
                      : "glass-card border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold block">{proto.title}</span>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-mono block">{proto.desc}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                    {proto.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Right 8 Cols: Interactive Cyber Terminal */}
            <div className="lg:col-span-8">
              <div className="p-6 rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-2xl space-y-4 font-mono text-xs text-slate-100">
                
                {/* Terminal Window Topbar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-slate-400 text-xs ml-2 font-bold">
                      telco_protocol_inspector.sh
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    {protocolResponse.status}
                  </span>
                </div>

                {/* Protocol Info Header */}
                <div className="space-y-1 text-slate-300">
                  <p><span className="text-sky-400 font-bold">ENDPOINT:</span> {protocolResponse.endpoint}</p>
                  <p><span className="text-indigo-400 font-bold">STANDARD:</span> {protocolResponse.protocol}</p>
                  <p><span className="text-amber-400 font-bold">OPERATOR:</span> {protocolResponse.operatorRef}</p>
                </div>

                {/* JSON Payload Display */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 overflow-x-auto text-emerald-400 leading-relaxed text-[11.5px]">
                  <pre className="font-mono">
                    {JSON.stringify(protocolResponse.payload, null, 2)}
                  </pre>
                </div>

                <div className="flex items-center justify-between text-[10.5px] text-slate-400 pt-1">
                  <span>Zero defect leakage audit: 100% compliant</span>
                  <span className="text-sky-400">Execution latency: 8-18ms</span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
