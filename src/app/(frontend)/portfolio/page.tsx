import React from "react";
import Link from "next/link";
import { getProjects } from "@/lib/db";
import { ArrowRight, Sparkles, Code2, Film, Video } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export const metadata = {
  title: "Case Studies & Portfolio | PencilHub Creative Agency",
  description: "Browse our award-winning work in branding, Next.js web development, motion designs, and video editing for modern startups.",
};

const iconMapping: { [key: string]: any } = {
  "Web Development": Code2,
  "Branding": Sparkles,
  "Motion Graphics": Film,
  "Video Editing": Video
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Our Work</span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mt-4 max-w-2xl leading-[1.05]">
            Case Studies
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mt-6 leading-relaxed">
            A curated showcase of branding systems, high-speed interfaces, and cinematic storytelling.
          </p>
        </div>
      </section>

      {/* Grid of Projects */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => {
            const ProjectIcon = iconMapping[project.category] || Sparkles;
            
            return (
              <div
                key={project.id}
                className="group relative rounded-3xl border border-card-border bg-card-bg shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-500"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-[#0A0A0A]/10 group-hover:bg-[#0A0A0A]/0 z-10 transition-colors duration-500" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Corner tags */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 text-xxs font-bold uppercase tracking-wider rounded-full bg-background/80 backdrop-blur-xs text-foreground shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 text-xxs font-bold uppercase tracking-wider rounded-full bg-background/80 backdrop-blur-xs text-foreground shadow-sm font-mono">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Body Meta */}
                <div className="p-6 relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground font-display group-hover:text-accent-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-foreground/50 mt-2 leading-relaxed line-clamp-2">
                        {project.challenge}
                      </p>
                    </div>
                    
                    <div className="p-2.5 rounded-xl bg-foreground/5 text-foreground/75 group-hover:bg-accent-blue group-hover:text-white transition-all shrink-0">
                      <ProjectIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-card-border flex items-center justify-between">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-accent-blue transition-colors flex items-center gap-1.5"
                    >
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
