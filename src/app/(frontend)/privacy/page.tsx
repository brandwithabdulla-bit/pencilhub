import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Privacy Policy | PencilHub Studio",
  description: "Read how PencilHub handles data privacy, cookies, data storage, and newsletter subscriber information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 pt-10 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/60 hover:text-accent-blue transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">Legal Guidelines</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 leading-none">
            Privacy Policy
          </h1>
          <p className="text-xs text-foreground/45 font-mono mt-3">Last updated: July 29, 2026</p>
        </div>
      </section>

      {/* Main Text Content */}
      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-zinc dark:prose-invert">
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          At PencilHub, accessible from pencilhub.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PencilHub and how we use it.
        </p>

        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, company name, project details, budget options, and the contents of the message you send.
        </p>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          When you subscribe to our newsletter, we only collect your email address. This is stored securely in our local databases and is used exclusively for creative briefings and studio updates.
        </p>

        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          We use the information we collect in various ways, including to:
        </p>
        <ul className="flex flex-col gap-2.5 my-4 pl-5 list-disc text-foreground/75 text-sm sm:text-base leading-relaxed">
          <li>Provide, operate, and maintain our website pages.</li>
          <li>Improve, personalize, and expand our website visuals.</li>
          <li>Understand and analyze how you interact with our links.</li>
          <li>Develop new visual services, products, and features.</li>
          <li>Communicate with you regarding project inquiries, scoping briefs, and updates.</li>
          <li>Send newsletter articles and promotional briefs (only with explicit subscription).</li>
        </ul>

        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mt-8 mb-4">3. Cookies and Trackers</h2>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          Like any other design agency website, PencilHub uses standard cookies to store visitor preferences and record which pages are viewed. This information is used to optimize user experience by customizing our webpage layouts.
        </p>

        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mt-8 mb-4">4. Data Security</h2>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          The security of your data is extremely important to us. Inquiry details and newsletter emails are handled on server-side modules and stored securely. However, no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mt-8 mb-4">5. Contact Us</h2>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:pencilhubsocial@gmail.com" className="text-accent-blue font-bold hover:underline">pencilhubsocial@gmail.com</a>.
        </p>
      </article>

    </div>
  );
}
