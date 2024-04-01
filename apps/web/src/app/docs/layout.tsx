import type { ReactNode } from 'react';
import { Aurora } from '@/features/landingPage/components/Aurora/Aurora';
import { Navbar, NavbarButtonContainer } from '@/features/navigation/components/Navbar/Navbar';
import { Sidebar } from '@/features/navigation/components/Sidebar/Sidebar';
import { css } from 'styled-system/css';
import '@/styles/katex.css';

type DocsLayoutProps = {
  children: ReactNode;
  titleIndicator: ReactNode;
  pageSpecificNavigations: ReactNode;
};

const DocsLayout = ({ titleIndicator, pageSpecificNavigations, children }: DocsLayoutProps): ReactNode => (
  <>
    <Aurora />
    <div
      className={css({
        pos: 'relative',
        w: 'full',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'start',
        lgDown: {
          gridTemplateColumns: '0 100% 0',
          gap: '0',
        },
        lgToXl: {
          gridTemplateColumns: '1fr auto 0',
          gap: '4',
        },
        xl: {
          gridTemplateColumns: '1fr auto 1fr',
          gap: '4',
        },
      })}
    >
      <Navbar
        className={css({
          zIndex: '1',
        })}
      >
        {titleIndicator}
        <NavbarButtonContainer>{pageSpecificNavigations}</NavbarButtonContainer>
      </Navbar>
      <Sidebar
        className={css({
          w: 'full',
          maxW: '80',
          lgDown: {
            display: 'none',
          },
        })}
      />
      <div
        className={css({
          gridColumn: '2 / 3',
          w: {
            base: 'full',
            lg: '800px',
          },
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'center',
        })}
      >
        {children}
      </div>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
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
  </>
);

export default DocsLayout;
