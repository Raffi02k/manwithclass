// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module3 from "./data.js";
import { publishedPeople } from './people.js';

export const personPath = (slug, lang) => `${lang === 'en' ? '/en/barbers' : '/barberare'}/${slug}`;

const moduleValues = { __esModule: true };
moduleValues.routePaths = moduleValues.getLang = moduleValues.servicePath = moduleValues.pathFor = moduleValues.baseRoutes = void 0;
moduleValues.resolveRoute = resolveRoute;
moduleValues.alternatePath = alternatePath;
const data_1 = __module3;
moduleValues.baseRoutes = {
    home: { sv: '/', en: '/en' }, services: { sv: '/tjanster', en: '/en/services' }, about: { sv: '/om-oss', en: '/en/about' },
    barbers: { sv: '/barberare', en: '/en/barbers' }, gallery: { sv: '/galleri', en: '/en/gallery' }, reviews: { sv: '/recensioner', en: '/en/reviews' },
    contact: { sv: '/kontakt', en: '/en/contact' }, privacy: { sv: '/integritet', en: '/en/privacy' }
};
const pathFor = (key, lang) => moduleValues.baseRoutes[key][lang];
moduleValues.pathFor = pathFor;
const servicePath = (id, lang) => `${(0, moduleValues.pathFor)('services', lang)}/${data_1.services.find(s => s.id === id)?.slug[lang] || id}`;
moduleValues.servicePath = servicePath;
const getLang = (path) => path === '/en' || path.startsWith('/en/') ? 'en' : 'sv';
moduleValues.getLang = getLang;
function resolveRoute(path) {
    const normalized = path.replace(/\/$/, '') || '/';
    const lang = (0, moduleValues.getLang)(normalized);
    for (const [key, paths] of Object.entries(moduleValues.baseRoutes))
        if (paths[lang] === normalized)
            return { key: key, lang };
    const service = data_1.services.find(s => (0, moduleValues.servicePath)(s.id, lang) === normalized);
    const person = publishedPeople.find(person => personPath(person.slug, lang) === normalized);
    if (person) return { key: 'person', lang, personSlug: person.slug };
    return service ? { key: 'service', lang, serviceId: service.id } : { key: '404', lang };
}
function alternatePath(path, lang) { const r = resolveRoute(path); if (r.key === 'person') return personPath(r.personSlug, lang); return r.key === 'service' ? (0, moduleValues.servicePath)(r.serviceId, lang) : (0, moduleValues.pathFor)(r.key === '404' ? 'home' : r.key, lang); }
moduleValues.routePaths = ['sv', 'en'].flatMap(lang => [...Object.values(moduleValues.baseRoutes).map(p => p[lang]), ...data_1.services.map(s => (0, moduleValues.servicePath)(s.id, lang)), ...publishedPeople.map(person => personPath(person.slug, lang))]);

export default moduleValues;
const __export_routePaths = moduleValues.routePaths;
export { __export_routePaths as routePaths };
const __export_getLang = moduleValues.getLang;
export { __export_getLang as getLang };
const __export_servicePath = moduleValues.servicePath;
export { __export_servicePath as servicePath };
const __export_pathFor = moduleValues.pathFor;
export { __export_pathFor as pathFor };
const __export_baseRoutes = moduleValues.baseRoutes;
export { __export_baseRoutes as baseRoutes };
const __export_resolveRoute = moduleValues.resolveRoute;
export { __export_resolveRoute as resolveRoute };
const __export_alternatePath = moduleValues.alternatePath;
export { __export_alternatePath as alternatePath };
