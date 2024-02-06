import type { ReactNode } from 'react';
import { Sidebar } from '@/features/navigation/components/Sidebar/Sidebar';
import { css } from 'styled-system/css';
import '@/styles/katex.css';

type DocsLayoutProps = {
  children: ReactNode;
};

const DocsLayout = ({ children }: DocsLayoutProps): ReactNode => (
  <div
    className={css({
      position: 'relative',
      w: 'full',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'stretch',
      gap: '4',
      lgToXl: {
        gridTemplateColumns: '1fr auto 0',
      },
    })}
  >
    <Sidebar
      className={css({
        position: 'sticky',
        top: '0',
        left: '0',
        maxW: '80',
        minW: '60',
        w: 'full',
        lgDown: {
          display: 'none',
          srOnly: true,
        },
      })}
    />
    <div
      className={css({
        gridColumn: '2 / 3',
        w: 'full',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      })}
    >
      {children}
    </div>
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        xlDown: {
          display: 'none',
          srOnly: true,
        },
      })}
    >
      {/* Table of Content here */}
    </div>
  </div>
);

export default DocsLayout;
