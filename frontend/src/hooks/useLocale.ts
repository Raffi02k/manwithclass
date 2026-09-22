import { useLocation } from 'react-router-dom';
import { getLang, pathFor, servicePath } from '../content/routes';

export function useLocale() {
  const { pathname } = useLocation();
  const lang = getLang(pathname);
  return {
    lang,
    t: (sv: string, en: string) => (lang === 'sv' ? sv : en),
    path: (key: string) => pathFor(key, lang),
    servicePath: (id: string) => servicePath(id, lang)
  };
}

export default useLocale;
