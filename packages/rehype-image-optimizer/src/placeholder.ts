import fs from 'fs/promises';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import type { GetPlaiceholderOptions } from 'plaiceholder';

/**
 * Retrieves the image buffer for the given source.
 * If the source is a remote URL, it is downloaded and returned as a buffer.
 * If the source is a local file, it is read and returned as a buffer.
 * Plaiceholder with version above 3 requires the image to be a buffer, not a path.
 * @param src - The source of the image.
 * @param basePath - The base path for the image. It is used when the image is a local file.
 * @returns A promise that resolves to the image buffer.
 * @see https://plaiceholder.co/docs/upgrading-to-3
 */
export const getImageBuffer = async (src: string, basePath: string): Promise<Buffer> => {
  // If the image is a remote URL, download it.
  if (src.startsWith('http')) {
    const res = await fetch(src);
    return Buffer.from(await res.arrayBuffer());
  }
  // If the image is a local file, read it.
  // The path is relative to the project root.
  return fs.readFile(path.join(basePath, src));
};

export type GetPlaceholderOptions = GetPlaiceholderOptions;

/**
 * Retrieves the placeholder color, CSS, SVG and Base64 image for the given source and options.
 * @param src - The source of the image.
 * @param basePath - The base path for the image. It is used when the image is a local file.
 * @param options - The options for generating the placeholder.
 * @returns A promise that resolves to the result of generating the placeholder.
 * ```markdown
 * - Color: It's just a color
 * - CSS: ~600B when rendered as CSS
 * - SVG: ~1.2kB when rendered in HTML
 * - Base64: ~300B asset size
 * ```
 * @see https://plaiceholder.co/docs
 */
export const getPlaceholder = async (
  src: string,
  basePath: string,
  options?: GetPlaceholderOptions,
): ReturnType<typeof getPlaiceholder> => {
  // Retrieve the image buffer and generate the blur data URL and size data.
  const imageBuffer = await getImageBuffer(src, basePath);
  const result = await getPlaiceholder(imageBuffer, options);
  return result;
};
