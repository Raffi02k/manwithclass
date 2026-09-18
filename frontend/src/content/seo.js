// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module10 from "./site.js";
import __module2 from "./routes.js";
import __module3 from "./data.js";
import { publishedPeople } from './people.js';

const moduleValues = { __esModule: true };
moduleValues.getMetadata = getMetadata;
moduleValues.structuredData = structuredData;
moduleValues.renderHead = renderHead;
const site_1 = __module10;
const routes_1 = __module2;
const data_1 = __module3;
const descriptions = {
    home: { sv: 'Barbershop vid Odenplan i Vasastan. Herrklippning, skäggtrimning och klassisk rakning på Upplandsgatan 51 i Stockholm. Boka hos Man With Class.', en: 'Barbershop at Odenplan in Vasastan, Stockholm. Men’s haircuts, beard trims and traditional shaves at Upplandsgatan 51. Book at Man With Class.' },
    services: { sv: 'Se behandlingar och priser hos Man With Class vid Odenplan: herrklippning, skägg, rakning, Luxury och Royal Treatment. Boka via Bokadirekt.', en: 'Explore haircuts, beard grooming, shaves, Luxury and Royal treatments at Man With Class, Odenplan. View prices and book via Bokadirekt.' },
    about: { sv: 'Lär känna Man With Class, en barbershop vid Odenplan i Vasastan. Personlig stil och barberarhantverk på Upplandsgatan 51 i Stockholm.', en: 'Get to know Man With Class, a barbershop at Odenplan in Vasastan. Personal style and barbering at Upplandsgatan 51 in Stockholm.' },
    barbers: { sv: 'Möt Roy och Serhi hos Man With Class i Stockholm. Välj barberare och behandling och se lediga tider på Bokadirekt.', en: 'Meet Roy and Serhi at Man With Class in Stockholm. Choose your barber and treatment and check availability on Bokadirekt.' },
    gallery: { sv: 'Se bilder från Man With Class vid Odenplan. Upptäck salongen och känslan bakom barberarhantverket på Upplandsgatan 51.', en: 'See photos from Man With Class at Odenplan. Explore the salon and the atmosphere behind the barbering at Upplandsgatan 51.' },
    reviews: { sv: 'Läs tidigare publicerade kundomdömen om Man With Class Barbershop i Stockholm och hitta aktuella betyg på Bokadirekt.', en: 'Read previously published customer reviews of Man With Class Barbershop in Stockholm and find current ratings on Bokadirekt.' },
    contact: { sv: 'Hitta Man With Class på Upplandsgatan 51 vid Odenplan i Stockholm. Kontakt, öppettider, vägbeskrivning och bokning.', en: 'Find Man With Class at Upplandsgatan 51 by Odenplan in Stockholm. Contact details, opening hours, directions and appointments.' },
    privacy: { sv: 'Information om externa tjänster, kontakt och databehandling i denna webbversion för Man With Class.', en: 'Information about external services, contact and data handling in this version of the Man With Class website.' },
    '404': { sv: 'Sidan kunde inte hittas. Gå till startsidan för Man With Class Barbershop i Stockholm.', en: 'Page not found. Return to the Man With Class Barbershop website in Stockholm.' }
};
const titles = { home: { sv: 'Barbershop vid Odenplan i Stockholm', en: 'Barbershop at Odenplan, Stockholm' }, services: { sv: 'Tjänster & priser vid Odenplan', en: 'Services & prices at Odenplan' }, about: { sv: 'Om salongen i Vasastan', en: 'About our Vasastan salon' }, barbers: { sv: 'Våra barberare Roy & Serhi', en: 'Our barbers Roy & Serhi' }, gallery: { sv: 'Galleri & salongen', en: 'Gallery & the salon' }, reviews: { sv: 'Kundomdömen', en: 'Customer reviews' }, contact: { sv: 'Kontakt & öppettider vid Odenplan', en: 'Contact & opening hours at Odenplan' }, privacy: { sv: 'Integritetsinformation', en: 'Privacy information' }, '404': { sv: 'Sidan hittades inte', en: 'Page not found' } };
const select = (value, lang) => value[lang];
function getMetadata(path) {
    const route = routes_1.resolveRoute(path), { lang, key } = route;
    const s = data_1.services.find(s => s.id === route.serviceId);
    const person = publishedPeople.find(person => person.slug === route.personSlug);
    const title = person ? `${lang === 'sv' ? 'Lär känna' : 'Meet'} ${person.fullName} | Man With Class` : s ? `${s.title[lang]} ${lang === 'sv' ? 'vid' : 'at'} Odenplan | Man With Class` : `${titles[key === 'service' ? '404' : key][lang]} | Man With Class`;
    const description = person ? `${person.role[lang]}. ${person.intro[lang]}` : s ? `${s.intro[lang]} ${lang === 'sv' ? 'Man With Class vid Odenplan, Stockholm.' : 'Man With Class at Odenplan, Stockholm.'}` : select(descriptions[key === 'service' ? '404' : key], lang);
    return { title, description, lang, path, canonical: site_1.site.domain + (path === '/' ? '/' : path), indexable: site_1.site.indexable && key !== '404', alternates: key === '404' ? [] : ['sv', 'en', 'x-default'].map(locale => ({ lang: locale, href: site_1.site.domain + routes_1.alternatePath(path, locale === 'x-default' ? 'sv' : locale) })), service: s, person, key };
}
function structuredData(path) { const meta = getMetadata(path); if (meta.key === '404')
    return null; const business = { '@type': 'HairSalon', '@id': site_1.site.domain + '/#salon', name: site_1.site.fullName, url: site_1.site.domain + '/', image: site_1.site.domain + '/images/salon-wide.webp', logo: site_1.site.domain + '/images/logo.png', telephone: '+46709627503', email: site_1.site.email, address: { '@type': 'PostalAddress', streetAddress: site_1.site.address, postalCode: site_1.site.postcode, addressLocality: site_1.site.city, addressCountry: 'SE' }, hasMap: site_1.site.mapsUrl, sameAs: [site_1.site.instagram, site_1.site.facebook, site_1.site.bookingUrl], openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' }, { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' }] }; const graph = [business, { '@type': 'WebSite', '@id': site_1.site.domain + '/#website', url: site_1.site.domain + '/', name: site_1.site.fullName, inLanguage: ['sv', 'en'] }, { '@type': 'WebPage', '@id': meta.canonical + '#webpage', url: meta.canonical, name: meta.title, description: meta.description, inLanguage: meta.lang, about: { '@id': site_1.site.domain + '/#salon' }, isPartOf: { '@id': site_1.site.domain + '/#website' } }]; if (meta.service) {
    const s = meta.service;
    graph.push({ '@type': 'Service', '@id': meta.canonical + '#service', name: s.title[meta.lang], description: s.intro[meta.lang], serviceType: s.title[meta.lang], provider: { '@id': site_1.site.domain + '/#salon' }, areaServed: 'Stockholm', ...(s.from ? {} : { offers: { '@type': 'Offer', price: s.price, priceCurrency: 'SEK', url: site_1.site.bookingUrl } }) });
} return { '@context': 'https://schema.org', '@graph': graph }; }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function renderHead(path) {
    const m = getMetadata(path), schema = structuredData(path);
    const image = esc(`${site_1.site.domain}/images/index-pic.png`);
    return `<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<meta name="robots" content="${m.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}">
<link rel="canonical" href="${esc(m.canonical)}">
${m.alternates.map(a => `<link rel="alternate" hreflang="${a.lang}" href="${esc(a.href)}">`).join('\n')}
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site_1.site.name)}">
<meta property="og:url" content="${esc(m.canonical)}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="Man With Class Barbershop, Stockholm">
<meta property="og:locale" content="${m.lang === 'sv' ? 'sv_SE' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(m.title)}">
<meta name="twitter:description" content="${esc(m.description)}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="Man With Class Barbershop, Stockholm">
${schema ? `<script id="structured-data" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}<\/script>` : ''}`;
}

export default moduleValues;
const __export_getMetadata = moduleValues.getMetadata;
export { __export_getMetadata as getMetadata };
const __export_structuredData = moduleValues.structuredData;
export { __export_structuredData as structuredData };
const __export_renderHead = moduleValues.renderHead;
export { __export_renderHead as renderHead };
