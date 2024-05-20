import type { ReactNode } from 'react';
import { Skeleton } from '@/features/navigation/components/Skeleton/Skeleton';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { markupBlockquote, markupHr } from 'styled-system/recipes';

const Document = (): ReactNode => {
  return (
    <main
      className={flex({
        maxW: '800px',
        w: 'full',
        flexGrow: '1',
        alignSelf: 'stretch',
        direction: 'column',
        justify: 'start',
        align: 'stretch',
        textAlign: 'start',
        lineHeight: '1.5',
        p: '6',
      })}
    >
      {/* <h1 className={markupHeading({ level: 'title' })}>{titleWithEmoji}</h1> */}
      <Skeleton
        inline
        level="title"
        className={css({
          w: 'full',
        })}
      />
      <blockquote className={markupBlockquote()}>
        <Skeleton
          inline
          lines={1}
          className={css({
            w: 'full',
          })}
        />
      </blockquote>
      <Skeleton
        inline
        className={css({
          alignSelf: 'end',
          w: '50%',
        })}
      />
      <hr className={markupHr()} />
      <p>
        <Skeleton
          inline
          lines={10}
          className={css({
            w: 'full',
          })}
        />
      </p>
    </main>
  );
};

export default Document;
