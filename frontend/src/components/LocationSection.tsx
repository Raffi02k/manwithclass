import { useLocale } from '../hooks/useLocale';
import { site } from '../content/site';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function LocationSection() {
  const { t } = useLocale();
  return (
    <section className="location-section section-space" id="hitta-hit">
      <div className="container location-heading">
        <Reveal>
          <p className="eyebrow">STOCKHOLM / VASASTAN / ODENPLAN</p>
          <h2>
            {t('NÄSTA STOPP.', 'YOUR NEXT STOP.')}
            <br />
            <span className="accent">MAN WITH CLASS.</span>
          </h2>
        </Reveal>
        <div className="location-address">
          <Icon name="pin" />
          <div>
            <h3>{site.address}</h3>
            <p>
              {site.postcode} {site.city}
              <br />
              {t('Du hittar oss vid Odenplan.', 'Find us at Odenplan.')}
            </p>
            <a className="text-link" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
              {t('Visa vägen', 'Get directions')}
              <Icon />
            </a>
          </div>
        </div>
      </div>
      <div className="map-frame container">
        <iframe
          title={t('Man With Class på Google Maps', 'Man With Class on Google Maps')}
          src={site.mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
        <div className="map-footer">
          <span>
            <i />
            UPPLANDSGATAN 51 / VASASTAN
          </span>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            Google Maps
            <Icon />
          </a>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
