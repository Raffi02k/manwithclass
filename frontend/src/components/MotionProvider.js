// Recovered from the saved Man With Class preview; executable React JavaScript.
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.useMotion = void 0;
moduleValues.MotionProvider = MotionProvider;
const jsx_runtime_1 = jsxRuntime;
const react_1 = React;
const MotionContext = (0, react_1.createContext)({ reduced: false, paused: false, toggle: () => { } });
function MotionProvider({ children }) {
    const [systemReduced, setSystemReduced] = (0, react_1.useState)(false);
    const [paused, setPaused] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => { const q = window.matchMedia('(prefers-reduced-motion: reduce)'); const change = () => setSystemReduced(q.matches); change(); q.addEventListener('change', change); return () => q.removeEventListener('change', change); }, []);
    const reduced = systemReduced || paused;
    (0, react_1.useEffect)(() => { document.documentElement.classList.toggle('reduce-motion', reduced); return () => document.documentElement.classList.remove('reduce-motion'); }, [reduced]);
    return (0, jsx_runtime_1.jsx)(MotionContext.Provider, { value: { reduced, paused, toggle: () => setPaused(p => !p) }, children: children });
}
const useMotion = () => (0, react_1.useContext)(MotionContext);
moduleValues.useMotion = useMotion;

export default moduleValues;
const __export_useMotion = moduleValues.useMotion;
export { __export_useMotion as useMotion };
const __export_MotionProvider = moduleValues.MotionProvider;
export { __export_MotionProvider as MotionProvider };
