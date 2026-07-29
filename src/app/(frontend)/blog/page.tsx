import React from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/db";

export const revalidate = 0;
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Insights & Journal | PencilHub",
  description: "Read our thoughts, design frameworks, branding strategies, and frontend technology guides from our creative director and strategy leads.",
};

interface Props {
  searchParams: {
    q?: string;
    category?: string;
  };
}

const categoriesList = ["All", "Web Design", "Branding", "Marketing", "Technology"];

export default async function BlogIndexPage({ searchParams }: Props) {
  const query = searchParams.q || "";
  const filterCat = searchParams.category || "All";

  // Fetch blogs
  const allBlogs = await getBlogs();

  // Filter based on search params on the server
  const filteredBlogs = allBlogs.filter((blog) => {
    if (!blog.published) return false;
    
    const matchesQuery =
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.summary.toLowerCase().includes(query.toLowerCase());
      
    const matchesCategory =
      filterCat === "All" || blog.category.toLowerCase() === filterCat.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  // Get featured blog (first published post)
  const featuredBlog = allBlogs.find((b) => b.published);

  return (
    <div className="bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-neutral-gray border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue">Insights & Journal</span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mt-4 max-w-2xl leading-[1.05]">
            Creative Insights
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mt-6 leading-relaxed">
            Written by our engineering, visual, and strategy leads. Explaining modern design practices and code patterns.
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Search & Category toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-card-border pb-8 mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat === "All" ? "" : cat}${query ? `&q=${query}` : ""}`}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  (cat === "All" && !searchParams.category) || searchParams.category === cat
                    ? "bg-foreground text-background"
                    : "bg-foreground/[0.03] text-foreground/60 border border-card-border hover:bg-foreground/5"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Search form */}
          <form method="GET" action="/blog" className="relative w-full md:max-w-xs">
            {searchParams.category && (
              <input type="hidden" name="category" value={searchParams.category} />
            )}
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              defaultValue={query}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-card-border bg-neutral-gray text-xs focus:outline-none focus:border-accent-blue text-foreground"
            />
            <Search className="w-4 h-4 text-foreground/40 absolute left-4 top-3" />
          </form>

        </div>

        {/* Featured Post (only shown when no query/filter) */}
        {!query && !searchParams.category && featuredBlog && (
          <div className="mb-20">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-foreground/45 mb-6">Featured Article</h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-gray rounded-3xl border border-card-border p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
              
              {/* Image banner */}
              <div className="lg:col-span-6 relative aspect-video lg:aspect-auto lg:h-[350px] rounded-2xl overflow-hidden border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Copy */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="flex gap-4 items-center text-xxs font-bold text-accent-blue uppercase tracking-widest font-mono">
                  <span>{featuredBlog.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredBlog.readTime}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground leading-tight hover:text-accent-blue transition-colors">
                  <Link href={`/blog/${featuredBlog.slug}`}>
                    {featuredBlog.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  {featuredBlog.summary}
                </p>

                {/* Author profile */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-card-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredBlog.author.image}
                    alt={featuredBlog.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-card-border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-foreground leading-none">{featuredBlog.author.name}</h4>
                    <p className="text-xxs text-foreground/40 mt-1">{featuredBlog.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-accent-blue transition-colors mt-6 flex items-center gap-1.5"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Regular Articles list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group flex flex-col justify-between bg-neutral-gray border border-card-border p-4 rounded-3xl hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-card-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Title metadata */}
                  <div className="mt-4 px-2">
                    <div className="flex gap-3 items-center text-xxs font-bold text-accent-blue uppercase tracking-widest font-mono">
                      <span>{blog.category}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground font-display group-hover:text-accent-blue transition-colors mt-2 leading-tight">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-foreground/50 mt-3 leading-relaxed line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="mt-6 pt-4 border-t border-card-border px-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.author.image}
                      alt={blog.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-card-border"
                    />
                    <span className="text-[10px] font-bold text-foreground/60">{blog.author.name}</span>
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-accent-blue transition-colors flex items-center gap-1"
                  >
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20 text-sm text-foreground/50 bg-neutral-gray border border-card-border rounded-3xl">
              No articles found matching the filters.
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
