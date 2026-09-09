import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  badgeNumber?: string;
  badgeText: string;
  badgeIcon?: React.ReactNode;
  badgeColor?: "sky" | "indigo" | "emerald" | "purple" | "amber" | "rose";
  title: string;
  gradientWord?: string;
  subtitle?: string;
  description?: string;
  rightElement?: React.ReactNode;
  align?: "left" | "center";
}

const COLOR_MAP = {
  sky: {
    badgeBg: "bg-sky-50 border-sky-300 text-sky-800",
    radarPing: "bg-sky-400",
    radarCore: "bg-sky-600",
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    line: "from-sky-500 via-blue-500 to-transparent",
    glow: "rgba(14, 165, 233, 0.12)"
  },
  indigo: {
    badgeBg: "bg-indigo-50 border-indigo-300 text-indigo-800",
    radarPing: "bg-indigo-400",
    radarCore: "bg-indigo-600",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    line: "from-indigo-500 via-purple-500 to-transparent",
    glow: "rgba(99, 102, 241, 0.12)"
  },
  emerald: {
    badgeBg: "bg-emerald-50 border-emerald-300 text-emerald-800",
    radarPing: "bg-emerald-400",
    radarCore: "bg-emerald-600",
    gradient: "from-emerald-600 via-teal-600 to-sky-600",
    line: "from-emerald-500 via-teal-500 to-transparent",
    glow: "rgba(16, 185, 129, 0.12)"
  },
  purple: {
    badgeBg: "bg-purple-50 border-purple-300 text-purple-800",
    radarPing: "bg-purple-400",
    radarCore: "bg-purple-600",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    line: "from-purple-500 via-violet-500 to-transparent",
    glow: "rgba(168, 85, 247, 0.12)"
  },
  amber: {
    badgeBg: "bg-amber-50 border-amber-300 text-amber-800",
    radarPing: "bg-amber-400",
    radarCore: "bg-amber-600",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    line: "from-amber-500 via-orange-500 to-transparent",
    glow: "rgba(245, 158, 11, 0.12)"
  },
  rose: {
    badgeBg: "bg-rose-50 border-rose-300 text-rose-800",
    radarPing: "bg-rose-400",
    radarCore: "bg-rose-600",
    gradient: "from-rose-600 via-pink-600 to-purple-600",
    line: "from-rose-500 via-pink-500 to-transparent",
    glow: "rgba(244, 63, 94, 0.12)"
  }
};

export default function SectionHeader({
  badgeNumber,
  badgeText,
  badgeIcon,
  badgeColor = "sky",
  title,
  gradientWord,
  subtitle,
  description,
  rightElement,
  align = "left"
}: SectionHeaderProps) {
  const theme = COLOR_MAP[badgeColor];
  const summaryText = subtitle || description || "";

  return (
    <div className={`space-y-3.5 ${align === "center" ? "text-center items-center" : "text-left"} select-none relative`}>
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
          {badgeNumber && <span className="font-mono font-extrabold opacity-75">{badgeNumber}</span>}
          {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
          <span>{badgeText}</span>
        </span>
      </div>

      {/* Main Title & Right Elements */}
      <div className={`flex flex-col ${align === "center" ? "items-center" : "lg:flex-row lg:items-end justify-between"} gap-5`}>
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-sans leading-tight">
            {title}{" "}
            {gradientWord && (
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient} animate-gradient-text inline-block`}>
                {gradientWord}
              </span>
            )}
          </h2>

          {summaryText && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
              {summaryText}
            </p>
          )}
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
