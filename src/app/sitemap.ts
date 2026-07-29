import { MetadataRoute } from "next";
import { getBlogs, getProjects } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pencilhub.in";
  
  const staticUrls = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/process",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Fetch blogs & projects from database
  let blogUrls: any[] = [];
  let projectUrls: any[] = [];

  try {
    const blogs = await getBlogs();
    blogUrls = blogs
      .filter((b) => b.published)
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.date).toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (e) {
    console.error("Sitemap blogs read error", e);
  }

  try {
    const projects = await getProjects();
    projectUrls = projects.map((proj) => ({
      url: `${baseUrl}/portfolio/${proj.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap projects read error", e);
  }

  return [...staticUrls, ...blogUrls, ...projectUrls];
}
