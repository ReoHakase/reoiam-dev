import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { PhotoCard } from '@/components/PhotoCard/PhotoCard';
import HanbokImage from '@public/hanbok.webp';
import OzImage from '@public/oz.webp';
import SelfieImage from '@public/selfie.webp';
import ShelfreeImage from '@public/shelfree.webp';
import TjgphImage from '@public/tjgph.webp';
import { cx, css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

export type MyPhotoCardStackProps = {
  css?: SystemStyleObject[];
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

/**
 * Renders a component.
 * @param css Style props in PandaCSS format. e.g. `[{ w: 'full', bg: 'cyan.9' }]`
 * @param children Children `ReactNode` to render.
 */
export const MyPhotoCardStack = ({
  css: cssProps = [{}],
  children,
  className,
  ...props
}: MyPhotoCardStackProps): ReactNode => {
  return (
    <div
      className={cx(
        css(
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            w: 'full',
            overflowX: 'hidden',
            // HACK: overflow-y: visible does not work properly when used with overflow-x: hidden, so expand the element along y-axis
            my: '-300px',
            py: '300px',
          },
          ...cssProps,
        ),
        className,
      )}
      {...props}
    >
      <div
        className={css({
          w: '347px',
          h: '443px',
          position: 'relative',
          my: '20',
        })}
      >
        <PhotoCard
          css={[
            {
              w: '313px',
              position: 'absolute',
              top: '400px',
              left: '-83px',
              transform: 'rotate(13.73deg)',
            },
          ]}
          src={TjgphImage}
          alt="Me, at TJ-GPH 2022 at Chaing Rai, Dec 24 ‘22"
          timestamp="Dec 24 ‘22"
          sizes={{
            default: '50vw',
            md: '30vw',
          }}
          placeholder="blur"
        >
          Me, at TJ-GPH 2022 at Chaing Rai
        </PhotoCard>
        <PhotoCard
          css={[
            {
              w: 'full',
              position: 'absolute',
              inset: '0',
            },
          ]}
          src={SelfieImage}
          alt="Me, taking a selfie, Oct 21 ‘23"
          timestamp="Oct 21 ‘23"
          sizes={{
            default: '90vw',
            md: '50vw',
            xl: '30vw',
          }}
          placeholder="blur"
          priority
        >
          Me, taking a selfie
        </PhotoCard>
        <PhotoCard
          css={[
            {
              w: '214px',
              position: 'absolute',
              top: '-106px',
              left: '-30px',
              transform: 'rotate(-10deg)',
            },
          ]}
          src={HanbokImage}
          alt="Me, wearing Hanbok, Sep 11 ‘23"
          timestamp="Sep 11 ‘23"
          sizes={{
            default: '50vw',
            md: '30vw',
          }}
          placeholder="blur"
        >
          Me, wearing Hanbok
        </PhotoCard>
        <PhotoCard
          css={[
            {
              w: '310px',
              position: 'absolute',
              top: '-116px',
              right: '-218px',
              transform: 'rotate(15deg)',
            },
          ]}
          src={OzImage}
          alt="Me, wearing Hanbok, Oct 22 ‘22"
          timestamp="Oct 22 ‘22"
          sizes={{
            default: '50vw',
            md: '30vw',
          }}
          placeholder="blur"
        >
          OZ, the board game result tracker
        </PhotoCard>
        <PhotoCard
          css={[
            {
              w: '387px',
              position: 'absolute',
              bottom: '-118px',
              right: '-253px',
              transform: 'rotate(-11deg)',
            },
          ]}
          src={ShelfreeImage}
          alt="Shelfree, smart library system using face & RFID, Aug 21 ‘23"
          timestamp="Aug 21 ‘23"
          sizes={{
            default: '50vw',
            md: '30vw',
          }}
          placeholder="blur"
        >
          Shelfree, smart library system using face & RFID
        </PhotoCard>
      </div>
    </div>
  );
};
