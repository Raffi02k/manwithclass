import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetadata, renderHead } from '../content/seo';

export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getMetadata(pathname);
    document.documentElement.lang = meta.lang;
    const template = document.createElement('template');
    template.innerHTML = renderHead(pathname);
    document.head
      .querySelectorAll(
        'title,meta[name="description"],meta[name="robots"],meta[name^="twitter:"],meta[property^="og:"],link[rel="canonical"],link[rel="alternate"][hreflang],#structured-data'
      )
      .forEach(el => el.remove());
    document.head.append(...Array.from(template.content.childNodes));
  }, [pathname]);

  return null;
}

export default PageMeta;
