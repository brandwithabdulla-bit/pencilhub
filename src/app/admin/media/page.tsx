import React from "react";
import { getMediaFilesAction } from "../actions";
import MediaManager from "@/components/admin/MediaManager";

export const revalidate = 0; // Live reload

export default async function MediaPage() {
  const res = await getMediaFilesAction();
  const files = res.success && res.files ? res.files : [];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">CMS Assets</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Media Library</h2>
      </div>

      <MediaManager initialFiles={files} />
    </div>
  );
}
