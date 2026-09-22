import { useLocale } from '../hooks/useLocale';
import { PageHero } from '../components/PageHero';
import { ReviewSummary, ReviewSourceNote, ReviewCard } from '../components/ReviewCard';
import { reviews } from '../content/data';
import { site } from '../content/site';
import { Icon } from '../components/Icon';

export function ReviewsPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('Kundomdömen', 'Client reviews')}
        title={
          <>
            {t('DERAS ORD.', 'THEIR WORDS.')}
            <br />
            <span className="accent">{t('VÅR STOL.', 'OUR CHAIR.')}</span>
          </>
        }
        description={t(
          'Läs vad gäster har berättat om sina besök hos Man With Class.',
          'Read what guests have shared about their visits to Man With Class.'
        )}
        image="/images/salon-wide.webp"
      />

      <section className="container section-space">
        <div className="reviews-heading">
          <ReviewSummary />
          <ReviewSourceNote />
        </div>

        <div className="mwc-review-grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} full />
          ))}
        </div>

        <div className="reviews-cta">
          <a
            href={site.bookingUrl}
            className="button button-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Se aktuella betyg på Bokadirekt', 'View current ratings on Bokadirekt')}
            <Icon />
          </a>
        </div>
      </section>
    </>
  );
}
