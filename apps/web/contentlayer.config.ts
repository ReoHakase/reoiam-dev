import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import { rehypeImageOptimizer } from 'rehype-image-optimizer';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkUnwrapImages from 'remark-unwrap-images';

export const ContentDocument = defineDocumentType(() => ({
  name: 'ContentDocument',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    emoji: { type: 'string', required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/docs/${post._raw.flattenedPath}` },
  },
}));

const source: ReturnType<typeof makeSource> = makeSource({
  contentDirPath: 'docs',
  documentTypes: [ContentDocument],
  mdx: {
    // @ts-expect-error TODO: Fix the type error, which seems to be caused by incorrect type definition provided by contentlayer
    remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages],
    rehypePlugins: [
      [
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
      rehypeKatex,
      [rehypeImageOptimizer, { basePath: './public', placeholderOptions: { size: 32 } }],
    ],
  },
});

export default source;
