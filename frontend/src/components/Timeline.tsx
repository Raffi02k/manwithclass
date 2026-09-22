import { TimelineItem } from '../content/people';
import { Reveal } from './Reveal';

export interface TimelineProps {
  milestones: TimelineItem[];
  lang: 'sv' | 'en';
}

export function Timeline({ milestones, lang }: TimelineProps) {
  return (
    <Reveal className="person-timeline">
      <ol>
        {milestones.map((milestone, index) => (
          <li key={milestone.label.sv} style={{ '--step-delay': `${index * 140}ms` } as any}>
            <span className="person-timeline-marker" aria-hidden="true" />
            <h3>{milestone.label[lang]}</h3>
            <p>{milestone.text[lang]}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export default Timeline;
