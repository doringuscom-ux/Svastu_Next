import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import LocationsPage from '@/legacy-pages/LocationsPage';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'locations' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Locations We Serve - S Vastu Solution',
        description: seo.description || 'Explore our Vastu consulting locations across India and globally.',
        alternates: { canonical: seo.canonical || 'https://svastusolution.com/locations' },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Locations We Serve - S Vastu Solution',
    description: 'Explore our Vastu consulting locations across India and globally.',
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <LocationsPage />
    </PublicLayout>
  );
}
