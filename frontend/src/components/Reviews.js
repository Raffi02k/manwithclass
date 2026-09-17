// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module3 from "../content/data.js";
import __module10 from "../content/site.js";
import __module9 from "../hooks/useLocale.js";
import __module6 from "./MotionProvider.js";
import __module11 from "./Icon.js";
import * as ReactRouterDOM from "react-router-dom";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.Stars = Stars;
moduleValues.ReviewCard = ReviewCard;
moduleValues.ReviewSummary = ReviewSummary;
moduleValues.ReviewSourceNote = ReviewSourceNote;
moduleValues.ReviewsRail = ReviewsRail;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const react_router_dom_1 = ReactRouterDOM;
const data_1 = __module3;
const site_1 = __module10;
const useLocale_1 = __module9;
const MotionProvider_1 = __module6;
const Icon_1 = __module11;
function Stars({ rating = 5 }) { const { t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsxs)("span", { className: "review-stars", role: "img", "aria-label": `${rating} ${t('av 5 stjärnor', 'out of 5 stars')}`, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: '★'.repeat(5) }), (0, jsx_runtime_1.jsx)("span", { className: "review-stars-fill", style: { width: `${rating / 5 * 100}%` }, "aria-hidden": "true", children: '★'.repeat(5) })] }); }
function ReviewCard({ review, full = false, duplicate = false }) { const { lang, t, path } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsxs)("article", { className: `review-card ${full ? 'review-card-full' : ''}`, id: full ? review.id : undefined, children: [(0, jsx_runtime_1.jsxs)("div", { className: "review-card-top", children: [(0, jsx_runtime_1.jsx)("span", { className: "review-avatar", "aria-hidden": "true", children: review.name.split(' ').map(x => x[0]).slice(0, 2).join('') }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: review.name }), (0, jsx_runtime_1.jsxs)("span", { children: ["Google / ", review.date.slice(0, 4)] })] }), (0, jsx_runtime_1.jsx)("span", { className: "review-source-mark", "aria-label": "Google", children: "G" })] }), (0, jsx_runtime_1.jsx)(Stars, { rating: review.rating }), (0, jsx_runtime_1.jsx)("blockquote", { children: review.text[lang] }), !full && (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: "review-read", to: `${path('reviews')}#${review.id}`, tabIndex: duplicate ? -1 : 0, children: [t('Läs hela omdömet', 'Read the full review'), " ", (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "arrowRight" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "review-date", children: [(0, jsx_runtime_1.jsx)("time", { dateTime: review.date, children: new Intl.DateTimeFormat(lang === 'sv' ? 'sv-SE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(review.date)) }), lang === 'en' && review.translation ? ' / Google translation' : ''] })] }); }
const groups = [data_1.reviews.slice(0, 5), data_1.reviews.slice(5)];
function ReviewRow({ row }) {
    const rail = (0, react_1.useRef)(null), group = (0, react_1.useRef)(null), drag = (0, react_1.useRef)(null), focus = (0, react_1.useRef)(false), resume = (0, react_1.useRef)(0), pointer = (0, react_1.useRef)(false);
    const { reduced } = (0, MotionProvider_1.useMotion)();
    const { t } = (0, useLocale_1.useLocale)();
    function moveTo(position) {
        const el = rail.current, distance = group.current?.offsetWidth || 0;
        if (!el) return;
        el.scrollLeft = !reduced && distance > 0
            ? distance + ((position - distance) % distance + distance) % distance
            : position;
    }
    function releasePointer() {
        if (!pointer.current && !drag.current) return;
        drag.current = null;
        pointer.current = false;
        resume.current = performance.now() + 120;
    }
    (0, react_1.useEffect)(() => {
        const el = rail.current;
        if (!el || reduced) return;
        const wheel = (event) => {
            const delta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
            if (!delta) return;
            event.preventDefault();
            const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientWidth : 1;
            moveTo(el.scrollLeft + delta * unit);
            resume.current = performance.now() + 120;
        };
        const normalize = () => {
            const distance = group.current?.offsetWidth || 0;
            if (distance && (el.scrollLeft < distance || el.scrollLeft >= distance * 2)) moveTo(el.scrollLeft);
        };
        el.addEventListener('wheel', wheel, { passive: false });
        el.addEventListener('scroll', normalize, { passive: true });
        window.addEventListener('pointerup', releasePointer);
        window.addEventListener('pointercancel', releasePointer);
        return () => {
            el.removeEventListener('wheel', wheel);
            el.removeEventListener('scroll', normalize);
            window.removeEventListener('pointerup', releasePointer);
            window.removeEventListener('pointercancel', releasePointer);
        };
    }, [reduced]);
    (0, react_1.useEffect)(() => { const el = rail.current; if (!el)
        return; if (reduced) {
        el.scrollLeft = 0;
        return;
    } let frame = 0, last = 0, position = group.current?.offsetWidth || 0; el.scrollLeft = position; let visible = false; const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el); const tick = (now) => { const distance = group.current?.offsetWidth || 0, dt = last ? Math.min(now - last, 40) : 0; last = now; if (visible && !document.hidden && !focus.current && !pointer.current && !drag.current && now > resume.current && distance > 0) {
        position += (row === 0 ? 1 : -1) * dt * .027;
        position = distance + ((position - distance) % distance + distance) % distance;
        el.scrollLeft = position;
    }
    else
        position = el.scrollLeft; frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => { cancelAnimationFrame(frame); io.disconnect(); }; }, [row, reduced]);
    function scroll(dir) { resume.current = performance.now() + 120; if (rail.current) moveTo(rail.current.scrollLeft + dir * rail.current.clientWidth * .72); }
    return (0, jsx_runtime_1.jsxs)("div", { className: "review-row", children: [(0, jsx_runtime_1.jsx)("div", { className: "review-scroll-rail", ref: rail, id: `review-row-${row}`, tabIndex: 0, role: "region", "aria-label": `${t('Omdömesrad', 'Review row')} ${row + 1}`, onFocus: e => focus.current = e.target.matches(':focus-visible'), onBlur: e => { if (!e.currentTarget.contains(e.relatedTarget))
                    focus.current = false; }, onKeyDown: e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    scroll(e.key === 'ArrowRight' ? 1 : -1);
                } }, onPointerDown: e => { pointer.current = true; focus.current = false; if (e.button === 0 && !e.target.closest('a,button')) {
                    drag.current = { x: e.clientX };
                    e.currentTarget.setPointerCapture(e.pointerId);
                } }, onPointerMove: e => { if (drag.current) {
                    moveTo(e.currentTarget.scrollLeft + drag.current.x - e.clientX);
                    drag.current.x = e.clientX;
                } }, onPointerUp: releasePointer, onPointerCancel: releasePointer, onLostPointerCapture: releasePointer, children: (0, jsx_runtime_1.jsx)("div", { className: "review-scroll-track", children: (reduced ? [0] : [-1, 0, 1]).map(copy => (0, jsx_runtime_1.jsx)("div", { className: "marquee-group", ref: copy === 0 ? group : undefined, "aria-hidden": copy !== 0 ? true : undefined, children: groups[row].map(review => (0, jsx_runtime_1.jsx)(ReviewCard, { review: review, duplicate: copy !== 0 }, `${copy}-${review.id}`)) }, copy)) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "rail-controls review-row-controls container", children: [(0, jsx_runtime_1.jsx)("span", { children: t('Svep eller använd pilarna', 'Swipe or use the arrows') }), (0, jsx_runtime_1.jsx)("button", { className: "icon-button", onClick: () => scroll(-1), "aria-label": `${t('Föregående omdömen, rad', 'Previous reviews, row')} ${row + 1}`, "aria-controls": `review-row-${row}`, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "arrowLeft" }) }), (0, jsx_runtime_1.jsx)("button", { className: "icon-button", onClick: () => scroll(1), "aria-label": `${t('Nästa omdömen, rad', 'Next reviews, row')} ${row + 1}`, "aria-controls": `review-row-${row}`, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "arrowRight" }) })] })] });
}
function ReviewSummary() { const { t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsxs)("div", { className: "review-summary", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rating-number", children: [t('4,9', '4.9'), (0, jsx_runtime_1.jsx)("small", { children: "/ 5" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Stars, { rating: site_1.site.bookingRating }), (0, jsx_runtime_1.jsxs)("a", { href: site_1.site.bookingUrl, target: "_blank", rel: "noopener noreferrer", children: [site_1.site.bookingRatingCount, " ", t('betyg på Bokadirekt', 'ratings on Bokadirekt'), " ", (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] })] })] }); }
function ReviewSourceNote() { const { t } = (0, useLocale_1.useLocale)(); return (0, jsx_runtime_1.jsx)("p", { className: "content-note review-source-note", children: t('Bokadirekt-betyget kontrollerades 15 september 2026. Korten visar tidigare publicerade Google-omdömen från november 2024, hämtade ur salongens befintliga webbplats. Ingen automatisk liveuppdatering.', 'Bokadirekt rating checked on 15 September 2026. Cards show previously published Google reviews from November 2024, supplied in the salon’s existing website. Not a live feed.') }); }
function ReviewsRail() { const { t, path } = (0, useLocale_1.useLocale)(); const { paused, toggle } = (0, MotionProvider_1.useMotion)(); return (0, jsx_runtime_1.jsxs)("section", { className: "reviews-section section-space", children: [(0, jsx_runtime_1.jsxs)("div", { className: "container reviews-heading", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: t('Orden efter stolen', 'Words after the chair') }), (0, jsx_runtime_1.jsxs)("h2", { children: [t('DET ÄR KÄNSLAN', 'IT IS THE FEELING'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "accent", children: t('SOM STANNAR.', 'THAT STAYS.') })] }), (0, jsx_runtime_1.jsx)(ReviewSummary, {}), (0, jsx_runtime_1.jsx)("p", { className: "review-date", children: t('Bokadirekt / kontrollerat 2026-09-15', 'Bokadirekt / checked 2026-09-15') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "review-marquees", children: [(0, jsx_runtime_1.jsx)(ReviewRow, { row: 0 }), (0, jsx_runtime_1.jsx)(ReviewRow, { row: 1 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "container reviews-foot", children: [(0, jsx_runtime_1.jsxs)("button", { className: "motion-control", onClick: toggle, "aria-pressed": paused, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: paused ? 'play' : 'pause' }), paused ? t('Starta rörelse', 'Resume motion') : t('Pausa rörelse', 'Pause motion')] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: "text-link", to: path('reviews'), children: [t('Alla omdömen', 'All reviews'), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] })] }), (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsx)(ReviewSourceNote, {}) })] }); }

export default moduleValues;
const __export_Stars = moduleValues.Stars;
export { __export_Stars as Stars };
const __export_ReviewCard = moduleValues.ReviewCard;
export { __export_ReviewCard as ReviewCard };
const __export_ReviewSummary = moduleValues.ReviewSummary;
export { __export_ReviewSummary as ReviewSummary };
const __export_ReviewSourceNote = moduleValues.ReviewSourceNote;
export { __export_ReviewSourceNote as ReviewSourceNote };
const __export_ReviewsRail = moduleValues.ReviewsRail;
export { __export_ReviewsRail as ReviewsRail };
