import { e as createComponent, i as defineStyleVars, r as renderTemplate, j as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BCOoW3z2.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BAh5torJ.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const pageTitle = "About Me";
  const identity = {
    firstName: "Sarah",
    country: "Canada",
    occupation: "Technical Writer",
    hobbies: ["photography", "birdwatching", "baseball"]
  };
  const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
  const finished = false;
  const skillColor = "navy";
  const fontWeight = "bold";
  const textCase = "uppercase";
  const $$definedVars = defineStyleVars([{ skillColor, fontWeight, textCase }]);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2${addAttribute($$definedVars, "style")}>... and my new Astro site!</h2> <p${addAttribute($$definedVars, "style")}>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p> <p${addAttribute($$definedVars, "style")}>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p> <p${addAttribute($$definedVars, "style")}>Here are a few facts about me:</p> <ul${addAttribute($$definedVars, "style")}> <li${addAttribute($$definedVars, "style")}>My name is ${identity.firstName}.</li> <li${addAttribute($$definedVars, "style")}>I live in ${identity.country} and I work as a ${identity.occupation}.</li> ${identity.hobbies.length >= 2 && renderTemplate`<li${addAttribute($$definedVars, "style")}>Two of my hobbies are: ${identity.hobbies[0]} and ${identity.hobbies[1]}</li>`} </ul> <p${addAttribute($$definedVars, "style")}>My skills are:</p> <ul${addAttribute($$definedVars, "style")}> ${skills.map((skill) => renderTemplate`<li class="skill"${addAttribute($$definedVars, "style")}>${skill}</li>`)} </ul> ${renderTemplate`<p${addAttribute($$definedVars, "style")}>I am happy to be learning Astro!</p>`}${finished}${renderTemplate`<p${addAttribute($$definedVars, "style")}>My goal is to finish in 3 days.</p>` } ` })}`;
}, "/Users/colorado/astro/cd astro/src/pages/about.astro", void 0);

const $$file = "/Users/colorado/astro/cd astro/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
