import fs from "node:fs";
import path from "node:path";

import { getStaticRoutes, SITE_URL } from "../src/site-routes.js";

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&qout;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function normalizeUrl(route) {
  if (route === '/') {
    return `${SITE_URL}/`
  }

  return `${SITE_URL}${route}`
}

function getPriority(route){
  if (route === '/'){
    return "1.0"
  }
  const parts = route.split('/').filter(Boolean);

  switch (parts.length) {
    case 2:
      return '0.9';
    case 3:
      return '0.8';
    default:
      return '0.7'
  }
}

const today = new Date().toISOString().slice(0, 10);

const routes = [...new Set(getStaticRoutes())];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = escapeXml(normalizeUrl(route))

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`

const outputPath = path.resolve('public/sitemap.xml')

fs.writeFileSync(outputPath, sitemap, 'utf8')

console.log(`Sitemap generated: ${outputPath}`)
console.log(`Total URLs: ${routes.length}`)