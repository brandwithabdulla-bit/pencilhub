"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Film, Video, Layout, HelpCircle } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export default function FeaturedServices({ services }: { services?: ServiceItem[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Dynamic visual panel mockups mapping
  const mockupsMap: { [key: string]: React.ReactNode } = {
    branding: (
      <div className="relative w-full h-full bg-background rounded-xl border border-card-border flex flex-col justify-between p-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-[0.04]" />
        
        {/* Typography specimen header */}
        <div className="flex justify-between items-center border-b border-card-border pb-2">
          <span className="text-[8px] font-mono text-foreground/40 uppercase">SPECIMEN SPEC V.1</span>
          <span className="text-[8px] font-mono text-foreground/40">PENCILHUB STUDIO</span>
        </div>
        
        {/* Big Letter Specimen graphic */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="text-[100px] font-serif font-light text-foreground leading-none select-none tracking-tighter">
            P
          </div>
          
          {/* Guide markers */}
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-card-border/60" />
          <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-card-border/60" />
          
          {/* Brand color dot markers */}
          <div className="absolute bottom-2 right-2 flex gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
            <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
            <span className="w-2 h-2 rounded-full bg-foreground" />
          </div>
        </div>

        <div className="flex justify-between text-[7px] font-mono text-foreground/40 pt-2 border-t border-card-border uppercase tracking-widest">
          <span>AA BB CC DD EE</span>
          <span>Est. 2024</span>
        </div>
      </div>
    ),
    motion: (
      <div className="relative w-full h-full bg-background rounded-xl border border-card-border flex flex-col justify-between p-3 overflow-hidden select-none">
        {/* Timeline header */}
        <div className="flex justify-between items-center border-b border-card-border pb-2 text-foreground/45 font-mono text-[7px] tracking-wider">
          <span>TIMELINE TRACKS</span>
          <span className="text-amber-500 font-bold">00:02:15</span>
        </div>

        {/* Keyframe visual track list */}
        <div className="flex-1 flex flex-col justify-center gap-2.5">
          {[
            { label: "Vector Logo Scale", progress: "w-[75%]" },
            { label: "Camera Zoom Parallax", progress: "w-[40%]" },
            { label: "Text Reveal Mask", progress: "w-[90%]" }
          ].map((track, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[6.5px] font-mono text-foreground/60">{track.label}</span>
              <div className="h-2 w-full bg-neutral-gray border border-card-border rounded-full overflow-hidden relative">
                {/* Timeline progress line */}
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: track.progress.replace("w-[", "").replace("]", "") }} />
                
                {/* Diamond Keyframe points */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300 text-[8px] leading-none">◆</div>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-300 text-[8px] leading-none">◆</div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline control tags */}
        <div className="flex justify-between text-[7px] font-mono text-foreground/30 pt-1 border-t border-card-border">
          <span>FPS: 60.00</span>
          <span>RENDER COMPLETED</span>
        </div>
      </div>
    ),
    editing: (
      <div className="relative w-full h-full bg-background rounded-xl border border-card-border flex flex-col justify-between p-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-[0.02]" />
        
        <div className="flex justify-between items-center border-b border-card-border pb-2">
          <span className="text-[8px] font-mono text-foreground/35 uppercase">Color Wheel Grading</span>
          <span className="text-[8px] font-mono text-rose-500 uppercase font-bold">LUT active</span>
        </div>

        {/* Color Wheel layout visual */}
        <div className="flex-1 flex items-center justify-around py-2">
          {/* Shadows Wheel */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[6.5px] font-mono text-foreground/40">SHADOWS</span>
            <div className="w-16 h-16 rounded-full border border-card-border relative flex items-center justify-center bg-neutral-gray shadow-inner">
              {/* Grading point indicator offset to cold shadows */}
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute top-4 left-6 shadow-glow" />
              <div className="w-4 h-4 rounded-full border border-card-border border-dashed" />
            </div>
          </div>

          {/* Timeline Waveforms layout preview */}
          <div className="flex-1 max-w-[80px] flex flex-col gap-2 pl-3 justify-center">
            <div className="flex flex-col gap-1 border-l border-card-border pl-2">
              <span className="text-[6.5px] font-mono text-foreground/40">LUMA RANGE</span>
              <span className="text-[10px] font-mono text-foreground font-semibold">94.6%</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-card-border pl-2">
              <span className="text-[6.5px] font-mono text-foreground/40">CONTRAST</span>
              <span className="text-[10px] font-mono text-foreground font-semibold">+18db</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-[7px] font-mono text-foreground/30 pt-2 border-t border-card-border">
          <span>EXPORT: ProRes 422</span>
          <span>READY</span>
        </div>
      </div>
    ),
    uiux: (
      <div className="relative w-full h-full bg-neutral-gray rounded-xl border border-card-border flex flex-col justify-between overflow-hidden select-none">
        {/* Mock Browser Header */}
        <div className="h-5 bg-background border-b border-card-border flex items-center px-3 gap-1 z-10 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        </div>

        {/* Browser Inner Workspace Mockup */}
        <div className="flex-1 bg-background p-3 flex flex-col gap-3 relative">
          <div className="absolute inset-0 bg-grid-overlay opacity-[0.03]" />
          
          {/* Header placeholder */}
          <div className="flex justify-between items-center">
            <div className="w-10 h-2 bg-neutral-gray rounded-full" />
            <div className="flex gap-2">
              <div className="w-6 h-2 bg-neutral-gray rounded-full" />
              <div className="w-6 h-2 bg-neutral-gray rounded-full" />
            </div>
          </div>

          {/* Split content columns placeholder */}
          <div className="flex-1 grid grid-cols-12 gap-2 mt-1">
            <div className="col-span-8 flex flex-col gap-2">
              <div className="h-4 w-full bg-neutral-gray rounded-lg" />
              <div className="h-3 w-[70%] bg-neutral-gray rounded-lg animate-pulse" />
              <div className="h-5 w-16 bg-purple-600/90 rounded-lg mt-1" />
            </div>
            <div className="col-span-4 rounded-lg bg-neutral-gray border border-card-border flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-card-bg" />
            </div>
          </div>

          {/* Interactive Vector Mouse Pointer */}
          <div className="absolute bottom-4 right-10 z-20 flex flex-col items-center">
            <svg className="w-4 h-4 text-purple-600 fill-current drop-shadow-sm rotate-[15deg]" viewBox="0 0 24 24">
              <path d="M4 4l16 8-7.5 1.8L20 20l-2.5 1-7.8-6.2L4 16z" />
            </svg>
          </div>
        </div>
      </div>
    ),
    generic: (
      <div className="relative w-full h-full bg-background rounded-xl border border-card-border flex flex-col justify-between p-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-[0.03]" />
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8 text-foreground/20 animate-pulse" />
          <span className="text-[10px] font-mono text-foreground/45 uppercase tracking-widest">PENCILHUB PREMIUM SERVICE</span>
        </div>
      </div>
    )
  };

  // Helper selectors
  const getMockup = (title: string, id: string) => {
    const t = title.toLowerCase();
    if (t.includes("brand") || id === "serv-1") return mockupsMap.branding;
    if (t.includes("motion") || id === "serv-4") return mockupsMap.motion;
    if (t.includes("video") || t.includes("edit") || id === "serv-5") return mockupsMap.editing;
    if (t.includes("web") || t.includes("design") || t.includes("ux") || t.includes("ui") || id === "serv-2" || id === "serv-3") return mockupsMap.uiux;
    return mockupsMap.generic;
  };

  const getIcon = (title: string, id: string) => {
    const t = title.toLowerCase();
    if (t.includes("brand") || id === "serv-1") return Sparkles;
    if (t.includes("motion") || id === "serv-4") return Film;
    if (t.includes("video") || t.includes("edit") || id === "serv-5") return Video;
    return Layout;
  };

  const getColors = (title: string, id: string) => {
    const t = title.toLowerCase();
    if (t.includes("brand") || id === "serv-1") return { color: "text-blue-500", bg: "bg-blue-500/10" };
    if (t.includes("motion") || id === "serv-4") return { color: "text-amber-600", bg: "bg-amber-500/10" };
    if (t.includes("video") || t.includes("edit") || id === "serv-5") return { color: "text-rose-500", bg: "bg-rose-500/10" };
    return { color: "text-purple-600", bg: "bg-purple-500/10" };
  };

  // Render first 4 premium services on homepage
  const activeServices = services && services.length > 0 ? services.slice(0, 4) : [];

  if (activeServices.length === 0) return null;

  return (
    <section className="relative py-24 bg-background text-foreground border-t border-card-border transition-colors duration-500">
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section title header */}
        <div className="border-b border-card-border pb-6 mb-16">
          <h2 className="font-display text-xs font-mono uppercase tracking-widest text-foreground/45 font-extrabold">
            SERVICES
          </h2>
        </div>

        {/* 2x2 Services Grid with custom framer motion staggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {activeServices.map((service) => {
            const Icon = getIcon(service.title, service.id);
            const { color, bg } = getColors(service.title, service.id);
            const mockup = getMockup(service.title, service.id);
            
            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex flex-col gap-6 group transition-all duration-300 border-b border-transparent pb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Horizontal Canvas wrapper */}
                <div className="relative aspect-video bg-neutral-gray border border-card-border rounded-2xl overflow-hidden shadow-xs p-4 flex items-center justify-center transition-all duration-500 group-hover:bg-neutral-gray/60 group-hover:shadow-sm">
                  {/* Subtle noise grid */}
                  <div className="absolute inset-0 bg-grid-overlay opacity-[0.02] pointer-events-none" />
                  
                  {/* Mockup Canvas */}
                  <div className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-101">
                    {mockup}
                  </div>
                </div>

                {/* Info Text Row */}
                <div className="flex flex-col gap-2 px-1">
                  <div className="flex items-center gap-3">
                    {/* Dynamic service status icon badge */}
                    <div className={`p-2 rounded-xl border border-card-border ${bg} ${color} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-accent-blue transition-colors duration-250">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/50 font-sans leading-relaxed mt-1 max-w-xl">
                    {service.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
