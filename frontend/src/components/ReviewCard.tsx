import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { site } from '../content/site';
import { ReviewItem } from '../content/data';
import { Icon } from './Icon';

export interface StarsProps {
  rating?: number;
}

export function Stars({ rating = 5 }: StarsProps) {
  const { t } = useLocale();
  return (
    <span className="review-stars" role="img" aria-label={`${rating} ${t('av 5 stjärnor', 'out of 5 stars')}`}>
      <span aria-hidden="true">{'★'.repeat(5)}</span>
      <span className="review-stars-fill" style={{ width: `${(rating / 5) * 100}%` }} aria-hidden="true">
        {'★'.repeat(5)}
      </span>
    </span>
  );
}

export interface ReviewCardProps {
  review: ReviewItem;
  full?: boolean;
  duplicate?: boolean;
}

export function ReviewCard({ review, full = false, duplicate = false }: ReviewCardProps) {
  const { lang, t, path } = useLocale();
  return (
    <article className={`review-card ${full ? 'review-card-full' : ''}`} id={full ? review.id : undefined}>
      <div className="review-card-top">
        <span className="review-avatar" aria-hidden="true">
          {review.name
            .split(' ')
            .map(x => x[0])
            .slice(0, 2)
            .join('')}
        </span>
        <div>
          <strong>{review.name}</strong>
          <span>Google / {review.date.slice(0, 4)}</span>
        </div>
        <span className="review-source-mark" aria-label="Google">
          G
        </span>
      </div>
      <Stars rating={review.rating} />
      <blockquote>{review.text[lang]}</blockquote>
      {!full && (
        <Link
          className="review-read"
          to={`${path('reviews')}#${review.id}`}
          tabIndex={duplicate ? -1 : 0}
        >
          {t('Läs hela omdömet', 'Read the full review')} <Icon name="arrowRight" />
        </Link>
      )}
      <p className="review-date">
        <time dateTime={review.date}>
          {new Intl.DateTimeFormat(lang === 'sv' ? 'sv-SE' : 'en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
          }).format(new Date(review.date))}
        </time>
        {lang === 'en' && review.translation ? ' / Google translation' : ''}
      </p>
    </article>
  );
}

export function ReviewSummary() {
  const { t } = useLocale();
  return (
    <div className="review-summary">
      <div className="rating-number">
        {t('4,9', '4.9')}
        <small>/ 5</small>
      </div>
      <div>
        <Stars rating={site.bookingRating} />
        <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
          {site.bookingRatingCount} {t('betyg på Bokadirekt', 'ratings on Bokadirekt')} <Icon />
        </a>
      </div>
    </div>
  );
}

export function ReviewSourceNote() {
  const { t } = useLocale();
  return (
    <p className="content-note review-source-note">
      {t(
        'Bokadirekt-betyget kontrollerades 15 september 2026. Korten visar tidigare publicerade Google-omdömen från november 2024, hämtade ur salongens befintliga webbplats. Ingen automatisk liveuppdatering.',
        'Bokadirekt rating checked on 15 September 2026. Cards show previously published Google reviews from November 2024, supplied in the salon’s existing website. Not a live feed.'
      )}
    </p>
  );
}

export default ReviewCard;
