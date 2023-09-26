import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_e88b94d4.mjs';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_9b611068.mjs';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_dcdaa87f.mjs');
const _page1  = () => import('./chunks/index_b0d1b638.mjs');
const _page2  = () => import('./chunks/size-and-scale_e4ae00ca.mjs');
const _page3  = () => import('./chunks/project-2_d32b54cb.mjs');
const _page4  = () => import('./chunks/about_0aed84d6.mjs');
const _page5  = () => import('./chunks/music_20d07633.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/projects/size-and-scale.astro", _page2],["src/pages/projects/project-2.astro", _page3],["src/pages/about.astro", _page4],["src/pages/music.astro", _page5]]);
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
