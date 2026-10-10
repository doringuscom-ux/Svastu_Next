import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import Blog from '@/models/Blog';
import PublicLayout from '@/components/PublicLayout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CoreValues from '@/components/CoreValues';
import Process from '@/components/Process';
import Founders from '@/components/Founders';
import Services from '@/components/Services';
import AirflowVastuChakra from '@/components/AirflowVastuChakra';
import VastuChakra from '@/components/VastuChakra';
import Gallery from '@/components/Gallery';
import InstagramFeed from '@/components/InstagramFeed';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/Blog';
import Contact from '@/components/Contact';

export async function generateMetadata() {
  try {
    await dbConnect();
    const seo = await Seo.findOne({ pageName: 'home' }).lean();
    if (seo) {
      return {
        title: seo.title || 'S Vastu Solution - Expert Vastu Consultant',
        description: seo.description || 'Trusted Vastu Consultant in Zirakpur, Chandigarh. Expert in Residential, Commercial, and Industrial Vastu.',
        keywords: seo.keywords || 'Vastu Consultant, S Vastu Solution, Chandigarh, Zirakpur',
        alternates: {
          canonical: seo.canonical || 'https://svastusolution.com',
        },
        robots: seo.robots || 'index, follow',
        openGraph: {
          title: seo.title,
          description: seo.description,
          url: 'https://svastusolution.com',
          images: seo.ogImage ? [{ url: seo.ogImage }] : [],
        },
      };
    }
  } catch (e) {
    // fallback
  }

  return {
    title: 'S Vastu Solution - Expert Vastu Consultant',
    description: 'Trusted Vastu Consultant in Zirakpur, Chandigarh. Expert in Residential, Commercial, and Industrial Vastu.',
  };
}

export default async function HomePage() {
  let initialBlogs = [];
  try {
    await dbConnect();
    initialBlogs = await Blog.find({ isPublished: true })
      .select('title slug excerpt coverImage createdAt')
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
  } catch (e) {
    // fallback
  }

  return (
    <PublicLayout>
      <Hero />
      <About />
      <CoreValues />
      <Process />
      <Founders />
      <Services />
      <AirflowVastuChakra />
      <VastuChakra />
      <Gallery limit={6} />
      <InstagramFeed />
      <Testimonials />
      <BlogSection limit={3} />
      <Contact />

      {/* Hidden pre-rendered SSR blog links to ensure 100% crawlability for Googlebot */}
      {initialBlogs.length > 0 && (
        <section className="sr-only" aria-hidden="true">
          <h2>Latest Vastu Insights & Articles</h2>
          <ul>
            {initialBlogs.map((b) => (
              <li key={b._id.toString()}>
                <a href={`/${b.slug}`}>{b.title}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PublicLayout>
  );
}
