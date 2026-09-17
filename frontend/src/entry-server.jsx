import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App.js';
export { routePaths } from './content/routes.js';
export { renderHead, getMetadata } from './content/seo.js';
export { site } from './content/site.js';
export function render(path) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>);
}
