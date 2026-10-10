import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Page from '@/models/Page';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap() {
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

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogEntries = blogs.map((blog) => ({
    url: `${baseUrl}/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const pageEntries = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticEntries, ...blogEntries, ...pageEntries];
}
