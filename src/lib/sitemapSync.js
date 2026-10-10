import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Page from '@/models/Page';

export async function syncSitemapFile() {
  try {
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

    await dbConnect();
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt').lean();
    const pages = await Page.find({}).select('slug updatedAt').lean();

    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${blogs.map(b => `  <url>
    <loc>${baseUrl}/${b.slug}</loc>
    <lastmod>${new Date(b.updatedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}
${pages.map(p => `  <url>
    <loc>${baseUrl}/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(filePath, xml, 'utf8');
    console.log('Sitemap successfully synchronized to public/sitemap.xml');
  } catch (err) {
    console.error('Error synchronizing sitemap:', err);
  }
}
