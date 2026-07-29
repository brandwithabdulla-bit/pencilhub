import React from "react";
import Link from "next/link";
import { getServices } from "@/lib/db";

export const revalidate = 0;
import * as Icons from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export const metadata = {
  title: "Our Services | PencilHub Creative Agency",
  description: "Explore our premium creative offerings: Brand Identity, Website Design, Next.js Development, Motion Graphics, Video Production, and Creative Strategy.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">What We Do</span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mt-4 max-w-2xl leading-[1.05]">
            Creative Offerings
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mt-6 leading-relaxed">
            We provide custom end-to-end design, branding, and development solutions built to solve real-world startup growth challenges.
          </p>
        </div>
      </section>

      {/* Services List Blocks */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col gap-24">
        {services.map((service, idx) => {
          // Dynamic Lucide icon resolver
          const IconComponent = (Icons as any)[service.icon] || Icons.Sparkles;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6 border-b border-card-border last:border-0 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              
              {/* Visual branding block (col-span-5) */}
              <div className={`lg:col-span-5 p-8 rounded-3xl bg-neutral-gray border border-card-border shadow-sm flex flex-col justify-between min-h-[300px] relative overflow-hidden ${
                isEven ? "lg:order-1" : "lg:order-2"
              }`}>
                <div className="absolute inset-0 bg-grid-overlay opacity-10 pointer-events-none" />
                <div className="p-4 rounded-2xl bg-accent-blue/5 text-accent-blue w-fit">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="mt-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/35 font-mono">Service {idx + 1}</span>
                  <h3 className="font-display text-3xl font-extrabold text-foreground mt-2 leading-none">{service.title}</h3>
                </div>
              </div>

              {/* Descriptions & Bullets (col-span-7) */}
              <div className={`lg:col-span-7 flex flex-col gap-6 ${
                isEven ? "lg:order-2" : "lg:order-1"
              }`}>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
                  {/* Deliverables column */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-foreground/45 border-b border-card-border pb-2">Key Deliverables</h4>
                    <ul className="flex flex-col gap-2.5 mt-4">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-foreground/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits column */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-foreground/45 border-b border-card-border pb-2">Strategic Benefits</h4>
                    <ul className="flex flex-col gap-2.5 mt-4">
                      {service.benefits.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-foreground/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </section>

      {/* Services Footer Call to Action */}
      <section className="bg-neutral-gray py-20 border-y border-card-border text-center">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground uppercase">Need a Customized Brief?</h2>
          <p className="text-xs text-foreground/50 leading-relaxed max-w-sm">
            We understand every startup has unique scopes. Contact our consulting team to schedule a custom strategy blueprint audit.
          </p>
          <div className="mt-4">
            <Magnetic>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-background bg-foreground hover:scale-105 active:scale-95 transition-all duration-300 shadow-md inline-block"
              >
                Schedule Consultation
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

    </div>
  );
}
