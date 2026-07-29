import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PencilHub - Premium Creative Agency",
    default: "PencilHub | Learn. Create. Inspire. - Premium Creative Agency",
  },
  description:
    "PencilHub is a modern, premium creative agency helping businesses build memorable brands and digital experiences through strategic design, branding, visual storytelling, and innovative technology.",
  keywords: [
    "creative agency",
    "branding agency",
    "web design studio",
    "website development",
    "motion graphics",
    "video production",
    "graphic design",
    "digital experiences",
    "PencilHub",
  ],
  authors: [{ name: "PencilHub Team" }],
  metadataBase: new URL("https://pencilhub.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PencilHub | Premium Creative Agency",
    description:
      "Helping businesses build memorable brands and digital experiences through strategy, creativity, technology, and design.",
    url: "https://pencilhub.in",
    siteName: "PencilHub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PencilHub Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PencilHub | Premium Creative Agency",
    description:
      "Helping businesses build memorable brands and digital experiences through strategy, creativity, technology, and design.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased lenis-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent-blue selection:text-white overflow-x-hidden">
        {/* Fine-grained noise grain overlay for editorial texturing */}
        <div className="noise-overlay" />
        
        {/* Full-screen content */}
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
