import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from './MotionProvider';
import { useLocale } from '../hooks/useLocale';
import { BookingButton } from './BookingButton';
import { Icon } from './Icon';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [movieReady, setMovieReady] = useState(false);
  const { reduced, paused, toggle } = useMotion();
  const { path, t } = useLocale();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = section.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>('.cinema-sticky');
    if (!stage) return;
    const movie = video.current;
    const panels = Array.from(el.querySelectorAll<HTMLElement>('[data-scene]'));
    const posters = Array.from(el.querySelectorAll<HTMLElement>('[data-poster]'));
    const playhead = { progress: 0 };
    let tween: gsap.core.Tween | undefined;
    let failed = false;

    // Only issue the latest seek after the previous one completes. This avoids
    // piling up decoder work when the user scrolls faster than the video seeks.
    const seek = () => {
      if (!movie || failed || movie.seeking || movie.readyState < 2 || !Number.isFinite(movie.duration)) return;
      const time = playhead.progress * Math.max(0, movie.duration - 1 / 24);
      if (Math.abs(movie.currentTime - time) >= 1 / 48) movie.currentTime = time;
    };
    const render = () => {
      const p = playhead.progress;
      setActive(p < 0.32 ? 0 : p < 0.7 ? 1 : 2);
      const opacity = [
        1 - clamp((p - 0.2) / 0.12),
        Math.min(clamp((p - 0.24) / 0.12), clamp((0.76 - p) / 0.13)),
        clamp((p - 0.67) / 0.13)
      ];
      panels.forEach((panel, i) => {
        panel.style.opacity = String(opacity[i]);
        panel.style.visibility = opacity[i] < 0.02 ? 'hidden' : 'visible';
        panel.style.transform = `translate3d(${reduced ? 0 : (1 - opacity[i]) * (i === 1 ? 55 : -55)}px,0,0)`;
        panel.style.pointerEvents = opacity[i] > 0.45 ? 'auto' : 'none';
        (panel as any).inert = opacity[i] < 0.45;
        panel.setAttribute('aria-hidden', String(opacity[i] < 0.45));
      });
      posters.forEach((poster, i) => {
        poster.style.opacity = String(opacity[i]);
        poster.style.transform = `scale(${reduced ? 1 : 1.035 + p * 0.065})`;
      });
      el.style.setProperty('--story-progress', String(p));
      seek();
    };
    render();
    if (reduced) {
      setMovieReady(false);
      return;
    }

    // The same smoothed playhead drives the captions and video together.
    tween = gsap.to(playhead, {
      progress: 1,
      ease: 'none',
      onUpdate: render,
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.max(1, el.offsetHeight - stage.offsetHeight)}`,
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });

    let refreshFrame = 0;
    const layoutObserver = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => tween?.scrollTrigger?.refresh());
    });
    layoutObserver.observe(el);
    layoutObserver.observe(stage);
    let disposed = false;
    let priming = false;
    const ready = () => {
      if (disposed || failed || !movie || movie.readyState < 2) return;
      movie.pause();
      setMovieReady(true);
      seek();
    };
    const prime = () => {
      if (disposed || failed || priming || !movie) return;
      if (movie.readyState >= 2) {
        ready();
        return;
      }
      movie.muted = true;
      movie.defaultMuted = true;
      priming = true;
      movie
        .play()
        .then(() => {
          if (!disposed) ready();
        })
        .catch(() => {})
        .finally(() => {
          priming = false;
        });
    };
    const error = () => {
      failed = true;
      setMovieReady(false);
    };
    if (movie) {
      movie.addEventListener('loadedmetadata', seek);
      movie.addEventListener('loadeddata', ready);
      movie.addEventListener('canplay', ready);
      movie.addEventListener('seeked', seek);
      movie.addEventListener('error', error);
    }
    document.addEventListener('touchstart', prime, { passive: true });
    document.addEventListener('pointerdown', prime, { passive: true });
    if (movie && movie.readyState < 2) movie.load();
    prime();

    return () => {
      disposed = true;
      layoutObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      if (movie) {
        movie.removeEventListener('loadedmetadata', seek);
        movie.removeEventListener('loadeddata', ready);
        movie.removeEventListener('canplay', ready);
        movie.removeEventListener('seeked', seek);
        movie.removeEventListener('error', error);
        movie.pause();
      }
      document.removeEventListener('touchstart', prime);
      document.removeEventListener('pointerdown', prime);
    };
  }, [reduced]);

  function jump(i: number) {
    const el = section.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>('.cinema-sticky');
    if (!stage) return;
    const distance = el.offsetHeight - stage.offsetHeight;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + distance * [0, 0.49, 0.9][i],
      behavior: reduced ? 'auto' : 'smooth'
    });
  }

  return (
    <section
      className={`cinema mwc-cinema ${reduced ? 'is-static' : ''}`}
      ref={section}
      aria-label={t('Man With Class, en introduktion i tre kapitel', 'Man With Class, a story in three chapters')}
    >
      <div className="cinema-sticky">
        <div className="cinema-media" aria-hidden="true">
          {['salon-brand', 'hero-craft', 'salon-chair'].map((name, i) => (
            <img
              key={name}
              data-poster
              className={`cinema-poster poster-${i}`}
              src={`/images/${name}.webp`}
              srcSet={`/images/${name}-sm.webp 640w, /images/${name}.webp 1600w`}
              sizes="100vw"
              alt=""
              width="1600"
              height="1060"
              loading={i === 0 ? 'eager' : 'lazy'}
              {...({ fetchpriority: i === 0 ? 'high' : 'low' } as any)}
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
          {!reduced && (
            <video
              ref={video}
              className={movieReady ? 'movie-ready' : ''}
              src="/media/hero-manwithclass-scrub.mp4"
              preload="auto"
              playsInline
              muted
              disablePictureInPicture
              tabIndex={-1}
            />
          )}
        </div>
        <div className="cinema-shade" />
        <div className="cinema-topline">
          <span>
            <i /> STOCKHOLM / UPPLANDSGATAN 51
          </span>
          <span>ODENPLAN</span>
        </div>
        <div className="cinema-scenes container">
          <div className="cinema-scene scene-one" data-scene>
            <p className="eyebrow">MAN WITH CLASS / BARBERSHOP</p>
            <h1>
              {t('MER STIL.', 'MORE STYLE.')}
              <br />
              <span className="accent">{t('MER KLASS.', 'MORE CLASS.')}</span>
            </h1>
            <div className="hero-bottom-copy">
              <p>
                {t('Herrklippning. Skägg. Hantverk.', 'Haircuts. Beards. Craft.')}
                <br />
                {t('Din barbershop vid Odenplan.', 'Your barbershop at Odenplan.')}
              </p>
              <BookingButton />
            </div>
          </div>
          <div
            className="cinema-scene scene-two"
            data-scene
            style={{ opacity: 0, visibility: 'hidden' }}
            aria-hidden="true"
          >
            <p className="eyebrow">{t('02 / Salongen', '02 / The salon')}</p>
            <h2>
              {t('MITT VID', 'RIGHT AT')}
              <br />
              <span className="accent">ODENPLAN.</span>
            </h2>
            <p className="scene-description">
              Upplandsgatan 51.
              <br />
              {t('En stund för dig. Mitt i Vasastan.', 'A moment for you. In the heart of Vasastan.')}
            </p>
            <Link className="text-link" to={path('contact')}>
              {t('Hitta din väg hit', 'Find your way here')}
              <Icon />
            </Link>
          </div>
          <div
            className="cinema-scene scene-three"
            data-scene
            style={{ opacity: 0, visibility: 'hidden' }}
            aria-hidden="true"
          >
            <p className="eyebrow">03 / TAKE A SEAT</p>
            <h2>
              {t('DIN STOL.', 'YOUR CHAIR.')}
              <br />
              <span className="accent">{t('DIN STIL.', 'YOUR STYLE.')}</span>
            </h2>
            <p className="scene-description">
              {t('Från första klippet till sista detaljen.', 'From the first cut to the final detail.')}
            </p>
            <BookingButton />
          </div>
        </div>
        <span className="cinema-media-note">
          {movieReady
            ? 'Man With Class'
            : active === 0
            ? t('Tillfällig inspirationsbild', 'Temporary inspiration image')
            : t('Man With Class / salongen', 'Man With Class / the salon')}
        </span>
        <div className="cinema-bottom">
          <div className="chapter-nav" aria-label={t('Välj kapitel', 'Choose chapter')}>
            {[t('Hantverket', 'The craft'), 'Odenplan', t('Din stol', 'Your chair')].map((label, i) => (
              <button
                key={i}
                disabled={reduced}
                onClick={() => jump(i)}
                className={active === i ? 'active' : ''}
                aria-current={active === i ? 'step' : undefined}
              >
                <span>0{i + 1}</span>
                {label}
                <i />
              </button>
            ))}
          </div>
          <span className="scroll-cue">
            {t('SCROLLA FÖR ATT UPPTÄCKA', 'SCROLL TO DISCOVER')}
            <Icon name="down" />
          </span>
          <button
            className="motion-control"
            onClick={toggle}
            aria-pressed={paused}
            aria-label={paused ? t('Aktivera rörelse', 'Enable motion') : t('Pausa rörelse', 'Pause motion')}
          >
            <Icon name={paused ? 'play' : 'pause'} />
            <span>{paused ? t('Rörelse av', 'Motion off') : t('Pausa', 'Pause')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CinematicHero;
