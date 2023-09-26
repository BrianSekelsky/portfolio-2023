import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_9b611068.mjs';
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

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.e7ea724a.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Regular.f89f3333.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Thin.f1c8aa59.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Bold.117d285f.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-RegularItalic.60fae49d.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-Thin.011c73ba.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-ThinItalic.b39c3f2b.otf) format(\"woff\");font-weight:100;font-style:italic}\nimg[data-astro-cid-i2cp5gch],img[data-astro-cid-pcad7ocl],img[data-astro-cid-nx6myjsw],img[data-astro-cid-g43moycg],img[data-astro-cid-iqrfbnyh],img[data-astro-cid-r43gzwgw],img[data-astro-cid-diibynrp],img[data-astro-cid-iwb7ca6q],img[data-astro-cid-gjzftgto],img[data-astro-cid-cz2th6wp],img[data-astro-cid-bkg2gieg],img[data-astro-cid-mrpre5l3],img[data-astro-cid-adiewgzc],img[data-astro-cid-tbyei2nw],img[data-astro-cid-whjkd6kf],img[data-astro-cid-5s3etbda],img[data-astro-cid-ghesroho]{width:100%}.gap-1[data-astro-cid-ihllb3az]{gap:1px}\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.e7ea724a.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Regular.f89f3333.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Thin.f1c8aa59.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Bold.117d285f.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-RegularItalic.60fae49d.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-Thin.011c73ba.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-ThinItalic.b39c3f2b.otf) format(\"woff\");font-weight:100;font-style:italic}\n.gap-1[data-astro-cid-ifqv77uc]{gap:1px}\n"}],"routeData":{"route":"/projects/size-and-scale","type":"page","pattern":"^\\/projects\\/size-and-scale\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"size-and-scale","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/size-and-scale.astro","pathname":"/projects/size-and-scale","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.e7ea724a.css"}],"routeData":{"route":"/projects/project-2","type":"page","pattern":"^\\/projects\\/project-2\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"project-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/project-2.astro","pathname":"/projects/project-2","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.e7ea724a.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Regular.f89f3333.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Thin.f1c8aa59.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Bold.117d285f.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-RegularItalic.60fae49d.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-Thin.011c73ba.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-ThinItalic.b39c3f2b.otf) format(\"woff\");font-weight:100;font-style:italic}\n.gap-1[data-astro-cid-v2cbyr3p]{gap:1px}\n"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.e7ea724a.css"},{"type":"inline","content":"@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Regular.f89f3333.woff) format(\"woff\")}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Thin.f1c8aa59.woff) format(\"woff\");font-weight:100}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-Bold.117d285f.woff) format(\"woff\");font-weight:700}@font-face{font-family:NeueMontrealMono;src:url(/_astro/PPNeueMontrealMono-RegularItalic.60fae49d.woff) format(\"woff\");font-style:italic}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-Thin.011c73ba.ttf) format(\"woff\");font-weight:100}@font-face{font-family:EditorialNew;src:url(/_astro/PPEditorialNew-ThinItalic.b39c3f2b.otf) format(\"woff\");font-weight:100;font-style:italic}\n"}],"routeData":{"route":"/music","type":"page","pattern":"^\\/music\\/?$","segments":[[{"content":"music","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/music.astro","pathname":"/music","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/brian/Documents/Design/portfolio-2023/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/brian/Documents/Design/portfolio-2023/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/brian/Documents/Design/portfolio-2023/src/pages/music.astro",{"propagation":"none","containsHead":true}],["/Users/brian/Documents/Design/portfolio-2023/src/pages/projects/size-and-scale.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/astro/dist/assets/image-endpoint.js":"chunks/pages/image-endpoint_d263bf0f.mjs","/src/pages/index.astro":"chunks/pages/index_81805896.mjs","/src/pages/music.astro":"chunks/pages/music_a6294b30.mjs","/src/pages/projects/project-2.astro":"chunks/pages/project-2_a6271fc0.mjs","/src/pages/projects/size-and-scale.astro":"chunks/pages/size-and-scale_d672ae1a.mjs","\u0000@astrojs-manifest":"manifest_e88b94d4.mjs","\u0000@astro-page:node_modules/astro/dist/assets/image-endpoint@_@js":"chunks/image-endpoint_dcdaa87f.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_b0d1b638.mjs","\u0000@astro-page:src/pages/projects/size-and-scale@_@astro":"chunks/size-and-scale_e4ae00ca.mjs","\u0000@astro-page:src/pages/projects/project-2@_@astro":"chunks/project-2_d32b54cb.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_0aed84d6.mjs","\u0000@astro-page:src/pages/music@_@astro":"chunks/music_20d07633.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/scale.e9cbef2c.webm","/_astro/PPNeueMontrealMono-Bold.117d285f.woff","/_astro/PPNeueMontrealMono-Thin.f1c8aa59.woff","/_astro/PPNeueMontrealMono-Regular.f89f3333.woff","/_astro/PPNeueMontrealMono-RegularItalic.60fae49d.woff","/_astro/PPEditorialNew-ThinItalic.b39c3f2b.otf","/_astro/PPEditorialNew-Thin.011c73ba.ttf","/_astro/brian.17c8b8cb.png","/_astro/physical-manifestation.7726a0c8.webm","/_astro/highest-mountain.0ba9a204.png","/_astro/public-transit.09f71a55.png","/_astro/vespertine2.a8b3b806.webm","/_astro/size_scale.eb93c389.webm","/_astro/fidelity.7293a8a9.png","/_astro/scale-worlds.17567f32.webm","/_astro/deliberate.aedf73aa.png","/_astro/speculative-design-workshop.d965349a.png","/_astro/glaciers.162bf9b9.webm","/_astro/ar-lit-review.f46c63ea.webm","/_astro/las.07fbbe06.png","/_astro/no-content.d1baead9.png","/_astro/parts-unlimited.667ee85e.png","/_astro/terrafirma.96d9e71e.png","/_astro/around.fa779678.gif","/_astro/concert-interface.0ac35e4d.png","/_astro/about.e7ea724a.css","/_astro/about.c8276fa8.css","/_astro/about.34796f5b.css","/_astro/index.f8bdf4f5.css","/_astro/size-and-scale.15607cdb.css","/favicon.svg"]});

export { manifest };
