/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent } from '../astro_96538662.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Layout } from './about_e5877162.mjs';
/* empty css                           */import { $ as $$Image } from './image-endpoint_6a86b785.mjs';

const $$Astro$6 = createAstro();
const $$CardLabel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$CardLabel;
  const { isLarge, value } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(isLarge ? "group-hover:text-white text-sm uppercase transition-all ease-in-out px-3 py-1" : "group-hover:text-white group-hover:bg-blue text-sm uppercase transition-all ease-in-out bg-white border-black border-solid", "class")}>${value}</p>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Card-label.astro", void 0);

const $$Astro$5 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Card;
  const { title, description, year, types, size, hasVideo, src } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(size === "small" ? "bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" : "bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer", "class")} data-astro-cid-dohjnao5><div class="flex flex-col justify-between min-h-full" data-astro-cid-dohjnao5><div class="pb-3 text-center" data-astro-cid-dohjnao5>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-dohjnao5": true })}</div><img${addAttribute(hasVideo ? "hidden" : "", "class")}${addAttribute(src, "src")} data-astro-cid-dohjnao5><div${addAttribute(hasVideo ? "" : "hidden", "class")} data-astro-cid-dohjnao5><video width="600" height="600" playsinline autoplay muted loop data-astro-cid-dohjnao5><source${addAttribute(src, "src")} type="video/webm" data-astro-cid-dohjnao5></video></div><div class="flex justify-between pt-3" data-astro-cid-dohjnao5><div class="flex flex-wrap gap-2" data-astro-cid-dohjnao5>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-dohjnao5": true })}`)}</div><div class="" data-astro-cid-dohjnao5>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-dohjnao5": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Card.astro", void 0);

const myImage$1 = {"src":"/_astro/highest-mountain.0ba9a204.png","width":1500,"height":1500,"format":"png"};

const $$Astro$4 = createAstro();
const $$HighestMountain = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$HighestMountain;
  const title = "Highest Mountain";
  const year = "2022";
  const types = ["visual"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-54jcjhc7><div class="flex flex-col justify-between min-h-full" data-astro-cid-54jcjhc7><div class="pb-3 text-center" data-astro-cid-54jcjhc7>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-54jcjhc7": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$1, "alt": "image of the highest mountain", "data-astro-cid-54jcjhc7": true })}<div class="flex justify-between pt-3" data-astro-cid-54jcjhc7><div class="flex flex-wrap gap-2" data-astro-cid-54jcjhc7>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-54jcjhc7": true })}`)}</div><div class="" data-astro-cid-54jcjhc7>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-54jcjhc7": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/Highest-mountain.astro", void 0);

const myImage = {"src":"/_astro/fidelity.7293a8a9.png","width":1650,"height":1650,"format":"png"};

const $$Astro$3 = createAstro();
const $$Fidelity = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Fidelity;
  const title = "Fidelity Student Debt";
  const year = "2023";
  const types = ["User Experience"];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute("bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer", "class")} data-astro-cid-pcad7ocl><div class="flex flex-col justify-between min-h-full" data-astro-cid-pcad7ocl><div class="pb-3 text-center" data-astro-cid-pcad7ocl>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-pcad7ocl": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage, "alt": "image of the highest mountain", "data-astro-cid-pcad7ocl": true })}<div class="flex justify-between pt-3" data-astro-cid-pcad7ocl><div class="flex flex-wrap gap-2" data-astro-cid-pcad7ocl>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-pcad7ocl": true })}`)}</div><div class="" data-astro-cid-pcad7ocl>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-pcad7ocl": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/Fidelity.astro", void 0);

const $$Astro$2 = createAstro();
const $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Gallery;
  return renderTemplate`${maybeRenderHead()}<div class="border-t" data-astro-cid-ihllb3az><div class="container mx-auto bg-black border-x" data-astro-cid-ihllb3az><div class="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr" data-astro-cid-ihllb3az>${renderComponent($$result, "HighestMountain", $$HighestMountain, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Fidelity", $$Fidelity, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Visualizing Size & Scale", "description": "this is an explanation about project 1", "year": "2023", "types": ["Research // ", "User Experience // ", "Web development"], "size": "medium", "hasVideo": true, "src": "src/images/homepage/size&scale.webm", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Critical Images", "description": "this is an explanation about project 4", "year": "2023", "types": ["Visual"], "size": "small", "hasVideo": true, "src": "src/images/homepage/physical-manifestation.webm", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Imagine Public Transit", "description": "this is an explanation about project 4", "year": "2023", "types": ["Visual"], "size": "small", "hasVideo": false, "src": "src/images/homepage/public-transit.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Vespertine", "description": "this is an explanation about project 4", "year": "2023", "types": ["Visual // ", "Web development"], "size": "small", "hasVideo": true, "src": "src/images/homepage/vespertine2.webm", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Nothing", "description": "this is an explanation about project 4", "year": "2023", "types": ["User experience // ", "Speculative"], "size": "small", "hasVideo": false, "src": "src/images/homepage/no-content.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Fidelity Student Debt", "description": "this is an explanation about project 2", "year": "2023", "types": ["User Experience // ", "User Interface // ", "Research"], "size": "medium", "hasVideo": false, "src": "src/images/homepage/fidelity.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Witnessing Glaciers", "description": "this is an explanation about project 2", "year": "2022", "types": ["Web Development // ", "Three JS"], "size": "medium", "hasVideo": true, "src": "src/images/homepage/glaciers.webm", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Scale Worlds", "description": "this is an explanation about project 2", "year": "2021 \u2014 2023", "types": ["User Experience // ", "Virtual Reality // ", "Research"], "size": "medium", "hasVideo": true, "src": "src/images/homepage/scale-worlds.webm", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Deliberate AI", "description": "this is an explanation about project 4", "year": "2022", "types": ["User Experience"], "size": "small", "hasVideo": false, "src": "src/images/homepage/deliberate.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Around", "description": "this is an explanation about project 6", "year": "2022", "types": ["Album Art"], "size": "small", "hasVideo": false, "src": "src/images/homepage/around.gif", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "TerraFirma Software", "description": "this is an explanation about project 6", "year": "2022", "types": ["Branding"], "size": "small", "hasVideo": false, "src": "src/images/homepage/terrafirma.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Speculative design workshop", "description": "this is an explanation about project 6", "year": "2022", "types": ["Teaching"], "size": "small", "hasVideo": false, "src": "src/images/homepage/speculative-design-workshop.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "AR Literature review", "description": "this is an explanation about project 6", "year": "2022", "types": ["Augmented Reality // ", "Research"], "size": "medium", "hasVideo": true, "src": "src/images/homepage/ar-lit-review.webm", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Parts Unlimited", "description": "this is an explanation about project 6", "year": "2022", "types": ["Frontend Development"], "size": "small", "hasVideo": false, "src": "src/images/homepage/parts-unlimited.png", "alt": "", "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Card", $$Card, { "title": "Laboratory for Analytic Sciences", "description": "this is an explanation about project 6", "year": "2022", "types": ["User Experience"], "size": "small", "hasVideo": false, "src": "src/images/homepage/las.png", "alt": "", "data-astro-cid-ihllb3az": true })}</div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery.astro", void 0);

const $$Astro$1 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<div><div class="container mx-auto"><p class="text-center font-serif font-thin text-6xl py-16 my-16 px-3 leading-tight h-full align-middle">
My name is Brian Sekelsky. I’m a designer, programmer, researcher, &
      musician. This is my portfolio.
</p></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Brian Sekelsky" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main>${renderComponent($$result2, "Header", $$Header, {})}${renderComponent($$result2, "Gallery", $$Gallery, {})}</main>` })}`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/pages/index.astro", void 0);

const $$file = "/Users/brian/Documents/Design/portfolio-2023/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Header as $, index as i };
