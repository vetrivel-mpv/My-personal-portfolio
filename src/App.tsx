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
  Command,
  Plane
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
          <div className="cv-page-1 space-y-4 print:space-y-3">
            <div className="pb-3 border-b-2 border-sky-500/80 print:border-b-2 print:border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight cv-print-name print:text-slate-950 font-sans">
                  VETRIVEL MUTHUSAMY
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-sky-400 print:text-sky-800 tracking-wide font-sans">
                  Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager
                </p>
                <div className="pt-0.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900 text-[10.5px] font-medium font-sans">
                    <span><strong>Targeting:</strong> Singapore 🇸🇬 · United Kingdom 🇬🇧 · United States 🇺🇸 (100% Relocation & Travel Ready)</span>
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-0.5 text-slate-300 print:text-slate-800 font-sans text-[11px] cv-print-muted shrink-0">
                <p>Bengaluru, Karnataka, India</p>
                <p>(+91) 9916008877</p>
                <p>vetrivelm02@gmail.com</p>
                <p>linkedin.com/in/vetrivelm</p>
              </div>
            </div>

            {/* 1. PROFESSIONAL SUMMARY */}
            <div className="space-y-1 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="leading-relaxed text-slate-200 print:text-[8.5pt] print:text-slate-800 font-sans text-[11px]">
                Senior Telecom QA Lead & Solutions Delivery Consultant with <strong>over 10 years of specialized enterprise domain experience</strong> in Mobile OSS/BSS (Nokia WING 10M+ subscriber migration, AT&T IoT Connection Manager, CSG Singleview, Diameter Gy/Ro, Real SIM 4G/5G NSA testing). <strong>Managed cross-functional QA teams of 15+ engineers under Agile/Scrum</strong>, cutting manual testing efforts by <strong>50%</strong> and reducing post-release issues by <strong>30%</strong> with zero defect leakage across Tier-1 carriers (British Telecom, Verizon, Inmarsat, AT&T, Nokia 3Group). Holds a <strong>Postgraduate Diploma in Software Development</strong>, uniquely bridging technical software engineering, API contracts, and business stakeholder delivery. <strong>Actively targeting overseas roles in Singapore, UK, and USA.</strong>
              </p>
            </div>

            {/* 2. CORE COMPETENCIES & TECHNICAL EXPERTISE */}
            <div className="space-y-1.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                CORE COMPETENCIES & TECHNICAL EXPERTISE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] cv-print-grid-2">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Agile QA Leadership & Team Governance
                  </strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                    Managed 15+ QA Engineers, Sprint Ceremonies, Risk-Based Test Strategy, Carrier Acceptance Sign-Offs, Defect Triage (JIRA/Zephyr).
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Telecom BSS & Nokia WING (10M+ Subs)
                  </strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                    CSG Singleview Billing, Nokia WING Migration UAT, Diameter Gy/Ro Charging, MRR, MRC/NRC Charges, SFTP & Invoicing PDF Generation.
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Enterprise IoT & Network Verification
                  </strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                    AT&T Connection Manager (Device Telemetry & Dynamic Quota Throttling), Real SIM 4G LTE/5G NSA (Voice, SMS, Data from India testbeds).
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-white block font-sans font-bold text-[11px] mb-0.5 print:text-sky-900 print:text-[8.5pt]">
                    Technical Literacy & Software Foundation
                  </strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.8pt] print:text-slate-700 leading-snug block font-sans">
                    PG Diploma Software Development (Full Stack), REST API Contract Testing (Postman/Swagger), TM Forum Open APIs (TMF620/622), SQL Auditing.
                  </span>
                </div>
              </div>
            </div>

            {/* 3. PROFESSIONAL EXPERIENCE (PART 1: CAPGEMINI & PRODAPT) */}
            <div className="space-y-2.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                PROFESSIONAL EXPERIENCE (SENIOR LEADERSHIP)
              </h2>

              {/* Capgemini Engineering */}
              <div className="space-y-1 cv-avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Capgemini Engineering — Senior Professional / Test Architect & Agile QA Lead
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Enterprise IoT & Global Carrier Solutions | Bengaluru, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Jan 2022 — Aug 2025 (3 yrs 8 mos)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li><strong>Managed a cross-functional QA team of 15+ test engineers</strong> under Agile/Scrum, directing sprint planning, test strategy, and carrier acceptance milestones.</li>
                  <li>Cut manual testing efforts by <strong>50%</strong> and reduced post-release production defect escapes by <strong>30%</strong> through modular test architecture.</li>
                  <li>Led QA and validation for <strong>AT&T Connection Manager</strong>: Enterprise IoT device telemetry, real-time data quota policy throttling, and billing mediation.</li>
                  <li>Delivered robust architecture governance for global carrier accounts including <strong>Verizon Wireless</strong> and <strong>AT&T Enterprise</strong> with zero P1/P2 defect escapes.</li>
                  <li>Honored with <strong>Customer Delight Award (Q3 2022)</strong> and <strong>Outstanding Contribution in Delivery Award (Q2 2022)</strong>.</li>
                </ul>
              </div>

              {/* Prodapt Solutions */}
              <div className="space-y-1 cv-avoid-break pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Prodapt Solutions — Lead Software Test Engineer (Nokia WING & Singleview)
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Nokia WING Digital Hub & Singleview BSS | Chennai, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Jan 2021 — Jan 2022 (1 yr 1 mo)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Spearheaded UAT and carrier migration activities for <strong>10 Million+ subscribers</strong> on <strong>Nokia WING (Worldwide IoT Network Grid) Digital Hub</strong>.</li>
                  <li>Governed <strong>Diameter Gy and Ro</strong> online charging, real-time balance reservations, and quota enforcement.</li>
                  <li>Supported <strong>Real SIM network testing (4G LTE, 5G NSA, SMS, Voice, Data)</strong> from India test centers.</li>
                  <li>Managed <strong>Monthly Rating Report (MRR)</strong> runs, rate plan configs (Individual, Flex, Fixed), MRC & NRC charges, automated SFTP file transfer pipelines, and automated Invoice PDF generation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ================= PAGE BREAK ================= */}
          <div className="cv-page-break hidden print:block" />

          {/* ================= PAGE 2 ================= */}
          <div className="cv-page-2 space-y-4 print:space-y-3 print:pt-2">
            
            {/* 3. PROFESSIONAL EXPERIENCE (PART 2: COGNIZANT, TECH MAHINDRA, ACCENTURE/GAPBRIDGE) */}
            <div className="space-y-2.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                PROFESSIONAL EXPERIENCE (CAREER PROGRESSION)
              </h2>

              {/* Cognizant */}
              <div className="space-y-1 cv-avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Cognizant — Associate Project Engineer
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Inmarsat BTP & European Carrier Transformations | Chennai, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Feb 2019 — Jan 2021 (2 yrs)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Awarded <strong>Star Performer</strong> for consistently high-quality contributions to the <strong>Inmarsat BTP Project</strong>.</li>
                  <li>Orchestrated system integration testing (SIT) and rating validation for <strong>Nokia Hutchison 3Group</strong> European networks (3Austria, 3Ireland, 3Italy) and core Singleview postpaid charging pipelines.</li>
                </ul>
              </div>

              {/* Tech Mahindra */}
              <div className="space-y-1 cv-avoid-break pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Tech Mahindra — Software Test Analyst
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      British Telecom (BT) Retail Transformation | Bangalore, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Oct 2017 — Feb 2019 (1 yr 5 mos)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Awarded <strong>CIT Domain Excellence Award</strong> for bringing deep telecom domain knowledge to CIT and executing high-impact test automation strategies.</li>
                  <li>Led <strong>British Telecom (BT) Retail Unit</strong> customer ordering (TM Forum ODA TMF622) and employee discount e-commerce validations.</li>
                </ul>
              </div>

              {/* Accenture & GapBridge */}
              <div className="space-y-1 cv-avoid-break pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/60 pb-0.5 print:border-b print:border-slate-200">
                  <div>
                    <h3 className="font-bold text-white text-[11.5px] print:text-[9pt] print:text-slate-950 font-sans">
                      Accenture & GapBridge — Early Formative QA Engineering
                    </h3>
                    <span className="text-[10.5px] text-sky-400 print:text-sky-800 font-sans">
                      Enterprise Telecom Test Systems | Chennai, India
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 print:text-slate-600 font-sans font-medium">
                    Nov 2014 — Sep 2017 (3 yrs)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px] text-slate-300 print:text-[8pt] print:text-slate-800 font-sans pl-1">
                  <li>Gathered and translated business requirements into meticulous test plans and test designs for carrier acceptance.</li>
                  <li>Executed end-to-end test cases for User Acceptance Testing (UAT), aligning client objectives and verifying service pricing and billing structures.</li>
                </ul>
              </div>
            </div>

            {/* 4. HONORS & CORPORATE AWARDS */}
            <div className="space-y-1.5 cv-avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                HONORS & CORPORATE AWARDS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] cv-print-grid-2">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">🏆 Customer Delight Award</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Capgemini Engineering — Recognizing customer-first excellence (Q3 2022).</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">🏆 Outstanding Delivery in ER&D</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Capgemini Engineering Research & Development Sector (Q2 2022).</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">⭐ Star Performer Award</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Cognizant — High-quality contributions to Inmarsat BTP Project.</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                  <strong className="text-amber-400 block font-sans font-bold text-[11px] cv-print-award-title">⭐ CIT Domain Excellence Award</strong>
                  <span className="text-[10.5px] text-slate-300 print:text-[7.5pt] print:text-slate-700 block font-sans">Tech Mahindra — Deep domain knowledge in British Telecom transformation.</span>
                </div>
              </div>
            </div>

            {/* 5. ACADEMIC BACKGROUND & CERTIFICATIONS */}
            <div className="space-y-2 cv-avoid-break">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                  ACADEMIC BACKGROUND & EDUCATION
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 cv-print-grid-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                    <strong className="text-white block font-sans font-bold text-[11px] print:text-slate-900">Master of Science (MS)</strong>
                    <span className="text-[10px] text-slate-400 font-sans block print:text-slate-600">Computer Software Engineering</span>
                    <span className="text-[9.5px] text-slate-400 font-sans print:text-slate-500">Liverpool John Moores Univ (2021-2022)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                    <strong className="text-white block font-sans font-bold text-[11px] print:text-slate-900">PG Diploma (Software Dev)</strong>
                    <span className="text-[10px] text-slate-400 font-sans block print:text-slate-600">Full Stack Development</span>
                    <span className="text-[9.5px] text-slate-400 font-sans print:text-slate-500">IIIT Bangalore (2020-2021)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 cv-print-card">
                    <strong className="text-white block font-sans font-bold text-[11px] print:text-slate-900">Bachelor of Comp App (BCA)</strong>
                    <span className="text-[10px] text-slate-400 font-sans block print:text-slate-600">Computer Programming</span>
                    <span className="text-[9.5px] text-slate-400 font-sans print:text-slate-500">Valluvar College / Bharathidasan (2009-2012)</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 print:text-slate-900 border-b border-slate-800 print:border-b print:border-slate-300 pb-0.5 cv-print-section-header font-sans">
                  CERTIFICATIONS & ACCREDITATIONS
                </h2>
                <div className="flex flex-wrap gap-1.5 text-xs font-sans pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    SDC16 - PG Diploma in Software Development (Full Stack) — IIIT Bangalore
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    Google IT Automation with Python Specialization
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-orange-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    AWS Certified Cloud Practitioner
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10.5px]">
                    Oracle Certified Web Component Developer (OCWCD)
                  </span>
                </div>
              </div>
            </div>

            {/* 6. LANGUAGES & OVERSEAS RELOCATION */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800 print:border-t print:border-slate-300 cv-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 print:text-slate-600 font-bold uppercase text-[10.5px]">Languages:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px] font-medium">English (Professional)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px] font-medium">Tamil (Native)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 print:bg-slate-100 print:border-slate-300 print:text-slate-800 text-[10px] font-medium">Telugu (Elementary)</span>
                </div>

                <div className="text-emerald-400 print:text-emerald-800 font-bold text-[10.5px] flex items-center gap-1.5">
                  <Plane size={12} className="shrink-0" />
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
