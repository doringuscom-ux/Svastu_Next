import Gallery from '@/models/Gallery';
import { requireAdmin } from '@/lib/auth';
import { uploadFormImage } from '@/lib/cloudinary';
import { revalidateSite } from '@/lib/isr';
import { NextResponse } from 'next/server';

// Subadmins may only change images they uploaded themselves.
const canModify = (admin, image) =>
  admin.role !== 'subadmin' || !image.createdBy || image.createdBy.toString() === admin._id.toString();

export async function PUT(request, { params }) {
  try {
    const { admin, response } = await requireAdmin(request);
    if (response) return response;

    const { id } = await params;
    const image = await Gallery.findById(id);
    if (!image) {
      return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }
    if (!canModify(admin, image)) {
      return NextResponse.json({ message: 'Not authorized to edit this image' }, { status: 403 });
    }

    const formData = await request.formData();
    const src = (await uploadFormImage(formData, 'imageFile', 'svastu/gallery')) || formData.get('src');

    image.alt = formData.get('alt') || image.alt;
    image.category = formData.get('category') || image.category;
    image.size = formData.get('size') || image.size;
    image.src = src || image.src;

    const updated = await image.save();
    revalidateSite();
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Gallery update error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { admin, response } = await requireAdmin(request);
    if (response) return response;

    const { id } = await params;
    const image = await Gallery.findById(id);
    if (!image) {
      return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }
    if (!canModify(admin, image)) {
      return NextResponse.json({ message: 'Not authorized to delete this image' }, { status: 403 });
    }

    await image.deleteOne();
    revalidateSite();
    return NextResponse.json({ message: 'Image removed' });
  } catch (error) {
    console.error('Gallery delete error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
