import { useState } from 'react';
import { gallery } from '../content/data.js';
import { useLocale } from '../hooks/useLocale.js';
import { GalleryCard, Lightbox } from './Gallery.js';
import { Icon } from './Icon.js';

export function PersonGallery({ person }) {
    const [index, setIndex] = useState(null);
    const { lang, t } = useLocale();
    const images = gallery.filter(image => person.galleryIds.includes(image.id));
    return <section className="container section-space person-work" aria-labelledby="person-work-title">
        <div className="section-heading">
            <div><p className="eyebrow">The portfolio</p><h2 id="person-work-title">{t('BILDBERÄTTELSEN.', 'THE VISUAL STORY.')}</h2></div>
            {person.instagram && <a className="text-link" href={person.instagram} target="_blank" rel="noopener noreferrer">{t('Mer på Instagram', 'More on Instagram')} <Icon /></a>}
        </div>
        {person.galleryNote && <p className="content-note person-gallery-note">{person.galleryNote[lang]}</p>}
        {images.length ? <>
            <div className="mwc-gallery-grid">{images.map((image, i) => <GalleryCard key={image.id} item={image} index={i} onClick={() => setIndex(i)} />)}</div>
            <Lightbox items={images} index={index} setIndex={setIndex} />
        </> : <div className="person-gallery-empty">
            <p className="eyebrow">{person.name} / The portfolio</p>
            <h3>{t('Fler bilder kommer.', 'More pictures to come.')}</h3>
            <p>{t('Bildberättelsen fylls på. Upptäck mer via länken till Instagram.', 'The visual story is growing. Discover more via the Instagram link.')}</p>
        </div>}
    </section>;
}
