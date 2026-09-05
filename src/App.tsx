import React, { useState, useEffect } from "react";
import { 
  Award, 
  Briefcase, 
  ChevronUp, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  RefreshCw, 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Cpu,
  Network,
  Sparkles,
  Command
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecruiterHub from "./components/RecruiterHub";
import ComicStoryboard from "./components/ComicStoryboard";
import ResumeModal from "./components/ResumeModal";
import InteractiveBlueprint from "./components/InteractiveBlueprint";
import Milestones from "./components/Milestones";
import SkillMap from "./components/SkillMap";
import AIChatbot from "./components/AIChatbot";
import ProjectGallery from "./components/ProjectGallery";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";
import CommandPalette from "./components/CommandPalette";
import { getProjects, getBlogs } from "./db/storage";
import { Project, BlogPost } from "./types";

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Dynamic local state variables
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailStr = "vetrivelm02@gmail.com";
    navigator.clipboard.writeText(emailStr)
      .then(() => {
        triggerToast("✓ Email copied: vetrivelm02@gmail.com");
      })
      .catch(() => {
        triggerToast("⚠️ Copy failed. Email: vetrivelm02@gmail.com");
      });
  };

  // Synchronize data on updates
  useEffect(() => {
    setProjects(getProjects());
    setBlogs(getBlogs());
  }, [refreshTrigger]);

  // Scroll listener for scroll-to-top and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);

      // Section spy
      const sections = [
        "home",
        "recruiter-hub",
        "storyboard",
        "skills-analytics-section",
        "projects",
        "milestones-analytics",
        "blueprint-section",
        "reflections",
        "contact"
      ];

      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRefreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setThemeExplicitly = (theme: "light" | "dark" | "system") => {
    localStorage.setItem("vetrivel_portfolio_theme_mode", theme);
    const root = document.documentElement;
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    triggerToast(`✓ Theme set to ${theme.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 transition-colors duration-500 font-sans antialiased">
      
      {/* Floating Redesigned Glass Navbar */}
      <Navbar
        isAdminMode={isAdminMode}
        onAdminToggle={() => setIsAdminMode(true)}
        onViewAsVisitor={() => setIsAdminMode(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {isAdminMode ? (
          // Admin Command Dashboard
          <div className="animate-fade-up max-w-7xl mx-auto py-24 px-4 md:px-8">
            <AdminDashboard onDataChanged={handleRefreshData} />
          </div>
        ) : (
          // High-Fidelity Professional Visitor Journey
          <div>
            
            {/* 1. Hero Showcase with Live Pipeline Orchestrator */}
            <Hero
              onExploreProjects={() => scrollToSection("projects")}
              onExploreVision={() => scrollToSection("recruiter-hub")}
              onOpenResume={() => setIsResumeOpen(true)}
              onNavigateSection={scrollToSection}
            />

            {/* 2. Recruiter & Hiring Manager Hub */}
            <RecruiterHub
              onOpenResume={() => setIsResumeOpen(true)}
              onExploreProjects={() => scrollToSection("projects")}
              onNavigateSection={scrollToSection}
            />

            {/* 3. Interactive Graphic Novel Comic Chronicles */}
            <ComicStoryboard />

            {/* 4. Telecom Skill Matrix & Live Protocol Simulator */}
            <SkillMap />

            {/* 5. Enterprise Carrier Engagements & Deep Dives */}
            <ProjectGallery projects={projects} />

            {/* 6. Career Milestones & Corporate Honors */}
            <Milestones />

            {/* 7. Interactive Carrier Systems Blueprint */}
            <div id="blueprint-section">
              <InteractiveBlueprint />
            </div>

            {/* 8. Engineering Reflections & Technical Chronicles */}
            <BlogSection blogs={blogs} />

            {/* 9. Contact & Consultation Scheduler */}
            <ContactForm onMessageSubmitted={handleRefreshData} />

          </div>
        )}
      </main>

      {/* Redesigned Luxury Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-12 px-4 md:px-8 lg:px-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left select-none">
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 bg-sky-500 text-white rounded-lg flex items-center justify-center font-mono font-bold text-xs">
                VM
              </div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                VETRIVEL MUTHUSAMY
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-md">
              Solution Architect & Lead Test Architect · TM Forum ODA, CSG Singleview BSS, Java 21 Spring Boot Microservices, and Global Mobility.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <button 
              onClick={handleCopyEmail}
              id="footer-copy-email-trigger"
              className="hover:text-sky-600 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-mono font-bold text-xs"
              title="Click to copy email"
            >
              <Mail size={13} className="shrink-0 text-sky-500" />
              <span>vetrivelm02@gmail.com</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700 hidden md:inline">·</span>
            
            <a 
              href="https://linkedin.com/in/vetrivelm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-sky-600 dark:hover:text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Linkedin size={13} className="text-sky-500" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700 hidden md:inline">·</span>

            <a 
              href="https://github.com/vetrivelm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-sky-600 dark:hover:text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Github size={13} className="text-slate-600 dark:text-slate-300" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700 hidden md:inline">·</span>

            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hover:text-sky-600 dark:hover:text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Command size={12} className="text-sky-500" />
              <span>⌘K</span>
            </button>
          </div>

        </div>
      </footer>

      {/* Floating Clipboard Copy Alert Toast */}
      {toastMessage && (
        <div 
          id="clipboard-toast"
          className="fixed bottom-10 right-6 z-55 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-slate-700 text-white text-xs font-mono rounded-xl shadow-2xl transition-all duration-300 animate-slide-in-right"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-sans font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          className="fixed bottom-6 right-8 w-11 h-11 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center hover:scale-105 shadow-xl transition-all duration-300 cursor-pointer z-45"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateSection={scrollToSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAI={() => {
          // Open AI chatbot
          const chatBtn = document.getElementById("ai-chatbot-toggle-button");
          if (chatBtn) chatBtn.click();
        }}
        onSetTheme={setThemeExplicitly}
        onTriggerToast={triggerToast}
      />

      {/* Floating AI Assistant Integration */}
      <AIChatbot />

      {/* Customizable CV Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* Fallback Printable CV (Active if browser print is triggered outside the modal) */}
      {!isResumeOpen && (
        <div id="fallback-printable-cv" className="hidden print:block">
          {/* ================= PAGE 1 ================= */}
          <div className="cv-page-1 space-y-5 print:space-y-3">
            <div className="pb-5 border-b border-slate-800 print:border-b-2 print:border-sky-600 print:pb-2 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight cv-print-name">
                  VETRIVEL MUTHUSAMY
                </h1>
                <p className="text-sm font-mono text-sky-400 font-bold cv-print-title">
                  Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager (10+ Yrs Exp)
                </p>
                <div className="pt-1">
                  <span className="cv-print-mobility-pill text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <span><strong>Targeting:</strong> Singapore 🇸🇬 · United Kingdom 🇬🇧 · United States 🇺🇸 (100% Relocation Ready)</span>
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1 text-slate-400 font-mono text-[11px] cv-print-muted shrink-0">
                <p>vetrivelm02@gmail.com</p>
                <p>(+91) 9916008877</p>
                <p>Bengaluru, Karnataka, India</p>
                <p>linkedin.com/in/vetrivelm</p>
              </div>
            </div>

            <div className="space-y-1.5 cv-avoid-break">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 cv-print-section-header">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="leading-relaxed text-slate-300 text-xs print:text-[8.5pt] print:text-slate-800">
                Senior Telecom QA Lead & UAT Delivery Manager with <strong>over 10 years of specialized enterprise domain experience</strong> in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). <strong>Managed cross-functional QA teams of 15+ engineers under Agile/Scrum</strong>, cutting manual testing efforts by <strong>50%</strong> and reducing post-release issues by <strong>30%</strong> with zero defect leakage across Tier-1 carriers (British Telecom, Verizon, Inmarsat, AT&T, Nokia 3Group). Holds a <strong>Postgraduate Diploma in Software Development</strong>. <strong>Actively targeting overseas roles in Singapore, UK, and USA.</strong>
              </p>
            </div>

            <div className="space-y-1.5 cv-avoid-break">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 cv-print-section-header">
                CORE TELECOM & ENGINEERING ARSENAL
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs cv-print-grid-2">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-white block font-mono text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Agile QA Leadership & Team Governance
                  </strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.8pt] print:text-slate-700">
                    Managed 15+ QA Engineers, Sprint Ceremonies, Risk-Based Test Strategy, Carrier UAT Governance, Defect Triage (JIRA/Zephyr).
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-white block font-mono text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Telecom BSS & Nokia WING (10M+ Subs)
                  </strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.8pt] print:text-slate-700">
                    CSG Singleview Billing, Nokia WING Migration UAT, Diameter Gy/Ro Charging, MRR, MRC/NRC Charges, SFTP & Invoicing PDF Generation.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-white block font-mono text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Enterprise IoT & Network Testing
                  </strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.8pt] print:text-slate-700">
                    AT&T Connection Manager (Device Telemetry & Dynamic Quota Throttling), Real SIM 4G LTE/5G NSA (Voice, SMS, Data from India testbeds).
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-white block font-mono text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Technical Literacy & Software Foundation
                  </strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.8pt] print:text-slate-700">
                    PG Diploma Software Development (Full Stack), REST API Contract Testing (Postman/Swagger), TM Forum Open APIs (TMF620/622), SQL Auditing.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 cv-avoid-break">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1 cv-print-section-header">
                HONORS & CORPORATE AWARDS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs cv-print-grid-2">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-amber-400 block font-mono text-[11px] cv-print-award-title">🏆 Customer Delight Award</strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.5pt] print:text-slate-700">Capgemini Engineering — Customer-first excellence (Q3 2022).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-amber-400 block font-mono text-[11px] cv-print-award-title">🏆 Outstanding Delivery in ER&D</strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.5pt] print:text-slate-700">Capgemini Engineering ER&D Sector (Q2 2022).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-amber-400 block font-mono text-[11px] cv-print-award-title">⭐ Star Performer Award</strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.5pt] print:text-slate-700">Cognizant — Inmarsat BTP Project.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850 cv-print-card">
                  <strong className="text-amber-400 block font-mono text-[11px] cv-print-award-title">⭐ CIT Domain Excellence Award</strong>
                  <span className="text-[11px] text-slate-300 print:text-[7.5pt] print:text-slate-700">Tech Mahindra — Deep telecom domain knowledge.</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 cv-avoid-break">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 cv-print-section-header">
                CERTIFICATIONS & EDUCATION
              </h3>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 cv-print-chip">
                  SDC16 PG Diploma Full Stack (IIIT-B)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 cv-print-chip">
                  Google IT Automation with Python
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-orange-300 cv-print-chip">
                  AWS Cloud Practitioner
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 cv-print-chip">
                  Oracle OCWCD
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 cv-print-chip">
                  MS Software Eng (Liverpool John Moores Univ)
                </span>
              </div>
            </div>
          </div>

          {/* ================= PAGE BREAK ================= */}
          <div className="cv-page-break" />

          {/* ================= PAGE 2 ================= */}
          <div className="cv-page-2 space-y-5 print:space-y-3 print:pt-2">
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 cv-print-section-header">
                PROFESSIONAL EXPERIENCE
              </h3>

              <div className="space-y-1.5 cv-avoid-break">
                <div className="flex justify-between items-baseline border-b border-slate-800/60 pb-1 print:border-b print:border-slate-200">
                  <div>
                    <h4 className="font-bold text-white text-xs print:text-[9pt] print:text-slate-900">
                      Capgemini Engineering — Senior Professional / Test Architect & Agile QA Lead
                    </h4>
                    <span className="text-[10.5px] font-mono text-sky-400 print:text-sky-700">
                      Enterprise IoT & Carrier Solutions
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-400 print:text-slate-600">
                    Jan 2022 — Aug 2025 (3 yrs 8 mos)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 print:text-[8pt] print:text-slate-700">
                  <li><strong>Managed a cross-functional QA team of 15+ test engineers</strong> under Agile/Scrum, directing sprint planning, test strategy, and carrier acceptance milestones.</li>
                  <li>Cut manual testing efforts by <strong>50%</strong> and reduced post-release production defect escapes by <strong>30%</strong> through modular test architecture.</li>
                  <li>Led QA and validation for <strong>AT&T Connection Manager</strong>: Enterprise IoT device telemetry, real-time data quota policy throttling, and billing mediation.</li>
                  <li>Delivered robust architecture governance for global carrier accounts including <strong>Verizon Wireless</strong> and <strong>AT&T Enterprise</strong>.</li>
                  <li>Honored with <strong>Customer Delight Award (Q3 2022)</strong> and <strong>Outstanding Contribution in Delivery Award (Q2 2022)</strong>.</li>
                </ul>
              </div>

              <div className="space-y-1.5 cv-avoid-break pt-1">
                <div className="flex justify-between items-baseline border-b border-slate-800/60 pb-1 print:border-b print:border-slate-200">
                  <div>
                    <h4 className="font-bold text-white text-xs print:text-[9pt] print:text-slate-900">
                      Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)
                    </h4>
                    <span className="text-[10.5px] font-mono text-sky-400 print:text-sky-700">
                      Nokia WING Digital Hub & Singleview BSS
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-400 print:text-slate-600">
                    Jan 2021 — Jan 2022 (1 yr 1 mo)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 print:text-[8pt] print:text-slate-700">
                  <li>Spearheaded UAT and carrier migration activities for <strong>10 Million+ subscribers</strong> on <strong>Nokia WING Digital Hub</strong>.</li>
                  <li>Governed <strong>Diameter Gy and Ro</strong> online charging, real-time balance reservations, and quota enforcement.</li>
                  <li>Supported <strong>Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data)</strong> from India test centers.</li>
                  <li>Managed <strong>Monthly Rating Report (MRR)</strong> runs, rate plan configs (Individual, Flex, Fixed), MRC & NRC charges, and automated Invoice PDF generation.</li>
                </ul>
              </div>

              <div className="space-y-1.5 cv-avoid-break pt-1">
                <div className="flex justify-between items-baseline border-b border-slate-800/60 pb-1 print:border-b print:border-slate-200">
                  <div>
                    <h4 className="font-bold text-white text-xs print:text-[9pt] print:text-slate-900">
                      Cognizant — Associate Project Engineer
                    </h4>
                    <span className="text-[10.5px] font-mono text-sky-400 print:text-sky-700">
                      Inmarsat BTP & European Telecom
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-400 print:text-slate-600">
                    Feb 2019 — Jan 2021 (2 yrs)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 print:text-[8pt] print:text-slate-700">
                  <li>Awarded <strong>Star Performer</strong> for Inmarsat BTP Project; verified SIT & rating pipelines for <strong>Nokia Hutchison 3Group</strong> European networks (3Austria, 3Ireland, 3Italy).</li>
                </ul>
              </div>

              <div className="space-y-1.5 cv-avoid-break pt-1">
                <div className="flex justify-between items-baseline border-b border-slate-800/60 pb-1 print:border-b print:border-slate-200">
                  <div>
                    <h4 className="font-bold text-white text-xs print:text-[9pt] print:text-slate-900">
                      Tech Mahindra — Software Test Analyst
                    </h4>
                    <span className="text-[10.5px] font-mono text-sky-400 print:text-sky-700">
                      British Telecom (BT) Retail Transformation
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-400 print:text-slate-600">
                    Oct 2017 — Feb 2019 (1 yr 5 mos)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 print:text-[8pt] print:text-slate-700">
                  <li>Awarded <strong>CIT Domain Excellence Award</strong>; validated British Telecom (BT) Retail Unit ordering (TMF622) and employee discount portals.</li>
                </ul>
              </div>

              <div className="space-y-1.5 cv-avoid-break pt-1">
                <div className="flex justify-between items-baseline border-b border-slate-800/60 pb-1 print:border-b print:border-slate-200">
                  <div>
                    <h4 className="font-bold text-white text-xs print:text-[9pt] print:text-slate-900">
                      Accenture & GapBridge — Formative QA Engineering
                    </h4>
                    <span className="text-[10.5px] font-mono text-sky-400 print:text-sky-700">
                      Enterprise Telecom Test Systems
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-400 print:text-slate-600">
                    Nov 2014 — Sep 2017 (3 yrs)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 print:text-[8pt] print:text-slate-700">
                  <li>Executed E2E test cases for User Acceptance Testing (UAT), aligned client objectives, and defined service pricing and billing structures.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 print:border-t print:border-slate-300 cv-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 print:text-slate-600 font-bold uppercase text-[10px]">Languages:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px]">English (Professional)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px]">Tamil (Native)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px]">Telugu (Elementary)</span>
                </div>
                <div className="text-emerald-400 print:text-emerald-800 font-bold text-[10.5px]">
                  <span>100% Ready for Relocation & Frequent Travel (Singapore 🇸🇬, UK 🇬🇧, USA 🇺🇸)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
