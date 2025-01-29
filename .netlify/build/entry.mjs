import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Bx7VXmmV.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/blog.astro.mjs');
const _page2 = () => import('./pages/posts/post-1.astro.mjs');
const _page3 = () => import('./pages/posts/post-2.astro.mjs');
const _page4 = () => import('./pages/posts/post-3.astro.mjs');
const _page5 = () => import('./pages/posts/post-4.astro.mjs');
const _page6 = () => import('./pages/posts/_slug_.astro.mjs');
const _page7 = () => import('./pages/rss.xml.astro.mjs');
const _page8 = () => import('./pages/tags/_tag_.astro.mjs');
const _page9 = () => import('./pages/tags.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/about.astro", _page0],
    ["src/pages/blog.astro", _page1],
    ["src/pages/posts/post-1.md", _page2],
    ["src/pages/posts/post-2.md", _page3],
    ["src/pages/posts/post-3.md", _page4],
    ["src/pages/posts/post-4.md", _page5],
    ["src/pages/posts/[slug].astro", _page6],
    ["src/pages/rss.xml.js", _page7],
    ["src/pages/tags/[tag].astro", _page8],
    ["src/pages/tags/index.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f4f4baf4-4b3e-45b2-a399-abc470d047fc"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
