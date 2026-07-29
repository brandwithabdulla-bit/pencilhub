"use client";

import React, { useState, useTransition } from "react";
import { uploadMediaAction, deleteMediaFileAction } from "@/app/admin/actions";
import { Upload, Trash, Copy, Check, FileImage, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface MediaFile {
  name: string;
  url: string;
}

interface MediaManagerProps {
  initialFiles: MediaFile[];
}

export default function MediaManager({ initialFiles }: MediaManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const res = await uploadMediaAction(formData);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Upload failed.");
      }
    });
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;
    
    startTransition(async () => {
      const res = await deleteMediaFileAction(fileName);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Delete failed.");
      }
    });
  };

  const copyToClipboard = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Upload block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
        
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Upload New Assets</h3>
          <p className="text-xxs text-white/40 mt-1 leading-relaxed">
            Upload images (.png, .jpg, .svg) to use in portfolio case studies or blog posts.
          </p>
        </div>

        <label className="relative px-6 py-3 rounded-xl bg-white text-black hover:bg-white/95 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all select-none">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            disabled={isPending}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Grid of Files */}
      <div>
        <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-6">Uploaded Files</h4>
        
        {initialFiles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {initialFiles.map((file) => {
              const isCopied = copiedName === file.name;
              return (
                <div key={file.name} className="group relative rounded-2xl border border-white/5 bg-[#111] overflow-hidden flex flex-col justify-between hover:border-white/10 hover:shadow-lg transition-all duration-300">
                  
                  {/* Image Thumbnail */}
                  <div className="relative aspect-square overflow-hidden bg-white/2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                    />
                    
                    {/* Hover actions buttons overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity z-10">
                      <button
                        onClick={() => copyToClipboard(file.url, file.name)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                        title="Copy URL"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(file.name)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Meta Label */}
                  <div className="p-3 border-t border-white/5 bg-white/[0.01]">
                    <span className="text-[10px] text-white/60 truncate block" title={file.name}>
                      {file.name}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-xs text-white/40 bg-[#111] border border-white/5 rounded-2xl">
            <FileImage className="w-8 h-8 text-white/20 mx-auto mb-3" />
            No files in the media library. Upload an image file above to get started.
          </div>
        )}
      </div>

    </div>
  );
}
