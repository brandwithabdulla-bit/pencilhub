"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax and scroll scale binds for premium depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleShowreel = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacityShowreel = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  // Splitting branding letters for staggered character entry
  const brandWord = "PENCILHUB";

  return (
    <section 
      ref={containerRef}
      className="relative pt-16 pb-24 md:pb-32 overflow-hidden bg-background text-foreground flex flex-col items-center text-center transition-colors duration-500"
    >
      {/* Editorial Vector Grid Overlay */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[350px] bg-gradient-to-b from-blue-500/5 to-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center relative z-10">
        
        {/* Editorial Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-card-border bg-neutral-gray/50 text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/50 mb-6 shadow-xxs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          <Sparkles className="w-3 h-3 text-accent-blue" />
          <span>LEARN. CREATE. INSPIRE.</span>
        </motion.div>

        {/* Agency Tagline Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base text-foreground/50 font-sans font-medium max-w-3xl leading-relaxed tracking-wide px-4 text-balance"
        >
          PencilHub is a premium creative agency helping businesses create memorable brands through{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Branding</span>,{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Web Design</span>,{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Website Development</span>,{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Motion Graphics</span>,{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Graphic Design</span>,{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Video Editing</span>, and{" "}
          <span className="text-foreground font-semibold border-b border-card-border pb-0.5 hover:border-foreground transition-colors cursor-default">Digital Experiences</span>.
        </motion.p>

        {/* Giant full-width branding text with scroll-triggered parallax */}
        <motion.div 
          style={{ y: yText }}
          className="w-full border-t border-b border-card-border py-8 my-6 flex justify-center items-center overflow-hidden select-none"
        >
          <h1 className="font-display text-[11.5vw] font-black tracking-tighter leading-none text-foreground font-extrabold uppercase m-0 p-0 flex">
            {brandWord.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.05,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Showreel card element */}
        <motion.div 
          style={{ scale: scaleShowreel, opacity: opacityShowreel }}
          className="w-full max-w-6xl aspect-[21/9] bg-neutral-gray border border-card-border rounded-3xl overflow-hidden relative group flex items-center justify-center shadow-lg"
        >
          {/* Noise and grid texture overlays inside card */}
          <div className="absolute inset-0 bg-grid-overlay opacity-[0.03] z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, rgba(0,0,0,0.03) 100%) z-10 pointer-events-none" />

          {/* Interactive Play Button */}
          <div className="relative z-20 flex flex-col items-center gap-3">
            <Magnetic>
              <button 
                className="w-20 h-20 rounded-full bg-background border border-card-border text-foreground flex items-center justify-center shadow-xl group-hover:scale-108 active:scale-95 transition-all duration-500 cursor-pointer"
                aria-label="Play showreel video"
              >
                <Play className="w-7 h-7 fill-current translate-x-0.5 text-foreground" />
              </button>
            </Magnetic>
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/50 group-hover:text-foreground/80 transition-colors"
            >
              Play Showreel
            </motion.span>
          </div>

          {/* Background image composition with scale reveal */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80')"
            }}
          />

          {/* Editorial overlay filter */}
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500 z-0" />
        </motion.div>

      </div>
    </section>
  );
}
