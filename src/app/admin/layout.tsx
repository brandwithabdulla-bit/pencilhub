import React from "react";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";

export const metadata = {
  title: "PencilHub CMS Admin Panel",
  description: "Manage projects, publish articles, read client inquiries, manage settings, and track workspace metrics.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>;
}
