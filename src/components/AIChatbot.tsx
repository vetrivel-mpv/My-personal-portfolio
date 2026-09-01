import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  X, 
  RotateCcw, 
  Bot, 
  User, 
  CornerDownLeft, 
  Loader2,
  ChevronDown
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const DEFAULT_SUGGESTIONS = [
  "Tell me about Vetrivel's telecom expertise",
  "How did he achieve a 40% regression decrease?",
  "What's his signature tech stack?",
  "Is Vetrivel certified in AWS / Agile?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I am **Vetriebot**, Vetrivel's AI Assistant. Ask me anything about his 11+ years of Telecom OSS/BSS custody, Java microservices architecture, Test Leadership at Capgemini, or his worldwide travel readiness for global Solution Architect roles!"
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("HTTP connection failed");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.text || "I processed your request but received an empty response. Let me know if I can detail other milestones!"
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "✨ **Vetriebot Knowledge Summary**:\n\n- 💼 **Primary Role**: Solution Architect & Test Architect Lead\n- ✈️ **Global Mobility**: 100% Ready and enthusiastic for frequent worldwide travel (EMEA, Americas, APAC, UK)\n- 📡 **Domain Experience**: 11+ Years across Telecom OSS/BSS, Singleview Billing, SNMP mediation, and SLA assurance\n- ⚙️ **Core Tech Stack**: Java 21, Spring Boot 3.3, Selenium Grid, Docker, Kubernetes, React, Kafka\n- 🏆 **Major Achievement**: 40% Regression cycle acceleration across Capgemini lines with zero P1/P2 defect leakage\n- 📜 **Certifications**: AWS Certified Cloud Practitioner, Oracle Certified Web Component Developer (OCWCD), Capgemini Quality Lead Method\n\nFeel free to connect with Vetrivel directly at **vetrivelm02@gmail.com** or via LinkedIn!"
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat reset successfully. Ask me anything about Vetrivel's professional history, Capgemini metrics, or systems expertise!"
      }
    ]);
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const parts = line.split(/\*\*([\s\S]*?)\*\*/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-extrabold text-white">{part}</strong>;
        }
        return part;
      });

      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 my-0.5">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={idx} className="my-1 leading-relaxed text-slate-300">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          id="ai-chatbot-toggle-button"
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-2xl shadow-sky-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <Bot size={18} />
          <span className="hidden sm:inline">Ask Vetriebot</span>
          {unreadCount > 0 && (
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          )}
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div 
          id="ai-chatbot-window"
          className="w-[92vw] sm:w-[400px] h-[520px] max-h-[85vh] rounded-3xl glass-panel bg-slate-900/95 border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-scale-up text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span>Vetriebot AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[10px] font-mono text-slate-400">Solution Architect Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw size={13} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px]">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.role === "user"
                      ? "bg-sky-500 text-white rounded-br-none font-medium"
                      : "bg-slate-950/80 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {renderMessageContent(m.content)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
                <Loader2 size={13} className="animate-spin text-sky-400" />
                <span>Vetriebot is synthesizing response...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {DEFAULT_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-slate-800 bg-slate-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask anything about Vetrivel's systems..."
                className="flex-grow px-3.5 py-2 text-xs font-sans rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
