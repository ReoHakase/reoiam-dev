import { GithubIcon } from 'lucide-react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
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
        position: 'sticky',
        width: '100%',
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
          sizes={{
            default: '10vw',
            md: '7.5vw',
            lg: '5vw',
          }}
          placeholder="blur"
        />
        <p
          className={css({
            rounded: 'sm',
            fontFamily: 'heading',
            maxWidth: '12rem',
            lineHeight: '1.25',
            // backdropFilter: 'blur(8px) saturate(130%) contrast(30%) brightness(150%)',
          })}
        >
          reoiam.dev/
          <br />
          home
        </p>
      </div>
      <div
        className={flex({
          direction: 'row',
          justify: 'end',
          align: 'center',
          grow: '1',
        })}
      >
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
            bg: 'slate.12',
            color: 'slate.1',
            rounded: 'full',
          })}
        >
          <GithubIcon /> Open GitHub
        </Link>
      </div>
    </header>
  );
};
