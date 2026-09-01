import React from "react";

export default function DevDocs() {
  return (
    <div className="space-y-8 text-slate-300">
      <div>
        <h2 className="text-2xl font-bold font-sans text-white mb-2">Systems Developer Documentation Suite</h2>
        <p className="text-slate-400 text-sm">
          A modular, secure, and fully scalable blueprint designed for Vetrivel Muthusamy's professional Solution Architect portfolio platform.
        </p>
      </div>

      <div className="border border-slate-800 bg-slate-900/50 p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-bold text-sky-400 font-mono flex items-center gap-2">
          <span>◈</span> 1. System Architecture Overview
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The application follows a modern **Clean-Stack Single-Page Application (SPA)** architecture, powered by **React 19**, **Vite 6**, and **Tailwind CSS v4**. It features an elegant dual-storage engine designed to start completely functional with rich resume pre-seed data, falling back gracefully to standard local key-value state persistence or integrating seamlessly with cloud-hosted Firestore database instances if configured.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            <h4 className="text-xs font-semibold text-white font-mono uppercase mb-2">Front-End Components</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li>**Interactive Hero Panel**: Floating system schemas, milestone counts, role transitions.</li>
              <li>**Milestone Explorer**: Interactive project filter system with fully searchable content index.</li>
              <li>**Reflections Blog Engine**: Rendered using direct typographic formatting, optimized for fluid viewport delivery.</li>
              <li>**Admin Dashboard**: Rich content creation, live contact message panel with direct actions, developer telemetry suite.</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            <h4 className="text-xs font-semibold text-white font-mono uppercase mb-2">Security Blueprint</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li>**Input Sanitization**: Strictly sanitizes input streams to guard against Cross-Site Scripting (XSS).</li>
              <li>**Secure Administration**: Simulates credential hashing, preventing state tampering through locked session states.</li>
              <li>**Denial of Wallet Gate**: Prioritizes local validation blocks before triggering high-resource queries.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-emerald-400 font-mono">2. Schema Definition Model</h3>
        <p className="text-sm text-slate-400">
          Entities conform strictly to properties mapped out in `firebase-blueprint.json` to enable future serverless synchronization:
        </p>
        <pre className="text-xs font-mono bg-slate-950 text-emerald-300 p-4 rounded-lg border border-slate-800 overflow-x-auto">
{`interface Project {
  id: string; // 'proj-' prefixed timestamp/uuid
  title: string;
  description: string;
  category: "Test Architecture" | "Telecom OSS/BSS" | "Full Stack" | "General QA";
  icon: string; // Emoji representing system layer
  techs: string[]; // List of technologies/standards
  impact: string; // Real business/technical result
  createdAt: string; // ISO DateTime format
}

interface BlogPost {
  id: string; // 'blog-' prefixed timestamp/uuid
  title: string;
  summary: string;
  content: string; // Structured markdown-equivalent text
  category: "Architecture" | "Systems Quality" | "Telecom Insights" | "Career Transition";
  readTime: string;
  createdAt: string;
  status: "published" | "draft";
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-coral-400 font-mono">3. Dual-Mode Storage Realization</h3>
        <p className="text-sm text-slate-300">
          The persistent manager implements standard fallback logic. When checking for Firestore or backend resources, if undefined at startup, it binds directly to the browser's `localStorage` state, pre-seeded with complete high-fidelity mock assets reflecting Vetrivel's telecom track record. This assures that:
        </p>
        <ol className="list-decimal pl-5 text-sm text-slate-400 space-y-2">
          <li>The application loads instantly (**fast speed constraint**).</li>
          <li>All content edits on the Admin dashboard take effect immediately and survive browser refreshes.</li>
          <li>The portfolio remains safe from database rate limits, with standard Spark tier limits explained transparently.</li>
        </ol>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-bold text-violet-400 font-mono">4. Systems Quality & Optimization Checklist</h3>
        <p className="text-sm text-slate-300">
          Engineered to satisfy Vetrivel's core professional benchmarks:
        </p>
        <div className="space-y-2 font-mono text-xs text-slate-400">
          <p className="text-slate-200">✔ **SEO & Speed**: Prefetched fonts, pure semantic HTML layout, zero network-overhead assets for instant mobile load speeds.</p>
          <p className="text-slate-200">✔ **Fully Responsive Focus**: Verified CSS flex and grid breakpoints spanning standard viewport ratios (320px up to 1920px+).</p>
          <p className="text-slate-200">✔ **Inclusive Accessibility**: Balanced contrasts complying with standard readability requirements, backed by an instant light/dark mode state controller.</p>
        </div>
      </div>
    </div>
  );
}
