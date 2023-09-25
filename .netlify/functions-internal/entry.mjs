import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_f106bf07.mjs';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_b72c5eea.mjs';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_418040eb.mjs');
const _page1  = () => import('./chunks/index_84124fa6.mjs');
const _page2  = () => import('./chunks/project-1_d87a03ab.mjs');
const _page3  = () => import('./chunks/project-2_d27971d3.mjs');
const _page4  = () => import('./chunks/about_7b09aba3.mjs');
const _page5  = () => import('./chunks/music_d9c31d59.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/projects/project-1.astro", _page2],["src/pages/projects/project-2.astro", _page3],["src/pages/about.astro", _page4],["src/pages/music.astro", _page5]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
