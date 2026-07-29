export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  year: string;
  image: string;
  challenge: string;
  solution: string;
  process: string;
  results: string;
  gallery: string[];
  tags: string[];
  featured: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  image: string;
  date: string;
  published: boolean;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  benefits: string[];
  icon: string; // Lucide icon name
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget: string;
  message: string;
  date: string;
  status: "new" | "contacted" | "archived";
}

export interface Settings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    linkedin: string;
    behance: string;
    dribbble: string;
    youtube: string;
  };
  seoKeywords: string[];
  logoUrl: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

export interface Analytics {
  views: number;
  submissions: number;
  blogViews: number;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  category: "LUTs" | "Presets";
  downloadUrl: string;
  image: string;
  description: string;
}

export interface DatabaseSchema {
  projects: Project[];
  blogs: Blog[];
  services: Service[];
  testimonials: Testimonial[];
  team: TeamMember[];
  faqs: FAQ[];
  inquiries: Inquiry[];
  newsletter: { id: string; email: string; date: string }[];
  settings: Settings;
  analytics: Analytics;
  logs: ActivityLog[];
  resources: Resource[];
}
