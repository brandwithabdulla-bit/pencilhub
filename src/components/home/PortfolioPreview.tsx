"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  slug: string;
  category: string;
  year: string;
  image: string;
}

export default function PortfolioPreview({ projects }: { projects?: ProjectItem[] }) {
  // Use first 4 projects from database, fallback to seed mockups if empty
  const activeProjects = projects && projects.length > 0 ? projects.slice(0, 4) : [];

  if (activeProjects.length === 0) return null;

  return (
    <section className="relative py-24 bg-background text-foreground border-t border-card-border transition-colors duration-500">
      
      {/* Decorative noise grid overlays */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="border-b border-card-border pb-6 mb-16">
          <h2 className="font-display text-xs font-mono uppercase tracking-widest text-foreground/45 font-extrabold">
            PROJECTS
          </h2>
        </div>

        {/* 2x2 Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {activeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="flex flex-col gap-5 group block"
              >
                
                {/* Horizontal aspect-video frame with zoom effects */}
                <div className="relative aspect-video bg-neutral-gray border border-card-border rounded-3xl overflow-hidden shadow-xs select-none">
                  {/* Subtle Grid texture overlay inside card */}
                  <div className="absolute inset-0 bg-grid-overlay opacity-[0.03] z-10 pointer-events-none" />
                  
                  {/* Visual noise filters */}
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/0 transition-colors duration-500 z-10" />

                  {/* Dynamic Portfolio Image */}
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${project.image}')`
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Clean Category Badge overlay */}
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg bg-background border border-card-border text-foreground shadow-xxs">
                    {project.category}
                  </span>
                  
                  {/* Floating Action Arrow */}
                  <div className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-background border border-card-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Typography Metadata Row */}
                <div className="flex justify-between items-start px-2 font-mono">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wide group-hover:text-accent-blue transition-colors">
                      {project.client}
                    </span>
                    <span className="text-[10px] text-foreground/50 font-medium lowercase">
                      {project.title}
                    </span>
                  </div>
                  
                  <span className="text-xs sm:text-sm text-foreground/50 font-bold">
                    {project.year}
                  </span>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
