import { Calendar } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ReactNode } from 'react';
import { mdxComponents } from '@/features/markup/components/mdxComponents';
import { CurrentContentNameSetter } from '@/features/navigation/components/CurrentContentNameSetter/CurrentContentNameSetter';
import { allContentDocuments } from 'contentlayer/generated';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { markupBlockquote, markupHeading, markupHr } from 'styled-system/recipes';

type PageProps = { params: { slug: string[] } };

export const generateStaticParams = async () => {
  const params = allContentDocuments.map((post) => ({
    slug: post._raw.flattenedPath.split('/'),
  }));
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

  const titleWithEmoji = [post.emoji, post.title].filter(Boolean).join(' ');

  return {
    title: titleWithEmoji,
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

  // Read the MDX file metadata.
  const titleWithEmoji = [post.emoji, post.title].filter(Boolean).join(' ');

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main
      className={flex({
        maxW: '800px',
        w: 'full',
        direction: 'column',
        justify: 'start',
        textAlign: 'start',
        lineHeight: '1.5',
        p: '6',
      })}
    >
      <CurrentContentNameSetter name={titleWithEmoji} />
      <h1 className={markupHeading({ level: 'title' })}>{titleWithEmoji}</h1>
      <blockquote className={markupBlockquote()}>{post.description}</blockquote>
      <p
        className={css({
          fontFamily: 'heading',
          color: 'keyplate.11',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '1',
          flexDir: 'row',
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
      <hr className={markupHr()} />
      <MDXContent components={mdxComponents} />
    </main>
  );
};

export default Document;
