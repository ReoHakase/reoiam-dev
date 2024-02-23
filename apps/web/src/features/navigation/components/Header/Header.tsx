import { GithubIcon } from 'lucide-react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { ThemeSelect } from '../ThemeSelect/ThemeSelect';
import { Image } from '@/components/Image/Image';
import { Link } from '@/components/Link/Link';
import HeaderIconImage from '@public/icon.webp';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
export type HeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * Renders a header.
 */
export const Header = ({ ...props }: HeaderProps): ReactNode => {
  return (
    <header
      className={flex({
        pos: 'sticky',
        w: '100%',
        top: '0',
        left: '0',
        zIndex: '100',
        direction: 'row',
        justify: 'space-between',
        align: 'center',
        p: '4',
        gap: '6',
      })}
      {...props}
    >
      <div
        className={flex({
          direction: 'row',
          justify: 'start',
          align: 'center',
          gap: '6',
        })}
      >
        <Link
          href="/"
          className={css({
            rounded: 'full',
            flexShrink: '0',
          })}
        >
          <Image
            src={HeaderIconImage}
            css={[
              {
                rounded: 'full',
                w: '12',
                h: '12',
                flexShrink: '0',
              },
            ]}
            alt="An Icon of ReoHakase"
            sizes="48px"
            placeholder="blur"
          />
        </Link>
        <p
          className={css({
            rounded: 'sm',
            fontFamily: 'heading',
            maxW: '12rem',
            lineHeight: '1.25',
            // backdropFilter: 'blur(8px) saturate(130%) contrast(30%) brightness(150%)',
          })}
        >
          reoiam.dev
          <br />
          Reo HAKUTA
        </p>
      </div>
      <div
        className={flex({
          direction: 'row',
          justify: 'end',
          align: 'center',
          grow: '1',
          gap: '2',
        })}
      >
        <ThemeSelect />
        <Link
          href="https://github.com/ReoHakase"
          external
          referrerPolicy="no-referrer"
          className={flex({
            fontFamily: 'heading',
            px: '4',
            py: '2',
            gap: '3',
            direction: 'row',
            align: 'center',
            bg: 'keyplate.12',
            color: 'keyplate.1',
            rounded: 'full',
          })}
        >
          <GithubIcon />
          <span>
            <span className={css({ smDown: { display: 'none' } })}>Open </span>GitHub
          </span>
        </Link>
      </div>
    </header>
  );
};
