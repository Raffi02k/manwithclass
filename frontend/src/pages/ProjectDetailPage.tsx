import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { projects, projectCategories, ProjectItem } from '../content/data';
import { site } from '../content/site';
import { BookingButton } from '../components/BookingButton';
import { Icon } from '../components/Icon';

export interface ProjectDetailPageProps {
  project: ProjectItem;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { lang, t, path, projectPath } = useLocale();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.slug]);

  if (!project) return <Navigate to="/404" replace />;

  const related = projects
    .filter(p => p.slug !== project.slug)
    .slice(0, 3);

  const catLabel = projectCategories[project.category]?.[lang] || project.category;

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'sv' ? 'Hem' : 'Home',
            item: site.domain + (lang === 'sv' ? '/' : '/en')
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: lang === 'sv' ? 'Projekt & Referenser' : 'Projects & References',
            item: site.domain + (lang === 'sv' ? '/projekt' : '/en/projects')
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title[lang],
            item: `${site.domain}${projectPath(project.slug)}`
          }
        ]
      },
      {
        '@type': 'CreativeWork',
        '@id': `${site.domain}${projectPath(project.slug)}#project`,
        name: project.title[lang],
        headline: project.title[lang],
        description: project.description[lang],
        image: `${site.domain}${project.image}`,
        dateCreated: `${project.year}-01-01`,
        author: {
          '@type': 'HairSalon',
          name: site.fullName,
          url: site.domain
        },
        locationCreated: {
          '@type': 'Place',
          name: project.location[lang],
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.address,
            postalCode: site.postcode,
            addressLocality: site.city,
            addressRegion: 'Stockholm',
            addressCountry: 'SE'
          }
        },
        provider: {
          '@type': 'HairSalon',
          name: site.fullName,
          telephone: site.phone,
          address: `${site.address}, ${site.postcode} ${site.city}`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="project-detail-article">
        {/* Breadcrumbs */}
        <nav
          className="container project-breadcrumbs"
          aria-label={t('Brödsmulor', 'Breadcrumbs')}
        >
          <ol>
            <li>
              <Link to={path('home')}>{t('Hem', 'Home')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={path('projects')}>{t('Projekt', 'Projects')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{project.title[lang]}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="project-detail-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-content">
              <div className="project-hero-badges">
                <span className="badge badge--location">📍 {project.location[lang]}</span>
                <span className="badge badge--cat">{catLabel}</span>
                <span className="badge badge--barber">✂️ {project.barber[lang]}</span>
                <span className="badge badge--year">{project.year}</span>
              </div>

              <h1 className="project-hero-title">
                {project.title[lang].toUpperCase()}
              </h1>

              <p className="project-hero-excerpt">
                {project.excerpt[lang]}
              </p>
            </div>

            <div className="project-hero-image-wrap">
              <img
                src={project.image}
                alt={`${project.title[lang]} – Man With Class Barbershop Stockholm`}
                width="640"
                height="780"
                loading="eager"
              />
            </div>
          </div>
        </header>

        {/* Quick Facts Grid */}
        <section className="container project-quickfacts-section">
          <div className="project-facts-bar">
            <div className="fact-item">
              <span className="fact-label">{t('Plats & Område', 'Location & Area')}</span>
              <strong className="fact-value">📍 {project.location[lang]}</strong>
              <small className="fact-sub">{site.address}, Vasastan</small>
            </div>
            <div className="fact-item">
              <span className="fact-label">{t('Ansvarig Barberare', 'Master Barber')}</span>
              <strong className="fact-value">{project.barber[lang]}</strong>
              <small className="fact-sub">Man With Class</small>
            </div>
            <div className="fact-item">
              <span className="fact-label">{t('Kategori', 'Category')}</span>
              <strong className="fact-value">{catLabel}</strong>
              <small className="fact-sub">{t('Signaturhantverk', 'Signature craft')}</small>
            </div>
            <div className="fact-item">
              <span className="fact-label">{t('Tidsåtgång', 'Duration')}</span>
              <strong className="fact-value">{project.time[lang]}</strong>
              <small className="fact-sub">{t('Inkl. styling & tvätt', 'Incl. wash & style')}</small>
            </div>
          </div>
        </section>

        {/* Main Content & Sticky Sidebar */}
        <section className="container section-space project-body-section">
          <div className="project-layout-grid">
            <div className="project-main-column">
              {/* Overview & Challenge */}
              <div className="project-prose-block">
                <p className="eyebrow">{t('Uppdraget & Utförandet', 'The Session & Execution')}</p>
                <h2>{t('HANTVERKET BAKOM', 'THE CRAFT BEHIND')}<br /><span className="accent">{t('RESULTATET.', 'THE RESULT.')}</span></h2>
                <p className="lead-text">{project.description[lang]}</p>
                <div className="challenge-callout">
                  <div className="callout-icon">💡</div>
                  <div>
                    <strong>{t('Hantverksmässig utmaning', 'Barbering challenge')}:</strong>
                    <p>{project.challenge[lang]}</p>
                  </div>
                </div>
              </div>

              {/* Checklists / Performed Steps */}
              <div className="project-highlights-block">
                <h3>{t('Genomförda moment under behandlingen', 'Key steps performed during the session')}</h3>
                <ul className="project-check-list">
                  {project.highlights[lang].map((highlight, idx) => (
                    <li key={idx}>
                      <span className="check-icon-wrap">
                        <Icon name="check" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result Cards */}
              <div className="project-results-block">
                <h3>{t('Uppnådda resultat & kundnytta', 'Achieved results & client benefits')}</h3>
                <div className="result-cards-grid">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="result-stat-card">
                      <span className="result-stat-value">{res.value[lang]}</span>
                      <strong className="result-stat-title">{res.title[lang]}</strong>
                      <p className="result-stat-desc">{res.desc[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="project-gallery-block">
                  <h3>{t('Bilder från behandlingen & salongen', 'Photos from the session & salon')}</h3>
                  <div className="project-gallery-grid">
                    {project.gallery.map((imgSrc, idx) => (
                      <figure key={idx} className="project-gallery-item">
                        <img
                          src={imgSrc}
                          alt={`${project.title[lang]} – Detalj ${idx + 1}`}
                          loading="lazy"
                          width="500"
                          height="400"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Back Link */}
              <div className="project-back-row">
                <Link to={path('projects')} className="text-link">
                  <Icon name="arrowLeft" />
                  {t('Tillbaka till alla projekt & referenser', 'Back to all projects & references')}
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="project-sidebar">
              <div className="sidebar-sticky-card">
                <p className="eyebrow">MAN WITH CLASS / ODENPLAN</p>
                <h3 className="sidebar-title">{project.title[lang]}</h3>
                <p className="sidebar-meta">
                  📍 {project.location[lang]} • {project.time[lang]}
                </p>

                <div className="sidebar-divider" />

                <div className="sidebar-summary">
                  <p>
                    {t(
                      'Vill du uppnå samma skarpa look? Boka tid hos Roy eller Serhi smidigt via Bokadirekt.',
                      'Looking for the same distinguished look? Book your session with Roy or Serhi via Bokadirekt.'
                    )}
                  </p>
                </div>

                <div className="sidebar-actions">
                  <BookingButton />
                  <a href={site.phoneHref} className="button button-outline sidebar-call-btn">
                    <Icon name="phone" />
                    {t('Ring salongen: ', 'Call salon: ')}{site.phone}
                  </a>
                </div>

                <div className="sidebar-info-box">
                  <strong>{site.fullName}</strong>
                  <p>{site.address}, {site.postcode} {site.city}</p>
                  <p>{t('2 min från Odenplans T-bana & pendeltåg', '2 mins from Odenplan metro & trains')}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="container section-space project-related-section">
            <header className="related-header">
              <p className="eyebrow">{t('Fler referensarbeten', 'More reference works')}</p>
              <h2>{t('RELATERADE', 'RELATED')}<br /><span className="accent">{t('PROJEKT.', 'PROJECTS.')}</span></h2>
            </header>

            <div className="related-projects-grid">
              {related.map(rel => {
                const relCat = projectCategories[rel.category]?.[lang] || rel.category;
                return (
                  <article key={rel.slug} className="related-card">
                    <Link to={projectPath(rel.slug)} className="related-card-link">
                      <div className="related-card-media">
                        <img
                          src={rel.image}
                          alt={rel.title[lang]}
                          loading="lazy"
                          width="400"
                          height="480"
                        />
                        <span className="related-badge">📍 {rel.location[lang]}</span>
                      </div>
                      <div className="related-card-body">
                        <small className="related-cat">{relCat}</small>
                        <h3 className="related-title">{rel.title[lang]}</h3>
                        <span className="related-cta">
                          {t('Visa projekt', 'View project')}
                          <Icon name="arrowRight" />
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

export default ProjectDetailPage;
