import dbConnect from '@/lib/db';
import { canonicalUrl } from '@/lib/seo';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import AboutPage from '@/legacy-pages/AboutPage';

// Re-read the DB hourly so new cities/blogs and admin SEO edits go live without a rebuild.
export const revalidate = 3600;

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'about' }).lean();
    if (seo) {
      return {
        title: seo.title || 'About Us - S Vastu Solution',
        description: seo.description || 'Learn about S Vastu Solution, our mission, vision and founders.',
        alternates: { canonical: canonicalUrl(seo.canonical, '/about-us') },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'About Us - S Vastu Solution',
    description: 'Learn about S Vastu Solution, our mission, vision and founders.',
    alternates: { canonical: 'https://svastusolution.com/about-us' },
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <AboutPage />
    </PublicLayout>
  );
}
