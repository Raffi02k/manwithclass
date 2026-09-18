import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import { useMotion } from './MotionProvider.js';
import { useLocale } from '../hooks/useLocale.js';
import { BookingButton } from './Shell.js';
import { Icon } from './Icon.js';

const clamp = (value) => Math.max(0, Math.min(1, value));

export function CinematicHero() {
    const section = useRef(null);
    const video = useRef(null);
    const [active, setActive] = useState(0);
    const [movieReady, setMovieReady] = useState(false);
    const { reduced, paused, toggle } = useMotion();
    const { path, t } = useLocale();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = section.current;
        const stage = el.querySelector('.cinema-sticky');
        const movie = video.current;
        const panels = Array.from(el.querySelectorAll('[data-scene]'));
        const posters = Array.from(el.querySelectorAll('[data-poster]'));
        const playhead = { progress: 0 };
        let tween;
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
            setActive(p < .32 ? 0 : p < .7 ? 1 : 2);
            const opacity = [1 - clamp((p - .20) / .12), Math.min(clamp((p - .24) / .12), clamp((.76 - p) / .13)), clamp((p - .67) / .13)];
            panels.forEach((panel, i) => {
                panel.style.opacity = String(opacity[i]);
                panel.style.visibility = opacity[i] < .02 ? 'hidden' : 'visible';
                panel.style.transform = `translate3d(${reduced ? 0 : (1 - opacity[i]) * (i === 1 ? 55 : -55)}px,0,0)`;
                panel.style.pointerEvents = opacity[i] > .45 ? 'auto' : 'none';
                panel.inert = opacity[i] < .45;
                panel.setAttribute('aria-hidden', String(opacity[i] < .45));
            });
            posters.forEach((poster, i) => {
                poster.style.opacity = String(opacity[i]);
                poster.style.transform = `scale(${reduced ? 1 : 1.035 + p * .065})`;
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
                scrub: .5,
                invalidateOnRefresh: true
            }
        });
        // CSS edits and responsive layout changes can alter the scroll distance
        // without a window resize. Keep the video mapped to the full sticky range.
        let refreshFrame = 0;
        const layoutObserver = new ResizeObserver(() => {
            cancelAnimationFrame(refreshFrame);
            refreshFrame = requestAnimationFrame(() => tween.scrollTrigger.refresh());
        });
        layoutObserver.observe(el);
        layoutObserver.observe(stage);
        let disposed = false;
        let priming = false;
        const ready = () => {
            if (disposed || failed || movie.readyState < 2) return;
            // Decode a first frame on mobile, then hand playback back to scrolling.
            movie.pause();
            setMovieReady(true);
            seek();
        };
        const prime = () => {
            if (disposed || failed || priming) return;
            if (movie.readyState >= 2) { ready(); return; }
            movie.muted = true;
            movie.defaultMuted = true;
            priming = true;
            movie.play().then(() => {
                if (!disposed) ready();
            }).catch(() => {
                // Mobile power/data-saving modes may require the first touch.
            }).finally(() => { priming = false; });
        };
        const error = () => { failed = true; setMovieReady(false); };
        movie.addEventListener('loadedmetadata', seek);
        movie.addEventListener('loadeddata', ready);
        movie.addEventListener('canplay', ready);
        movie.addEventListener('seeked', seek);
        movie.addEventListener('error', error);
        document.addEventListener('touchstart', prime, { passive: true });
        document.addEventListener('pointerdown', prime, { passive: true });
        // preload alone is only a hint on iOS; explicitly start the media loader.
        if (movie.readyState < 2) movie.load();
        prime();

        return () => {
            disposed = true;
            layoutObserver.disconnect();
            cancelAnimationFrame(refreshFrame);
            tween.scrollTrigger?.kill();
            tween.kill();
            movie.removeEventListener('loadedmetadata', seek);
            movie.removeEventListener('loadeddata', ready);
            movie.removeEventListener('canplay', ready);
            movie.removeEventListener('seeked', seek);
            movie.removeEventListener('error', error);
            document.removeEventListener('touchstart', prime);
            document.removeEventListener('pointerdown', prime);
            movie.pause();
        };
    }, [reduced]);

    function jump(i) {
        const el = section.current;
        const distance = el.offsetHeight - el.querySelector('.cinema-sticky').offsetHeight;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + distance * [0, .49, .9][i], behavior: reduced ? 'auto' : 'smooth' });
    }

    return (
        <section className={`cinema mwc-cinema ${reduced ? 'is-static' : ''}`} ref={section} aria-label={t('Man With Class, en introduktion i tre kapitel', 'Man With Class, a story in three chapters')}>
            <div className="cinema-sticky">
                <div className="cinema-media" aria-hidden="true">
                    {['salon-brand', 'hero-craft', 'salon-chair'].map((name, i) => (
                        <img key={name} data-poster className={`cinema-poster poster-${i}`} src={`/images/${name}.webp`} srcSet={`/images/${name}-sm.webp 640w, /images/${name}.webp 1600w`} sizes="100vw" alt="" width="1600" height="1060" fetchpriority={i === 0 ? 'high' : 'low'} loading={i === 0 ? 'eager' : 'lazy'} style={{ opacity: i === 0 ? 1 : 0 }} />
                    ))}
                    {!reduced && <video ref={video} className={movieReady ? 'movie-ready' : ''} src="/media/hero-manwithclass-scrub.mp4" preload="auto" playsInline muted disablePictureInPicture tabIndex={-1} />}
                </div>
                <div className="cinema-shade" />
                <div className="cinema-topline"><span><i /> STOCKHOLM / UPPLANDSGATAN 51</span><span>ODENPLAN</span></div>
                <div className="cinema-scenes container">
                    <div className="cinema-scene scene-one" data-scene>
                        <p className="eyebrow">MAN WITH CLASS / BARBERSHOP</p>
                        <h1>{t('MER STIL.', 'MORE STYLE.')}<br /><span className="accent">{t('MER KLASS.', 'MORE CLASS.')}</span></h1>
                        <div className="hero-bottom-copy"><p>{t('Herrklippning. Skägg. Hantverk.', 'Haircuts. Beards. Craft.')}<br />{t('Din barbershop vid Odenplan.', 'Your barbershop at Odenplan.')}</p><BookingButton /></div>
                    </div>
                    <div className="cinema-scene scene-two" data-scene style={{ opacity: 0, visibility: 'hidden' }} aria-hidden="true">
                        <p className="eyebrow">{t('02 / Salongen', '02 / The salon')}</p>
                        <h2>{t('MITT VID', 'RIGHT AT')}<br /><span className="accent">ODENPLAN.</span></h2>
                        <p className="scene-description">Upplandsgatan 51.<br />{t('En stund för dig. Mitt i Vasastan.', 'A moment for you. In the heart of Vasastan.')}</p>
                        <Link className="text-link" to={path('contact')}>{t('Hitta din väg hit', 'Find your way here')}<Icon /></Link>
                    </div>
                    <div className="cinema-scene scene-three" data-scene style={{ opacity: 0, visibility: 'hidden' }} aria-hidden="true">
                        <p className="eyebrow">03 / TAKE A SEAT</p>
                        <h2>{t('DIN STOL.', 'YOUR CHAIR.')}<br /><span className="accent">{t('DIN STIL.', 'YOUR STYLE.')}</span></h2>
                        <p className="scene-description">{t('Från första klippet till sista detaljen.', 'From the first cut to the final detail.')}</p>
                        <BookingButton />
                    </div>
                </div>
                <span className="cinema-media-note">{movieReady ? 'Man With Class' : active === 0 ? t('Tillfällig inspirationsbild', 'Temporary inspiration image') : t('Man With Class / salongen', 'Man With Class / the salon')}</span>
                <div className="cinema-bottom">
                    <div className="chapter-nav" aria-label={t('Välj kapitel', 'Choose chapter')}>
                        {[t('Hantverket', 'The craft'), 'Odenplan', t('Din stol', 'Your chair')].map((label, i) => <button key={i} disabled={reduced} onClick={() => jump(i)} className={active === i ? 'active' : ''} aria-current={active === i ? 'step' : undefined}><span>0{i + 1}</span>{label}<i /></button>)}
                    </div>
                    <span className="scroll-cue">{t('SCROLLA FÖR ATT UPPTÄCKA', 'SCROLL TO DISCOVER')}<Icon name="down" /></span>
                    <button className="motion-control" onClick={toggle} aria-pressed={paused} aria-label={paused ? t('Aktivera rörelse', 'Enable motion') : t('Pausa rörelse', 'Pause motion')}><Icon name={paused ? 'play' : 'pause'} /><span>{paused ? t('Rörelse av', 'Motion off') : t('Pausa', 'Pause')}</span></button>
                </div>
            </div>
        </section>
    );
}
