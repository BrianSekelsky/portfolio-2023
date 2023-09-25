export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/about_31e0dbac.mjs').then(n => n.a);

export { page };
