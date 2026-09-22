import { useLocale } from '../hooks/useLocale';
import { Icon } from './Icon';

export function FAQ() {
  const { t } = useLocale();
  const questions: [string, string][] = [
    [
      t('Hur bokar jag en tid?', 'How do I book?'),
      t(
        'Tryck på Boka tid för att öppna Man With Class på Bokadirekt. Där väljer du behandling, barberare och en ledig tid. Bokningen sker hos Bokadirekt, inte direkt på den här sidan.',
        'Select Book now to open Man With Class on Bokadirekt. Choose your treatment, barber and an available time there. Your booking is completed on Bokadirekt, not on this website.'
      )
    ],
    [
      t('Tar ni emot drop-in?', 'Do you accept walk-ins?'),
      t(
        'Ja, vi tar emot drop-in i mån av tid. Boka i förväg för att se till att det finns en tid som passar dig.',
        'Yes, subject to availability. Booking in advance is the easiest way to secure a time that suits you.'
      )
    ],
    [
      t('Var ligger salongen?', 'Where is the salon?'),
      t(
        'Du hittar Man With Class på Upplandsgatan 51, 113 28 Stockholm, vid Odenplan i Vasastan. Se vägbeskrivningen under Hitta hit.',
        'Find Man With Class at Upplandsgatan 51, 113 28 Stockholm, at Odenplan in Vasastan. See Find us for directions.'
      )
    ],
    [
      t('Hur vet jag vad som ingår i behandlingen?', 'How do I know what is included?'),
      t(
        'Varje behandling har en egen sida med innehåll, bokad tid och pris. Kontrollera alltid aktuellt pris och information i Bokadirekt innan du bekräftar bokningen.',
        'Each treatment has its own page with inclusions, appointment duration and price. Always check the current price and details on Bokadirekt before confirming.'
      )
    ]
  ];

  return (
    <section className="faq-block">
      <p className="eyebrow">{t('Bra att veta', 'Good to know')}</p>
      <h2 className="faq-heading">{t('INNAN DU SLÅR DIG NER.', 'BEFORE YOU TAKE A SEAT.')}</h2>
      {questions.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Icon name="plus" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}

export default FAQ;
