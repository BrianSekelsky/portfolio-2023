export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/index_65381ee3.mjs').then(n => n.i);

export { page };
