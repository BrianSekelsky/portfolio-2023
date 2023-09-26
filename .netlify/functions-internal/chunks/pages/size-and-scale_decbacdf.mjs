/* empty css                           */import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent, f as addAttribute } from '../astro_9b611068.mjs';
import 'html-escaper';
import { b as $$SmallHeading, a as $$Layout } from './about_a0d227f1.mjs';
import 'clsx';
/* empty css                                    */import '@astrojs/internal-helpers/path';
/* empty css                           */import '../astro-assets-services_08648697.mjs';
/* empty css                           */
const webm = "/_astro/scale.e9cbef2c.webm";

const $$Astro$1 = createAstro();
const $$ProjectHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectHeader;
  const { title, objective, tools, role, collaborators } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container mx-auto bg-black border-x" data-astro-cid-ifqv77uc><div class="grid gap-1 grid-cols-1 sm:grid-cols-2" data-astro-cid-ifqv77uc><div class="bg-white px-12 py-3 group relative" data-astro-cid-ifqv77uc><p class="font-serif font-thin text-6xl py-16 my-16 px-3 leading-tight h-full" data-astro-cid-ifqv77uc>${title}</p></div><div class="bg-white px-12 py-6 relative grid gap-x-12 gap-y-12 grid-cols-1 sm:grid-cols-2" data-astro-cid-ifqv77uc><div data-astro-cid-ifqv77uc>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "Objective", "data-astro-cid-ifqv77uc": true })}<p data-astro-cid-ifqv77uc>${objective}</p></div><div data-astro-cid-ifqv77uc>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "Tools", "data-astro-cid-ifqv77uc": true })}<ul data-astro-cid-ifqv77uc>${tools.map((tool) => renderTemplate`<li data-astro-cid-ifqv77uc>${tool}</li>`)}</ul></div><div data-astro-cid-ifqv77uc>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "Role", "data-astro-cid-ifqv77uc": true })}<p data-astro-cid-ifqv77uc>${role}</p></div><div data-astro-cid-ifqv77uc>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "Collaborators", "data-astro-cid-ifqv77uc": true })}<ul data-astro-cid-ifqv77uc>${tools.map((tool) => renderTemplate`<li data-astro-cid-ifqv77uc>${tool}</li>`)}</ul></div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/ProjectHeader.astro", void 0);

const $$Astro = createAstro();
const $$SizeAndScale = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SizeAndScale;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Brian Sekelsky" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main>${renderComponent($$result2, "ProjectHeader", $$ProjectHeader, { "title": "Visualizing Size & Scale", "objective": "Design a website to augment and scaffold towards size and scale cognition. Master's thesis", "tools": ["Three JS", "Javascript", "HTML/CSS", "Figma"], "role": "Researcher", "collaborators": ["Dr. Matthew Peterson \u2013 Advisor"] })}<div class="container mx-auto border-t border-x"><video playsinline autoplay muted loop><source${addAttribute(webm, "src")} type="video/webm"></video></div><div class="container mx-auto border-t border-x px-12 py-3">${renderComponent($$result2, "SmallHeading", $$SmallHeading, { "text": "Process" })}<p>asdf</p></div></main>` })}`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/pages/projects/size-and-scale.astro", void 0);

const $$file = "/Users/brian/Documents/Design/portfolio-2023/src/pages/projects/size-and-scale.astro";
const $$url = "/projects/size-and-scale";

export { $$SizeAndScale as default, $$file as file, $$url as url };
