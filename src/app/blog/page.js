import dbConnect from '@/lib/db';
import { canonicalUrl } from '@/lib/seo';
import Seo from '@/models/Seo';
import Blog from '@/models/Blog';
import PublicLayout from '@/components/PublicLayout';
import BlogPage from '@/legacy-pages/BlogPage';

// Render per request: an hourly cache could freeze an empty list (DB hiccup at build/revalidate)
// and hide newly published blogs.
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'blog' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Blogs & Articles - S Vastu Solution',
        description: seo.description || 'Read insightful articles and tips on Vastu, Numerology, and Astrology.',
        alternates: { canonical: canonicalUrl(seo.canonical, '/blog') },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Blogs & Articles - S Vastu Solution',
    description: 'Read insightful articles and tips on Vastu, Numerology, and Astrology.',
    alternates: { canonical: 'https://svastusolution.com/blog' },
  };
}

export default async function Page() {
  let initialPosts = null;
  try {
    await dbConnect();
    const blogs = await Blog.find({ isPublished: true }).select('-content').sort({ createdAt: -1 }).lean();
    // An empty result is passed as null so the client retries via the API.
    initialPosts = blogs.length > 0 ? JSON.parse(JSON.stringify(blogs)) : null;
  } catch (e) {
    // client falls back to fetching
  }

  return (
    <PublicLayout>
      <BlogPage initialPosts={initialPosts} />
    </PublicLayout>
  );
}
