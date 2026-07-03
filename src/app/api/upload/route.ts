import { NextRequest, NextResponse } from "next/server";
import { uploadFoodImage } from "@/lib/cloudinary/upload";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // ── Validation ─────────────────────────────────────────────────────────
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPG, JPEG, PNG and WEBP are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 10 MB." },
        { status: 400 }
      );
    }

    // ── Upload ──────────────────────────────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer());
    const { imageUrl, publicId } = await uploadFoodImage(buffer, file.type);

    return NextResponse.json({ success: true, imageUrl, publicId }, { status: 200 });
  } catch (err) {
    console.error("[Upload API] Error:", err);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
