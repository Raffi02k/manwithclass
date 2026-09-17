import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale.js';
import { personPath } from '../content/routes.js';
import { site } from '../content/site.js';
import { Icon } from './Icon.js';

export function PersonCard({ person, index = 0 }) {
    const { lang, t } = useLocale();
    const Tag = person.published ? Link : 'a';
    const destination = person.published
        ? { to: personPath(person.slug, lang) }
        : { href: site.bookingUrl, target: '_blank', rel: 'noopener noreferrer' };
    return <Tag {...destination} className="person-card">
        <div className="person-card-photo">
            {person.portrait
                ? <img src={person.portrait} alt={`${t('Porträtt av', 'Portrait of')} ${person.name}`} width="428" height="680" loading="lazy" style={{ objectPosition: person.position }} />
                : <span className="person-monogram" aria-hidden="true">{person.name[0]}</span>}
            <span className="person-card-index eyebrow">{String(index + 1).padStart(2, '0')} / {t('BARBERARE', 'BARBER')}</span>
            <span className="person-card-invite">{person.published ? `${t('Lär känna', 'Meet')} ${person.name}` : t('Se lediga tider', 'See availability')} <Icon /></span>
        </div>
        <div className="person-card-info">
            <div><h3>{person.name}</h3><p>{person.role[lang]}</p></div><Icon />
        </div>
    </Tag>;
}
