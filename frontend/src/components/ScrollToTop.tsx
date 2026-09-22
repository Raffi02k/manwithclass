import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const raf = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        (document.querySelector('#main') as HTMLElement)?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
