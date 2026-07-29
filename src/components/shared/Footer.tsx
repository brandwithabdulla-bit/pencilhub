"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Lr Presets", href: "/resources?category=Presets" },
  { name: "LUTs", href: "/resources?category=LUTs" },
  { name: "About US", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { name: "Youtube", href: "https://www.youtube.com/@pencilhub" },
  { name: "Instagram", href: "https://www.instagram.com/pencil_hub/" },
  { name: "Pinterest", href: "https://pin.it/5lTMPwe00" },
  { name: "X (Twitter)", href: "https://x.com/miqu_mk" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61557420675397" },
  { name: "WhatsApp", href: "https://wa.me/message/SUQ7DJ7DBEEJA1" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white pt-24 pb-8 overflow-hidden select-none">
      
      {/* Visual noise and grids overlays */}
      <div className="absolute inset-0 bg-grid-overlay opacity-[0.015] pointer-events-none" />
      <div className="noise-overlay opacity-[0.012] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Column 1: Let's talk email linkage (Col span 6) */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
            Let's talk
          </span>
          <a
            href="mailto:pencilhubsocial@gmail.com"
            className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white hover:text-accent-blue transition-colors duration-300 w-fit relative group pb-1"
          >
            pencilhubsocial@gmail.com
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </a>
        </div>

        {/* Column 2: Quick Links Menu (Col span 3) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
            Menu
          </span>
          <ul className="flex flex-col gap-2.5">
            {menuLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-xs text-white/50 hover:text-white transition-colors duration-250 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-accent-blue scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-250">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Profile Links (Col span 3) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
            Socials
          </span>
          <ul className="flex flex-col gap-2.5">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white/50 hover:text-white transition-colors duration-250 flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-0.5 bg-accent-purple scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-250">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Giant static editorial branding marquee/text */}
      <div className="w-full mt-24 border-t border-white/5 py-4 flex justify-center items-center overflow-hidden select-none pointer-events-none">
        <h2 className="font-display text-[13.5vw] font-black tracking-tighter leading-none text-white/[0.025] uppercase m-0 p-0 font-extrabold">
          PENCILHUB
        </h2>
      </div>

      {/* Bottom Copyright info block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center text-[9px] font-mono uppercase tracking-widest text-white/30 pt-6 border-t border-white/5 mt-4">
        <span>Copyright © 2025 | pencilhub.in</span>
      </div>

    </footer>
  );
}
