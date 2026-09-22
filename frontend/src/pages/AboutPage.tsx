import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Barbers } from '../components/Barbers';
import { PhotoPanel } from '../components/PhotoPanel';
import { BookingButton } from '../components/BookingButton';
import { Icon } from '../components/Icon';

export function AboutPage() {
  const { t, path } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('Om Man With Class', 'About Man With Class')}
        title={
          <>
            {t('KLASS I', 'CLASS IN')}
            <br />
            <span className="accent">{t('VARJE DETALJ.', 'EVERY DETAIL.')}</span>
          </>
        }
        description={t(
          'En barbershop vid Odenplan. En personlig stund. En stil som är din.',
          'A barbershop at Odenplan. A personal moment. A style that is yours.'
        )}
        image="/images/salon-brand.webp"
      />
      <section className="story-intro section-space">
        <div className="container editorial-grid">
          <Reveal>
            <p className="eyebrow">MAN WITH CLASS / VASASTAN</p>
            <h2>
              {t('DITT HÅR.', 'YOUR HAIR.')}
              <br />
              {t('DITT SKÄGG.', 'YOUR BEARD.')}
              <br />
              <span>{t('DITT UTTRYCK.', 'YOUR EXPRESSION.')}</span>
            </h2>
            <img
              className="about-chair"
              src="/images/salon-chair.webp"
              alt={t('Interiör med barberarstolar i Man With Class', 'Interior with barber chairs at Man With Class')}
              loading="lazy"
              width="800"
              height="1100"
            />
          </Reveal>
          <div className="prose">
            <p className="lead">
              {t(
                'En bra klippning börjar med att förstå personen i stolen.',
                'A good haircut begins with understanding the person in the chair.'
              )}
            </p>
            <p>
              {t(
                'Hos Man With Class vill vi ge plats för just det: dina önskemål, din vardag och din personliga stil. En lugn stund i salongen och ett omsorgsfullt arbete, från form till finish.',
                'At Man With Class, we make room for your preferences, your everyday life and your personal style. A relaxed moment in the salon and considered work, from shape to finish.'
              )}
            </p>
            <p>
              {t(
                'Du hittar oss på Upplandsgatan 51, vid Odenplan. Här finns herrklippning, barnklippning, skäggtrimning och traditionell rakning. För en längre stund i stolen finns Luxury och Royal Treatment.',
                'Find us at Upplandsgatan 51, by Odenplan. Our menu includes men’s and children’s haircuts, beard trims and traditional shaves. For a longer moment in the chair, explore Luxury and Royal Treatment.'
              )}
            </p>
            <img
              className="about-detail"
              src="/images/salon-products.webp"
              alt={t('Produkthylla i salongen', 'Products displayed in the salon')}
              width="1058"
              height="780"
              loading="lazy"
            />
            <Link className="text-link" to={path('services')}>
              {t('Utforska behandlingarna', 'Explore the treatments')}
              <Icon />
            </Link>
          </div>
        </div>
      </section>
      <Barbers />
      <PhotoPanel image="/images/salon-wide.webp">
        <p className="eyebrow">UPPLANDSGATAN 51</p>
        <h2>
          {t('SLÅ DIG NER.', 'TAKE A SEAT.')}
          <br />
          <span className="accent">{t('VAR DIG SJÄLV.', 'BE YOURSELF.')}</span>
        </h2>
        <BookingButton />
      </PhotoPanel>
    </>
  );
}

export default AboutPage;
