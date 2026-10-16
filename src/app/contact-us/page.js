import dbConnect from '@/lib/db';
import { canonicalUrl } from '@/lib/seo';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import ContactPage from '@/legacy-pages/ContactPage';

// Re-read the DB hourly so new cities/blogs and admin SEO edits go live without a rebuild.
export const revalidate = 3600;

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'contact' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Contact Us - S Vastu Solution',
        description: seo.description || 'Get in touch with S Vastu Solution for expert consultation.',
        alternates: { canonical: canonicalUrl(seo.canonical, '/contact-us') },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Contact Us - S Vastu Solution',
    description: 'Get in touch with S Vastu Solution for expert consultation.',
    alternates: { canonical: 'https://svastusolution.com/contact-us' },
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <ContactPage />
    </PublicLayout>
  );
}
