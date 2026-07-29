import React from "react";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedServices from "@/components/home/FeaturedServices";
import Process from "@/components/home/Process";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "PencilHub | Learn. Create. Inspire. - Premium Creative Studio",
  description: "PencilHub is an award-winning creative agency helping businesses build memorable brands and digital products through branding, web design, development, and motion graphics.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <PortfolioPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
