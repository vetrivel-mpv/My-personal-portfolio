import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Search, 
  Terminal, 
  Layers, 
  Cpu, 
  Award, 
  FolderGit2, 
  BookOpen, 
  Mail, 
  FileText, 
  Printer, 
  Bot, 
  Sun, 
  Moon, 
  Monitor, 
  Github, 
  Linkedin, 
  Sparkles,
  ArrowRight,
  X,
  Compass
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Themes" | "Social";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (id: string) => void;
  onOpenResume: () => void;
  onOpenAI: () => void;
  onSetTheme: (theme: "light" | "dark" | "system") => void;
  onTriggerToast: (msg: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenResume,
  onOpenAI,
  onSetTheme,
  onTriggerToast
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = useMemo(() => [
    {
      id: "nav-home",
      title: "Story & Executive Summary",
      category: "Navigation",
      icon: <Compass size={16} className="text-sky-500" />,
      shortcut: "H",
      action: () => { onNavigateSection("home"); onClose(); },
      keywords: ["intro", "hero", "about", "vetrivel", "experience", "home"]
    },
    {
      id: "nav-vision",
      title: "Why Solution Architect? (Career Evolution)",
      category: "Navigation",
      icon: <Terminal size={16} className="text-indigo-500" />,
      shortcut: "V",
      action: () => { onNavigateSection("vision-section"); onClose(); },
      keywords: ["vision", "mission", "career", "timeline", "capgemini", "transition"]
    },
    {
      id: "nav-blueprint",
      title: "Carrier Systems Interactive Blueprint",
      category: "Navigation",
      icon: <Layers size={16} className="text-blue-500" />,
      shortcut: "B",
      action: () => { onNavigateSection("blueprint-section"); onClose(); },
      keywords: ["architecture", "telecom", "oss", "bss", "singleview", "spring", "layers"]
    },
    {
      id: "nav-metrics",
      title: "Delivery Metrics & Trajectory Analytics",
      category: "Navigation",
      icon: <Cpu size={16} className="text-emerald-500" />,
      shortcut: "M",
      action: () => { onNavigateSection("milestones-analytics"); onClose(); },
      keywords: ["charts", "metrics", "subscribers", "endpoints", "growth", "recharts"]
    },
    {
      id: "nav-skills",
      title: "Qualification Matrix & Radar",
      category: "Navigation",
      icon: <Award size={16} className="text-amber-500" />,
      shortcut: "S",
      action: () => { onNavigateSection("skills-analytics-section"); onClose(); },
      keywords: ["skills", "java", "selenium", "agile", "aws", "certifications", "radar", "travel"]
    },
    {
      id: "nav-projects",
      title: "Featured Case Studies & Projects",
      category: "Navigation",
      icon: <FolderGit2 size={16} className="text-purple-500" />,
      shortcut: "P",
      action: () => { onNavigateSection("projects"); onClose(); },
      keywords: ["projects", "verizon", "capgemini", "inmarsat", "bt", "work"]
    },
    {
      id: "nav-blogs",
      title: "Engineering Reflections & Memoirs",
      category: "Navigation",
      icon: <BookOpen size={16} className="text-teal-500" />,
      shortcut: "R",
      action: () => { onNavigateSection("reflections"); onClose(); },
      keywords: ["blog", "articles", "reading", "resilience", "scrum", "architecture"]
    },
    {
      id: "nav-contact",
      title: "Contact & Advisory Booking",
      category: "Navigation",
      icon: <Mail size={16} className="text-rose-500" />,
      shortcut: "C",
      action: () => { onNavigateSection("contact"); onClose(); },
      keywords: ["contact", "email", "phone", "message", "hire", "consult", "travel"]
    },
    // Actions
    {
      id: "act-ai-cv",
      title: "✨ AI Tailor CV from Job Description (Gemini)",
      category: "Actions",
      icon: <Sparkles size={16} className="text-sky-400" />,
      shortcut: "JD",
      action: () => { onClose(); onOpenResume(); },
      keywords: ["ai resume", "job description", "tailor cv", "gemini", "travel", "worldwide"]
    },
    {
      id: "act-resume",
      title: "Export & Customize CV (Resume Modal)",
      category: "Actions",
      icon: <FileText size={16} className="text-sky-400" />,
      shortcut: "CV",
      action: () => { onClose(); onOpenResume(); },
      keywords: ["resume", "cv", "download", "pdf", "export"]
    },
    {
      id: "act-ai",
      title: "Ask AI Assistant (Vetriebot)",
      category: "Actions",
      icon: <Bot size={16} className="text-indigo-400" />,
      shortcut: "AI",
      action: () => { onClose(); onOpenAI(); },
      keywords: ["ai", "bot", "assistant", "chat", "gemini", "vetriebot"]
    },
    {
      id: "act-print",
      title: "Print Portfolio or Save as Clean PDF",
      category: "Actions",
      icon: <Printer size={16} className="text-emerald-400" />,
      action: () => { onClose(); window.print(); },
      keywords: ["print", "pdf", "save", "document"]
    },
    {
      id: "act-copy-email",
      title: "Copy Email to Clipboard (vetrivelm02@gmail.com)",
      category: "Actions",
      icon: <Mail size={16} className="text-blue-400" />,
      action: () => {
        navigator.clipboard.writeText("vetrivelm02@gmail.com");
        onTriggerToast("✓ Email copied to clipboard!");
        onClose();
      },
      keywords: ["copy", "email", "clipboard", "mail"]
    },
    // Themes
    {
      id: "theme-dark",
      title: "Switch Theme: Dark Cyber Mode",
      category: "Themes",
      icon: <Moon size={16} className="text-indigo-400" />,
      action: () => { onSetTheme("dark"); onClose(); },
      keywords: ["dark", "night", "theme", "black"]
    },
    {
      id: "theme-light",
      title: "Switch Theme: Light Clean Mode",
      category: "Themes",
      icon: <Sun size={16} className="text-amber-500" />,
      action: () => { onSetTheme("light"); onClose(); },
      keywords: ["light", "day", "theme", "white"]
    },
    {
      id: "theme-system",
      title: "Switch Theme: System Default",
      category: "Themes",
      icon: <Monitor size={16} className="text-emerald-400" />,
      action: () => { onSetTheme("system"); onClose(); },
      keywords: ["system", "auto", "theme", "os"]
    },
    // Social
    {
      id: "soc-linkedin",
      title: "Open LinkedIn Profile",
      category: "Social",
      icon: <Linkedin size={16} className="text-sky-500" />,
      action: () => { window.open("https://linkedin.com/in/vetrivelm", "_blank"); onClose(); },
      keywords: ["linkedin", "social", "network", "profile"]
    },
    {
      id: "soc-github",
      title: "Open GitHub Profile",
      category: "Social",
      icon: <Github size={16} className="text-slate-400" />,
      action: () => { window.open("https://github.com/vetrivelm", "_blank"); onClose(); },
      keywords: ["github", "code", "repo", "git"]
    }
  ], [onNavigateSection, onOpenResume, onOpenAI, onSetTheme, onTriggerToast, onClose]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(cmd => 
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.keywords?.some(k => k.toLowerCase().includes(q))
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="command-palette-modal"
      className="fixed inset-0 z-60 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl glass-panel bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/80 dark:border-slate-800">
          <Search size={18} className="text-sky-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, section, technology or action (e.g. 'skills', 'verizon', 'resume', 'dark')..."
            className="w-full bg-transparent text-sm font-sans text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-sans cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? "bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-300 font-semibold border border-sky-500/20" 
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 p-1 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                      {cmd.icon}
                    </div>
                    <span className="truncate">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 rounded">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    {isSelected && (
                      <ArrowRight size={12} className="text-sky-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs font-sans text-slate-400 dark:text-slate-500 space-y-1">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] font-mono">Try searching for &lsquo;Java&rsquo;, &lsquo;Telecom&rsquo;, &lsquo;Resume&rsquo; or &lsquo;Projects&rsquo;</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[10.5px] font-mono text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-bold">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-bold">↵</kbd> Select</span>
          </div>
          <span className="flex items-center gap-1">
            <Sparkles size={11} className="text-sky-400" />
            <span>Vetrivel Command Engine</span>
          </span>
        </div>
      </div>
    </div>
  );
}
