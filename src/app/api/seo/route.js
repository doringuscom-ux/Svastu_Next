import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import Page from '@/models/Page';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get('pageName');
    const path = searchParams.get('path');

    if (pageName) {
      const seo = await Seo.findOne({ pageName }).lean();
      return NextResponse.json(seo || {});
    }

    if (path) {
      const parts = path.split('/').filter(Boolean);
      let seoResponse = {};

      if (parts.length === 0) {
        const data = await Seo.findOne({ pageName: 'home' }).lean();
        if (data) seoResponse = data;
      } else if (['about-us', 'services', 'gallery', 'contact-us', 'blog', 'locations'].includes(parts[0]) && parts.length === 1) {
        const pageMap = {
          'about-us': 'about',
          'services': 'services',
          'gallery': 'gallery',
          'contact-us': 'contact',
          'blog': 'blog',
          'locations': 'locations'
        };
        const data = await Seo.findOne({ pageName: pageMap[parts[0]] }).lean();
        if (data) seoResponse = data;
      } else if (parts[0] === 'blog' && parts.length === 2) {
        const blogData = await Blog.findOne({ slug: parts[1] }).lean();
        if (blogData) {
          seoResponse = {
            title: blogData.metaTitle || blogData.title,
            description: blogData.metaDescription || '',
            keywords: blogData.metaKeywords || '',
            canonical: blogData.metaCanonical || `https://svastusolution.com/${parts[1]}`,
            robots: blogData.metaRobots || '',
            ogImage: blogData.coverImage || ''
          };
        }
      } else if (parts.length === 1) {
        const pageData = await Page.findOne({ slug: parts[0] }).lean();
        if (pageData) {
          seoResponse = {
            title: pageData.metaTitle,
            description: pageData.metaDescription,
            keywords: pageData.metaKeywords,
            canonical: pageData.metaCanonical,
            robots: pageData.metaRobots
          };
        }
      }
      return NextResponse.json(seoResponse);
    }

    const allSeo = await Seo.find({}).lean();
    return NextResponse.json(allSeo);
  } catch (error) {
    console.error('API /seo error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
