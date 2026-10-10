import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import BlogPage from '@/legacy-pages/BlogPage';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'blog' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Blogs & Articles - S Vastu Solution',
        description: seo.description || 'Read insightful articles and tips on Vastu, Numerology, and Astrology.',
        alternates: { canonical: seo.canonical || 'https://svastusolution.com/blog' },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Blogs & Articles - S Vastu Solution',
    description: 'Read insightful articles and tips on Vastu, Numerology, and Astrology.',
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <BlogPage />
    </PublicLayout>
  );
}
