import type { ReactNode } from 'react';
import '@/styles/katex.css';

type DocsLayoutProps = {
  children: ReactNode;
};

const DocsLayout = ({ children }: DocsLayoutProps): ReactNode => children;

export default DocsLayout;
