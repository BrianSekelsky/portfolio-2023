/* empty css                           */import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_9b611068.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './about_dcef5c5f.mjs';
import '@astrojs/internal-helpers/path';
/* empty css                           */import '../astro-assets-services_08648697.mjs';
/* empty css                           */
const $$Astro$1 = createAstro();
const $$Music$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Music$1;
  return renderTemplate`${maybeRenderHead()}<div><div class="container mx-auto"><p class="text-center font-serif font-thin py-16 my-16 px-3 leading-tight h-full align-middle text-4xl md:text-6xl">
music page coming soon
</p></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Music.astro", void 0);

const $$Astro = createAstro();
const $$Music = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Music;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Brian Sekelsky" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main>${renderComponent($$result2, "Music", $$Music$1, {})}</main>` })}`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/pages/music.astro", void 0);

const $$file = "/Users/brian/Documents/Design/portfolio-2023/src/pages/music.astro";
const $$url = "/music";

export { $$Music as default, $$file as file, $$url as url };
