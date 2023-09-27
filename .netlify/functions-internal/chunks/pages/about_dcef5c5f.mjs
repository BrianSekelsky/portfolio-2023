import '@astrojs/internal-helpers/path';
/* empty css                           */import { c as createAstro, d as createComponent, A as AstroError, e as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, f as addAttribute, s as spreadAttributes, g as renderComponent, h as renderHead, i as renderSlot } from '../astro_9b611068.mjs';
import 'html-escaper';
import 'clsx';
/* empty css                           */import { g as getImage$1 } from '../astro-assets-services_08648697.mjs';
/* empty css                           */
const $$Astro$8 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/Users/brian/Documents/Design/portfolio-2023/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$7 = createAstro();
const $$NavLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NavLink;
  const currentPath = new URL(Astro2.request.url).pathname;
  const { href, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(currentPath === href ? "rounded-full border px-4 lg:first:ml-0" : "rounded-full border lg:first:ml-0 mx-4 border-white hover:text-blue", "class")}${addAttribute(href, "href")}>${name}</a>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Nav-link.astro", void 0);

const $$Astro$6 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Nav;
  const pathname = new URL(Astro2.request.url).pathname;
  pathname.slice(1);
  return renderTemplate`${maybeRenderHead()}<div class="border-b"><div class="container mx-auto"><div class="text-center lg:text-left grid grid-cols-1 lg:flex justify-between p-3 content-center items-center">${renderComponent($$result, "NavLink", $$NavLink, { "href": "/#", "name": "BRIAN SEKELSKY" })}<div class="mt-6 lg:mt-0 grid grid-cols-1 lg:flex flex-wrap lg:gap-16">${renderComponent($$result, "NavLink", $$NavLink, { "href": "/", "name": "DESIGN" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "/music", "name": "MUSIC" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "/about", "name": "ABOUT" })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Nav.astro", void 0);

const $$Astro$5 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Footer;
  const pathname = new URL(Astro2.request.url).pathname;
  pathname.slice(1);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<div class="border-t"><div class="container mx-auto"><div class="text-center lg:text-left grid grid-cols-1 lg:flex justify-between p-3 content-center items-center"><p class="">© ${year} BRIAN SEKELSKY</p><div class="mt-6 lg:mt-0 grid grid-cols-1 lg:flex flex-wrap lg:gap-16">${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://www.instagram.com/briansekelsky/", "name": "INSTAGRAM" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://open.spotify.com/artist/4GYawQUhnxYepBC7WhUJ4N?si=UOrw0Pc-SQOmT_3K44T8Xg", "name": "SPOTIFY" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://www.youtube.com/channel/UCiHaEMWLCmFCeUkskrNeObQ", "name": "YOUTUBE" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://www.linkedin.com/in/brian-sekelsky/", "name": "LINKEDIN" })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Footer.astro", void 0);

const $$Astro$4 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body><div>${renderComponent($$result, "Nav", $$Nav, {})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Footer", $$Footer, {})}</div></body></html>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/layouts/Layout.astro", void 0);

const $$Astro$3 = createAstro();
const $$SmallHeading = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SmallHeading;
  const { text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="pb-1"><p class="uppercase font-light">${text}</p></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/SmallHeading.astro", void 0);

const $$Astro$2 = createAstro();
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Link;
  new URL(Astro2.request.url).pathname;
  const { href, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="underline hover:text-blue hover:font-bold"${addAttribute(href, "href")}>${name}</a>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Link.astro", void 0);

const brianImage = {"src":"/_astro/brian.17c8b8cb.png","width":544,"height":725,"format":"png"};

const $$Astro$1 = createAstro();
const $$About$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About$1;
  return renderTemplate`${maybeRenderHead()}<div class="" data-astro-cid-v2cbyr3p><div class="container mx-auto bg-black border-x" data-astro-cid-v2cbyr3p><div class="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" data-astro-cid-v2cbyr3p><div class="bg-white px-12 py-3 group w-full col-span-2 row-span-2 relative" data-astro-cid-v2cbyr3p><div class="flex flex-col min-h-full py-3" data-astro-cid-v2cbyr3p>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "Basics", "data-astro-cid-v2cbyr3p": true })}<p data-astro-cid-v2cbyr3p>he/him</p><p data-astro-cid-v2cbyr3p>(seh-KEL-skee)</p><p data-astro-cid-v2cbyr3p>briansekelsky@gmail.com</p><br data-astro-cid-v2cbyr3p><br data-astro-cid-v2cbyr3p>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "Bio", "data-astro-cid-v2cbyr3p": true })}<p data-astro-cid-v2cbyr3p>
I am a multidisciplinary designer focused on interaction, web, 3D,
            and user experience. I currently design products which help users
            manage and pay down their student debt at ${renderComponent($$result, "Link", $$Link, { "name": "Fidelity Investments.", "href": "https://www.fidelity.com/", "data-astro-cid-v2cbyr3p": true })}</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
I believe that good design is scaffolded by sound collaboration,
            solid research, constant curiosity, and a holistic consideration for
            everyone and everything affected by it.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
Previously I obtained a master's degree (MGXD/MFA) in Graphic &
            Experience Design at ${renderComponent($$result, "Link", $$Link, { "name": "North Carolina State University.", "href": "https://design.ncsu.edu/graphic-design/academics/masters/", "data-astro-cid-v2cbyr3p": true })}
During my time there, I worked as a designer/research assistant on
            Scale Worlds: a collaborative project between educators, designers,
            and engineers. Before that I worked as a graphic designer and
            frontend developer for a few different companies, spent 27 months
            teaching in Tanzania as a Peace Corps Volunteer, and studied
            Computer Science at the University of Wisconsin – Madison.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
In my free time I enjoy distance running, making art, recording
            electronic and folk music, and exploring the great outdoors.
</p></div></div><div class="bg-white px-12 py-3 group w-full col-span-2 row-span-2 relative" data-astro-cid-v2cbyr3p><div class="py-3 flex flex-col justify-between min-h-full" data-astro-cid-v2cbyr3p>${renderComponent($$result, "Image", $$Image, { "src": brianImage, "alt": "Image of Brian Sekelsky outside", "data-astro-cid-v2cbyr3p": true })}</div></div><div class="bg-white px-12 py-3 group w-full col-span-4 row-span-2 relative" data-astro-cid-v2cbyr3p><div class="flex flex-col min-h-full py-3" data-astro-cid-v2cbyr3p>${renderComponent($$result, "SmallHeading", $$SmallHeading, { "text": "About this site", "data-astro-cid-v2cbyr3p": true })}<p data-astro-cid-v2cbyr3p>
This site is a portfolio and archive for my designs, art, and music.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
It was built with ${renderComponent($$result, "Link", $$Link, { "name": "Astro JS", "href": "https://astro.build/", "data-astro-cid-v2cbyr3p": true })}
and ${renderComponent($$result, "Link", $$Link, { "name": "Tailwind CSS.", "href": "https://tailwindcss.com/", "data-astro-cid-v2cbyr3p": true })}
It is also hosted ${renderComponent($$result, "Link", $$Link, { "name": "here on github", "href": "https://github.com/BrianSekelsky/portfolio-2023", "data-astro-cid-v2cbyr3p": true })}. It is open source, meaning you are free to clone it and reuse
            any part of it for your own project. If you do use any of the code I
            just ask that you credit me and link back to this site.
</p></div></div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/About.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Brian Sekelsky" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main>${renderComponent($$result2, "About", $$About$1, {})}</main>` })}`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/pages/about.astro", void 0);

const $$file = "/Users/brian/Documents/Design/portfolio-2023/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, $$Layout as a, $$SmallHeading as b, about as c, imageConfig as i };
