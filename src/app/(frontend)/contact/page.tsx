import React from "react";
import { getFAQs, getSettings } from "@/lib/db";

export const revalidate = 0;
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Compass, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Start a Project | Contact PencilHub Studio",
  description: "Get in touch with PencilHub creative consulting team. Submit project details, explore our FAQs, or call our Bangalore studio office.",
};

export default async function ContactPage() {
  const faqs = await getFAQs();
  const settings = await getSettings();

  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Get In Touch</span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mt-4 max-w-2xl leading-[1.05]">
            Start Your Project
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mt-6 leading-relaxed">
            Tell us about your brand ideas, tech stack requirements, and timeline. Our strategy consulting team will follow up within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Details */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        
        {/* Form Column (Col span 7) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Info Column (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          
          {/* Quick contact box */}
          <div className="p-8 rounded-3xl border border-card-border bg-neutral-gray relative overflow-hidden flex flex-col gap-6">
            <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-foreground/45 border-b border-card-border pb-2">Direct Channels</h3>
            
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-background border border-card-border text-accent-blue shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-foreground/40 block">Email us</span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-xs font-bold hover:text-accent-blue transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
              </li>
              
              <li className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-background border border-card-border text-accent-purple shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-foreground/40 block">Call us</span>
                  <a href={`tel:${settings.contactPhone}`} className="text-xs font-bold hover:text-accent-blue transition-colors">
                    {settings.contactPhone}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-background border border-card-border text-neon-green shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-foreground/40 block">Studio Office</span>
                  <span className="text-xs font-bold text-foreground">
                    {settings.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Styled Gray Map Placeholder */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-card-border bg-neutral-gray flex items-center justify-center p-6 shadow-sm group">
            <div className="absolute inset-0 bg-grid-overlay opacity-10" />
            <div className="relative z-10 flex flex-col items-center gap-2 text-center select-none pointer-events-none">
              <Compass className="w-8 h-8 text-accent-blue animate-spin-slow" />
              <span className="text-xs font-bold text-foreground tracking-wide mt-2">Bangalore Studio Map</span>
              <span className="text-xxs font-mono text-foreground/40 uppercase">Premium Design District, IN</span>
            </div>
            {/* Gray map-like overlay graphics */}
            <div className="absolute bottom-4 left-4 w-12 h-0.5 bg-foreground/10" />
            <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-accent-blue/20" />
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-neutral-gray py-24 border-t border-card-border">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center max-w-md mx-auto mb-16 flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Q&A</span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground uppercase">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-accent-blue rounded-full" />
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group p-6 rounded-2xl border border-card-border bg-background shadow-sm open:shadow-md transition-all [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <div className="flex items-center gap-3 text-sm font-bold text-foreground group-open:text-accent-blue transition-colors">
                    <HelpCircle className="w-4.5 h-4.5 text-accent-blue shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <span className="ml-1.5 transition-transform duration-300 group-open:rotate-180 text-foreground/50">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-card-border text-xs text-foreground/60 leading-relaxed font-sans">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
