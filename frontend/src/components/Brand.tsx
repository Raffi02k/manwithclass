import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export interface BrandProps {
  large?: boolean;
}

export function Brand({ large = false }: BrandProps) {
  const { path, t } = useLocale();
  const { pathname } = useLocation();

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (pathname !== path('home')) return;
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  };

  return (
    <Link
      className={`brand mwc-brand ${large ? 'brand-large' : ''}`}
      to={path('home')}
      onClick={scrollToTop}
      aria-label={t('Man With Class, startsida', 'Man With Class, home')}
    >
      <img src="/images/logo.webp" alt="Man With Class Barbershop" width="300" height="189" />
    </Link>
  );
}

export default Brand;
