import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_96538662.mjs';
import 'mime';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.502db520.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Regular.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Thin.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Bold.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-RegularItalic.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(src/font/PPEditorialNew-Thin.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(src/font/PPEditorialNew-ThinItalic.otf) format(\"woff\");font-weight:100;font-style:italic}a{text-decoration:underline}\nimg[data-astro-cid-dohjnao5],img[data-astro-cid-54jcjhc7]{width:100%}.gap-1[data-astro-cid-ihllb3az]{gap:1px}\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.502db520.css"}],"routeData":{"route":"/projects/project-1","type":"page","pattern":"^\\/projects\\/project-1\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"project-1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/project-1.astro","pathname":"/projects/project-1","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.502db520.css"}],"routeData":{"route":"/projects/project-2","type":"page","pattern":"^\\/projects\\/project-2\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"project-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/project-2.astro","pathname":"/projects/project-2","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.502db520.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Regular.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Thin.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Bold.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-RegularItalic.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(src/font/PPEditorialNew-Thin.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(src/font/PPEditorialNew-ThinItalic.otf) format(\"woff\");font-weight:100;font-style:italic}a{text-decoration:underline}\n.gap-1[data-astro-cid-v2cbyr3p]{gap:1px}\n"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.502db520.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Regular.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Thin.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-Bold.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(src/font/PPNeueMontrealMono-RegularItalic.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(src/font/PPEditorialNew-Thin.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(src/font/PPEditorialNew-ThinItalic.otf) format(\"woff\");font-weight:100;font-style:italic}a{text-decoration:underline}\n"}],"routeData":{"route":"/music","type":"page","pattern":"^\\/music\\/?$","segments":[[{"content":"music","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/music.astro","pathname":"/music","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/brian/Documents/Design/portfolio-2023/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/brian/Documents/Design/portfolio-2023/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/brian/Documents/Design/portfolio-2023/src/pages/music.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/music.astro":"chunks/pages/music_2554d0b3.mjs","/src/pages/projects/project-1.astro":"chunks/pages/project-1_720ab783.mjs","/src/pages/projects/project-2.astro":"chunks/pages/project-2_886e98a7.mjs","\u0000@astrojs-manifest":"manifest_396d6e95.mjs","\u0000@astro-page:node_modules/astro/dist/assets/image-endpoint@_@js":"chunks/image-endpoint_87299d6d.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_808294d5.mjs","\u0000@astro-page:src/pages/projects/project-1@_@astro":"chunks/project-1_ae683983.mjs","\u0000@astro-page:src/pages/projects/project-2@_@astro":"chunks/project-2_39eba426.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_43cb3c79.mjs","\u0000@astro-page:src/pages/music@_@astro":"chunks/music_4abeeab1.mjs","/Users/brian/Documents/Design/portfolio-2023/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_0276ed08.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/highest-mountain.0ba9a204.png","/_astro/about.502db520.css","/_astro/about.b51a79dc.css","/_astro/about.c8276fa8.css","/_astro/index.278f11bb.css","/favicon.svg"]});

export { manifest };
