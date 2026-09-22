import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveRoute } from './content/routes';
import { services } from './content/data';
import { publishedPeople } from './content/people';
import { MotionProvider } from './components/MotionProvider';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageMeta } from './components/PageMeta';
import {
  HomePage,
  AboutPage,
  BarbersPage,
  BarberPage,
  ServicesPage,
  ServicePage,
  GalleryPage,
  ReviewsPage,
  ContactPage,
  PrivacyPage,
  NotFoundPage,
} from './pages';

export function App() {
  const { pathname } = useLocation();
  const route = resolveRoute(pathname);

  let pageContent: ReactNode;

  if (route.key === 'person') {
    const person = publishedPeople.find((p) => p.slug === route.personSlug);
    pageContent = person ? <BarberPage person={person} /> : <NotFoundPage />;
  } else if (route.key === 'service') {
    const service = services.find((s) => s.id === route.serviceId) || services[0];
    pageContent = <ServicePage service={service} />;
  } else {
    switch (route.key) {
      case 'home':
        pageContent = <HomePage />;
        break;
      case 'services':
        pageContent = <ServicesPage />;
        break;
      case 'about':
        pageContent = <AboutPage />;
        break;
      case 'barbers':
        pageContent = <BarbersPage />;
        break;
      case 'gallery':
        pageContent = <GalleryPage />;
        break;
      case 'reviews':
        pageContent = <ReviewsPage />;
        break;
      case 'contact':
        pageContent = <ContactPage />;
        break;
      case 'privacy':
        pageContent = <PrivacyPage />;
        break;
      case '404':
      default:
        pageContent = <NotFoundPage />;
        break;
    }
  }

  return (
    <MotionProvider>
      <PageMeta />
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} key={pathname}>
        {pageContent}
      </main>
      <Footer />
    </MotionProvider>
  );
}

export default App;
