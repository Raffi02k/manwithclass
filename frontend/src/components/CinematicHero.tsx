import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useMotion } from './MotionProvider';
import { BookingButton } from './BookingButton';
import { Icon } from './Icon';
import { site } from '../content/site';

export function CinematicHero() {
  const { path, t } = useLocale();
  const { reduced, paused, toggle } = useMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (reduced || paused) {
      vid.pause();
    } else {
      vid.play().catch(() => {
        // Autoplay may be restricted before interaction; muted allows standard autoplay
      });
    }
  }, [reduced, paused]);

  const scrollToContent = () => {
    const nextSection = document.querySelector('.craft-strip') || document.querySelector('.services-preview');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      className="hero-video mwc-hero-video"
      aria-label={t('Välkommen till Man With Class', 'Welcome to Man With Class')}
    >
      {/* Ambient Looping Video & Poster Fallback */}
      <div className="hero-video__bg" aria-hidden="true">
        <img
          src="/images/salon-brand.webp"
          alt=""
          className={`hero-video__poster ${videoLoaded && !reduced && !paused ? 'is-faded' : ''}`}
          width="1600"
          height="1060"
          loading="eager"
          {...({ fetchpriority: 'high' } as any)}
        />
        {!reduced && (
          <video
            ref={videoRef}
            src="/media/hero-manwithclass-scrub.mp4"
            poster="/images/salon-brand.webp"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            onPlaying={() => setVideoLoaded(true)}
            onCanPlay={() => {
              if (videoRef.current && !paused) {
                videoRef.current.play().catch(() => {});
              }
            }}
            className={videoLoaded && !paused ? 'is-playing' : ''}
          />
        )}
      </div>

      <div className="hero-video__overlay" aria-hidden="true" />

      {/* Hero Content - Everything visible on the first screen */}
      <div className="hero-video__content container">
        {/* Topline Badge */}
        <div className="hero-video__topline">
          <span className="hero-video__topline-dot" />
          <span>{site.city.toUpperCase()} • {site.address.toUpperCase()} • ODENPLAN</span>
        </div>

        {/* Brand Logo */}
        <Link to={path('home')} className="hero-video__logo-link" aria-label="Man With Class Barbershop">
          <img
            src="/images/logo.webp"
            alt="Man With Class Barbershop"
            className="hero-video__logo"
            width="340"
            height="214"
          />
        </Link>

        {/* Primary Heading - What they do & Where */}
        <h1 className="hero-video__title">
          {t('BARBERSHOP & HERRKLIPPNING', 'BARBERSHOP & MEN’S GROOMING')}
          <br />
          <span>{t('VID ODENPLAN', 'AT ODENPLAN')}</span>
        </h1>

        {/* Clear subtitle explaining craft & exact address */}
        <p className="hero-video__subtitle">
          {t(
            'Specialister på herrklippning, skäggvård och traditionell knivrakning på Upplandsgatan 51 i Stockholm.',
            'Specialists in precision haircuts, beard grooming and traditional hot towel shaving on Upplandsgatan 51 in Stockholm.'
          )}
        </p>

        {/* Call to Actions */}
        <div className="hero-video__ctas">
          <BookingButton
            label={t('Boka din tid', 'Book your visit')}
            className="hero-video__cta hero-video__cta--primary"
          />
          <Link
            to={path('services')}
            className="button hero-video__cta hero-video__cta--secondary"
          >
            <span>{t('Tjänster & priser', 'Services & prices')}</span>
            <Icon />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="hero-video__trust">
          <span className="hero-video__trust-stars" aria-hidden="true">★★★★★</span>
          <span>
            {site.bookingRating} / 5 ({site.bookingRatingCount} {t('betyg på Bokadirekt', 'ratings on Bokadirekt')})
          </span>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="hero-video__bottom">
        <button
          className="hero-video__scroll-cue"
          onClick={scrollToContent}
          aria-label={t('Scrolla ner till innehåll', 'Scroll down to content')}
        >
          <span>{t('SCROLLA FÖR ATT UPPTÄCKA', 'SCROLL TO EXPLORE')}</span>
          <Icon name="down" />
        </button>
      </div>

      {/* Motion/Video toggle */}
      <button
        className="hero-video__motion-btn"
        onClick={toggle}
        aria-pressed={paused}
        aria-label={paused ? t('Aktivera video', 'Play video') : t('Pausa video', 'Pause video')}
      >
        <Icon name={paused ? 'play' : 'pause'} />
        <span>{paused ? t('Video av', 'Video off') : t('Pausa', 'Pause')}</span>
      </button>
    </section>
  );
}

export default CinematicHero;

