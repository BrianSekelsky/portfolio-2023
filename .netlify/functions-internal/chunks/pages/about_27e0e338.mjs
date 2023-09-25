import { isRemotePath, joinPaths } from '@astrojs/internal-helpers/path';
/* empty css                           */import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, g as renderHead, h as renderSlot } from '../astro_b72c5eea.mjs';
import 'html-escaper';
import 'clsx';
/* empty css                           *//* empty css                           */
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(
          JSON.stringify(options.src),
          typeof options.src,
          JSON.stringify(options, (_, v) => v === void 0 ? null : v)
        )
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp_adda4fc4.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$7 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
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

const $$Astro$6 = createAstro();
const $$NavLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$NavLink;
  const currentPath = new URL(Astro2.request.url).pathname;
  const { href, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(currentPath === href ? "rounded-full border px-4 first:ml-0" : "rounded-full border first:ml-0 mx-4 border-white hover:text-blue", "class")}${addAttribute(href, "href")}>${name}</a>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Nav-link.astro", void 0);

const $$Astro$5 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Nav;
  const pathname = new URL(Astro2.request.url).pathname;
  pathname.slice(1);
  return renderTemplate`${maybeRenderHead()}<div class="border-b"><div class="container mx-auto"><div class="flex flex-wrap justify-between p-3 content-center items-center">${renderComponent($$result, "NavLink", $$NavLink, { "href": "/#", "name": "BRIAN SEKELSKY" })}<div class="flex gap-16">${renderComponent($$result, "NavLink", $$NavLink, { "href": "/", "name": "DESIGN" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "/music", "name": "MUSIC" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "/about", "name": "ABOUT" })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Nav.astro", void 0);

const $$Astro$4 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const pathname = new URL(Astro2.request.url).pathname;
  pathname.slice(1);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<div class="border-t"><div class="container mx-auto"><div class="flex justify-between p-3 content-center items-center"><p class="">© ${year} BRIAN SEKELSKY</p><div class="flex gap-16">${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://www.instagram.com/briansekelsky/", "name": "INSTAGRAM" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://open.spotify.com/artist/4GYawQUhnxYepBC7WhUJ4N?si=UOrw0Pc-SQOmT_3K44T8Xg", "name": "SPOTIFY" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://www.youtube.com/channel/UCiHaEMWLCmFCeUkskrNeObQ", "name": "YOUTUBE" })}${renderComponent($$result, "NavLink", $$NavLink, { "href": "https://www.linkedin.com/in/brian-sekelsky/", "name": "LINKEDIN" })}</div></div></div></div>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Footer.astro", void 0);

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body><div class="">${renderComponent($$result, "Nav", $$Nav, {})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Footer", $$Footer, {})}</div></body></html>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/layouts/Layout.astro", void 0);

const $$Astro$2 = createAstro();
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Link;
  new URL(Astro2.request.url).pathname;
  const { href, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="underline hover:text-blue"${addAttribute(href, "href")}>${name}</a>`;
}, "/Users/brian/Documents/Design/portfolio-2023/src/components/Link.astro", void 0);

const brianImage = {"src":"/_astro/brian.90645636.png","width":3024,"height":4032,"format":"png"};

const $$Astro$1 = createAstro();
const $$About$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About$1;
  return renderTemplate`${maybeRenderHead()}<div class="" data-astro-cid-v2cbyr3p><div class="container mx-auto bg-black border-x" data-astro-cid-v2cbyr3p><div class="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" data-astro-cid-v2cbyr3p><div class="bg-white px-12 py-3 group w-full col-span-2 row-span-2 relative" data-astro-cid-v2cbyr3p><div class="flex flex-col min-h-full py-3" data-astro-cid-v2cbyr3p><div class="pb-3" data-astro-cid-v2cbyr3p><p class="uppercase" data-astro-cid-v2cbyr3p>Basics</p></div><p data-astro-cid-v2cbyr3p>he/him</p><p data-astro-cid-v2cbyr3p>(seh-KEL-skee)</p><p data-astro-cid-v2cbyr3p>briansekelsky@gmail.com</p><br data-astro-cid-v2cbyr3p><br data-astro-cid-v2cbyr3p><div class="pb-3" data-astro-cid-v2cbyr3p><p class="uppercase" data-astro-cid-v2cbyr3p>Bio</p></div><p data-astro-cid-v2cbyr3p>
I am a multidisciplinary designer focused on interaction, web, 3D,
            and user experience. I currently design products which help users
            manage and pay down their student debt at ${renderComponent($$result, "Link", $$Link, { "name": "Fidelity Investments", "href": "https://www.fidelity.com/", "data-astro-cid-v2cbyr3p": true })}
.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
I believe that good design is scaffolded by sound collaboration,
            solid research, constant curiosity, and a holistic consideration for
            everyone and everything affected by it.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
Previously I obtained a master's degree (MGXD/MFA) in Graphic &
            Experience Design at ${renderComponent($$result, "Link", $$Link, { "name": "North Carolina State University", "href": "https://design.ncsu.edu/graphic-design/academics/masters/", "data-astro-cid-v2cbyr3p": true })}
. During my time there, I worked as a designer/research assistant
            on Scale Worlds: a collaborative project between educators,
            designers, and engineers. Before that I worked as a graphic designer
            and frontend developer for a few different companies, spent 27
            months teaching in Tanzania as a Peace Corps Volunteer, and studied
            Computer Science at the University of Wisconsin – Madison.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
In my free time I enjoy distance running, making art, recording
            electronic and folk music, and exploring the great outdoors.
</p></div></div><div class="bg-white px-12 py-3 group w-full col-span-2 row-span-2 relative" data-astro-cid-v2cbyr3p><div class="py-3 flex flex-col justify-between min-h-full" data-astro-cid-v2cbyr3p>${renderComponent($$result, "Image", $$Image, { "src": brianImage, "alt": "Image of Brian Sekelsky outside", "data-astro-cid-v2cbyr3p": true })}</div></div><div class="bg-white px-12 py-3 group w-full col-span-4 row-span-2 relative" data-astro-cid-v2cbyr3p><div class="flex flex-col min-h-full py-3" data-astro-cid-v2cbyr3p><div class="pb-3" data-astro-cid-v2cbyr3p><p class="uppercase" data-astro-cid-v2cbyr3p>About this site</p></div><p data-astro-cid-v2cbyr3p>
This site is a portfolio and archive for my designs, art, and music.
</p><br data-astro-cid-v2cbyr3p><p data-astro-cid-v2cbyr3p>
This site was built with Astro JS and Tailwind CSS. It is also
            hosted ${renderComponent($$result, "Link", $$Link, { "name": "here on github", "href": "https://github.com/BrianSekelsky/portfolio-2023", "data-astro-cid-v2cbyr3p": true })}. It is open source, meaning you can feel free to clone it, remix
            it, or reuse any part of it for your own project.
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

export { $$Image as $, isRemoteAllowed as a, $$Layout as b, baseService as c, about as d, getConfiguredImageService as g, imageConfig as i, parseQuality as p };
