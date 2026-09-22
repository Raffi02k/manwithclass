import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageMeta } from './PageMeta';
import { ScrollToTop } from './ScrollToTop';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <PageMeta />
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
