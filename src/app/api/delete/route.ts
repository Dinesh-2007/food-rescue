import { NextRequest, NextResponse } from "next/server";
import { deleteFoodImage } from "@/lib/cloudinary/upload";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest) {
  try {
    const { publicId } = await req.json();

    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json(
        { success: false, error: "publicId is required." },
        { status: 400 }
      );
    }

    await deleteFoodImage(publicId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Delete API] Error:", err);
    return NextResponse.json(
      { success: false, error: "Delete failed." },
      { status: 500 }
    );
  }
}
