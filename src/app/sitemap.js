import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Page from '@/models/Page';
import { canonicalUrl } from '@/lib/seo';

// Re-read the DB hourly so new cities/blogs and admin SEO edits go live without a rebuild.
export const revalidate = 3600;

const serviceSlugs = [
  'vastu-solution',
  'vastu-for-house',
  'vastu-for-office',
  'industrial-vastu',
  'numerology',
  'astrology',
  'vastu-for-land',
  'online-consultation'
];

// Only list URLs Google can actually index: not noindex, not a service slug
// (served by the service route instead), and self-canonical.
function isIndexable(doc) {
  if (!doc.slug || serviceSlugs.includes(doc.slug)) return false;
  if (/noindex/i.test(doc.metaRobots || '')) return false;
  const self = `https://svastusolution.com/${doc.slug}`;
  return canonicalUrl(doc.metaCanonical, `/${doc.slug}`) === self;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://svastusolution.com';
  const now = new Date();

  // Static Pages
  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/gallery',
    '/blog',
    '/contact-us',
    '/locations',
    '/privacy-policy',
    '/terms-of-service'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Service Pages
  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  let blogRoutes = [];
  let locationRoutes = [];

  try {
    await dbConnect();

    // All published blogs
    const blogs = await Blog.find({ isPublished: true }, { slug: 1, updatedAt: 1, metaRobots: 1, metaCanonical: 1 }).lean();
    blogRoutes = blogs.filter(isIndexable).map((blog) => ({
      url: `${baseUrl}/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // All city/location pages
    const pages = await Page.find({}, { slug: 1, updatedAt: 1, metaRobots: 1, metaCanonical: 1 }).lean();
    locationRoutes = pages.filter(isIndexable).map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...locationRoutes];
}
