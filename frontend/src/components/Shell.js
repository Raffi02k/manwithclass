// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module8 from "../hooks/useBodyLock.js";
import __module9 from "../hooks/useLocale.js";
import __module2 from "../content/routes.js";
import __module10 from "../content/site.js";
import __module11 from "./Icon.js";
import * as ReactRouterDOM from "react-router-dom";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.BookingButton = BookingButton;
moduleValues.Brand = Brand;
moduleValues.LanguageSwitch = LanguageSwitch;
moduleValues.Header = Header;
moduleValues.Footer = Footer;
moduleValues.PageHero = PageHero;
moduleValues.ScrollToTop = ScrollToTop;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const react_router_dom_1 = ReactRouterDOM;
const useBodyLock_1 = __module8;
const useLocale_1 = __module9;
const routes_1 = __module2;
const site_1 = __module10;
const Icon_1 = __module11;
function BookingButton({ label, className = '' }) {
    const { t } = (0, useLocale_1.useLocale)();
    return (0, jsx_runtime_1.jsxs)("a", { className: `button button-primary ${className}`, href: site_1.site.bookingUrl, target: "_blank", rel: "noopener noreferrer", "data-booking": true, children: [label || t('Boka din tid', 'Book your visit'), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] });
}
function Brand({ large = false }) {
    const { path, t } = (0, useLocale_1.useLocale)();
    const { pathname } = (0, react_router_dom_1.useLocation)();
    const scrollToTop = (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (pathname !== path('home')) return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: `brand mwc-brand ${large ? 'brand-large' : ''}`, to: path('home'), onClick: scrollToTop, "aria-label": t('Man With Class, startsida', 'Man With Class, home'), children: (0, jsx_runtime_1.jsx)("img", { src: "/images/logo-small.webp", alt: "Man With Class Barbershop", width: "300", height: "177" }) });
}
const nav = [{ key: 'services', sv: 'Tjänster & priser', en: 'Services & prices' }, { key: 'about', sv: 'Om oss', en: 'Our story' }, { key: 'gallery', sv: 'Galleri', en: 'Gallery' }, { key: 'reviews', sv: 'Omdömen', en: 'Reviews' }, { key: 'contact', sv: 'Hitta hit', en: 'Find us' }];
function LanguageSwitch() { const { pathname } = (0, react_router_dom_1.useLocation)(); const { lang, t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsx)("nav", { className: "language-switch", "aria-label": t('Välj språk', 'Choose language'), children: ['sv', 'en'].map(l => (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: (0, routes_1.alternatePath)(pathname, l), lang: l, hrefLang: l, className: l === lang ? 'active' : '', "aria-current": l === lang ? 'true' : undefined, children: l.toUpperCase() }, l)) }); }
function Header() {
    const { lang, path, t } = (0, useLocale_1.useLocale)();
    const [open, setOpen] = (0, react_1.useState)(false), [scrolled, setScrolled] = (0, react_1.useState)(false);
    const dialog = (0, react_1.useRef)(null), trigger = (0, react_1.useRef)(null);
    const location = (0, react_router_dom_1.useLocation)();
    (0, useBodyLock_1.useBodyLock)(open);
    (0, react_1.useEffect)(() => { setOpen(false); }, [location.pathname]);
    (0, react_1.useEffect)(() => { const update = () => setScrolled(window.scrollY > 35); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
    (0, react_1.useEffect)(() => { const el = dialog.current; if (!el)
        return; if (open && !el.open)
        el.showModal();
    else if (!open && el.open) {
        el.close();
        trigger.current?.focus();
    } }, [open]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("a", { className: "skip-link", href: "#main", children: t('Hoppa till innehållet', 'Skip to content') }), (0, jsx_runtime_1.jsx)("header", { className: `site-header ${scrolled ? 'is-scrolled' : ''}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "header-inner", children: [(0, jsx_runtime_1.jsx)(Brand, {}), (0, jsx_runtime_1.jsx)("nav", { className: "desktop-nav", "aria-label": t('Huvudnavigation', 'Main navigation'), children: nav.map(n => (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: path(n.key), children: n[lang] }, n.key)) }), (0, jsx_runtime_1.jsxs)("div", { className: "header-actions", children: [(0, jsx_runtime_1.jsx)(LanguageSwitch, {}), (0, jsx_runtime_1.jsx)(BookingButton, { label: t('Boka tid', 'Book now'), className: "header-booking" }), (0, jsx_runtime_1.jsx)("button", { className: "menu-toggle icon-button", ref: trigger, onClick: () => setOpen(true), "aria-label": t('Öppna menyn', 'Open menu'), "aria-expanded": open, "aria-controls": "mobile-menu", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "menu" }) })] })] }) }), (0, jsx_runtime_1.jsxs)("dialog", { className: "mobile-menu", id: "mobile-menu", ref: dialog, onCancel: () => setOpen(false), onClose: () => setOpen(false), "aria-labelledby": "menu-title", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mobile-menu-top", children: [(0, jsx_runtime_1.jsx)(Brand, {}), (0, jsx_runtime_1.jsx)("button", { className: "icon-button", onClick: () => setOpen(false), "aria-label": t('Stäng menyn', 'Close menu'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close" }) })] }), (0, jsx_runtime_1.jsx)("p", { className: "eyebrow", id: "menu-title", children: "MAN WITH CLASS / ODENPLAN" }), (0, jsx_runtime_1.jsx)("nav", { "aria-label": t('Mobilnavigation', 'Mobile navigation'), children: [{ key: 'home', sv: 'Hem', en: 'Home' }, ...nav].map((n, i) => (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, { to: path(n.key), end: n.key === 'home', onClick: () => setOpen(false), children: [(0, jsx_runtime_1.jsxs)("span", { children: ["0", i + 1] }), n[lang], (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] }, n.key)) }), (0, jsx_runtime_1.jsx)(BookingButton, {}), (0, jsx_runtime_1.jsxs)("div", { className: "mobile-menu-info", children: [site_1.site.address, (0, jsx_runtime_1.jsx)("br", {}), site_1.site.postcode, " ", site_1.site.city, (0, jsx_runtime_1.jsx)("a", { href: site_1.site.phoneHref, children: site_1.site.phone })] })] })] });
}
function Footer() { const { lang, path, t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsxs)("footer", { className: "site-footer", children: [(0, jsx_runtime_1.jsxs)("div", { className: "footer-top container", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: t('Din nästa look börjar här.', 'Your next look starts here.') }), (0, jsx_runtime_1.jsxs)("a", { href: site_1.site.bookingUrl, target: "_blank", rel: "noopener noreferrer", className: "footer-call", children: [t('VI SES VID', 'SEE YOU IN'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: t('STOLEN.', 'THE CHAIR.') }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] })] }), (0, jsx_runtime_1.jsx)(BookingButton, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "footer-grid container", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Brand, { large: true }), (0, jsx_runtime_1.jsxs)("p", { children: [t('Klippning. Skägg. Karaktär.', 'Hair. Beard. Character.'), (0, jsx_runtime_1.jsx)("br", {}), t('Barberarhantverk vid Odenplan.', 'Barbering at Odenplan.')] }), (0, jsx_runtime_1.jsxs)("a", { className: "social-link", href: site_1.site.instagram, target: "_blank", rel: "noopener noreferrer", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "instagram" }), "@manwithclass.se"] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: t('Utforska', 'Explore') }), nav.map(n => (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: path(n.key), children: n[lang] }, n.key)), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: path('barbers'), children: t('Barberarna', 'Our barbers') })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: t('Hitta oss', 'Visit us') }), (0, jsx_runtime_1.jsxs)("a", { href: site_1.site.mapsUrl, target: "_blank", rel: "noopener noreferrer", children: [site_1.site.address, (0, jsx_runtime_1.jsx)("br", {}), site_1.site.postcode, " ", site_1.site.city] }), (0, jsx_runtime_1.jsx)("a", { href: site_1.site.phoneHref, children: site_1.site.phone }), (0, jsx_runtime_1.jsx)("a", { href: `mailto:${site_1.site.email}`, children: site_1.site.email })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: t('Öppettider', 'Opening hours') }), site_1.site.hours.map((h, i) => (0, jsx_runtime_1.jsxs)("div", { className: "footer-hours", children: [(0, jsx_runtime_1.jsx)("span", { children: h.label[lang] }), (0, jsx_runtime_1.jsx)("span", { children: h.value[lang] })] }, i)), (0, jsx_runtime_1.jsx)("small", { children: t('Se aktuella lediga tider på Bokadirekt.', 'See current availability on Bokadirekt.') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "footer-bottom container", children: [(0, jsx_runtime_1.jsxs)("span", { children: ['©', " 2026 Man With Class"] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: path('privacy'), children: t('Integritet', 'Privacy') }), (0, jsx_runtime_1.jsxs)("a", { href: site_1.site.creditUrl, className: "agency-credit", target: "_blank", rel: "noopener noreferrer", children: [(0, jsx_runtime_1.jsx)("span", { children: t('Byggd av', 'Built by') }), (0, jsx_runtime_1.jsxs)("strong", { children: ["Media", (0, jsx_runtime_1.jsx)("span", { children: "Magnet" })] }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] })] })] }); }
function PageHero({ eyebrow, title, description, image = '/images/salon-wide.webp', children, illustrative = false }) { const { path, t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsxs)("section", { className: "page-hero", children: [(0, jsx_runtime_1.jsx)("img", { src: image, alt: "", width: "1440", height: "900", fetchpriority: "high" }), (0, jsx_runtime_1.jsx)("div", { className: "page-hero-shade" }), (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsx)("nav", { "aria-label": t('Brödsmulor', 'Breadcrumb'), children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: path('home'), className: "breadcrumb", children: ["Man With Class ", (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "arrowRight" }), " ", eyebrow] }) }), (0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: eyebrow }), (0, jsx_runtime_1.jsx)("h1", { children: title }), description && (0, jsx_runtime_1.jsx)("p", { className: "page-hero-description", children: description }), children] }), illustrative && (0, jsx_runtime_1.jsx)("span", { className: "image-label", children: t('Tillfällig inspirationsbild', 'Temporary inspiration image') })] }); }
function ScrollToTop() { const { pathname, hash } = (0, react_router_dom_1.useLocation)(); const first = (0, react_1.useRef)(true); (0, react_1.useEffect)(() => { if (first.current) {
    first.current = false;
    return;
} const raf = requestAnimationFrame(() => { if (hash) {
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
}
else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('#main')?.focus({ preventScroll: true });
} }); return () => cancelAnimationFrame(raf); }, [pathname, hash]); return null; }

export default moduleValues;
const __export_BookingButton = moduleValues.BookingButton;
export { __export_BookingButton as BookingButton };
const __export_Brand = moduleValues.Brand;
export { __export_Brand as Brand };
const __export_LanguageSwitch = moduleValues.LanguageSwitch;
export { __export_LanguageSwitch as LanguageSwitch };
const __export_Header = moduleValues.Header;
export { __export_Header as Header };
const __export_Footer = moduleValues.Footer;
export { __export_Footer as Footer };
const __export_PageHero = moduleValues.PageHero;
export { __export_PageHero as PageHero };
const __export_ScrollToTop = moduleValues.ScrollToTop;
export { __export_ScrollToTop as ScrollToTop };
