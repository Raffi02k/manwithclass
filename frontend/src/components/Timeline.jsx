import { Reveal } from './Reveal.js';

export function Timeline({ milestones, lang }) {
    return <Reveal className="person-timeline">
        <ol>{milestones.map((milestone, index) => <li key={milestone.label.sv} style={{ '--step-delay': `${index * 140}ms` }}>
            <span className="person-timeline-marker" aria-hidden="true" />
            <h3>{milestone.label[lang]}</h3>
            <p>{milestone.text[lang]}</p>
        </li>)}</ol>
    </Reveal>;
}
