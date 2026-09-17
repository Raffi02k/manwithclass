import { useLocale } from '../hooks/useLocale.js';
import { people } from '../content/people.js';
import { PersonCard } from './PersonCard.jsx';
import { Icon } from './Icon.js';
import { Reveal } from './Reveal.js';
import { Link } from 'react-router-dom';
import { jsx, jsxs } from 'react/jsx-runtime';

export function Barbers({ full = false }) {
    const { t, path } = useLocale();
    return jsx('section', { className: 'crew-section section-space', children: jsxs('div', { className: 'container', children: [
        jsxs('div', { className: 'section-heading', children: [
            jsxs(Reveal, { children: [jsx('p', { className: 'eyebrow', children: t('Människorna bakom hantverket', 'The people behind the craft') }), jsxs('h2', { children: [t('DIN STIL.', 'YOUR STYLE.'), jsx('br', {}), jsx('span', { className: 'accent', children: t('VÅRA HÄNDER.', 'OUR HANDS.') })] })] }),
            !full && jsxs(Link, { className: 'text-link', to: path('barbers'), children: [t('Möt barberarna', 'Meet the barbers'), jsx(Icon, {})] })
        ] }),
        jsx('div', { className: 'mwc-crew-grid', children: people.map((person, index) => jsx(PersonCard, { person, index }, person.slug)) }),
        full && jsx('p', { className: 'content-note', children: t('Roy och Serhi finns i salongens bokning. Välj den behandling och barberare som passar dig.', 'Roy and Serhi are listed in the salon booking service. Choose the treatment and barber that suit you.') })
    ] }) });
}
export default { __esModule: true, Barbers };
