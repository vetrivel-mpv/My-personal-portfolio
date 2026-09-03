import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  Sun, 
  Moon, 
  Lock, 
  Eye, 
  FileText, 
  Monitor, 
  ChevronDown, 
  Printer, 
  Github, 
  Search,
  Sparkles,
  Command,
  Plane,
  Menu,
  X,
  Radio,
  Layers,
  Award,
  Globe2,
  Mail,
  ShieldCheck,
  Zap
} from "lucide-react";

interface NavbarProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
  onViewAsVisitor: () => void;
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
  activeSection?: string;
}

export default function Navbar({ 
  onAdminToggle, 
  isAdminMode, 
  onViewAsVisitor, 
  onOpenResume,
  onOpenCommandPalette,
  activeSection = "home"
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  type ThemeMode = "light" | "dark" | "system";
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("vetrivel_portfolio_theme_mode") as ThemeMode;
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
    return "dark";
  });

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = () => {
      let isDarkActive = false;
      if (themeMode === "system") {
        isDarkActive = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        isDarkActive = themeMode === "dark";
      }

      if (isDarkActive) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    };

    applyTheme();
    localStorage.setItem("vetrivel_portfolio_theme_mode", themeMode);

    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeMode]);

  const navLinks = [
    { href: "#home", label: "Story", id: "home", num: "01" },
    { href: "#storyboard", label: "Chronicles", id: "storyboard", num: "02" },
    { href: "#blueprint-section", label: "Blueprint", id: "blueprint-section", num: "03" },
    { href: "#skills-analytics-section", label: "Skills", id: "skills-analytics-section", num: "04" },
    { href: "#projects", label: "Showcase", id: "projects", num: "05" },
    { href: "#reflections", label: "Memoirs", id: "reflections", num: "06" },
    { href: "#contact", label: "Contact", id: "contact", num: "07" }
  ];

  return (
    <header
      id="portfolio-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 md:px-8 flex justify-center ${
        isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4"
      }`}
    >
      {/* Floating Futuristic Command Capsule */}
      <div 
        className={`w-full max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-5 py-2 rounded-2xl sm:rounded-3xl transition-all duration-300 relative ${
          isScrolled
            ? "glass-panel bg-white/90 dark:bg-slate-950/85 backdrop-blur-xl shadow-2xl shadow-sky-500/5 border border-slate-200/90 dark:border-sky-500/30"
            : "bg-white/70 dark:bg-slate-950/60 backdrop-blur-lg border border-slate-200/80 dark:border-slate-800/80"
        }`}
      >
        {/* LEFT: Brand Emblem with Mini Avatar & Status Beacon */}
        <div className="flex items-center gap-3">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border border-sky-500/50 shadow-md group-hover:border-sky-400 transition-all duration-300 group-hover:scale-105">
                <img
                  src="/assets/vetrivel_comic_tech_architect.jpg"
                  alt="Vetrivel Muthusamy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  Vetrivel<span className="text-sky-500 dark:text-sky-400">.M</span>
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  LEAD ARCHITECT
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1">
                <span>TELECOM OSS/BSS</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <Plane size={9} />
                  <span>TRAVEL READY</span>
                </span>
              </span>
            </div>
          </a>
        </div>

        {/* CENTER: Cyber Navigation Hub with Numbered Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 shadow-inner select-none">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white dark:bg-gradient-to-r dark:from-sky-500/20 dark:via-blue-600/20 dark:to-indigo-500/20 text-sky-600 dark:text-sky-300 font-bold border border-slate-200 dark:border-sky-500/40 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 font-medium"
                }`}
              >
                <span className={`text-[9px] ${isActive ? "text-sky-600 dark:text-sky-400 font-extrabold" : "text-slate-400 dark:text-slate-500"}`}>
                  {link.num}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-sky-500 dark:bg-sky-400 animate-ping absolute top-1 right-1" />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Action & Utility Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Quick Command Palette (⌘K) Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              title="Search & Quick Commands (⌘K)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 bg-slate-100/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-mono transition-all duration-200 cursor-pointer group"
            >
              <Search size={13} className="text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" />
              <span className="hidden xl:inline text-[11px] text-slate-500 dark:text-slate-400">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 group-hover:border-sky-500/50">
                ⌘K
              </kbd>
            </button>
          )}

          {/* AI Tailored CV Launch CTA */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              id="resumeBtn"
              title="Generate & Export Real-Time Tailored CV"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles size={13} className="shrink-0 text-sky-200 animate-pulse" />
              <span className="hidden sm:inline">AI CV</span>
              <span className="sm:hidden">CV</span>
            </button>
          )}

          {/* GitHub Link */}
          <a
            href="https://github.com/vetrivelm"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repositories & Architecture Artifacts"
            className="no-print hidden sm:flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-100/90 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all duration-200 cursor-pointer"
          >
            <Github size={14} />
          </a>

          {/* Print PDF Trigger */}
          <button
            onClick={() => window.print()}
            id="printPdfBtn"
            title="Print Portfolio or Save as Document PDF"
            className="no-print hidden md:flex items-center gap-1 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-100/90 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all duration-200 cursor-pointer"
          >
            <Printer size={14} />
          </button>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              id="theme-toggle-btn"
              title="Theme Switcher"
              className="h-8.5 px-2 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100/90 dark:bg-slate-900/80 transition-colors duration-200 text-xs font-mono cursor-pointer"
            >
              {themeMode === "light" && <Sun size={13} className="text-amber-500 theme-icon-animate" />}
              {themeMode === "dark" && <Moon size={13} className="text-sky-400 theme-icon-animate" />}
              {themeMode === "system" && <Monitor size={13} className="text-emerald-500 theme-icon-animate" />}
              <ChevronDown size={11} className={`opacity-60 transition-transform duration-200 ${isThemeMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isThemeMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-45 cursor-default" 
                  onClick={() => setIsThemeMenuOpen(false)} 
                />
                <div 
                  id="theme-menu-dropdown"
                  className="absolute right-0 mt-2 w-32 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1.5 shadow-2xl font-mono text-[10px] z-50 space-y-0.5 text-left animate-scale-up"
                >
                  <button
                    onClick={() => { setThemeMode("light"); setIsThemeMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer font-bold ${
                      themeMode === "light" ? "bg-slate-100 text-sky-600 dark:text-sky-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    <Sun size={12} className="text-amber-500" />
                    <span>Light</span>
                  </button>

                  <button
                    onClick={() => { setThemeMode("dark"); setIsThemeMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer font-bold ${
                      themeMode === "dark" ? "bg-slate-800 text-sky-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    <Moon size={12} className="text-sky-400" />
                    <span>Dark</span>
                  </button>

                  <button
                    onClick={() => { setThemeMode("system"); setIsThemeMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer font-bold ${
                      themeMode === "system" ? "bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    <Monitor size={12} className="text-emerald-500" />
                    <span>System</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Admin Management Toggle */}
          {isAdminMode ? (
            <button
              onClick={onViewAsVisitor}
              id="visitor-view-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20 text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer"
            >
              <Eye size={12} />
              <span className="hidden sm:inline">Visitor</span>
            </button>
          ) : (
            <button
              onClick={onAdminToggle}
              id="admin-dashboard-toggle-btn"
              title="Open Admin Console"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-mono font-medium transition-all duration-200 cursor-pointer"
            >
              <Lock size={12} className="opacity-70" />
              <span className="hidden xl:inline text-[11px]">Admin</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-3 right-3 mt-2 p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 lg:hidden space-y-4 animate-scale-up text-left font-mono">
            
            {/* Mobile Header with Avatar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-850">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/vetrivel_avatar_architect.jpg"
                  alt="Vetrivel"
                  className="w-9 h-9 rounded-xl object-cover border border-sky-500/40"
                />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white text-xs block">Vetrivel Muthusamy</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Plane size={10} />
                    <span>Global Travel Ready</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-xs border transition-colors flex items-center gap-2 ${
                    activeSection === link.id
                      ? "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/40 text-sky-600 dark:text-sky-300 font-bold"
                      : "bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">{link.num}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-850 space-y-2">
              {onOpenResume && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles size={14} />
                  <span>AI JOB DESCRIPTION TAILOR (GEMINI)</span>
                </button>
              )}

              <div className="flex gap-2">
                {onOpenCommandPalette && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
                    className="flex-1 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5"
                  >
                    <Search size={13} />
                    <span>Search (⌘K)</span>
                  </button>
                )}
                <button
                  onClick={() => { setMobileMenuOpen(false); window.print(); }}
                  className="flex-1 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Printer size={13} />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

          </div>
        </>
      )}

    </header>
  );
}
