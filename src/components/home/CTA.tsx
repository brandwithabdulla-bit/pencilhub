"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

interface CTAProps {
  settings?: any;
}

export default function CTA({ settings }: CTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for premium feel
  const yButton = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const phrase = settings?.siteName
    ? `Start a new experience with ${settings.siteName}!`
    : "Start a new experience with us!";

  return (
    <section 
      ref={containerRef}
      className="relative py-28 bg-background text-foreground text-center border-t border-card-border flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
    >
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-gradient-to-t from-purple-500/5 via-blue-500/5 to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-10">
        
        {/* Editorial Serif Heading with staggered letter-by-letter reveal */}
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-foreground max-w-2xl leading-[1.1] mx-auto select-none flex flex-wrap justify-center gap-x-3 gap-y-2">
          {phrase.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block overflow-hidden py-1">
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: wordIndex * 0.08,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Dynamic Action Button reversing colors automatically based on theme */}
        <motion.div style={{ y: yButton }}>
          <Magnetic>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-foreground text-background hover:opacity-90 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-sm group"
            >
              <span>Let's Talk</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </Magnetic>
        </motion.div>

      </div>
    </section>
  );
}
