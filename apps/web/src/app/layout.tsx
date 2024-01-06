import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { Header } from '@/components/Header/Header';
import { AppProvider } from '@/providers';
import { fontVariables } from '@/styles/fonts';
import { baseUrl } from '@/utils/routes/baseUrl';
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
        background: 'keyplate.2',
        color: 'keyplate.12',
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

const defaultTitle = 'Reo Hakuta | reoiam.dev' as const;
const defaultDescription =
  'Reo Hakuta (\'04🇯🇵) is a frontend developer / UI-UX designer / CS student based in Japan. printf("Hello world");' as const;

export const metadata: Metadata = {
  metadataBase: baseUrl,

  title: {
    default: defaultTitle,
    template: '%s | reoiam.dev',
  },
  description:
    'Reo Hakuta (\'04🇯🇵) is a frontend developer / UI-UX designer / CS student based in Japan. printf("Hello world");',
  openGraph: {
    // Open graph image will be provided via file-based configuration.
    // Refer: https://beta.nextjs.org/docs/api-reference/metadata#static-images
    type: 'website',
    locale: 'en_US',
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};
