import { readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../.prerender/prerender.js";
const schema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Meher Hair & Beauty",
  telephone: "+447903129511",
  email: "meherhairandbeauty@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "44 Fife Road",
    addressLocality: "Canning Town, London",
    postalCode: "E16 1QB",
    addressCountry: "GB",
  },
};
let metadata = "";
if (process.env.SITE_URL) {
  const url = new URL(process.env.SITE_URL);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("SITE_URL must be an HTTP(S) URL");
  url.search = "";
  url.hash = "";
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  const base = url.href;
  schema.url = base;
  schema.image = new URL("images/meher-logo.jpeg", base).href;
  const escape = (s) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  metadata = `<link rel="canonical" href="${escape(base)}"/><meta property="og:url" content="${escape(base)}"/><meta property="og:image" content="${escape(schema.image)}"/>`;
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(base)}</loc></url></urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`,
  );
}
metadata += `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`;
const html = await readFile("dist/index.html", "utf8");
await writeFile(
  "dist/index.html",
  html
    .replace('<div id="root">', '<div id="root" data-prerendered="true">')
    .replace("<!--app-html-->", render())
    .replace("<!--deployment-meta-->", metadata),
);
await rm(".prerender", { recursive: true, force: true });
console.log(
  "Homepage prerendered with visible content and BeautySalon structured data.",
);
