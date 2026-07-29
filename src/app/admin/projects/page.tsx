import React from "react";
import { getProjects } from "@/lib/db";
import ProjectsManager from "@/components/admin/ProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">CMS Portfolio</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Manage Case Studies</h2>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
