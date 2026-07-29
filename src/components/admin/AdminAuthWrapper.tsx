"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Image, 
  Download, 
  Bell, 
  Mail, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  ArrowLeft, 
  LogOut, 
  Key, 
  User 
} from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects / Work", href: "/admin/projects", icon: Briefcase },
  { name: "Blogs / Insights", href: "/admin/blogs", icon: FileText },
  { name: "Media Library", href: "/admin/media", icon: Image },
  { name: "Free Downloads", href: "/admin/resources", icon: Download },
  { name: "Inquiries", href: "/admin/inquiries", icon: Bell },
  { name: "Newsletter Subscribers", href: "/admin/newsletter", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Login form state
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check local session storage on mount
    const session = sessionStorage.getItem("admin_session");
    if (session === "pencil_active") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Restricting access to pencilhubsocial@gmail.com and password pencil@123
    if (emailInput.trim().toLowerCase() === "pencilhubsocial@gmail.com" && passwordInput === "pencil@123") {
      sessionStorage.setItem("admin_session", "pencil_active");
      setIsAuthenticated(true);
    } else {
      setErrorMsg("Incorrect Mail ID or Password. Please try again.");
    }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    window.location.reload();
  };

  // Rendering Loader while checking session storage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs">
        <span>Authenticating workspace...</span>
      </div>
    );
  }

  // If not authenticated, render premium login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6 relative overflow-hidden select-none">
        
        {/* Decorative Grid and mesh glows */}
        <div className="absolute inset-0 bg-grid-overlay opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="w-full max-w-sm flex flex-col gap-8 relative z-10">
          
          {/* Logo Title */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="font-display text-2xl font-black uppercase tracking-tight text-white font-extrabold">
              Pencil
              <span className="font-sans font-light text-white/50">Hub</span>
              <span className="inline-block text-accent-blue font-bold">.</span>
            </span>
            <span className="text-[10px] font-mono text-white/35 uppercase tracking-widest mt-1">CMS ADMIN SIGN IN</span>
          </div>

          {/* Form container */}
          <form 
            onSubmit={handleLoginSubmit}
            className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md flex flex-col gap-5 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-grid-overlay opacity-5 rounded-3xl pointer-events-none" />

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xxs font-mono leading-relaxed">
                {errorMsg}
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase font-bold tracking-widest text-white/40 font-mono">Mail ID</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="pencilhubsocial@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-accent-blue text-xs placeholder-white/30"
                />
                <User className="w-4 h-4 text-white/20 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase font-bold tracking-widest text-white/40 font-mono">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-accent-blue text-xs placeholder-white/30"
                />
                <Key className="w-4 h-4 text-white/20 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black hover:bg-neutral-100 transition-colors rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Panel</span>
            </button>

          </form>

          {/* Go back */}
          <Link
            href="/"
            className="text-xxs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1.5 justify-center self-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back to Website
          </Link>

        </div>
      </div>
    );
  }

  // If authenticated, render standard CMS layout
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Sidebar Grid (Width: w-64) */}
      <aside className="w-64 border-r border-white/5 bg-[#111] flex flex-col justify-between p-6 shrink-0 h-screen sticky top-0">
        
        {/* Top Segment */}
        <div className="flex flex-col gap-8">
          
          {/* Admin title */}
          <div className="flex items-center gap-2 pb-6 border-b border-white/5">
            <div className="p-1.5 rounded-lg bg-accent-blue text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold uppercase tracking-widest font-display text-white">PencilHub</h1>
              <span className="text-[10px] font-mono text-white/40 uppercase">CMS Admin Panel</span>
            </div>
          </div>

          {/* Navigation Links list */}
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => {
              const IconComp = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive 
                      ? "text-accent-blue bg-white/[0.02] border-l-2 border-accent-blue rounded-l-none" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconComp className={`w-4.5 h-4.5 ${isActive ? "text-accent-blue" : "text-white/45"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Site</span>
          </Link>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-all w-full text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#0E0E0E]">
        
        {/* Workspace content */}
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>

      </main>
    </div>
  );
}
