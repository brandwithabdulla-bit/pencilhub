import fs from "fs/promises";
import path from "path";
import { DatabaseSchema, Project, Blog, Service, Testimonial, TeamMember, FAQ, Inquiry, Settings, ActivityLog, Analytics, Resource } from "@/types";
import { SEED_DATABASE } from "./seedData";

const DB_DIR = path.join(process.cwd(), "src/data");
const DB_PATH = path.join(DB_DIR, "db.json");

// Helper to ensure database file exists
async function ensureDb(): Promise<DatabaseSchema> {
  try {
    // Check if directory exists, if not, create it
    try {
      await fs.mkdir(DB_DIR, { recursive: true });
    } catch (e) {
      // Already exists
    }

    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data) as DatabaseSchema;
    } catch (error) {
      // File doesn't exist, create it with seed data
      await fs.writeFile(DB_PATH, JSON.stringify(SEED_DATABASE, null, 2), "utf-8");
      return SEED_DATABASE;
    }
  } catch (error) {
    console.error("Database initialization error, falling back to seed", error);
    return SEED_DATABASE;
  }
}

// Read database
export async function getDatabase(): Promise<DatabaseSchema> {
  return await ensureDb();
}

// Write database
export async function saveDatabase(db: DatabaseSchema): Promise<void> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write to database", error);
  }
}

// 1. Projects DB Actions
export async function getProjects(): Promise<Project[]> {
  const db = await getDatabase();
  return db.projects || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function saveProject(project: Project): Promise<void> {
  const db = await getDatabase();
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = project;
  } else {
    db.projects.push(project);
  }
  await saveDatabase(db);
  await addLog(`Saved project: ${project.title}`, "Admin");
}

export async function deleteProject(id: string): Promise<void> {
  const db = await getDatabase();
  const project = db.projects.find((p) => p.id === id);
  db.projects = db.projects.filter((p) => p.id !== id);
  await saveDatabase(db);
  if (project) {
    await addLog(`Deleted project: ${project.title}`, "Admin");
  }
}

// 2. Blogs DB Actions
export async function getBlogs(): Promise<Blog[]> {
  const db = await getDatabase();
  return db.blogs || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug);
}

export async function saveBlog(blog: Blog): Promise<void> {
  const db = await getDatabase();
  const index = db.blogs.findIndex((b) => b.id === blog.id);
  if (index >= 0) {
    db.blogs[index] = blog;
  } else {
    db.blogs.push(blog);
  }
  await saveDatabase(db);
  await addLog(`Saved blog: ${blog.title}`, "Admin");
}

export async function deleteBlog(id: string): Promise<void> {
  const db = await getDatabase();
  const blog = db.blogs.find((b) => b.id === id);
  db.blogs = db.blogs.filter((b) => b.id !== id);
  await saveDatabase(db);
  if (blog) {
    await addLog(`Deleted blog: ${blog.title}`, "Admin");
  }
}

// 3. Services DB Actions
export async function getServices(): Promise<Service[]> {
  const db = await getDatabase();
  return db.services || [];
}

export async function saveService(service: Service): Promise<void> {
  const db = await getDatabase();
  const index = db.services.findIndex((s) => s.id === service.id);
  if (index >= 0) {
    db.services[index] = service;
  } else {
    db.services.push(service);
  }
  await saveDatabase(db);
  await addLog(`Saved service: ${service.title}`, "Admin");
}

export async function deleteService(id: string): Promise<void> {
  const db = await getDatabase();
  const service = db.services.find((s) => s.id === id);
  db.services = db.services.filter((s) => s.id !== id);
  await saveDatabase(db);
  if (service) {
    await addLog(`Deleted service: ${service.title}`, "Admin");
  }
}

// 4. Testimonials DB Actions
export async function getTestimonials(): Promise<Testimonial[]> {
  const db = await getDatabase();
  return db.testimonials || [];
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  const db = await getDatabase();
  const index = db.testimonials.findIndex((t) => t.id === testimonial.id);
  if (index >= 0) {
    db.testimonials[index] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }
  await saveDatabase(db);
  await addLog(`Saved testimonial from: ${testimonial.name}`, "Admin");
}

export async function deleteTestimonial(id: string): Promise<void> {
  const db = await getDatabase();
  const testimonial = db.testimonials.find((t) => t.id === id);
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  await saveDatabase(db);
  if (testimonial) {
    await addLog(`Deleted testimonial from: ${testimonial.name}`, "Admin");
  }
}

// 5. Team DB Actions
export async function getTeam(): Promise<TeamMember[]> {
  const db = await getDatabase();
  return db.team || [];
}

export async function saveTeamMember(member: TeamMember): Promise<void> {
  const db = await getDatabase();
  const index = db.team.findIndex((t) => t.id === member.id);
  if (index >= 0) {
    db.team[index] = member;
  } else {
    db.team.push(member);
  }
  await saveDatabase(db);
  await addLog(`Saved team member: ${member.name}`, "Admin");
}

export async function deleteTeamMember(id: string): Promise<void> {
  const db = await getDatabase();
  const member = db.team.find((t) => t.id === id);
  db.team = db.team.filter((t) => t.id !== id);
  await saveDatabase(db);
  if (member) {
    await addLog(`Deleted team member: ${member.name}`, "Admin");
  }
}

// 6. FAQs DB Actions
export async function getFAQs(): Promise<FAQ[]> {
  const db = await getDatabase();
  return db.faqs || [];
}

export async function saveFAQ(faq: FAQ): Promise<void> {
  const db = await getDatabase();
  const index = db.faqs.findIndex((f) => f.id === faq.id);
  if (index >= 0) {
    db.faqs[index] = faq;
  } else {
    db.faqs.push(faq);
  }
  await saveDatabase(db);
  await addLog(`Saved FAQ question`, "Admin");
}

export async function deleteFAQ(id: string): Promise<void> {
  const db = await getDatabase();
  db.faqs = db.faqs.filter((f) => f.id !== id);
  await saveDatabase(db);
  await addLog(`Deleted FAQ question`, "Admin");
}

// 7. Inquiries Actions
export async function getInquiries(): Promise<Inquiry[]> {
  const db = await getDatabase();
  return db.inquiries || [];
}

export async function addInquiry(inquiry: Omit<Inquiry, "id" | "date" | "status">): Promise<Inquiry> {
  const db = await getDatabase();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    date: new Date().toISOString(),
    status: "new"
  };
  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  
  // Track stats
  db.analytics.submissions += 1;
  
  await saveDatabase(db);
  await addLog(`Received project inquiry from: ${inquiry.name}`, "System");
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<void> {
  const db = await getDatabase();
  const inquiry = db.inquiries.find((i) => i.id === id);
  if (inquiry) {
    inquiry.status = status;
    await saveDatabase(db);
    await addLog(`Updated inquiry status for: ${inquiry.name} to ${status}`, "Admin");
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  const db = await getDatabase();
  db.inquiries = db.inquiries.filter((i) => i.id !== id);
  await saveDatabase(db);
  await addLog(`Deleted project inquiry`, "Admin");
}

// 8. Newsletter Actions
export async function getNewsletterEmails(): Promise<{ id: string; email: string; date: string }[]> {
  const db = await getDatabase();
  return db.newsletter || [];
}

export async function addNewsletterEmail(email: string): Promise<void> {
  const db = await getDatabase();
  if (!db.newsletter) db.newsletter = [];
  const exists = db.newsletter.some((n) => n.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    db.newsletter.push({
      id: `news-${Date.now()}`,
      email: email.toLowerCase(),
      date: new Date().toISOString()
    });
    await saveDatabase(db);
    await addLog(`New newsletter subscriber: ${email}`, "System");
  }
}

export async function deleteNewsletterEmail(id: string): Promise<void> {
  const db = await getDatabase();
  db.newsletter = db.newsletter.filter((n) => n.id !== id);
  await saveDatabase(db);
}

// 9. Settings Actions
export async function getSettings(): Promise<Settings> {
  const db = await getDatabase();
  return db.settings;
}

export async function saveSettings(settings: Settings): Promise<void> {
  const db = await getDatabase();
  db.settings = settings;
  await saveDatabase(db);
  await addLog(`Updated global settings`, "Admin");
}

// 10. Logs Actions
export async function getLogs(): Promise<ActivityLog[]> {
  const db = await getDatabase();
  return db.logs || [];
}

export async function addLog(action: string, user: string): Promise<void> {
  const db = await getDatabase();
  if (!db.logs) db.logs = [];
  const newLog: ActivityLog = {
    id: `log-${Date.now()}`,
    action,
    user,
    timestamp: new Date().toISOString()
  };
  db.logs.unshift(newLog);
  // Cap at 100 logs
  if (db.logs.length > 100) {
    db.logs = db.logs.slice(0, 100);
  }
  await saveDatabase(db);
}

// 11. Analytics Actions
export async function getAnalytics(): Promise<Analytics> {
  const db = await getDatabase();
  return db.analytics;
}

export async function incrementAnalytics(key: keyof Analytics): Promise<void> {
  const db = await getDatabase();
  if (!db.analytics) {
    db.analytics = { views: 0, submissions: 0, blogViews: 0 };
  }
  db.analytics[key] += 1;
  await saveDatabase(db);
}

// 12. Resources (LUTs & Presets) DB Actions
export async function getResources(): Promise<Resource[]> {
  const db = await getDatabase();
  return db.resources || [];
}

export async function getResourceBySlug(slug: string): Promise<Resource | undefined> {
  const resources = await getResources();
  return resources.find((r) => r.slug === slug);
}

export async function saveResource(resource: Resource): Promise<void> {
  const db = await getDatabase();
  if (!db.resources) db.resources = [];
  const index = db.resources.findIndex((r) => r.id === resource.id);
  if (index >= 0) {
    db.resources[index] = resource;
  } else {
    db.resources.push(resource);
  }
  await saveDatabase(db);
  await addLog(`Saved resource asset: ${resource.title}`, "Admin");
}

export async function deleteResource(id: string): Promise<void> {
  const db = await getDatabase();
  if (!db.resources) db.resources = [];
  const resItem = db.resources.find((r) => r.id === id);
  db.resources = db.resources.filter((r) => r.id !== id);
  await saveDatabase(db);
  if (resItem) {
    await addLog(`Deleted resource asset: ${resItem.title}`, "Admin");
  }
}
