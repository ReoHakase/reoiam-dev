import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { Header } from '@/components/Header/Header';
import { AppProvider } from '@/providers';
import { fontVariables } from '@/styles/fonts';
import { css } from 'styled-system/css';
import '@/styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  // `next-themes`プロバイダによるHydration差分を無視するため`suppressHydrationWarning`を付加する
  // 参照: https://github.com/pacocoursey/next-themes/issues/152
  // 参照: https://github.com/khinshankhan/next-themes-app-dir-example
  <html lang="ja" suppressHydrationWarning className={fontVariables}>
    <head />
    <body
      className={css({
        display: 'flex',
        minHeight: 'screen',
        flexDirection: 'column',
        background: 'slate.2',
        color: 'slate.12',
        overflowX: 'hidden',
      })}
    >
      {/* Refer: https://vercel.com/docs/concepts/analytics/quickstart */}
      <Analytics />
      <AppProvider>
        <Header />
        <main
          className={css({
            display: 'flex',
            flexGrow: 1,
            minHeight: 'screen',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
          })}
        >
          {children}
        </main>
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;

// When VERCEL_URL is detected: https://${process.env.VERCEL_URL}
// If there's no environment variable VERCEL_URL is set, will always fallback to http://localhost:${process.env.PORT || 3000}.
// Refer: https://beta.nextjs.org/docs/api-reference/metadata#metadatabase
const domain = new URL(
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`,
);

export const metadata: Metadata = {
  metadataBase: domain,

  title: {
    default: 'reoiam-dev',
    template: '%s | reoiam-dev',
  },
  description:
    'reoiam-dev is an open-source web application template for Next.js, TypeScript, Tailwind CSS, and Vercel.',
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  openGraph: {
    // Open graph image will be provided via file-based configuration.
    // Refer: https://beta.nextjs.org/docs/api-reference/metadata#static-images
    type: 'website',
    locale: 'ja_JP',
    url: domain,
  },
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: colorTokens.keyplate.light['2'] }, // keyplate-light-2
  //   { media: '(prefers-color-scheme: dark)', color: colorTokens.keyplate.dark['2'] }, // keyplate-dark-2
  // ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};
