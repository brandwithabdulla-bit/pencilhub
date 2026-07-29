import React from "react";
import { getResources } from "@/lib/db";
import { Download } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Free Creator Resources | LUT Filters & Lightroom Presets | PencilHub",
  description: "Download free professional LUTs for Premiere Pro and Lightroom presets to speed up your creative workflow.",
};

export const revalidate = 0; // Fresh database query

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || "All";
  const resources = await getResources();

  const filteredResources = resources.filter(
    (res) => activeCategory === "All" || res.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background text-foreground py-16 transition-colors duration-500">
      
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header segment */}
        <div className="flex flex-col gap-4 border-b border-card-border pb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-blue font-bold">
            Creator Assets
          </span>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
                Free Design Assets.
              </h1>
              <p className="text-sm text-foreground/50 max-w-xl mt-3 leading-relaxed">
                Empowering creators to grade videos, correct skin tones, and build visuals in seconds. Download our custom cinematic Premiere Pro LUTs and Lightroom Presets.
              </p>
            </div>

            {/* Category selection */}
            <div className="flex bg-neutral-gray p-1 rounded-xl border border-card-border">
              {[
                { name: "All Assets", val: "All", href: "/resources" },
                { name: "LUTs Filters", val: "LUTs", href: "/resources?category=LUTs" },
                { name: "Lr Presets", val: "Presets", href: "/resources?category=Presets" },
              ].map((item) => (
                <Link
                  key={item.val}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-xxs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === item.val
                      ? "bg-foreground text-background shadow-sm"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-12">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="group flex flex-col justify-between rounded-2xl border border-card-border bg-neutral-gray/50 p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-gray border border-card-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={res.image}
                        alt={res.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      
                      {/* Category badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full bg-background border border-card-border text-foreground shadow-sm">
                        {res.category}
                      </span>
                    </div>

                    {/* Metadata Content */}
                    <h3 className="font-display text-lg font-bold text-foreground mt-4 group-hover:text-accent-blue transition-colors">
                      {res.title}
                    </h3>
                    
                    <p className="text-xxs text-foreground/50 leading-relaxed mt-2 font-sans">
                      {res.description}
                    </p>
                  </div>

                  {/* Actions segment */}
                  <div className="mt-6 pt-4 border-t border-card-border flex items-center justify-between">
                    <span className="text-[10px] font-mono text-foreground/40 uppercase">
                      Free Download
                    </span>
                    
                    <a
                      href={res.downloadUrl}
                      download
                      className="px-4 py-2 rounded-xl bg-foreground text-background hover:opacity-90 text-xxs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-card-border rounded-2xl bg-neutral-gray/50">
              <Download className="w-10 h-10 text-foreground/25 mx-auto mb-4" />
              <h3 className="font-display text-sm font-bold">No assets found</h3>
              <p className="text-xxs text-foreground/40 mt-1">Select another asset category in the filter list above.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
