import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const ContentDocument = defineDocumentType(() => ({
  name: 'ContentDocument',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/docs/${post._raw.flattenedPath}` },
  },
}));

const source: ReturnType<typeof makeSource> = makeSource({ contentDirPath: 'docs', documentTypes: [ContentDocument] });

export default source;
