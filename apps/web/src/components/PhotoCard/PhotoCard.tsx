import { type ReactNode } from 'react';
import { Image, type ImageProps } from '@/components/Image/Image';
import { cx, css, sva } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import type { SystemStyleObject, RecipeVariantProps } from 'styled-system/types';

export const photoCardSlotRecipe = sva({
  slots: ['root', 'image', 'label'],
  base: {
    root: {
      w: '48',
      h: 'fit-content',
      flexShrink: '0',
      bg: 'keyplate.2',
      shadow: 'lg',
      p: '4',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2',
    },
    image: {
      w: 'full',
      objectFit: 'cover',
      bg: 'keyplate.3',
    },
    label: {
      fontFamily: 'code',
      lineHeight: '1.25',
      color: 'keyplate.11',
    },
  },
});

export type PhotoCardProps = {
  css?: SystemStyleObject[];
  chilsren?: ReactNode;
  timestamp?: string;
} & RecipeVariantProps<typeof photoCardSlotRecipe> &
  ImageProps;

/**
 * Renders a component.
 * @param css Style props in PandaCSS format. e.g. `[{ w: 'full', bg: 'cyan.9' }]`
 * @param children Children `ReactNode` to render.
 */
export const PhotoCard = ({
  css: cssProps = [{}],
  alt,
  children,
  timestamp,
  className,
  ...props
}: PhotoCardProps): ReactNode => {
  const { root, image, label } = photoCardSlotRecipe.raw(props);
  return (
    <figure className={cx(css(root, ...cssProps), className)}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image css={[image]} alt={alt} {...props} />
      <div className={flex({ w: 'full', direction: 'row', justify: 'center', align: 'center', gap: '1' })}>
        <figcaption className={css(label, { display: 'block', flexGrow: '1' })}>{children}</figcaption>
        <figcaption className={css(label)}>{timestamp}</figcaption>
      </div>
    </figure>
  );
};
