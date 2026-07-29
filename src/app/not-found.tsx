import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Visual backgrounds */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-accent-blue/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md">
        
        {/* Subtle icon */}
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-accent-blue animate-pulse">
          <HelpCircle className="w-10 h-10" />
        </div>

        {/* 404 code */}
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">Error 404</span>

        {/* Heading */}
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none">
          Lost In Space.
        </h1>

        {/* Support description */}
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xs mt-2">
          The brand layout or case study path you are searching for does not exist or has been shifted.
        </p>

        {/* Navigation CTAs */}
        <div className="flex gap-4 mt-6">
          <Magnetic>
            <Link
              href="/"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center gap-2 group"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-xxs text-white/30 uppercase font-mono tracking-widest pointer-events-none">
        pencilhub creative studio
      </div>

    </div>
  );
}
