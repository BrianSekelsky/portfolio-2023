/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro_96538662.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Layout } from './about_e5877162.mjs';
import { $ as $$Header } from './index_cf832432.mjs';
/* empty css                           *//* empty css                           *//* empty css                           */
const $$Astro = createAstro();
const $$Music = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Music;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Brian Sekelsky" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main>${renderComponent($$result2, "Header", $$Header, {})}</main>` })}`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/pages/music.astro", void 0);

const $$file = "/Users/brian/Documents/Design/portfolio-2023/src/pages/music.astro";
const $$url = "/music";

export { $$Music as default, $$file as file, $$url as url };
