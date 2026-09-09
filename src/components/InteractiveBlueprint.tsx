import React, { useState } from "react";
import { 
  Terminal,
  Activity,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  CircuitBoard,
  Cpu,
  Bookmark,
  CheckCircle2,
  Network,
  Zap,
  ArrowRight,
  Database,
  Radio,
  FileCheck
} from "lucide-react";
import SectionHeader from "./SectionHeader";

interface LayerDetail {
  id: string;
  name: string;
  subtitle: string;
  status: "ACTIVE" | "VERIFIED" | "STABLE" | "OPTIMIZED";
  icon: React.ReactNode;
  techStack: string[];
  description: string;
  failureCured: string;
  businessImpact: string;
  tnmStandard: string;
  telcoProtocols: string[];
}

export default function InteractiveBlueprint() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("layer-2");

  const layers: LayerDetail[] = [
    {
      id: "layer-1",
      name: "1. Southbound Mediation & Physical Network Topology",
      subtitle: "OSS Resource Telemetry, NMS/EMS Mapping & Protocol Ingestion",
      status: "VERIFIED",
      icon: <Radio className="text-sky-500 dark:text-sky-400" size={18} />,
      techStack: ["SNMP v1/v2c/v3", "Wireshark", "NETCONF / YANG", "Oracle DB", "Aria Middleware", "G.984 GPON / FTTH"],
      telcoProtocols: ["SNMP Traps", "NetFlow / IPFIX", "ITU-T G.984 GPON", "Diameter Seagull", "Syslog Event Collectors"],
      description: "Establishes synchronous and asynchronous protocol mediation over physical and logical network endpoints. Ingests raw carrier alarms, telemetry traps, and performance metrics into normalized internal event streams.",
      failureCured: "SNMP trap-storm buffer overrides during massive fiber redundancy cuts. Mitigated by designing custom collector throttling and prioritized alarm queues.",
      businessImpact: "Achieved 100% telemetry validation uptime across multi-vendor carrier transport networks without data drops.",
      tnmStandard: "TM Forum eTOM Resource Provisioning, ITU-T G.984 physical layer specs, and IETF RFC 3416 SNMP."
    },
    {
      id: "layer-2",
      name: "2. Real-Time Event Mediation & Reactive Middleware",
      subtitle: "Java 21, Spring Boot 3.3 WebFlux, Kafka Streams & 5G SBA Ingress",
      status: "OPTIMIZED",
      icon: <Cpu className="text-indigo-500 dark:text-indigo-400" size={18} />,
      techStack: ["Java 21/17 Core", "Spring Boot 3.3", "Spring WebFlux", "Kafka Streams", "Docker & K8s (AWS EKS)", "Selenium Grid"],
      telcoProtocols: ["3GPP 5G SBA HTTP/2", "TM Forum TMF688 Event API", "gRPC Event Mesh", "Diameter Ro/Gy/Rf", "RESTful OpenAPI 3.0"],
      description: "The carrier pipeline backbone mediator, mapping JSON/ASN.1 messages into canonical TM Forum SID data schemas, balancing asynchronous subscriber ordering requests with reactive WebFlux workers.",
      failureCured: "Concurrency state lockups and async subscriber ordering race conditions during peak flash promotions. Resolved with resilient non-blocking message queues and idempotent retry policies.",
      businessImpact: "Reduced automated regression cycle durations by 40% using modular Java Selenium Grid architectures across Capgemini delivery lines.",
      tnmStandard: "TM Forum Open Digital Architecture (ODA) and RESTful OpenAPI compliant microservices."
    },
    {
      id: "layer-3",
      name: "3. Convergent BSS Billing, OCS/CCS & Rating Engine",
      subtitle: "CSG Singleview Billing, Wholesale Invoicing & Revenue Assurance",
      status: "STABLE",
      icon: <Database className="text-purple-500 dark:text-purple-400" size={18} />,
      techStack: ["CSG Singleview Billing", "Rating Engines", "Bill Data Tape (BDT)", "VZ450 Settlement", "Oracle PL/SQL", "Aria Systems"],
      telcoProtocols: ["3GPP 32.296 Charging", "Diameter Gy / Ro OCS", "ASN.1 CDR Batch Mediation", "TM Forum TMF679 Billing", "TAP3 Roaming Settlement"],
      description: "Sustains account state lifecycles, real-time balance reservations, rating state machines, wholesale carrier interconnect settlements, and bill run generation. Eliminates data mismatch leakage between CRM contracts and backend billing queues.",
      failureCured: "Post-release wholesale subscriber rate discrepancies leading to recurring monthly contract leakage across Tier-1 carriers. Protected millions in multi-vendor settlements.",
      businessImpact: "Ensured 100% zero-leakage subscriber account synchronization across 4 massive carrier transformation rollouts.",
      tnmStandard: "TM Forum TAM & SID customer schema representation, 3GPP Convergent Charging (CCS) standards."
    },
    {
      id: "layer-4",
      name: "4. Unified SLA Executive Control & TM Forum Portal",
      subtitle: "Full-Stack Portal & Real-Time Service Assurance Deck",
      status: "ACTIVE",
      icon: <Activity className="text-emerald-500 dark:text-emerald-400" size={18} />,
      techStack: ["Node.js", "Next.js", "TypeScript", "Tailwind CSS", "Spring Boot 3.x", "CI/CD GitLab", "Recharts Telemetry"],
      telcoProtocols: ["TMF620 Product Catalog", "TMF622 Product Ordering", "TMF638 Service Inventory", "TMF648 Quote API", "WCAG 2.1 AA"],
      description: "The executive operational dashboard rendering live telemetry metrics, carrier SLA compliance monitors, interactive blueprint toggles, and subscriber lifecycle audit logs.",
      failureCured: "Lack of end-to-end SLA trace visibility during multi-partner carrier launches. Engineered real-time interactive dashboards for instantaneous verification.",
      businessImpact: "Replaced slow manual compliance reporting sheets with live-updating digital blueprint analytics.",
      tnmStandard: "TM Forum Open APIs (TMF620, TMF622, TMF638, TMF679) and W3C Accessibility (WCAG 2.1 AA)."
    }
  ];

  const currentLayer = layers.find(l => l.id === selectedLayerId) || layers[1];

  return (
    <section 
      id="blueprint-section" 
      className="py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-slate-50 text-slate-900 border-b border-slate-200 transition-colors duration-500 relative"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            badgeNumber="03"
            badgeText="TELECOM BLUEPRINT SANDBOX"
            badgeColor="emerald"
            title="Carrier 4-Tier Interactive"
            gradientWord="Architecture Blueprint"
            description="Explore the end-to-end carrier architecture designed and audited by Vetrivel. Click on any tier below to audit its telecom protocols, failure modes cured, and TM Forum standards."
          />
          
          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 glass-pill rounded-xl text-xs font-mono text-slate-700 self-start lg:self-end pb-2 shadow-xs">
            <Terminal size={13} className="text-emerald-600" />
            <span>TM FORUM ODA COMPLIANT</span>
          </div>
        </div>

        {/* Visual Architecture Studio Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left 7 cols: 16:9 Image */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img 
                src="/assets/vetrivel_original_portrait.jpg" 
                alt="Vetrivel Muthusamy - Cloud Architecture Studio" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/40 to-slate-950 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <Sparkles size={13} className="text-emerald-400" />
                <span>ACTIVE ARCHITECTURAL CANVAS</span>
              </div>
            </div>

            {/* Right 5 cols: Live Architecture Specs */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  FULL-STACK CARRIER CLOUD ENGINEERING
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                  Java 21, Spring Boot & TM Forum ODA
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Vetrivel sketches and deploys robust, production-grade microservice meshes handling <strong>15,000+ TPS</strong> with Kafka event streaming, Docker containers, and TM Forum SID compliant REST/OpenAPI models.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-400 block text-[9.5px]">THROUGHPUT RATE</span>
                  <span className="text-emerald-400 font-bold">15,000+ TPS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-400 block text-[9.5px]">LATENCY PROFILE</span>
                  <span className="text-sky-400 font-bold">&lt; 15ms SUB-SECOND</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 4-Layer Selector Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between pb-1 text-xs font-mono text-slate-500">
              <span>SELECT ARCHITECTURAL TIER</span>
              <span className="text-sky-600 font-bold">END-TO-END STACK</span>
            </div>

            {layers.map((layer, index) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative flex items-center justify-between cursor-pointer focus:outline-none ${
                    isSelected
                      ? "bg-white border-sky-500 shadow-xl shadow-sky-500/10 scale-[1.02]"
                      : "glass-card border-slate-200 hover:border-slate-300 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? "bg-sky-600 text-white shadow-md shadow-sky-500/30"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      0{index + 1}
                    </div>
                    
                    <div className="space-y-0.5 truncate">
                      <h4 className="text-xs font-bold leading-tight text-slate-900 truncate">
                        {layer.name.replace(/^\d+\.\s*/, "")}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-500 truncate">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className={`shrink-0 ml-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider ${
                    isSelected 
                      ? "bg-sky-500/15 text-sky-800 border border-sky-400"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {layer.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive Inspector */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 bg-white space-y-6 shadow-xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                    {currentLayer.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-sans">
                      {currentLayer.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      {currentLayer.subtitle}
                    </p>
                  </div>
                </div>

                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentLayer.status} PRODUCTION READY
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  LAYER ARCHITECTURE SPECIFICATION
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {currentLayer.description}
                </p>
              </div>

              {/* Telco Protocols Supported */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold block flex items-center gap-1.5">
                  <FileCheck size={13} />
                  <span>TELCO PROTOCOLS & INTERFACES MEDIATED</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayer.telcoProtocols.map((proto, pIdx) => (
                    <span 
                      key={pIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-sky-50 text-sky-800 border border-sky-200 font-medium"
                    >
                      ⚡ {proto}
                    </span>
                  ))}
                </div>
              </div>

              {/* Failure Mode Cured & Business Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-700 text-xs font-mono font-bold">
                    <ShieldCheck size={14} />
                    <span>FAILURE MODE CURED</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {currentLayer.failureCured}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono font-bold">
                    <CheckCircle2 size={14} />
                    <span>BUSINESS VALUE & ROI</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {currentLayer.businessImpact}
                  </p>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  DEPLOYED TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayer.techStack.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg text-[10.5px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
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
