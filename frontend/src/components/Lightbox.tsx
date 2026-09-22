import { useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';
import { useLocale } from '../hooks/useLocale';
import { useBodyLock } from '../hooks/useBodyLock';
import { GalleryItem } from '../content/data';
import { Icon } from './Icon';

export const categoryLabels: Record<string, { sv: string; en: string }> = {
  salon: { sv: 'Salongen', en: 'The salon' },
  craft: { sv: 'Hantverket', en: 'The craft' }
};

export interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  setIndex: (index: number | null) => void;
}

export function Lightbox({ items, index, setIndex }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { lang, t } = useLocale();

  useBodyLock(index !== null);

  useEffect(() => {
    const el = dialog.current;
    if (index !== null && !el?.open) {
      el?.showModal();
    } else if (index === null && el?.open) {
      el.close();
    }
  }, [index]);

  const item = index === null ? null : items[index];

  const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (index === null) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIndex((index + 1) % items.length);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIndex((index + items.length - 1) % items.length);
    }
  };

  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      setIndex(null);
    }
  };

  return (
    <dialog
      className="mwc-lightbox"
      ref={dialog}
      onCancel={() => setIndex(null)}
      onClose={() => setIndex(null)}
      aria-label={t('Bildvisning', 'Image viewer')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item && (
        <>
          <div className="lightbox-toolbar">
            <span>
              {index! + 1} / {items.length}
            </span>
            <button
              autoFocus
              className="icon-button"
              onClick={() => setIndex(null)}
              aria-label={t('Stäng bilden', 'Close image')}
            >
              <Icon name="close" />
            </button>
          </div>
          <figure>
            <img src={item.src} alt={item.alt[lang]} />
            <figcaption>
              <strong>{item.title[lang]}</strong>
              <span>{categoryLabels[item.category]?.[lang]}</span>
            </figcaption>
          </figure>
          <div className="lightbox-controls">
            <button
              className="icon-button"
              onClick={() => setIndex((index! + items.length - 1) % items.length)}
              aria-label={t('Föregående bild', 'Previous image')}
            >
              <Icon name="arrowLeft" />
            </button>
            <button
              className="icon-button"
              onClick={() => setIndex((index! + 1) % items.length)}
              aria-label={t('Nästa bild', 'Next image')}
            >
              <Icon name="arrowRight" />
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

export default Lightbox;
