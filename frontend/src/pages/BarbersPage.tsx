import { useLocale } from '../hooks/useLocale';
import { PageHero } from '../components/PageHero';
import { Barbers } from '../components/Barbers';
import { FAQ } from '../components/FAQ';

export function BarbersPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('Barberarna', 'The barbers')}
        title={
          <>
            {t('PERSONERNA', 'THE PEOPLE')}
            <br />
            <span className="accent">{t('BAKOM STILEN.', 'BEHIND THE STYLE.')}</span>
          </>
        }
        description={t(
          'Möt Roy och Serhi. Välj din barberare när du bokar hos Man With Class.',
          'Meet Roy and Serhi. Choose your barber when booking at Man With Class.'
        )}
        image="/images/salon-work.webp"
      />
      <Barbers full />
      <div className="container section-space">
        <FAQ />
      </div>
    </>
  );
}

export default BarbersPage;
