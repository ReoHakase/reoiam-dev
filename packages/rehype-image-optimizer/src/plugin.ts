import type { Root, Element } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { getPlaceholder } from './placeholder';
import type { GetPlaceholderOptions } from './placeholder';

export type ImageElement = {
  tagName: 'img';
  url: string;
  properties: {
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
} & Element;

export const isImageElement = (node: Element): node is ImageElement => node.tagName === 'img';

export type RehypeImageOptimizerOptions = {
  basePath: string;
  placeholderOptions?: GetPlaceholderOptions;
};

/**
 * Optimizes images in the given HTML tree by adding the placeholder image base64 URL, width, and height.
 * These properties are generated in order to be passed to `next/image` component.
 * This plugin uses the `getImageBuffer` and `getPlaiceholder` functions to retrieve the image buffer and generate a blur data URL.
 * The optimized image properties (src, width, height, aspectRatio, blurDataURL) are added to the image node's data.
 * @param tree The HTML tree to optimize.
 * @see https://www.haxibami.net/blog/posts/blog-renewal#%E7%94%BB%E5%83%8F%E5%87%A6%E7%90%86
 */
export const rehypeImageOptimizer: Plugin<[RehypeImageOptimizerOptions?], Root> = (options) => async (tree) => {
  const promises: (() => Promise<void>)[] = [];
  visit(tree, 'element', (node: ImageElement | Element) => {
    // Check if node has tagName and tagName is 'img', while tagName could be undefined.
    if (!isImageElement(node)) return;
    // Now, we can safely assume that node is an image node.
    const { src } = node.properties;
    promises.push(async () => {
      try {
        // Retrieve the image buffer and generate the blur data URL and size data.
        const result = await getPlaceholder(src, options?.basePath ?? process.cwd(), options?.placeholderOptions);
        const {
          base64,
          metadata: { width, height },
        } = result;

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
        // eslint-disable-next-line no-console
        console.error('🖼️ rehypeImageOptimizer', e);
        throw e;
      }
    });
  });
  await Promise.allSettled(promises.map((t) => t()));
};
