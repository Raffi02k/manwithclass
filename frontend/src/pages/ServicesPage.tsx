import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { services, categories, priceLabel } from '../content/data';
import { PageHero } from '../components/PageHero';
import { BookingButton } from '../components/BookingButton';
import { FAQ } from '../components/FAQ';
import { Icon } from '../components/Icon';

export function ServicesPage() {
  const { lang, t, servicePath } = useLocale();
  const [filter, setFilter] = useState('all');

  const list = filter === 'all' ? services : services.filter(s => s.category === filter);

  return (
    <>
      <PageHero
        eyebrow={t('Tjänster & priser vid Odenplan', 'Services & prices at Odenplan')}
        title={
          <>
            {t('VÄLJ DIN', 'CHOOSE YOUR')}
            <br />
            <span className="accent">{t('NÄSTA LOOK.', 'NEXT LOOK.')}</span>
          </>
        }
        description={t(
          'Herrklippning, skäggtrimning och klassisk rakning vid Odenplan i Vasastan. Hitta din behandling och boka tid hos Man With Class på Upplandsgatan 51 i Stockholm.',
          'Men’s haircuts, beard grooming and traditional shaves at Odenplan in Vasastan. Find your treatment and book your visit at Man With Class on Upplandsgatan 51 in Stockholm.'
        )}
      >
        <BookingButton />
      </PageHero>
      <section className="container section-space">
        <div className="filter-tabs" role="group" aria-label={t('Filtrera tjänster', 'Filter services')}>
          {[['all', t('Alla', 'All')], ...Object.entries(categories).map(([key, value]) => [key, value[lang]])].map(
            ([key, label]) => (
              <button
                key={key}
                className={filter === key ? 'active' : ''}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            )
          )}
        </div>
        <div className="price-notice">
          <Icon name="check" />
          <p>
            {t(
              'Priser i SEK enligt Bokadirekt, kontrollerade 15 september 2026. Aktuellt slutpris visas i bokningen.',
              'Prices in SEK from Bokadirekt, checked 15 September 2026. The booking service shows the current final price.'
            )}
          </p>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {t('behandlingar', 'treatments')}
        </p>
        <div className="service-menu">
          {list.map((s, i) => (
            <article key={s.id} className="service-menu-row">
              <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
              <Link className="service-menu-photo" to={servicePath(s.id)} aria-label={s.title[lang]}>
                <img
                  src={s.image}
                  alt={(s.illustrative ? t('Inspirationsbild: ', 'Inspiration image: ') : '') + s.title[lang]}
                  width="440"
                  height="550"
                  loading="lazy"
                />
                <span className="service-photo-caption">
                  {t('Se behandlingen', 'View treatment')}
                  <Icon />
                </span>
                {s.illustrative && <span className="mini-image-label">{t('Inspiration', 'Inspiration')}</span>}
              </Link>
              <div className="service-menu-info">
                <p className="eyebrow">
                  {categories[s.category]?.[lang]} / {s.minutes} min •{' '}
                  {t('Odenplan, Vasastan', 'Odenplan, Vasastan')}
                </p>
                <h2>
                  <Link to={servicePath(s.id)}>{s.title[lang]}</Link>
                </h2>
                <p>{s.intro[lang]}</p>
                <Link className="text-link" to={servicePath(s.id)}>
                  {t('Det här ingår', 'What is included')}
                  <Icon name="arrowRight" />
                </Link>
              </div>
              <div className="service-menu-actions">
                <strong>{priceLabel(s, lang)}</strong>
                <BookingButton label={t('Boka', 'Book')} />
              </div>
            </article>
          ))}
        </div>
        <div className="booking-notice">
          <p>
            {t(
              'Osäker på vilken behandling du ska välja? Ring oss så hjälper vi dig att hitta rätt.',
              'Not sure which treatment to choose? Call us and we will help you find the right one.'
            )}
          </p>
          <a className="button button-outline" href="tel:+46709627503">
            <Icon name="phone" />
            070-962 75 03
          </a>
        </div>
        <FAQ />
      </section>
    </>
  );
}

export default ServicesPage;
