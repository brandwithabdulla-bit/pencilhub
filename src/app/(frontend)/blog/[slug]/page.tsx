import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, incrementAnalytics, getBlogs } from "@/lib/db";

export const revalidate = 0;
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return {};

  return {
    title: blog.seoTitle || `${blog.title} | PencilHub Journal`,
    description: blog.seoDescription || blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: [{ url: blog.image }],
    }
  };
}

// Simple Custom Markdown/Text renderer to ensure clean execution and styling
function renderContent(content: string) {
  return content.split("\n\n").map((block, idx) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("##")) {
      return (
        <h2 key={idx} className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-8 mb-4 leading-snug">
          {trimmed.replace(/^##\s*/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("###")) {
      return (
        <h3 key={idx} className="font-display text-xl sm:text-2xl font-bold text-foreground mt-6 mb-3">
          {trimmed.replace(/^###\s*/, "")}
        </h3>
      );
    }
    if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      return (
        <ul key={idx} className="flex flex-col gap-2.5 my-4 pl-5 list-disc text-foreground/75 text-sm sm:text-base leading-relaxed">
          {trimmed.split("\n").map((line, i) => (
            <li key={i}>{line.replace(/^[\*\-]\s*/, "")}</li>
          ))}
        </ul>
      );
    }
    if (trimmed.match(/^\d+\./)) {
      return (
        <ol key={idx} className="flex flex-col gap-2.5 my-4 pl-5 list-decimal text-foreground/75 text-sm sm:text-base leading-relaxed">
          {trimmed.split("\n").map((line, i) => (
            <li key={i}>{line.replace(/^\d+\.\s*/, "")}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={idx} className="text-sm sm:text-base text-foreground/75 leading-relaxed my-4 font-sans">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  // Increment blog view stats on database
  await incrementAnalytics("blogViews");

  // Format date
  const publishDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get related blogs
  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id && b.published)
    .slice(0, 2);

  return (
    <div className="bg-background text-foreground pb-24">
      
      {/* Back to index link */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/60 hover:text-accent-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Journal
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-4">
        
        {/* Metadata tag */}
        <div className="flex gap-4 items-center text-xxs font-bold text-accent-blue uppercase tracking-widest font-mono">
          <span>{blog.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          {blog.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-card-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.author.image}
            alt={blog.author.name}
            className="w-10 h-10 rounded-full object-cover border border-card-border"
          />
          <div>
            <h4 className="text-xs font-bold text-foreground leading-none">{blog.author.name}</h4>
            <p className="text-xxs text-foreground/45 mt-1 flex items-center gap-2">
              <span>{blog.author.role}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {publishDate}</span>
            </p>
          </div>
        </div>

      </header>

      {/* Main Image banner */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-card-border shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Markdown Content article body */}
      <article className="max-w-3xl mx-auto px-6 prose prose-zinc dark:prose-invert">
        {renderContent(blog.content)}
      </article>

      {/* Related posts */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 mt-24 border-t border-card-border pt-16">
          <h4 className="text-xs uppercase tracking-widest font-bold text-foreground/45 mb-8">Related Insights</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedBlogs.map((b) => (
              <Link
                key={b.id}
                href={`/blog/${b.slug}`}
                className="group p-5 rounded-3xl border border-card-border bg-neutral-gray hover:shadow-md hover:border-accent-blue/15 transition-all duration-300 flex justify-between items-center"
              >
                <div>
                  <span className="text-xxs font-mono uppercase text-accent-blue block">{b.category}</span>
                  <h4 className="text-sm font-bold text-foreground font-display group-hover:text-accent-blue transition-colors mt-1.5">{b.title}</h4>
                </div>
                <div className="p-2 rounded-full bg-background border border-card-border group-hover:bg-accent-blue group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
