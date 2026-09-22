import servicesData from './services.json';
import reviewsData from './reviews.json';

export interface LocalizedString {
  sv: string;
  en: string;
}

export interface ServiceItem {
  id: string;
  slug: LocalizedString;
  title: LocalizedString;
  category: string;
  price: number;
  minutes: number;
  from?: boolean;
  intro: LocalizedString;
  illustrative?: boolean;
  image: string;
  includes?: { sv: string[]; en: string[] };
  details?: { sv: string[]; en: string[] };
  popular?: boolean;
  note?: LocalizedString;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: LocalizedString;
  translation?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: LocalizedString;
  alt: LocalizedString;
  category: string;
  illustrative: boolean;
  position?: string;
}

export const services = servicesData as ServiceItem[];
export const reviews = reviewsData as ReviewItem[];

export const categories: Record<string, LocalizedString> = {
  hair: { sv: 'Klippning', en: 'Haircuts' },
  beard: { sv: 'Skägg', en: 'Beard' },
  combination: { sv: 'Hår & skägg', en: 'Hair & beard' },
  ritual: { sv: 'Luxury & Royal', en: 'Luxury & Royal' },
  finish: { sv: 'Det lilla extra', en: 'Finishing touches' }
};

export const priceLabel = (s: ServiceItem, lang: 'sv' | 'en') =>
  `${s.from ? (lang === 'sv' ? 'Från ' : 'From ') : ''}${s.price.toLocaleString(lang === 'sv' ? 'sv-SE' : 'en-GB')} ${lang === 'sv' ? 'kr' : 'SEK'}`;

export const gallery: GalleryItem[] = [
  ...services.filter(service => service.image.startsWith('/images/manW-')).map(service => ({
    id: `result-${service.id}`,
    src: service.image,
    title: service.title,
    alt: { sv: `${service.title.sv} hos Man With Class`, en: `${service.title.en} at Man With Class` },
    category: 'craft',
    illustrative: false,
    position: '50% 35%'
  })),
  { id: 'the-chair', src: '/images/salon-chair.webp', title: { sv: 'Din plats. Din stund.', en: 'Your seat. Your moment.' }, alt: { sv: 'Stolar och interiör i Man With Class salong', en: 'Chairs and interior at the Man With Class salon' }, category: 'salon', illustrative: false, position: '50% 50%' },
  { id: 'the-space', src: '/images/salon-wide.webp', title: { sv: 'Välkommen in.', en: 'Step inside.' }, alt: { sv: 'Man With Class salong på Upplandsgatan 51', en: 'Man With Class salon at Upplandsgatan 51' }, category: 'salon', illustrative: false },
  { id: 'at-work', src: '/images/salon-work.webp', title: { sv: 'Bakom stolen.', en: 'Behind the chair.' }, alt: { sv: 'En barberare arbetar med en kund i salongens bildmaterial', en: 'A barber working with a client in the salon website imagery' }, category: 'craft', illustrative: false },
  { id: 'our-name', src: '/images/salon-brand.webp', title: { sv: 'Man With Class.', en: 'Man With Class.' }, alt: { sv: 'Man With Class logotyp på salongens vägg', en: 'Man With Class logo on the salon wall' }, category: 'salon', illustrative: false }
];

export default {
  services,
  reviews,
  categories,
  priceLabel,
  gallery
};
