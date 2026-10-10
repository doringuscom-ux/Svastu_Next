export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Page from '@/models/Page';
import PublicLayout from '@/components/PublicLayout';
import { ParamsProvider } from '@/components/RouterShim';
import SingleBlogPage from '@/legacy-pages/SingleBlogPage';
import SingleServicePage from '@/legacy-pages/SingleServicePage';
import CityPage from '@/legacy-pages/CityPage';
import NotFoundPage from '@/legacy-pages/NotFoundPage';

const serviceSlugs = [
  'vastu-solution',
  'vastu-for-house',
  'vastu-for-office',
  'industrial-vastu',
  'numerology',
  'astrology',
  'vastu-for-land',
  'online-consultation'
];

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (serviceSlugs.includes(slug)) {
    const titles = {
      'vastu-solution': 'Vastu Solution - S Vastu Solution',
      'vastu-for-house': 'Residential Vastu Services - S Vastu Solution',
      'vastu-for-office': 'Commercial Vastu Services - S Vastu Solution',
      'industrial-vastu': 'Industrial Vastu Services - S Vastu Solution',
      'numerology': 'Numerology Consultation - S Vastu Solution',
      'astrology': 'Astrology Consultation - S Vastu Solution',
      'vastu-for-land': 'Vastu for Land & Plots - S Vastu Solution',
      'online-consultation': 'Online Vastu Consultation - S Vastu Solution'
    };
    return {
      title: titles[slug] || 'Services - S Vastu Solution',
      alternates: { canonical: `https://svastusolution.com/${slug}` },
      robots: 'index, follow',
    };
  }

  try {
    await dbConnect();
    // 1. Check Blog
    const blog = await Blog.findOne({ slug }).lean();
    if (blog) {
      return {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt || '',
        keywords: blog.metaKeywords || '',
        alternates: { canonical: blog.metaCanonical || `https://svastusolution.com/${slug}` },
        robots: blog.metaRobots || 'index, follow',
        openGraph: {
          title: blog.metaTitle || blog.title,
          description: blog.metaDescription || blog.excerpt || '',
          url: `https://svastusolution.com/${slug}`,
          images: blog.coverImage ? [{ url: blog.coverImage }] : [],
          type: 'article',
        },
      };
    }

    // 2. Check City / Page
    const page = await Page.findOne({ slug }).lean();
    if (page) {
      const formattedCity = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      return {
        title: page.metaTitle || `Vastu Consultant in ${formattedCity} | S-Vastu Solution`,
        description: page.metaDescription || `Best Vastu Consultant in ${formattedCity}. Expert consultation for residential and commercial spaces.`,
        keywords: page.metaKeywords || '',
        alternates: { canonical: page.metaCanonical || `https://svastusolution.com/${slug}` },
        robots: page.metaRobots || 'index, follow',
      };
    }
  } catch (e) {
    console.error('Metadata generation error:', e);
  }

  return {
    title: 'S Vastu Solution - Expert Vastu Consultant',
    description: 'Expert Vastu, Numerology, and Astrology consultations.',
  };
}

export default async function DynamicSlugPage({ params }) {
  const { slug } = await params;

  // 1. Service route
  if (serviceSlugs.includes(slug)) {
    return (
      <PublicLayout>
        <ParamsProvider params={{ slug }}>
          <SingleServicePage />
        </ParamsProvider>
      </PublicLayout>
    );
  }

  // 2. Blog route
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();
  if (blog) {
    // Fetch recent blogs on server for sidebar
    const recentBlogs = await Blog.find({ isPublished: true, slug: { $ne: slug } })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const blogData = JSON.parse(JSON.stringify(blog));
    const allBlogsData = JSON.parse(JSON.stringify([blog, ...recentBlogs]));

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.metaDescription || blog.excerpt || '',
      image: blog.coverImage ? [blog.coverImage] : ['https://svastusolution.com/assets/S.Vastu-logo.webp'],
      datePublished: blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
      dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: blog.author || 'S-Vastu Solution'
      },
      publisher: {
        '@type': 'Organization',
        name: 'S-Vastu Solution',
        logo: {
          '@type': 'ImageObject',
          url: 'https://svastusolution.com/assets/S.Vastu-logo.webp'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://svastusolution.com/${slug}`
      }
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://svastusolution.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://svastusolution.com/blog'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: blog.title,
          item: `https://svastusolution.com/${slug}`
        }
      ]
    };

    return (
      <PublicLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <ParamsProvider params={{ slug }}>
          <SingleBlogPage initialBlog={blogData} initialAllBlogs={allBlogsData} />
        </ParamsProvider>
      </PublicLayout>
    );
  }

  // 3. City / Location route
  const page = await Page.findOne({ slug }).lean();
  if (page) {
    const formattedCity = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const pageData = JSON.parse(JSON.stringify(page));

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `S-Vastu Solution - ${formattedCity}`,
      description: page.metaDescription || `Professional Vastu and Numerology Consultation in ${formattedCity}`,
      url: `https://svastusolution.com/${slug}`,
      telephone: '+919817755699',
      priceRange: '₹₹',
      image: 'https://svastusolution.com/assets/S.Vastu-logo.webp',
      address: {
        '@type': 'PostalAddress',
        addressLocality: formattedCity,
        addressCountry: page.country || 'IN'
      }
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://svastusolution.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Locations',
          item: 'https://svastusolution.com/locations'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: formattedCity,
          item: `https://svastusolution.com/${slug}`
        }
      ]
    };

    return (
      <PublicLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <ParamsProvider params={{ city: slug, slug }}>
          <CityPage initialPageData={pageData} />
        </ParamsProvider>
      </PublicLayout>
    );
  }

  // 4. Not Found
  return (
    <PublicLayout>
      <NotFoundPage />
    </PublicLayout>
  );
}
