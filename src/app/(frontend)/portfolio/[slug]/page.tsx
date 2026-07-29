import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/db";

export const revalidate = 0;
import { ArrowLeft, Check, Server, Award, Calendar, Users } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

interface Props {
  params: {
    slug: string;
  };
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.title} Case Study | PencilHub`,
    description: `Read how PencilHub solved Zenith/Aura branding and web engineering needs: ${project.challenge.substring(0, 120)}...`,
    openGraph: {
      title: `${project.title} Case Study | PencilHub`,
      description: project.challenge,
      images: [{ url: project.image }],
    }
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Get related projects
  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <div className="bg-background text-foreground pb-24">
      
      {/* Back to Work link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/60 hover:text-accent-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>
      </div>

      {/* Case Study Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">{project.category}</span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            {project.title}
          </h1>
        </div>

        {/* Project info card details */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-6 p-6 rounded-3xl border border-card-border bg-neutral-gray relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          
          <div>
            <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-foreground/45 font-mono">
              <Users className="w-3.5 h-3.5" /> Client
            </span>
            <span className="text-xs font-bold text-foreground mt-1.5 block">{project.client}</span>
          </div>

          <div>
            <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-foreground/45 font-mono">
              <Calendar className="w-3.5 h-3.5" /> Year
            </span>
            <span className="text-xs font-bold text-foreground mt-1.5 block">{project.year}</span>
          </div>
        </div>
      </section>

      {/* Main Image Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-card-border shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Narrative grid columns */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left narrative content */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Challenge block */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-foreground/45 border-b border-card-border pb-2">The Challenge</h3>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-sans mt-2">
              {project.challenge}
            </p>
          </div>

          {/* Solution block */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-foreground/45 border-b border-card-border pb-2">Our Solution</h3>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-sans mt-2">
              {project.solution}
            </p>
          </div>

          {/* Process block */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-foreground/45 border-b border-card-border pb-2">Development Process</h3>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-sans mt-2">
              {project.process}
            </p>
          </div>

          {/* Results block */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-foreground/45 border-b border-card-border pb-2">Measurable Results</h3>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-sans mt-2">
              {project.results}
            </p>
          </div>

        </div>

        {/* Right Info Sidebar (Tech Stack + Related Work) */}
        <div className="lg:col-span-4 flex flex-col gap-10">
          
          {/* Tech stack box */}
          <div className="p-6 rounded-3xl border border-card-border bg-neutral-gray relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
            <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-foreground">
              <Server className="w-4 h-4 text-accent-blue" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-background text-foreground/70 text-xxs font-bold uppercase tracking-wider rounded-full border border-card-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery screenshots lists */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-foreground/45">Visual Gallery</h4>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-card-border shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Gallery view ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </section>

      {/* Related Projects slider link if exists */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28 border-t border-card-border pt-16">
          <h4 className="text-xs uppercase tracking-widest font-bold text-foreground/45 mb-8">Related Case Studies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                href={`/portfolio/${p.slug}`}
                className="group p-6 rounded-3xl border border-card-border bg-neutral-gray hover:shadow-lg hover:border-accent-blue/20 transition-all duration-300 flex justify-between items-center"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-accent-blue block">{p.category}</span>
                  <h4 className="text-lg font-bold text-foreground font-display group-hover:text-accent-blue transition-colors mt-1.5">{p.title}</h4>
                </div>
                <div className="p-3 rounded-full bg-background border border-card-border group-hover:bg-accent-blue group-hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
