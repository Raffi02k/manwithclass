import { useLocale } from '../hooks/useLocale';
import { site } from '../content/site';
import { Icon } from './Icon';

export interface BookingButtonProps {
  label?: string;
  className?: string;
}

export function BookingButton({ label, className = '' }: BookingButtonProps) {
  const { t } = useLocale();
  return (
    <a
      className={`button button-primary ${className}`}
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-booking="true"
    >
      {label || t('Boka din tid', 'Book your visit')}
      <Icon />
    </a>
  );
}

export default BookingButton;
