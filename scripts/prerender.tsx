import React from 'react';
import { readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../src/App';

// Render the same home component for visitors and crawlers. Other views stay
// lazy: Leaflet requires a browser and must not execute during this build step.
const htmlPath = new URL('../dist/index.html', import.meta.url);
const template = await readFile(htmlPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error('Missing root placeholder; run vite build first.');
const markup = renderToString(<MemoryRouter initialEntries={['/']}><AppContent /></MemoryRouter>);
if (!markup.includes('landing-view') || !markup.includes('<h1')) {
  throw new Error('Home prerender did not produce the landing content.');
}
await writeFile(htmlPath, template.replace(placeholder, `<div id="root" data-prerendered="home">${markup}</div>`));
console.log('Prerendered home content into dist/index.html');
