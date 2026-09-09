import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, Linkedin, Github, Copy, Check } from "lucide-react";
import { addMessage } from "../db/storage";
import SectionHeader from "./SectionHeader";

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
      className="py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-slate-50 text-slate-900 transition-colors duration-500 relative"
    >
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        
        {/* Left: Contact Coordinates */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <SectionHeader
            badgeNumber="08"
            badgeText="INQUIRIES & ADVISORY CHANNELS"
            badgeColor="emerald"
            title="Global Relocation &"
            gradientWord="Executive Contact"
            description="Open to Solution Architect opportunities, international mobility, advisory consultancies, or expert lead oversight on OSS/BSS carrier transformations worldwide."
          />

          <div className="space-y-3.5 pt-2">
            {/* Email card with quick copy */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">PRIMARY EMAIL</span>
                  <a href="mailto:vetrivelm02@gmail.com" className="text-xs font-mono font-bold text-slate-900 hover:text-sky-600 transition-colors">
                    vetrivelm02@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy("vetrivelm02@gmail.com", "email")}
                title="Copy Email"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {copiedField === "email" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Phone card with quick copy */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">VOIP & MOBILE</span>
                  <a href="tel:+919916008877" className="text-xs font-mono font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                    +91 9916008877
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy("+919916008877", "phone")}
                title="Copy Phone"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {copiedField === "phone" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Location card */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-card border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">GLOBAL MOBILITY & SPONSORSHIP</span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  Targeting: Singapore 🇸🇬 · UK 🇬🇧 · USA 🇺🇸 · Switzerland 🇨🇭 · Luxembourg 🇱🇺
                </span>
                <span className="block text-[10.5px] font-mono text-emerald-800 font-bold pt-0.5">
                  ✓ Seeking Visa Sponsorship • 100% Ready for Relocation
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
              className="p-3 rounded-2xl glass-card border border-slate-200 hover:border-sky-500 text-slate-600 hover:text-sky-600 transition-colors cursor-pointer shadow-xs"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/vetrivelm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl glass-card border border-slate-200 hover:border-sky-500 text-slate-600 hover:text-sky-600 transition-colors cursor-pointer shadow-xs"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-200 bg-white shadow-xl space-y-6 text-left"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                Transmit a Direct Query
              </h3>
              <p className="text-xs font-mono text-slate-500">
                Direct transmission to Vetrivel Muthusamy.
              </p>
            </div>

            {status === "success" && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Transmission delivered successfully. Vetrivel will respond promptly!</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono flex items-center gap-2.5">
                <AlertTriangle size={16} className="text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-600 font-bold block">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins (VP of Engineering / Recruiter)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-600 font-bold block">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah.jenkins@telecom-carrier.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-600 font-bold block">
                  Project Inquiries or Advisory Context
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your telecom transformation challenge, full-stack architecture need, or role requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-md shadow-sky-600/20 hover:shadow-sky-600/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
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
