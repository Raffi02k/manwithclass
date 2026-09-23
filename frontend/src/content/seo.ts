import { site } from './site';
import { resolveRoute, alternatePath } from './routes';
import { services, projects, ProjectItem } from './data';
import { publishedPeople, Person } from './people';

const descriptions: Record<string, { sv: string; en: string }> = {
  home: { sv: 'Barbershop vid Odenplan i Vasastan. Herrklippning, skäggtrimning och klassisk rakning på Upplandsgatan 51 i Stockholm. Boka hos Man With Class.', en: 'Barbershop at Odenplan in Vasastan, Stockholm. Men’s haircuts, beard trims and traditional shaves at Upplandsgatan 51. Book at Man With Class.' },
  services: { sv: 'Se behandlingar och priser hos Man With Class vid Odenplan i Vasastan, Stockholm: herrklippning, skäggtrimning, rakning och paket. Boka via Bokadirekt.', en: 'Explore treatments and prices at Man With Class, Odenplan in Vasastan, Stockholm: haircuts, beard grooming, shaves and packages. View prices and book via Bokadirekt.' },
  projects: { sv: 'Utforska utförda herrklippningar, skäggdesign och signaturprojekt vid Odenplan i Vasastan, Stockholm. Hantverk med knivskarp finish hos Man With Class.', en: 'Explore reference haircuts, beard designs, and signature transformations crafted at Odenplan in Vasastan, Stockholm by Man With Class Barbershop.' },
  about: { sv: 'Lär känna Man With Class, en barbershop vid Odenplan i Vasastan. Personlig stil och barberarhantverk på Upplandsgatan 51 i Stockholm.', en: 'Get to know Man With Class, a barbershop at Odenplan in Vasastan. Personal style and barbering at Upplandsgatan 51 in Stockholm.' },
  barbers: { sv: 'Möt Roy och Serhi hos Man With Class vid Odenplan i Stockholm. Välj barberare och behandling och se lediga tider på Bokadirekt.', en: 'Meet Roy and Serhi at Man With Class at Odenplan in Stockholm. Choose your barber and treatment and check availability on Bokadirekt.' },
  gallery: { sv: 'Se bilder från Man With Class vid Odenplan i Vasastan. Upptäck salongen och känslan bakom barberarhantverket på Upplandsgatan 51.', en: 'See photos from Man With Class at Odenplan in Vasastan. Explore the salon and the atmosphere behind the barbering at Upplandsgatan 51.' },
  reviews: { sv: 'Läs tidigare publicerade kundomdömen om Man With Class Barbershop vid Odenplan i Stockholm och hitta aktuella betyg på Bokadirekt.', en: 'Read previously published customer reviews of Man With Class Barbershop at Odenplan in Stockholm and find current ratings on Bokadirekt.' },
  contact: { sv: 'Hitta Man With Class på Upplandsgatan 51 vid Odenplan i Vasastan, Stockholm. Kontakt, öppettider, vägbeskrivning och bokning.', en: 'Find Man With Class at Upplandsgatan 51 by Odenplan in Vasastan, Stockholm. Contact details, opening hours, directions and appointments.' },
  privacy: { sv: 'Information om externa tjänster, kontakt och databehandling i denna webbversion för Man With Class.', en: 'Information about external services, contact and data handling in this version of the Man With Class website.' },
  '404': { sv: 'Sidan kunde inte hittas. Gå till startsidan för Man With Class Barbershop i Stockholm.', en: 'Page not found. Return to the Man With Class Barbershop website in Stockholm.' }
};

const titles: Record<string, { sv: string; en: string }> = {
  home: { sv: 'Barbershop vid Odenplan i Stockholm', en: 'Barbershop at Odenplan, Stockholm' },
  services: { sv: 'Tjänster & priser – Barbershop vid Odenplan, Vasastan', en: 'Services & prices – Barbershop at Odenplan, Vasastan' },
  projects: { sv: 'Referensprojekt & Herrklippning i Stockholm – Odenplan, Vasastan', en: 'Reference Projects & Men’s Grooming in Stockholm – Odenplan' },
  about: { sv: 'Om salongen i Vasastan', en: 'About our Vasastan salon' },
  barbers: { sv: 'Våra barberare Roy & Serhi – Odenplan', en: 'Our barbers Roy & Serhi – Odenplan' },
  gallery: { sv: 'Galleri & salongen vid Odenplan', en: 'Gallery & the salon at Odenplan' },
  reviews: { sv: 'Kundomdömen – Barbershop Odenplan', en: 'Customer reviews – Barbershop Odenplan' },
  contact: { sv: 'Kontakt & öppettider vid Odenplan, Vasastan', en: 'Contact & opening hours at Odenplan, Vasastan' },
  privacy: { sv: 'Integritetsinformation', en: 'Privacy information' },
  '404': { sv: 'Sidan hittades inte', en: 'Page not found' }
};

const select = (value: { sv: string; en: string }, lang: 'sv' | 'en') => value[lang];

export interface PageMetadata {
  title: string;
  description: string;
  lang: 'sv' | 'en';
  path: string;
  canonical: string;
  indexable: boolean;
  alternates: Array<{ lang: string; href: string }>;
  service?: any;
  person?: Person;
  project?: ProjectItem;
  key: string;
}

export function getMetadata(path: string): PageMetadata {
  const route = resolveRoute(path);
  const { lang, key } = route;
  const s = services.find(item => item.id === route.serviceId);
  const person = publishedPeople.find(p => p.slug === route.personSlug);
  const project = projects.find(item => item.slug === route.projectSlug);

  const title = person
    ? `${lang === 'sv' ? 'Lär känna' : 'Meet'} ${person.fullName} | Man With Class`
    : s
    ? `${s.title[lang]} ${lang === 'sv' ? 'vid Odenplan, Vasastan' : 'at Odenplan, Vasastan'} | Man With Class Barbershop`
    : project
    ? `${project.seo.title[lang]}`
    : `${titles[key === 'service' || key === 'project' ? '404' : key]?.[lang] || titles['404'][lang]} | Man With Class`;

  const description = person
    ? `${person.role[lang]}. ${person.intro[lang]}`
    : s
    ? `${s.title[lang]} ${lang === 'sv' ? 'hos' : 'at'} Man With Class ${lang === 'sv' ? 'vid Odenplan i Vasastan' : 'at Odenplan in Vasastan'}. ${s.intro[lang]} ${lang === 'sv' ? 'Boka din tid på Upplandsgatan 51 i Stockholm via Bokadirekt.' : 'Book your appointment at Upplandsgatan 51 in Stockholm via Bokadirekt.'}`
    : project
    ? `${project.seo.description[lang]}`
    : select(descriptions[key === 'service' || key === 'project' ? '404' : key] || descriptions['404'], lang);

  return {
    title,
    description,
    lang,
    path,
    canonical: site.domain + (path === '/' ? '/' : path),
    indexable: site.indexable && key !== '404',
    alternates: key === '404' ? [] : ['sv', 'en', 'x-default'].map(locale => ({
      lang: locale,
      href: site.domain + alternatePath(path, locale === 'x-default' ? 'sv' : (locale as 'sv' | 'en'))
    })),
    service: s,
    person,
    project,
    key
  };
}

export function structuredData(path: string) {
  const meta = getMetadata(path);
  if (meta.key === '404') return null;
  const business = {
    '@type': 'HairSalon',
    '@id': site.domain + '/#salon',
    name: site.fullName,
    url: site.domain + '/',
    image: site.domain + '/images/salon-wide.webp',
    logo: site.domain + '/images/logo.webp',
    telephone: '+46709627503',
    email: site.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      postalCode: site.postcode,
      addressLocality: site.city,
      addressRegion: 'Stockholm',
      addressCountry: 'SE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.3444,
      longitude: 18.0505
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Odenplan' },
      { '@type': 'AdministrativeArea', name: 'Vasastan' },
      { '@type': 'AdministrativeArea', name: 'Sankt Eriksplan' },
      { '@type': 'AdministrativeArea', name: 'Birkastan' },
      { '@type': 'AdministrativeArea', name: 'Kungsholmen' },
      { '@type': 'AdministrativeArea', name: 'Norrmalm' },
      { '@type': 'AdministrativeArea', name: 'Östermalm' },
      { '@type': 'City', name: 'Stockholm' }
    ],
    hasMap: site.mapsUrl,
    sameAs: [site.instagram, site.facebook, site.bookingUrl],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' }
    ]
  };

  const graph: any[] = [
    business,
    { '@type': 'WebSite', '@id': site.domain + '/#website', url: site.domain + '/', name: site.fullName, inLanguage: ['sv', 'en'] },
    { '@type': 'WebPage', '@id': meta.canonical + '#webpage', url: meta.canonical, name: meta.title, description: meta.description, inLanguage: meta.lang, about: { '@id': site.domain + '/#salon' }, isPartOf: { '@id': site.domain + '/#website' } }
  ];

  if (meta.service) {
    const s = meta.service;
    graph.push({
      '@type': 'Service',
      '@id': meta.canonical + '#service',
      name: `${s.title[meta.lang]} – Odenplan, Vasastan, Stockholm`,
      description: `${s.intro[meta.lang]} ${meta.lang === 'sv' ? 'Professionell barberarbehandling hos Man With Class på Upplandsgatan 51 vid Odenplan i Vasastan, Stockholm.' : 'Professional barber service at Man With Class on Upplandsgatan 51 near Odenplan in Vasastan, Stockholm.'}`,
      serviceType: s.title[meta.lang],
      provider: { '@id': site.domain + '/#salon' },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Odenplan' },
        { '@type': 'AdministrativeArea', name: 'Vasastan' },
        { '@type': 'City', name: 'Stockholm' }
      ],
      ...(s.from ? {} : { offers: { '@type': 'Offer', price: s.price, priceCurrency: 'SEK', availability: 'https://schema.org/InStock', url: site.bookingUrl } })
    });
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': meta.canonical + '#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: meta.lang === 'sv' ? 'Hem' : 'Home',
          item: site.domain + (meta.lang === 'sv' ? '/' : '/en')
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.lang === 'sv' ? 'Tjänster & priser' : 'Services & prices',
          item: site.domain + (meta.lang === 'sv' ? '/tjanster' : '/en/services')
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: s.title[meta.lang],
          item: meta.canonical
        }
      ]
    });
  }

  if (meta.project) {
    const p = meta.project;
    graph.push({
      '@type': 'CreativeWork',
      '@id': meta.canonical + '#project',
      name: p.title[meta.lang],
      headline: p.title[meta.lang],
      description: p.description[meta.lang],
      image: `${site.domain}${p.image}`,
      dateCreated: `${p.year}-01-01`,
      author: { '@id': site.domain + '/#salon' },
      provider: { '@id': site.domain + '/#salon' },
      locationCreated: {
        '@type': 'Place',
        name: p.location[meta.lang],
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address,
          postalCode: site.postcode,
          addressLocality: site.city,
          addressRegion: 'Stockholm',
          addressCountry: 'SE'
        }
      }
    });
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': meta.canonical + '#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: meta.lang === 'sv' ? 'Hem' : 'Home',
          item: site.domain + (meta.lang === 'sv' ? '/' : '/en')
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.lang === 'sv' ? 'Projekt & Referenser' : 'Projects & References',
          item: site.domain + (meta.lang === 'sv' ? '/projekt' : '/en/projects')
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: p.title[meta.lang],
          item: meta.canonical
        }
      ]
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderHead(path: string) {
  const m = getMetadata(path);
  const schema = structuredData(path);
  const image = esc(`${site.domain}/images/index-pic.webp`);
  return `<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<meta name="robots" content="${m.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}">
<link rel="canonical" href="${esc(m.canonical)}">
${m.alternates.map(a => `<link rel="alternate" hreflang="${a.lang}" href="${esc(a.href)}">`).join('\n')}
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
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

export default {
  getMetadata,
  structuredData,
  renderHead
};
