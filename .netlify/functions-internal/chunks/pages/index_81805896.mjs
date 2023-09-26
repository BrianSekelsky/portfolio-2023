/* empty css                           */import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, g as renderComponent } from '../astro_9b611068.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Image, a as $$Layout } from './about_b277d856.mjs';
import '@astrojs/internal-helpers/path';
/* empty css                           *//* empty css                           */import '../astro-assets-services_08648697.mjs';
/* empty css                           */
const $$Astro$k = createAstro();
const $$CardLabel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$CardLabel;
  const { isLarge, value } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(isLarge ? "group-hover:text-white text-sm uppercase transition-all ease-in-out px-3 py-1" : "group-hover:text-white group-hover:bg-blue text-sm uppercase transition-all ease-in-out bg-white border-black border-solid", "class")}>${value}</p>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Card-label.astro", void 0);

const myImage$a = {"src":"/_astro/highest-mountain.0ba9a204.png","width":1500,"height":1500,"format":"png"};

const $$Astro$j = createAstro();
const $$HighestMountain = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$HighestMountain;
  const title = "Highest Mountain";
  const year = "2022";
  const types = ["Album Art"];
  const alt = "high mountain";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-i2cp5gch><div class="flex flex-col justify-between min-h-full" data-astro-cid-i2cp5gch><div class="pb-3 text-center" data-astro-cid-i2cp5gch>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-i2cp5gch": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$a, "alt": alt, "data-astro-cid-i2cp5gch": true })}<div class="flex justify-between pt-3" data-astro-cid-i2cp5gch><div class="flex flex-wrap gap-2" data-astro-cid-i2cp5gch>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-i2cp5gch": true })}`)}</div><div class="" data-astro-cid-i2cp5gch>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-i2cp5gch": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/HighestMountain.astro", void 0);

const myImage$9 = {"src":"/_astro/fidelity.7293a8a9.png","width":1650,"height":1650,"format":"png"};

const $$Astro$i = createAstro();
const $$Fidelity = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Fidelity;
  const title = "Fidelity Student Debt";
  const year = "2023";
  const types = ["User Experience"];
  const alt = "Screenshot of user experience work in figma";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer" data-astro-cid-pcad7ocl><div class="flex flex-col justify-between min-h-full" data-astro-cid-pcad7ocl><div class="pb-3 text-center" data-astro-cid-pcad7ocl>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-pcad7ocl": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$9, "alt": alt, "data-astro-cid-pcad7ocl": true })}<div class="flex justify-between pt-3" data-astro-cid-pcad7ocl><div class="flex flex-wrap gap-2" data-astro-cid-pcad7ocl>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-pcad7ocl": true })}`)}</div><div class="" data-astro-cid-pcad7ocl>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-pcad7ocl": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/Fidelity.astro", void 0);

const webm$3 = "/_astro/size_scale.eb93c389.webm";

const $$Astro$h = createAstro();
const $$SizeAndScale = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$SizeAndScale;
  const title = "Visualizing Size & Scale";
  const year = "2023";
  const types = ["Research // ", "User Experience // ", "Web development"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer" data-astro-cid-nx6myjsw><a href="projects/size-and-scale" data-astro-cid-nx6myjsw><div class="flex flex-col justify-between min-h-full" data-astro-cid-nx6myjsw><div class="pb-3 text-center" data-astro-cid-nx6myjsw>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-nx6myjsw": true })}</div><!-- <Image src={myImage} alt="image of the highest mountain" /> --><div${addAttribute("" , "class")} data-astro-cid-nx6myjsw><video class="mx-auto" width="600" height="600" playsinline autoplay muted loop data-astro-cid-nx6myjsw><source${addAttribute(webm$3, "src")} type="video/webm" data-astro-cid-nx6myjsw></video></div><div class="flex justify-between pt-3" data-astro-cid-nx6myjsw><div class="flex flex-wrap gap-2" data-astro-cid-nx6myjsw>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-nx6myjsw": true })}`)}</div><div class="" data-astro-cid-nx6myjsw>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-nx6myjsw": true })}</div></div></div></a></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/SizeAndScale.astro", void 0);

const webm$2 = "/_astro/physical-manifestation.7726a0c8.webm";

const $$Astro$g = createAstro();
const $$CriticalImages = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$CriticalImages;
  const title = "Critical Images";
  const year = "2023";
  const types = ["Visual"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-g43moycg><div class="flex flex-col justify-between min-h-full" data-astro-cid-g43moycg><div class="pb-3 text-center" data-astro-cid-g43moycg>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-g43moycg": true })}</div><div${addAttribute("" , "class")} data-astro-cid-g43moycg><video width="600" height="600" playsinline autoplay muted loop data-astro-cid-g43moycg><source${addAttribute(webm$2, "src")} type="video/webm" data-astro-cid-g43moycg></video></div><div class="flex justify-between pt-3" data-astro-cid-g43moycg><div class="flex flex-wrap gap-2" data-astro-cid-g43moycg>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-g43moycg": true })}`)}</div><div class="" data-astro-cid-g43moycg>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-g43moycg": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/CriticalImages.astro", void 0);

const webm$1 = "/_astro/vespertine2.a8b3b806.webm";

const $$Astro$f = createAstro();
const $$Vespertine = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Vespertine;
  const title = "Vespertine";
  const year = "2023";
  const types = ["Web development"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-iqrfbnyh><div class="flex flex-col justify-between min-h-full" data-astro-cid-iqrfbnyh><div class="pb-3 text-center" data-astro-cid-iqrfbnyh>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-iqrfbnyh": true })}</div><div${addAttribute("" , "class")} data-astro-cid-iqrfbnyh><video class="mx-auto" width="600" height="600" playsinline autoplay muted loop data-astro-cid-iqrfbnyh><source${addAttribute(webm$1, "src")} type="video/webm" data-astro-cid-iqrfbnyh></video></div><div class="flex justify-between pt-3" data-astro-cid-iqrfbnyh><div class="flex flex-wrap gap-2" data-astro-cid-iqrfbnyh>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-iqrfbnyh": true })}`)}</div><div class="" data-astro-cid-iqrfbnyh>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-iqrfbnyh": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/Vespertine.astro", void 0);

const myImage$8 = {"src":"/_astro/public-transit.09f71a55.png","width":1080,"height":1080,"format":"png"};

const $$Astro$e = createAstro();
const $$ImaginePublicTransit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$ImaginePublicTransit;
  const title = "Imagine Public Transit";
  const year = "2023";
  const types = ["visual"];
  const alt = "Billboard mocked up with design of text reading a car is great mode of transit provided that noone else has it";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-r43gzwgw><div class="flex flex-col justify-between min-h-full" data-astro-cid-r43gzwgw><div class="pb-3 text-center" data-astro-cid-r43gzwgw>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-r43gzwgw": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$8, "alt": alt, "data-astro-cid-r43gzwgw": true })}<div class="flex justify-between pt-3" data-astro-cid-r43gzwgw><div class="flex flex-wrap gap-2" data-astro-cid-r43gzwgw>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-r43gzwgw": true })}`)}</div><div class="" data-astro-cid-r43gzwgw>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-r43gzwgw": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/ImaginePublicTransit.astro", void 0);

const myImage$7 = {"src":"/_astro/no-content.d1baead9.png","width":3584,"height":2240,"format":"png"};

const $$Astro$d = createAstro();
const $$Nothing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Nothing;
  const title = "Nothing";
  const year = "2023";
  const types = ["User experience // ", "Speculative"];
  const alt = "Fake marketing slide for Nothing social media. Text reads What if social networking was content free? With three phones next to it displaying the app.";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-diibynrp><div class="flex flex-col justify-between min-h-full" data-astro-cid-diibynrp><div class="pb-3 text-center" data-astro-cid-diibynrp>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-diibynrp": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$7, "alt": alt, "data-astro-cid-diibynrp": true })}<div class="flex justify-between pt-3" data-astro-cid-diibynrp><div class="flex flex-wrap gap-2" data-astro-cid-diibynrp>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-diibynrp": true })}`)}</div><div class="" data-astro-cid-diibynrp>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-diibynrp": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/Nothing.astro", void 0);

const src$1 = "/_astro/glaciers.162bf9b9.webm";

const $$Astro$c = createAstro();
const $$WitnessingGlaciers = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$WitnessingGlaciers;
  const title = "Witnessing Glaciers";
  const year = "2022";
  const types = ["Web development // ", "Three JS"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer" data-astro-cid-iwb7ca6q><div class="flex flex-col justify-between min-h-full" data-astro-cid-iwb7ca6q><div class="pb-3 text-center" data-astro-cid-iwb7ca6q>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-iwb7ca6q": true })}</div><!-- <Image src={myImage} alt="image of the highest mountain" /> --><div${addAttribute("" , "class")} data-astro-cid-iwb7ca6q><video class="mx-auto" width="600" height="600" playsinline autoplay muted loop data-astro-cid-iwb7ca6q><source${addAttribute(src$1, "src")} type="video/webm" data-astro-cid-iwb7ca6q></video></div><div class="flex justify-between pt-3" data-astro-cid-iwb7ca6q><div class="flex flex-wrap gap-2" data-astro-cid-iwb7ca6q>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-iwb7ca6q": true })}`)}</div><div class="" data-astro-cid-iwb7ca6q>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-iwb7ca6q": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/WitnessingGlaciers.astro", void 0);

const webm = "/_astro/scale-worlds.17567f32.webm";

const $$Astro$b = createAstro();
const $$ScaleWorlds = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ScaleWorlds;
  const title = "Scale Worlds";
  const year = "2021 \u2014 2023";
  const types = ["User Experience // ", "Virtual Reality // ", "Three JS"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer" data-astro-cid-gjzftgto><div class="flex flex-col justify-between min-h-full" data-astro-cid-gjzftgto><div class="pb-3 text-center" data-astro-cid-gjzftgto>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-gjzftgto": true })}</div><!-- <Image src={myImage} alt="image of the highest mountain" /> --><div${addAttribute("" , "class")} data-astro-cid-gjzftgto><video class="mx-auto" width="600" height="600" playsinline autoplay muted loop data-astro-cid-gjzftgto><source${addAttribute(webm, "src")} type="video/webm" data-astro-cid-gjzftgto></video></div><div class="flex justify-between pt-3" data-astro-cid-gjzftgto><div class="flex flex-wrap gap-2" data-astro-cid-gjzftgto>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-gjzftgto": true })}`)}</div><div class="" data-astro-cid-gjzftgto>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-gjzftgto": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/ScaleWorlds.astro", void 0);

const myImage$6 = {"src":"/_astro/deliberate.aedf73aa.png","width":1912,"height":1105,"format":"png"};

const $$Astro$a = createAstro();
const $$DeliberateAI = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$DeliberateAI;
  const title = "Deliberate AI";
  const year = "2022";
  const types = ["User Experience"];
  const alt = "Deliberate AI logo and screens from prototypes for the Deliberate AI health application.";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-cz2th6wp><div class="flex flex-col justify-between min-h-full" data-astro-cid-cz2th6wp><div class="pb-3 text-center" data-astro-cid-cz2th6wp>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-cz2th6wp": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$6, "alt": alt, "data-astro-cid-cz2th6wp": true })}<div class="flex justify-between pt-3" data-astro-cid-cz2th6wp><div class="flex flex-wrap gap-2" data-astro-cid-cz2th6wp>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-cz2th6wp": true })}`)}</div><div class="" data-astro-cid-cz2th6wp>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-cz2th6wp": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/DeliberateAI.astro", void 0);

const myImage$5 = {"src":"/_astro/around.fa779678.gif","width":600,"height":600,"format":"gif"};

const $$Astro$9 = createAstro();
const $$Around = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Around;
  const title = "Around";
  const year = "2022";
  const types = ["Album Art"];
  const alt = "Flowers swirling in and out in a psychadelic way";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-bkg2gieg><div class="flex flex-col justify-between min-h-full" data-astro-cid-bkg2gieg><div class="pb-3 text-center" data-astro-cid-bkg2gieg>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-bkg2gieg": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$5, "alt": alt, "data-astro-cid-bkg2gieg": true })}<div class="flex justify-between pt-3" data-astro-cid-bkg2gieg><div class="flex flex-wrap gap-2" data-astro-cid-bkg2gieg>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-bkg2gieg": true })}`)}</div><div class="" data-astro-cid-bkg2gieg>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-bkg2gieg": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/Around.astro", void 0);

const myImage$4 = {"src":"/_astro/terrafirma.96d9e71e.png","width":3824,"height":2210,"format":"png"};

const $$Astro$8 = createAstro();
const $$TerraFirma = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$TerraFirma;
  const title = "Terrafirma Software";
  const year = "2021";
  const types = ["Branding"];
  const alt = "Terrafirma logo and other branded materials including webpages";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-mrpre5l3><div class="flex flex-col justify-between min-h-full" data-astro-cid-mrpre5l3><div class="pb-3 text-center" data-astro-cid-mrpre5l3>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-mrpre5l3": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$4, "alt": alt, "data-astro-cid-mrpre5l3": true })}<div class="flex justify-between pt-3" data-astro-cid-mrpre5l3><div class="flex flex-wrap gap-2" data-astro-cid-mrpre5l3>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-mrpre5l3": true })}`)}</div><div class="" data-astro-cid-mrpre5l3>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-mrpre5l3": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/TerraFirma.astro", void 0);

const myImage$3 = {"src":"/_astro/speculative-design-workshop.d965349a.png","width":1122,"height":1080,"format":"png"};

const $$Astro$7 = createAstro();
const $$SpeculativeDesignWorkshop = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SpeculativeDesignWorkshop;
  const title = "Speculative Design Workshop";
  const year = "2022";
  const types = ["Teaching"];
  const alt = "Screenshot of the miro board that was used in the design workshop. Shows lots of text which is unreadable and small images";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-adiewgzc><div class="flex flex-col justify-between min-h-full" data-astro-cid-adiewgzc><div class="pb-3 text-center" data-astro-cid-adiewgzc>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-adiewgzc": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$3, "alt": alt, "data-astro-cid-adiewgzc": true })}<div class="flex justify-between pt-3" data-astro-cid-adiewgzc><div class="flex flex-wrap gap-2" data-astro-cid-adiewgzc>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-adiewgzc": true })}`)}</div><div class="" data-astro-cid-adiewgzc>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-adiewgzc": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/SpeculativeDesignWorkshop.astro", void 0);

const src = "/_astro/ar-lit-review.f46c63ea.webm";

const $$Astro$6 = createAstro();
const $$PossibleInternet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$PossibleInternet;
  const title = "Possible Internet";
  const year = "2022";
  const types = ["Augmented Reality // ", "Speculative"];
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full col-span-2 row-span-2 relative transition ease-in-out hover:cursor-pointer" data-astro-cid-tbyei2nw><div class="flex flex-col justify-between min-h-full" data-astro-cid-tbyei2nw><div class="pb-3 text-center" data-astro-cid-tbyei2nw>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-tbyei2nw": true })}</div><!-- <Image src={myImage} alt="image of the highest mountain" /> --><div${addAttribute("" , "class")} data-astro-cid-tbyei2nw><video class="mx-auto" width="600" height="600" playsinline autoplay muted loop data-astro-cid-tbyei2nw><source${addAttribute(src, "src")} type="video/webm" data-astro-cid-tbyei2nw></video></div><div class="flex justify-between pt-3" data-astro-cid-tbyei2nw><div class="flex flex-wrap gap-2" data-astro-cid-tbyei2nw>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-tbyei2nw": true })}`)}</div><div class="" data-astro-cid-tbyei2nw>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-tbyei2nw": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/PossibleInternet.astro", void 0);

const myImage$2 = {"src":"/_astro/parts-unlimited.667ee85e.png","width":1518,"height":1518,"format":"png"};

const $$Astro$5 = createAstro();
const $$PartsUnlimited = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PartsUnlimited;
  const title = "Parts Unlimited";
  const year = "2020";
  const types = ["Frontend Development"];
  const alt = "Screenshot of parts unlimited website showing snow related products and more";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-whjkd6kf><div class="flex flex-col justify-between min-h-full" data-astro-cid-whjkd6kf><div class="pb-3 text-center" data-astro-cid-whjkd6kf>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-whjkd6kf": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$2, "alt": alt, "data-astro-cid-whjkd6kf": true })}<div class="flex justify-between pt-3" data-astro-cid-whjkd6kf><div class="flex flex-wrap gap-2" data-astro-cid-whjkd6kf>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-whjkd6kf": true })}`)}</div><div class="" data-astro-cid-whjkd6kf>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-whjkd6kf": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/PartsUnlimited.astro", void 0);

const myImage$1 = {"src":"/_astro/las.07fbbe06.png","width":920,"height":538,"format":"png"};

const $$Astro$4 = createAstro();
const $$LAS = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LAS;
  const title = "Laboratory for Analytic Sciences";
  const year = "2022";
  const types = ["Album Art"];
  const alt = "Three images of prototypes made for this project overlayed on one another and a purple gradient background";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-5s3etbda><div class="flex flex-col justify-between min-h-full" data-astro-cid-5s3etbda><div class="pb-3 text-center" data-astro-cid-5s3etbda>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-5s3etbda": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage$1, "alt": alt, "data-astro-cid-5s3etbda": true })}<div class="flex justify-between pt-3" data-astro-cid-5s3etbda><div class="flex flex-wrap gap-2" data-astro-cid-5s3etbda>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-5s3etbda": true })}`)}</div><div class="" data-astro-cid-5s3etbda>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-5s3etbda": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/LAS.astro", void 0);

const myImage = {"src":"/_astro/concert-interface.0ac35e4d.png","width":5492,"height":3267,"format":"png"};

const $$Astro$3 = createAstro();
const $$ConcertInterface = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ConcertInterface;
  const title = "DIY Concerts";
  const year = "2021";
  const types = ["Speculative"];
  const alt = "Kaitlyn Aurelia Smith in a experimental concert interface with cursors moving images around the screen";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white hover:bg-blue px-12 py-3 group w-full relative transition ease-in-out hover:cursor-pointer" data-astro-cid-ghesroho><div class="flex flex-col justify-between min-h-full" data-astro-cid-ghesroho><div class="pb-3 text-center" data-astro-cid-ghesroho>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": title, ",": true, "isLarge": true, "data-astro-cid-ghesroho": true })}</div>${renderComponent($$result, "Image", $$Image, { "src": myImage, "alt": alt, "data-astro-cid-ghesroho": true })}<div class="flex justify-between pt-3" data-astro-cid-ghesroho><div class="flex flex-wrap gap-2" data-astro-cid-ghesroho>${types.map((type) => renderTemplate`${renderComponent($$result, "CardLabel", $$CardLabel, { "value": type, ",": true, "isLarge": false, "data-astro-cid-ghesroho": true })}`)}</div><div class="" data-astro-cid-ghesroho>${renderComponent($$result, "CardLabel", $$CardLabel, { "value": year, ",": true, "isLarge": false, "data-astro-cid-ghesroho": true })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery-cards/ConcertInterface.astro", void 0);

const $$Astro$2 = createAstro();
const $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Gallery;
  return renderTemplate`${maybeRenderHead()}<div class="border-t" data-astro-cid-ihllb3az><div class="container mx-auto bg-black sm:border-x" data-astro-cid-ihllb3az><div class="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr" data-astro-cid-ihllb3az>${renderComponent($$result, "SizeAndScale", $$SizeAndScale, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Fidelity", $$Fidelity, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "CriticalImages", $$CriticalImages, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Vespertine", $$Vespertine, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "ImaginePublicTransit", $$ImaginePublicTransit, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Nothing", $$Nothing, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "WitnessingGlaciers", $$WitnessingGlaciers, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "ScaleWorlds", $$ScaleWorlds, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "DeliberateAI", $$DeliberateAI, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "Around", $$Around, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "PossibleInternet", $$PossibleInternet, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "SpeculativeDesignWorkshop", $$SpeculativeDesignWorkshop, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "HighestMountain", $$HighestMountain, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "LAS", $$LAS, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "TerraFirma", $$TerraFirma, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "ConcertInterface", $$ConcertInterface, { "data-astro-cid-ihllb3az": true })}${renderComponent($$result, "PartsUnlimited", $$PartsUnlimited, { "data-astro-cid-ihllb3az": true })}</div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Gallery.astro", void 0);

const $$Astro$1 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<div><div class="container mx-auto"><p class="text-center py-16 my-16 px-3 leading-tight h-full align-middle font-serif font-thin text-4xl md:text-6xl">
My name is Brian Sekelsky. I'm a designer, programmer, researcher, &
      musician. This is my portfolio
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

export { $$Index as default, $$file as file, $$url as url };
