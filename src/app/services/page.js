import dbConnect from '@/lib/db';
import { canonicalUrl } from '@/lib/seo';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import ServicesPage from '@/legacy-pages/ServicesPage';
import { keepStaleOnError } from '@/lib/isr';

// Re-read the DB hourly so new cities/blogs and admin SEO edits go live without a rebuild.
export const revalidate = 3600;

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'services' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Our Services - S Vastu Solution',
        description: seo.description || 'Comprehensive Vastu and Astrology services tailored for your home and business.',
        alternates: { canonical: canonicalUrl(seo.canonical, '/services') },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {
    keepStaleOnError(e);
  }
  return {
    title: 'Our Services - S Vastu Solution',
    description: 'Comprehensive Vastu and Astrology services tailored for your home and business.',
    alternates: { canonical: 'https://svastusolution.com/services' },
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <ServicesPage />
    </PublicLayout>
  );
}
