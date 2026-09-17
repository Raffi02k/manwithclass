// Recovered from the saved Man With Class preview; executable React JavaScript.
import * as React from "react";

const moduleValues = { __esModule: true };
moduleValues.useBodyLock = useBodyLock;
const react_1 = React;
function useBodyLock(locked) {
    (0, react_1.useEffect)(() => {
        if (!locked)
            return;
        const body = document.body, y = window.scrollY;
        const original = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${y}px`;
        body.style.width = '100%';
        return () => { Object.assign(body.style, original); window.scrollTo({ top: y, behavior: 'instant' }); };
    }, [locked]);
}

export default moduleValues;
const __export_useBodyLock = moduleValues.useBodyLock;
export { __export_useBodyLock as useBodyLock };
