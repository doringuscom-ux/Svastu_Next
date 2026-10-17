import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyAdmin } from '@/lib/auth';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';
import { revalidateSite } from '@/lib/isr';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');

    let filter = { isPublished: true };

    // Drafts (all=true) are only listed for a logged-in admin; subadmins see their own posts.
    if (all === 'true') {
      const adminUser = await verifyAdmin(request);
      if (!adminUser) {
        return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
      }
      filter = adminUser.role === 'subadmin' ? { createdBy: adminUser._id } : {};
    }

    const blogs = await Blog.find(filter)
      .select('-content')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('API /blogs error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const slug = formData.get('slug');
    const excerpt = formData.get('excerpt') || '';
    const content = formData.get('content');
    const category = formData.get('category') || 'General';
    const author = formData.get('author') || 'S-Vastu Solution';
    const isPublished = formData.get('isPublished') === 'true';
    const metaTitle = formData.get('metaTitle') || '';
    const metaDescription = formData.get('metaDescription') || '';
    const metaKeywords = formData.get('metaKeywords') || '';
    const metaCanonical = formData.get('metaCanonical') || '';
    const metaRobots = formData.get('metaRobots') || 'index, follow';

    let coverImage = '';
    const imageFile = formData.get('coverImageFile') || formData.get('coverImage');
    if (imageFile && typeof imageFile !== 'string' && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await uploadBufferToCloudinary(buffer, 'svastu/blogs');
      if (uploadRes) {
        coverImage = uploadRes.secure_url || uploadRes.url;
      }
    }

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      isPublished,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
      metaRobots,
      createdBy: admin._id,
    });

    const saved = await blog.save();
    revalidateSite();
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Blog create error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
