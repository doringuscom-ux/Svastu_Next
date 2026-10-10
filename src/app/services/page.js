import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import ServicesPage from '@/legacy-pages/ServicesPage';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'services' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Our Services - S Vastu Solution',
        description: seo.description || 'Comprehensive Vastu and Astrology services tailored for your home and business.',
        alternates: { canonical: seo.canonical || 'https://svastusolution.com/services' },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Our Services - S Vastu Solution',
    description: 'Comprehensive Vastu and Astrology services tailored for your home and business.',
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <ServicesPage />
    </PublicLayout>
  );
}
