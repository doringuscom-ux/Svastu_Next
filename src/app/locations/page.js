import dbConnect from '@/lib/db';
import { canonicalUrl } from '@/lib/seo';
import Seo from '@/models/Seo';
import Page from '@/models/Page';
import PublicLayout from '@/components/PublicLayout';
import LocationsPage from '@/legacy-pages/LocationsPage';
import { keepStaleOnError } from '@/lib/isr';

// Re-read the DB hourly so new cities/blogs and admin SEO edits go live without a rebuild.
export const revalidate = 3600;

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'locations' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Locations We Serve - S Vastu Solution',
        description: seo.description || 'Explore our Vastu consulting locations across India and globally.',
        alternates: { canonical: canonicalUrl(seo.canonical, '/locations') },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {
    keepStaleOnError(e);
  }
  return {
    title: 'Locations We Serve - S Vastu Solution',
    description: 'Explore our Vastu consulting locations across India and globally.',
    alternates: { canonical: 'https://svastusolution.com/locations' },
  };
}

export default async function LocationsRoute() {
  let initialLocations = null;
  try {
    await dbConnect();
    const pages = await Page.find({}).sort({ createdAt: -1 }).lean();
    initialLocations = JSON.parse(JSON.stringify(pages));
  } catch (e) {
    keepStaleOnError(e);
  }

  return (
    <PublicLayout>
      <LocationsPage initialLocations={initialLocations} />
    </PublicLayout>
  );
}
