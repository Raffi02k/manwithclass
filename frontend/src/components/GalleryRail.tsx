import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useMotion } from './MotionProvider';
import { gallery } from '../content/data';
import { GalleryCard } from './GalleryGrid';
import { Lightbox } from './Lightbox';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function GalleryRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const { path, t } = useLocale();
  const { reduced } = useMotion();

  return (
    <section className="chair-section section-space">
      <div className="section-heading container">
        <Reveal>
          <p className="eyebrow">THE CHAIR / MAN WITH CLASS</p>
          <h2>
            {t('EN STOL.', 'ONE CHAIR.')}
            <br />
            <span className="outline">{t('DIN BERÄTTELSE.', 'YOUR STORY.')}</span>
          </h2>
        </Reveal>
        <div>
          <p>{t('Platsen. Stilen. De små detaljerna.', 'The space. The style. The little details.')}</p>
          <div className="rail-controls">
            <span>{t('Svep för fler bilder', 'Swipe to explore')}</span>
            {[-1, 1].map(dir => (
              <button
                key={dir}
                className="icon-button"
                onClick={() =>
                  rail.current?.scrollBy({
                    left: dir * rail.current.clientWidth * 0.72,
                    behavior: reduced ? 'instant' : 'smooth'
                  })
                }
                aria-label={dir === -1 ? t('Föregående bilder', 'Previous images') : t('Nästa bilder', 'Next images')}
              >
                <Icon name={dir === -1 ? 'arrowLeft' : 'arrowRight'} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="chair-rail"
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label={t('Salongens bildgalleri', 'Salon photo gallery')}
      >
        {gallery.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} onClick={() => setIndex(i)} />
        ))}
      </div>
      <div className="container rail-foot">
        <span>{t('Klippningar, skägg och livet i salongen.', 'Haircuts, beards and life at the salon.')}</span>
        <Link className="text-link" to={path('gallery')}>
          {t('Hela galleriet', 'Explore the gallery')}
          <Icon />
        </Link>
      </div>
      <Lightbox items={gallery} index={index} setIndex={setIndex} />
    </section>
  );
}

export default GalleryRail;
