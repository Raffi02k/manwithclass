import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { services, categories, priceLabel, ServiceItem } from '../content/data';
import { PageHero } from '../components/PageHero';
import { BookingButton } from '../components/BookingButton';
import { FAQ } from '../components/FAQ';
import { Icon } from '../components/Icon';

export interface ServicePageProps {
  service: ServiceItem;
}

export function ServicePage({ service: s }: ServicePageProps) {
  const { lang, t, path, servicePath } = useLocale();
  const related = services.filter(x => x.category === s.category && x.id !== s.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${categories[s.category]?.[lang]} • ${t('Odenplan, Vasastan', 'Odenplan, Vasastan')}`}
        title={s.title[lang].toUpperCase()}
        description={s.intro[lang]}
        image={s.image}
        illustrative={s.illustrative}
      >
        <p className="service-hero-facts">
          {s.minutes} min <span>/</span> {priceLabel(s, lang)} <span>/</span>{' '}
          {t('ODENPLAN, VASASTAN', 'ODENPLAN, VASASTAN')}
        </p>
      </PageHero>
      <section className="container section-space">
        <div className="service-detail-grid">
          <div>
            <p className="eyebrow">{t('Behandlingen', 'The treatment')}</p>
            <h2>
              {t('DET HÄR', 'HERE IS WHAT')}
              <br />
              <span className="accent">{t('INGÅR.', 'IS INCLUDED.')}</span>
            </h2>
            <ul className="detail-list">
              {s.includes?.[lang]?.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="service-location-card">
              <p className="eyebrow">{t('Plats & Salong', 'Location & Salon')}</p>
              <h3>{t('Barbershop vid Odenplan i Vasastan', 'Barbershop at Odenplan in Vasastan')}</h3>
              <p>
                {t(
                  'Behandlingen utförs i vår barbershop på Upplandsgatan 51 i Stockholm. Vi ligger precis vid Odenplan i hjärtat av Vasastan, endast 2 minuters promenad från tunnelbana och pendeltåg. Välj din behandling och boka tid smidigt online via Bokadirekt.',
                  'This treatment is performed at our barbershop at Upplandsgatan 51 in Stockholm. We are located right at Odenplan in the heart of Vasastan, just a 2-minute walk from the metro and commuter train. Choose your treatment and book easily online via Bokadirekt.'
                )}
              </p>
            </div>
            <Link className="text-link" to={path('services')}>
              <Icon name="arrowLeft" />
              {t('Till alla tjänster & priser', 'Back to all services & prices')}
            </Link>
          </div>
          <aside className="booking-card">
            <p className="eyebrow">
              MAN WITH CLASS / ODENPLAN / {s.minutes} MIN
            </p>
            <strong>{priceLabel(s, lang)}</strong>
            <p>{t('Välj barberare och se lediga tider i bokningen.', 'Choose your barber and check availability in the booking service.')}</p>
            <BookingButton />
            <p className="content-note">
              {t(
                'Du bokar via Bokadirekt. Priset kontrollerades 2026-09-15. Aktuellt slutpris och villkor visas där.',
                'Booking is through Bokadirekt. Price checked 2026-09-15. Current final price and conditions are shown there.'
              )}
            </p>
          </aside>
        </div>
        {related.length > 0 && (
          <div className="related-services">
            <p className="eyebrow">{t('Upptäck också', 'You may also like')}</p>
            {related.map(x => (
              <Link key={x.id} to={servicePath(x.id)}>
                <h3>{x.title[lang]}</h3>
                <span>{priceLabel(x, lang)}</span>
                <Icon />
              </Link>
            ))}
          </div>
        )}
        <FAQ />
      </section>
    </>
  );
}

export default ServicePage;
