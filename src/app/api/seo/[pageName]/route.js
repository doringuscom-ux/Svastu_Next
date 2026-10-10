import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import { verifyAdmin } from '@/lib/auth';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { pageName } = await params;
    const seo = await Seo.findOne({ pageName }).lean();
    return NextResponse.json(seo || {});
  } catch (error) {
    console.error('API /seo/[pageName] GET error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await dbConnect();
    const { pageName } = await params;

    const contentType = request.headers.get('content-type') || '';
    let title, description, keywords, scriptTags, canonical, robots, ogImage;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      title = formData.get('title');
      description = formData.get('description');
      keywords = formData.get('keywords');
      scriptTags = formData.get('scriptTags');
      canonical = formData.get('canonical');
      robots = formData.get('robots');
      ogImage = formData.get('ogImage') || '';

      const imageFile = formData.get('ogImageFile');
      if (imageFile && typeof imageFile !== 'string' && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadRes = await uploadBufferToCloudinary(buffer, 'svastu/seo');
        if (uploadRes) {
          ogImage = uploadRes.secure_url || uploadRes.url;
        }
      }
    } else {
      const body = await request.json();
      title = body.title;
      description = body.description;
      keywords = body.keywords;
      scriptTags = body.scriptTags;
      canonical = body.canonical;
      robots = body.robots;
      ogImage = body.ogImage || '';
    }

    let seo = await Seo.findOne({ pageName });

    if (seo) {
      if (title !== undefined) seo.title = title;
      if (description !== undefined) seo.description = description;
      if (keywords !== undefined) seo.keywords = keywords;
      if (scriptTags !== undefined) seo.scriptTags = scriptTags;
      if (canonical !== undefined) seo.canonical = canonical;
      if (robots !== undefined) seo.robots = robots;
      if (ogImage) seo.ogImage = ogImage;

      const updated = await seo.save();
      return NextResponse.json(updated);
    } else {
      const newSeo = new Seo({
        pageName,
        title: title || '',
        description: description || '',
        keywords: keywords || '',
        ogImage: ogImage || '',
        scriptTags: scriptTags || '',
        canonical: canonical || '',
        robots: robots || 'index, follow',
      });
      const saved = await newSeo.save();
      return NextResponse.json(saved, { status: 201 });
    }
  } catch (error) {
    console.error('API /seo/[pageName] PUT error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
