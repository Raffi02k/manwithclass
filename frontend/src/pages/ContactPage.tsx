import { useLocale } from '../hooks/useLocale';
import { PageHero } from '../components/PageHero';
import { BookingButton } from '../components/BookingButton';
import { FAQ } from '../components/FAQ';
import { LocationSection } from '../components/LocationSection';
import { site } from '../content/site';
import { Icon } from '../components/Icon';

export function ContactPage() {
  const { lang, t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('Kontakt & hitta hit', 'Contact & find us')}
        title={
          <>
            {t('VI SES VID', 'SEE YOU AT')}
            <br />
            <span className="accent">ODENPLAN.</span>
          </>
        }
        description="Upplandsgatan 51 / 113 28 Stockholm"
      >
        <BookingButton />
      </PageHero>

      <section className="container section-space">
        <div className="mwc-contact-grid">
          <div>
            <p className="eyebrow">{t('Hör av dig', 'Get in touch')}</p>
            <h2>{t('SÄG HEJ.', 'SAY HELLO.')}</h2>
            <a className="contact-phone" href={site.phoneHref}>
              {site.phone}
              <Icon />
            </a>
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="prose">
              {t(
                'Frågor om en behandling? Ring eller mejla oss. Bokning och hantering av din tid sker via Bokadirekt.',
                'Questions about a treatment? Call or email us. Bookings and appointment management are handled through Bokadirekt.'
              )}
            </p>
            <div className="contact-socials">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" /> Instagram <Icon />
              </a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                Facebook <Icon />
              </a>
            </div>
          </div>

          <aside className="contact-hours">
            <p className="eyebrow">{t('Välkommen in', 'Step inside')}</p>
            <h3>{t('ÖPPETTIDER', 'OPENING HOURS')}</h3>
            {site.hours.map((h, i) => (
              <div className="footer-hours" key={i}>
                <span>{h.label[lang]}</span>
                <span>{h.value[lang]}</span>
              </div>
            ))}
            <p>
              {t(
                'Drop-in i mån av tid. Se lediga tider och eventuella avvikelser i bokningen.',
                'Walk-ins subject to availability. Check the booking service for available times and exceptions.'
              )}
            </p>
            <BookingButton />
          </aside>
        </div>

        <FAQ />
      </section>

      <LocationSection />
    </>
  );
}
