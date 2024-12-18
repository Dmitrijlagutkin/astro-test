import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_BCOoW3z2.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
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
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/colorado/astro/cd%20astro/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"enciclopedia/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/enciclopedia","isIndex":false,"type":"page","pattern":"^\\/enciclopedia\\/?$","segments":[[{"content":"enciclopedia","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/enciclopedia.astro","pathname":"/enciclopedia","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;object-fit:var(--fit);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"h1{color:purple;font-size:4rem}.skill{color:var(--skillColor);font-weight:var(--fontWeight);text-transform:var(--textCase)}\nfooter[data-astro-cid-sz7xmlte]{display:flex;gap:1rem;margin-top:2rem}html{background-color:#f1f5f9;font-family:sans-serif}body{margin:0 auto;width:100%;max-width:70%;padding:1rem;line-height:1.5}*{box-sizing:border-box}h1{margin:1rem 0;font-size:2.5rem}.hamburger{padding-right:20px;cursor:pointer}.hamburger .line{display:block;width:40px;height:5px;margin-bottom:10px;background-color:#ff9776}.nav-links{width:100%;top:5rem;left:48px;background-color:#ff9776;display:none;margin:0}.nav-links a{display:block;text-align:center;padding:10px 0;text-decoration:none;font-size:1.2rem;font-weight:700;text-transform:uppercase}.nav-links a:hover,.nav-links a:focus{background-color:#ff9776}.expanded{display:unset}@media screen and (min-width: 636px){.nav-links{margin-left:5em;display:block;position:static;width:auto;background:none}.nav-links a{display:inline-block;padding:15px 20px}.hamburger{display:none}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"footer[data-astro-cid-sz7xmlte]{display:flex;gap:1rem;margin-top:2rem}html{background-color:#f1f5f9;font-family:sans-serif}body{margin:0 auto;width:100%;max-width:70%;padding:1rem;line-height:1.5}*{box-sizing:border-box}h1{margin:1rem 0;font-size:2.5rem}.hamburger{padding-right:20px;cursor:pointer}.hamburger .line{display:block;width:40px;height:5px;margin-bottom:10px;background-color:#ff9776}.nav-links{width:100%;top:5rem;left:48px;background-color:#ff9776;display:none;margin:0}.nav-links a{display:block;text-align:center;padding:10px 0;text-decoration:none;font-size:1.2rem;font-weight:700;text-transform:uppercase}.nav-links a:hover,.nav-links a:focus{background-color:#ff9776}.expanded{display:unset}@media screen and (min-width: 636px){.nav-links{margin-left:5em;display:block;position:static;width:auto;background:none}.nav-links a{display:inline-block;padding:15px 20px}.hamburger{display:none}}\n"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"footer[data-astro-cid-sz7xmlte]{display:flex;gap:1rem;margin-top:2rem}html{background-color:#f1f5f9;font-family:sans-serif}body{margin:0 auto;width:100%;max-width:70%;padding:1rem;line-height:1.5}*{box-sizing:border-box}h1{margin:1rem 0;font-size:2.5rem}.hamburger{padding-right:20px;cursor:pointer}.hamburger .line{display:block;width:40px;height:5px;margin-bottom:10px;background-color:#ff9776}.nav-links{width:100%;top:5rem;left:48px;background-color:#ff9776;display:none;margin:0}.nav-links a{display:block;text-align:center;padding:10px 0;text-decoration:none;font-size:1.2rem;font-weight:700;text-transform:uppercase}.nav-links a:hover,.nav-links a:focus{background-color:#ff9776}.expanded{display:unset}@media screen and (min-width: 636px){.nav-links{margin-left:5em;display:block;position:static;width:auto;background:none}.nav-links a{display:inline-block;padding:15px 20px}.hamburger{display:none}}\n"}],"routeData":{"route":"/posts/post-1","isIndex":false,"type":"page","pattern":"^\\/posts\\/post-1\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-1.md","pathname":"/posts/post-1","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"footer[data-astro-cid-sz7xmlte]{display:flex;gap:1rem;margin-top:2rem}html{background-color:#f1f5f9;font-family:sans-serif}body{margin:0 auto;width:100%;max-width:70%;padding:1rem;line-height:1.5}*{box-sizing:border-box}h1{margin:1rem 0;font-size:2.5rem}.hamburger{padding-right:20px;cursor:pointer}.hamburger .line{display:block;width:40px;height:5px;margin-bottom:10px;background-color:#ff9776}.nav-links{width:100%;top:5rem;left:48px;background-color:#ff9776;display:none;margin:0}.nav-links a{display:block;text-align:center;padding:10px 0;text-decoration:none;font-size:1.2rem;font-weight:700;text-transform:uppercase}.nav-links a:hover,.nav-links a:focus{background-color:#ff9776}.expanded{display:unset}@media screen and (min-width: 636px){.nav-links{margin-left:5em;display:block;position:static;width:auto;background:none}.nav-links a{display:inline-block;padding:15px 20px}.hamburger{display:none}}\n"}],"routeData":{"route":"/posts/post-2","isIndex":false,"type":"page","pattern":"^\\/posts\\/post-2\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-2.md","pathname":"/posts/post-2","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"footer[data-astro-cid-sz7xmlte]{display:flex;gap:1rem;margin-top:2rem}html{background-color:#f1f5f9;font-family:sans-serif}body{margin:0 auto;width:100%;max-width:70%;padding:1rem;line-height:1.5}*{box-sizing:border-box}h1{margin:1rem 0;font-size:2.5rem}.hamburger{padding-right:20px;cursor:pointer}.hamburger .line{display:block;width:40px;height:5px;margin-bottom:10px;background-color:#ff9776}.nav-links{width:100%;top:5rem;left:48px;background-color:#ff9776;display:none;margin:0}.nav-links a{display:block;text-align:center;padding:10px 0;text-decoration:none;font-size:1.2rem;font-weight:700;text-transform:uppercase}.nav-links a:hover,.nav-links a:focus{background-color:#ff9776}.expanded{display:unset}@media screen and (min-width: 636px){.nav-links{margin-left:5em;display:block;position:static;width:auto;background:none}.nav-links a{display:inline-block;padding:15px 20px}.hamburger{display:none}}\n"}],"routeData":{"route":"/posts/post-3","isIndex":false,"type":"page","pattern":"^\\/posts\\/post-3\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-3.md","pathname":"/posts/post-3","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"footer[data-astro-cid-sz7xmlte]{display:flex;gap:1rem;margin-top:2rem}html{background-color:#f1f5f9;font-family:sans-serif}body{margin:0 auto;width:100%;max-width:70%;padding:1rem;line-height:1.5}*{box-sizing:border-box}h1{margin:1rem 0;font-size:2.5rem}.hamburger{padding-right:20px;cursor:pointer}.hamburger .line{display:block;width:40px;height:5px;margin-bottom:10px;background-color:#ff9776}.nav-links{width:100%;top:5rem;left:48px;background-color:#ff9776;display:none;margin:0}.nav-links a{display:block;text-align:center;padding:10px 0;text-decoration:none;font-size:1.2rem;font-weight:700;text-transform:uppercase}.nav-links a:hover,.nav-links a:focus{background-color:#ff9776}.expanded{display:unset}@media screen and (min-width: 636px){.nav-links{margin-left:5em;display:block;position:static;width:auto;background:none}.nav-links a{display:inline-block;padding:15px 20px}.hamburger{display:none}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/colorado/astro/cd astro/src/pages/posts/post-1.md",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/posts/post-2.md",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/posts/post-3.md",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/enciclopedia.astro",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/enciclopedia/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/colorado/astro/cd astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/enciclopedia/[slug]@_@astro":"pages/enciclopedia/_slug_.astro.mjs","\u0000@astro-page:src/pages/enciclopedia@_@astro":"pages/enciclopedia.astro.mjs","\u0000@astro-page:src/pages/posts/post-1@_@md":"pages/posts/post-1.astro.mjs","\u0000@astro-page:src/pages/posts/post-2@_@md":"pages/posts/post-2.astro.mjs","\u0000@astro-page:src/pages/posts/post-3@_@md":"pages/posts/post-3.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B85bI_Z8.mjs","/Users/colorado/astro/cd astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_3D151kva.mjs","/Users/colorado/astro/cd astro/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.U36sVhwW.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/colorado/astro/cd astro/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","document.querySelector(\".hamburger\").addEventListener(\"click\",()=>{document.querySelector(\".nav-links\").classList.toggle(\"expanded\")});"]],"assets":["/favicon.svg","/enciclopedia/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"+8GJ30to3vbRBh+8frqAYgXwzLMH+sQYYDNkzGYzhLY="});

export { manifest };
