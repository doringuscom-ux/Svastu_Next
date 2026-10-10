import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import GalleryPage from '@/legacy-pages/GalleryPage';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'gallery' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Gallery - S Vastu Solution',
        description: seo.description || 'Explore our gallery of vastu consultations and remedies.',
        alternates: { canonical: seo.canonical || 'https://svastusolution.com/gallery' },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Gallery - S Vastu Solution',
    description: 'Explore our gallery of vastu consultations and remedies.',
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <GalleryPage />
    </PublicLayout>
  );
}
