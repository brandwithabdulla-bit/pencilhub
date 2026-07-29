import React from "react";
import Process from "@/components/home/Process";
import { ArrowUpRight, Compass, Shield, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

export const revalidate = 0;

export const metadata = {
  title: "Our Process | How PencilHub Works",
  description: "Learn about our strategic visual design process. We walk you through Discover, Research, Strategy, Design, Development, and Launch phases.",
};

const phasesDetail = [
  {
    phase: "01",
    name: "Discover & Scope",
    time: "Week 1",
    inputs: "Client questionnaire, brand audit, visual briefs.",
    outputs: "Project statement of work, budget checkpoints, timeline schedules.",
    desc: "We align on target audiences, core deliverables, brand positioning, and KPIs to make sure the project direction matches your immediate business growth goals."
  },
  {
    phase: "02",
    name: "User & Market Research",
    time: "Weeks 1 - 2",
    inputs: "Competitor portfolios, keyword analysis, layout grids.",
    outputs: "Competitor audit decks, customer journey wireframes.",
    desc: "We analyze competitor visual identities, screen resolutions, indexing keywords, and target customer flows to identify unique aesthetic and functional opportunities."
  },
  {
    phase: "03",
    name: "Creative Strategy",
    time: "Week 2",
    inputs: "Mood boards, type options, color guidelines.",
    outputs: "Design direction approval briefs, font/palette assets.",
    desc: "We draft strategic concepts, matching typography scales and color associations with the company's value metrics before opening vector grids or layouts."
  },
  {
    phase: "04",
    name: "Visual Design UI/UX",
    time: "Weeks 3 - 4",
    inputs: "Figma wireframes, layout rules, icons.",
    outputs: "High-fidelity Figma prototypes, screen layouts.",
    desc: "We detail all interactive elements, mobile formatting, grid offsets, and font hierarchies in high-fidelity prototypes, checking user actions for friction."
  },
  {
    phase: "05",
    name: "TypeScript Engineering",
    time: "Weeks 5 - 7",
    inputs: "Design prototypes, animations, code schemas.",
    outputs: "TypeScript source code, local CMS modules, API connections.",
    desc: "Our Next.js developers write clean component code, adding smooth scroll integrations and GSAP/Framer Motion timelines while maintaining sub-second speeds."
  },
  {
    phase: "06",
    name: "Deployment & Reviews",
    time: "Week 8",
    inputs: "Staging builds, test data, SEO tags.",
    outputs: "Live website domain transfer, XML sitemaps, robots.txt.",
    desc: "We execute Lighthouse audits, verify semantic headings, index sitemaps, audit contrast criteria, and host training runs on the CMS panel."
  }
];

export default function ProcessPage() {
  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Workflow Blueprint</span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mt-4 max-w-2xl leading-[1.05]">
            How We Build
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mt-6 leading-relaxed">
            Our strategic design philosophy translates raw ideas into high-performing digital systems in six phases.
          </p>
        </div>
      </section>

      {/* Vertical Interactive Timeline Component */}
      <Process />

      {/* Expanded Phase Details Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        <div className="text-center max-w-md mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">Deep Dive</span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground">Phase Breakdowns</h2>
          <div className="w-12 h-1 bg-accent-blue rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {phasesDetail.map((item) => (
            <div key={item.phase} className="p-6 rounded-3xl border border-card-border bg-neutral-gray relative overflow-hidden flex flex-col justify-between min-h-[340px] hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-center border-b border-card-border pb-4 mb-4">
                  <span className="font-display text-3xl font-extrabold text-accent-blue/40 font-mono">{item.phase}</span>
                  <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xxs font-mono font-bold uppercase tracking-wider">{item.time}</span>
                </div>
                
                <h4 className="text-base font-bold text-foreground font-display">{item.name}</h4>
                <p className="text-xs text-foreground/50 mt-3 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-card-border flex flex-col gap-2 text-xxs font-mono">
                <div>
                  <span className="text-foreground/45 uppercase block">Inputs:</span>
                  <span className="text-foreground/75 mt-0.5 block">{item.inputs}</span>
                </div>
                <div className="mt-2">
                  <span className="text-foreground/45 uppercase block">Deliverables:</span>
                  <span className="text-foreground/75 mt-0.5 block">{item.outputs}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Process CTA */}
      <section className="bg-neutral-gray py-20 border-y border-card-border text-center">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground uppercase">Ready to Start Week 1?</h2>
          <p className="text-xs text-foreground/50 leading-relaxed max-w-sm">
            Our creative directors are ready to review your project specs. Get in touch to schedule your Discover brief call.
          </p>
          <div className="mt-4">
            <Magnetic>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-background bg-foreground hover:scale-105 active:scale-95 transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                Start Project <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

    </div>
  );
}
