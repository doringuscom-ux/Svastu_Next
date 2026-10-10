import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import AboutPage from '@/legacy-pages/AboutPage';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'about' }).lean();
    if (seo) {
      return {
        title: seo.title || 'About Us - S Vastu Solution',
        description: seo.description || 'Learn about S Vastu Solution, our mission, vision and founders.',
        alternates: { canonical: seo.canonical || 'https://svastusolution.com/about-us' },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'About Us - S Vastu Solution',
    description: 'Learn about S Vastu Solution, our mission, vision and founders.',
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <AboutPage />
    </PublicLayout>
  );
}
