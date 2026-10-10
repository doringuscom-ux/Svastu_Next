import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const page = await Page.findOne({ slug }).lean();

    if (!page) {
      return NextResponse.json({ message: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('API /pages/[slug] error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
