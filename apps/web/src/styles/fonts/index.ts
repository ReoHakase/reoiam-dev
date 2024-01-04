import localFont from 'next/font/local';

export const calSans = localFont({
  src: './CalSans-SemiBold.woff2',
  display: 'swap',
  variable: '--font-cal-sans',
});

export const geistMono = localFont({
  src: './GeistMonoNerdFontMono-Regular.woff2',
  display: 'swap',
  variable: '--font-geist-mono',
  preload: false,
});

export const fontVariables = `${calSans.variable} ${geistMono.variable}`;
