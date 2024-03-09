import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { NavbarTitle } from '@/features/navigation/components/Navbar/Navbar';
import { allContentDocuments } from 'contentlayer/generated';

type DocumentPageProps = { params: { slug: string[] } };

export const generateStaticParams = async () => {
  const params = allContentDocuments.map((post) => ({
    slug: post._raw.flattenedPath.split('/'),
  }));
  return params;
};

const Document = ({ params }: DocumentPageProps): ReactNode => {
  // Find the post for the current page.
  const post = allContentDocuments.find(
    (contentDocument) => contentDocument._raw.flattenedPath === params.slug.join('/'),
  );

  // 404 if the post does not exist.
  if (!post) notFound();

  // Read the MDX file metadata.
  const titleWithEmoji = [post.emoji, post.title].filter(Boolean).join(' ');

  return <NavbarTitle>{titleWithEmoji}</NavbarTitle>;
};

export default Document;
