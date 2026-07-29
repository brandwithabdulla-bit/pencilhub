"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export default function Testimonials({ testimonials }: { testimonials?: TestimonialItem[] }) {
  // Use first 3 testimonials from database
  const activeTestimonials = testimonials && testimonials.length > 0 ? testimonials.slice(0, 3) : [];

  if (activeTestimonials.length === 0) return null;

  return (
    <section className="relative py-24 bg-background text-foreground border-t border-card-border transition-colors duration-500">
      
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="border-b border-card-border pb-6 mb-16">
          <h2 className="font-display text-xs font-mono uppercase tracking-widest text-foreground/45 font-extrabold">
            FEEDBACK
          </h2>
        </div>

        {/* 3-Column Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {activeTestimonials.map((test, index) => (
            <motion.div 
              key={test.id} 
              className="flex flex-col justify-between gap-8 relative group"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* Premium Quote visual card indicator */}
              <div className="flex flex-col gap-4 relative">
                <Quote className="w-8 h-8 text-foreground/10 fill-current opacity-60" />
                
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans font-medium text-balance">
                  "{test.quote}"
                </p>
              </div>

              {/* Author signature line */}
              <div className="border-t border-card-border pt-5 flex flex-col font-mono">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider group-hover:text-accent-blue transition-colors">
                  {test.name}
                </span>
                <span className="text-[9.5px] text-foreground/45 font-medium uppercase mt-0.5 tracking-widest">
                  {test.role} // {test.company}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
