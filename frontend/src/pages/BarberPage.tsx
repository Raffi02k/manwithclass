import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { BookingButton } from '../components/BookingButton';
import { Icon } from '../components/Icon';
import { Timeline } from '../components/Timeline';
import { PersonGallery } from '../components/PersonGallery';
import { Person } from '../content/people';

export interface BarberPageProps {
  person: Person;
}

export function BarberPage({ person }: BarberPageProps) {
  const { lang, t, path } = useLocale();

  return (
    <>
      <section className="person-hero container">
        <div className="person-hero-copy">
          <Link className="breadcrumb" to={path('barbers')}>
            <Icon name="arrowLeft" /> {t('Alla barberare', 'All barbers')}
          </Link>
          <p className="eyebrow">{person.role[lang]}</p>
          <h1>
            {person.name.toUpperCase()}
            <span className="accent">.</span>
          </h1>
          <p className="person-full-name">{person.fullName}</p>
          <p className="person-intro">{person.intro[lang]}</p>
          {person.specialties[lang].length > 0 && (
            <ul className="person-tags" aria-label={t('Specialiteter', 'Specialties')}>
              {person.specialties[lang].map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          <div className="person-actions">
            {person.instagram && (
              <a
                className="button button-primary"
                href={person.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {person.contactLabel?.[lang]} <Icon />
              </a>
            )}
            <BookingButton label={t('Boka hos salongen', 'Book at the salon')} className="person-booking" />
          </div>
        </div>
        <figure className="person-portrait">
          {person.portrait ? (
            <img
              src={person.portrait}
              alt={`${t('Porträtt av', 'Portrait of')} ${person.name}`}
              width="428"
              height="680"
              {...({ fetchpriority: 'high' } as any)}
              style={{ objectPosition: person.position }}
            />
          ) : (
            <div className="person-portrait-placeholder">
              <span className="person-monogram" aria-hidden="true">
                {person.name[0]}
              </span>
              <p>{t('Porträtt kommer', 'Portrait coming soon')}</p>
            </div>
          )}
          <figcaption>{person.fullName} / Stockholm</figcaption>
        </figure>
      </section>
      <section className="person-story container section-space" aria-labelledby="person-story-title">
        <div className="person-story-heading">
          <p className="eyebrow">{person.storyEyebrow}</p>
          <h2 id="person-story-title">
            {person.storyTitle[lang][0]}
            <br />
            <span className="accent">{person.storyTitle[lang][1]}</span>
          </h2>
        </div>
        <div className="person-story-copy">
          <p className="person-presentation">{person.presentation[lang]}</p>
          <p>{person.storySignoff[lang]}</p>
          <Timeline milestones={person.timeline} lang={lang} />
          <p className="content-note">{person.contactNote?.[lang]}</p>
        </div>
      </section>
      <PersonGallery person={person} />
      <div className="container person-back">
        <Link className="text-link" to={path('barbers')}>
          <Icon name="arrowLeft" />
          {t('Tillbaka till barberarna', 'Back to the barbers')}
        </Link>
      </div>
    </>
  );
}

export default BarberPage;
