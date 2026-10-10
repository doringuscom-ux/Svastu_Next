import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { verifyAdmin } from '@/lib/auth';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    let filter = {};
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await Admin.findById(decoded.id);
        if (adminUser && adminUser.role === 'subadmin') {
          filter.createdBy = adminUser._id;
        }
      } catch (err) {
        // ignore
      }
    }
    const pages = await Page.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('API /pages error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await dbConnect();
    const formData = await request.formData();

    const title = formData.get('title');
    const slug = formData.get('slug');
    const country = formData.get('country') || '';
    const metaTitle = formData.get('metaTitle') || '';
    const metaDescription = formData.get('metaDescription') || '';
    const metaKeywords = formData.get('metaKeywords') || '';
    const metaCanonical = formData.get('metaCanonical') || '';
    const metaRobots = formData.get('metaRobots') || 'index, follow';
    const customText = formData.get('customText') || '';

    if (!title || !slug) {
      return NextResponse.json({ message: 'Title and slug are required' }, { status: 400 });
    }

    const pageExists = await Page.findOne({ slug });
    if (pageExists) {
      return NextResponse.json({ message: 'Page with this slug already exists' }, { status: 400 });
    }

    const sections = {};
    for (let i = 1; i <= 6; i++) {
      const secKey = `section${i}`;
      const secRaw = formData.get(secKey);
      sections[secKey] = { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' };
      if (secRaw) {
        try {
          sections[secKey] = JSON.parse(secRaw);
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
          sections[secKey].image = uploadRes.secure_url || uploadRes.url;
        }
      }
    }

    const newPage = new Page({
      title,
      slug,
      country,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
      metaRobots,
      customText,
      ...sections,
      createdBy: admin._id,
    });

    const saved = await newPage.save();
    
    // Auto-update sitemap dynamically
    try {
      const { syncSitemapFile } = await import('@/lib/sitemapSync');
      syncSitemapFile().catch(console.error);
    } catch (e) {}

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('API /pages POST error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
