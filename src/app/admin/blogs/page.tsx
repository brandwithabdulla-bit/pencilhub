import React from "react";
import { getBlogs } from "@/lib/db";
import BlogsManager from "@/components/admin/BlogsManager";

export const revalidate = 0;

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">CMS Articles</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Publish Insights</h2>
      </div>

      <BlogsManager initialBlogs={blogs} />
    </div>
  );
}
