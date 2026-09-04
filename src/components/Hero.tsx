import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Award, 
  Radio, 
  Activity, 
  Download, 
  FileText,
  Plane,
  CheckCircle2,
  Globe2,
  Zap,
  Layers,
  Flame,
  ChevronRight,
  Maximize2,
  Github,
  Mail,
  Copy,
  Check,
  Bot
} from "lucide-react";

interface HeroProps {
  onExploreProjects: () => void;
  onExploreVision: () => void;
  onOpenResume?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

type SimulationScenario = "idle" | "burst" | "failover" | "idempotency" | "audit";
type AvatarMode = "real" | "comic-architect" | "comic-travel" | "comic-noc";

const TELECOM_OPERATORS = [
  { name: "Nokia WING Digital Hub", code: "NOKIA 10M+", region: "Global IoT Grid", logo: "🌐", desc: "10M+ Subs Migration, Gy/Ro, MRR & PDF Invoicing" },
  { name: "AT&T Connection Manager", code: "AT&T IoT", region: "United States", logo: "📡", desc: "Enterprise IoT Telemetry & Quota Throttling" },
  { name: "British Telecom Retail Unit", code: "BT UK", region: "United Kingdom", logo: "🇬🇧", desc: "Core Mobile Ordering & TM Forum ODA" },
  { name: "Verizon Wireless", code: "VERIZON US", region: "North America", logo: "🇺🇸", desc: "Prime Biller Wholesale & VZ450 Settlement" },
  { name: "Inmarsat Global Satellite", code: "INMARSAT", region: "Global / Maritime", logo: "🛰️", desc: "CSG Singleview Billing Transformation" },
  { name: "Nokia 3Group Europe", code: "3GROUP EU", region: "Austria • Ireland • Italy", logo: "🇪🇺", desc: "Multi-Country Rating Harmonization" }
];

export default function Hero({ 
  onExploreProjects, 
  onExploreVision, 
  onOpenResume,
  onNavigateSection 
}: HeroProps) {
  // Live Simulation state
  const [tpsRate, setTpsRate] = useState(2480);
  const [latencyValue, setLatencyValue] = useState(3.2);
  const [processedCount, setProcessedCount] = useState(14829340);
  const [activeSegment, setActiveSegment] = useState<"mediation" | "billing" | "assurance">("mediation");
  const [simScenario, setSimScenario] = useState<SimulationScenario>("idle");
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    "[14:20:01] 🟢 Initialized TM Forum ODA compliant mediation gateway",
    "[14:20:04] 📡 Connected to CSG Singleview Core & 3GPP Diameter OCS",
    "[14:20:07] ⚡ Ingestion cluster healthy across 8 Kafka consumer nodes"
  ]);

  // Avatar persona state (Real Photo + Comic Tech Guy styles)
  const [avatarMode, setAvatarMode] = useState<AvatarMode>("comic-architect");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessedCount(prev => prev + Math.floor(Math.random() * 45) + 15);
      if (simScenario === "idle") {
        setTpsRate(2400 + Math.floor(Math.random() * 160));
        setLatencyValue(Number((3.0 + Math.random() * 0.4).toFixed(1)));
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [simScenario]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setMousePos({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const triggerSimulation = (type: SimulationScenario) => {
    setSimScenario(type);
    const timestamp = new Date().toLocaleTimeString();

    if (type === "burst") {
      setTpsRate(14850);
      setLatencyValue(5.4);
      setSimulationLogs(prev => [
        `[${timestamp}] ⚡ BURST: Ingested 10k TPS CDR batch into Kafka mediation cluster`,
        `[${timestamp}] 🚀 Scaled 12 reactive consumer pods; 0 message drop`,
        ...prev.slice(0, 2)
      ]);
      setTimeout(() => setSimScenario("idle"), 4000);
    } else if (type === "failover") {
      setTpsRate(1950);
      setLatencyValue(4.8);
      setSimulationLogs(prev => [
        `[${timestamp}] ⚠️ FAILOVER: Primary Diameter Ro link dropped; initiating secondary OCS`,
        `[${timestamp}] 🛡️ Session state restored via Redis cache; 0 session loss`,
        ...prev.slice(0, 2)
      ]);
      setTimeout(() => setSimScenario("idle"), 4000);
    } else if (type === "idempotency") {
      setSimulationLogs(prev => [
        `[${timestamp}] 🔄 IDEMPOTENCY: Injected 5,000 duplicate charge events (MRR simulation)`,
        `[${timestamp}] 🔒 Deduplication filter caught 100% duplicate CDRs; balance preserved`,
        ...prev.slice(0, 2)
      ]);
      setTimeout(() => setSimScenario("idle"), 3500);
    } else if (type === "audit") {
      setSimulationLogs(prev => [
        `[${timestamp}] 🔍 AUDIT: Verified 10M+ accounts on Nokia WING Digital Hub`,
        `[${timestamp}] 🏆 Zero architectural debt detected across carrier transport nodes`,
        ...prev.slice(0, 3)
      ]);
      setTimeout(() => setSimScenario("idle"), 3500);
    }
  };

  const getAvatarImageSrc = () => {
    if (avatarMode === "real") return "/assets/vetrivel_original_blazer.jpg";
    if (avatarMode === "comic-architect") return "/assets/vetrivel_comic_tech_architect.jpg";
    if (avatarMode === "comic-travel") return "/assets/vetrivel_comic_global_traveler.jpg";
    return "/assets/vetrivel_comic_noc_commander.jpg";
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vetrivelm02@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-8 xl:px-16 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-[92vh] flex flex-col justify-center transition-colors duration-500">
      
      {/* Background Auroras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* TOP ROW: Identity + Animated Avatar + Fast Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT 7 COLS: Core Strategic Identity & Overview */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badges Row */}
            <div className="flex flex-wrap items-center gap-2 select-none">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>SYSTEM ONLINE</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-400 text-xs font-mono font-bold shadow-xs">
                <Globe2 size={13} className="animate-pulse" />
                <span>OVERSEAS READY: SINGAPORE 🇸🇬 • UK 🇬🇧 • USA 🇺🇸</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold shadow-xs">
                <ShieldCheck size={13} />
                <span>LED 15+ QA ENGINEERS (AGILE)</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] font-sans">
                Vetrivel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400">
                  Muthusamy
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-mono">
                <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 text-sky-700 dark:text-sky-400 font-bold shadow-xs">
                  Lead Telecom QA Consultant & UAT Delivery Manager
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium shadow-xs">
                  10+ Years Mobile OSS/BSS
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-medium shadow-xs">
                  PG in Software Development
                </span>
              </div>
            </div>

            {/* Narrative Passage */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-sans font-normal">
              Senior Telecom QA Lead & UAT Delivery Manager with <strong>over 10 years of specialized enterprise domain expertise</strong> in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). <strong>Managed cross-functional QA teams of 15+ engineers under Agile</strong>, cutting manual testing efforts by <strong>50%</strong> and achieving zero defect leakage. Holds a <strong>Postgraduate Diploma in Software Development</strong>, uniquely bridging the gap between technical engineering, API contracts, and business stakeholder delivery. <strong>Actively exploring global opportunities across Singapore, UK, USA, and Europe.</strong>
            </p>

            {/* 3 Strategic Key Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800/90 hover:border-sky-500/50 transition-colors">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold mb-1">
                  <Network size={14} />
                  <span>01 / 10M+ WING & BSS</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Nokia WING 10M+ UAT, Gy/Ro Diameter, Real SIM 4G/5G NSA, MRR & SFTP Invoicing.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold mb-1">
                  <Cpu size={14} />
                  <span>02 / 15+ QA LEADERSHIP</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Led 15+ QA engineers in Agile/Scrum, defect triage, sprint planning & carrier UAT sign-offs.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1">
                  <Globe2 size={14} />
                  <span>03 / OVERSEAS READY</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Targeting Singapore, UK & USA. PG in Software Dev for tech-literate delivery leadership.
                </p>
              </div>
            </div>

            {/* Recruiter Fast-Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenResume}
                id="hero-ai-tailor-trigger"
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Bot size={15} className="animate-pulse" />
                <span>AI Tailor CV (Singapore / UK / US)</span>
              </button>

              <button
                onClick={onExploreProjects}
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase glass-card border border-slate-300 dark:border-slate-700 hover:border-sky-500/50 text-slate-800 dark:text-white transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Layers size={14} />
                <span>View Carrier Engagements</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-500" /> : <Mail size={13} />}
                <span>{copiedEmail ? "Copied!" : "Email"}</span>
              </button>
            </div>

          </div>

          {/* RIGHT 5 COLS: Animated Comic Tech Guy & Avatar Persona Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* 3D Holographic Perspective Container */}
            <div 
              className="perspective-1000 w-full max-w-sm"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div 
                className="relative rounded-3xl p-5 glass-panel border border-sky-500/40 bg-white/90 dark:bg-slate-900/90 shadow-2xl transition-transform duration-200 ease-out transform-style-3d overflow-hidden space-y-4"
                style={{
                  transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
                }}
              >
                {/* Cyber Scanline Animation Overlay */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent pointer-events-none animate-cyber-scan z-20 shadow-md shadow-sky-400" />

                {/* Animated Rotating Hologram Rings */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-sky-500/20 border-dashed animate-spin-slow pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full border border-indigo-500/20 border-dotted animate-spin-reverse pointer-events-none" />

                {/* Persona Switcher Tabs */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 relative z-10">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-purple-500 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-sky-300">
                      AVATAR TRANSLATOR
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setAvatarMode("real")}
                      title="Real Original Photo"
                      className={`px-2 py-1 rounded-lg text-[9.5px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "real" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      👔 REAL
                    </button>
                    <button
                      onClick={() => setAvatarMode("comic-architect")}
                      title="Comic Tech Architect"
                      className={`px-2 py-1 rounded-lg text-[9.5px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "comic-architect" ? "bg-purple-600 text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      ⚡ COMIC
                    </button>
                    <button
                      onClick={() => setAvatarMode("comic-travel")}
                      title="Comic Global Traveler"
                      className={`px-2 py-1 rounded-lg text-[9.5px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "comic-travel" ? "bg-amber-500 text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      🌍 TRAVEL
                    </button>
                    <button
                      onClick={() => setAvatarMode("comic-noc")}
                      title="Comic NOC Commander"
                      className={`px-2 py-1 rounded-lg text-[9.5px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "comic-noc" ? "bg-sky-500 text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      📡 NOC
                    </button>
                  </div>
                </div>

                {/* Main Avatar Image with Glowing Cyber Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 aspect-square group shadow-xl bg-slate-100 dark:bg-slate-950">
                  <img
                    src={getAvatarImageSrc()}
                    alt="Vetrivel Muthusamy - Architect & Lead Consultant"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Persona Badge Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl glass-panel border border-white/20 dark:border-slate-700/80 text-xs font-mono text-white flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-bold text-[10.5px]">
                        {avatarMode === "real" && "VETRIVEL (ORIGINAL PHOTO)"}
                        {avatarMode === "comic-architect" && "COMIC TECH HERO (5G/CLOUD)"}
                        {avatarMode === "comic-travel" && "COMIC GLOBAL TRAVELER"}
                        {avatarMode === "comic-noc" && "COMIC NOC COMMANDER"}
                      </span>
                    </div>
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                      {avatarMode === "real" ? "REAL" : "COMIC"}
                    </span>
                  </div>
                </div>

                {/* 4 Quick Switcher Thumbnails Strip */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  <button
                    onClick={() => setAvatarMode("real")}
                    title="Original Photo"
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      avatarMode === "real" ? "border-emerald-500 scale-105 shadow-md" : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src="/assets/vetrivel_original_blazer.jpg" alt="Real Portrait" className="w-full h-full object-cover" />
                  </button>

                  <button
                    onClick={() => setAvatarMode("comic-architect")}
                    title="Comic Tech Hero"
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      avatarMode === "comic-architect" ? "border-purple-500 scale-105 shadow-md" : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src="/assets/vetrivel_comic_tech_architect.jpg" alt="Comic Tech Hero" className="w-full h-full object-cover" />
                  </button>

                  <button
                    onClick={() => setAvatarMode("comic-travel")}
                    title="Comic Global Traveler"
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      avatarMode === "comic-travel" ? "border-amber-500 scale-105 shadow-md" : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src="/assets/vetrivel_comic_global_traveler.jpg" alt="Comic Traveler" className="w-full h-full object-cover" />
                  </button>

                  <button
                    onClick={() => setAvatarMode("comic-noc")}
                    title="Comic NOC Commander"
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      avatarMode === "comic-noc" ? "border-sky-500 scale-105 shadow-md" : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src="/assets/vetrivel_comic_noc_commander.jpg" alt="Comic NOC" className="w-full h-full object-cover" />
                  </button>
                </div>

                {/* Telemetry Live Meters */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850">
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">EXPERIENCE</span>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">10+ YRS</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850">
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">MANUAL EFFORT</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">-50%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850">
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">POST-RELEASE</span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">-30% DEF</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM ROW: Prestigious Global Telecom Operators Infinite Ribbon */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Globe2 size={15} className="text-sky-600 dark:text-sky-400" />
              <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                PROVEN EXPERIENCE WITH GLOBAL TELECOM OPERATORS
              </span>
            </div>
            <span className="hidden sm:inline text-[11px] text-slate-500 dark:text-slate-400">
              UK • USA • GLOBAL SATELLITE • EUROPE (AUSTRIA, IRELAND, ITALY)
            </span>
          </div>

          {/* Marquee Wrapper with overflow hidden */}
          <div className="relative w-full overflow-hidden py-2 bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/80 backdrop-blur-md">
            
            {/* Left & right fade gradients */}
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-4 px-4">
              {/* Duplicate array for continuous loop */}
              {[...TELECOM_OPERATORS, ...TELECOM_OPERATORS].map((op, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-colors shrink-0 cursor-default group shadow-xs"
                >
                  <span className="text-lg">{op.logo}</span>
                  <div className="text-left font-mono space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                        {op.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold border border-slate-200 dark:border-slate-700">
                        {op.code}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                      {op.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
