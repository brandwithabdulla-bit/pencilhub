"use client";

import React, { useState, useTransition } from "react";
import { submitInquiry } from "@/app/actions";
import { Send, Check, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import Magnetic from "@/components/ui/Magnetic";

const servicesList = [
  "Branding",
  "Website Design",
  "Website Development",
  "Motion Graphics",
  "Video Production",
  "Graphic Design",
  "Social Media Design",
  "Creative Consulting"
];

const budgetTiers = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+"
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState(budgetTiers[0]);
  const [message, setMessage] = useState("");

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (srv: string) => {
    setSelectedServices(prev =>
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (selectedServices.length === 0) {
      setError("Please select at least one service you need.");
      return;
    }

    startTransition(async () => {
      const res = await submitInquiry({
        name,
        email,
        company,
        services: selectedServices,
        budget: selectedBudget,
        message
      });

      if (res.success) {
        setSuccess(true);
        
        // Celebratory confetti burst!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Reset
        setName("");
        setEmail("");
        setCompany("");
        setSelectedServices([]);
        setSelectedBudget(budgetTiers[0]);
        setMessage("");
      } else {
        setError(res.error || "Inquiry submission failed.");
      }
    });
  };

  return (
    <div className="p-8 md:p-12 rounded-3xl border border-card-border bg-neutral-gray relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
      
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Thank you! Your inquiry was successfully submitted. We will contact you within 24 hours.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 font-mono">Your Name *</label>
            <input
              type="text"
              required
              disabled={isPending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Arjun Verma"
              className="w-full px-5 py-3 rounded-xl bg-background border border-card-border focus:outline-none focus:border-accent-blue text-xs text-foreground disabled:opacity-60 transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 font-mono">Your Email *</label>
            <input
              type="email"
              required
              disabled={isPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="arjun@zenith.com"
              className="w-full px-5 py-3 rounded-xl bg-background border border-card-border focus:outline-none focus:border-accent-blue text-xs text-foreground disabled:opacity-60 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 font-mono">Company Name (Optional)</label>
          <input
            type="text"
            disabled={isPending}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Zenith Tech Inc."
            className="w-full px-5 py-3 rounded-xl bg-background border border-card-border focus:outline-none focus:border-accent-blue text-xs text-foreground disabled:opacity-60 transition-all"
          />
        </div>

        {/* Services Multi Select */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 font-mono">What services do you need? *</label>
          <div className="flex flex-wrap gap-2">
            {servicesList.map((srv) => {
              const isSelected = selectedServices.includes(srv);
              return (
                <button
                  key={srv}
                  type="button"
                  disabled={isPending}
                  onClick={() => toggleService(srv)}
                  className={`px-4 py-2 rounded-full text-xxs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? "bg-accent-blue text-white shadow-sm scale-105"
                      : "bg-background text-foreground/60 border border-card-border hover:bg-foreground/5"
                  }`}
                >
                  {srv}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Radio Tiers */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 font-mono">Project Budget (USD) *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {budgetTiers.map((tier) => {
              const isSelected = selectedBudget === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  disabled={isPending}
                  onClick={() => setSelectedBudget(tier)}
                  className={`px-3 py-3.5 rounded-xl text-xxs font-bold uppercase tracking-wider transition-all text-center cursor-pointer ${
                    isSelected
                      ? "bg-foreground text-background scale-102"
                      : "bg-background text-foreground/60 border border-card-border hover:bg-foreground/5"
                  }`}
                >
                  {tier}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 font-mono">Brief Description *</label>
          <textarea
            required
            rows={5}
            disabled={isPending}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your brand goals, scope requirements, and timeline expectations..."
            className="w-full px-5 py-4 rounded-xl bg-background border border-card-border focus:outline-none focus:border-accent-blue text-xs text-foreground disabled:opacity-60 resize-none transition-all"
          />
        </div>

        {/* Submit */}
        <div className="mt-4">
          <Magnetic>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-background bg-foreground hover:scale-105 active:scale-95 transition-all duration-300 shadow-md flex items-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              <span>{isPending ? "Sending..." : "Submit Inquiry"}</span>
              <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>

      </form>
    </div>
  );
}
