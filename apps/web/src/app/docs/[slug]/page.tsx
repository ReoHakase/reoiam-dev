import type { MDXComponents } from 'mdx/types';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { allContentDocuments } from 'contentlayer/generated';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

export async function generateStaticParams() {
  return allContentDocuments.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  // a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // Add a custom component.
  // MyComponent: () => <div>Hello World!</div>,
  h1: (props: ComponentPropsWithoutRef<'h1'>): ReactNode => (
    <h1
      className={css({
        fontFamily: 'heading',
        fontSize: '5xl',
        fontWeight: 'bold',
        lineHeight: '1.5',
        my: '2',
      })}
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>): ReactNode => (
    <h2
      className={css({
        fontFamily: 'heading',
        fontSize: '4xl',
        fontWeight: 'bold',
        lineHeight: '1.5',
        my: '2',
      })}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>): ReactNode => (
    <h3
      className={css({
        fontFamily: 'heading',
        fontSize: '2xl',
        fontWeight: 'bold',
        lineHeight: '1.5',
        my: '2',
      })}
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>): ReactNode => (
    <hr
      className={css({
        color: 'keyplate.6',
        w: 'full',
        h: '1px',
        my: '4',
      })}
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>): ReactNode => (
    <strong
      className={css({
        fontWeight: 'bold',
      })}
      {...props}
    />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>): ReactNode => (
    <em
      className={css({
        fontStyle: 'italic',
      })}
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>): ReactNode => (
    <a
      className={css({
        color: 'info.11',
        textDecoration: 'underline',
      })}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>): ReactNode => (
    <p
      className={css({
        my: '1',
      })}
      {...props}
    />
  ),
};

const Document = ({ params }: { params: { slug: string } }): ReactNode => {
  // Find the post for the current page.
  const post = allContentDocuments.find((contentDocument) => contentDocument._raw.flattenedPath === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article
      className={flex({
        maxWidth: '800px',
        direction: 'column',
        justify: 'start',
        align: 'stretch',
        textAlign: 'start',
        lineHeight: '1.5',
        p: '6',
      })}
    >
      {/* @ts-expect-error Refer: https://contentlayer.dev/docs/sources/files/mdx-d747e46d#custom-mdx-components */}
      <MDXContent components={mdxComponents} />
    </article>
  );
};

export default Document;
