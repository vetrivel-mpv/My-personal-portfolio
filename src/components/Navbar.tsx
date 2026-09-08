import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Eye, 
  FileText, 
  Github, 
  Search,
  Sparkles,
  Plane,
  Menu,
  X,
  Printer
} from "lucide-react";

interface NavbarProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
  onViewAsVisitor: () => void;
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  activeSection?: string;
}

export default function Navbar({ 
  onAdminToggle, 
  isAdminMode, 
  onViewAsVisitor, 
  onOpenResume,
  onOpenCommandPalette,
  onNavigateSection,
  activeSection = "home"
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Overview", id: "home", num: "01" },
    { href: "#recruiter-hub", label: "Recruiter Hub", id: "recruiter-hub", num: "02" },
    { href: "#blueprint-section", label: "Architecture", id: "blueprint-section", num: "03" },
    { href: "#skills-section", label: "Skills", id: "skills-section", num: "04" },
    { href: "#projects", label: "Projects", id: "projects", num: "05" },
    { href: "#milestones-analytics", label: "Milestones", id: "milestones-analytics", num: "06" },
    { href: "#reflections", label: "Insights", id: "reflections", num: "07" },
    { href: "#contact", label: "Contact", id: "contact", num: "08" }
  ];

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="portfolio-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-4 md:px-6 flex justify-center ${
        isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-3.5"
      }`}
    >
      {/* Floating Futuristic Command Capsule */}
      <div 
        className={`w-full max-w-7xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-4 py-2 rounded-2xl sm:rounded-3xl transition-all duration-300 relative ${
          isScrolled
            ? "glass-panel bg-white/95 backdrop-blur-xl shadow-2xl shadow-sky-500/8 border border-slate-200/90"
            : "bg-white/90 backdrop-blur-lg border border-slate-200/80 shadow-sm"
        }`}
      >
        {/* LEFT: Brand Emblem with Executive Portrait & Status Beacon */}
        <div className="flex items-center gap-2 shrink-0">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-8.5 h-8.5 rounded-xl overflow-hidden border border-sky-500/50 shadow-md group-hover:border-sky-400 transition-all duration-300 group-hover:scale-105">
                <img
                  src="/assets/vetrivel_original_blazer.jpg"
                  alt="Vetrivel Muthusamy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>

            <div className="flex flex-col text-left justify-center">
              <div className="flex items-center gap-1 leading-tight">
                <span className="font-sans font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors whitespace-nowrap">
                  Vetrivel<span className="text-sky-600">.M</span>
                </span>
                <span className="hidden 2xl:inline-flex items-center px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200 whitespace-nowrap">
                  QA LEAD
                </span>
              </div>
              <span className="hidden md:inline-flex items-center gap-1 text-[9.5px] font-mono text-slate-500 tracking-wider whitespace-nowrap">
                <span>10+ YRS</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 font-bold">SG 🇸🇬 • UK 🇬🇧 • US 🇺🇸</span>
              </span>
            </div>
          </a>
        </div>

        {/* CENTER: Navigation Hub with Animated Indicators */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 border border-slate-200 shadow-inner select-none overflow-x-auto scrollbar-none">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold shadow-md shadow-sky-500/20 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80 font-medium"
                }`}
              >
                <span className={`text-[9px] ${isActive ? "text-sky-100 font-extrabold" : "text-slate-400"}`}>
                  {link.num}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Action & Utility Controls */}
        <div className="flex items-center gap-2">
          
          {/* Quick Command Palette (⌘K) Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              title="Search & Quick Commands (⌘K)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-sky-500 bg-slate-100/90 text-slate-700 hover:text-slate-950 text-xs font-mono transition-all duration-200 cursor-pointer group"
            >
              <Search size={13} className="text-slate-500 group-hover:text-sky-600 transition-colors" />
              <span className="hidden xl:inline text-[11px] text-slate-600">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-500 bg-white rounded border border-slate-200 group-hover:border-sky-500/50">
                ⌘K
              </kbd>
            </button>
          )}

          {/* AI Tailored CV Launch CTA */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              id="resumeBtn"
              title="Tailor CV to Any Job Description"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
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
            title="GitHub Repositories"
            className="no-print hidden sm:flex items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-100/90 text-slate-600 hover:text-slate-950 transition-all duration-200 cursor-pointer"
          >
            <Github size={14} />
          </a>

          {/* Admin Management Toggle */}
          {isAdminMode ? (
            <button
              onClick={onViewAsVisitor}
              id="visitor-view-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer"
            >
              <Eye size={12} />
              <span className="hidden sm:inline">Visitor</span>
            </button>
          ) : (
            <button
              onClick={onAdminToggle}
              id="admin-dashboard-toggle-btn"
              title="Open Admin Console"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100 text-xs font-mono font-medium transition-all duration-200 cursor-pointer"
            >
              <Lock size={12} className="opacity-70" />
              <span className="hidden xl:inline text-[11px]">Admin</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu size={18} />
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-3 right-3 mt-2 p-5 rounded-3xl bg-white border border-slate-200 shadow-2xl z-50 lg:hidden space-y-4 animate-scale-up text-left font-mono">
            
            {/* Mobile Header with Avatar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/vetrivel_original_blazer.jpg"
                  alt="Vetrivel"
                  className="w-9 h-9 rounded-xl object-cover border border-sky-500/40"
                />
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Vetrivel Muthusamy</span>
                  <span className="text-[10px] text-emerald-700 flex items-center gap-1">
                    <Plane size={10} />
                    <span>Global Travel Ready</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-950"
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
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`p-2.5 rounded-xl text-xs border transition-colors flex items-center gap-2 ${
                    activeSection === link.id
                      ? "bg-sky-50 border-sky-300 text-sky-700 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-[10px] text-sky-600 font-bold">{link.num}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
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
                    className="flex-1 py-2 rounded-xl text-xs bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <Search size={13} />
                    <span>Search (⌘K)</span>
                  </button>
                )}
                {onOpenResume && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                    className="flex-1 py-2 rounded-xl text-xs bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer size={13} />
                    <span>Print CV</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </>
      )}

    </header>
  );
}
