import React from "react";
import { getSettings } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">System Config</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Global Settings</h2>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
