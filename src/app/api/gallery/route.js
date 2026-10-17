import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import { verifyAdmin, requireAdmin } from '@/lib/auth';
import { uploadFormImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    // Public visitors see everything; a logged-in subadmin only sees their own uploads.
    const filter = {};
    const admin = await verifyAdmin(request);
    if (admin && admin.role === 'subadmin') {
      filter.createdBy = admin._id;
    }
    const gallery = await Gallery.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(gallery);
  } catch (error) {
    console.error('API /gallery error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { admin, response } = await requireAdmin(request);
    if (response) return response;

    const formData = await request.formData();
    const alt = formData.get('alt');
    const category = formData.get('category');
    const size = formData.get('size') || 'small';
    const src = (await uploadFormImage(formData, 'imageFile', 'svastu/gallery')) || formData.get('src');

    if (!src || !alt || !category) {
      return NextResponse.json({ message: 'Please provide an image, alt text, and category' }, { status: 400 });
    }

    const saved = await Gallery.create({ src, alt, category, size, createdBy: admin._id });
    revalidatePath('/gallery');
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Gallery create error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
