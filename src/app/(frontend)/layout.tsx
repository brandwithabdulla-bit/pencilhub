import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CursorGlow from "@/components/shared/CursorGlow";
import { getSettings } from "@/lib/db";

export const revalidate = 0;

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <SmoothScroll />
      <CursorGlow />
      <Navbar />
      <main className="flex-1 flex flex-col pt-20">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
