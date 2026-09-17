// Recovered from the saved Man With Class preview; executable React JavaScript.
import __module9 from "../hooks/useLocale.js";
import __module11 from "./Icon.js";
import * as jsxRuntime from "react/jsx-runtime";

const moduleValues = { __esModule: true };
moduleValues.FAQ = FAQ;
const jsx_runtime_1 = jsxRuntime;
const useLocale_1 = __module9;
const Icon_1 = __module11;
function FAQ() {
    const { t } = (0, useLocale_1.useLocale)();
    const questions = [
        [t('Hur bokar jag en tid?', 'How do I book?'), t('Tryck på Boka tid för att öppna Man With Class på Bokadirekt. Där väljer du behandling, barberare och en ledig tid. Bokningen sker hos Bokadirekt, inte direkt på den här sidan.', 'Select Book now to open Man With Class on Bokadirekt. Choose your treatment, barber and an available time there. Your booking is completed on Bokadirekt, not on this website.')],
        [t('Tar ni emot drop-in?', 'Do you accept walk-ins?'), t('Ja, vi tar emot drop-in i mån av tid. Boka i förväg för att se till att det finns en tid som passar dig.', 'Yes, subject to availability. Booking in advance is the easiest way to secure a time that suits you.')],
        [t('Var ligger salongen?', 'Where is the salon?'), t('Du hittar Man With Class på Upplandsgatan 51, 113 28 Stockholm, vid Odenplan i Vasastan. Se vägbeskrivningen under Hitta hit.', 'Find Man With Class at Upplandsgatan 51, 113 28 Stockholm, at Odenplan in Vasastan. See Find us for directions.')],
        [t('Hur vet jag vad som ingår i behandlingen?', 'How do I know what is included?'), t('Varje behandling har en egen sida med innehåll, bokad tid och pris. Kontrollera alltid aktuellt pris och information i Bokadirekt innan du bekräftar bokningen.', 'Each treatment has its own page with inclusions, appointment duration and price. Always check the current price and details on Bokadirekt before confirming.')]
    ];
    return (0, jsx_runtime_1.jsxs)("section", { className: "faq-block", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: t('Bra att veta', 'Good to know') }), (0, jsx_runtime_1.jsx)("h2", { className: "faq-heading", children: t('INNAN DU SLÅR DIG NER.', 'BEFORE YOU TAKE A SEAT.') }), questions.map(([q, a]) => (0, jsx_runtime_1.jsxs)("details", { children: [(0, jsx_runtime_1.jsxs)("summary", { children: [q, (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "plus" })] }), (0, jsx_runtime_1.jsx)("p", { children: a })] }, q))] });
}

export default moduleValues;
const __export_FAQ = moduleValues.FAQ;
export { __export_FAQ as FAQ };
