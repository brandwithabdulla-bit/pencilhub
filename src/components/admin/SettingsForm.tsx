"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Settings } from "@/types";
import { saveSettingsAction } from "@/app/admin/actions";
import { Settings as SettingsIcon, Save, Check, Shield, ShieldAlert, Key } from "lucide-react";

interface SettingsFormProps {
  initialSettings: Settings;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [siteName, setSiteName] = useState(initialSettings.siteName);
  const [tagline, setTagline] = useState(initialSettings.tagline);
  const [contactEmail, setContactEmail] = useState(initialSettings.contactEmail);
  const [contactPhone, setContactPhone] = useState(initialSettings.contactPhone);
  const [address, setAddress] = useState(initialSettings.address);
  
  // Social links states
  const [instagram, setInstagram] = useState(initialSettings.socialLinks.instagram);
  const [twitter, setTwitter] = useState(initialSettings.socialLinks.twitter);
  const [linkedin, setLinkedin] = useState(initialSettings.socialLinks.linkedin);
  const [behance, setBehance] = useState(initialSettings.socialLinks.behance);
  const [dribbble, setDribbble] = useState(initialSettings.socialLinks.dribbble);
  const [youtube, setYoutube] = useState(initialSettings.socialLinks.youtube);

  // SEO keywords
  const [keywordsText, setKeywordsText] = useState(initialSettings.seoKeywords.join(", "));

  // Role emulation state
  const [role, setRole] = useState<"admin" | "editor">("admin");

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Load role on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("cms_role") as "admin" | "editor";
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleRoleChange = (newRole: "admin" | "editor") => {
    setRole(newRole);
    localStorage.setItem("cms_role", newRole);
    // Alert user
    alert(`Emulated role switched to ${newRole.toUpperCase()}. ${
      newRole === "editor"
        ? "Delete actions and database edits are now restricted."
        : "Full administrative CRUD actions enabled."
    }`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (role === "editor") {
      setError("Permission Denied: Editor role cannot save global system settings.");
      return;
    }

    const updatedSettings: Settings = {
      siteName,
      tagline,
      contactEmail,
      contactPhone,
      address,
      socialLinks: {
        instagram,
        twitter,
        linkedin,
        behance,
        dribbble,
        youtube
      },
      seoKeywords: keywordsText.split(",").map(k => k.trim()).filter(Boolean),
      logoUrl: initialSettings.logoUrl
    };

    startTransition(async () => {
      const res = await saveSettingsAction(updatedSettings);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "Failed to save settings.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Role Emulation Toolbar */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent-purple/10 text-accent-purple">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">CMS User Role Emulation</h4>
            <p className="text-xxs text-white/40 mt-1">
              Toggle roles to test permission boundaries. Editors cannot save settings or execute deletes.
            </p>
          </div>
        </div>

        <div className="flex bg-black p-1.5 rounded-xl border border-white/5 self-start sm:self-center">
          <button
            type="button"
            onClick={() => handleRoleChange("admin")}
            className={`px-4 py-2 rounded-lg text-xxs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              role === "admin"
                ? "bg-accent-blue text-white shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Admin Role
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("editor")}
            className={`px-4 py-2 rounded-lg text-xxs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              role === "editor"
                ? "bg-accent-purple text-white shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Editor Role
          </button>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Global site settings saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: General Profile (Col span 7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col gap-6">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          <h3 className="text-xs uppercase tracking-widest font-extrabold text-white/40 border-b border-white/5 pb-2">Studio Identity</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Agency Name</label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Brand Tagline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Contact Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Contact Phone</label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">SEO Keywords (Comma Separated)</label>
            <textarea
              rows={3}
              value={keywordsText}
              onChange={(e) => setKeywordsText(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
            />
          </div>

          <div className="pt-4 mt-2">
            <button
              type="submit"
              disabled={isPending || role === "editor"}
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/95 disabled:opacity-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>

        </div>

        {/* Right Side: Social links (Col span 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col gap-6">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          <h3 className="text-xs uppercase tracking-widest font-extrabold text-white/40 border-b border-white/5 pb-2">Social Channels</h3>

          {[
            { label: "Instagram", val: instagram, set: setInstagram },
            { label: "Twitter / X", val: twitter, set: setTwitter },
            { label: "LinkedIn", val: linkedin, set: setLinkedin },
            { label: "Behance", val: behance, set: setBehance },
            { label: "Dribbble", val: dribbble, set: setDribbble },
            { label: "YouTube", val: youtube, set: setYoutube }
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">{item.label}</label>
              <input
                type="url"
                value={item.val}
                onChange={(e) => item.set(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
          ))}

        </div>

      </form>
    </div>
  );
}
