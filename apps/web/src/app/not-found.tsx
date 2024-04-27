import type { ReactNode } from 'react';
import { Image } from '@/components/Image/Image';
import { Link } from '@/components/Link/Link';
import { Aurora } from '@/features/landingPage/components/Aurora/Aurora';
import NotFoundImage from '@public/404.webp';
import { css } from 'styled-system/css';

const Document = (): ReactNode => {
  return (
    <>
      <Aurora />
      <main
        className={css({
          w: 'full',
          minH: 'calc(100svh - token(sizes.20))',
          pt: '-20',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '6',
        })}
      >
        <Image
          priority
          src={NotFoundImage}
          alt="404 Not Found"
          placeholder="blur"
          sizes={{
            default: '100vw',
            sm: '80vw',
            md: '60vw',
            lg: '40vw',
          }}
          className={css({
            w: 'full',
            h: 'auto',
            maxW: '800px',
          })}
        />
        <h2
          className={css({
            fontFamily: 'heading',
            color: 'keyplate.11',
            textAlign: 'center',
            my: '4',
            fontSize: 'lg',
          })}
        >
          Unable to find the document you are looking for.
        </h2>
        <small
          className={css({
            color: 'keyplate.11',
            fontSize: 'sm',
            textAlign: 'center',
          })}
        >
          The 404 logo is designed by{' '}
          <Link
            href="https://github.com/SAWARATSUKI/ServiceLogos"
            external
            className={css({ textDecoration: 'underline' })}
          >
            @Sawaratsuki
          </Link>{' '}
          and shared under CC BY-NC-SA 4.0 DEED.
        </small>
      </main>
    </>
  );
};

export default Document;
