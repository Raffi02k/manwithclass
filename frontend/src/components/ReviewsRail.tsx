import { useRef, useEffect, KeyboardEvent, PointerEvent, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { reviews } from '../content/data';
import { useLocale } from '../hooks/useLocale';
import { useMotion } from './MotionProvider';
import { ReviewCard, ReviewSummary, ReviewSourceNote } from './ReviewCard';
import { Icon } from './Icon';

const groups = [reviews.slice(0, 5), reviews.slice(5)];

export function ReviewRow({ row }: { row: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number } | null>(null);
  const focus = useRef(false);
  const resume = useRef(0);
  const pointer = useRef(false);
  const touching = useRef(false);
  const nativeScrolling = useRef(false);
  const { reduced } = useMotion();
  const { t } = useLocale();

  function moveTo(position: number) {
    const el = rail.current;
    const distance = group.current?.offsetWidth || 0;
    if (!el) return;
    el.scrollLeft =
      !reduced && distance > 0
        ? distance + ((((position - distance) % distance) + distance) % distance)
        : position;
  }

  function releasePointer() {
    if (!pointer.current && !drag.current) return;
    drag.current = null;
    pointer.current = false;
    resume.current = performance.now() + 120;
  }

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const wheel = (event: WheelEvent) => {
      if (reduced) return;
      const delta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
      if (!delta) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientWidth : 1;
      moveTo(el.scrollLeft + delta * unit);
      resume.current = performance.now() + 120;
    };
    const onScroll = () => {
      if (nativeScrolling.current) resume.current = performance.now() + 1000;
    };
    el.addEventListener('wheel', wheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerup', releasePointer);
    window.addEventListener('pointercancel', releasePointer);
    return () => {
      el.removeEventListener('wheel', wheel);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerup', releasePointer);
      window.removeEventListener('pointercancel', releasePointer);
    };
  }, [reduced]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    if (reduced) {
      el.scrollLeft = 0;
      return;
    }
    let frame = 0;
    let last = 0;
    let position = group.current?.offsetWidth || 0;
    el.scrollLeft = position;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    const tick = (now: number) => {
      const distance = group.current?.offsetWidth || 0;
      const dt = last ? Math.min(now - last, 40) : 0;
      last = now;
      if (
        visible &&
        !document.hidden &&
        !focus.current &&
        !pointer.current &&
        !drag.current &&
        !touching.current &&
        now > resume.current &&
        distance > 0
      ) {
        nativeScrolling.current = false;
        position += (row === 0 ? 1 : -1) * dt * 0.027;
        position = distance + ((((position - distance) % distance) + distance) % distance);
        el.scrollLeft = position;
      } else {
        position = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [row, reduced]);

  function scroll(dir: number) {
    resume.current = performance.now() + 120;
    if (rail.current) moveTo(rail.current.scrollLeft + dir * rail.current.clientWidth * 0.72);
  }

  function touchStart() {
    touching.current = true;
    nativeScrolling.current = true;
    focus.current = false;
  }

  function touchEnd() {
    touching.current = false;
    resume.current = performance.now() + 1000;
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    pointer.current = true;
    focus.current = false;
    if (e.button === 0 && !(e.target as HTMLElement).closest('a,button')) {
      drag.current = { x: e.clientX };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current && rail.current) {
      moveTo(rail.current.scrollLeft + drag.current.x - e.clientX);
      drag.current.x = e.clientX;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      scroll(e.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <div className="review-row">
      <div
        className="review-scroll-rail"
        ref={rail}
        id={`review-row-${row}`}
        tabIndex={0}
        role="region"
        aria-label={`${t('Omdömesrad', 'Review row')} ${row + 1}`}
        onFocus={e => (focus.current = e.target.matches(':focus-visible'))}
        onBlur={e => {
          if (!e.currentTarget.contains(e.relatedTarget)) focus.current = false;
        }}
        onKeyDown={handleKeyDown}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onTouchCancel={touchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        onLostPointerCapture={releasePointer}
      >
        <div className="review-scroll-track">
          {(reduced ? [0] : [-1, 0, 1]).map(copy => (
            <div
              key={copy}
              className="marquee-group"
              ref={copy === 0 ? group : undefined}
              aria-hidden={copy !== 0 ? true : undefined}
            >
              {groups[row].map(review => (
                <ReviewCard key={`${copy}-${review.id}`} review={review} duplicate={copy !== 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="rail-controls review-row-controls container">
        <span>{t('Svep eller använd pilarna', 'Swipe or use the arrows')}</span>
        <button
          className="icon-button"
          onClick={() => scroll(-1)}
          aria-label={`${t('Föregående omdömen, rad', 'Previous reviews, row')} ${row + 1}`}
          aria-controls={`review-row-${row}`}
        >
          <Icon name="arrowLeft" />
        </button>
        <button
          className="icon-button"
          onClick={() => scroll(1)}
          aria-label={`${t('Nästa omdömen, rad', 'Next reviews, row')} ${row + 1}`}
          aria-controls={`review-row-${row}`}
        >
          <Icon name="arrowRight" />
        </button>
      </div>
    </div>
  );
}

export function ReviewsRail() {
  const { t, path } = useLocale();
  const { paused, toggle } = useMotion();

  return (
    <section className="reviews-section section-space">
      <div className="container reviews-heading">
        <p className="eyebrow">{t('Orden efter stolen', 'Words after the chair')}</p>
        <h2>
          {t('DET ÄR KÄNSLAN', 'IT IS THE FEELING')}
          <br />
          <span className="accent">{t('SOM STANNAR.', 'THAT STAYS.')}</span>
        </h2>
        <ReviewSummary />
        <p className="review-date">{t('Bokadirekt / kontrollerat 2026-09-15', 'Bokadirekt / checked 2026-09-15')}</p>
      </div>
      <div className="review-marquees">
        <ReviewRow row={0} />
        <ReviewRow row={1} />
      </div>
      <div className="container reviews-foot">
        <button className="motion-control" onClick={toggle} aria-pressed={paused}>
          <Icon name={paused ? 'play' : 'pause'} />
          {paused ? t('Starta rörelse', 'Resume motion') : t('Pausa rörelse', 'Pause motion')}
        </button>
        <Link className="text-link" to={path('reviews')}>
          {t('Alla omdömen', 'All reviews')}
          <Icon />
        </Link>
      </div>
      <div className="container">
        <ReviewSourceNote />
      </div>
    </section>
  );
}

export default ReviewsRail;
