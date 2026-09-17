import { resolveRoute } from './content/routes.js';
import { services } from './content/data.js';
import { publishedPeople } from './content/people.js';
import { MotionProvider } from './components/MotionProvider.js';
import { ScrollToTop, Header, Footer } from './components/Shell.js';
import { PageMeta } from './components/PageMeta.js';
import Pages from './pages/Pages.js';
import ServicePages from './pages/ServicePages.js';
import { PersonPage } from './pages/PersonPage.jsx';
import { useLocation } from 'react-router-dom';
import { jsx, jsxs } from 'react/jsx-runtime';

export function App() {
    const { pathname } = useLocation();
    const route = resolveRoute(pathname);
    const pages = {
        home: jsx(Pages.HomePage, {}), services: jsx(ServicePages.ServicesPage, {}),
        about: jsx(Pages.AboutPage, {}), barbers: jsx(Pages.BarbersPage, {}),
        gallery: jsx(Pages.GalleryPage, {}), reviews: jsx(Pages.ReviewsPage, {}),
        contact: jsx(Pages.ContactPage, {}), privacy: jsx(Pages.PrivacyPage, {}),
        '404': jsx(Pages.NotFoundPage, {}),
        service: jsx(ServicePages.ServicePage, { service: services.find(s => s.id === route.serviceId) || services[0] })
    };
    const page = route.key === 'person'
        ? jsx(PersonPage, { person: publishedPeople.find(person => person.slug === route.personSlug) })
        : pages[route.key];
    return jsxs(MotionProvider, { children: [jsx(PageMeta, {}), jsx(ScrollToTop, {}), jsx(Header, {}), jsx('main', { id: 'main', tabIndex: -1, children: page }, pathname), jsx(Footer, {})] });
}
export default { __esModule: true, App };
