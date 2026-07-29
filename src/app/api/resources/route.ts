import { NextResponse } from "next/server";
import { getResources } from "@/lib/db";

export const revalidate = 0; // Live database feed

export async function GET() {
  try {
    const resources = await getResources();
    return NextResponse.json({ success: true, resources });
  } catch (error) {
    console.error("API resources error", error);
    return NextResponse.json({ success: false, error: "Failed to read assets database." }, { status: 500 });
  }
}
