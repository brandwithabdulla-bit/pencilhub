import React from "react";
import { getTeam } from "@/lib/db";
import { Compass, Lightbulb, Target, Heart, Scale, Users } from "lucide-react";

export const metadata = {
  title: "About Us | PencilHub Creative Agency",
  description: "Learn about PencilHub's team, our mission, vision, philosophy, and milestones. We help brands grow through strategic visual storytelling.",
};

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We constantly experiment with new visual techniques and tech stacks to build future-ready products." },
  { icon: Target, title: "Strategic Focus", desc: "We align every design decision with business metrics. Strategy always comes before styling." },
  { icon: Compass, title: "Transparency", desc: "Clear communication, direct access to makers, and realistic estimates on deliverables." },
  { icon: Heart, title: "Empathy", desc: "We seek to deeply understand your customers to solve real friction points in their journeys." },
  { icon: Scale, title: "Craftsmanship", desc: "Unwavering attention to typography, margins, speeds, and micro-interactions." },
  { icon: Users, title: "Collaboration", desc: "We partner with you as an extension of your own internal team to achieve key growth goals." }
];

const milestones = [
  { year: "2024", title: "Agency Founded", desc: "PencilHub launched in Bangalore as a collaborative team of design strategists." },
  { year: "2025", title: "Global Expansion", desc: "Delivered packaging and video campaigns for client brands across the UK and USA." },
  { year: "2026", title: "Flagship Web Studio", desc: "Transitioned to dark-first Next.js high-performance web applications and local CMS layers." }
];

export default async function AboutPage() {
  const teamMembers = await getTeam();

  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Inside PencilHub</span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mt-4 max-w-2xl leading-[1.05]">
            Learn. Create. Inspire.
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mt-6 leading-relaxed">
            We are a multidisciplinary team combining branding, design, technology, and user experience to shape ideas into meaningful digital products.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Story */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground uppercase">Our Story</h2>
          <p className="text-sm text-foreground/75 leading-relaxed">
            Every successful brand begins with an idea. Our role at PencilHub is to shape that raw idea into something meaningful. We believe exceptional design is far more than aesthetics—it is a powerful business tool that communicates thoughts, builds trust, and creates authentic connections between companies and audiences.
          </p>
          <p className="text-sm text-foreground/75 leading-relaxed">
            From humble beginnings crafting minimalist vector logos, we have grown into a full-scale creative digital studio. We work closely with founders, startups, and marketing managers to craft cohesive, high-impact branding, high-speed Next.js websites, motion teasers, and cinematic visual products.
          </p>
        </div>

        {/* Philosophy */}
        <div className="lg:col-span-6 flex flex-col gap-6 bg-neutral-gray p-8 rounded-3xl border border-card-border">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground uppercase">Our Philosophy</h2>
          <blockquote className="border-l-4 border-accent-blue pl-4 py-1 italic text-sm text-foreground/80 font-sans">
            "Design is not simply what it looks like. Design is how it functions. Strategy always comes before styling."
          </blockquote>
          <ul className="flex flex-col gap-3 text-xs text-foreground/70 list-disc pl-5 mt-2">
            <li>Every layout must have clear visual purpose.</li>
            <li>Usability and performance always supersede flat aesthetics.</li>
            <li>Every animation should support the story, never distract.</li>
            <li>We design to build measurable revenue and conversion metrics.</li>
          </ul>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-neutral-gray py-24 border-y border-card-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-md mx-auto mb-16 flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Core Beliefs</span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground">Our Core Values</h2>
            <div className="w-12 h-1 bg-accent-blue rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-background border border-card-border shadow-sm flex flex-col justify-between">
                  <div className="p-3 rounded-2xl bg-accent-blue/5 text-accent-blue w-fit mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">{v.title}</h4>
                    <p className="text-xs text-foreground/50 mt-2 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Minds Behind PH</span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground">Our Leadership Team</h2>
          </div>
          <p className="text-xs text-foreground/60 max-w-sm leading-relaxed md:mb-1">
            We are creators, engineers, and strategists working in sync to launch flagship digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group flex flex-col gap-4 bg-neutral-gray p-4 rounded-3xl border border-card-border hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-2 pb-2">
                <h4 className="text-lg font-bold text-foreground">{member.name}</h4>
                <span className="text-xs text-accent-blue font-mono font-medium block mt-1">{member.role}</span>
                <p className="text-xs text-foreground/60 mt-3 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="bg-neutral-gray py-24 border-t border-card-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-md mx-auto mb-16 flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">History</span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground">Our Milestones</h2>
            <div className="w-12 h-1 bg-accent-blue rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-foreground/10 rounded-full hidden md:block" />
            {milestones.map((m, i) => (
              <div key={i} className="p-6 rounded-3xl bg-background border border-card-border shadow-sm hover:shadow-md transition-shadow relative z-10 flex flex-col justify-between min-h-[200px]">
                <span className="font-display text-3xl font-extrabold text-accent-blue font-mono">{m.year}</span>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-foreground">{m.title}</h4>
                  <p className="text-xs text-foreground/50 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
