"use server";

import {
  saveProject,
  deleteProject,
  saveBlog,
  deleteBlog,
  saveSettings,
  deleteInquiry,
  deleteNewsletterEmail,
  updateInquiryStatus,
  addLog,
  getSettings,
  saveResource,
  deleteResource
} from "@/lib/db";
import { Project, Blog, Settings, Resource } from "@/types";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// 1. Project Actions
export async function saveProjectAction(project: Project) {
  try {
    await saveProject(project);
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Save project error", error);
    return { success: false, error: "Failed to save project." };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await deleteProject(id);
    revalidatePath("/portfolio");
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete project error", error);
    return { success: false, error: "Failed to delete project." };
  }
}

// 2. Blog Actions
export async function saveBlogAction(blog: Blog) {
  try {
    await saveBlog(blog);
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/admin/blogs");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Save blog error", error);
    return { success: false, error: "Failed to save blog post." };
  }
}

export async function deleteBlogAction(id: string) {
  try {
    await deleteBlog(id);
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete blog error", error);
    return { success: false, error: "Failed to delete blog post." };
  }
}

// 3. Settings Actions
export async function saveSettingsAction(settings: Settings) {
  try {
    await saveSettings(settings);
    revalidatePath("/contact");
    revalidatePath("/about");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Save settings error", error);
    return { success: false, error: "Failed to save settings." };
  }
}

// 4. Inquiry Actions
export async function updateInquiryStatusAction(id: string, status: "new" | "contacted" | "archived") {
  try {
    await updateInquiryStatus(id, status);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update inquiry error", error);
    return { success: false, error: "Failed to update inquiry status." };
  }
}

export async function deleteInquiryAction(id: string) {
  try {
    await deleteInquiry(id);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete inquiry error", error);
    return { success: false, error: "Failed to delete inquiry." };
  }
}

// 5. Newsletter Actions
export async function deleteNewsletterAction(id: string) {
  try {
    await deleteNewsletterEmail(id);
    revalidatePath("/admin/newsletter");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete newsletter error", error);
    return { success: false, error: "Failed to remove subscriber." };
  }
}

// 6. Media Library Uploader Action (writes to public/uploads/)
export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Ensure dir exists
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Already exists
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9\.\-_]/g, "_");
    const filePath = path.join(uploadDir, cleanFileName);
    
    await fs.writeFile(filePath, buffer);
    await addLog(`Uploaded file to media library: ${cleanFileName}`, "Admin");
    
    return { success: true, url: `/uploads/${cleanFileName}` };
  } catch (error) {
    console.error("Upload error", error);
    return { success: false, error: "Failed to upload image file." };
  }
}

// 7. Get Media Library files list
export async function getMediaFilesAction() {
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    try {
      const files = await fs.readdir(uploadDir);
      return {
        success: true,
        files: files
          .filter((file) => !file.startsWith("."))
          .map((file) => ({
            name: file,
            url: `/uploads/${file}`,
          })),
      };
    } catch (e) {
      // Folder doesn't exist yet, return empty
      return { success: true, files: [] };
    }
  } catch (error) {
    console.error("Read media error", error);
    return { success: false, error: "Failed to read media library files.", files: [] };
  }
}

// 8. Delete Media file Action
export async function deleteMediaFileAction(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await fs.unlink(filePath);
    await addLog(`Deleted media file: ${fileName}`, "Admin");
    return { success: true };
  } catch (error) {
    console.error("Delete media file error", error);
    return { success: false, error: "Failed to delete file." };
  }
}

// 9. Resource Asset Actions
export async function saveResourceAction(resource: Resource) {
  try {
    await saveResource(resource);
    revalidatePath("/resources");
    revalidatePath("/admin/resources");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Save resource error", error);
    return { success: false, error: "Failed to save resource asset." };
  }
}

export async function deleteResourceAction(id: string) {
  try {
    await deleteResource(id);
    revalidatePath("/resources");
    revalidatePath("/admin/resources");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete resource error", error);
    return { success: false, error: "Failed to delete resource asset." };
  }
}
