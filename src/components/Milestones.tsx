import React, { useState, useEffect } from "react";
import { 
  History, 
  TrendingUp, 
  Activity, 
  TrendingDown, 
  Atom, 
  Cpu, 
  ArrowUpRight,
  Sparkles,
  Layers,
  BarChart3,
  LineChart
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

// Trajectory telemetry dataset from real LinkedIn career history
const growthTimelineData = [
  {
    year: "2014-17",
    stage: "GapBridge (QA Engineer)",
    company: "GapBridge",
    verifiedEndpoints: 20,
    automatedTestCases: 250,
    carrierSubscribersM: 3.5,
    highlight: "Pricing & Billing UAT"
  },
  {
    year: "2017-19",
    stage: "Tech Mahindra (Test Analyst)",
    company: "Tech Mahindra",
    verifiedEndpoints: 60,
    automatedTestCases: 750,
    carrierSubscribersM: 12.0,
    highlight: "CIT Domain Excellence Award & BT Retail"
  },
  {
    year: "2019-21",
    stage: "Cognizant (Project Engineer)",
    company: "Cognizant",
    verifiedEndpoints: 110,
    automatedTestCases: 1600,
    carrierSubscribersM: 28.0,
    highlight: "Inmarsat Star Performer & Nokia 3Group"
  },
  {
    year: "2021-22",
    stage: "Prodapt (Lead Test Engineer)",
    company: "Prodapt",
    verifiedEndpoints: 180,
    automatedTestCases: 3100,
    carrierSubscribersM: 65.0,
    highlight: "Nokia WING 10M+ Subs UAT & Singleview"
  },
  {
    year: "2022-25",
    stage: "Capgemini (Senior Professional / QA Lead)",
    company: "Capgemini Engineering",
    verifiedEndpoints: 260,
    automatedTestCases: 4800,
    carrierSubscribersM: 100.0,
    highlight: "Customer Delight Award & AT&T Connection Mgr"
  }
];

const efficiencyImpactData = [
  {
    metric: "Manual Testing Effort",
    beforeSkill: 100,
    afterArchitect: 50,
    unit: "% (-50% CUT)"
  },
  {
    metric: "Post-Release Defect Escapes",
    beforeSkill: 100, 
    afterArchitect: 70, 
    unit: "% (-30% DROP)"
  },
  {
    metric: "Regression Cycle Duration",
    beforeSkill: 100, 
    afterArchitect: 60, 
    unit: "% (-40% FASTER)"
  },
  {
    metric: "Automation Coverage",
    beforeSkill: 25, 
    afterArchitect: 98, 
    unit: "%"
  }
];

export default function Milestones() {
  const [activeTab, setActiveTab] = useState<"growth" | "metrics">("growth");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const CustomTimelineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-2xl font-mono text-xs text-slate-900 dark:text-slate-100 max-w-[280px] space-y-2">
          <div className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 font-sans">
            {data.stage} ({data.year})
          </div>
          <div className="space-y-1 text-[11px]">
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 dark:text-slate-400">OSS Endpoints:</span>
              <strong className="text-slate-900 dark:text-white font-sans">{data.verifiedEndpoints} nodes</strong>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 dark:text-slate-400">Automated Cases:</span>
              <strong className="text-slate-900 dark:text-white font-sans">{data.automatedTestCases} scripts</strong>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 dark:text-slate-400">Carrier Subscribers:</span>
              <strong className="text-slate-900 dark:text-white font-sans">{data.carrierSubscribersM}M</strong>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomImpactTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-2xl font-mono text-xs text-slate-900 dark:text-slate-100 max-w-[280px] space-y-2">
          <div className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 leading-tight font-sans">
            {data.metric}
          </div>
          <div className="space-y-1 text-[11px]">
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 dark:text-slate-400">Legacy Architecture:</span>
              <span className="text-slate-400 line-through font-sans">{data.beforeSkill}{data.unit}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 dark:text-slate-400">Optimized Stream:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-sans">{data.afterArchitect}{data.unit}</strong>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section 
      id="milestones-analytics"
      className="py-24 px-4 md:px-8 xl:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 select-none">
              <span className="h-[1px] w-6 bg-sky-500" />
              <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest">
                VERIFIABLE HISTORICAL DATA & IMPACT
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                Career Trajectory & Delivery Analytics
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Analyzing 11+ years of cumulative scale: from test execution specialist to leading multi-million subscriber BSS transformations and automated Selenium grids.
              </p>
            </div>
          </div>

          {/* Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 self-start lg:self-auto select-none">
            <button
              onClick={() => setActiveTab("growth")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "growth"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <LineChart size={14} />
              <span>CUMULATIVE GROWTH</span>
            </button>

            <button
              onClick={() => setActiveTab("metrics")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "metrics"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <BarChart3 size={14} />
              <span>EFFICIENCY DELTA</span>
            </button>
          </div>
        </div>

        {/* Dynamic Telemetry Graph Container */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-2xl relative overflow-hidden">
          
          {/* Subtle graph topbar */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-slate-800 dark:text-slate-200 font-bold uppercase">
                {activeTab === "growth" ? "Historical Subscriber & Script Volume" : "Architecture Efficiency Benchmarks"}
              </span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-medium">100% Zero Defect Release Audit</span>
          </div>

          <div className="h-80 sm:h-96 w-full pt-6 min-w-0 min-h-[320px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                {activeTab === "growth" ? (
                  <AreaChart data={growthTimelineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="subscribersGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="scriptsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#94a3b8" fontSize={11} fontFamily="monospace" />
                    <Tooltip content={<CustomTimelineTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="carrierSubscribersM" 
                      name="Carrier Subscribers (M)" 
                      stroke="#0284c7" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#subscribersGrad)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="automatedTestCases" 
                      name="Automated Scripts" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#scriptsGrad)" 
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={efficiencyImpactData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                    <XAxis dataKey="metric" stroke="#94a3b8" fontSize={10.5} fontFamily="monospace" />
                    <YAxis stroke="#94a3b8" fontSize={11} fontFamily="monospace" />
                    <Tooltip content={<CustomImpactTooltip />} />
                    <Bar dataKey="beforeSkill" name="Legacy Baseline" fill="#64748b" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="afterArchitect" name="Optimized Architecture" fill="#0284c7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full min-h-[300px] flex items-center justify-center text-slate-400 font-mono text-xs">
                Loading Telemetry Chart...
              </div>
            )}
          </div>

          {/* Legend row */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
            {activeTab === "growth" ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Carrier Subscribers (Millions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Automated Test Suites</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-slate-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Legacy Architecture Baseline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Optimized Solution Stream</span>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
