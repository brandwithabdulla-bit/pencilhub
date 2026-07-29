"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, Zap } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function AboutPreview() {
  return (
    <section className="relative py-24 md:py-32 bg-neutral-gray overflow-hidden">
      
      {/* Decorative background spots */}
      <div className="absolute inset-0 bg-grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column (Editorial Headline) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Who We Are</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            We Design Experiences That Matter.
          </h2>
          <div className="w-16 h-1 bg-accent-blue rounded-full" />
        </div>

        {/* Right Column (Story & Pillars) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed font-sans">
            PencilHub is a premier creative agency where strategy meets award-winning design. We help businesses transform raw ideas into memorable, high-value brands through identity design, development, motion graphics, and digital storytelling. Every layout has purpose, and every interaction is driven by research.
          </p>

          {/* Key Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {[
              { icon: Compass, title: "Strategic Depth", desc: "Research comes before color palettes." },
              { icon: Zap, title: "Modern Tech", desc: "Next.js core structures built to load sub-second." },
              { icon: Shield, title: "Premium QA", desc: "Pixel-perfect visual checks across screen sizes." },
            ].map((pillar, i) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-background border border-card-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 rounded-lg bg-accent-blue/5 text-accent-blue w-fit mb-4">
                    <PillarIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{pillar.title}</h4>
                  <p className="text-xs text-foreground/50 mt-1.5 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Link */}
          <div className="mt-4">
            <Magnetic>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors group"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>

      </div>
    </section>
  );
}
