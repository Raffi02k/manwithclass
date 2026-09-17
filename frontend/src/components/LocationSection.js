import { useLocale } from "../hooks/useLocale.js";
import { site } from "../content/site.js";
import { Reveal } from "./Reveal.js";
import { Icon } from "./Icon.js";
import { jsx, jsxs } from "react/jsx-runtime";

function LocationSection() {
    const { t } = useLocale();
    return jsxs("section", { className: "location-section section-space", id: "hitta-hit", children: [
        jsxs("div", { className: "container location-heading", children: [
            jsxs(Reveal, { children: [
                jsx("p", { className: "eyebrow", children: "STOCKHOLM / VASASTAN / ODENPLAN" }),
                jsxs("h2", { children: [t('NÄSTA STOPP.', 'YOUR NEXT STOP.'), jsx("br", {}), jsx("span", { className: "accent", children: "MAN WITH CLASS." })] })
            ] }),
            jsxs("div", { className: "location-address", children: [
                jsx(Icon, { name: "pin" }),
                jsxs("div", { children: [
                    jsx("h3", { children: site.address }),
                    jsxs("p", { children: [site.postcode, " ", site.city, jsx("br", {}), t('Du hittar oss vid Odenplan.', 'Find us at Odenplan.')] }),
                    jsxs("a", { className: "text-link", href: site.directionsUrl, target: "_blank", rel: "noopener noreferrer", children: [t('Visa vägen', 'Get directions'), jsx(Icon, {})] })
                ] })
            ] })
        ] }),
        jsxs("div", { className: "map-frame container", children: [
            jsx("iframe", { title: t('Man With Class på Google Maps', 'Man With Class on Google Maps'), src: site.mapsEmbed, loading: "lazy", referrerPolicy: "no-referrer", allowFullScreen: true }),
            jsxs("div", { className: "map-footer", children: [
                jsxs("span", { children: [jsx("i", {}), "UPPLANDSGATAN 51 / VASASTAN"] }),
                jsxs("a", { href: site.mapsUrl, target: "_blank", rel: "noopener noreferrer", children: ["Google Maps", jsx(Icon, {})] })
            ] })
        ] })
    ] });
}

export { LocationSection };
export default { __esModule: true, LocationSection };
