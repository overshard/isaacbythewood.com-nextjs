const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { marked } = require("marked");
const matter = require("gray-matter");

const RESUME_DIR = __dirname;
const CONTENT_PATH = path.join(RESUME_DIR, "content.md");
const TEMPLATE_PATH = path.join(RESUME_DIR, "template.html");
const OUTPUT_PATH = path.join(
  RESUME_DIR,
  "..",
  "public",
  "static",
  "pdfs",
  "resume-isaac-bythewood.pdf"
);

function renderMarkdownBody(markdown) {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    if (depth === 2) {
      const note = text.includes("Experience") || text.includes("Projects")
        ? ' <span class="section-note">— See LinkedIn for more</span>'
        : "";
      return `<h2>${text}${note}</h2>`;
    }
    if (depth === 3) {
      return `<h3>${text}</h3>`;
    }
    return `<h${depth}>${text}</h${depth}>`;
  };

  renderer.paragraph = function ({ tokens }) {
    const text = this.parser.parseInline(tokens);
    if (
      text.match(
        /^[A-Z].*\u2014\s*(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)/i
      )
    ) {
      return `<div class="meta">${text}</div>`;
    }
    return `<p>${text}</p>`;
  };

  marked.setOptions({ renderer });

  // Parse markdown, then wrap each h3 + meta + ul group in an entry div
  let html = marked.parse(markdown);
  html = html.replace(
    /(<h3>[\s\S]*?)(?=<h3>|<h2>|$)/g,
    '<div class="entry">$1</div>'
  );
  return html;
}

function buildHtml(frontmatter, body) {
  let template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  const markdownHtml = renderMarkdownBody(body);

  const linksHtml = frontmatter.links
    .map((l) => `<a href="${l.url}">${l.label}</a>`)
    .join("\n");

  const skillsHtml = frontmatter.skills
    .map((s) => `<li>${s}</li>`)
    .join("\n");

  const techHtml = frontmatter.technologies
    .map((t) => `<li>${t}</li>`)
    .join("\n");

  const eduHtml = frontmatter.education
    .map(
      (e) =>
        `<div class="education-entry"><span class="school">${e.institution},</span> ${e.years}<br>${e.degree}</div>`
    )
    .join("\n");

  template = template
    .replace(/\{\{name\}\}/g, frontmatter.name)
    .replace(/\{\{title\}\}/g, frontmatter.title)
    .replace(/\{\{summary\}\}/g, frontmatter.summary)
    .replace(/\{\{location\}\}/g, frontmatter.location)
    .replace(/\{\{phone\}\}/g, frontmatter.phone)
    .replace(/\{\{email\}\}/g, frontmatter.email)
    .replace(/\{\{links\}\}/g, linksHtml)
    .replace(/\{\{skills\}\}/g, skillsHtml)
    .replace(/\{\{technologies\}\}/g, techHtml)
    .replace(/\{\{education\}\}/g, eduHtml)
    .replace(/\{\{body\}\}/g, markdownHtml);

  return template;
}

async function generatePdf() {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  const { data: frontmatter, content: body } = matter(raw);
  const html = buildHtml(frontmatter, body);

  const launchOptions = {};

  // Use system Chromium if PLAYWRIGHT_CHROMIUM_PATH is set (e.g. in Alpine Docker)
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) {
    launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({
    viewport: { width: 816, height: 1056 },
  });
  await page.setContent(html, { waitUntil: "networkidle" });

  await page.pdf({
    path: OUTPUT_PATH,
    format: "Letter",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`Resume PDF generated: ${OUTPUT_PATH}`);
}

generatePdf().catch((err) => {
  console.error("Failed to generate resume:", err);
  process.exit(1);
});
