import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { Icon } from '../components/Icon';

export function NotFoundPage() {
  const { path, t } = useLocale();

  return (
    <section className="not-found container">
      <p className="eyebrow">404 / MAN WITH CLASS</p>
      <h1>
        {t('DEN SIDAN', 'THIS PAGE')}
        <br />
        <span className="accent">{t('FINNS INTE.', 'IS NOT HERE.')}</span>
      </h1>
      <p>{t('Låt oss hjälpa dig tillbaka till rätt stol.', 'Let us help you find your way back to the right chair.')}</p>
      <Link className="button button-primary" to={path('home')}>
        {t('Till startsidan', 'Back to home')}
        <Icon />
      </Link>
    </section>
  );
}
