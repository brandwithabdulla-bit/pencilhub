"use server";

import { addInquiry, addNewsletterEmail } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    await addNewsletterEmail(email);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Newsletter submission error", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget: string;
  message: string;
}) {
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    const inquiry = await addInquiry({
      name: data.name,
      email: data.email,
      company: data.company || "",
      services: data.services,
      budget: data.budget,
      message: data.message,
    });
    
    revalidatePath("/admin");
    return { success: true, inquiryId: inquiry.id };
  } catch (error) {
    console.error("Inquiry submission error", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
