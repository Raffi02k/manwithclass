// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module2 from "../content/routes.js";
import * as ReactRouterDOM from "react-router-dom";

const moduleValues = { __esModule: true };
moduleValues.useLocale = useLocale;
const react_router_dom_1 = ReactRouterDOM;
const routes_1 = __module2;
function useLocale() { const { pathname } = (0, react_router_dom_1.useLocation)(); const lang = (0, routes_1.getLang)(pathname); return { lang, t: (sv, en) => lang === 'sv' ? sv : en, path: (key) => (0, routes_1.pathFor)(key, lang), servicePath: (id) => (0, routes_1.servicePath)(id, lang) }; }

export default moduleValues;
const __export_useLocale = moduleValues.useLocale;
export { __export_useLocale as useLocale };
