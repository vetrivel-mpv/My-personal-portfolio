import React, { useState, FormEvent } from "react";
import {
  Lock,
  Unlock,
  Layers,
  FileText,
  Mail,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  LogOut,
  Edit,
  FolderPlus
} from "lucide-react";
import { Project, BlogPost, ContactMessage } from "../types";
import {
  getProjects,
  saveProjects,
  getBlogs,
  saveBlogs,
  getMessages,
  deleteMessage,
  markMessageReplied
} from "../db/storage";
import DevDocs from "./DevDocs";

interface AdminDashboardProps {
  onDataChanged: () => void;
}

export default function AdminDashboard({ onDataChanged }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("vetrivel_admin_authed") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Storage states
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogs());
  const [messages, setMessages] = useState<ContactMessage[]>(() => getMessages());

  // Navigation tab within admin console
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "messages" | "docs">("projects");

  // Form states - Projects
  const [showProjForm, setShowProjForm] = useState(false);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projForm, setProjForm] = useState({
    title: "",
    description: "",
    category: "Test Architecture" as "Test Architecture" | "Telecom OSS/BSS" | "Full Stack" | "General QA",
    icon: "⚙️",
    techs: "",
    impact: ""
  });

  // Form states - Blogs
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Architecture" as "Architecture" | "Systems Quality" | "Telecom Insights" | "Career Transition",
    readTime: "5 min read",
    status: "published" as "published" | "draft"
  });

  // Handle Admin Authorization
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Safe, simple credentials for portfolio review demo
    if (
      (username.trim().toLowerCase() === "admin" && password === "vetrivel123") ||
      (username.trim().toLowerCase() === "demo" && password === "demo")
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("vetrivel_admin_authed", "true");
    } else {
      setLoginError("Invalid console credentials. Use 'admin' & 'vetrivel123' or 'demo' & 'demo'.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vetrivel_admin_authed");
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("vetrivel_admin_authed", "true");
  };

  // ---------------- PROJECT CRUD OPERATIONS ----------------
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title.trim() || !projForm.description.trim() || !projForm.impact.trim()) {
      alert("Please fill all required project parameters.");
      return;
    }

    const arrTechs = projForm.techs
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updatedProjects = [...projects];

    if (editingProjId) {
      // Edit mode
      const idx = updatedProjects.findIndex((p) => p.id === editingProjId);
      if (idx !== -1) {
        updatedProjects[idx] = {
          ...updatedProjects[idx],
          title: projForm.title.trim(),
          description: projForm.description.trim(),
          category: projForm.category,
          icon: projForm.icon,
          techs: arrTechs,
          impact: projForm.impact.trim()
        };
      }
    } else {
      // Add mode
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projForm.title.trim(),
        description: projForm.description.trim(),
        category: projForm.category,
        icon: projForm.icon,
        techs: arrTechs,
        impact: projForm.impact.trim(),
        createdAt: new Date().toISOString()
      };
      updatedProjects.unshift(newProj);
    }

    saveProjects(updatedProjects);
    setProjects(updatedProjects);
    setShowProjForm(false);
    setEditingProjId(null);
    setProjForm({ title: "", description: "", category: "Test Architecture", icon: "⚙️", techs: "", impact: "" });
    onDataChanged();
  };

  const handleEditProjectClick = (proj: Project) => {
    setEditingProjId(proj.id);
    setProjForm({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      icon: proj.icon || "⚙️",
      techs: proj.techs.join(", "),
      impact: proj.impact
    });
    setShowProjForm(true);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this showcase item?")) {
      const filtered = projects.filter((p) => p.id !== id);
      saveProjects(filtered);
      setProjects(filtered);
      onDataChanged();
    }
  };

  // ---------------- BLOG CRUD OPERATIONS ----------------
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.summary.trim() || !blogForm.content.trim()) {
      alert("Please fill all required blogging fields.");
      return;
    }

    const updatedBlogs = [...blogs];

    if (editingBlogId) {
      // Edit
      const idx = updatedBlogs.findIndex((b) => b.id === editingBlogId);
      if (idx !== -1) {
        updatedBlogs[idx] = {
          ...updatedBlogs[idx],
          title: blogForm.title.trim(),
          summary: blogForm.summary.trim(),
          content: blogForm.content.trim(),
          category: blogForm.category,
          readTime: blogForm.readTime.trim(),
          status: blogForm.status
        };
      }
    } else {
      // Append
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        title: blogForm.title.trim(),
        summary: blogForm.summary.trim(),
        content: blogForm.content.trim(),
        category: blogForm.category,
        readTime: blogForm.readTime.trim(),
        status: blogForm.status,
        createdAt: new Date().toISOString()
      };
      updatedBlogs.unshift(newBlog);
    }

    saveBlogs(updatedBlogs);
    setBlogs(updatedBlogs);
    setShowBlogForm(false);
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      summary: "",
      content: "",
      category: "Architecture",
      readTime: "5 min read",
      status: "published"
    });
    onDataChanged();
  };

  const handleEditBlogClick = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogForm({
      title: b.title,
      summary: b.summary,
      content: b.content,
      category: b.category,
      readTime: b.readTime,
      status: b.status
    });
    setShowBlogForm(true);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this reflections post?")) {
      const filtered = blogs.filter((b) => b.id !== id);
      saveBlogs(filtered);
      setBlogs(filtered);
      onDataChanged();
    }
  };

  // ---------------- CONTACT INQUIRY ACTIONS ----------------
  const handleMarkReplied = (id: string) => {
    markMessageReplied(id);
    setMessages(getMessages());
  };

  const handleDeleteMessageLog = (id: string) => {
    if (confirm("Permanently delete message record?")) {
      deleteMessage(id);
      setMessages(getMessages());
    }
  };

  // Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <section className="py-24 px-4 min-h-[85vh] flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
              <Lock size={20} />
            </div>
            <h2 className="text-xl font-bold font-sans">Administration Control Console</h2>
            <p className="text-xs text-slate-400">
              Authorized access required for secure system content configurations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Console User</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-850 bg-slate-950 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Gateway Code</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-850 bg-slate-950 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {loginError && (
              <p className="text-[11px] text-red-400 font-sans leading-relaxed text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 text-white font-mono uppercase tracking-wider text-xs font-bold hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">OR REVIEW PORTFOLIO</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            onClick={handleQuickDemoLogin}
            className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-750 transition-colors cursor-pointer"
          >
            Instant Developer Demo Check
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 xl:px-12 bg-slate-950 text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Admin Header with stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold">CONSOLE ENGINE LIVE</span>
            </div>
            <h1 className="text-2xl font-bold font-sans">Portfolio Manager Portal</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-red-500 text-slate-400 hover:text-red-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={13} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Console Navigation tabs */}
        <div className="flex border-b border-slate-900 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 text-xs font-mono shrink-0 flex items-center gap-1.5 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "projects"
                ? "border-blue-500 text-blue-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Layers size={13} /> Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-4 py-2 text-xs font-mono shrink-0 flex items-center gap-1.5 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "blogs"
                ? "border-indigo-500 text-indigo-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} /> Reflections ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 text-xs font-mono shrink-0 flex items-center gap-1.5 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "messages"
                ? "border-emerald-500 text-emerald-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Mail size={13} /> Inquiries ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`px-4 py-2 text-xs font-mono shrink-0 flex items-center gap-1.5 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "docs"
                ? "border-violet-500 text-violet-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle size={13} /> Dev Blueprint Specs
          </button>
        </div>

        {/* ------------------- PROJECTS CRUD LIST VIEW ------------------- */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold font-sans text-slate-200 uppercase tracking-wider">PROJECTS INDEX</h2>
              {!showProjForm && (
                <button
                  onClick={() => {
                    setEditingProjId(null);
                    setProjForm({ title: "", description: "", category: "Test Architecture", icon: "⚙️", techs: "", impact: "" });
                    setShowProjForm(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> Add Project
                </button>
              )}
            </div>

            {/* Form for project edit/add */}
            {showProjForm && (
              <form onSubmit={handleSaveProject} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 animate-fade-up">
                <h3 className="text-sm font-bold text-slate-200 font-sans">
                  {editingProjId ? "🛠 EDIT SHOWCASE DATA" : "⚙️ NEW SHOWCASE SCHEMA"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projForm.title}
                      onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                      placeholder="Enterprise Automated Validation"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Category Domain</label>
                    <select
                      value={projForm.category}
                      onChange={(e) =>
                        setProjForm({
                          ...projForm,
                          category: e.target.value as any
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    >
                      <option value="Test Architecture">Test Architecture</option>
                      <option value="Telecom OSS/BSS">Telecom OSS/BSS</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="General QA">General QA</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Emanating Icon (Emoji representation)</label>
                    <input
                      type="text"
                      value={projForm.icon}
                      onChange={(e) => setProjForm({ ...projForm, icon: e.target.value })}
                      placeholder="🛰️, ⚙️, etc."
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      value={projForm.techs}
                      onChange={(e) => setProjForm({ ...projForm, techs: e.target.value })}
                      placeholder="React, Java, Spring Boot, Docker"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Short Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={projForm.description}
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    placeholder="Enter short presentation outline of goals and technical activities."
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Business / Architecture Impact *</label>
                  <input
                    type="text"
                    required
                    value={projForm.impact}
                    onChange={(e) => setProjForm({ ...projForm, impact: e.target.value })}
                    placeholder="Optimized validation cycle by 35% with zero outages."
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProjForm(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-mono text-xs cursor-pointer"
                  >
                    Commit Schema
                  </button>
                </div>
              </form>
            )}

            {/* List Table of Projects */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono bg-slate-950/30">
                      <th className="p-4">REPRESENTATIVE</th>
                      <th className="p-4">PROJECT TITLE</th>
                      <th className="p-4">CATEGORY</th>
                      <th className="p-4">MEASURED IMPACT</th>
                      <th className="p-4 text-right">CONTROLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-bold text-sm">{p.icon}</td>
                        <td className="p-4 font-semibold text-slate-200">{p.title}</td>
                        <td className="p-4 text-slate-400">{p.category}</td>
                        <td className="p-4 text-emerald-400 font-medium">{p.impact}</td>
                        <td className="p-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleEditProjectClick(p)}
                            className="p-1 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------- BLOGS CRUD LIST VIEW ------------------- */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold font-sans text-slate-200 uppercase tracking-wider">REFLECTIONS JOURNAL INDEX</h2>
              {!showBlogForm && (
                <button
                  onClick={() => {
                    setEditingBlogId(null);
                    setBlogForm({
                      title: "",
                      summary: "",
                      content: "",
                      category: "Architecture",
                      readTime: "5 min read",
                      status: "published"
                    });
                    setShowBlogForm(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> Write reflection
                </button>
              )}
            </div>

            {/* Form for Blog Add/Edit */}
            {showBlogForm && (
              <form onSubmit={handleSaveBlog} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 animate-fade-up">
                <h3 className="text-sm font-bold text-slate-200 font-sans">
                  {editingBlogId ? "📝 EDIT REFLECTION" : "🖋 PUBLISH NEW REFLECTION"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Title *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="Title of core reflections"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Category topic</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) =>
                        setBlogForm({
                          ...blogForm,
                          category: e.target.value as any
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    >
                      <option value="Architecture">Architecture</option>
                      <option value="Systems Quality">Systems Quality</option>
                      <option value="Telecom Insights">Telecom Insights</option>
                      <option value="Career Transition">Career Transition</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Estimated Read Time</label>
                    <input
                      type="text"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Publish Status</label>
                    <select
                      value={blogForm.status}
                      onChange={(e) =>
                        setBlogForm({
                          ...blogForm,
                          status: e.target.value as any
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                    >
                      <option value="published">Published (Visible to all)</option>
                      <option value="draft">Draft (Visible only in console)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Brief Summary *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    placeholder="Brief summary sentence describing key takeaways"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Content Body (Markdown Supported) *</label>
                  <textarea
                    required
                    rows={8}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder={`## Heading \nParagraph text. Include key metrics or design lists. Use * for bullet items.`}
                    className="w-full px-3 py-1.5 text-xs font-mono bg-slate-950 rounded-lg border border-slate-800 text-white"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBlogForm(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono text-xs cursor-pointer"
                  >
                    Deliver Post
                  </button>
                </div>
              </form>
            )}

            {/* List Table of Blogs */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono bg-slate-950/30">
                      <th className="p-4">REFLECTIONS TITLE</th>
                      <th className="p-4">TOPIC</th>
                      <th className="p-4">READ TIME</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">CONTROLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-200">{b.title}</td>
                        <td className="p-4 text-slate-400">{b.category}</td>
                        <td className="p-4 font-mono text-[11px] text-indigo-400">{b.readTime}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${
                              b.status === "published"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleEditBlogClick(b)}
                            className="p-1 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-1 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------- CONTACT INQUIRIES MONITOR ------------------- */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h2 className="text-md font-bold font-sans text-slate-200 uppercase tracking-wider">COLLABORATIVE PORTFOLIO INQUIRIES</h2>

            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-2xl border bg-slate-900/65 ${
                      m.replied ? "border-slate-850" : "border-emerald-500/20 shadow-lg shadow-emerald-500/[0.01]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">{m.name}</h3>
                        <p className="text-xs text-slate-400 font-mono">{m.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                        {m.replied ? (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[9px] font-mono">
                            REPLIED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono">
                            NEW INQUIRY
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-850/60 leading-relaxed font-sans mt-2">
                      {m.message}
                    </p>

                    <div className="flex justify-end gap-2 mt-4">
                      {!m.replied && (
                        <button
                          onClick={() => handleMarkReplied(m.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle size={12} /> Mark Replied
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessageLog(m.id)}
                        className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-500 text-slate-400 hover:text-red-400 font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={12} /> Clear record
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900 border border-dashed border-slate-850 rounded-2xl">
                <Mail className="mx-auto text-slate-500 mb-2" size={26} />
                <h3 className="text-sm font-bold text-slate-400">Queue is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  inquiries sent through the external contact form will instantly appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ------------------- DEVELOPER DETAILED BLUEPRINT SPECS ------------------- */}
        {activeTab === "docs" && (
          <div className="animate-fade-up">
            <DevDocs />
          </div>
        )}

      </div>
    </section>
  );
}
