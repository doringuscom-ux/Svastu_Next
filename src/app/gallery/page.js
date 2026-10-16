import dbConnect from '@/lib/db';
import { canonicalUrl } from '@/lib/seo';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import GalleryPage from '@/legacy-pages/GalleryPage';

// Re-read the DB hourly so new cities/blogs and admin SEO edits go live without a rebuild.
export const revalidate = 3600;

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'gallery' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Gallery - S Vastu Solution',
        description: seo.description || 'Explore our gallery of vastu consultations and remedies.',
        alternates: { canonical: canonicalUrl(seo.canonical, '/gallery') },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Gallery - S Vastu Solution',
    description: 'Explore our gallery of vastu consultations and remedies.',
    alternates: { canonical: 'https://svastusolution.com/gallery' },
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <GalleryPage />
    </PublicLayout>
  );
}
