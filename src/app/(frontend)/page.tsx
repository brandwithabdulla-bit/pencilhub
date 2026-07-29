import React from "react";
import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import { getProjects, getServices, getTestimonials, getSettings } from "@/lib/db";

// Ensure fresh database fetches on every request with zero caching
export const revalidate = 0;

export default async function HomePage() {
  const [projects, services, testimonials, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
    getSettings()
  ]);

  return (
    <>
      <Hero settings={settings} />
      <FeaturedServices services={services} />
      <PortfolioPreview projects={projects} />
      <Testimonials testimonials={testimonials} />
      <CTA settings={settings} />
    </>
  );
}
