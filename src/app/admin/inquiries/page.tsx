import React from "react";
import { getInquiries } from "@/lib/db";
import { Bell, Trash, Check, Archive, Clock } from "lucide-react";
import { updateInquiryStatusAction, deleteInquiryAction } from "../actions";

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">Leads Panel</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Project Inquiries</h2>
      </div>

      <div className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col gap-6">
        <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
        
        {inquiries.length > 0 ? (
          <div className="flex flex-col gap-4">
            {inquiries.map((inq) => {
              const formattedDate = new Date(inq.date).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short"
              });

              return (
                <div key={inq.id} className="p-6 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
                  
                  {/* Lead Info */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full ${
                          inq.status === "new"
                            ? "bg-green-500/10 text-green-400"
                            : inq.status === "contacted"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-white/10 text-white/40"
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xxs text-white/50 font-mono mt-1">
                        Email: <a href={`mailto:${inq.email}`} className="text-white hover:underline">{inq.email}</a>
                        {inq.company ? ` | Company: ${inq.company}` : ""}
                      </p>
                    </div>
                    
                    <span className="text-[10px] text-white/30 font-mono flex items-center gap-1.5 self-start">
                      <Clock className="w-3.5 h-3.5" /> {formattedDate}
                    </span>
                  </div>

                  {/* Message brief */}
                  <div className="p-4 rounded-lg bg-background/50 border border-white/2 text-xs text-white/70 leading-relaxed font-sans">
                    <p className="font-semibold text-[10px] uppercase font-mono text-white/30 mb-2">Message</p>
                    "{inq.message}"
                  </div>

                  {/* Project Details metadata */}
                  <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-wider font-mono border-t border-white/5 pt-3 text-white/40 items-center justify-between">
                    <div className="flex flex-wrap gap-4">
                      <span>Budget: <span className="text-white font-bold">{inq.budget}</span></span>
                      <span>Services: <span className="text-white font-bold">{inq.services.join(", ")}</span></span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 items-center">
                      {inq.status === "new" && (
                        <form action={async () => {
                          "use server";
                          await updateInquiryStatusAction(inq.id, "contacted");
                        }}>
                          <button type="submit" className="text-accent-blue hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer">
                            <Check className="w-3.5 h-3.5" /> Contacted
                          </button>
                        </form>
                      )}
                      {inq.status !== "archived" && (
                        <form action={async () => {
                          "use server";
                          await updateInquiryStatusAction(inq.id, "archived");
                        }}>
                          <button type="submit" className="text-white/60 hover:text-white font-bold flex items-center gap-1 cursor-pointer">
                            <Archive className="w-3.5 h-3.5" /> Archive
                          </button>
                        </form>
                      )}
                      <form action={async () => {
                        "use server";
                        await deleteInquiryAction(inq.id);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-400 font-bold flex items-center gap-1 cursor-pointer">
                          <Trash className="w-3.5 h-3.5" /> Delete
                        </button>
                      </form>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-xs text-white/40 bg-white/[0.01] border border-white/5 rounded-xl">
            <Bell className="w-8 h-8 text-white/20 mx-auto mb-3" />
            No inquiries received yet. They will appear here when visitors submit forms on the contact page.
          </div>
        )}

      </div>
    </div>
  );
}
