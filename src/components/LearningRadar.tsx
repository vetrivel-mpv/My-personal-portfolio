import React, { useState } from "react";
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Globe2, 
  Briefcase, 
  Zap, 
  Award, 
  Radio, 
  Cpu, 
  Network, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  RefreshCw, 
  Volume2, 
  MessageSquare, 
  Clock, 
  Flame,
  Star,
  DollarSign,
  ChevronRight,
  Send,
  Layers,
  Terminal
} from "lucide-react";

interface HighPayingSkill {
  id: string;
  title: string;
  category: string;
  targetCompensation: string;
  status: "In Progress (Active Study)" | "Advanced Mastery" | "Next Quarter Target";
  progress: number;
  icon: React.ReactNode;
  whyHighPaying: string;
  keyCurriculum: string[];
  certTarget: string;
  architecturalApplication: string;
}

interface ExecutiveEnglishPhrase {
  id: string;
  scenario: string;
  juniorPhrasing: string;
  executivePhrasing: string;
  rationale: string;
  tone: string;
  category: "Negotiation" | "C-Level Defense" | "Crisis & Outage" | "Pre-Sales Discovery";
}

interface TrendNewsItem {
  id: string;
  category: "High-Paying Roles" | "GenAI & Telecom" | "5G SA & Cloud" | "TM Forum & ODA";
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  impactScore: string;
  tags: string[];
  roleTarget?: string;
  salaryRange?: string;
}

export default function LearningRadar() {
  const [activeTab, setActiveTab] = useState<"high-paying" | "ai-vision" | "english-lab" | "newsfeed">("high-paying");

  // Daily English interactive generator state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isCopiedPhrase, setIsCopiedPhrase] = useState(false);

  // AI Copilot Simulator state
  const [aiAnomalyInput, setAiAnomalyInput] = useState("CDR volume dropped by 18% in EMEA Roaming Gateway while Diameter Ro latency spiked to 420ms.");
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiDiagnosticResult, setAiDiagnosticResult] = useState<{
    rootCause: string;
    actionPlan: string;
    carrierSlaStatus: string;
    financialLeakagePrevented: string;
  } | null>({
    rootCause: "Diameter Ro credit-control link buffer congestion at partner roaming boundary (TAP3 rating group 4001).",
    actionPlan: "Autoscaled reactive WebFlux mediator threads from 8 to 24 nodes; triggered fallback to standby CCS charging node.",
    carrierSlaStatus: "99.999% Restored within 38ms",
    financialLeakagePrevented: "€145,000 EUR in unbilled roaming data traffic"
  });

  // Newsfeed filter state
  const [newsFilter, setNewsFilter] = useState<string>("All");

  const highPayingSkills: HighPayingSkill[] = [
    {
      id: "skill-1",
      title: "Agentic AI & GenAI for Telecom Autonomous Operations (AIOps)",
      category: "AI & Automation",
      targetCompensation: "$220k - $310k+ / £150k - £220k",
      status: "In Progress (Active Study)",
      progress: 75,
      icon: <Brain className="text-purple-500 dark:text-purple-400" size={20} />,
      whyHighPaying: "Carriers globally are transitioning from reactive NOC monitoring to Level 4/5 Autonomous Networks (TM Forum AN) where LLM agents diagnose and resolve network anomalies autonomously.",
      keyCurriculum: [
        "LangChain & LangGraph Multi-Agent Architecture for Telco Diagnostic Workflows",
        "Fine-tuning Open-Source LLMs (Llama 3 / Mistral) on 3GPP & TM Forum Schemas",
        "Real-Time CDR & BSS Invoicing Anomaly Detectors using Embeddings & Vector DBs",
        "Autonomous Network Self-Healing Intent-Based Networking (IBN)"
      ],
      certTarget: "TM Forum Certified Autonomous Networks Practitioner",
      architecturalApplication: "Building real-time AI copilot that ingests Nokia WING & AT&T Connection Manager telemetry to predict and prevent quota leakage before monthly bill runs."
    },
    {
      id: "skill-2",
      title: "5G Standalone (SA) Core SBA & Cloud-Native O-RAN Architecture",
      category: "5G Telecom Core",
      targetCompensation: "$200k - $280k+ / £135k - £190k",
      status: "In Progress (Active Study)",
      progress: 85,
      icon: <Radio className="text-sky-500 dark:text-sky-400" size={20} />,
      whyHighPaying: "5G Standalone networks decouple hardware from control-plane software via HTTP/2 JSON microservices (NRF, PCF, CHF, UDM), requiring dual expertise in telecom protocols and Kubernetes container orchestration.",
      keyCurriculum: [
        "3GPP Release 17/18 5G SA Service-Based Architecture (SBA)",
        "Convergent Charging Function (CHF) & Nchf Interface Integration",
        "Kubernetes eBPF (Cilium) CNI for Low-Latency Carrier Packet Processing",
        "O-RAN Alliance Architecture: Near-RT RIC (xApps) & Non-RT RIC (rApps)"
      ],
      certTarget: "CKA (Certified Kubernetes Administrator) + 5G SA Architecture Specialist",
      architecturalApplication: "Designing sub-10ms 5G network slicing charging adapters interfacing Singleview BSS with cloud-native 5G Core."
    },
    {
      id: "skill-3",
      title: "Hyper-Scale Stream Processing & Distributed FinOps (Kafka + Apache Flink)",
      category: "Data Engineering",
      targetCompensation: "$190k - $260k+ / £125k - £175k",
      status: "Advanced Mastery",
      progress: 90,
      icon: <Cpu className="text-emerald-500 dark:text-emerald-400" size={20} />,
      whyHighPaying: "Handling millions of concurrent IoT and subscriber event streams with zero state loss requires distributed streaming frameworks processing 50,000+ events/sec.",
      keyCurriculum: [
        "Apache Flink Stateful Stream Processing & Complex Event Processing (CEP)",
        "Kafka Streams Exactly-Once Semantics (EOS) for Carrier Billing Mediation",
        "Distributed Saga Pattern for Multi-Tier Carrier Database State Integrity",
        "Cloud FinOps for Multi-Tenant Global Carrier Cloud Infrastructure"
      ],
      certTarget: "Confluent Certified Event Streaming Architect",
      architecturalApplication: "Real-time stream rating engine transforming 15,000+ TPS batch CDR pipelines into instant sub-second balance settlement."
    },
    {
      id: "skill-4",
      title: "TOGAF 10 & TM Forum Open Digital Architecture (ODA) Master",
      category: "Enterprise Solution Architecture",
      targetCompensation: "$210k - $290k+ / £140k - £200k",
      status: "In Progress (Active Study)",
      progress: 80,
      icon: <Award className="text-amber-500 dark:text-amber-400" size={20} />,
      whyHighPaying: "Executive client buyers demand architects who speak fluent C-level business strategy, TOGAF enterprise governance, and TM Forum ODA Component standards.",
      keyCurriculum: [
        "TOGAF 10 Enterprise Architecture Framework & Architecture Development Method (ADM)",
        "TM Forum ODA Component Specifications & Canvas Deployment",
        "Domain-Driven Design (DDD) for Large-Scale Telecom Transformations",
        "Executive Business Case Financial Modeling (NPV, IRR, Payback on Cloud Migration)"
      ],
      certTarget: "TOGAF Enterprise Architecture 10 Practitioner + TM Forum ODA Master",
      architecturalApplication: "Leading multi-million dollar carrier RFP bids and C-level digital transformation advisory."
    }
  ];

  const executivePhrases: ExecutiveEnglishPhrase[] = [
    {
      id: "p-1",
      scenario: "Explaining Technical Debt to C-Level / VP of Engineering",
      juniorPhrasing: "Our old code is really messy, slow, and full of bugs. We need time to rewrite it.",
      executivePhrasing: "To protect our quarterly SLA commitments and eliminate unbudgeted operational drag, we recommend allocating a dedicated sprint capacity toward refactoring high-friction mediation pipelines, yielding an estimated 35% latency reduction.",
      rationale: "Translates code quality into SLA reliability, operational drag, and measurable latency ROI.",
      tone: "Authoritative, ROI-Focused, Strategic",
      category: "C-Level Defense"
    },
    {
      id: "p-2",
      scenario: "Defending an Architectural Trade-off in Client Discovery",
      juniorPhrasing: "If we don't use this new framework, the system won't scale at all.",
      executivePhrasing: "While a monolithic approach appears faster for initial rollout, decoupling our rating engine via asynchronous Kafka microservices protects us against catastrophic peak-hour bottlenecks and reduces long-term maintenance overhead by over 40%.",
      rationale: "Acknowledges the counter-argument respectfully before delivering the strategic rationale and numerical risk reduction.",
      tone: "Consultative, Diplomatic, Persuasive",
      category: "Pre-Sales Discovery"
    },
    {
      id: "p-3",
      scenario: "Communicating a High-Severity Outage with Calm Authority",
      juniorPhrasing: "Everything crashed, the database is dead and we don't know what happened yet.",
      executivePhrasing: "We are currently observing a transient mediation queue backlog impacting roaming subscriber rating. Our incident containment protocol is active, failover CCS nodes are online, and we have stabilized traffic while isolating the root cause with zero financial leakage.",
      rationale: "Projects calm confidence, details active mitigation steps, and confirms financial/data safety.",
      tone: "Poised, Reassuring, Executive Command",
      category: "Crisis & Outage"
    },
    {
      id: "p-4",
      scenario: "Pushing Back on Unrealistic Scope Demands",
      juniorPhrasing: "No, we cannot do all these features before the deadline. It's impossible.",
      executivePhrasing: "To safeguard our hard launch date with zero-defect quality, let's prioritize Phase 1 delivery on the core TM Forum TMF622 ordering APIs, while sequencing advanced rate plan flex-charging into Phase 2 without disrupting live subscriber operations.",
      rationale: "Offers constructive sequencing (Phase 1 vs Phase 2) rather than a blunt refusal, emphasizing risk mitigation.",
      tone: "Solution-Oriented, Firm, Collaborative",
      category: "Negotiation"
    }
  ];

  const trendNews: TrendNewsItem[] = [
    {
      id: "news-1",
      category: "High-Paying Roles",
      title: "Global Surge in Telecom Solution Architect Roles with 100% Worldwide Travel Readiness",
      source: "Global Telecom Career Radar",
      timestamp: "Today",
      summary: "Tier-1 carriers and telecom consultancies in US, UK, and EMEA are offering premium packages ($210k-$290k / £140k-£200k) for Solution Architects experienced in CSG Singleview, Nokia WING, and TM Forum ODA who are ready for frequent client on-site discovery deployments.",
      impactScore: "HIGH YIELD (Top 5% Salary Tier)",
      tags: ["Principal Architect", "Global Travel", "Nokia WING", "CSG Singleview"],
      roleTarget: "Principal Telecom Solution Architect",
      salaryRange: "$210,000 - $290,000 USD / £140,000 - £200,000 GBP"
    },
    {
      id: "news-2",
      category: "GenAI & Telecom",
      title: "Autonomous Networks (AN) Level 4 Momentum: GenAI LLM Agents in BSS/OSS",
      source: "TM Forum Research 2026",
      timestamp: "2 days ago",
      summary: "Major European and US operators report 60% faster Mean-Time-To-Repair (MTTR) by integrating LangGraph-based GenAI agents that parse SNMP trap storms and Diameter Gy charging events in real time.",
      impactScore: "ARCHITECTURAL DISRUPTION",
      tags: ["GenAI", "LangGraph", "Autonomous Networks", "AIOps"]
    },
    {
      id: "news-3",
      category: "5G SA & Cloud",
      title: "5G Standalone CHF & Cloud Convergent Charging Implementations Accelerate",
      source: "3GPP Standards Pulse",
      timestamp: "3 days ago",
      summary: "Operators migrating from 4G/5G NSA to pure 5G Standalone (SA) require architects who bridge 3GPP 32.296 Convergent Charging (CCS) with modern Kubernetes and Java 21 microservice meshes.",
      impactScore: "HIGH SKILL DEMAND",
      tags: ["5G SA", "CHF Charging", "Kubernetes", "Java 21"]
    },
    {
      id: "news-4",
      category: "TM Forum & ODA",
      title: "TM Forum Open Digital Architecture (ODA) Mandate in Global Tier-1 RFPs",
      source: "TM Forum Global Briefing",
      timestamp: "5 days ago",
      summary: "Over 85% of enterprise carrier transformation bids now require strict TMF620, TMF622, and TMF679 OpenAPI compliance, favoring Solution Architects with proven UAT and API governance experience.",
      impactScore: "ENTERPRISE STANDARD",
      tags: ["ODA v4.0", "TMF622", "TMF679", "eTOM"]
    }
  ];

  const handleSimulateAiDiagnostics = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setAiDiagnosticResult({
        rootCause: "Diameter Ro credit-control link buffer congestion at partner roaming boundary (TAP3 rating group 4001).",
        actionPlan: "Autoscaled reactive WebFlux mediator threads from 8 to 24 nodes; triggered fallback to standby CCS charging node.",
        carrierSlaStatus: "99.999% Restored within 38ms",
        financialLeakagePrevented: "€145,000 EUR in unbilled roaming data traffic"
      });
      setIsAiAnalyzing(false);
    }, 600);
  };

  const handleNextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % executivePhrases.length);
    setIsCopiedPhrase(false);
  };

  const handleCopyPhrase = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedPhrase(true);
    setTimeout(() => setIsCopiedPhrase(false), 2500);
  };

  const filteredNews = newsFilter === "All" 
    ? trendNews 
    : trendNews.filter(n => n.category === newsFilter);

  const currentPhrase = executivePhrases[currentPhraseIndex];

  return (
    <section 
      id="learning-radar" 
      className="py-24 px-4 md:px-8 xl:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2 select-none">
            <span className="h-[1px] w-6 bg-purple-500" />
            <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest">
              CONTINUOUS UPSKILLING & EXECUTIVE CAREER RADAR
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                AI Evolution & High-Yield Learning Radar
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Strategic roadmap synthesizing 11+ years of carrier domain custody (Nokia WING, CSG Singleview, AT&T IoT) with Agentic AI, 5G SA Core, Executive C-Level English fluency, and daily market intelligence.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 self-start lg:self-auto select-none">
              <button
                onClick={() => setActiveTab("high-paying")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "high-paying"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <TrendingUp size={13} />
                <span>HIGH-YIELD SKILLS</span>
              </button>

              <button
                onClick={() => setActiveTab("ai-vision")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "ai-vision"
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Bot size={13} />
                <span>AI TELCO ROADMAP</span>
              </button>

              <button
                onClick={() => setActiveTab("english-lab")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "english-lab"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <MessageSquare size={13} />
                <span>EXECUTIVE ENGLISH LAB</span>
              </button>

              <button
                onClick={() => setActiveTab("newsfeed")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "newsfeed"
                    ? "bg-gradient-to-r from-purple-600 to-sky-600 text-white shadow-md shadow-purple-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Flame size={13} />
                <span>DAILY TRENDS & ROLES</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: High-Yield Skills Master Plan ($200k-$300k+ Radar) */}
        {activeTab === "high-paying" && (
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highPayingSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-6 sm:p-7 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-300 space-y-5 shadow-lg relative overflow-hidden group"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {skill.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase block">
                          {skill.category}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors font-sans">
                          {skill.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Compensation & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/20 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-bold">
                      <DollarSign size={14} className="text-emerald-500" />
                      <span>{skill.targetCompensation}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                      {skill.status} ({skill.progress}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>Curriculum Mastery</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">{skill.progress}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Strategic Value */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      WHY IT COMMANDS EXECUTIVE PREMIUM
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {skill.whyHighPaying}
                    </p>
                  </div>

                  {/* Key Curriculum Points */}
                  <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      CORE ENGINEERING FOCUS
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      {skill.keyCurriculum.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Carrier Application */}
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    <span className="text-purple-600 dark:text-purple-400 font-bold block mb-0.5">🚀 ARCHITECTURAL IMPACT:</span>
                    <span>{skill.architecturalApplication}</span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AI-Native Telco Architect Vision & Live Diagnostic Copilot */}
        {activeTab === "ai-vision" && (
          <div className="space-y-8 text-left">
            {/* Visual AI Laboratory Header Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <img
                    src="/assets/vetrivel_comic_ai_laboratory.jpg"
                    alt="Vetrivel Muthusamy - AI Telco Laboratory"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Sparkles size={13} className="text-purple-400" />
                    <span>AUTONOMOUS AI RESEARCH LAB</span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                      AGENTIC WORKFLOWS & GEMINI LLMS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                      Autonomous Self-Healing Telecom Fabrics
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Bridging <strong>11+ years of carrier domain custody</strong> with <strong>LangGraph multi-agent systems and Gemini AI models</strong> to automate network root cause analysis (RCA) and eliminate unbilled roaming leakage.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400 block text-[9.5px]">MTTR REDUCTION</span>
                      <span className="text-purple-400 font-bold">UP TO 60% FASTER</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400 block text-[9.5px]">REVENUE LEAKAGE</span>
                      <span className="text-emerald-400 font-bold">0.00% AUDITED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 5 Cols: Strategic AI Vision Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 space-y-5 shadow-2xl">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-sans">
                      AI-Native Telco Architecture
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Taking AI Forward with Vetrivel&apos;s Profile
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  <p>
                    <strong>The Next-Gen Edge:</strong> Generic AI developers do not understand Diameter Gy/Ro charging triggers, CSG Singleview state machines, or SNMP trap storms.
                  </p>
                  <p>
                    Vetrivel bridges <strong>11+ years of mission-critical carrier domain authority</strong> with <strong>LangChain & Agentic LLMs</strong> to build autonomous self-healing telecom billing and telemetry fabrics.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 font-mono text-xs">
                  <span className="text-sky-600 dark:text-sky-400 font-bold block">3 CORE AI TELCO PILLARS:</span>
                  <div className="space-y-1.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block">1. Agentic CDR Anomaly Resolution:</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">LLM agents that reconcile unbilled CDRs against rating ledgers in milliseconds.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block">2. Autonomous Network Intent (TM Forum AN):</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Converting natural language SLAs into real-time 5G network slice configurations.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block">3. Predictive IoT Quota Management:</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Forecasting SIM fleet overages on AT&T Connection Manager to prevent bill shock.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Interactive AI Anomaly Diagnostic Copilot Sandbox */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-2xl space-y-5 text-slate-100 font-mono text-xs">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-sky-400 font-bold uppercase">
                      TELCO_AI_COPILOT_AGENT.py (Interactive Simulator)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    GEMINI + LANGGRAPH
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 uppercase text-[10.5px] block font-bold">
                    INPUT TELEMETRY ANOMALY OR CDR FAILURE:
                  </label>
                  <textarea
                    rows={3}
                    value={aiAnomalyInput}
                    onChange={(e) => setAiAnomalyInput(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                  <button
                    onClick={handleSimulateAiDiagnostics}
                    disabled={isAiAnalyzing}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isAiAnalyzing ? <RefreshCw size={13} className="animate-spin" /> : <Sparkles size={13} />}
                    <span>{isAiAnalyzing ? "DIAGNOSING EVENT..." : "RUN AUTONOMOUS AI RCA & MITIGATION"}</span>
                  </button>
                </div>

                {/* Simulated Diagnostic Output */}
                {aiDiagnosticResult && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-[11.5px] animate-fade-in">
                    <div>
                      <span className="text-amber-400 font-bold block">🔍 ROOT CAUSE IDENTIFIED:</span>
                      <span className="text-slate-300">{aiDiagnosticResult.rootCause}</span>
                    </div>

                    <div>
                      <span className="text-emerald-400 font-bold block">⚡ AUTONOMOUS MITIGATION ACTION:</span>
                      <span className="text-slate-300">{aiDiagnosticResult.actionPlan}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-850 text-[10.5px]">
                      <div>
                        <span className="text-slate-500 uppercase block">CARRIER SLA STATUS:</span>
                        <span className="text-emerald-400 font-bold">{aiDiagnosticResult.carrierSlaStatus}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase block">FINANCIAL LEAKAGE PREVENTED:</span>
                        <span className="text-sky-400 font-bold">{aiDiagnosticResult.financialLeakagePrevented}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

        {/* TAB 3: Executive English & C-Level Phrasing Lab */}
        {activeTab === "english-lab" && (
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 space-y-6 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      DAILY SCENARIO {currentPhraseIndex + 1} OF {executivePhrases.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {currentPhrase.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-sans">
                    {currentPhrase.scenario}
                  </h3>
                </div>

                <button
                  onClick={handleNextPhrase}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
                >
                  <span>NEXT PHRASE</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Before vs After Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Junior / Informal */}
                <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-2">
                  <span className="text-[10.5px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400 block">
                    ❌ INFORMAL / REACTIVE PHRASING
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic font-sans">
                    &ldquo;{currentPhrase.juniorPhrasing}&rdquo;
                  </p>
                </div>

                {/* Executive / C-Level */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                      ✅ C-LEVEL EXECUTIVE PHRASING
                    </span>
                    <button
                      onClick={() => handleCopyPhrase(currentPhrase.executivePhrasing)}
                      className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 underline cursor-pointer"
                    >
                      {isCopiedPhrase ? "Copied!" : "Copy Phrase"}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-bold font-sans">
                    &ldquo;{currentPhrase.executivePhrasing}&rdquo;
                  </p>
                </div>
              </div>

              {/* Strategic Rationale & Recommended Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-sans">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold block">
                    STRATEGIC RATIONALE
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{currentPhrase.rationale}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold block">
                    RECOMMENDED VOCAL TONE
                  </span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">{currentPhrase.tone}</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: Daily Trends, Newsfeed & High-Paying Opportunity Radar */}
        {activeTab === "newsfeed" && (
          <div className="space-y-6 text-left">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 w-full sm:w-auto self-start">
              {["All", "High-Paying Roles", "GenAI & Telecom", "5G SA & Cloud", "TM Forum & ODA"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setNewsFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors cursor-pointer ${
                    newsFilter === filter
                      ? "bg-purple-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* News Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-300 space-y-4 shadow-md"
                >
                  <div className="flex items-center justify-between text-[10.5px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                      {news.category}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">{news.timestamp} · {news.source}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-sans leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  {news.salaryRange && (
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold block">💰 TARGET COMPENSATION:</span>
                      <span className="text-slate-900 dark:text-white font-bold">{news.salaryRange}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10.5px] font-mono">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{news.impactScore}</span>
                    <div className="flex gap-1.5">
                      {news.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
