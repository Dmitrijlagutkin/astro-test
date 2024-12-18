import { e as createComponent, r as renderTemplate, m as maybeRenderHead, j as renderComponent, g as addAttribute, l as renderHead, k as renderSlot, n as renderScript, h as createAstro } from './astro/server_BCOoW3z2.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */

const $$Hamburger = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="hamburger"> <span class="line"></span> <span class="line"></span> <span class="line"></span> </div>`;
}, "/Users/colorado/astro/cd astro/src/components/Hamburger.astro", void 0);

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="nav-links"> <a href="/">Home</a> <a href="/blog">Blog</a> <a href="/enciclopedia">enciclopedia</a> </div>`;
}, "/Users/colorado/astro/cd astro/src/components/Navigation.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header> <nav> ${renderComponent($$result, "Hamburger", $$Hamburger, {})} ${renderComponent($$result, "Navigation", $$Navigation, {})} </nav> </header>`;
}, "/Users/colorado/astro/cd astro/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte>
FOOTER
</footer>`;
}, "/Users/colorado/astro/cd astro/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>title</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <!-- <h1>{pageTitle}</h1> --> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/Users/colorado/astro/cd astro/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/colorado/astro/cd astro/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
