import fs from 'fs/promises';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import type { Pluggable, Transformer } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

/**
 * Retrieves the image buffer for the given source.
 * If the source is a remote URL, it is downloaded and returned as a buffer.
 * If the source is a local file, it is read and returned as a buffer.
 * Plaiceholder with version above 3 requires the image to be a buffer, not a path.
 * @param src - The source of the image.
 * @returns A promise that resolves to the image buffer.
 * @see https://plaiceholder.co/docs/upgrading-to-3
 */
const getImageBuffer = async (src: string): Promise<Buffer> => {
  console.log('🖼️ Fetching image: ', src);
  // If the image is a remote URL, download it.
  if (src.startsWith('http')) {
    const res = await fetch(src);
    console.log('🖼️ Fetched image!: ', src);
    return Buffer.from(await res.arrayBuffer());
  }
  // If the image is a local file, read it.
  // The path is relative to the project root.
  return fs.readFile(path.join('./public', src));
};

type ImageNode = Node & {
  tagName: 'img';
  url: string;
  properties: {
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
};

/**
 * Optimizes images in the given HTML tree by adding the placeholder image base64 URL, width, and height.
 * These properties are generated in order to be passed to `next/image` component.
 * This plugin uses the `getImageBuffer` and `getPlaiceholder` functions to retrieve the image buffer and generate a blur data URL.
 * The optimized image properties (src, width, height, aspectRatio, blurDataURL) are added to the image node's data.
 * @param tree The HTML tree to optimize.
 * @see https://www.haxibami.net/blog/posts/blog-renewal#%E7%94%BB%E5%83%8F%E5%87%A6%E7%90%86
 */
export const rehypeImageOptimizer: Pluggable = function imageOpt(): Transformer {
  return async (tree: Node) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, 'element', (node: ImageNode) => {
      // Check if node has tagName and tagName is 'img', while tagName could be undefined.
      if (node.tagName !== 'img') return;
      // Now, we can safely assume that node is an image node.
      console.log('🖼️ Optimizing image: ', node, node.properties);
      const src = node.properties.src;
      promises.push(async () => {
        try {
          // Retrieve the image buffer and generate the blur data URL and size data.
          const imageBuffer = await getImageBuffer(src);
          const blur = await getPlaiceholder(imageBuffer, {
            size: 32,
          });
          const {
            base64,
            metadata: { width, height },
          } = blur;

          // Add the optimized image properties to the image node.
          node.properties = {
            ...node.properties,
            src,
            width,
            height,
            blurDataURL: base64,
          };
        } catch (e) {
          // If an error occurs, log it and throw it again, since contentlayer does not handle and output exceptions correctly.
          console.error('🖼️ rehypeImageOptimizer', e);
          throw e;
        }
      });
    });
    await Promise.allSettled(promises.map((t) => t()));
  };
};
