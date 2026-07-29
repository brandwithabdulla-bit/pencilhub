import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CursorGlow from "@/components/shared/CursorGlow";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <CursorGlow />
      <Navbar />
      <main className="flex-1 flex flex-col pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
