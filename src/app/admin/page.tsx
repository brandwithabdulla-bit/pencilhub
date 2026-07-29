import React from "react";
import Link from "next/link";
import { getAnalytics, getInquiries, getLogs, getNewsletterEmails } from "@/lib/db";
import { Eye, Bell, Mail, BookOpen, Clock, FileText, Briefcase, ArrowUpRight } from "lucide-react";
import { updateInquiryStatusAction, deleteInquiryAction } from "./actions";

export const revalidate = 0; // Disable caching to fetch live data

export default async function DashboardPage() {
  const analytics = await getAnalytics();
  const inquiries = await getInquiries();
  const logs = await getLogs();
  const subscribers = await getNewsletterEmails();

  const stats = [
    { name: "Total Site Views", val: analytics.views, icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Newsletter subs", val: subscribers.length, icon: Mail, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Lead Inquiries", val: inquiries.length, icon: Bell, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Blog Article Views", val: analytics.blogViews, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header and Quick shortcuts */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">Overview</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Dashboard</h2>
        </div>
        
        {/* Quick action triggers */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 flex items-center gap-2 transition-all"
          >
            <Briefcase className="w-4 h-4" /> Manage Work
          </Link>
          <Link
            href="/admin/blogs"
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4" /> Manage Blogs
          </Link>
        </div>
      </div>

      {/* Stats Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.name} className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
              
              <div className="flex justify-between items-center">
                <span className="text-xxs font-mono uppercase tracking-widest text-white/40">{item.name}</span>
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <span className="font-display text-3xl font-extrabold text-white">{item.val}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Narrative grid (Inquiries + Activity Logs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Inquiries list (Col span 7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col gap-6">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-green-500" />
              Recent Project Inquiries
            </h3>
            <Link href="/admin/inquiries" className="text-xxs font-bold text-accent-blue hover:underline flex items-center gap-0.5">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {inquiries.slice(0, 4).length > 0 ? (
              inquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-white">{inq.name}</h4>
                      <p className="text-[10px] text-white/50 font-mono mt-0.5">{inq.email} {inq.company ? `| ${inq.company}` : ""}</p>
                    </div>
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

                  <p className="text-xxs text-white/60 leading-relaxed font-sans line-clamp-2">
                    "{inq.message}"
                  </p>

                  <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-mono pt-2 border-t border-white/5 text-white/35">
                    <span>Budget: <span className="text-white font-bold">{inq.budget}</span></span>
                    
                    {/* Inline actions using server form actions */}
                    <div className="flex gap-2">
                      {inq.status === "new" && (
                        <form action={async () => {
                          "use server";
                          await updateInquiryStatusAction(inq.id, "contacted");
                        }}>
                          <button type="submit" className="hover:text-blue-400 font-bold cursor-pointer">Mark Contacted</button>
                        </form>
                      )}
                      <form action={async () => {
                        "use server";
                        await deleteInquiryAction(inq.id);
                      }}>
                        <button type="submit" className="hover:text-red-400 font-bold cursor-pointer">Delete</button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-xs text-white/40 bg-white/[0.01] border border-white/5 rounded-xl">
                No recent lead inquiries.
              </div>
            )}
          </div>
        </div>

        {/* System Logs / Audit trail (Col span 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col gap-6">
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-purple" />
              Activity Audit Log
            </h3>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[380px] pr-2">
            {logs.slice(0, 10).map((log) => {
              const logDate = new Date(log.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
              });
              return (
                <div key={log.id} className="flex gap-3 text-xxs font-mono leading-relaxed border-b border-white/5 pb-3 last:border-0">
                  <span className="text-accent-purple font-bold shrink-0">{logDate}</span>
                  <div>
                    <p className="text-white/80">{log.action}</p>
                    <span className="text-white/30 text-[9px] mt-0.5 block">By: {log.user}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
