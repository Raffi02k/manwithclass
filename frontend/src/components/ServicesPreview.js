// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module3 from "../content/data.js";
import __module9 from "../hooks/useLocale.js";
import __module17 from "./Reveal.js";
import __module11 from "./Icon.js";
import * as ReactRouterDOM from "react-router-dom";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.ServicesPreview = ServicesPreview;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const react_router_dom_1 = ReactRouterDOM;
const data_1 = __module3;
const useLocale_1 = __module9;
const Reveal_1 = __module17;
const Icon_1 = __module11;
function ServicesPreview() { const [active, setActive] = (0, react_1.useState)(0); const featured = data_1.services.slice(0, 4); const { lang, t, path, servicePath } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsx)("section", { className: "services-preview section-space", id: "priser", children: (0, jsx_runtime_1.jsxs)("div", { className: "container services-split", children: [(0, jsx_runtime_1.jsxs)("div", { className: "services-photo", children: [featured.map((s, i) => (0, jsx_runtime_1.jsx)("img", { className: `service-preview-photo ${i === active ? 'is-active' : ''}`, src: s.image, alt: i === active ? (s.illustrative ? t('Tillfällig inspirationsbild för ', 'Temporary inspiration image for ') : '') + s.title[lang] : '', "aria-hidden": i !== active, width: "650", height: "850", loading: "lazy" }, s.id)), (0, jsx_runtime_1.jsx)("div", { className: "services-photo-shade" }), (0, jsx_runtime_1.jsx)("span", { className: "eyebrow", children: "THE CRAFT / THE DETAILS" }), (0, jsx_runtime_1.jsxs)("h2", { children: ["LOOK GOOD.", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "FEEL BETTER." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "services-stamp", children: ["MW", (0, jsx_runtime_1.jsx)("span", { children: "ODENPLAN" })] }), featured[active].illustrative && (0, jsx_runtime_1.jsx)("span", { className: "image-label", children: t('Tillfällig inspirationsbild', 'Temporary inspiration image') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "services-copy", children: [(0, jsx_runtime_1.jsxs)(Reveal_1.Reveal, { children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: t('Tjänster & priser', 'The service menu') }), (0, jsx_runtime_1.jsxs)("h2", { children: [t('HANTVERK.', 'GOOD CRAFT.'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "accent", children: t('INGA GENVÄGAR.', 'NO SHORTCUTS.') })] }), (0, jsx_runtime_1.jsx)("p", { children: t('Välj din behandling. Vi tar hand om detaljerna.', 'Choose your treatment. We take care of the details.') })] }), (0, jsx_runtime_1.jsx)("div", { className: "service-preview-list", children: featured.map((s, i) => (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: servicePath(s.id), onMouseEnter: () => setActive(i), onFocus: () => setActive(i), children: [(0, jsx_runtime_1.jsxs)("span", { className: "service-number", children: ["0", i + 1] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: s.title[lang] }), (0, jsx_runtime_1.jsxs)("p", { children: [data_1.categories[s.category][lang], " / ", s.minutes, " min"] })] }), (0, jsx_runtime_1.jsx)("span", { className: "service-price", children: (0, data_1.priceLabel)(s, lang) }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] }, s.id)) }), (0, jsx_runtime_1.jsxs)("div", { className: "service-list-footer", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: "button button-outline", to: path('services'), children: [t('Alla tjänster & priser', 'All services & prices'), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] }), (0, jsx_runtime_1.jsxs)("p", { children: [t('Priser enligt Bokadirekt, kontrollerade 2026-09-15.', 'Prices from Bokadirekt, checked 2026-09-15.'), (0, jsx_runtime_1.jsx)("br", {}), t('Aktuellt pris och lediga tider visas i bokningen.', 'See the booking service for current prices and availability.')] })] })] })] }) }); }

export default moduleValues;
const __export_ServicesPreview = moduleValues.ServicesPreview;
export { __export_ServicesPreview as ServicesPreview };
