import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useBodyLock } from '../hooks/useBodyLock';
import { alternatePath } from '../content/routes';
import { site } from '../content/site';
import { Brand } from './Brand';
import { BookingButton } from './BookingButton';
import { Icon } from './Icon';

export function LanguageSwitch() {
  const { pathname } = useLocation();
  const { lang, t } = useLocale();
  return (
    <nav className="language-switch" aria-label={t('Välj språk', 'Choose language')}>
      {(['sv', 'en'] as const).map(l => (
        <Link
          key={l}
          to={alternatePath(pathname, l)}
          lang={l}
          hrefLang={l}
          className={l === lang ? 'active' : ''}
          aria-current={l === lang ? 'true' : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

const nav = [
  { key: 'services', sv: 'Tjänster & priser', en: 'Services & prices' },
  { key: 'about', sv: 'Om oss', en: 'Our story' },
  { key: 'gallery', sv: 'Galleri', en: 'Gallery' },
  { key: 'reviews', sv: 'Omdömen', en: 'Reviews' },
  { key: 'contact', sv: 'Hitta hit', en: 'Find us' }
];

export function Header() {
  const { lang, path, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useBodyLock(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
      trigger.current?.focus();
    }
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        {t('Hoppa till innehållet', 'Skip to content')}
      </a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label={t('Huvudnavigation', 'Main navigation')}>
            {nav.map(n => (
              <NavLink key={n.key} to={path(n.key)}>
                {n[lang]}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitch />
            <BookingButton label={t('Boka tid', 'Book now')} className="header-booking" />
            <button
              className="menu-toggle icon-button"
              ref={trigger}
              onClick={() => setOpen(true)}
              aria-label={t('Öppna menyn', 'Open menu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="mobile-menu"
        id="mobile-menu"
        ref={dialog}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        aria-labelledby="menu-title"
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="icon-button"
            onClick={() => setOpen(false)}
            aria-label={t('Stäng menyn', 'Close menu')}
          >
            <Icon name="close" />
          </button>
        </div>
        <p className="eyebrow" id="menu-title">
          MAN WITH CLASS / ODENPLAN
        </p>
        <nav aria-label={t('Mobilnavigation', 'Mobile navigation')}>
          {[{ key: 'home', sv: 'Hem', en: 'Home' }, ...nav].map((n, i) => (
            <NavLink
              key={n.key}
              to={path(n.key)}
              end={n.key === 'home'}
              onClick={() => setOpen(false)}
            >
              <span>0{i + 1}</span>
              {n[lang]}
              <Icon />
            </NavLink>
          ))}
        </nav>
        <BookingButton />
        <div className="mobile-menu-info">
          {site.address}
          <br />
          {site.postcode} {site.city}
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      </dialog>
    </>
  );
}

export default Header;
