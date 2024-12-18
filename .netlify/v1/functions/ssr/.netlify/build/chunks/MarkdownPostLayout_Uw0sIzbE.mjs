import { e as createComponent, r as renderTemplate, j as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute, k as renderSlot } from './astro/server_BCOoW3z2.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from './BaseLayout_BAh5torJ.mjs';

const $$Astro = createAstro();
const $$MarkdownPostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MarkdownPostLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": frontmatter.pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>${frontmatter.title}</h1> <p>${frontmatter.pubDate.toString().slice(0, 10)}</p> <p><em>${frontmatter.description}</em></p> <p>Written by: ${frontmatter.author}</p> <img${addAttribute(frontmatter.image.url, "src")} width="300"${addAttribute(frontmatter.image.alt, "alt")}> ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/Users/colorado/astro/cd astro/src/layouts/MarkdownPostLayout.astro", void 0);

export { $$MarkdownPostLayout as $ };
