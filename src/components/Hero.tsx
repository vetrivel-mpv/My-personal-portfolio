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
  Check
} from "lucide-react";

interface HeroProps {
  onExploreProjects: () => void;
  onExploreVision: () => void;
  onOpenResume?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

type SimulationScenario = "idle" | "burst" | "failover" | "idempotency" | "audit";
type AvatarMode = "architect" | "noc" | "travel";

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

  // Avatar persona state
  const [avatarMode, setAvatarMode] = useState<AvatarMode>("architect");
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
        `[${timestamp}] 🚀 TM Forum TMF688 event router autoscaled to 6 partitions`,
        `[${timestamp}] ✅ 0 packet loss. 100% Singleview rating accounts updated safely`,
        ...prev.slice(0, 3)
      ]);
      setTimeout(() => {
        setTpsRate(2480);
        setLatencyValue(3.2);
        setSimScenario("idle");
      }, 3500);
    } else if (type === "failover") {
      setSimulationLogs(prev => [
        `[${timestamp}] ⚠️ FAILOVER: Diameter OCS Ro/Gy link simulated network timeout`,
        `[${timestamp}] 🔄 Reactive WebFlux circuit-breaker triggered -> rerouted to standby CCS`,
        `[${timestamp}] 🛡️ Recovery complete in 95ms with 0 subscriber rating leakage`,
        ...prev.slice(0, 3)
      ]);
      setTimeout(() => setSimScenario("idle"), 3500);
    } else if (type === "idempotency") {
      setSimulationLogs(prev => [
        `[${timestamp}] 🔄 IDEMPOTENCY: Injected duplicate $450 VZ450 wholesale settlement record`,
        `[${timestamp}] 🔍 Hash key deduplication matched (TX-9948271) against Singleview ledger`,
        `[${timestamp}] ✅ Prevented duplicate invoice charge successfully`,
        ...prev.slice(0, 3)
      ]);
      setTimeout(() => setSimScenario("idle"), 3500);
    } else if (type === "audit") {
      setSimulationLogs(prev => [
        `[${timestamp}] 📊 AUDIT: Executing TM Forum eTOM SID 21.0 & ODA API Conformance`,
        `[${timestamp}] 🎯 TMF620 Catalog, TMF622 Ordering & TMF679 Billing score: 99.98%`,
        `[${timestamp}] 🏆 Zero architectural debt detected across carrier transport nodes`,
        ...prev.slice(0, 3)
      ]);
      setTimeout(() => setSimScenario("idle"), 3500);
    }
  };

  const getAvatarImageSrc = () => {
    if (avatarMode === "architect") return "/assets/vetrivel_avatar_architect.jpg";
    if (avatarMode === "noc") return "/assets/vetrivel_avatar_command_center.jpg";
    return "/assets/vetrivel_avatar_global_travel.jpg";
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>SYSTEM ONLINE</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
                <Plane size={13} className="animate-pulse" />
                <span>100% WORLDWIDE TRAVEL READY</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
                <Award size={13} />
                <span>11+ YRS TELECOM & FULL-STACK</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] font-sans">
                Vetrivel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400">
                  Muthusamy
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-sm sm:text-base font-mono">
                <span className="px-2.5 py-0.5 rounded-lg bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 text-sky-700 dark:text-sky-400 font-bold">
                  Telecom Solution Architect
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">Lead Test Architect</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Full-Stack Engineer</span>
              </div>
            </div>

            {/* Narrative Passage */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-sans font-normal">
              Architecting mission-critical <strong>Telecom OSS/BSS, CSG Singleview Convergent Billing, 5G/4G Mediation, and TM Forum ODA</strong> architectures alongside modern <strong>Full-Stack React 19, Java 21, and Spring Boot microservices</strong>. Trusted by Tier-1 operators including <strong>British Telecom, Verizon, Inmarsat, AT&T, and Nokia (3Austria, 3Ireland, 3Italy)</strong>. <strong>100% Enthusiastic for frequent worldwide travel.</strong>
            </p>

            {/* 3 Strategic Key Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/90 hover:border-sky-500/50 transition-colors">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold mb-1">
                  <Network size={14} />
                  <span>01 / BSS & BILLING</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">CSG Singleview, OCS/CCS, VZ450 BDT, Revenue Assurance</p>
              </div>

              <div className="p-3 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/90 hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold mb-1">
                  <Cpu size={14} />
                  <span>02 / FULL-STACK & CLOUD</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">React 19, Java 21, Spring Boot 3.3, Kafka, Docker/EKS</p>
              </div>

              <div className="p-3 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/90 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1">
                  <Globe2 size={14} />
                  <span>03 / GLOBAL OPERATORS</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">BT, Verizon, Inmarsat, AT&T, Nokia 3Group delivery</p>
              </div>
            </div>

            {/* Recruiter Fast Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenResume}
                className="px-6 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles size={14} className="text-sky-200" />
                <span>AI TAILOR CV (GEMINI)</span>
              </button>

              <button
                onClick={onExploreProjects}
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>Case Studies & GitHub</span>
                <ArrowRight size={14} />
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

          {/* RIGHT 5 COLS: Animated Futuristic Avatar & Persona Card */}
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
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-300">
                      HOLOGRAPHIC AVATAR
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setAvatarMode("architect")}
                      title="Architect Persona"
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "architect" ? "bg-sky-500 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      ARCHITECT
                    </button>
                    <button
                      onClick={() => setAvatarMode("noc")}
                      title="Telecom NOC Persona"
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "noc" ? "bg-emerald-500 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      NOC
                    </button>
                    <button
                      onClick={() => setAvatarMode("travel")}
                      title="Global Mobility Persona"
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        avatarMode === "travel" ? "bg-amber-500 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      GLOBAL
                    </button>
                  </div>
                </div>

                {/* Main Avatar Image with Glowing Cyber Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 aspect-square group shadow-xl bg-slate-100 dark:bg-slate-950">
                  <img
                    src={getAvatarImageSrc()}
                    alt="Vetrivel Muthusamy - Telecom Solution Architect"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Persona Badge Overlay */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono">
                    <div className="px-2.5 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-100 font-bold flex items-center gap-1.5 shadow-md">
                      {avatarMode === "architect" && <Zap size={12} className="text-sky-400" />}
                      {avatarMode === "noc" && <Activity size={12} className="text-emerald-400" />}
                      {avatarMode === "travel" && <Plane size={12} className="text-amber-400" />}
                      <span>
                        {avatarMode === "architect" && "Solution Architect Core"}
                        {avatarMode === "noc" && "Telecom NOC & QA Lead"}
                        {avatarMode === "travel" && "Global Mobility Mode"}
                      </span>
                    </div>

                    <span className="px-2 py-1 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-[10px]">
                      LIVE HUD
                    </span>
                  </div>
                </div>

                {/* Telemetry Live Meters */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850">
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">EXPERIENCE</span>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">11+ YRS</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850">
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">LEAKAGE</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">0.00%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850">
                    <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">MOBILITY</span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">100% ✈️</span>
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
