// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module3 from "../content/data.js";
import __module9 from "../hooks/useLocale.js";
import __module8 from "../hooks/useBodyLock.js";
import __module6 from "./MotionProvider.js";
import __module11 from "./Icon.js";
import __module17 from "./Reveal.js";
import * as ReactRouterDOM from "react-router-dom";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.Lightbox = Lightbox;
moduleValues.GalleryCard = GalleryCard;
moduleValues.GalleryRail = GalleryRail;
moduleValues.GalleryGrid = GalleryGrid;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const react_router_dom_1 = ReactRouterDOM;
const data_1 = __module3;
const useLocale_1 = __module9;
const useBodyLock_1 = __module8;
const MotionProvider_1 = __module6;
const Icon_1 = __module11;
const Reveal_1 = __module17;
const categoryLabels = { salon: { sv: 'Salongen', en: 'The salon' }, craft: { sv: 'Hantverket', en: 'The craft' } };
function Lightbox({ items, index, setIndex }) { const dialog = (0, react_1.useRef)(null); const { lang, t } = (0, useLocale_1.useLocale)(); (0, useBodyLock_1.useBodyLock)(index !== null); (0, react_1.useEffect)(() => { const el = dialog.current; if (index !== null && !el?.open)
    el?.showModal();
else if (index === null && el?.open)
    el.close(); }, [index]); const item = index === null ? null : items[index]; return (0, jsx_runtime_1.jsx)("dialog", { className: "mwc-lightbox", ref: dialog, onCancel: () => setIndex(null), onClose: () => setIndex(null), "aria-label": t('Bildvisning', 'Image viewer'), onClick: e => { if (e.target === e.currentTarget)
        setIndex(null); }, onKeyDown: e => { if (index === null)
        return; if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((index + 1) % items.length);
    } if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((index + items.length - 1) % items.length);
    } }, children: item && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "lightbox-toolbar", children: [(0, jsx_runtime_1.jsxs)("span", { children: [index + 1, " / ", items.length] }), (0, jsx_runtime_1.jsx)("button", { autoFocus: true, className: "icon-button", onClick: () => setIndex(null), "aria-label": t('Stäng bilden', 'Close image'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close" }) })] }), (0, jsx_runtime_1.jsxs)("figure", { children: [(0, jsx_runtime_1.jsx)("img", { src: item.src, alt: item.alt[lang] }), (0, jsx_runtime_1.jsxs)("figcaption", { children: [(0, jsx_runtime_1.jsx)("strong", { children: item.title[lang] }), (0, jsx_runtime_1.jsx)("span", { children: categoryLabels[item.category][lang] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "lightbox-controls", children: [(0, jsx_runtime_1.jsx)("button", { className: "icon-button", onClick: () => setIndex((index + items.length - 1) % items.length), "aria-label": t('Föregående bild', 'Previous image'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "arrowLeft" }) }), (0, jsx_runtime_1.jsx)("button", { className: "icon-button", onClick: () => setIndex((index + 1) % items.length), "aria-label": t('Nästa bild', 'Next image'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "arrowRight" }) })] })] }) }); }
function GalleryCard({ item, index, onClick }) { const { lang, t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsxs)("button", { className: `chair-card chair-card-${index % 3}`, onClick: onClick, "aria-label": `${t('Öppna bild', 'Open image')}: ${item.title[lang]}`, children: [(0, jsx_runtime_1.jsx)("img", { src: item.src, srcSet: item.src.endsWith('.webp') ? `${item.src.replace('.webp', '-sm.webp')} 640w, ${item.src} 1600w` : undefined, sizes: "(max-width: 740px) 82vw, 355px", alt: item.alt[lang], loading: "lazy", decoding: "async", width: "520", height: "680", style: { objectPosition: item.position } }), (0, jsx_runtime_1.jsx)("span", { className: "chair-card-number", children: String(index + 1).padStart(2, '0') }), (0, jsx_runtime_1.jsxs)("span", { className: "chair-card-caption", children: [(0, jsx_runtime_1.jsx)("small", { children: categoryLabels[item.category][lang] }), (0, jsx_runtime_1.jsx)("strong", { children: item.title[lang] }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "expand" })] })] }); }
function GalleryRail() { const rail = (0, react_1.useRef)(null), [index, setIndex] = (0, react_1.useState)(null); const { path, t } = (0, useLocale_1.useLocale)(); const { reduced } = (0, MotionProvider_1.useMotion)(); return (0, jsx_runtime_1.jsxs)("section", { className: "chair-section section-space", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-heading container", children: [(0, jsx_runtime_1.jsxs)(Reveal_1.Reveal, { children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "THE CHAIR / MAN WITH CLASS" }), (0, jsx_runtime_1.jsxs)("h2", { children: [t('EN STOL.', 'ONE CHAIR.'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "outline", children: t('DIN BERÄTTELSE.', 'YOUR STORY.') })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: t('Platsen. Stilen. De små detaljerna.', 'The space. The style. The little details.') }), (0, jsx_runtime_1.jsxs)("div", { className: "rail-controls", children: [(0, jsx_runtime_1.jsx)("span", { children: t('Svep för fler bilder', 'Swipe to explore') }), [-1, 1].map(dir => (0, jsx_runtime_1.jsx)("button", { className: "icon-button", onClick: () => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * .72, behavior: reduced ? 'instant' : 'smooth' }), "aria-label": dir === -1 ? t('Föregående bilder', 'Previous images') : t('Nästa bilder', 'Next images'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: dir === -1 ? 'arrowLeft' : 'arrowRight' }) }, dir))] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "chair-rail", ref: rail, tabIndex: 0, role: "region", "aria-label": t('Salongens bildgalleri', 'Salon photo gallery'), children: data_1.gallery.map((item, i) => (0, jsx_runtime_1.jsx)(GalleryCard, { item: item, index: i, onClick: () => setIndex(i) }, item.id)) }), (0, jsx_runtime_1.jsxs)("div", { className: "container rail-foot", children: [(0, jsx_runtime_1.jsx)("span", { children: t('Klippningar, skägg och livet i salongen.', 'Haircuts, beards and life at the salon.') }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: "text-link", to: path('gallery'), children: [t('Hela galleriet', 'Explore the gallery'), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] })] }), (0, jsx_runtime_1.jsx)(Lightbox, { items: data_1.gallery, index: index, setIndex: setIndex })] }); }
function GalleryGrid() { const [category, setCategory] = (0, react_1.useState)('all'), [index, setIndex] = (0, react_1.useState)(null); const { lang, t } = (0, useLocale_1.useLocale)(); const items = category === 'all' ? data_1.gallery : data_1.gallery.filter(i => i.category === category); return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "filter-tabs", role: "group", "aria-label": t('Filtrera bilder', 'Filter photos'), children: [['all', t('Alla', 'All')], ...Object.entries(categoryLabels).map(([k, v]) => [k, v[lang]])].map(([key, label]) => (0, jsx_runtime_1.jsx)("button", { className: category === key ? 'active' : '', "aria-pressed": category === key, onClick: () => { setIndex(null); setCategory(key); }, children: label }, key)) }), (0, jsx_runtime_1.jsx)("div", { className: "mwc-gallery-grid", children: items.map((item, i) => (0, jsx_runtime_1.jsx)(GalleryCard, { item: item, index: i, onClick: () => setIndex(i) }, item.id)) }), (0, jsx_runtime_1.jsx)(Lightbox, { items: items, index: index, setIndex: setIndex })] }); }

export default moduleValues;
const __export_Lightbox = moduleValues.Lightbox;
export { __export_Lightbox as Lightbox };
const __export_GalleryCard = moduleValues.GalleryCard;
export { __export_GalleryCard as GalleryCard };
const __export_GalleryRail = moduleValues.GalleryRail;
export { __export_GalleryRail as GalleryRail };
const __export_GalleryGrid = moduleValues.GalleryGrid;
export { __export_GalleryGrid as GalleryGrid };
