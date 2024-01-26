import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';
import { Link } from '../Link/Link';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import type { SystemStyleObject } from 'styled-system/types';

const Globe = dynamic(() => import('../Globe/Globe'));

export type HeroProps = {
  css?: SystemStyleObject;
};

/**
 * Renders a hero section component.
 * @param css Style props in PandaCSS format. e.g. `[{ w: 'full', bg: 'cyan.9' }]`
 */
export const Hero = ({ css: cssProps = {}, ...props }: HeroProps): ReactNode => {
  return (
    <div
      className={css(
        {
          width: '100%',
          display: 'grid',
          justifyItems: 'stretch',
          alignItems: 'stretch',
          gridTemplateColumns: '100%',
          '& > *': {
            gridArea: '1 / 1 / 1 / 1',
          },
          // HACK: overflow-y: visible does not work properly when used with overflow-x: hidden, so expand the element along y-axis
          my: '-300px',
          py: '300px',
          overflowX: 'hidden',
        },
        cssProps,
      )}
      {...props}
    >
      <div
        className={flex({
          direction: 'row',
          justify: 'center',
          align: 'center',
          w: '100%',
        })}
      >
        <Globe />
      </div>
      <div
        className={flex({
          width: '100%',
          direction: 'column',
          justify: 'center',
          align: 'stretch',
          overflow: 'hidden',
        })}
      >
        <hgroup
          className={flex({
            direction: 'column',
            justify: 'center',
            align: 'stretch',
            textAlign: 'center',
            fontFamily: 'heading',
            gap: '4',
            mixBlendMode: 'color-burn',
            _dark: {
              mixBlendMode: 'difference',
            },
          })}
        >
          <h1
            className={css({
              lineHeight: '0.85',
              fontSize: {
                base: '7.5rem',
                sm: '8rem',
              },
              letterSpacing: '-0.05em',
            })}
          >
            Reo Hakuta
          </h1>
          <p
            className={css({
              fontSize: {
                base: 'xl',
                sm: '2xl',
              },
              letterSpacing: '-0.05em',
            })}
          >
            Frontend Developer, UI/UX Designer
          </p>
          <p
            className={css({
              mx: '4',
              fontSize: 'sm',
              fontFamily: 'code',
            })}
          >
             ReoHakase in  INTP on  NIT, Ibaraki College at \udb86\udcf6 19yo (04) ❯{' '}
            <Link
              href="https://github.com/ReoHakase"
              external
              referrerPolicy="no-referrer"
              className={css({ textDecoration: 'underline' })}
            >
               GitHub
            </Link>{' '}
            <Link
              href="https://instagram.com/reohakuta"
              external
              referrerPolicy="no-referrer"
              className={css({ textDecoration: 'underline' })}
            >
              \udb80\udefe Instagram
            </Link>{' '}
            <Link href="mailto:st20152ro@gm.ibaraki-ct.ac.jp" external className={css({ textDecoration: 'underline' })}>
              \udb83\udebb st20152ro@gm.ibaraki-ct.ac.jp
            </Link>
            <br />
            <Link href="/docs/example" className={css({ textDecoration: 'underline' })}>
              See MDX showcase
            </Link>
          </p>
        </hgroup>
      </div>
    </div>
  );
};
