import { Calendar } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ReactNode } from 'react';
import { mdxComponents } from '@/features/markup/components/mdxComponents';
import { allContentDocuments } from 'contentlayer/generated';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

type PageProps = { params: { slug: string[] } };

export const generateStaticParams = async () => {
  const params = allContentDocuments.map((post) => ({
    slug: post._raw.flattenedPath.split('/'),
  }));
  console.log(params);
  return params;
};

export const generateMetadata = async ({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> => {
  // Find the post for the current page.
  const post = allContentDocuments.find(
    (contentDocument) => contentDocument._raw.flattenedPath === params.slug.join('/'),
  );

  // 404 if the post does not exist.
  if (!post) throw new Error(`It failed to find the specified post "${params.slug}" during metadata generation.`);

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [...previousImages],
    },
  };
};

const Document = ({ params }: PageProps): ReactNode => {
  // Find the post for the current page.
  const post = allContentDocuments.find(
    (contentDocument) => contentDocument._raw.flattenedPath === params.slug.join('/'),
  );

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article
      className={flex({
        maxWidth: '800px',
        w: 'full',
        direction: 'column',
        justify: 'start',
        align: 'stretch',
        textAlign: 'start',
        lineHeight: '1.5',
        p: '6',
      })}
    >
      <h1
        className={css({
          fontFamily: 'heading',
          lineHeight: '1',
          fontSize: {
            base: '5xl',
            md: '6xl',
          },
          fontWeight: 'bold',
          my: '2',
        })}
      >
        {post.title}
      </h1>
      <p
        className={css({
          fontFamily: 'heading',
          color: 'keyplate.11',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '1',
          flexDirection: 'row',
          my: '2',
        })}
      >
        <Calendar size={16} /> Created on{' '}
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
          timeStyle: 'short',
          timeZone: 'UTC',
        }).format(new Date(post.date))}
      </p>
      <hr
        className={css({
          color: 'keyplate.6',
          w: 'full',
          h: '1px',
          my: '4',
        })}
      />
      <MDXContent components={mdxComponents} />
    </article>
  );
};

export default Document;