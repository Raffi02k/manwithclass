import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { gallery, GalleryItem } from '../content/data';
import { Lightbox, categoryLabels } from './Lightbox';
import { Icon } from './Icon';

export interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  const { lang, t } = useLocale();
  return (
    <button
      className={`chair-card chair-card-${index % 3}`}
      onClick={onClick}
      aria-label={`${t('Öppna bild', 'Open image')}: ${item.title[lang]}`}
    >
      <img
        src={item.src}
        srcSet={
          item.src.endsWith('.webp')
            ? `${item.src.replace('.webp', '-sm.webp')} 640w, ${item.src} 1600w`
            : undefined
        }
        sizes="(max-width: 740px) 82vw, 355px"
        alt={item.alt[lang]}
        loading="lazy"
        decoding="async"
        width="520"
        height="680"
        style={{ objectPosition: item.position }}
      />
      <span className="chair-card-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="chair-card-caption">
        <small>{categoryLabels[item.category]?.[lang]}</small>
        <strong>{item.title[lang]}</strong>
        <Icon name="expand" />
      </span>
    </button>
  );
}

export function GalleryGrid() {
  const [category, setCategory] = useState('all');
  const [index, setIndex] = useState<number | null>(null);
  const { lang, t } = useLocale();

  const items = category === 'all' ? gallery : gallery.filter(i => i.category === category);

  const tabs: [string, string][] = [
    ['all', t('Alla', 'All')],
    ...Object.entries(categoryLabels).map(([k, v]) => [k, v[lang]] as [string, string])
  ];

  return (
    <>
      <div className="filter-tabs" role="group" aria-label={t('Filtrera bilder', 'Filter photos')}>
        {tabs.map(([key, label]) => (
          <button
            key={key}
            className={category === key ? 'active' : ''}
            aria-pressed={category === key}
            onClick={() => {
              setIndex(null);
              setCategory(key);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mwc-gallery-grid">
        {items.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} onClick={() => setIndex(i)} />
        ))}
      </div>
      <Lightbox items={items} index={index} setIndex={setIndex} />
    </>
  );
}

export default GalleryGrid;
