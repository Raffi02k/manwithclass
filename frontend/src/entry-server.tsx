import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { routePaths } from './content/routes';
import { renderHead, getMetadata } from './content/seo';
import { site } from './content/site';
import { publishedPeople } from './content/people';

export { routePaths } from './content/routes';
export { renderHead, getMetadata } from './content/seo';
export { site } from './content/site';
export { publishedPeople } from './content/people';

export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
}

export default {
  render,
  renderHead,
  getMetadata,
  routePaths,
  site,
  publishedPeople,
};
