import React, { useState, useMemo } from "react";
import { BookOpen, Search, Clock, Calendar, ChevronRight, X, ArrowRight, Sparkles, Share2, Check } from "lucide-react";
import { BlogPost } from "../types";
import SectionHeader from "./SectionHeader";

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const publishedBlogs = useMemo(() => {
    return blogs.filter((b) => b.status === "published");
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return publishedBlogs;
    const q = searchQuery.toLowerCase();
    return publishedBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [publishedBlogs, searchQuery]);

  const formattedDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "2026";
    }
  };

  const handleCopyShareLink = (post: BlogPost) => {
    navigator.clipboard.writeText(`${window.location.origin}/#reflections`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section 
      id="reflections" 
      className="py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-slate-50 text-slate-900 border-b border-slate-200 transition-colors duration-500 relative"
    >
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            badgeNumber="07"
            badgeText="ARCHITECTURAL MEMOIRS & FIELD LOGS"
            badgeColor="indigo"
            title="Engineering Insights &"
            gradientWord="Technical Reflections"
            description="Technical logs, architectural deep dives, and system learnings accumulated over 11+ years within enterprise carrier infrastructures."
          />

          {/* Live Count Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-pill text-indigo-700 text-xs font-mono self-start sm:self-end pb-2 select-none shadow-xs">
            <BookOpen size={14} className="text-indigo-600" />
            <span>{filteredBlogs.length} Memoirs Live</span>
          </div>
        </div>

        {/* Visual Keynote Speaker Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img
                src="/assets/vetrivel_original_blazer.jpg"
                alt="Vetrivel Muthusamy - Keynote Speaker & Solution Architect"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/40 to-slate-950 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <Sparkles size={13} className="text-indigo-400" />
                <span>KEYNOTE EXECUTIVE MEMOIRS</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                  GLOBAL DISCOVERY & ADVISORY
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                  The Architect&apos;s Field Logs
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Real-world engineering insights gathered across 11+ years leading Tier-1 carrier transformations, cutting manual testing by 50%, and preventing multi-million dollar billing leakages.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-400 block text-[9.5px]">CARRIER SCALE</span>
                  <span className="text-indigo-400 font-bold">10M+ SUBS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-400 block text-[9.5px]">GLOBAL MOBILITY</span>
                  <span className="text-emerald-400 font-bold">100% READY ✈️</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-md select-none">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engineering papers, parameters or topics..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
          />
        </div>

        {/* Blog Article Cards: 3-column Widescreen Bento Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group p-6 sm:p-7 rounded-3xl glass-card border border-slate-200 hover:border-indigo-500/50 bg-white transition-all duration-300 cursor-pointer text-left shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-block px-3 py-1 rounded-xl text-[10.5px] font-mono uppercase bg-indigo-50 text-indigo-800 font-bold border border-indigo-200">
                      {post.category}
                    </span>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 uppercase font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="shrink-0 text-slate-400" /> {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors tracking-tight leading-snug font-sans">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-mono font-bold text-indigo-700 group-hover:translate-x-1 transition-transform">
                  <span>READ REFLECTION</span>
                  <ArrowRight size={14} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl glass-card text-center space-y-3 font-mono text-slate-500">
            <p>No memoirs matching your filter query.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-sky-600 underline cursor-pointer"
            >
              Reset search criteria
            </button>
          </div>
        )}

        {/* Modal: Full Article Reading View */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="w-full max-w-3xl rounded-3xl glass-panel bg-white border border-slate-200 p-6 sm:p-10 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto animate-scale-up text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl text-[10.5px] font-mono uppercase bg-indigo-50 text-indigo-800 font-bold border border-indigo-200">
                      {selectedPost.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {formattedDate(selectedPost.createdAt)} · {selectedPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug font-sans">
                    {selectedPost.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyShareLink(selectedPost)}
                    title="Share Link"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
                  </button>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 font-sans leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500">Authored by Vetrivel Muthusamy</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Close Reading
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
