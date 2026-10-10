import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Page from '@/models/Page';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://svastusolution.com';

  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/gallery',
    '/blog',
    '/contact-us',
    '/locations',
    '/privacy-policy',
    '/terms-of-service',
    '/vastu-solution',
    '/vastu-for-house',
    '/vastu-for-office',
    '/industrial-vastu',
    '/numerology',
    '/astrology',
    '/vastu-for-land',
    '/online-consultation'
  ];

  let blogs = [];
  let pages = [];

  try {
    await dbConnect();
    blogs = await Blog.find({ isPublished: true }).select('slug updatedAt').lean();
    pages = await Page.find({}).select('slug updatedAt').lean();
  } catch (err) {
    console.error('Sitemap error:', err);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <changefreq>daily</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
  ${blogs
    .map(
      (blog) => `
    <url>
      <loc>${baseUrl}/${blog.slug}</loc>
      <lastmod>${new Date(blog.updatedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.85</priority>
    </url>`
    )
    .join('')}
  ${pages
    .map(
      (p) => `
    <url>
      <loc>${baseUrl}/${p.slug}</loc>
      <lastmod>${new Date(p.updatedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.90</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
