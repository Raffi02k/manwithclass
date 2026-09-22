import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services, categories, priceLabel } from '../content/data';
import { useLocale } from '../hooks/useLocale';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function ServicesPreview() {
  const [active, setActive] = useState(0);
  const featured = services.slice(0, 4);
  const { lang, t, path, servicePath } = useLocale();

  return (
    <section className="services-preview section-space" id="priser">
      <div className="container services-split">
        <div className="services-photo">
          {featured.map((s, i) => (
            <img
              key={s.id}
              className={`service-preview-photo ${i === active ? 'is-active' : ''}`}
              src={s.image}
              alt={
                i === active
                  ? (s.illustrative ? t('Tillfällig inspirationsbild för ', 'Temporary inspiration image for ') : '') +
                    s.title[lang]
                  : ''
              }
              aria-hidden={i !== active}
              width="650"
              height="850"
              loading="lazy"
            />
          ))}
          <div className="services-photo-shade" />
          <span className="eyebrow">THE CRAFT / THE DETAILS</span>
          <h2>
            LOOK GOOD.
            <br />
            <span>FEEL BETTER.</span>
          </h2>
          <div className="services-stamp">
            MW
            <span>ODENPLAN</span>
          </div>
          {featured[active]?.illustrative && (
            <span className="image-label">{t('Tillfällig inspirationsbild', 'Temporary inspiration image')}</span>
          )}
        </div>
        <div className="services-copy">
          <Reveal>
            <p className="eyebrow">{t('Tjänster & priser', 'The service menu')}</p>
            <h2>
              {t('HANTVERK.', 'GOOD CRAFT.')}
              <br />
              <span className="accent">{t('INGA GENVÄGAR.', 'NO SHORTCUTS.')}</span>
            </h2>
            <p>{t('Välj din behandling. Vi tar hand om detaljerna.', 'Choose your treatment. We take care of the details.')}</p>
          </Reveal>
          <div className="service-preview-list">
            {featured.map((s, i) => (
              <Link
                key={s.id}
                to={servicePath(s.id)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="service-number">0{i + 1}</span>
                <div>
                  <h3>{s.title[lang]}</h3>
                  <p>
                    {categories[s.category]?.[lang]} / {s.minutes} min
                  </p>
                </div>
                <span className="service-price">{priceLabel(s, lang)}</span>
                <Icon />
              </Link>
            ))}
          </div>
          <div className="service-list-footer">
            <Link className="button button-outline" to={path('services')}>
              {t('Alla tjänster & priser', 'All services & prices')}
              <Icon />
            </Link>
            <p>
              {t('Priser enligt Bokadirekt, kontrollerade 2026-09-15.', 'Prices from Bokadirekt, checked 2026-09-15.')}
              <br />
              {t('Aktuellt pris och lediga tider visas i bokningen.', 'See the booking service for current prices and availability.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
