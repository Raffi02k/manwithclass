// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module6 from "./MotionProvider.js";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.PhotoPanel = PhotoPanel;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const MotionProvider_1 = __module6;
function PhotoPanel({ image, children, className = '' }) {
    const ref = (0, react_1.useRef)(null);
    const { reduced } = (0, MotionProvider_1.useMotion)();
    (0, react_1.useEffect)(() => {
        if (reduced)
            return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const el = ref.current;
            if (!el)
                return;
            const r = el.getBoundingClientRect();
            if (r.bottom > 0 && r.top < window.innerHeight)
                el.style.setProperty('--shift', `${((window.innerHeight / 2 - r.top - r.height / 2) / window.innerHeight) * 70}px`);
        };
        const scroll = () => {
            if (!raf)
                raf = requestAnimationFrame(update);
        };
        window.addEventListener('scroll', scroll, { passive: true });
        scroll();
        return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', scroll); };
    }, [reduced]);
    return (0, jsx_runtime_1.jsxs)("section", { ref: ref, className: `photo-panel ${className}`, children: [(0, jsx_runtime_1.jsx)("img", { src: image, loading: "lazy", decoding: "async", alt: "", width: "1400", height: "900" }), (0, jsx_runtime_1.jsx)("div", { className: "photo-panel-shade" }), (0, jsx_runtime_1.jsx)("div", { className: "photo-panel-content container", children: children })] });
}

export default moduleValues;
const __export_PhotoPanel = moduleValues.PhotoPanel;
export { __export_PhotoPanel as PhotoPanel };
