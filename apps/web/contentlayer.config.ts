import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const ContentDocument = defineDocumentType(() => ({
  name: 'ContentDocument',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
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
    rehypePlugins: [
      [
        // @ts-expect-error TODO: Fix the type error, which seems to be caused by incorrect type definition provided by contentlayer
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark',
          },
          keepBackground: false,
        },
      ],
      rehypeGithubAlerts,
      // @ts-expect-error TODO: Fix the type error, which seems to be caused by incorrect type definition provided by contentlayer
      rehypeKatex,
    ],
  },
});

export default source;
