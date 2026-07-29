"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Free LUTs", href: "/resources?category=LUTs" },
  { name: "Lr Presets", href: "/resources?category=Presets" },
  { name: "About US", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Dynamic Resources list states
  const [resources, setResources] = useState<any[]>([]);
  const [showLuts, setShowLuts] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.resources) {
          setResources(data.resources);
        }
      })
      .catch((err) => console.error("Error loading resources in navbar", err));
  }, []);

  // Initialize theme from system or local storage
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
                   localStorage.getItem("theme") === "dark" ||
                   (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // Sticky header transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowLuts(false);
    setShowPresets(false);
  }, [pathname]);

  const lutsList = resources.filter((r) => r.category === "LUTs");
  const presetsList = resources.filter((r) => r.category === "Presets");

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-background/75 backdrop-blur-md border-b border-card-border shadow-xxs"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-1 select-none">
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-foreground font-extrabold uppercase">
              Pencil
              <span className="font-sans font-light text-foreground/60">Hub</span>
              <span className="inline-block text-accent-blue font-bold group-hover:scale-130 transition-transform duration-300">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Link items */}
          <nav className="hidden lg:flex items-center gap-8 relative z-50">
            {/* Home link */}
            <Link
              href="/"
              className={`relative py-1.5 text-xs font-bold uppercase tracking-wider ${
                pathname === "/" ? "text-accent-blue" : "text-foreground/60 hover:text-foreground"
              } transition-colors group`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${pathname === "/" ? "scale-x-100" : ""}`} />
            </Link>

            {/* Portfolio link */}
            <Link
              href="/portfolio"
              className={`relative py-1.5 text-xs font-bold uppercase tracking-wider ${
                pathname === "/portfolio" ? "text-accent-blue" : "text-foreground/60 hover:text-foreground"
              } transition-colors group`}
            >
              Portfolio
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${pathname === "/portfolio" ? "scale-x-100" : ""}`} />
            </Link>

            {/* Free LUTs Dropdown menu */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setShowLuts(true)}
              onMouseLeave={() => setShowLuts(false)}
            >
              <button
                className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                  pathname.startsWith("/resources") && lutsList.some(l => pathname.includes(l.slug)) ? "text-accent-blue" : "text-foreground/60 hover:text-foreground"
                } transition-colors`}
              >
                <span>Free LUTs Filter</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-350 ${showLuts ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showLuts && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-3 w-64 bg-background border border-card-border rounded-2xl shadow-xl z-50 p-2 overflow-hidden"
                  >
                    <div className="flex flex-col gap-0.5">
                      {lutsList.length > 0 ? (
                        lutsList.map((lut) => (
                          <Link
                            key={lut.id}
                            href={`/resources?category=LUTs`}
                            className="px-4 py-2.5 hover:bg-foreground/5 rounded-xl text-xxs font-bold text-foreground/80 hover:text-foreground uppercase tracking-wider block transition-colors border-b border-card-border/5 last:border-0"
                          >
                            {lut.title}
                          </Link>
                        ))
                      ) : (
                        <span className="px-4 py-3 text-[10px] text-foreground/40 font-mono">Loading LUTs...</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lightroom Presets Dropdown menu */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setShowPresets(true)}
              onMouseLeave={() => setShowPresets(false)}
            >
              <button
                className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                  pathname.startsWith("/resources") && presetsList.some(p => pathname.includes(p.slug)) ? "text-accent-blue" : "text-foreground/60 hover:text-foreground"
                } transition-colors`}
              >
                <span>Lr Presets</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-350 ${showPresets ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showPresets && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-3 w-64 bg-background border border-card-border rounded-2xl shadow-xl z-50 p-2 overflow-hidden"
                  >
                    <div className="flex flex-col gap-0.5">
                      {presetsList.length > 0 ? (
                        presetsList.map((preset) => (
                          <Link
                            key={preset.id}
                            href={`/resources?category=Presets`}
                            className="px-4 py-2.5 hover:bg-foreground/5 rounded-xl text-xxs font-bold text-foreground/80 hover:text-foreground uppercase tracking-wider block transition-colors border-b border-card-border/5 last:border-0"
                          >
                            {preset.title}
                          </Link>
                        ))
                      ) : (
                        <span className="px-4 py-3 text-[10px] text-foreground/40 font-mono">Loading Presets...</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About US */}
            <Link
              href="/about"
              className={`relative py-1.5 text-xs font-bold uppercase tracking-wider ${
                pathname === "/about" ? "text-accent-blue" : "text-foreground/60 hover:text-foreground"
              } transition-colors group`}
            >
              About US
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${pathname === "/about" ? "scale-x-100" : ""}`} />
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className={`relative py-1.5 text-xs font-bold uppercase tracking-wider ${
                pathname === "/contact" ? "text-accent-blue" : "text-foreground/60 hover:text-foreground"
              } transition-colors group`}
            >
              Contact Us
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${pathname === "/contact" ? "scale-x-100" : ""}`} />
            </Link>
          </nav>

          {/* Action Utilities (Dark Mode toggle, Magnetic CTA) */}
          <div className="hidden lg:flex items-center gap-6 z-50">
            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-card-border hover:bg-foreground/5 transition-colors cursor-pointer text-foreground"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Solid Action Button */}
            <Magnetic>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-lg text-xxs font-bold uppercase tracking-widest text-background bg-foreground hover:opacity-90 transition-colors shadow-xs"
              >
                Let's talk
              </Link>
            </Magnetic>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-4 z-50">
            {/* Dark Mode Switcher for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-card-border text-foreground cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-background z-40 flex flex-col justify-between p-8 pt-28"
          >
            <div className="absolute inset-0 -z-10 bg-grid-overlay opacity-10" />
            
            <nav className="flex flex-col gap-5 mt-4">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`text-xl font-bold uppercase tracking-wider block ${
                      pathname === link.href ? "text-accent-blue" : "text-foreground/75"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Contact Link */}
            <div className="flex flex-col gap-4 border-t border-card-border pt-6">
              <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">PencilHub Agency</span>
              <Link
                href="/contact"
                className="w-full py-3 rounded-lg bg-foreground text-background text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2"
              >
                <span>Let's talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
