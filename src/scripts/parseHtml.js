import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

// Function to parse the HTML file
export async function parseHtml({ slug }) {
  const filePath = path.resolve(`./src/content/${slug}.html`);
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  const $ = cheerio.load(htmlContent);

  // Parse the sections
  const sections = $("section")
    .map((i, el) => $(el).html())
    .get();

  $("a").removeAttr("style");

  const title = $("title").text();
  const paragraphs = $("p")
    .map((i, el) => $(el).text())
    .get();
  const links = $("a")
    .map((i, el) => ({
      href: $(el).attr("href"),
      text: $(el).text(),
    }))
    .get();

  const baseUrl = $("base").attr("href");

  return { title, paragraphs, links, baseUrl, sections };
}
