import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { people } from '../content/people';
import { PersonCard } from './PersonCard';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export interface BarbersProps {
  full?: boolean;
}

export function Barbers({ full = false }: BarbersProps) {
  const { t, path } = useLocale();

  return (
    <section className="crew-section section-space">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <p className="eyebrow">{t('Människorna bakom hantverket', 'The people behind the craft')}</p>
            <h2>
              {t('DIN STIL.', 'YOUR STYLE.')}
              <br />
              <span className="accent">{t('VÅRA HÄNDER.', 'OUR HANDS.')}</span>
            </h2>
          </Reveal>
          {!full && (
            <Link className="text-link" to={path('barbers')}>
              {t('Möt barberarna', 'Meet the barbers')}
              <Icon />
            </Link>
          )}
        </div>
        <div className="mwc-crew-grid">
          {people.map((person, index) => (
            <PersonCard key={person.slug} person={person} index={index} />
          ))}
        </div>
        {full && (
          <p className="content-note">
            {t(
              'Roy och Serhi finns i salongens bokning. Välj den behandling och barberare som passar dig.',
              'Roy and Serhi are listed in the salon booking service. Choose the treatment and barber that suit you.'
            )}
          </p>
        )}
      </div>
    </section>
  );
}

export default Barbers;
