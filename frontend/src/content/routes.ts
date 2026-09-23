import servicesData from './services.json';
import { publishedPeople } from './people';
import { projects } from './projects';

export interface RouteInfo {
  key: string;
  lang: 'sv' | 'en';
  serviceId?: string;
  personSlug?: string;
  projectSlug?: string;
}

export const personPath = (slug: string, lang: 'sv' | 'en') =>
  `${lang === 'en' ? '/en/barbers' : '/barberare'}/${slug}`;

export const baseRoutes: Record<string, { sv: string; en: string }> = {
  home: { sv: '/', en: '/en' },
  services: { sv: '/tjanster', en: '/en/services' },
  about: { sv: '/om-oss', en: '/en/about' },
  barbers: { sv: '/barberare', en: '/en/barbers' },
  gallery: { sv: '/galleri', en: '/en/gallery' },
  projects: { sv: '/projekt', en: '/en/projects' },
  reviews: { sv: '/recensioner', en: '/en/reviews' },
  contact: { sv: '/kontakt', en: '/en/contact' },
  privacy: { sv: '/integritet', en: '/en/privacy' }
};

export const pathFor = (key: string, lang: 'sv' | 'en') => baseRoutes[key][lang];

export const servicePath = (id: string, lang: 'sv' | 'en') => {
  const service = servicesData.find(s => s.id === id);
  return `${pathFor('services', lang)}/${(service?.slug as { sv: string; en: string })?.[lang] || id}`;
};

export const projectPath = (slug: string, lang: 'sv' | 'en') =>
  `${pathFor('projects', lang)}/${slug}`;

export const getLang = (path: string): 'sv' | 'en' =>
  path === '/en' || path.startsWith('/en/') ? 'en' : 'sv';

export function resolveRoute(path: string): RouteInfo {
  const normalized = path.replace(/\/$/, '') || '/';
  const lang = getLang(normalized);
  for (const [key, paths] of Object.entries(baseRoutes)) {
    if (paths[lang] === normalized) return { key, lang };
  }
  const service = servicesData.find(s => servicePath(s.id, lang) === normalized);
  if (service) return { key: 'service', lang, serviceId: service.id };
  const person = publishedPeople.find(person => personPath(person.slug, lang) === normalized);
  if (person) return { key: 'person', lang, personSlug: person.slug };
  const project = projects.find(project => projectPath(project.slug, lang) === normalized);
  if (project) return { key: 'project', lang, projectSlug: project.slug };
  return { key: '404', lang };
}

export function alternatePath(path: string, lang: 'sv' | 'en') {
  const r = resolveRoute(path);
  if (r.key === 'person' && r.personSlug) return personPath(r.personSlug, lang);
  if (r.key === 'service' && r.serviceId) return servicePath(r.serviceId, lang);
  if (r.key === 'project' && r.projectSlug) return projectPath(r.projectSlug, lang);
  return pathFor(r.key === '404' ? 'home' : r.key, lang);
}

export const routePaths: string[] = ['sv', 'en'].flatMap(l => {
  const lang = l as 'sv' | 'en';
  return [
    ...Object.values(baseRoutes).map(p => p[lang]),
    ...servicesData.map(s => servicePath(s.id, lang)),
    ...publishedPeople.map(person => personPath(person.slug, lang)),
    ...projects.map(project => projectPath(project.slug, lang))
  ];
});

export default {
  routePaths,
  getLang,
  servicePath,
  projectPath,
  pathFor,
  baseRoutes,
  resolveRoute,
  alternatePath
};
