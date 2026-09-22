import { useLocale } from '../hooks/useLocale';
import { PageHero } from '../components/PageHero';
import { site } from '../content/site';

export function PrivacyPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('Integritet', 'Privacy')}
        title={t('DIN INTEGRITET.', 'YOUR PRIVACY.')}
        description={t(
          'Teknisk information om den här webbversionen.',
          'Technical information about this version of the website.'
        )}
      />

      <section className="container section-space privacy-prose">
        <h2>{t('Kontakt och bokning', 'Contact and booking')}</h2>
        <p>
          {t(
            'Den här webbplatsen har inget eget boknings- eller kontaktformulär. Bokningsknappar öppnar Bokadirekt. E-postlänken öppnar ditt e-postprogram och telefonlänken används för att ringa salongen.',
            'This website has no booking or contact form of its own. Booking buttons open Bokadirekt. The email link opens your email application and the phone link lets you call the salon.'
          )}
        </p>

        <h2>{t('Externa tjänster', 'External services')}</h2>
        <p>
          {t(
            'Den interaktiva kartan hämtas från Google Maps först efter att du har valt Visa interaktiv karta. Webbtypsnitt laddas från Google Fonts. Besök hos dessa externa tjänster kan innebära att exempelvis din IP-adress överförs till respektive leverantör.',
            'The interactive map is fetched from Google Maps only after you select Load interactive map. Web fonts are loaded from Google Fonts. Connections to these external services may send information such as your IP address to the respective provider.'
          )}
        </p>
        <p>
          {t(
            'Länkar till Bokadirekt, Instagram och Facebook leder till andra webbplatser med egna villkor och integritetsinformation.',
            'Links to Bokadirekt, Instagram and Facebook lead to other websites with their own terms and privacy information.'
          )}
        </p>

        <h2>{t('Statistik och lagring', 'Analytics and storage')}</h2>
        <p>
          {t(
            'Den levererade versionen innehåller inga statistik- eller annonspixlar och sätter inga egna cookies. Val av rörelse och galleri sparas inte mellan besök. Vald webbhost kan behandla tekniska serverloggar.',
            'This delivered version contains no analytics or advertising pixels and sets no first-party cookies. Motion and gallery settings are not stored between visits. The selected hosting provider may process technical server logs.'
          )}
        </p>

        <h2>{t('Frågor', 'Questions')}</h2>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>

        {!site.indexable && (
          <p className="privacy-draft">
            {t(
              'INFÖR PUBLICERING: Salongen behöver komplettera med ansvarig juridisk person, vald webbhost och information om hur inkommande e-post hanteras. Detta är teknisk förhandsinformation, inte en färdig juridiskt granskad integritetspolicy.',
              'BEFORE LAUNCH: The salon needs to add the responsible legal entity, selected hosting provider and how incoming email is handled. This is technical preview information, not a final legally reviewed privacy policy.'
            )}
          </p>
        )}
      </section>
    </>
  );
}
