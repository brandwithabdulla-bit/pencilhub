import { DatabaseSchema } from "@/types";

export const INITIAL_SERVICES = [
  {
    id: "serv-1",
    title: "Brand Identity",
    description: "Create memorable brands through logo design, visual identity systems, typography, color strategy, and brand guidelines.",
    deliverables: ["Logo Suite (Primary, Secondary, Submark)", "Brand Style Guide & Rules", "Typography & Palette Strategy", "Stationery & Packaging Layouts"],
    benefits: ["Instant brand recognition", "Unified presence across channels", "Clear corporate voice and identity", "Attract premium clients"],
    icon: "Sparkles"
  },
  {
    id: "serv-2",
    title: "Website Design",
    description: "Beautiful, responsive, user-centered interfaces designed to convert visitors into customers.",
    deliverables: ["Figma Wireframes & Protypes", "High-fidelity UI/UX layouts", "Interactive Component Mockups", "Responsive Layout Architecture"],
    benefits: ["High user engagement", "Optimized conversion funnels", "Seamless UX across device screens", "Editorial-grade presentation"],
    icon: "Layout"
  },
  {
    id: "serv-3",
    title: "Website Development",
    description: "Modern websites and web applications built with scalable technologies, optimized performance, and clean architecture.",
    deliverables: ["Next.js & React Frontend Integration", "Headless CMS Connection", "Animations (GSAP, Framer Motion)", "Fully Responsive Layouts"],
    benefits: ["Sub-second page speeds", "Seamless SEO ranking configuration", "Robust codebase ready to scale", "Buttery smooth micro-interactions"],
    icon: "Code2"
  },
  {
    id: "serv-4",
    title: "Motion Graphics",
    description: "Logo animations, explainer videos, kinetic typography, promotional content, and engaging visual storytelling.",
    deliverables: ["Brand Identity Logo Animation", "Explainer Videos (2D & 3D)", "Social Media Motion Assets", "Kinetic Typography Promos"],
    benefits: ["Double audience engagement", "Explain complex products in seconds", "Premium visual styling", "High content conversion rate"],
    icon: "Film"
  },
  {
    id: "serv-5",
    title: "Video Production & Editing",
    description: "Professional editing for commercials, reels, YouTube content, documentaries, educational videos, and advertisements.",
    deliverables: ["Cinematic Ad Editing", "Social Reels & TikTok Packaging", "Audio Mastering & Sound FX", "Color Correction & Grading"],
    benefits: ["Polished studio-grade output", "Retention-optimized editing pace", "Captivating audio design", "Consistent branding on social platforms"],
    icon: "Video"
  },
  {
    id: "serv-6",
    title: "Graphic Design",
    description: "Creative posters, brochures, flyers, presentations, packaging, business profiles, and print-ready designs.",
    deliverables: ["Pitch Decks & Keynote Designs", "Editorial Magazines & Brochures", "Premium Product Packaging", "Exhibition / Event Banners"],
    benefits: ["Stunning physical presentation", "High-end layout structure", "Clarity in information hierarchy", "Consistent styling language"],
    icon: "Palette"
  },
  {
    id: "serv-7",
    title: "Social Media Design",
    description: "High-performing creatives, campaigns, Instagram posts, carousel designs, stories, and digital marketing assets.",
    deliverables: ["Instagram Carousel Templates", "Story Designs & Templates", "Content Campaign Visuals", "Thumbnail Graphic Designs"],
    benefits: ["Increased follower rate", "Identifiable brand grids", "Scroll-stopping illustrations", "Streamlined design workflow"],
    icon: "Share2"
  },
  {
    id: "serv-8",
    title: "Creative Consulting",
    description: "Helping businesses improve branding, customer experience, digital presence, and creative strategy.",
    deliverables: ["Comprehensive Design Audit", "Creative Strategy Brief", "Competitor Visual Analysis", "UX Optimization Roadmap"],
    benefits: ["Expert guidance on visual direction", "Identify leaks in conversion funnels", "Future-proof visual roadmaps", "Align design with revenue metrics"],
    icon: "Compass"
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "Zenith SaaS Platform",
    slug: "zenith-saas-platform",
    category: "Web Development",
    client: "Zenith Tech Inc.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    challenge: "Zenith requested a comprehensive redesign and Next.js frontend rebuild for their core cloud management dashboard. Their previous design was cluttered, slow, and failed to communicate their product's premium value, leading to a high drop-off rate on registration pages.",
    solution: "We designed a dark-mode-first dashboard layout with custom interactive charts, clean typographic grids, and a lightning-fast React architecture. Using code splitting and server component optimization, we brought load times down to 0.4 seconds.",
    process: "Our team analyzed the metrics, conducted wireframing sessions, created a premium dark aesthetic with neon teal details, and coded the Next.js solution from scratch with smooth Framer Motion chart animations.",
    results: "Page speed improved by 210%. Direct signup conversions increased by 42% in the first month following release, and mobile app usage went up by 65%.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Dashboard UI"],
    featured: true
  },
  {
    id: "proj-2",
    title: "Aura Cosmetics",
    slug: "aura-cosmetics",
    category: "Branding",
    client: "Aura Group",
    year: "2025",
    image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=1200&q=80",
    challenge: "Aura is a luxury skincare brand looking to break into the international market. They lacked a cohesive identity that balanced editorial luxury with their organic, eco-friendly philosophy.",
    solution: "We engineered a gorgeous minimal packaging identity system relying on warm sand tones, clean serif typography, and recycled textures. The brand guidelines we created established consistency across digital campaigns and retail box layouts.",
    process: "We explored natural ingredient colors, custom typeface lettering, and created 3D packaging renders before finalizing the print layouts. The aesthetic screams quiet luxury.",
    results: "Successfully launched in 12 global retail spots. Brand recognition increased by 80%, and the aesthetic was featured in prominent beauty publications.",
    gallery: [
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Brand Identity", "Luxury Packaging", "Editorial Guide"],
    featured: true
  },
  {
    id: "proj-3",
    title: "Nova Smart Watch Promo",
    slug: "nova-smart-watch",
    category: "Motion Graphics",
    client: "Nova Labs",
    year: "2025",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    challenge: "Nova wanted to introduce their high-end carbon titanium smartwatch. They needed a high-impact cinematic video that highlights the watch's rugged details and custom software overlays for social ads.",
    solution: "We created a hybrid 3D-2D motion design campaign. Using dark lighting, high-contrast watch face renders, and sound-synchronized animations, we created a 30-second teaser that highlights Nova's biometric metrics.",
    process: "We storyboarded the device rotations, modeled high-fidelity components, and edited the promotional clips with custom electronic sound designs.",
    results: "The video accumulated over 2.4M organic views on launching weekend. Ad CTR jumped by 180% compared to static graphic templates.",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["3D Motion Design", "Sound Design", "Social Ads"],
    featured: true
  },
  {
    id: "proj-4",
    title: "Lumina Brand Campaign",
    slug: "lumina-brand-campaign",
    category: "Video Editing",
    client: "Lumina Apparel",
    year: "2026",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    challenge: "Lumina wanted to launch their sustainable cotton clothing line using editorial documentary-style video content showing the raw process behind sourcing organic materials in India.",
    solution: "We edited a multi-part social documentary series. By color-grading the natural landscapes with warm cinematic tones and stitching together slow-paced interviews, the visual output was highly emotional and genuine.",
    process: "Reviewed 12 hours of raw footage, established a solid storyline structure, added ambient scoring, and optimized ratios for Instagram reels, YouTube shorts, and main website hero sections.",
    results: "Campaign engagement metrics surpassed brand averages by 300%. The clothing line sold out its first batch within 10 days.",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Video Editing", "Cinematic Grading", "Documentary Series"],
    featured: false
  }
];

export const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "The Future of Minimalist Web Design in 2026",
    slug: "future-of-minimalist-web-design",
    summary: "Minimalism is evolving. We break down the rise of editorial typography, high-contrast palettes, and micro-interactions that will define next-generation websites.",
    content: "## The Shift from Flat to Immersive Minimalism\n\nFor years, minimalism in web design was synonymous with plain white backgrounds, grey text, and basic layouts. However, as web development engines allow for advanced hardware rendering, we are witnessing a new age of immersive minimalism.\n\nModern minimalism is characterized by:\n\n1. **Oversized Typography:** Replacing images with bold, expressive headings (e.g., Space Grotesk) to convey brand character instantly.\n2. **Micro-interactions:** Animated hover states and magnetic buttons that make static page grids feel alive.\n3. **Noise and Grain Textures:** Adding physical organic textures to prevent screens from looking flat and generic.\n4. **Asymmetric Layouts:** Embracing editorial column designs inspired by premium fashion catalogs rather than standard Bootstrap structures.\n\nAt PencilHub, we focus on combining these elements to create websites that are both aesthetically stunning and lightning-fast.",
    category: "Web Design",
    author: {
      name: "Abdu L.",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-28T09:00:00Z",
    published: true,
    readTime: "4 min read",
    seoTitle: "The Future of Minimalist Web Design (2026 Updates) | PencilHub",
    seoDescription: "Explore how editorial styling, micro-animations, and noise gradients are revolutionizing minimalist web design in 2026."
  },
  {
    id: "blog-2",
    title: "How Strategic Branding Drives Venture Capital Funding",
    slug: "strategic-branding-vc-funding",
    summary: "First impressions matter to investors. Discover why a premium brand identity is a key asset when seeking startup capital.",
    content: "## The Visual Capital: Branding is Not an Expense\n\nWhen startups present pitch decks to venture capitalists, they focus on numbers, addressable markets, and technology architectures. However, VCs look at another critical factor: execution capability. A generic, poorly-designed pitch deck and brand presence signals a lack of quality and attention to detail.\n\nHere is how strategic branding influences investor confidence:\n\n* **Instant Trust:** A premium brand presence communicates that the company is established, mature, and values high standards.\n* **Clear Messaging:** If a VC cannot understand your core value proposition in 5 seconds, they will pass. Branding organizes information logically.\n* **Perceived Market Size:** Professional design suggests you are building a product to capture the top tier of your market.\n\nInvesting in visual assets before a seed round isn't just about color choices; it is about building visual authority.",
    category: "Branding",
    author: {
      name: "Sarah M.",
      role: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-25T11:30:00Z",
    published: true,
    readTime: "6 min read",
    seoTitle: "Startup Branding and Venture Capital Funding | PencilHub Insights",
    seoDescription: "Learn how startup brand design, professional pitch decks, and a cohesive identity directly impact VC funding decisions."
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Arjun Verma",
    role: "CEO & Founder",
    company: "Zenith Tech",
    quote: "PencilHub completely transformed our digital presence. They redesigned our entire platform layout and rebuilt it on Next.js. The results speak for themselves—our conversion metrics increased by 42% within weeks of release, and our users are loving the smooth interactions.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "test-2",
    name: "Priyah Sharma",
    role: "Director of Marketing",
    company: "Aura Luxury Skincare",
    quote: "The branding packaging design designed by PencilHub is world-class. They captured our luxury, eco-friendly ethos perfectly. Their team works with outstanding attention to detail, and their editorial guidelines are incredibly easy to apply.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "test-3",
    name: "Marcus Aurelius",
    role: "Product Lead",
    company: "Nova Smart Watch Labs",
    quote: "We needed a motion graphic trailer that would stop scrollers on social feeds. PencilHub delivered an absolute masterpiece. Our click-through rates are higher than ever, and our brand authority has reached new levels.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    rating: 5
  }
];

export const INITIAL_TEAM = [
  {
    id: "team-1",
    name: "Mikdad",
    role: "Founder & Creative Director",
    image: "https://pencilhub.in/wp-content/uploads/2024/11/ABOUT-US-MY-PIC.png",
    bio: "Founder of PencilHub. Professional video editor, motion graphic artist, and creative educator. Mikdad leads the visual direction, design tutorials, and retention-optimized video editing suites at PencilHub."
  },
  {
    id: "team-2",
    name: "Sarah M.",
    role: "Head of Strategy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Sarah aligns design choices with measurable business growth. She works closely with startups and founders to establish visual positioning before product launch."
  },
  {
    id: "team-3",
    name: "Rohan Nair",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Performance specialist in Next.js, GSAP, and CMS logic, ensuring PencilHub digital experiences compile flawlessly and load in milliseconds."
  }
];

export const INITIAL_FAQS = [
  {
    id: "faq-1",
    question: "What is your creative design process?",
    answer: "We work in six distinct stages: 1. Discover (understanding your goals), 2. Research (competitor audit), 3. Strategy (setting guidelines), 4. Design (wireframes & mockups), 5. Develop (Next.js performance-coded build), and 6. Launch (live audits and client review)."
  },
  {
    id: "faq-2",
    question: "Do you build custom websites or use CMS templates?",
    answer: "We specialize in custom web development. All our websites are built from scratch on Next.js/React using modern Tailwind configurations. This ensures your website loads instantly, operates securely, and is completely free of template layout limitations."
  },
  {
    id: "faq-3",
    question: "How long does a branding and web development project take?",
    answer: "A complete brand identity design usually takes 2–4 weeks. A custom responsive website design and Next.js development cycle takes 4–8 weeks, depending on requirements (e.g. custom CMS, animated timelines)."
  },
  {
    id: "faq-4",
    question: "Can we manage the website content after launch?",
    answer: "Yes, absolutely! We build a custom Admin Panel CMS tailored directly to your layout modules. You can easily publish blog posts, add portfolio items, edit service sections, and read inquiries without touch points on the raw codebase."
  }
];

export const INITIAL_RESOURCES = [
  {
    id: "res-1",
    title: "5 Cinematic LUT Filters",
    slug: "5-cinematic-lut-filters",
    category: "LUTs" as const,
    downloadUrl: "/uploads/5_cinematic_luts.zip",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    description: "Premium cinematic look-up tables optimized for Premiere Pro, After Effects, and DaVinci Resolve. Perfect for high-contrast cinematic visual framing."
  },
  {
    id: "res-2",
    title: "Free Moody LUT Pack",
    slug: "free-moody-lut-pack",
    category: "LUTs" as const,
    downloadUrl: "/uploads/free_moody_lut_pack.zip",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    description: "Moody, cold blue shadows and warm highlights to give travel reels and lifestyle commercials a signature cinematic tone."
  },
  {
    id: "res-3",
    title: "Free Moody LUT Filter Pack",
    slug: "free-moody-lut-filter-pack",
    category: "LUTs" as const,
    downloadUrl: "/uploads/free_moody_lut_filter_pack.zip",
    image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=800&q=80",
    description: "A secondary variation of our moody aesthetic designed specifically for mobile editors (CapCut, VN Editor, LumaFusion)."
  },
  {
    id: "res-4",
    title: "Vibrant Lifestyle Lr Presets",
    slug: "vibrant-lifestyle-lr-presets",
    category: "Presets" as const,
    downloadUrl: "/uploads/vibrant_lifestyle_lr_presets.zip",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    description: "Lightroom desktop & mobile presets for color correction, balancing skin tones, and boosting warm tones in outdoor photography."
  },
  {
    id: "res-5",
    title: "Moody Forest Lightroom Presets",
    slug: "moody-forest-lr-presets",
    category: "Presets" as const,
    downloadUrl: "/uploads/moody_forest_lr_presets.zip",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    description: "De-saturate greens and enhance deep shadows. Perfect for cinematic nature, moody landscape, and foggy morning photography."
  }
];

export const SEED_DATABASE: DatabaseSchema = {
  projects: INITIAL_PROJECTS,
  blogs: INITIAL_BLOGS,
  services: INITIAL_SERVICES,
  testimonials: INITIAL_TESTIMONIALS,
  team: INITIAL_TEAM,
  faqs: INITIAL_FAQS,
  inquiries: [],
  newsletter: [],
  resources: INITIAL_RESOURCES,
  settings: {
    siteName: "PencilHub",
    tagline: "Learn. Create. Inspire.",
    contactEmail: "pencilhubsocial@gmail.com",
    contactPhone: "+91 9876543210",
    address: "Premium Design District, Bangalore, India",
    socialLinks: {
      instagram: "https://www.instagram.com/pencil_hub/",
      twitter: "https://x.com/miqu_mk",
      linkedin: "https://linkedin.com/company/pencilhub",
      behance: "https://behance.net/pencilhub",
      dribbble: "https://dribbble.com/pencilhub",
      youtube: "https://www.youtube.com/@pencilhub"
    },
    seoKeywords: ["video editing tutorials", "lightroom presets", "free LUTs", "premiere pro tricks", "branding", "web development", "design agency"],
    logoUrl: ""
  },
  analytics: {
    views: 1824,
    submissions: 12,
    blogViews: 923
  },
  logs: [
    {
      id: "log-1",
      action: "Database initialized with premium seed data",
      user: "System",
      timestamp: "2026-07-29T11:00:00Z"
    }
  ]
};
