import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { site } from '../content/site';
import { Brand } from './Brand';
import { BookingButton } from './BookingButton';
import { Icon } from './Icon';

const nav = [
  { key: 'services', sv: 'Tjänster & priser', en: 'Services & prices' },
  { key: 'projects', sv: 'Projekt', en: 'Projects' },
  { key: 'about', sv: 'Om oss', en: 'Our story' },
  { key: 'gallery', sv: 'Galleri', en: 'Gallery' },
  { key: 'reviews', sv: 'Omdömen', en: 'Reviews' },
  { key: 'contact', sv: 'Hitta hit', en: 'Find us' }
];

export function Footer() {
  const { lang, path, t } = useLocale();

  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div>
          <p className="eyebrow">{t('Din nästa look börjar här.', 'Your next look starts here.')}</p>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-call"
          >
            {t('VI SES VID', 'SEE YOU IN')}
            <br />
            <span>{t('STOLEN.', 'THE CHAIR.')}</span>
            <Icon />
          </a>
        </div>
        <BookingButton />
      </div>
      <div className="footer-grid container">
        <div>
          <Brand large />
          <p>
            {t('Klippning. Skägg. Karaktär.', 'Hair. Beard. Character.')}
            <br />
            {t('Barberarhantverk vid Odenplan.', 'Barbering at Odenplan.')}
          </p>
          <a
            className="social-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagram" />
            @manwithclass.se
          </a>
        </div>
        <div>
          <h2>{t('Utforska', 'Explore')}</h2>
          {nav.map(n => (
            <Link key={n.key} to={path(n.key)}>
              {n[lang]}
            </Link>
          ))}
          <Link to={path('barbers')}>{t('Barberarna', 'Our barbers')}</Link>
        </div>
        <div>
          <h2>{t('Hitta oss', 'Visit us')}</h2>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            {site.address}
            <br />
            {site.postcode} {site.city}
          </a>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <h2>{t('Öppettider', 'Opening hours')}</h2>
          {site.hours.map((h, i) => (
            <div key={i} className="footer-hours">
              <span>{h.label[lang]}</span>
              <span>{h.value[lang]}</span>
            </div>
          ))}
          <small>{t('Se aktuella lediga tider på Bokadirekt.', 'See current availability on Bokadirekt.')}</small>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Man With Class</span>
        <Link to={path('privacy')}>{t('Integritet', 'Privacy')}</Link>
        <a
          href={site.creditUrl}
          className="agency-credit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t('Byggd av', 'Built by')}</span>
          <strong>
            Media
            <span>Magnet</span>
          </strong>
          <Icon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
