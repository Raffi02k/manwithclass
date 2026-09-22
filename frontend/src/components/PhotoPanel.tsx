import { useRef, useEffect, ReactNode } from 'react';
import { useMotion } from './MotionProvider';

export interface PhotoPanelProps {
  image: string;
  children: ReactNode;
  className?: string;
}

export function PhotoPanel({ image, children, className = '' }: PhotoPanelProps) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        el.style.setProperty(
          '--shift',
          `${((window.innerHeight / 2 - r.top - r.height / 2) / window.innerHeight) * 70}px`
        );
      }
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    scroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scroll);
    };
  }, [reduced]);

  return (
    <section ref={ref} className={`photo-panel ${className}`}>
      <img src={image} loading="lazy" decoding="async" alt="" width="1400" height="900" />
      <div className="photo-panel-shade" />
      <div className="photo-panel-content container">{children}</div>
    </section>
  );
}

export default PhotoPanel;
