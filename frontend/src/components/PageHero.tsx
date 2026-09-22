import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { Icon } from './Icon';

export interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  children?: ReactNode;
  illustrative?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image = '/images/salon-wide.webp',
  children,
  illustrative = false
}: PageHeroProps) {
  const { path, t } = useLocale();

  return (
    <section className="page-hero">
      <img src={image} alt="" width="1440" height="900" {...({ fetchpriority: 'high' } as any)} />
      <div className="page-hero-shade" />
      <div className="container">
        <nav aria-label={t('Brödsmulor', 'Breadcrumb')}>
          <Link to={path('home')} className="breadcrumb">
            Man With Class <Icon name="arrowRight" /> {eyebrow}
          </Link>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="page-hero-description">{description}</p>}
        {children}
      </div>
      {illustrative && (
        <span className="image-label">{t('Tillfällig inspirationsbild', 'Temporary inspiration image')}</span>
      )}
    </section>
  );
}

export default PageHero;
