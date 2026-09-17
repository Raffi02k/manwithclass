// Recovered from the saved Man With Class preview; executable React JavaScript.
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.Reveal = Reveal;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
function Reveal({ children, className = '', delay = 0 }) {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const el = ref.current;
        if (!el || !('IntersectionObserver' in window))
            return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        el.classList.add('reveal-ready');
        const io = new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) {
                el.classList.add('is-revealed');
                io.disconnect();
            }
        }, { threshold: .06, rootMargin: '0px 0px 45px 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (0, jsx_runtime_1.jsx)("div", { ref: ref, className: `reveal ${className}`, style: { transitionDelay: `${delay}ms` }, children: children });
}

export default moduleValues;
const __export_Reveal = moduleValues.Reveal;
export { __export_Reveal as Reveal };
