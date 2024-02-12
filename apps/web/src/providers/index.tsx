'use client';

import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <JotaiProvider>
    <ThemeProvider attribute="data-theme">{children}</ThemeProvider>
  </JotaiProvider>
);
