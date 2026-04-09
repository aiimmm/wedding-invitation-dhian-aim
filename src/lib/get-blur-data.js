import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

/**
 * Mendapatkan blurDataURL dari image lokal (folder /public)
 * atau dari URL eksternal.
 *
 * Dijalankan HANYA di server (Server Component / generateMetadata).
 */
export async function getBlurDataURL(src) {
  try {
    let buffer;

    const isExternal = src.startsWith("http://") || src.startsWith("https://");

    if (isExternal) {
      // Fetch image dari URL eksternal
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      // Baca image dari folder /public secara lokal
      const filePath = path.join(process.cwd(), "public", src);
      buffer = fs.readFileSync(filePath);
    }

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (error) {
    console.error("[getBlurDataURL] Error generating blur placeholder:", error);
    // Fallback: placeholder abu-abu transparan 1x1px
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  }
}
