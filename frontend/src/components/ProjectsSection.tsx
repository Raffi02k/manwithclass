import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { projects, projectCategories } from '../content/data';
import { Icon } from './Icon';

export interface ProjectsSectionProps {
  compact?: boolean;
}

export function ProjectsSection({ compact = false }: ProjectsSectionProps) {
  const { lang, t, path, projectPath } = useLocale();
  const displayedProjects = compact ? projects.slice(0, 6) : projects;

  return (
    <section className="section-space mwc-projects-section" id="projekt">
      <div className="container">
        <header className="projects-heading">
          <p className="eyebrow">{t('Vårt hantverk & referenser', 'Our craft & references')}</p>
          <h2>
            {t('SIGNATURARBETEN.', 'SIGNATURE WORKS.')}
            <br />
            <span className="accent">{t('PRECISION I DETALJ.', 'PRECISION IN DETAIL.')}</span>
          </h2>
          <p className="projects-lead">
            {t(
              'Utforska genomförda klippningar, skäggskulpteringar och helhetsförvandlingar från vår barbershop vid Odenplan. Varje projekt speglar genuint hantverk anpassat för Stockholms män.',
              'Explore selected haircuts, beard sculpts, and full transformations crafted at our Odenplan barbershop. Each project reflects genuine craft tailored for Stockholm gentlemen.'
            )}
          </p>
        </header>

        <div className="projects-mosaic-grid">
          {displayedProjects.map((project, index) => {
            const catLabel = projectCategories[project.category]?.[lang] || project.category;
            return (
              <article
                key={project.slug}
                className={`project-mosaic-tile project-mosaic-tile--${index + 1}`}
              >
                <Link
                  to={projectPath(project.slug)}
                  className="project-tile-link"
                  aria-label={`${project.title[lang]} – ${project.location[lang]}`}
                >
                  <div className="project-tile-media">
                    <img
                      src={project.image}
                      alt={`${project.title[lang]} – Man With Class Barbershop ${project.location[lang]}`}
                      loading="lazy"
                      width="600"
                      height="700"
                    />
                    <div className="project-tile-overlay" />
                  </div>

                  <div className="project-tile-content">
                    <div className="project-tile-meta">
                      <span className="project-pill project-pill--loc">
                        📍 {project.location[lang]}
                      </span>
                      <span className="project-pill project-pill--cat">
                        {catLabel}
                      </span>
                    </div>

                    <h3 className="project-tile-title">
                      {project.title[lang]}
                    </h3>

                    <p className="project-tile-excerpt">
                      {project.excerpt[lang]}
                    </p>

                    <div className="project-tile-footer">
                      <span className="project-tile-barber">
                        {t('Barberare: ', 'Barber: ')}
                        <strong>{project.barber[lang]}</strong> • {project.time[lang]}
                      </span>
                      <span className="project-tile-cta">
                        {t('Visa projekt', 'View project')}
                        <Icon name="arrowRight" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {compact && (
          <div className="projects-cta-center">
            <Link className="button button-primary" to={path('projects')}>
              {t('Se alla 6 referensprojekt', 'Explore all 6 reference projects')}
              <Icon />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
