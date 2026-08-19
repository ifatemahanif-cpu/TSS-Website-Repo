// Shared image upload path for every admin surface.
//
// Vercel rejects any serverless request body over 4.5 MB at the edge, before our
// function runs, so an oversized photo never reaches /api/upload at all — it just
// comes back as a 413 the caller can't explain. Rather than ask editors to resize
// photos by hand, we shrink them in the browser first: a 9 MB phone photo lands at
// roughly 300 KB and looks identical at the size it is actually displayed.

// Held below Vercel's real 4.5 MB ceiling so an image that compresses badly
// (already-optimised noise, extreme dimensions) still has room to get through.
export const MAX_UPLOAD_BYTES = 4_000_000;

// Wide enough to stay sharp on a retina screen at full article width, small
// enough that nothing approaches the upload ceiling.
const MAX_EDGE = 2000;
const QUALITY = 0.85;

// Canvas re-encoding would flatten an animated GIF to a single frame and
// rasterise an SVG, so these pass through untouched and are only size-checked.
const PASSTHROUGH_TYPES = new Set(["image/gif", "image/svg+xml"]);

export interface UploadedImage {
  url: string;
  /** Intrinsic size of what was uploaded, so callers can reserve layout space. */
  width: number;
  height: number;
}

interface PreparedImage {
  file: File;
  width: number;
  height: number;
}

export function formatSize(bytes: number): string {
  if (bytes < 1_000_000) return `${Math.round(bytes / 1000)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

function withExtension(name: string, ext: string): string {
  const stem = name.replace(/\.[^.]+$/, "").trim();
  return `${stem || "image"}.${ext}`;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Downscale and re-encode an image in the browser. Returns the original file
 * untouched whenever shrinking it would not help — an already-small image, a
 * format we must not re-encode, or a file the browser cannot decode.
 */
export async function prepareImage(file: File): Promise<PreparedImage> {
  if (PASSTHROUGH_TYPES.has(file.type)) {
    return { file, width: 0, height: 0 };
  }

  let bitmap: ImageBitmap;
  try {
    // "from-image" applies EXIF rotation, without which portrait photos off a
    // phone come out sideways once drawn to a canvas.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    // Corrupt, or a format this browser cannot decode. Hand the original back
    // and let the size check produce a message the editor can act on.
    return { file, width: 0, height: 0 };
  }

  const sourceWidth = bitmap.width;
  const sourceHeight = bitmap.height;
  const scale = Math.min(1, MAX_EDGE / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { file, width: sourceWidth, height: sourceHeight };
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  // Deliberately no background fill: WebP carries alpha, so logos and cutouts
  // keep their transparency instead of picking up a white box.
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvasToBlob(canvas, "image/webp", QUALITY);
  if (!blob) {
    return { file, width: sourceWidth, height: sourceHeight };
  }

  // Re-encoding loses to the original on images that are already well optimised.
  // Keep whichever is smaller, as long as the original actually fits.
  if (blob.size >= file.size && file.size <= MAX_UPLOAD_BYTES) {
    return { file, width: sourceWidth, height: sourceHeight };
  }

  // A browser without WebP encoding silently hands back PNG, so trust the blob's
  // own type rather than what we asked for — the server filters on extension.
  const ext = blob.type === "image/webp" ? "webp" : "png";
  const prepared = new File([blob], withExtension(file.name, ext), { type: blob.type });
  return { file: prepared, width, height };
}

/**
 * Resize, then upload. Throws an Error whose message is safe to show an editor
 * verbatim — every failure here is something they can act on.
 */
export async function uploadImage(file: File): Promise<UploadedImage> {
  const prepared = await prepareImage(file);

  if (prepared.file.size > MAX_UPLOAD_BYTES) {
    const advice = PASSTHROUGH_TYPES.has(file.type)
      ? "Animated GIFs and SVGs are uploaded as they are, so this one needs to be smaller before it will go in."
      : "Try cropping it, or exporting it at a smaller size first.";
    throw new Error(
      `"${file.name}" is still ${formatSize(prepared.file.size)} after compression, and the limit is ${formatSize(MAX_UPLOAD_BYTES)}. ${advice}`
    );
  }

  const formData = new FormData();
  formData.append("file", prepared.file);

  let res: Response;
  try {
    res = await fetch("/api/upload", { method: "POST", body: formData });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Your session has expired. Reload the page, log in again, and re-add the image.");
    }
    if (res.status === 413) {
      throw new Error(`"${file.name}" was rejected as too large by the server.`);
    }
    if (res.status === 400) {
      throw new Error(`"${file.name}" is not a file type the blog accepts. Use JPG, PNG, WebP, GIF or SVG.`);
    }
    throw new Error(`Upload failed (error ${res.status}). Please try again.`);
  }

  const { url } = await res.json();
  if (!url) throw new Error("The server did not return an image address. Please try again.");

  return { url, width: prepared.width, height: prepared.height };
}
