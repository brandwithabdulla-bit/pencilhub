"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Project } from "@/types";
import { saveProjectAction, deleteProjectAction } from "@/app/admin/actions";
import { Plus, Search, Edit2, Trash2, Code2, Sparkles, Film, Video, Check, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Editing states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Web Development");
  const [formClient, setFormClient] = useState("");
  const [formYear, setFormYear] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formChallenge, setFormChallenge] = useState("");
  const [formSolution, setFormSolution] = useState("");
  const [formProcess, setFormProcess] = useState("");
  const [formResults, setFormResults] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formGallery, setFormGallery] = useState("");
  const [formFeatured, setFormFeatured] = useState(true);

  const [role, setRole] = useState<"admin" | "editor">("admin");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("cms_role") as "admin" | "editor";
    if (savedRole) setRole(savedRole);
  }, []);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  // Auto-slug generator
  useEffect(() => {
    if (!formId && formTitle) {
      const slug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setFormSlug(slug);
    }
  }, [formTitle, formId]);

  const openAddForm = () => {
    setFormId("");
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Web Development");
    setFormClient("");
    setFormYear(new Date().getFullYear().toString());
    setFormImage("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80");
    setFormChallenge("");
    setFormSolution("");
    setFormProcess("");
    setFormResults("");
    setFormTags("Next.js, React, Tailwind CSS");
    setFormGallery("");
    setFormFeatured(true);

    setError("");
    setSuccess(false);
    setIsFormOpen(true);
    setEditingProject(null);
  };

  const openEditForm = (proj: Project) => {
    setFormId(proj.id);
    setFormTitle(proj.title);
    setFormSlug(proj.slug);
    setFormCategory(proj.category);
    setFormClient(proj.client);
    setFormYear(proj.year);
    setFormImage(proj.image);
    setFormChallenge(proj.challenge);
    setFormSolution(proj.solution);
    setFormProcess(proj.process);
    setFormResults(proj.results);
    setFormTags(proj.tags.join(", "));
    setFormGallery(proj.gallery ? proj.gallery.join(", ") : "");
    setFormFeatured(proj.featured);

    setError("");
    setSuccess(false);
    setIsFormOpen(true);
    setEditingProject(proj);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (role === "editor") {
      setError("Permission Denied: Editor role cannot update database portfolio items.");
      return;
    }

    const payload: Project = {
      id: formId || `proj-${Date.now()}`,
      title: formTitle,
      slug: formSlug,
      category: formCategory,
      client: formClient,
      year: formYear,
      image: formImage,
      challenge: formChallenge,
      solution: formSolution,
      process: formProcess,
      results: formResults,
      tags: formTags.split(",").map(t => t.trim()).filter(Boolean),
      gallery: formGallery.split(",").map(g => g.trim()).filter(Boolean),
      featured: formFeatured
    };

    startTransition(async () => {
      const res = await saveProjectAction(payload);
      if (res.success) {
        setSuccess(true);
        setIsFormOpen(false);
        router.refresh();
      } else {
        setError(res.error || "Failed to save project.");
      }
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (role === "editor") {
      alert("Permission Denied: Editor role cannot delete portfolio projects.");
      return;
    }

    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteProjectAction(id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Failed to delete project.");
      }
    });
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* Toolbar */}
      {!isFormOpen && (
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-accent-blue text-white"
              />
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
            </div>

            {/* Filter category */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-[#111] border border-white/10 rounded-xl text-xs text-white/70 focus:outline-none focus:border-accent-blue cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Branding">Branding</option>
              <option value="Web Design">Web Design</option>
              <option value="Web Development">Web Development</option>
              <option value="Motion Graphics">Motion Graphics</option>
              <option value="Video Editing">Video Editing</option>
            </select>
          </div>

          <button
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-white/95 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all self-end sm:self-auto shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      )}

      {/* Editor Warning Role */}
      {role === "editor" && (
        <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xxs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Editor Mode active: database edits and delete operations are restricted.</span>
        </div>
      )}

      {/* Projects list */}
      {!isFormOpen ? (
        <div className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />

          {filteredProjects.length > 0 ? (
            <div className="overflow-hidden border border-white/5 rounded-xl bg-white/[0.01]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 uppercase tracking-wider font-mono text-white/45 bg-white/[0.01]">
                    <th className="p-4">Project Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-8 object-cover rounded-md border border-white/5 bg-white/2"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-white leading-snug">{p.title}</h4>
                            <span className="text-[10px] text-white/40 block mt-0.5">{p.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white/60 font-medium">{p.category}</td>
                      <td className="p-4 text-white/60">{p.client}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full ${
                          p.featured
                            ? "bg-accent-blue/10 text-accent-blue"
                            : "bg-white/10 text-white/40"
                        }`}>
                          {p.featured ? "Featured" : "Standard"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-3 justify-end items-center">
                          <button
                            onClick={() => openEditForm(p)}
                            className="text-accent-blue hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            disabled={role === "editor"}
                            className="text-red-500 hover:text-red-400 disabled:opacity-50 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-white/40 bg-white/[0.01] border border-white/5 rounded-xl">
              <Plus className="w-8 h-8 text-white/20 mx-auto mb-3" />
              No projects found. Add a new project above.
            </div>
          )}
        </div>
      ) : (
        /* Project Form */
        <form onSubmit={handleSave} className="flex flex-col gap-6 bg-[#111] p-8 rounded-3xl border border-white/5 relative">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
            {formId ? "Edit Project Details" : "Create Project Case Study"}
          </h3>

          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Project Title *</label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Zenith SaaS Redesign"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Slug (Auto Generated) *</label>
              <input
                type="text"
                required
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                placeholder="zenith-saas-redesign"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Category *</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white cursor-pointer"
              >
                <option value="Web Development">Web Development</option>
                <option value="Branding">Branding</option>
                <option value="Web Design">Web Design</option>
                <option value="Motion Graphics">Motion Graphics</option>
                <option value="Video Editing">Video Editing</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Client Name *</label>
              <input
                type="text"
                required
                value={formClient}
                onChange={(e) => setFormClient(e.target.value)}
                placeholder="Zenith Tech Inc."
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Launch Year *</label>
              <input
                type="text"
                required
                value={formYear}
                onChange={(e) => setFormYear(e.target.value)}
                placeholder="2026"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Featured project? *</label>
              <select
                value={formFeatured ? "yes" : "no"}
                onChange={(e) => setFormFeatured(e.target.value === "yes")}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white cursor-pointer"
              >
                <option value="yes">Yes, show on home page</option>
                <option value="no">No, standard listing</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Hero Image URL *</label>
            <input
              type="text"
              required
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              placeholder="/uploads/project-main.png"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Tech Stack / Tags (Comma Separated) *</label>
            <input
              type="text"
              required
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              placeholder="Next.js, React, GSAP, Tailwind CSS"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Gallery Image URLs (Comma Separated)</label>
            <input
              type="text"
              value={formGallery}
              onChange={(e) => setFormGallery(e.target.value)}
              placeholder="/uploads/gallery-1.png, /uploads/gallery-2.png"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">The Challenge *</label>
              <textarea
                required
                rows={4}
                value={formChallenge}
                onChange={(e) => setFormChallenge(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Our Solution *</label>
              <textarea
                required
                rows={4}
                value={formSolution}
                onChange={(e) => setFormSolution(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Creative Process *</label>
              <textarea
                required
                rows={4}
                value={formProcess}
                onChange={(e) => setFormProcess(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Measurable Results *</label>
              <textarea
                required
                rows={4}
                value={formResults}
                onChange={(e) => setFormResults(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
              />
            </div>
          </div>

          {/* Form Actions buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isPending || role === "editor"}
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/95 disabled:opacity-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>Save Project</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white cursor-pointer transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
