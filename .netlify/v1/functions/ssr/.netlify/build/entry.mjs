import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_RLopmE_6.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/enciclopedia/_slug_.astro.mjs');
const _page4 = () => import('./pages/enciclopedia.astro.mjs');
const _page5 = () => import('./pages/posts/post-1.astro.mjs');
const _page6 = () => import('./pages/posts/post-2.astro.mjs');
const _page7 = () => import('./pages/posts/post-3.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/blog.astro", _page2],
    ["src/pages/enciclopedia/[slug].astro", _page3],
    ["src/pages/enciclopedia.astro", _page4],
    ["src/pages/posts/post-1.md", _page5],
    ["src/pages/posts/post-2.md", _page6],
    ["src/pages/posts/post-3.md", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b2206971-7ec2-4a7d-8239-3a07f79fb328"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
