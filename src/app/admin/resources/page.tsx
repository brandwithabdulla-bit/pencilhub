import React from "react";
import { getResources } from "@/lib/db";
import ResourcesManager from "@/components/admin/ResourcesManager";

export const revalidate = 0;

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">CMS Assets</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Manage Downloads</h2>
      </div>

      <ResourcesManager initialResources={resources} />
    </div>
  );
}
