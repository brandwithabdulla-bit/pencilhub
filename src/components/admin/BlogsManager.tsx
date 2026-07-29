"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Blog } from "@/types";
import { saveBlogAction, deleteBlogAction } from "@/app/admin/actions";
import { Plus, Search, Edit2, Trash2, Eye, FileText, Check, AlertCircle, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogsManagerProps {
  initialBlogs: Blog[];
}

export default function BlogsManager({ initialBlogs }: BlogsManagerProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  
  // Editing state
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Web Design");
  const [formImage, setFormImage] = useState("");
  const [formReadTime, setFormReadTime] = useState("4 min read");
  const [formSummary, setFormSummary] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formPublished, setFormPublished] = useState(true);
  const [formSeoTitle, setFormSeoTitle] = useState("");
  const [formSeoDescription, setFormSeoDescription] = useState("");

  const [role, setRole] = useState<"admin" | "editor">("admin");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("cms_role") as "admin" | "editor";
    if (savedRole) setRole(savedRole);
  }, []);

  // Update blogs list when props update
  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs]);

  // Automatic Slug generation based on Title
  useEffect(() => {
    if (!formId && formTitle) { // Only auto-generate for new posts
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
    setFormCategory("Web Design");
    setFormImage("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80");
    setFormReadTime("4 min read");
    setFormSummary("");
    setFormContent("");
    setFormPublished(true);
    setFormSeoTitle("");
    setFormSeoDescription("");
    
    setError("");
    setSuccess(false);
    setIsFormOpen(true);
    setEditingBlog(null);
  };

  const openEditForm = (blog: Blog) => {
    setFormId(blog.id);
    setFormTitle(blog.title);
    setFormSlug(blog.slug);
    setFormCategory(blog.category);
    setFormImage(blog.image);
    setFormReadTime(blog.readTime);
    setFormSummary(blog.summary);
    setFormContent(blog.content);
    setFormPublished(blog.published);
    setFormSeoTitle(blog.seoTitle || "");
    setFormSeoDescription(blog.seoDescription || "");

    setError("");
    setSuccess(false);
    setIsFormOpen(true);
    setEditingBlog(blog);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (role === "editor") {
      setError("Permission Denied: Editor role cannot update blog database records.");
      return;
    }

    const payload: Blog = {
      id: formId || `blog-${Date.now()}`,
      title: formTitle,
      slug: formSlug,
      summary: formSummary,
      content: formContent,
      category: formCategory,
      image: formImage,
      readTime: formReadTime,
      published: formPublished,
      date: editingBlog ? editingBlog.date : new Date().toISOString(),
      author: editingBlog
        ? editingBlog.author
        : {
            name: "PencilHub Team",
            role: "Studio Admin",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          },
      seoTitle: formSeoTitle || `${formTitle} | PencilHub Journal`,
      seoDescription: formSeoDescription || formSummary
    };

    startTransition(async () => {
      const res = await saveBlogAction(payload);
      if (res.success) {
        setSuccess(true);
        setIsFormOpen(false);
        router.refresh();
      } else {
        setError(res.error || "Failed to save blog post.");
      }
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (role === "editor") {
      alert("Permission Denied: Editor role cannot delete blog posts.");
      return;
    }

    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteBlogAction(id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Failed to delete blog post.");
      }
    });
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "All" || blog.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* Search Toolbar + Add button */}
      {!isFormOpen && (
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-accent-blue text-white"
              />
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
            </div>

            {/* Category filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-[#111] border border-white/10 rounded-xl text-xs text-white/70 focus:outline-none focus:border-accent-blue cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Web Design">Web Design</option>
              <option value="Branding">Branding</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <button
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-white/95 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all self-end sm:self-auto shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Article
          </button>
        </div>
      )}

      {/* Editor Warn Role */}
      {role === "editor" && (
        <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xxs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Editor Mode active: database edits and delete operations are restricted.</span>
        </div>
      )}

      {/* Lists of Blogs */}
      {!isFormOpen ? (
        <div className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          
          {filteredBlogs.length > 0 ? (
            <div className="overflow-hidden border border-white/5 rounded-xl bg-white/[0.01]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 uppercase tracking-wider font-mono text-white/45 bg-white/[0.01]">
                    <th className="p-4">Post Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-12 h-8 object-cover rounded-md border border-white/5 bg-white/2"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-white leading-snug">{blog.title}</h4>
                            <span className="text-[10px] text-white/40 block mt-0.5">{blog.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white/60 font-medium">{blog.category}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full ${
                          blog.published
                            ? "bg-green-500/10 text-green-400"
                            : "bg-white/10 text-white/40"
                        }`}>
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-3 justify-end items-center">
                          <button
                            onClick={() => openEditForm(blog)}
                            className="text-accent-blue hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
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
              <FileText className="w-8 h-8 text-white/20 mx-auto mb-3" />
              No posts found. Add an article above.
            </div>
          )}
        </div>
      ) : (
        /* Create/Edit Form Panel with side-by-side Live markdown Preview! */
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#111] p-8 rounded-3xl border border-white/5 relative">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />

          {/* Form fields (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              {formId ? "Edit Blog Post" : "Create Blog Post"}
            </h3>

            {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{error}</div>}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="The Future of Minimalist Web Design"
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
                  placeholder="future-of-minimalist-web-design"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Category *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white cursor-pointer"
                >
                  <option value="Web Design">Web Design</option>
                  <option value="Branding">Branding</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Read Time *</label>
                <input
                  type="text"
                  required
                  value={formReadTime}
                  onChange={(e) => setFormReadTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Status *</label>
                <select
                  value={formPublished ? "published" : "draft"}
                  onChange={(e) => setFormPublished(e.target.value === "published")}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white cursor-pointer"
                >
                  <option value="published">Publish Live</option>
                  <option value="draft">Save Draft</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Cover Image URL *</label>
              <input
                type="text"
                required
                value={formImage}
                onChange={(e) => setFormImage(e.target.value)}
                placeholder="/uploads/my-image.png or unsplash URL"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white"
              />
              <span className="text-[10px] text-white/30 leading-none">Pencil Tip: Copy paths from the Media Library and paste here!</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Summary / Meta description *</label>
              <textarea
                required
                rows={2}
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                placeholder="A short summary detailing the article content..."
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white resize-none"
              />
            </div>

            {/* Markdown Rich text editor */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/35 font-mono">Markdown Content *</label>
              <textarea
                required
                rows={12}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="## Heading 2&#10;Write content here...&#10;&#10;* Bullet item 1&#10;* Bullet item 2"
                className="w-full px-4 py-3 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-xs text-white font-mono"
              />
            </div>

            {/* SEO Panel fields */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-4 mt-2">
              <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-white/30">SEO Configurations</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-white/35 font-mono">SEO Title Override</label>
                  <input
                    type="text"
                    value={formSeoTitle}
                    onChange={(e) => setFormSeoTitle(e.target.value)}
                    placeholder="Premium custom SEO title tag"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-[11px] text-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-white/35 font-mono">SEO Meta Description</label>
                  <input
                    type="text"
                    value={formSeoDescription}
                    onChange={(e) => setFormSeoDescription(e.target.value)}
                    placeholder="Premium custom SEO meta tag description"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-white/5 focus:outline-none focus:border-accent-blue text-[11px] text-white"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={isPending || role === "editor"}
                className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/95 disabled:opacity-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>Save Post</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>

          </div>

          {/* Right Side: Live preview (Col span 5) */}
          <div className="lg:col-span-5 border-l border-white/5 pl-8 flex flex-col gap-5 h-[700px] sticky top-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Live Reading Preview
            </h3>

            {/* Rendering preview block */}
            <div className="flex-1 overflow-y-auto pr-2 text-xs font-sans text-white/70 leading-relaxed max-w-none prose prose-invert">
              <h1 className="text-xl font-bold font-display text-white mt-1 leading-snug">{formTitle || "Article Title"}</h1>
              <div className="flex gap-2 items-center text-[10px] text-accent-blue font-mono mt-3 uppercase">
                <span>{formCategory}</span>
                <span>•</span>
                <span>{formReadTime}</span>
              </div>
              <div className="mt-6 border-t border-white/5 pt-4">
                {formContent ? (
                  formContent.split("\n\n").map((block, idx) => {
                    const t = block.trim();
                    if (t.startsWith("##")) return <h3 key={idx} className="text-sm font-bold font-display text-white mt-4 mb-2">{t.replace(/^##\s*/, "")}</h3>;
                    if (t.startsWith("*") || t.startsWith("-")) {
                      return (
                        <ul key={idx} className="my-2 pl-4 list-disc flex flex-col gap-1 text-[11px]">
                          {t.split("\n").map((line, i) => (
                            <li key={i}>{line.replace(/^[\*\-]\s*/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="my-3 text-[11px] text-white/60">{t}</p>;
                  })
                ) : (
                  <p className="italic text-white/30 text-xxs mt-4">Start typing in the Markdown field to preview the layout live...</p>
                )}
              </div>
            </div>

            {/* Google Search Engine Preview snippet */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
              <h4 className="text-[10px] uppercase font-bold text-white/30 font-mono mb-2">Google SERP Snippet Preview</h4>
              <div className="flex flex-col gap-1 font-sans">
                <span className="text-[10px] text-[#8ab4f8] hover:underline font-medium leading-tight truncate">
                  {formSeoTitle || `${formTitle || "Article Title"} | PencilHub`}
                </span>
                <span className="text-[9px] text-[#34a853] truncate leading-none">pencilhub.in/blog/{formSlug || "slug"}</span>
                <span className="text-[9px] text-white/40 leading-snug line-clamp-2 mt-1">
                  {formSeoDescription || formSummary || "Article summary text for Google crawl index..."}
                </span>
              </div>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}
