import React from "react";
import { getNewsletterEmails } from "@/lib/db";
import { Mail, Trash, Clock } from "lucide-react";
import { deleteNewsletterAction } from "../actions";

export const revalidate = 0;

export default async function AdminNewsletterPage() {
  const subscribers = await getNewsletterEmails();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-accent-blue font-mono">Mail List</span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">Newsletter Subscribers</h2>
      </div>

      <div className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex flex-col gap-6">
        <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
        
        {subscribers.length > 0 ? (
          <div className="overflow-hidden border border-white/5 rounded-xl bg-white/[0.01]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 uppercase tracking-wider font-mono text-white/40 bg-white/[0.01]">
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Subscribed Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => {
                  const formattedDate = new Date(sub.date).toLocaleDateString("en-US", {
                    dateStyle: "medium"
                  });
                  return (
                    <tr key={sub.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01]">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent-blue shrink-0" />
                        {sub.email}
                      </td>
                      <td className="p-4 font-mono text-white/50">{formattedDate}</td>
                      <td className="p-4 text-right">
                        <form action={async () => {
                          "use server";
                          await deleteNewsletterAction(sub.id);
                        }} className="inline-block">
                          <button type="submit" className="text-red-500 hover:text-red-400 font-bold cursor-pointer flex items-center gap-1 ml-auto">
                            <Trash className="w-3.5 h-3.5" /> Remove
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-xs text-white/40 bg-white/[0.01] border border-white/5 rounded-xl">
            <Mail className="w-8 h-8 text-white/20 mx-auto mb-3" />
            No active subscribers yet. They will appear here when visitors register via the footer fields.
          </div>
        )}

      </div>
    </div>
  );
}
