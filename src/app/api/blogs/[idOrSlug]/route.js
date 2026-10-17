import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyAdmin } from '@/lib/auth';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';
import { revalidateSite } from '@/lib/isr';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { idOrSlug } = await params;
    
    let blog;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug).lean();
    }
    
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug }).lean();
    }

    // Unpublished drafts are only visible to a logged-in admin.
    if (blog && !blog.isPublished && !(await verifyAdmin(request))) {
      blog = null;
    }

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('API /blogs/[idOrSlug] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { idOrSlug } = await params;
    const blog = await Blog.findById(idOrSlug);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (body.title) blog.title = body.title;
      if (body.slug) blog.slug = body.slug;
      if (body.excerpt !== undefined) blog.excerpt = body.excerpt;
      if (body.content) blog.content = body.content;
      if (body.category) blog.category = body.category;
      if (body.author) blog.author = body.author;
      if (body.isPublished !== undefined) blog.isPublished = body.isPublished;
      if (body.metaTitle !== undefined) blog.metaTitle = body.metaTitle;
      if (body.metaDescription !== undefined) blog.metaDescription = body.metaDescription;
      if (body.metaKeywords !== undefined) blog.metaKeywords = body.metaKeywords;
      if (body.metaCanonical !== undefined) blog.metaCanonical = body.metaCanonical;
      if (body.metaRobots !== undefined) blog.metaRobots = body.metaRobots;
      if (body.coverImage !== undefined) blog.coverImage = body.coverImage;
    } else {
      const formData = await request.formData();
      blog.title = formData.get('title') || blog.title;
      blog.slug = formData.get('slug') || blog.slug;
      blog.excerpt = formData.get('excerpt') !== null ? formData.get('excerpt') : blog.excerpt;
      blog.content = formData.get('content') || blog.content;
      blog.category = formData.get('category') || blog.category;
      blog.author = formData.get('author') || blog.author;
      if (formData.get('isPublished') !== null) {
        blog.isPublished = formData.get('isPublished') === 'true';
      }
      blog.metaTitle = formData.get('metaTitle') !== null ? formData.get('metaTitle') : blog.metaTitle;
      blog.metaDescription = formData.get('metaDescription') !== null ? formData.get('metaDescription') : blog.metaDescription;
      blog.metaKeywords = formData.get('metaKeywords') !== null ? formData.get('metaKeywords') : blog.metaKeywords;
      blog.metaCanonical = formData.get('metaCanonical') !== null ? formData.get('metaCanonical') : blog.metaCanonical;
      blog.metaRobots = formData.get('metaRobots') !== null ? formData.get('metaRobots') : blog.metaRobots;

      const imageFile = formData.get('coverImageFile') || formData.get('coverImage');
      if (imageFile && typeof imageFile !== 'string' && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadRes = await uploadBufferToCloudinary(buffer, 'svastu/blogs');
        if (uploadRes) {
          blog.coverImage = uploadRes.secure_url || uploadRes.url;
        }
      }
    }

    const updated = await blog.save();
    revalidateSite();
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { idOrSlug } = await params;
    const blog = await Blog.findById(idOrSlug);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    await blog.deleteOne();
    revalidateSite();
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Blog delete error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
