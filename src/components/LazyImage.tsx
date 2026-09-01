import React, { useState, useEffect, useRef } from "react";
import { Cpu, RefreshCw, Layers } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderHeight?: string;
}

export default function LazyImage({ src, alt, className = "", placeholderHeight = "h-48" }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px 0px", // Trigger slightly before it comes into full view
        threshold: 0.01
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observer) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden w-full bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-850/60 transition-all duration-300 ${placeholderHeight} ${className}`}
    >
      {/* SKELETON / PLACEHOLDER (presents pulsing technical wireframe layout) */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 select-none">
          {/* Engineering grid detail background decoration inside loading state */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:0.75rem_0.75rem] opacity-70" />
          
          <div className="relative z-10 flex flex-col items-center gap-2 text-center text-slate-400 dark:text-slate-550">
            {hasError ? (
              <>
                <Layers size={18} className="text-slate-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">system_diagram.cfg</span>
              </>
            ) : (
              <>
                <Cpu size={18} className="text-blue-500/80 animate-spin" style={{ animationDuration: "3s" }} />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase animate-pulse">INIT_LAZY_STREAM_LOAD...</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* RENDERED IMAGE */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
