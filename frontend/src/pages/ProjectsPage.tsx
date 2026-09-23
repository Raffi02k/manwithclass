import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { projects, projectCategories } from '../content/data';
import { PageHero } from '../components/PageHero';
import { BookingButton } from '../components/BookingButton';
import { Icon } from '../components/Icon';

export function ProjectsPage() {
  const { lang, t, projectPath } = useLocale();
  const [filter, setFilter] = useState('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter(p => p.category === filter);

  const tabs: [string, string][] = [
    ['all', t('Alla projekt', 'All projects')],
    ...Object.entries(projectCategories).map(([k, v]) => [k, v[lang]] as [string, string])
  ];

  return (
    <>
      <PageHero
        eyebrow={t('Referenser & Portfölj i Stockholm', 'References & Portfolio in Stockholm')}
        title={
          <>
            {t('REFERENSER &', 'REFERENCES &')}
            <br />
            <span className="accent">{t('SIGNATURPROJEKT.', 'SIGNATURE PROJECTS.')}</span>
          </>
        }
        description={t(
          'Utforska utvalda herrklippningar, skäggdesign och helhetsförvandlingar utförda i vår salong vid Odenplan i Vasastan. Se resultaten och hitta inspiration inför ditt nästa besök.',
          'Explore selected haircuts, beard sculpts, and transformations crafted at our Odenplan barbershop in Vasastan, Stockholm. View real results and find inspiration for your next session.'
        )}
        image="/images/salon-work.webp"
      >
        <BookingButton />
      </PageHero>

      <section className="container section-space projects-archive-section">
        {/* Category Tabs */}
        <div className="filter-tabs" role="group" aria-label={t('Filtrera projekt', 'Filter projects')}>
          {tabs.map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Counter & Local Tagline */}
        <div className="projects-filter-bar">
          <p className="result-count" aria-live="polite">
            {filteredProjects.length} {t('visade referensprojekt', 'projects displayed')}
          </p>
          <span className="projects-local-hint">
            📍 {t('Upplandsgatan 51, Odenplan / Vasastan, Stockholm', 'Upplandsgatan 51, Odenplan / Vasastan, Stockholm')}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="projects-catalog-grid">
          {filteredProjects.map((project) => {
            const catLabel = projectCategories[project.category]?.[lang] || project.category;
            return (
              <article key={project.slug} className="project-catalog-card">
                <Link
                  to={projectPath(project.slug)}
                  className="project-catalog-link"
                >
                  <div className="project-catalog-media">
                    <img
                      src={project.image}
                      alt={`${project.title[lang]} – Man With Class Barbershop`}
                      loading="lazy"
                      width="540"
                      height="640"
                    />
                    <span className="project-catalog-badge">
                      📍 {project.location[lang]}
                    </span>
                  </div>

                  <div className="project-catalog-body">
                    <div className="project-catalog-pills">
                      <span className="pill-category">{catLabel}</span>
                      <span className="pill-barber">{t('Barberare: ', 'Barber: ')}{project.barber[lang]}</span>
                      <span className="pill-time">{project.time[lang]}</span>
                    </div>

                    <h2 className="project-catalog-title">
                      {project.title[lang]}
                    </h2>

                    <p className="project-catalog-excerpt">
                      {project.excerpt[lang]}
                    </p>

                    <div className="project-catalog-footer">
                      <span className="project-read-more">
                        {t('Visa detaljer & resultat', 'View details & results')}
                        <Icon name="arrowRight" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="projects-bottom-cta">
          <div>
            <p className="eyebrow">{t('Inspirerad av våra arbeten?', 'Inspired by our craft?')}</p>
            <h3>{t('Boka din tid hos Roy eller Serhi vid Odenplan', 'Book your session with Roy or Serhi at Odenplan')}</h3>
            <p>
              {t(
                'Välj önskad behandling och boka smidigt via Bokadirekt. Vi finns på Upplandsgatan 51 i Vasastan, Stockholm.',
                'Select your treatment and book conveniently via Bokadirekt. Located at Upplandsgatan 51 in Vasastan, Stockholm.'
              )}
            </p>
          </div>
          <BookingButton />
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
