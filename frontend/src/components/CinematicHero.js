// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module6 from "./MotionProvider.js";
import __module9 from "../hooks/useLocale.js";
import __module7 from "./Shell.js";
import __module11 from "./Icon.js";
import * as ReactRouterDOM from "react-router-dom";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.CinematicHero = CinematicHero;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const react_router_dom_1 = ReactRouterDOM;
const MotionProvider_1 = __module6;
const useLocale_1 = __module9;
const Shell_1 = __module7;
const Icon_1 = __module11;
const clamp = (n) => Math.max(0, Math.min(1, n));
function CinematicHero() {
    const section = (0, react_1.useRef)(null);
    const [active, setActive] = (0, react_1.useState)(0);
    const { reduced, paused, toggle } = (0, MotionProvider_1.useMotion)();
    const { path, t } = (0, useLocale_1.useLocale)();
    (0, react_1.useEffect)(() => {
        const el = section.current;
        if (!el)
            return;
        const panels = Array.from(el.querySelectorAll('[data-scene]')), posters = Array.from(el.querySelectorAll('[data-poster]'));
        let frame = 0;
        const update = () => { frame = 0; const box = el.getBoundingClientRect(); const p = reduced ? 0 : clamp(-box.top / Math.max(1, box.height - window.innerHeight)); const stage = p < .32 ? 0 : p < .7 ? 1 : 2; setActive(stage); const opacity = [1 - clamp((p - .20) / .12), Math.min(clamp((p - .24) / .12), clamp((.76 - p) / .13)), clamp((p - .67) / .13)]; panels.forEach((panel, i) => { panel.style.opacity = String(opacity[i]); panel.style.visibility = opacity[i] < .02 ? 'hidden' : 'visible'; panel.style.transform = `translate3d(${reduced ? 0 : (1 - opacity[i]) * (i === 1 ? 55 : -55)}px,0,0)`; panel.style.pointerEvents = opacity[i] > .45 ? 'auto' : 'none'; panel.inert = opacity[i] < .45; panel.setAttribute('aria-hidden', String(opacity[i] < .45)); }); posters.forEach((poster, i) => { poster.style.opacity = String(opacity[i]); poster.style.transform = `scale(${reduced ? 1 : 1.035 + p * .065})`; }); el.style.setProperty('--story-progress', String(p)); };
        const schedule = () => { if (!frame)
            frame = requestAnimationFrame(update); };
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        schedule();
        return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
    }, [reduced]);
    function jump(i) { const el = section.current; if (!el)
        return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (el.offsetHeight - window.innerHeight) * [0, .49, .9][i], behavior: 'smooth' }); }
    return (0, jsx_runtime_1.jsx)("section", { className: `cinema mwc-cinema ${reduced ? 'is-static' : ''}`, ref: section, "aria-label": t('Man With Class, en introduktion i tre kapitel', 'Man With Class, a story in three chapters'), children: (0, jsx_runtime_1.jsxs)("div", { className: "cinema-sticky", children: [(0, jsx_runtime_1.jsx)("div", { className: "cinema-media", "aria-hidden": "true", children: ['salon-brand', 'hero-craft', 'salon-chair'].map((name, i) => (0, jsx_runtime_1.jsx)("img", { "data-poster": true, className: `cinema-poster poster-${i}`, src: `/images/${name}.webp`, srcSet: `/images/${name}-sm.webp 640w, /images/${name}.webp 1600w`, sizes: "100vw", alt: "", width: "1600", height: "1060", fetchpriority: i === 0 ? 'high' : 'low', loading: i === 0 ? 'eager' : 'lazy', style: { opacity: i === 0 ? 1 : 0 } }, name)) }), (0, jsx_runtime_1.jsx)("div", { className: "cinema-shade" }), (0, jsx_runtime_1.jsxs)("div", { className: "cinema-topline", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("i", {}), " STOCKHOLM / UPPLANDSGATAN 51"] }), (0, jsx_runtime_1.jsx)("span", { children: "ODENPLAN" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "cinema-scenes container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cinema-scene scene-one", "data-scene": true, children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "MAN WITH CLASS / BARBERSHOP" }), (0, jsx_runtime_1.jsxs)("h1", { children: [t('MER STIL.', 'MORE STYLE.'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "accent", children: t('MER KLASS.', 'MORE CLASS.') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-bottom-copy", children: [(0, jsx_runtime_1.jsxs)("p", { children: [t('Herrklippning. Skägg. Hantverk.', 'Haircuts. Beards. Craft.'), (0, jsx_runtime_1.jsx)("br", {}), t('Din barbershop vid Odenplan.', 'Your barbershop at Odenplan.')] }), (0, jsx_runtime_1.jsx)(Shell_1.BookingButton, {})] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "cinema-scene scene-two", "data-scene": true, style: { opacity: 0, visibility: 'hidden' }, "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: t('02 / Salongen', '02 / The salon') }), (0, jsx_runtime_1.jsxs)("h2", { children: [t('MITT VID', 'RIGHT AT'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "accent", children: "ODENPLAN." })] }), (0, jsx_runtime_1.jsxs)("p", { className: "scene-description", children: ["Upplandsgatan 51.", (0, jsx_runtime_1.jsx)("br", {}), t('En stund för dig. Mitt i Vasastan.', 'A moment for you. In the heart of Vasastan.')] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: "text-link", to: path('contact'), children: [t('Hitta din väg hit', 'Find your way here'), (0, jsx_runtime_1.jsx)(Icon_1.Icon, {})] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "cinema-scene scene-three", "data-scene": true, style: { opacity: 0, visibility: 'hidden' }, "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "03 / TAKE A SEAT" }), (0, jsx_runtime_1.jsxs)("h2", { children: [t('DIN STOL.', 'YOUR CHAIR.'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "accent", children: t('DIN STIL.', 'YOUR STYLE.') })] }), (0, jsx_runtime_1.jsx)("p", { className: "scene-description", children: t('Från första klippet till sista detaljen.', 'From the first cut to the final detail.') }), (0, jsx_runtime_1.jsx)(Shell_1.BookingButton, {})] })] }), (0, jsx_runtime_1.jsx)("span", { className: "cinema-media-note", children: active === 0 ? t('Tillfällig inspirationsbild', 'Temporary inspiration image') : t('Man With Class / salongen', 'Man With Class / the salon') }), (0, jsx_runtime_1.jsxs)("div", { className: "cinema-bottom", children: [(0, jsx_runtime_1.jsx)("div", { className: "chapter-nav", "aria-label": t('Välj kapitel', 'Choose chapter'), children: [t('Hantverket', 'The craft'), 'Odenplan', t('Din stol', 'Your chair')].map((label, i) => (0, jsx_runtime_1.jsxs)("button", { disabled: reduced, onClick: () => jump(i), className: active === i ? 'active' : '', "aria-current": active === i ? 'step' : undefined, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["0", i + 1] }), label, (0, jsx_runtime_1.jsx)("i", {})] }, i)) }), (0, jsx_runtime_1.jsxs)("span", { className: "scroll-cue", children: [t('SCROLLA FÖR ATT UPPTÄCKA', 'SCROLL TO DISCOVER'), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "down" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "motion-control", onClick: toggle, "aria-pressed": paused, "aria-label": paused ? t('Aktivera rörelse', 'Enable motion') : t('Pausa rörelse', 'Pause motion'), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: paused ? 'play' : 'pause' }), (0, jsx_runtime_1.jsx)("span", { children: paused ? t('Rörelse av', 'Motion off') : t('Pausa', 'Pause') })] })] })] }) });
}

export default moduleValues;
const __export_CinematicHero = moduleValues.CinematicHero;
export { __export_CinematicHero as CinematicHero };
