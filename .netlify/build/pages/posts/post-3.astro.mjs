import { e as createComponent, r as renderTemplate, j as renderComponent, u as unescapeHTML } from '../../chunks/astro/server_BCOoW3z2.mjs';
import 'kleur/colors';
import { $ as $$MarkdownPostLayout } from '../../chunks/MarkdownPostLayout_Uw0sIzbE.mjs';
export { renderers } from '../../renderers.mjs';

const html = () => "<p>It wasn’t always smooth sailing, but I’m enjoying building with Astro. And, the <a href=\"https://astro.build/chat\">Discord community</a> is really friendly and helpful!</p>";

				const frontmatter = {"layout":"../../layouts/MarkdownPostLayout.astro","title":"My Third Blog Post","author":"Astro Learner","description":"I had some challenges, but asking in the community really helped!","image":{"url":"https://docs.astro.build/assets/rays.webp","alt":"The Astro logo on a dark background with rainbow rays."},"pubDate":"2022-07-15T00:00:00.000Z","tags":["astro","learning in public","setbacks","community"],"pageTitle":"My Astro Learning Blog"};
				const file = "/Users/colorado/astro/cd astro/src/pages/posts/post-3.md";
				const url = "/posts/post-3";
				function rawContent() {
					return "   \n                                              \n                         \n                     \n                                                                                \n      \n                                                  \n                                                               \n                   \n                                                              \n                                   \n   \n\nIt wasn't always smooth sailing, but I'm enjoying building with Astro. And, the [Discord community](https://astro.build/chat) is really friendly and helpful!\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$MarkdownPostLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
