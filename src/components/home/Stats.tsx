"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Users2, Landmark } from "lucide-react";

const statsList = [
  { id: 1, val: "250+", label: "Projects Completed", icon: Trophy, desc: "Delivered premium work globally." },
  { id: 2, val: "150+", label: "Happy Clients", icon: Users2, desc: "Long-term visual partnerships." },
  { id: 3, val: "12+", label: "Industries Served", icon: Landmark, desc: "Aura, Zenith & tech players." },
  { id: 4, val: "98%", label: "Satisfaction Rate", icon: CheckCircle2, desc: "Flawless communication metrics." }
];

export default function Stats() {
  return (
    <section className="relative py-20 bg-neutral-gray overflow-hidden">
      <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group p-6 rounded-3xl border border-card-border bg-background shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    {stat.val}
                  </span>
                  <div className="p-2.5 rounded-xl bg-accent-blue/5 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all shrink-0">
                    <StatIcon className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-foreground tracking-wide">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                    {stat.desc}
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
