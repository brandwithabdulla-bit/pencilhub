"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Resource } from "@/types";
import { saveResourceAction, deleteResourceAction } from "@/app/admin/actions";
import { Plus, Search, Edit2, Trash2, Download, Check, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResourcesManagerProps {
  initialResources: Resource[];
}

export default function ResourcesManager({ initialResources }: ResourcesManagerProps) {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Editing state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Form states
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState<"LUTs" | "Presets">("LUTs");
  const [formDownloadUrl, setFormDownloadUrl] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [role, setRole] = useState<"admin" | "editor">("admin");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("cms_role") as "admin" | "editor";
    if (savedRole) setRole(savedRole);
  }, []);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

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
    setFormCategory("LUTs");
    setFormDownloadUrl("/uploads/cinematic_grade.zip");
    setFormImage("https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80");
    setFormDescription("");

    setError("");
    setSuccess(false);
    setIsFormOpen(true);
    setEditingResource(null);
  };

  const openEditForm = (res: Resource) => {
    setFormId(res.id);
    setFormTitle(res.title);
    setFormSlug(res.slug);
    setFormCategory(res.category);
    setFormDownloadUrl(res.downloadUrl);
    setFormImage(res.image);
    setFormDescription(res.description);

    setError("");
    setSuccess(false);
    setIsFormOpen(true);
    setEditingResource(res);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (role === "editor") {
      setError("Permission Denied: Editor role cannot save downloadable resource assets.");
      return;
    }

    const payload: Resource = {
      id: formId || `res-${Date.now()}`,
      title: formTitle,
      slug: formSlug,
      category: formCategory,
      downloadUrl: formDownloadUrl,
      image: formImage,
      description: formDescription
    };

    startTransition(async () => {
      const res = await saveResourceAction(payload);
      if (res.success) {
        setSuccess(true);
        setIsFormOpen(false);
        router.refresh();
      } else {
        setError(res.error || "Failed to save resource.");
      }
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (role === "editor") {
      alert("Permission Denied: Editor role cannot delete resource assets.");
      return;
    }

    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteResourceAction(id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Failed to delete resource.");
      }
    });
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "All" || res.category === filterCategory;
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-accent-blue text-white"
              />
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
            </div>

            {/* Filter Category */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-[#111] border border-white/10 rounded-xl text-xs text-white/70 focus:outline-none focus:border-accent-blue cursor-pointer"
            >
              <option value="All">All Assets</option>
              <option value="LUTs">LUTs Filters</option>
              <option value="Presets">Lr Presets</option>
            </select>
          </div>

          <button
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-white/95 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all self-end sm:self-auto shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Asset
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

      {/* Grid List */}
      {!isFormOpen ? (
        <div className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />

          {filteredResources.length > 0 ? (
            <div className="overflow-hidden border border-white/5 rounded-xl bg-white/[0.01]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 uppercase tracking-wider font-mono text-white/45 bg-white/[0.01]">
                    <th className="p-4">Asset Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Download link</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((res) => (
                    <tr key={res.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={res.image}
                            alt={res.title}
                            className="w-12 h-8 object-cover rounded-md border border-white/5 bg-white/2"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-white leading-snug">{res.title}</h4>
                            <p className="text-[10px] text-white/45 line-clamp-1 mt-0.5 max-w-sm">{res.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full ${
                          res.category === "LUTs"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-purple-500/10 text-purple-400"
                        }`}>
                          {res.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-white/50 text-[10px]">{res.downloadUrl}</td>
                      <td className="p-4 text-right">
                        <div className="flex gap-3 justify-end items-center">
                          <button
                            onClick={() => openEditForm(res)}
                            className="text-accent-blue hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(res.id, res.title)}
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
              <Download className="w-8 h-8 text-white/20 mx-auto mb-3" />
              No downloadable presets or LUT assets found.
            </div>
          )}
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSave} className="flex flex-col gap-6 bg-[#111] p-8 rounded-3xl border border-white/5 relative">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />

          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
            {formId ? "Edit Asset Resource" : "Create Downloadable Asset"}
          </h3>

          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Asset Title *</label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="5 Cinematic LUT Filters"
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
                placeholder="5-cinematic-lut-filters"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Category *</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as "LUTs" | "Presets")}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white cursor-pointer"
              >
                <option value="LUTs">LUTs Filters</option>
                <option value="Presets">Lr Presets</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Asset Download Link / Path *</label>
              <input
                type="text"
                required
                value={formDownloadUrl}
                onChange={(e) => setFormDownloadUrl(e.target.value)}
                placeholder="/uploads/cinematic_grade.zip"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Thumbnail Image URL *</label>
            <input
              type="text"
              required
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              placeholder="https://images.unsplash.com/... or media library url"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Description *</label>
            <textarea
              required
              rows={4}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Provide details about what LUTs or presets are included, what software they are for, etc..."
              className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
            />
          </div>

          {/* Form Actions buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isPending || role === "editor"}
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/95 disabled:opacity-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>Save Asset</span>
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
