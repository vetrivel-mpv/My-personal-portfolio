import React, { useState } from "react";
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
  Bot,
  Briefcase,
  GraduationCap
} from "lucide-react";

interface HeroProps {
  onExploreProjects: () => void;
  onExploreVision: () => void;
  onOpenResume?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setMousePos({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vetrivelm02@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 overflow-hidden bg-slate-50 text-slate-900 min-h-[92vh] flex flex-col justify-center transition-colors duration-500"
    >
      
      {/* Background Auroras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto space-y-12">
        
        {/* TOP ROW: Identity + Executive Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* LEFT 7 COLS (8 on 2xl): Core Strategic Identity & Overview */}
          <div className="lg:col-span-7 2xl:col-span-7 space-y-6 text-left">
            
            {/* Status Badges Row */}
            <div className="flex flex-wrap items-center gap-2 select-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-emerald-500/40 text-emerald-800 text-xs font-mono font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>OPEN TO RELOCATION • SEEKING VISA SPONSORSHIP</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-300 text-sky-800 text-xs font-mono font-bold shadow-xs">
                <Globe2 size={13} className="animate-pulse" />
                <span>SG 🇸🇬 • UK 🇬🇧 • US 🇺🇸 • SWISS 🇨🇭 • LUX 🇱🇺</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-300 text-indigo-800 text-xs font-mono font-bold shadow-xs">
                <ShieldCheck size={13} />
                <span>LED 15+ QA SQUAD</span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-300 text-purple-800 text-xs font-mono font-bold shadow-xs">
                <Network size={13} />
                <span>10.4M+ WING SUBS</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] font-sans">
                Vetrivel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                  Muthusamy
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-mono">
                <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-bold shadow-xs">
                  Principal Telecom QA Lead & Solutions Consultant
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium shadow-xs">
                  10+ Years Mobile OSS/BSS
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium shadow-xs">
                  PG Software Dev & MS (UK)
                </span>
              </div>
            </div>

            {/* Narrative Passage */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl font-sans font-normal">
              Senior Telecom QA Lead & Solutions Delivery Consultant with <strong className="text-slate-950 font-bold">over 10 years of specialized enterprise domain expertise</strong> in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). <strong className="text-slate-950 font-bold">Managed cross-functional QA teams of 15+ engineers under Agile</strong>, cutting manual testing efforts by <strong className="text-slate-950 font-bold">50%</strong> and achieving zero defect leakage. Holds a <strong className="text-slate-950 font-bold">Postgraduate in Software Development</strong> (IIIT Bangalore) and <strong className="text-slate-950 font-bold">Master of Science (MS)</strong> from Liverpool John Moores University (UK). <strong className="text-sky-900">Actively exploring overseas opportunities and seeking work visa sponsorship across Singapore, UK, USA, Switzerland, and Luxembourg.</strong>
            </p>

            {/* 4 Strategic Key Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 hover:border-sky-500/50 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 text-sky-700 text-xs font-mono font-bold mb-1">
                  <Network size={14} />
                  <span>01 / 10M+ WING & BSS</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Nokia WING 10M+ UAT, Gy/Ro Diameter, Real SIM 4G/5G NSA, MRR & SFTP Invoicing.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 hover:border-indigo-500/50 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 text-indigo-700 text-xs font-mono font-bold mb-1">
                  <Cpu size={14} />
                  <span>02 / 15+ QA SQUAD</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Led 15+ QA engineers in Agile/Scrum, defect triage, sprint planning & carrier UAT sign-offs.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 hover:border-emerald-500/50 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold mb-1">
                  <Zap size={14} />
                  <span>03 / -50% EFFORT CUT</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Optimized test cycles by 50% with zero defect leakage across Tier-1 carriers.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 hover:border-amber-500/50 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 text-amber-700 text-xs font-mono font-bold mb-1">
                  <Globe2 size={14} />
                  <span>04 / VISA SPONSORSHIP</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Seeking Visa Sponsorship for Singapore (EP), UK (Skilled), USA, Swiss & Luxembourg.
                </p>
              </div>
            </div>

            {/* Recruiter Fast-Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenResume}
                id="hero-executive-cv-trigger"
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-lg shadow-sky-600/25 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileText size={15} />
                <span>Executive CV (1-Page & 2-Page)</span>
              </button>

              <button
                onClick={() => onNavigateSection?.("recruiter-hub")}
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-white border border-slate-300 hover:border-sky-500/60 text-slate-800 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
              >
                <Briefcase size={14} className="text-sky-600" />
                <span>Recruiter Command Hub</span>
              </button>

              <button
                onClick={() => onNavigateSection?.("blueprint-section")}
                className="px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Layers size={14} className="text-indigo-600" />
                <span>4-Tier Blueprint</span>
              </button>

              <button
                onClick={onExploreProjects}
                className="px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-600" />
                <span>Carrier Engagements</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-600" /> : <Mail size={13} />}
                <span>{copiedEmail ? "Copied!" : "Email"}</span>
              </button>
            </div>

          </div>

          {/* RIGHT 5 COLS: Executive Global Mobility & Carrier Credentials Showcase Card */}
          <div className="lg:col-span-5 2xl:col-span-5 flex flex-col items-center justify-center">
            
            {/* 3D Perspective Container */}
            <div 
              className="perspective-1000 w-full max-w-md xl:max-w-lg"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div 
                className="relative rounded-3xl p-5 sm:p-6 bg-white border border-slate-200 shadow-2xl transition-transform duration-200 ease-out transform-style-3d overflow-hidden space-y-4 text-left"
                style={{
                  transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
                }}
              >
                {/* Header Strip with Live Status */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">
                      GLOBAL MOBILITY & SPONSORSHIP
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-bold">
                    <Plane size={11} className="text-amber-600" />
                    <span>SEEKING SPONSORSHIP</span>
                  </div>
                </div>

                {/* Executive Portrait Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] group shadow-md bg-slate-100">
                  <img
                    src="/assets/vetrivel_original_blazer.jpg"
                    alt="Vetrivel Muthusamy - Principal Telecom QA Lead"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Executive Credentials Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-mono text-white flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Award size={13} className="text-amber-400" />
                        <span className="font-bold text-[11px] tracking-tight">VETRIVEL MUTHUSAMY</span>
                      </div>
                      <span className="text-[9.5px] text-sky-300 block">
                        MS Comp Software Eng (UK) • 10+ Yrs Telecom
                      </span>
                    </div>
                    <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                      VERIFIED LEAD
                    </span>
                  </div>
                </div>

                {/* International Mobility Readiness Strip with Sponsorship Status */}
                <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[10.5px] font-mono font-bold text-sky-900">
                    <span className="flex items-center gap-1">
                      <Globe2 size={12} className="text-sky-600" />
                      <span>TARGET COUNTRIES (VISA SPONSORSHIP)</span>
                    </span>
                    <span className="text-[9.5px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 font-bold">
                      NEED SPONSORSHIP
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-center">
                    <div className="p-1.5 rounded-lg bg-white border border-sky-200 font-bold text-slate-800">
                      🇸🇬 Singapore (EP)
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-sky-200 font-bold text-slate-800">
                      🇬🇧 UK (Skilled)
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-sky-200 font-bold text-slate-800">
                      🇺🇸 USA (H1B/L1)
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-sky-200 font-bold text-slate-800">
                      🇨🇭 Swiss (Permit)
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-sky-200 font-bold text-slate-800">
                      🇱🇺 Luxembourg (EU)
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-sky-200 font-bold text-slate-800">
                      🇪🇺 Europe / DACH
                    </div>
                  </div>
                </div>

                {/* 4 Quantified Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-left font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[9.5px] text-slate-500 uppercase block font-medium">SUBSCRIBER SCALE</span>
                    <span className="text-xs sm:text-sm font-extrabold text-sky-700">10M+ MIGRATION</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[9.5px] text-slate-500 uppercase block font-medium">QA MANAGEMENT</span>
                    <span className="text-xs sm:text-sm font-extrabold text-indigo-700">15+ ENGINEERS</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[9.5px] text-slate-500 uppercase block font-medium">MANUAL EFFORT</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-700">-50% CUT</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[9.5px] text-slate-500 uppercase block font-medium">DEFECT ESCAPES</span>
                    <span className="text-xs sm:text-sm font-extrabold text-amber-700">ZERO P1/P2</span>
                  </div>
                </div>

                {/* Action CTA Bar */}
                <div className="pt-2 border-t border-slate-200 flex gap-2">
                  <button
                    onClick={onOpenResume}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download CV</span>
                  </button>
                  <button
                    onClick={() => onNavigateSection?.("recruiter-hub")}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Briefcase size={13} />
                    <span>Recruiter Hub</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM ROW: Prestigious Global Telecom Operators Infinite Ribbon */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Globe2 size={15} className="text-sky-700" />
              <span className="font-bold uppercase tracking-wider text-slate-800">
                PROVEN EXPERIENCE WITH GLOBAL TELECOM OPERATORS
              </span>
            </div>
            <span className="hidden sm:inline text-[11px] text-slate-500">
              UK 🇬🇧 • USA 🇺🇸 • SWITZERLAND 🇨🇭 • LUXEMBOURG 🇱🇺 • SINGAPORE 🇸🇬 • EUROPE 🇪🇺
            </span>
          </div>

          {/* Marquee Wrapper with overflow hidden */}
          <div className="relative w-full overflow-hidden py-2 bg-slate-100/70 rounded-2xl border border-slate-200 backdrop-blur-md">
            
            {/* Left & right fade gradients */}
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-4 px-4">
              {/* Duplicate array for continuous loop */}
              {[...TELECOM_OPERATORS, ...TELECOM_OPERATORS].map((op, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500/50 transition-colors shrink-0 cursor-default group shadow-xs hover:shadow-md"
                >
                  <span className="text-lg">{op.logo}</span>
                  <div className="text-left font-mono space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {op.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-sky-800 font-bold border border-slate-200">
                        {op.code}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate max-w-[220px]">
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
