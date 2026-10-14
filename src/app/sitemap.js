import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Page from '@/models/Page';

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
    const blogs = await Blog.find({ isPublished: true }, { slug: 1, updatedAt: 1 }).lean();
    blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // All city/location pages
    const pages = await Page.find({}, { slug: 1, updatedAt: 1 }).lean();
    locationRoutes = pages.map((page) => ({
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
