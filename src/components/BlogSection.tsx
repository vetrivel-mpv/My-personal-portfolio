import React, { useState, useMemo } from "react";
import { BookOpen, Search, Clock, Calendar, ChevronRight, X, ArrowRight, Sparkles, Share2, Check } from "lucide-react";
import { BlogPost } from "../types";

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
      className="py-24 px-4 md:px-8 xl:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500 relative"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Title Block */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2 select-none">
            <span className="h-[1px] w-6 bg-indigo-500" />
            <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">
              SYSTEM MEMOIRS & CHRONICLES
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                Engineering Reflections
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Technical logs, architectural deep dives, and system learnings accumulated over 11 years within enterprise carrier infrastructures.
              </p>
            </div>

            {/* Live Count Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-mono self-start sm:self-auto select-none">
              <BookOpen size={14} className="text-indigo-500 dark:text-indigo-400" />
              <span>{filteredBlogs.length} Memoirs Live</span>
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
            className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Blog Article Cards */}
        {filteredBlogs.length > 0 ? (
          <div className="space-y-6 select-none">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-900/90 transition-all duration-300 cursor-pointer text-left shadow-md hover:shadow-indigo-500/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <span className="inline-block px-3 py-1 rounded-xl text-[10.5px] font-mono uppercase bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/20 self-start sm:self-auto">
                    {post.category}
                  </span>

                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="shrink-0 text-slate-400" /> {formattedDate(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="shrink-0 text-slate-400" /> {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors tracking-tight leading-snug font-sans">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-850 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>READ ARCHITECTURAL REFLECTION</span>
                  <ArrowRight size={14} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl glass-card text-center space-y-3 font-mono text-slate-500 dark:text-slate-400">
            <p>No memoirs matching your filter query.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-sky-600 dark:text-sky-400 underline cursor-pointer"
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
              className="w-full max-w-3xl rounded-3xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto animate-scale-up text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl text-[10.5px] font-mono uppercase bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/20">
                      {selectedPost.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {formattedDate(selectedPost.createdAt)} · {selectedPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug font-sans">
                    {selectedPost.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyShareLink(selectedPost)}
                    title="Share Link"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {copiedLink ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
                  </button>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-4 font-sans leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Authored by Vetrivel Muthusamy</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold transition-colors cursor-pointer"
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
