// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module13 from "../content/seo.js";
import * as ReactRouterDOM from "react-router-dom";
import * as React from "react";

const moduleValues = { __esModule: true };
moduleValues.PageMeta = PageMeta;
const react_1 = React;
const react_router_dom_1 = ReactRouterDOM;
const seo_1 = __module13;
function PageMeta() { const { pathname } = (0, react_router_dom_1.useLocation)(); (0, react_1.useEffect)(() => { const meta = (0, seo_1.getMetadata)(pathname); document.documentElement.lang = meta.lang; const template = document.createElement('template'); template.innerHTML = (0, seo_1.renderHead)(pathname); document.head.querySelectorAll('title,meta[name="description"],meta[name="robots"],meta[name^="twitter:"],meta[property^="og:"],link[rel="canonical"],link[rel="alternate"][hreflang],#structured-data').forEach(el => el.remove()); document.head.append(...Array.from(template.content.childNodes)); }, [pathname]); return null; }

export default moduleValues;
const __export_PageMeta = moduleValues.PageMeta;
export { __export_PageMeta as PageMeta };
