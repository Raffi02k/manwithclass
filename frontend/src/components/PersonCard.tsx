import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { personPath } from '../content/routes';
import { site } from '../content/site';
import { Person } from '../content/people';
import { Icon } from './Icon';

export interface PersonCardProps {
  person: Person;
  index?: number;
}

export function PersonCard({ person, index = 0 }: PersonCardProps) {
  const { lang, t } = useLocale();

  return person.published ? (
    <Link to={personPath(person.slug, lang)} className="person-card">
      <div className="person-card-photo">
        {person.portrait ? (
          <img
            src={person.portrait}
            alt={`${t('Porträtt av', 'Portrait of')} ${person.name}`}
            width="428"
            height="680"
            loading="lazy"
            style={{ objectPosition: person.position }}
          />
        ) : (
          <span className="person-monogram" aria-hidden="true">
            {person.name[0]}
          </span>
        )}
        <span className="person-card-index eyebrow">
          {String(index + 1).padStart(2, '0')} / {t('BARBERARE', 'BARBER')}
        </span>
        <span className="person-card-invite">
          {t('Lär känna', 'Meet')} {person.name} <Icon />
        </span>
      </div>
      <div className="person-card-info">
        <div>
          <h3>{person.name}</h3>
          <p>{person.role[lang]}</p>
        </div>
        <Icon />
      </div>
    </Link>
  ) : (
    <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="person-card">
      <div className="person-card-photo">
        {person.portrait ? (
          <img
            src={person.portrait}
            alt={`${t('Porträtt av', 'Portrait of')} ${person.name}`}
            width="428"
            height="680"
            loading="lazy"
            style={{ objectPosition: person.position }}
          />
        ) : (
          <span className="person-monogram" aria-hidden="true">
            {person.name[0]}
          </span>
        )}
        <span className="person-card-index eyebrow">
          {String(index + 1).padStart(2, '0')} / {t('BARBERARE', 'BARBER')}
        </span>
        <span className="person-card-invite">
          {t('Se lediga tider', 'See availability')} <Icon />
        </span>
      </div>
      <div className="person-card-info">
        <div>
          <h3>{person.name}</h3>
          <p>{person.role[lang]}</p>
        </div>
        <Icon />
      </div>
    </a>
  );
}

export default PersonCard;
