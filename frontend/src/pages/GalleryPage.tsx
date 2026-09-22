import { useLocale } from '../hooks/useLocale';
import { PageHero } from '../components/PageHero';
import { GalleryGrid } from '../components/GalleryGrid';
import { site } from '../content/site';
import { Icon } from '../components/Icon';

export function GalleryPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('Galleri', 'Gallery')}
        title={
          <>
            {t('STOLEN. STILEN.', 'THE CHAIR. THE STYLE.')}
            <br />
            <span className="accent">{t('STUNDERNA.', 'THE MOMENTS.')}</span>
          </>
        }
        description={t(
          'En inblick i salongen och känslan bakom Man With Class. Klicka på en bild för att se den större.',
          'A look inside the salon and the feeling behind Man With Class. Select a photo to take a closer look.'
        )}
        image="/images/salon-chair.webp"
      />

      <section className="container section-space">
        <GalleryGrid />
        <p className="content-note">
          {t(
            'Klippningar, skägg och glimtar från salongen hos Man With Class.',
            'Haircuts, beards and glimpses of the salon at Man With Class.'
          )}
        </p>
        <a className="text-link" href={site.instagram} target="_blank" rel="noopener noreferrer">
          <Icon name="instagram" />
          {t('Följ oss på Instagram', 'Follow us on Instagram')}
          <Icon />
        </a>
      </section>
    </>
  );
}
