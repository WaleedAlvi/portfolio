import { siteUrl } from '$lib/data/portfolio';

export const prerender = true;

export function GET() {
	const pages = [
		{
			url: siteUrl,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'monthly',
			priority: '1.0'
		}
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
