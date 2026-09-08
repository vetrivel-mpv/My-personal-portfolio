import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  badgeText: string;
  badgeIcon?: React.ReactNode;
  badgeColor?: "sky" | "indigo" | "emerald" | "purple" | "amber" | "rose";
  title: string;
  gradientWord?: string;
  subtitle: string;
  rightElement?: React.ReactNode;
  align?: "left" | "center";
}

const COLOR_MAP = {
  sky: {
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/30 text-sky-700 dark:text-sky-300",
    radarPing: "bg-sky-400",
    radarCore: "bg-sky-500",
    gradient: "from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300",
    line: "from-sky-500 via-blue-500 to-transparent",
    glow: "rgba(14, 165, 233, 0.15)"
  },
  indigo: {
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
    radarPing: "bg-indigo-400",
    radarCore: "bg-indigo-500",
    gradient: "from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-300",
    line: "from-indigo-500 via-purple-500 to-transparent",
    glow: "rgba(99, 102, 241, 0.15)"
  },
  emerald: {
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    radarPing: "bg-emerald-400",
    radarCore: "bg-emerald-500",
    gradient: "from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-400 dark:via-teal-400 dark:to-sky-300",
    line: "from-emerald-500 via-teal-500 to-transparent",
    glow: "rgba(16, 185, 129, 0.15)"
  },
  purple: {
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300",
    radarPing: "bg-purple-400",
    radarCore: "bg-purple-500",
    gradient: "from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-300",
    line: "from-purple-500 via-violet-500 to-transparent",
    glow: "rgba(168, 85, 247, 0.15)"
  },
  amber: {
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    radarPing: "bg-amber-400",
    radarCore: "bg-amber-500",
    gradient: "from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-300",
    line: "from-amber-500 via-orange-500 to-transparent",
    glow: "rgba(245, 158, 11, 0.15)"
  },
  rose: {
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-300",
    radarPing: "bg-rose-400",
    radarCore: "bg-rose-500",
    gradient: "from-rose-600 via-pink-600 to-purple-600 dark:from-rose-400 dark:via-pink-400 dark:to-purple-300",
    line: "from-rose-500 via-pink-500 to-transparent",
    glow: "rgba(244, 63, 94, 0.15)"
  }
};

export default function SectionHeader({
  badgeText,
  badgeIcon,
  badgeColor = "sky",
  title,
  gradientWord,
  subtitle,
  rightElement,
  align = "left"
}: SectionHeaderProps) {
  const theme = COLOR_MAP[badgeColor];

  return (
    <div className={`space-y-4 ${align === "center" ? "text-center items-center" : "text-left"} select-none relative`}>
      {/* Luminous Ambient Glow Background */}
      <div 
        className="absolute -top-10 left-0 w-72 h-32 rounded-full blur-[80px] pointer-events-none -z-10 opacity-60"
        style={{ background: theme.glow }}
      />

      {/* Animated Badge Pill */}
      <div className={`flex items-center gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}>
        <span className={`section-badge border shadow-xs ${theme.badgeBg}`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.radarPing}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.radarCore}`} />
          </span>
          {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
          <span>{badgeText}</span>
        </span>
      </div>

      {/* Main Title & Right Elements */}
      <div className={`flex flex-col ${align === "center" ? "items-center" : "lg:flex-row lg:items-end justify-between"} gap-5`}>
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-tight">
            {title}{" "}
            {gradientWord && (
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient} animate-gradient-text inline-block`}>
                {gradientWord}
              </span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-normal">
            {subtitle}
          </p>
        </div>

        {rightElement && (
          <div className="shrink-0 self-start lg:self-end">
            {rightElement}
          </div>
        )}
      </div>

      {/* Animated Laser Accent Line */}
      <div className={`h-[2px] w-full max-w-xs bg-gradient-to-r ${theme.line} rounded-full animate-laser-line mt-2`} />
    </div>
  );
}
