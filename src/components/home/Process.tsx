"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discover",
    subtitle: "Understanding your business, goals, audience, and challenges.",
    details: "We start with client consultations to audit your current assets, define project objectives, align budgets, and outline key metrics for success."
  },
  {
    num: "02",
    title: "Research",
    subtitle: "Studying competitors, trends, opportunities, and user behavior.",
    details: "We analyze competitor visual identities, keyword strategies, industry layout trends, and map customer journey layouts to find gaps."
  },
  {
    num: "03",
    title: "Strategy",
    subtitle: "Creating a roadmap that aligns creativity with measurable objectives.",
    details: "We deliver a strategy brief establishing brand voice, user stories, visual directions, typography guidelines, and technical architectures."
  },
  {
    num: "04",
    title: "Design",
    subtitle: "Developing concepts, prototypes, interfaces, and visual systems.",
    details: "Our UI/UX designers create wireframes and high-fidelity prototypes in Figma, testing user flows and responsive formatting."
  },
  {
    num: "05",
    title: "Develop",
    subtitle: "Building fast, scalable, secure, and optimized digital products.",
    details: "Our Next.js developers write clean, semantic TypeScript, integrating animations with GSAP and ensuring Lighthouse speeds are sub-second."
  },
  {
    num: "06",
    title: "Launch",
    subtitle: "Testing, deploying, optimizing, and supporting for long-term success.",
    details: "We execute Lighthouse checks, SEO schema validation, deploy server-side routing, and transfer the CMS editor access to your team."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the process container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll value
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-neutral-gray overflow-hidden">
      
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-xl mb-20 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">How We Work</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Our Creative Process
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed mt-2">
            Every successful project starts with a structured roadmap. We integrate creative ideas with strict engineering and strategic checkpoints.
          </p>
        </div>

        {/* Timeline Row */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* SVG Scroll Line Overlay column (hidden on small screen sizes) */}
          <div className="hidden lg:block lg:col-span-1 relative h-full flex justify-center">
            {/* Background Line */}
            <div className="absolute top-4 bottom-4 w-[2px] bg-foreground/10 rounded-full" />
            
            {/* Drawing Line */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent-blue via-accent-purple to-neon-green rounded-full"
            />
          </div>

          {/* Steps List Column */}
          <div className="lg:col-span-11 flex flex-col gap-12 md:gap-16">
            {steps.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={step.num}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 relative"
              >
                {/* Step Number + Title */}
                <div className="md:col-span-4 flex items-start gap-4">
                  <span className="font-display text-3xl font-extrabold text-accent-blue/40 font-mono">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-foreground leading-tight">
                      {step.title}
                    </h3>
                    <span className="text-xxs uppercase tracking-wider font-mono text-foreground/40 mt-1 block">
                      Phase {step.num}
                    </span>
                  </div>
                </div>

                {/* Step Details Column */}
                <div className="md:col-span-8 flex flex-col gap-2 bg-background p-6 rounded-2xl border border-card-border shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-foreground leading-snug">
                    {step.subtitle}
                  </h4>
                  <p className="text-xs text-foreground/50 leading-relaxed mt-1">
                    {step.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
