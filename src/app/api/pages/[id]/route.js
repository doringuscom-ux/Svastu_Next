import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { verifyAdmin } from '@/lib/auth';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';
import { revalidateSite } from '@/lib/isr';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    let page;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      page = await Page.findById(id).lean();
    } else {
      page = await Page.findOne({ slug: id }).lean();
    }

    if (!page) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('API /pages/[id] GET error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    let page;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      page = await Page.findById(id);
    } else {
      page = await Page.findOne({ slug: id });
    }

    if (!page) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    if (admin.role === 'subadmin' && page.createdBy && page.createdBy.toString() !== admin._id.toString()) {
      return NextResponse.json({ message: 'Not authorized to edit this page' }, { status: 403 });
    }

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      // JSON body (from SEO Manager)
      const body = await request.json();
      const { title, slug, country, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText } = body;

      if (title !== undefined) page.title = title;
      if (slug !== undefined) page.slug = slug;
      if (country !== undefined) page.country = country;
      if (metaTitle !== undefined) page.metaTitle = metaTitle;
      if (metaDescription !== undefined) page.metaDescription = metaDescription;
      if (metaKeywords !== undefined) page.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) page.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) page.metaRobots = metaRobots;
      if (customText !== undefined) page.customText = customText;
    } else {
      // FormData body (from City Pages editor)
      const formData = await request.formData();

      const title = formData.get('title');
      const slug = formData.get('slug');
      const country = formData.get('country');
      const metaTitle = formData.get('metaTitle');
      const metaDescription = formData.get('metaDescription');
      const metaKeywords = formData.get('metaKeywords');
      const metaCanonical = formData.get('metaCanonical');
      const metaRobots = formData.get('metaRobots');
      const customText = formData.get('customText');

      if (title) page.title = title;
      if (slug) page.slug = slug;
      if (country !== null) page.country = country;
      if (metaTitle !== null) page.metaTitle = metaTitle;
      if (metaDescription !== null) page.metaDescription = metaDescription;
      if (metaKeywords !== null) page.metaKeywords = metaKeywords;
      if (metaCanonical !== null) page.metaCanonical = metaCanonical;
      if (metaRobots !== null) page.metaRobots = metaRobots;
      if (customText !== null) page.customText = customText;

      // Handle sections
      for (let i = 1; i <= 6; i++) {
        const secKey = `section${i}`;
        const secRaw = formData.get(secKey);
        if (secRaw) {
          try {
            page[secKey] = JSON.parse(secRaw);
          } catch (e) {
            // ignore
          }
        }

        const imgFile = formData.get(`${secKey}Image`);
        if (imgFile && typeof imgFile !== 'string' && imgFile.size > 0) {
          const bytes = await imgFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const uploadRes = await uploadBufferToCloudinary(buffer, 'svastu/cities');
          if (uploadRes) {
            if (!page[secKey]) page[secKey] = {};
            page[secKey].image = uploadRes.secure_url || uploadRes.url;
          }
        }
      }
    }

    const updatedPage = await page.save();
    revalidateSite();
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error('API /pages/[id] PUT error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    let page;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      page = await Page.findById(id);
    } else {
      page = await Page.findOne({ slug: id });
    }

    if (!page) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    if (admin.role === 'subadmin' && page.createdBy && page.createdBy.toString() !== admin._id.toString()) {
      return NextResponse.json({ message: 'Not authorized to delete this page' }, { status: 403 });
    }

    await page.deleteOne();
    revalidateSite();
    return NextResponse.json({ message: 'Page removed' });
  } catch (error) {
    console.error('API /pages/[id] DELETE error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
