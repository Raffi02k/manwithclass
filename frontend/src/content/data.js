// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module4 from "./services.json";
import __module5 from "./reviews.json";

const unwrapRecoveredDefault = mod => mod && mod.__esModule ? mod : { default: mod };
const moduleValues = { __esModule: true };
moduleValues.gallery = moduleValues.priceLabel = moduleValues.categories = moduleValues.reviews = moduleValues.services = void 0;
const services_json_1 = unwrapRecoveredDefault(__module4);
const reviews_json_1 = unwrapRecoveredDefault(__module5);
moduleValues.services = services_json_1.default;
moduleValues.reviews = reviews_json_1.default;
moduleValues.categories = { hair: { sv: 'Klippning', en: 'Haircuts' }, beard: { sv: 'Skägg', en: 'Beard' }, combination: { sv: 'Hår & skägg', en: 'Hair & beard' }, ritual: { sv: 'Luxury & Royal', en: 'Luxury & Royal' }, finish: { sv: 'Det lilla extra', en: 'Finishing touches' } };
const priceLabel = (s, lang) => `${s.from ? (lang === 'sv' ? 'Från ' : 'From ') : ''}${s.price.toLocaleString(lang === 'sv' ? 'sv-SE' : 'en-GB')} ${lang === 'sv' ? 'kr' : 'SEK'}`;
moduleValues.priceLabel = priceLabel;
moduleValues.gallery = [
    ...moduleValues.services.filter(service => service.image.startsWith('/images/manW-')).map(service => ({
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
    { id: 'our-name', src: '/images/salon-brand.webp', title: { sv: 'Man With Class.', en: 'Man With Class.' }, alt: { sv: 'Man With Class logotyp på salongens vägg', en: 'Man With Class logo on the salon wall' }, category: 'salon', illustrative: false },
];

export default moduleValues;
const __export_gallery = moduleValues.gallery;
export { __export_gallery as gallery };
const __export_priceLabel = moduleValues.priceLabel;
export { __export_priceLabel as priceLabel };
const __export_categories = moduleValues.categories;
export { __export_categories as categories };
const __export_reviews = moduleValues.reviews;
export { __export_reviews as reviews };
const __export_services = moduleValues.services;
export { __export_services as services };
