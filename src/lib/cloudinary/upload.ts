import cloudinary from "./index";

/** Result returned after a successful upload */
export interface CloudinaryUploadResult {
  imageUrl: string;
  publicId: string;
}

/** Options for uploadFoodImage */
export interface UploadOptions {
  /** Sub-folder inside food-rescue/ on Cloudinary.  Defaults to "donations" */
  folder?: string;
  /** Optional transformation preset defined in your Cloudinary dashboard */
  transformation?: Record<string, unknown>[];
}

// ─────────────────────────────────────────────
// uploadFoodImage
// ─────────────────────────────────────────────
/**
 * Upload a raw image buffer (received from a Next.js route handler) to Cloudinary.
 *
 * @param buffer  - The file bytes as a Buffer.
 * @param mimeType - e.g. "image/jpeg" — used to choose upload format.
 * @param options  - Optional folder / transformation overrides.
 */
export async function uploadFoodImage(
  buffer: Buffer,
  mimeType: string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const folder = `food-rescue/${options.folder ?? "donations"}`;

  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "image",
    quality: "auto",
    fetch_format: "auto",
    transformation: options.transformation ?? [
      { width: 1200, height: 900, crop: "limit" },
      { quality: "auto:good" },
    ],
  });

  return {
    imageUrl: result.secure_url,
    publicId: result.public_id,
  };
}

// ─────────────────────────────────────────────
// deleteFoodImage
// ─────────────────────────────────────────────
/**
 * Delete an image from Cloudinary using its public_id.
 */
export async function deleteFoodImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

// ─────────────────────────────────────────────
// replaceFoodImage
// ─────────────────────────────────────────────
/**
 * Upload a replacement image, optionally deleting the old one.
 * If `oldPublicId` is provided the previous image is purged from Cloudinary.
 */
export async function replaceFoodImage(
  buffer: Buffer,
  mimeType: string,
  oldPublicId?: string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  // Upload new image first so if it fails the old one is still intact
  const result = await uploadFoodImage(buffer, mimeType, options);

  // Delete old image (fire-and-forget — don't block response)
  if (oldPublicId) {
    deleteFoodImage(oldPublicId).catch((err) =>
      console.warn("[Cloudinary] deleteFoodImage failed:", err)
    );
  }

  return result;
}
