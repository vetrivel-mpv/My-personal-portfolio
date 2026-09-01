import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, Linkedin, Github, Copy, Check } from "lucide-react";
import { addMessage } from "../db/storage";

interface ContactFormProps {
  onMessageSubmitted: () => void;
}

export default function ContactForm({ onMessageSubmitted }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setErrorMsg("All fields are required. Please check empty fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      addMessage({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      onMessageSubmitted();
    } catch (err) {
      setStatus("error");
      setErrorMsg("We experienced an error saving your message. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-4 md:px-8 xl:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 relative"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Coordinates */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 select-none">
              <span className="h-[1px] w-6 bg-sky-500" />
              <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest">
                DIRECT CHANNELS & ADVISORY
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              Get in Touch
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Open to Solution Architect opportunities, advisory consultancies, or expert lead oversight on OSS/BSS carrier transformations worldwide.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {/* Email card with quick copy */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">PRIMARY EMAIL</span>
                  <a href="mailto:vetrivelm02@gmail.com" className="text-xs font-mono font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                    vetrivelm02@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy("vetrivelm02@gmail.com", "email")}
                title="Copy Email"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copiedField === "email" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Phone card with quick copy */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">VOIP & MOBILE</span>
                  <a href="tel:+919790240974" className="text-xs font-mono font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                    +91 9790240974
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy("+919790240974", "phone")}
                title="Copy Phone"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copiedField === "phone" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Location card */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">GLOBAL MOBILITY & RESIDENCE</span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  Bengaluru, India (100% Worldwide Travel Ready)
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://linkedin.com/in/vetrivelm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-sky-500 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/vetrivelm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl space-y-6 text-left"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                Transmit a Direct Query
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Direct transmission to Vetrivel Muthusamy.
              </p>
            </div>

            {status === "success" && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Transmission delivered successfully. Vetrivel will respond promptly!</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-mono flex items-center gap-2.5">
                <AlertTriangle size={16} className="text-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-bold block">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins (VP of Engineering)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-bold block">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah.jenkins@telecom-carrier.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-bold block">
                  Project Inquiries or Advisory Context
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your telecom transformation challenge, full-stack architecture need, or role requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>TRANSMITTING...</span>
              ) : (
                <>
                  <span>TRANSMIT DISCOVERY MESSAGE</span>
                  <Send size={13} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
