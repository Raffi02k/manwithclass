import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { CinematicHero } from '../components/CinematicHero';
import { ServicesPreview } from '../components/ServicesPreview';
import { GalleryRail } from '../components/GalleryRail';
import { Barbers } from '../components/Barbers';
import { PhotoPanel } from '../components/PhotoPanel';
import { ReviewsRail } from '../components/ReviewsRail';
import { LocationSection } from '../components/LocationSection';
import { Icon } from '../components/Icon';

export function HomePage() {
  const { t, path } = useLocale();

  const tickerItems = [
    'PRECISION IN EVERY CUT',
    'UPPLANDSGATAN 51',
    'HERRKLIPPNING',
    'CLASSIC CRAFT. PERSONAL STYLE.',
    'SKÄGGTRIMNING',
    'ODENPLAN',
    'TRADITIONELL RAKNING',
    'VASASTAN',
    'KLASSISK BARBERSHOP',
    'STOCKHOLM',
    'BOKA TID VIA BOKADIREKT',
    'MAN WITH CLASS'
  ];

  return (
    <>
      <CinematicHero />
      <div className="craft-strip" aria-hidden="true">
        <div className="craft-ticker-row">
          <div className="craft-ticker-track scroll-left">
            {[0, 1].map(half => (
              <div key={half} className="craft-ticker-group">
                {[0, 1]
                  .flatMap(() => tickerItems)
                  .map((item, idx) => (
                    <span key={idx} className="craft-ticker-item">
                      <span>{item}</span>
                      <i />
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ServicesPreview />
      <GalleryRail />
      <Barbers />
      <PhotoPanel image="/images/salon-work.webp" className="gallery-film">
        <p className="eyebrow">{t('Bakom stolen / Hantverket', 'Behind the chair / The craft')}</p>
        <h2>
          LESS TALK.
          <br />
          <span className="outline">MORE DETAIL.</span>
        </h2>
        <Link className="button button-primary" to={path('gallery')}>
          {t('Se salongen & galleriet', 'Explore the salon & gallery')}
          <Icon />
        </Link>
        <span className="panel-caption">MAN WITH CLASS / STOCKHOLM</span>
      </PhotoPanel>
      <ReviewsRail />
      <LocationSection />
    </>
  );
}

export default HomePage;
