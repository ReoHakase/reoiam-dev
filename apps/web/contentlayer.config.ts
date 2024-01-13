import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
};

export const ContentDocument = defineDocumentType(() => ({
  name: 'ContentDocument',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/docs/${post._raw.flattenedPath}` },
  },
}));

const source: ReturnType<typeof makeSource> = makeSource({
  contentDirPath: 'docs',
  documentTypes: [ContentDocument],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    // @ts-expect-error NOTE: It got fixed when you specify the second element in the plugin array
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeGithubAlerts, rehypeKatex],
  },
});

export default source;
