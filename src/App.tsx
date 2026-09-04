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

            {/* 4. Trajectory Milestones & Delivery Analytics */}
            <Milestones />

            {/* 5. Qualification Matrix & Interactive Skill Radar */}
            <SkillMap />

            {/* 6. Featured Projects & Case Studies */}
            <ProjectGallery projects={projects} />

            {/* 7. Engineering Reflections & Technical Chronicles */}
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

    </div>
  );
}
