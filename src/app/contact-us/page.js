import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import PublicLayout from '@/components/PublicLayout';
import ContactPage from '@/legacy-pages/ContactPage';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'contact' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Contact Us - S Vastu Solution',
        description: seo.description || 'Get in touch with S Vastu Solution for expert consultation.',
        alternates: { canonical: seo.canonical || 'https://svastusolution.com/contact-us' },
        robots: seo.robots || 'index, follow',
      };
    }
  } catch (e) {}
  return {
    title: 'Contact Us - S Vastu Solution',
    description: 'Get in touch with S Vastu Solution for expert consultation.',
  };
}

export default function Page() {
  return (
    <PublicLayout>
      <ContactPage />
    </PublicLayout>
  );
}
